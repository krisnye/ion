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
    function joinLeft(head, tail) {
        var result = head;
        for (var i = 0; i < tail.length; i++) {
            var step = tail[i];
            step.args.unshift(result);
            result = step;
        }
        return result;
    }
    function block(a) {
      return a.length == 1 ? a[0] : e("block", a);
    }
    var core = require('./core');
}

//  new code
start = newScopeStatements

definition = eol? s a:id s "=" s b:lineExpression eol? { return e("var", [a,b]) }
statement = eol? a:(if / for / set / add) eol? { return a }
if = s "if" break s a:singleLineExpression indent b:blockStatement outdent c:else?
    { return e("if", isEmpty(c) ? [a,b] : [a,b,c]) }
else = s "else" break s a:(singleLineExpression / eol { return "" }) indent b:blockStatement outdent
    { return isEmpty(a) ? b : e("if", [a,b]) }
for = s "for" break s a:(singleLineExpression / eol) indent b:newScopeStatements outdent
{
  if (isEmpty(a))
    a = e("ancestor", [0])
  return e("for", [a,b])
}
add = s a:lineExpression { return e("add", [a]) }
set = s id:key s ":" s a:lineExpression { return e("set", [id,a]) }
lineExpression = multiLineExpression / singleLineExpression
singleLineExpression = a:(list / e) eol { return a }
multiLineExpression = multilineString / multilineObject
multilineObject = type:(("{}" / "[]") eol / singleLineExpression / eol) indent s:blockStatement outdent
{
    if (type[0] == "[]")
      type = e("member", [e("global"), "Array"])
    if (type[0] == "{}" || Array.isArray(type) && isEmpty(f(type).trim()))
      type = null;
    return e("object", [type,s])
}
blockStatement = a:statement+ { return block(a) }
newScopeStatements = a:definition* b:statement+ { return block(a.concat(b)) }
e "expression" = s a:conditional s { return a }

//  statements
list = a:e b:(s ',' s c:e { return c })+ { b.unshift(a); return e("list", b) }

//  multi line strings
multilineString = "\"\"" eol content:multilineStringContent { return core.unindent(f(content)) }
multilineStringLine = !indent !outdent (!eol .)* eol
multilineStringContent = indent content:(multilineStringLine / multilineStringContent)* outdent { return content }

//  path
path = a:firstStep b:step* { return joinLeft(a, b) }
firstStep = literal / ref / group
step = children / propertyGet / predicate / propertyIndexer / functionCall
predicate = "{" s a:e s "}" { return e("predicate", [a]) }
propertyGet = "." a:id { return e("member", [a]) }
propertyIndexer = "[" s a:e s "]" { return e("member", [a]) }
children = "." s "*" { return e("children", []) }
functionCall = a:args { return e("call", [a]) }
args = "(" s ")" { return [] }
     / "(" a:e ")" { return [a] }
     / "(" a:list ")" { return a }

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
  = a:or s "?" s b:conditional s ":" s c:conditional { return e("?", [a,b,c]) }
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
  = op:("!" / "-") s right:primary
  / primary
primary = path / group / literal
group = '(' s a:e s ')' { return a }

//  references
ref = null / global / root / ancestor / idref
null = 'null' break { return null }
global = '$' break { return e("global") }
       / '$' a:id { return e("member", [e("global"), a])}
root = '@' break { return e("root") }
    / '@' a:id { return e("member", [e("root"), a])}
ancestor = a:('.'+) b:id?
{
  result = e("ancestor", [f(a).length - 1])
  if (!isEmpty(b))
    result = e("member", [result, b])
  return result
}
idref = a:id { return e("ref", [a]) /* we postprocess to determine if this is a variable or global reference */ }
id = a:([a-zA-Z_][a-zA-Z_0-9]*) { return f(a) }
key = id / string / group


//  literals
literal = number / boolean / string
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
