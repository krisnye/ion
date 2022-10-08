import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { toMetaString } from "./MetaContainer";
import { isTypeName } from "../utility";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { isSubtype } from "../analysis/isSubtype";
import { SemanticError } from "../SemanticError";
import { Type } from "./Type";
import { Function } from "./Function";
import { defaultExportName } from "../pathFunctions";
import { Declarator } from "./Declarator";
import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { SemanticHighlight, SemanticTokenType } from "../SemanticHighlight";

type VariableKind = "variable" | "property" | "parameter";

export interface VariableProps extends ExpressionProps {
    id: Declarator;
    value: Expression | null;
    meta?: MetaCall[];
    declaredType?: Type | null;
    conditional?: boolean;
    phi?: boolean;
    kind?: VariableKind;
}

export function isProperty(node): node is Variable & { kind: "property" } {
    return node instanceof Variable && node.kind === "property";
}

export function isParameter(node): node is Variable & { kind: "parameter" } {
    return node instanceof Variable && node.kind === "parameter";
}

export class Variable extends Expression implements Declaration {

    id!: Declarator;
    value!: Expression | null;
    meta!: MetaCall[];
    declaredType!: Type | null;
    isDeclaration: true = true;
    conditional!: boolean;
    phi!: boolean;
    kind!: VariableKind;

    constructor(props: VariableProps) { super({ meta: [], kind: "Variable", conditional: false, phi: false, ...props }); }
    patch(props: Partial<VariableProps>) { return super.patch(props); }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        let value = this.value?.toInterpreterValue(c);
        if (value) {
            c.setValue(this.id.name, value);
        }
        return value;
    }

    *getDependencies(c: EvaluationContext) {
        if (this.declaredType instanceof Expression) {
            yield this.declaredType;
        }
        if (this.type) {
            yield this.type;
        }
        if (this.value instanceof Expression) {
            yield this.value;
        }
    }

    resolveType(c: EvaluationContext) {
        const { value, declaredType } = this;
        if (declaredType && value?.type && !this.conditional) {
            // check if value type is assignable to this.
            let isValueASubtype = isSubtype(value.type, declaredType, c);
            if (isValueASubtype === false) {
                throw new SemanticError(`Type ${value.type} cannot be assigned to variable of type ${declaredType}`, value);
            }
            if (isValueASubtype === null) {
                throw new SemanticError(`Type ${value.type} may not be assignable to variable of type ${declaredType}`, value);
            }
        }
        return this.type ?? this.value?.type ?? this.declaredType ?? null;
    }

    isType() {
        return isTypeName(this.id.name);
    }

    protected toTypeString() {
        if (this.declaredType && this.type && this.declaredType.toString() === this.type.toString()) {
            return ` ::: ${this.type}`;
        }
        return `${this.declaredType ? ` : ${this.declaredType}` : ``}${super.toTypeString()}`;
    }

    getVariableKindName() {
        switch(this.kind) {
            case "parameter":
            case "property":
                return this.kind;
            case "variable":
            default:
                return this.isType() ? `type` : this.constant ? `const` : `var`;
        }
    }

    toString() {
        return `${toMetaString(this)}${this.getVariableKindName()} ${this.id}${this.toTypeString()}${this.value != null ? ` = ${this.value}`: ``}`;
    }

    toESParameter(c: EvaluationContext) {
        let id = this.id.toESNode(c);
        return this.value ? {
            type: "AssignmentPattern",
            left: id,
            right: this.value.toESNode(c)
        } : id;
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            //  prevent declaredType from being written if false
            declaredType: this.declaredType ?? void 0,
        };
    }

    toESNode(c: EvaluationContext) {
        if (this.id.name === defaultExportName) {
            return {
                type: "ExportDefaultDeclaration",
                declaration: this.value?.toESNode(c)
            }
        }
        if (this.value instanceof Function) {
            return {
                ...this.value.toESNode(c),
                type: "FunctionDeclaration",
                id: this.id.toESNode(c),
            };
        }
        return {
            type: "VariableDeclaration",
            kind: this.constant ? "const" : "let",
            declarations: [
                {
                    type: "VariableDeclarator",
                    id: this.id.toESNode(c),
                    init: this.value?.toESNode(c),
                }
            ]
        };
    }

    *getSemanticHighlights(source: string[]): IterableIterator<SemanticHighlight> {
        switch (this.kind) {
            case "parameter":
                yield this.id.location.createSemanticHighlight(source, SemanticTokenType.parameter);
                break;
            case "property":
                yield this.id.location.createSemanticHighlight(source, SemanticTokenType.property);
                break;
            case "variable":
                yield this.id.location.createSemanticHighlight(source, SemanticTokenType.variable);
                break;
        }
    }

}
