
for name in ["div","span","input","a","br","button","caption","fieldset","form", "frame","frameset","h1","h2","h3","h4","h5","h6","hr","legend","menu","option","select","script","pre","table","tbody","td","tr","thead"]
    do (name) ->
        exports[name] = (attributes) ->
            element = document.createElement name
            if attributes?
                console.log('attributes', attributes)
                for key, value of attributes
                    console.log('setAttribute: ' + key, value)
                    element.setAttribute(key, value)
                    console.log('getAttribute: ' + element.getAttribute(key))
            return element
