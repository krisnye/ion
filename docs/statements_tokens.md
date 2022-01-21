
class Vector
    x: Number = 1
    y: Number = 2
    length() =>
        x + y

"class" "Vector" EOL
INDENT
    "x" ":" "Number" "=" "1" EOL
    "y" ":" "Number" "=" "2" EOL
    "length" "()" "=>" EOL
INDENT
        "x" "+" "y" EOL
OUTDENT
OUTDENT

