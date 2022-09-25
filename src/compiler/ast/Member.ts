import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { EvaluationContext } from "../EvaluationContext";
import { getResolvePaths, join } from "../pathFunctions";
import { SemanticError } from "../SemanticError";
import { Call } from "./Call";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";
import { IntersectionType } from "./IntersectionType";
import { ObjectType } from "./ObjectType";
import { Reference } from "./Reference";
import { isType, Type } from "./Type";
import { UnionType } from "./UnionType";

export interface MemberProps extends ExpressionProps {
    object: typeof Member.prototype.object;
    property: typeof Member.prototype.property;
}

export class Member extends Expression {

    object!: Expression;
    property!: Expression | Identifier | Type;

    constructor(props: MemberProps) { super(props); }
    patch(props: Partial<MemberProps>) { return super.patch(props); }

    get computed() {
        return this.property instanceof Expression;
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        let object = this.object.toInterpreterValue(c);
        if (!(object instanceof InterpreterInstance)) {
            throw new Error("Expected InterpreterInstance: " + object);
        }
        if (!(this.property instanceof Identifier)) {
            throw new Error("Expected Identifier: " + this.property);
        }
        let result = object.get(this.property.name);
        return result;
    }

    getPropertyKey(): Identifier | Type {
        if (this.property instanceof Identifier) {
            return this.property;
        }
        if (this.property instanceof Expression) {
            return this.property.type!;
        }
        if (isType(this.property)) {
            return this.property;
        }
        throw new SemanticError(`Invalid key`, this.property);
    }

    *getDependencies(c: EvaluationContext): Generator<Expression> {
        yield this.object;
        if (this.property instanceof Expression) {
            yield this.property;
        }
        else if (this.property instanceof Identifier) {
            for (let declaration of c.getDeclarations(this.object, this.property.name)) {
                yield declaration;
            }
        }
    }

    protected resolve(c: EvaluationContext): Expression {
        let objectType = c.getComparisonType(this.object.type!);
        for (let option of UnionType.split(objectType)) {
            let type: Type | null = null;
            option = [...IntersectionType.split(option)].find(a => a instanceof ObjectType)!;
            if (option instanceof ObjectType) {
                const key = this.getPropertyKey();
                type = option.getPropertyType(key, c);
            }
            if (type == null) {
                // check for a uniform function call syntax UFCS
                if (this.property instanceof Identifier) {
                    let name = this.property.name;
                    let fullPath = join(this.property.location.filename, name);
                    //  check the name first in case it's just a locally scoped variable.
                    let checkPaths = [name, ...getResolvePaths(fullPath)];
                    for (let check of checkPaths) {
                        let declarations = c.getDeclarations(this.object, check);
                        if (declarations.length > 0) {
                            // convert this to a function call.
                            return new Call({
                                location: this.location,
                                //  mark as uniform function call syntax so it's not tested yet.
                                //  as it may be incomplete with more parameters to come later.
                                uniformFunctionCallSyntax: true,
                                callee: new Reference({
                                    location: this.property.location,
                                    name: check
                                }),
                                nodes: [
                                    this.object
                                ]
                            });
                        }
                    }
                }
                throw new SemanticError(`Cannot read property ${this.property} from type ${this.object.type}`, this.property, option);
            }
        }
        return super.resolve(c);
    }

    protected resolveType(c: EvaluationContext) {
        let objectType = c.getComparisonType(this.object.type!);
        let types = new Array<Type>();
        for (let option of UnionType.split(objectType)) {
            let type: Type | null = null;
            option = [...IntersectionType.split(option)].find(a => a instanceof ObjectType)!;
            if (option instanceof ObjectType) {
                const key = this.getPropertyKey();
                type = option.getPropertyType(key, c);
            }
            if (type == null) {
                throw new SemanticError(`Cannot read property ${this.property} from type ${this.object.type}`, this.property, option);
            }
            types.push(type);
        }
        return UnionType.join(...types);
    }

    toString() {
        return this.computed ? `${this.object}[${this.property}]` : `${this.object}.${this.property}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "MemberExpression",
            object: this.object.toESNode(c),
            property: this.property.toESNode(c)
        }
    }

}