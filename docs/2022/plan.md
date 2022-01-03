
# 2022 Plan

## Changes to existing system

- Remove Patterns early in parsing and use simple Declarations.
- All operators are defined in root namespace and can be extended.
- All operators can operate on any type defined for them.
- Use same operators for Type operations.

## Step 1: Design Intermediate Representation

- output from compiler front end
- input to compiler back end
- contains external API information
- contains source map information
- could be used by interpreter

## Step 2: Design Source Language