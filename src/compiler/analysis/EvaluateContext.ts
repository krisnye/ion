import { Lookup } from "@glas/traverse";
import { ClassDeclaration, ConditionalDeclaration, Declaration, Declarator, Expression, Node, Reference, Variable } from "../ast";
import { SemanticError } from "../common";
import { ScopeMaps } from "../createScopeMaps";

export default class EvaluateContext {

    lookup: Lookup
    scopes: ScopeMaps
    values: Map<Declarator, Expression>

    constructor(lookup: Lookup, scopes: ScopeMaps) {
        this.lookup = lookup
        this.scopes = scopes
        this.values = new Map()
    }

    declarator(ref: Reference) {
        let scope = this.scope(ref)
        let declarator = scope[ref.name]
        return declarator
    }

    setValue(ref: Reference, value: Expression) {
        let declarator = this.declarator(ref)
        this.values.set(this.original(declarator), value)
    }

    getValue(ref: Reference) {
        let declarator = this.declarator(ref)
        // check for current value
        let value = this.values.get(this.original(declarator))
        if (value != null) {
            return value
        }
        let declaration = this.current(this.lookup.findAncestor(declarator, Declaration.is))
        if (declaration == null) {
            return null
            // throw SemanticError(`Declaration not found for this declarator`, declarator)
        }
        // get the initial value
        if (Declarator.is(declaration?.id)) {
            // if the id is a more complex pattern, we will have to handle that.
            if (Variable.is(declaration)) {
                let value = declaration.value
                if (value != null) {
                    if (Reference.is(value)) {
                        return this.getValue(value)
                    }
                }
                return value
            }
            if (ConditionalDeclaration.is(declaration)) {
                return null
            }
            // if (ClassDeclaration.is(declaration)) {
            //     if (isAbsolutePath(declaration.id.name)) {
            //         return new Reference(declaration.id)
            //     }
            //     else {
            //         throw SemanticError(`Class declarations must be defined at the module root`, declaration)
            //     }
            // }
            throw new Error(`What type of Declaration is this: ` + declaration.constructor.name)
        }
        else {
            throw new Error(`TODO: Support this ` + declaration.id.constructor.name)
        }
    }

    scope(node) {
        return this.scopes.get(node)
    }

    current<T>(node: T): T {
        return this.lookup.getCurrent(node)
    }

    original<T>(node: T): T {
        return this.lookup.getOriginal(node)
    }

}
