
for name in ["div","span","input","a","br","button","caption","fieldset","form", "frame","frameset","h1","h2","h3","h4","h5","h6","hr","legend","menu","option","select","script","pre","table","tbody","td","tr","thead"]
    do (name) ->
        exports[name] = (properties) ->
            element = document.createElement name
            if properties?
                for key, value of properties
                    element[key] = value
            return element
