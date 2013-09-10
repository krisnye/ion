{
    function toString(array)
    {
        return array.reduce(function(a,b){
            if (Array.isArray(a)) a = toString(a);
            if (Array.isArray(b)) b = toString(b);
            return a.concat(b);
        }, '')
    }
}
START = key:LEFTVALUE S ":" S value:RIGHTVALUE { return {key:key,value:value}; } /
        value:RIGHTVALUE { return {value:value} }
BASICVALUE = NULL / QSTRING / DATE / NUMBER / BOOLEAN / EMPTY_OBJECT / EMPTY_ARRAY / REGEX / EXPRESSION / EMPTY
LEFTVALUE = BASICVALUE / LEFTSTRING
RIGHTVALUE = LIST / BASICVALUE / RIGHTSTRING
EMPTY = S BREAK { return undefined; }
EMPTY_OBJECT = "{" S "}" { return {}; }
EMPTY_ARRAY = "[" S "]" { return []; }
LIST = first:LEFTVALUE values:( ',' S value:LEFTVALUE {return value;} )+
    {
        values.unshift(first);
        return values;
    }
EXPRESSION = "{{" text:(!"}}" .)+ "}}" { return "{{" + toString(text) + "}}"; }
H = [0-9a-fA-F]
QSTRING "QUOTED STRING" = "\"" chars:(("\\" (["\\\/bfnrt] / ("u" H H H H))) / [^"\\\r\n])* "\"" BREAK
    { return JSON.parse('"' + toString(chars) + '"'); }
RIGHTSTRING "RIGHT STRING" = S value: (!BREAK .)+ BREAK { return toString(value); }
LEFTSTRING "LEFT STRING" = S value: (!CBREAK .)+ CBREAK { return toString(value); }
REGEX = "/" text:("\\/" / !"/".)+ "/" BREAK { return new RegExp(toString(text)); }
D "DIGIT" = [0-9]
DIGITS = digits:D+ { return toString(digits); }
NUMBER
    = number:(DIGITS ('.' DIGITS)? ([eE] [-+]? DIGITS)?) BREAK
    { return parseFloat(toString(number)); }
NULL = "null" BREAK { return null; }
BOOLEAN = "true" BREAK { return true; } / "false" BREAK { return false; }
DATE
    //        Y Y Y Y  -  M M  -  D D     T                         H H  :  M M    :  S S    .  m  m  m            Z     TIMEZONE OFFSET
    = value:( D D D D '-' D D '-' D D ( ('T' / (' ' {return 'T';})) D D ':' D D ( ':' D D ( '.' D  D? D? )? )? S ('Z' / ([+-] D D ':' D D))?)? ) BREAK
    { return new Date(toString(value).replace(/ /g, '')); }
S "SPACE" = [ ]* { return ''; }
CBREAK = &(EOL / [:,])
BREAK = &(EOL / [,])
EOL "END OF LINE" = ("\r\n" / "\n" / "\r" / EOF)
EOF "END OF FILE" = !.
