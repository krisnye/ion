{
    function isEmpty(a) {
      return a == null || a.length == 0;
    }
    function e(op, args) {
        if (args == null)
          args = [];
        return {op:op,args:args};
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
    var core = require('./core');
    function arrayType() {
      return {"op":"member","args":[{"op":"global","args":[]},"Array"]};
    }
}

//  new code
start = statements

statement = eol? a:(if / for / set / add / definition / setAndDefinition) eol? { return a }
definition = eol? s id:id s "=" s a:lineExpression eol? { return e("var", [id,a]) }
setAndDefinition = eol? s id:id s ":=" s a:lineExpression eol?
{
  return block([e("var", [id, a]),e("set", [id, e("ref", [id])])])
}
if = s "if" break s a:singleLineExpression indent b:statements outdent c:else?
    { return e("if", isEmpty(c) ? [a,b] : [a,b,c]) }
else = s "else" break s a:(singleLineExpression / eol { return "" }) indent b:statements outdent
    { return isEmpty(a) ? b : e("if", [a,b]) }
for = s "for" break s a:(singleLineExpression / eol) indent b:statements outdent
{
  if (isEmpty(a))
    a = e("input", [0])
  return e("for", [a,b])
}
add = s a:lineExpression { return e("add", [a]) }
set = s id:key s ":" s a:lineExpression { return e("set", [id,a]) }
lineExpression = multiLineExpression / singleLineExpression
singleLineExpression = a:e eol { return a }
multiLineExpression = multilineString / multilineObject
multilineObject = type:(("{}" / "[]") eol / singleLineExpression / eol) indent s:statements? outdent
{
    if (type[0] == "[]")
      type = arrayType()
    if (type[0] == "{}" || Array.isArray(type) && isEmpty(f(type).trim()))
      type = null;
    return e("object", [type,isEmpty(s) ? null : s])
}
statements = a:statement+ { return block(a) }
e "expression" = s a:conditional s { return a }

//  multi line strings
multilineString = "\"\"" eol content:multilineStringContent { return core.unindent(f(content)) }
multilineStringLine = !indent !outdent (!eol .)* eol
multilineStringContent = indent content:(multilineStringLine / multilineStringContent)* outdent { return content }

//  path
path = a:firstStep b:step* { return joinLeft([a].concat(b)) }
firstStep = literal / ref / group
step = member / predicate / localExpression
localExpression = "." a:group { return e("local", [a]) }
member = "."? a:id { return e("member", [a]) }
       / "[" s a:e s "]" { return e("member", [a]) }

//  objects and arrays
object = type:e? eol indent statements:set+ outdent { return e("object", [type,statements]) }
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
  = a:or s "?" s b:conditional s ":" s c:conditional { return e("?:", [a,b,c]) }
  / a:or s op:"?" s b:conditional  { return e(op, [a,b]) }
  / or
or
  = left:and s op:("||" / "|") s right:or { return e(op, [left,right]) }
  / and
and
  = left:equality s op:("&&" / "&") s right:and { return e(op, [left,right]) }
  / equality
equality
  = left:relational s op:("==" / "!=") s right:equality { return e(op, [left,right]) }
  / relational
relational
  = left:additive s op:("<=" / ">=" / "<" / ">") s right:relational { return e(op, [left,right]) }
  / additive
additive
  = left:multiplicative s op:("+" / "-") s right:additive { return e(op, [left,right]) }
  / multiplicative
multiplicative
  = left:unary s op:("*" / "/" / "%") s right:multiplicative { return e(op, [left,right]) }
  / unary
unary
  = op:("!" / "-") s right:call
  / call
call
  = left:expansion s "(" s args:list? s ")"
    {
      if (isEmpty(args))
        args = []
      thisArg = null
      if (left.op == "member")
        thisArg = left.args[0]
      return e("call", [thisArg, left].concat(args))
    }
  / expansion
list = a:e b:(s ',' s c:e { return c })* { b.unshift(a); return b }


expansion
  = left:primary? "."? "*" right:step* {
    //  convert this into an equivalent for loop that outputs an array.
    if (isEmpty(left)) {
      left = e("input",[0])
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

    return e("object", [arrayType(), e("for", [left, e("add",[right])])])
  }
  / primary
primary = path / group / literal / predicate
group = '(' s a:e s ')' { return a }
predicate = "{" s a:e s "}" { return e("predicate", [a]) }

//  references
ref = inputRef / outputRef / idRef
outputRef = a:('@'+) { return e("output", [a.length - 1]) }
inputRef = '$' { return e("input") }
         / a:('.'+) { return e("input", [a.length - 1]) }
idRef = a:id { return e("ref", [a]) /* we postprocess to determine if this is a variable or global reference */ }
id = a:([a-zA-Z_][a-zA-Z_0-9]*) { return f(a) }
key = id / string / group

//  literals
literal = null / number / boolean / string / literalObject / literalArray
literalObject = "{}" { return e("object", [null]) }
literalArray = "[]" { return e("object", [arrayType()]) }
null = 'null' break { return null }
d "digit" = [0-9]
number = a:([+-]? d+ ([eE] [+-]? d+)?) break { return parseFloat(f(a)) }
integer = a:([+-]? d+) break { return parseInt(f(a)) }
boolean = "true" break { return true } / "false" break { return false }
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
