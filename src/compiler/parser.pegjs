{
    function isEmpty(a) {
      return a == null || a.length == 0;
    }
    function e(op, args, line, column) {
        if (args == null)
          args = [];
        var x = {op:op,args:args};
        if (line != null && column != null)
        {
          x.line = line;
          x.column = column;
        }
        return x;
    }
    function f(array) {
        return array.reduce(function(a,b){
            if (Array.isArray(a)) a = f(a);
            if (Array.isArray(b)) b = f(b);
            return a.concat(b);
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
    function joinRight(steps) {
        var current = steps[0];
        for (var i = 1; i < steps.length; i++) {
            var step = steps[i];
            current.args.push(step);
            current = step;
        }
        return steps[0];
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
    function arrayType() {
      return {"op":"member","args":[{"op":"global","args":[]},"Array"]};
    }
    var core = require('./core');
}

//  new code
start = statements

statement = eol? a:(if / for / with / set / templateDef / templateApply / add / variableDef / setAndDef) eol? { return a }
//  we should check this after parsing so we can throw an exception.
variableDef = eol? s id:id s "=" s a:lineExpression eol? { return e("var", [id,a], line, column) }
setAndDef = eol? s id:id s ":=" s a:lineExpression eol?
{
  return block([e("var", [id, a]),e("set", [id, e("ref", [id])])], line, column)
}
if = s "if" break s a:singleLineExpression indent b:statements outdent c:else?
    { return e("if", isEmpty(c) ? [a,b] : [a,b,c], line, column) }

else = s "else" break s eol indent b:statements outdent { return b }
     / s "else" break s b:if { return b }

for = s "for" break s a:(singleLineExpression / eol) indent b:statements outdent
{
  if (isEmpty(a))
    a = e("input", [0], line, column)
  return e("for", [a,b], line, column)
}
with = s "with" break s a:singleLineExpression indent b:statements outdent { return e("with", [a,b], line, column) }
add = s a:lineExpression { return e("add", [a], line, column) }
set = s id:key s ":" s a:lineExpression { return e("set", [id,a], line, column) }
templateDef = eol? s id:id s "=" s "()" eol indent s:statements outdent { return e("var", [id,e("templateDef", [s])], line, column) }
templateApply = s "(" s id:id s a:e? s ")" eol
{
  var op = e("templateApply", [id], line, column)
  if (!isEmpty(a))
    op = e("with", [a, op], line, column)
  return op
}
functionExpression = text:(functionArgs? s "->" (eol multilineStringContent / multilineStringLine))
{
  var text = require('coffee-script').compile(f(text), {bare:true});
  return e("function", [text])
}
functionArgs = "(" s ")"
              / "(" s idList s ")"
idList = id (s ',' s id)*
lineExpression = multiLineExpression / singleLineExpression / functionExpression
singleLineExpression = a:e eol { return a }
multiLineExpression = multilineString / multilineObject
multilineObject = type:(("{}" / "[]") eol / singleLineExpression / eol) (indent s:statements outdent)
{
    if (type[0] == "[]")
      type = arrayType()
    if (type[0] == "{}" || Array.isArray(type) && isEmpty(f(type).trim()))
      type = null;
    return e("object", [type,isEmpty(s) ? null : s], line, column)
}
// contains a type and an inline object literal, for now just an empty object
statements = a:statement+ { return block(a) }
e "expression" = s a:conditional s { return a }

//  multi line strings
multilineString = "\"\"" eol content:multilineStringContent { return core.unindent(f(content)) }
multilineStringLine = !indent !outdent (!eol .)* eol
multilineStringContent = indent content:(multilineStringLine / multilineStringContent)* outdent { return content }

//  objects and arrays
object = type:e? eol indent statements:set+ outdent { return e("object", [type,statements], line, column) }
indent "INDENT" = s token:"{{{{" eol
{
  if (token != core.indentToken)
    throw new Error(token + " != " + core.indentToken);
  return token;
}
outdent "OUTDENT" = s token:"}}}}" eol
{
  if (token != core.outdentToken)
    throw new Error(token + " != " + core.outdentToken);
  return token;
}

//  ops
conditional
  = a:or s "?" s b:conditional s ":" s c:conditional { return e("?:", [a,b,c], line, column) }
  / a:or s op:"?" s b:conditional  { return e(op, [a,b], line, column) }
  / or
or
  = left:and s op:("||" / "|") s right:or { return e(op, [left,right], line, column) }
  / and
and
  = left:equality s op:("&&" / "&") s right:and { return e(op, [left,right], line, column) }
  / equality
equality
  = left:relational s op:("==" / "!=") s right:equality { return e(op, [left,right], line, column) }
  / relational
relational
  = left:additive s op:("<=" / ">=" / "<" / ">") s right:relational { return e(op, [left,right], line, column) }
  / additive
additive
  = left:multiplicative s op:("+" / "-") s right:additive { return e(op, [left,right], line, column) }
  / multiplicative
multiplicative
  = left:unary s op:("*" / "/" / "%") s right:multiplicative { return e(op, [left,right], line, column) }
  / unary
unary
  = op:("!" / "-") right:expansion
  / expansion

expansion
  = left:primary "."? "*" right:step* {
    //  convert this into an equivalent for loop that outputs an array.
    if (isEmpty(left)) {
      left = e("input",[0], line, column)
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

    return e("object", [arrayType(), e("for", [left, e("add",[right])])], line, column)
  }
  / primary
primary = path
//  path
path =
  a:firstStep
  b:step*
  { return joinLeft([a].concat(b)) }
firstStep = new / literal / ref / group
step = member / predicate / localExpression / call
constructorPath = a:(ref / group) b:(member)*
  { return joinLeft([a].concat(b)) }
localExpression = "." a:group { return e("local", [a], line, column) }
member = "."? a:id { return e("member", [a], line, column) }
       / "[" s a:e s "]" { return e("member", [a], line, column) }
group = '(' s a:e s ')' { return a }
predicate = "{" s a:e s "}" { return e("predicate", [a], line, column) }
new = "new" break s left:constructorPath args:args { return e("new", [left].concat(args), line, column) }
call = args:args { return e("call", args, line, column) }
args = "(" s a:list? s ")" { return isEmpty(a) ? [] : a }
     / " " s a:list { return a }
list = a:e b:(s ',' s c:e { return c })* { b.unshift(a); return b }

//  references
ref = inputRef / outputRef / idRef
outputRef = a:('@'+) { return e("output", [a.length - 1], line, column) }
inputRef = '$' { return e("input", [], line, column) }
         / a:('.'+) { return e("input", [a.length - 1], line, column) }
idRef = a:id { return e("ref", [a]) /* we postprocess to determine if this is a variable or global reference */ }
id = a:([a-zA-Z_][a-zA-Z_0-9]*) { return f(a) }
key = id / string / group

//  literals
literal = null / number / boolean / string / literalObject / literalArray / regex
literalObject = "{}" { return e("object", [null], line, column) }
literalArray = "[" s "]"
             { return e("object", [arrayType()], line, column) }
             / "[" s a:list s "]"
             { return e("object", [arrayType(), e("block",a.map(function(x){return e("add", [x])}))], line, column) }
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
raw = chars:(!eol .)* { return e("raw", [f(chars)]) }

//  breaks
s "space" = " "*
break = ![0-9a-zA-Z]
eol "end of line" = s eof / (s ("\r\n" / "\r" / "\n"))+
eof "end of file" = !.
