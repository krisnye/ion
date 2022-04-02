import { Immutable } from "../Immutable";
import { Token } from "../Token";

export interface LineProps {
    tokens: Token[];
    children: Line[];
}

export class Line extends Immutable {

    tokens!: Token[];
    children!: Line[];

    constructor(props: LineProps) { super(props); }
    patch(props: Partial<LineProps>) { return super.patch(props); }

}
