
### functions

`getExternalReferences(file): Map<String,Array<Reference>>`

### basic structure that should support quick recompilation

for each file
    get external dependencies
create dependency graph
ensure there are NO cyclical dependencies
for each dependency in graph
    compile the file (passing other already compiled dependencies)
    write out the result

#### on incremental recompilation

check cached dependency graph
recompile modified file
IF output is different at all
    then recompile direct dependents... recursively
