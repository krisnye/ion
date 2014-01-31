{
    function isEmpty(a) {
      return a == null || a.length == 0;
    }
    function e(op, args, line, column) {
        if (args == null)
          args = [];
        var x = {op:op,args:args};
        if (line != null && column != null) {
          x.line = line;
          x.column = column;
        }
        return x;
    }
    function f(array) {
        return array.reduce(function(a,b){
            if (a == null) a = "";
            if (b == null) b = "";
            if (Array.isArray(a)) a = f(a);
            if (Array.isArray(b)) b = f(b);
            return a + b;
        }, '')
    }
    function joinLeft(steps) {
        var result = steps[0];
        for (var i = 1; i < steps.length; i++) {
            var step = steps[i];
            step.args.unshift(result);
            result = step;
        }
        return result;
    }
    function block(a) {
      if (a.length == 1)
        return a[0];
      var statements = [];
      for (var i = 0; i < a.length; i++) {
        var statement = a[i];
        if (statement.op === "block")
          statements.push.apply(statements, statement.args);
        else
          statements.push(statement);
      }
      return e("block", statements);
    }
    function incrementOutputExpressions(e) {
      if (e != null && e.op != null) {
        if (e.op == "output") {
          e.args[0]++
        }

        for (var i = 0; i < e.args.length; i++)
          incrementOutputExpressions(e.args[i])
      }
    }
    var _internalVariableCount = 0;
    function getNewInternalVariableName() {
      return "temp -" + (++_internalVariableCount);
    }
    function arrayType() {
      return {"op":"member","args":[{"op":"global","args":[]},"Array"]};
    }
    function createForStatement(forHead, forBodyStatement, line, column) {
      // add a conditional to the statement if when is specified
      if (!isEmpty(forHead.when)) {
        forBodyStatement = e("if", [forHead.when, forBodyStatement])
      }
      if (forHead.forVariables.statement != null) {
        forBodyStatement = block([forHead.forVariables.statement, forBodyStatement])
      }
      var key = forHead.forVariables.key
      var value = forHead.forVariables.value
      if (isEmpty(key))
        key = null
      if (isEmpty(value))
        value = null
      return e("for", [forHead.collection, forBodyStatement, key, value], line, column)
    }
    function createVariableDefinitionStatement(lhe, rhe, line, column) {
      //  single variable assignment
      if (typeof lhe == 'string')
        return e("var",[lhe,rhe], line, column)
      //  multiple destructuring assignment
      var tempVarName = getNewInternalVariableName()
      var statements = [e("var",[tempVarName,rhe], line, column)]
      for (var i = 0; i < lhe.length; i++) {
        var lheItem = lhe[i]
        // handle recursive destructuring
        var propertyName = lheItem[0]
        var varName = lheItem[1]
        var propertyExpression = e("member", [e("ref", [tempVarName]), propertyName])
        if (Array.isArray(varName)) {
          statements.push(createVariableDefinitionStatement(varName, propertyExpression, line, column))
        }
        else {
          statements.push(e("var",[varName,propertyExpression], line, column))
        }
      }
      return e("block", statements, line, column)
    }
    var core = require('./core');
}

//  new code
start = statements

statement = eol? a:(ifStatement / forStatement / setStatement / addStatement / variableDeclaration) eol? { return a }
//  we should check this after parsing so we can throw an exception.
variableDeclaration = eol? s type:typeReference? s left:leftHandVarExpression s "=" s right:lineExpression eol?
{
  return createVariableDefinitionStatement(left, right, line(), column());
}
typeReference = "object" / "array" / "boolean" / "integer" / "number" / "string" / "var"
destructuringExpression = destructuringObject / destructuringArray
destructuringObject = "{" s args:destructuringObjectArgs s "}" { return args }
destructuringObjectArg = a:id b:(s ":" s b:leftHandVarExpression {return b})? { if (isEmpty(b)) b = a; return [a,b] }
destructuringObjectArgs = a:destructuringObjectArg b:(s "," s b:destructuringObjectArg {return b})* { return [a].concat(b) }
destructuringArray = "[" s a:leftHandVarExpression? b:(s "," s c:leftHandVarExpression? {return c})* s "]"
{
  args = [a].concat(b)
  var result = []
  for (var i = 0; i < args.length; i++) {
    var arg = args[i]
    if (!isEmpty(arg))
      result.push([i, arg])
  }
  return result
}
leftHandVarExpression = id / destructuringExpression
ifStatement = s "if" break s a:singleLineExpression indent b:statements outdent c:else?
{
  return e("if", isEmpty(c) ? [a,b] : [a,b,c], line(), column())
}

else = s "else" break s eol indent b:statements outdent { return b }
     / s "else" break s b:ifStatement { return b }

forVariables = value:id s key:("," s a:id {return a})? s "in" break s { return {key:key,value:value,type:'in'} }
        / key:id s value:("," s a:id {return a})? s "of" break s { return {key:key,value:value,type:'of'} }
        / lhe:destructuringExpression s "in" break s { return {statement:createVariableDefinitionStatement(lhe, e("input", [0]), line(), column()),type:'in'} }
forHead = s "for" break s forVariables:forVariables collection:expression s when:("if" break s when:expression {return when})?
{
  return {forVariables:forVariables,collection:collection,when:when}
}
forStatement = forHead:forHead eol indent statement:statements outdent { return createForStatement(forHead, statement, line(), column()) }
arrayComprehension = s "[" s value:expression forHeads:forHead+ s "]"
{
  // if there are multiple forHeads
  var forStatement = null;
  for (var i = forHeads.length - 1; i >= 0; i--) {
    var forHead = forHeads[i]
    var forBody = forStatement ? forStatement : e("add", [value], line(), column())
    forStatement = createForStatement(forHead, forBody, line(), column())
  }
  return e("object", [arrayType(),forStatement], line(), column())
}
addStatement = s a:lineExpression { return e("add", [a], line(), column()) }
setStatement = s ids:(memberName+) s ":" bi:":"? s c:lineExpression
{
  var bidirectional = !isEmpty(bi)
  var statement = null;
  for (var i = ids.length - 1; i >= 0; i--) {
    var id = ids[i];
    var valueExpression = statement == null ? c : e("object", [null,statement], line(), column())
    var args = [id, valueExpression]
    if (bidirectional)
      args.push(true)
    statement = e("set", args, line(), column())
  }
  return statement;
}

/*
templateDef = eol? s id:id s "=" s "()" eol indent s:statements outdent { return e("var", [id,e("templateDef", [s])], line(), column()) }
templateApply = s "(" s id:id s a:expression s ")" eol
{
  return e("templateApply", [id], line(), column())
}
*/
functionExpression = text:(functionArgs? s "->" (eol multilineStringContent / multilineStringLine))
{
  var text = require('coffee-script').compile(f(text), {bare:true}).trim();
  return e("function", [text])
}
functionArgs = "(" s ")"
              / "(" s functionArgList s ")"
functionArgList = id (s ',' s id)*

lineExpression = multiLineExpression / singleLineExpression / functionExpression
singleLineExpression = a:expression eol { return a }
multiLineExpression = multilineString / multilineObject
multilineObject = type:(("{}" / "[]") eol / singleLineExpression / eol) (indent s:statements outdent)
{
    if (type[0] == "[]")
      type = arrayType()
    if (type[0] == "{}" || Array.isArray(type) && isEmpty(f(type).trim()))
      type = null;
    return e("object", [type,isEmpty(s) ? null : s], line(), column())
}
statements = a:statement+ { return block(a) }

expression "expression" = s a:conditional s { return a }

//  multi line() strings
multilineString = "\"\"" eol content:multilineStringContent { return core.unindent(f(content)) }
multilineStringLine = !indent !outdent (!eol .)* eol
multilineStringContent = indent content:(multilineStringLine / multilineStringContent)* outdent { return content }

//  objects and arrays
object = type:expression? eol indent statements:statement+ outdent { return e("object", [type,statements], line(), column()) }
indent 'INDENT' = s token:"{{{{" eol
{
  if (token != core.indentToken)
    throw new Error(token + " != " + core.indentToken);
  return token;
}
outdent 'OUTDENT' = s token:"}}}}" eol
{
  if (token != core.outdentToken)
    throw new Error(token + " != " + core.outdentToken);
  return token;
}

//  ops
conditional
  = a:or s "?" s b:conditional s ":" s c:conditional { return e("?:", [a,b,c], line(), column()) }
  / a:or s op:"?" s b:conditional  { return e(op, [a,b], line(), column()) }
  / a:or s op:"?"  { return e("exists", [a], line(), column()) }
  / or
or
  = left:and s op:("or" {return "||"} / "|") break s right:or { return e(op, [left,right], line(), column()) }
  / and
and
  = left:equality s op:("and" {return "&&"} / "&") break s right:and { return e(op, [left,right], line(), column()) }
  / equality
equality
  = left:relational s op:("is" {return "=="} / "isnt" {return "!="}) break s right:equality { return e(op, [left,right], line(), column()) }
  / relational
relational
  = left:additive s op:("<=" / ">=" / "<" / ">") s right:relational { return e(op, [left,right], line(), column()) }
  / additive
additive
  = left:multiplicative s op:("+" / "-") s right:additive { return e(op, [left,right], line(), column()) }
  / multiplicative
multiplicative
  = left:unary s op:("*" / "/" / "%") s right:multiplicative { return e(op, [left,right], line(), column()) }
  / unary
unary
  = op:("not" {return "!"} / "-") break s right:expansion { return e(op, [right], line(), column()) }
  / expansion

expansion
  = left:primary "."? "*" right:step* {
    //  convert this into an equivalent for loop that outputs an array.
    if (isEmpty(left)) {
      left = e("input",[0], line(), column())
    }
    else {
      // when the left expression is pushed nested into the "object" expression beneath it will
      // make the output context one level removed, so we must correct for that here by
      // referencing an ancestor one more level removed from us.
      incrementOutputExpressions(left);
    }

    if (isEmpty(right))
      right = e("input",[0])
    else
      right = joinLeft([e("input",[0])].concat(right))

    return e("object", [arrayType(), e("for", [left, e("add",[right])])], line(), column())
  }
  / primary
primary = path
//  path
path =
  a:firstStep
  b:step*
  { return joinLeft([a].concat(b)) }
firstStep = new / literal / reference / group
step = call
    / member
constructorPath = a:(reference / group) b:(member)* { return joinLeft([a].concat(b)) }
member = a:memberName { return e("member", [a], line(), column()) }
memberName = indexer / "."? a:(memberId / string) { return a }
group = '(' s a:expression s ')' { return a }
new = "new" break s left:constructorPath args:args { return e("new", [left].concat(args), line(), column()) }
call = args:args { return e("call", [null].concat(args), line(), column()) }
args = "(" s a:list? s ")" { return isEmpty(a) ? [] : a }
     / " " s a:list { return a }
list = a:expression b:(s ',' s c:expression { return c })* { b.unshift(a); return b }

//  references
reference = inputReference / outputReference / variableReference
outputReference = '$' { return e("output", [0], line(), column()) }
inputReference = '@' { return e("input", [-1], line(), column()) }
variableReference = a:id { return e("ref", [a]) }
id = !reserved a:([a-zA-Z_][a-zA-Z_0-9]*) break { return f(a) }
memberId = a:([a-zA-Z_0-9]+) break { return f(a) } // more flexible than a normal id
reserved = ("if" / "for" / "else" / "class" / "is" / "isnt" / "and" / "or" / "not") break
key = id / string / indexer
indexer = '[' s a:expression s ']' { return a }

//  literals
literal = null / number / boolean / string / literalObject / literalArray / regex
literalObject = "{" s "}" { return e("object", [null], line(), column()) }
              / "{" a:literalObjectProperty b:(s "," b:literalObjectProperty {return b})*  "}" {
                var statements = [a].concat(b)
                return e("object", [null, block(statements)], line(), column())
              }
literalObjectProperty = s !"." a:memberName s ":" s b:expression { return e("set", [a, b], line(), column()) }

literalArray = "[" s "]"
             { return e("object", [arrayType()], line(), column()) }
             / "[" s a:list s "]"
             { return e("object", [arrayType(), e("block",a.map(function(x){return e("add", [x])}))], line(), column()) }
             / arrayComprehension
null = 'null' break { return e("null") }
d "digit" = [0-9]
number = a:([+-]? d+ ([eE] [+-]? d+)?) break { return parseFloat(f(a)) }
integer = a:([+-]? d+) break { return parseInt(f(a)) }
boolean = "true" break { return true } / "false" break { return false }
regex = '/' a:(('\\' . / [^\/])*) '/' b:[gimy]* { return e("regex", [f(a), f(b)]) }
h "hex" = [0-9a-fA-F]
string = string1 / string2
string1 = '"' chars:(('\\' (["\\\/bfnrt] / ('u' h h h h))) / [^"\\\r\n])* '"'
        { return eval('"' + f(chars) + '"') }
string2 = "'" chars:(('\\' (['\\\/bfnrt] / ('u' h h h h))) / [^'\\\r\n])* "'"
        { return eval("'" + f(chars) + "'") }

//  breaks
s "space" = " "*
break = ![0-9a-zA-Z]
eol "end of line()" = s eof / (s ("\r\n" / "\r" / "\n"))+
eof "end of file" = !.
