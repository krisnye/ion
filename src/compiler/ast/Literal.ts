import { coreTypes } from "../coreTypes";
import { Node, NodeProps } from "../Node";
import { GetVariableFunction } from "../phases/createScopeMaps";

export interface LiteralProps extends NodeProps {
    value: any;
}

export abstract class Literal extends Node {

    constructor(props: LiteralProps) { super(props); }
    patch(props: Partial<LiteralProps>) { return super.patch(props); }

    value!: any;

}