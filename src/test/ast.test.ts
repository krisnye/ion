import { strict as assert } from "assert"

import VariableDeclaration from "../ast/VariableDeclaration";
import Node from "../ast/Node";
import Variable from "../ast/Variable";
import Declaration from "../ast/Declaration";
import UnaryExpression from "../ast/UnaryExpression";
import Id from "../ast/Id";

let varDec = new VariableDeclaration({ id: new Id({ name: "foo" }) })
assert(Node.is(varDec))
assert(Variable.is(varDec))
assert(Declaration.is(varDec))
assert(VariableDeclaration.is(varDec))
assert(!UnaryExpression.is(varDec))
