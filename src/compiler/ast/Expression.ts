import { Type } from "./Type";
import { Node } from "../Node";
import { EvaluationContext } from "../EvaluationContext";
import { SourceLocation } from "../SourceLocation";
import { logOnce } from "../utility";

export interface ExpressionProps {
    location: SourceLocation;
    type?: null | Node;
    constant?: null | boolean;
    resolved?: boolean;
}

export class Expression extends Node implements Required<ExpressionProps> {
    
    type!: Type | null;
    resolved!: boolean;
    constant!: null | boolean;

    constructor(props) {
        super({ type: null, resolved: false, ...props });
    }

    toInterpreterInstance(c: EvaluationContext): any {
        throw new Error(`${this.constructor.name}.toInterpreterInstance not implemented.`);
    }

    *getDependencies(c: EvaluationContext): Generator<Expression> {
    }

    protected areAllDependenciesResolved(c: EvaluationContext) {
        for (const dep of this.getDependencies(c)) {
            if (dep == null) {
                console.log("ERROR, undefined dep: " + this.constructor.name);
            }
            if (!dep.resolved) {
                return false;
            }
        }
        return true;
    }

    maybeResolve(c: EvaluationContext): Expression | null {
        if (!this.areAllDependenciesResolved(c)) {
            return null;
        }
        let resolved = this.resolve(c);
        return resolved;
    }

    protected resolve(c: EvaluationContext): Expression {
        let type = this.resolveType(c);
        if (type?.simplify) {
            type = type.simplify(c) as Type;
        }
        return this.patch({ type, resolved: true });
    }

    protected resolveType(c: EvaluationContext): Type | null {
        logOnce(`${this.constructor.name}.resolveType() not implemented`);
        return null;
    }

    protected toTypeString() {
        if (this.type == null) {
            return ``;
        }
        return ` ${this.resolved ? `::` : `:`} ${this.type}`;
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            location: void 0,
            //  prevent type from being written if null
            type: this.type ?? void 0,
            //  prevent constant from being written if null
            constant: this.constant ?? void 0,
            //  prevent typeChecked from being written if false
            resolved: this.resolved || void 0,
        };
    }

}