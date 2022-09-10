import { Container, ContainerProps } from "../ast/Container";
import { EvaluationContext } from "../EvaluationContext";
import { split } from "../pathFunctions";
import { isDeclaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { ObjectType } from "./ObjectType";
import { Pair } from "./Pair";
import { Type } from "./Type";

export interface ModuleProps extends ContainerProps {
    name: string;
    dependencies: string[];
}

export class Module extends Container {

    name!: string;
    dependencies!: string[];

    constructor(props: ModuleProps) { super(props); }
    patch(props: Partial<ModuleProps>) { return super.patch(props); }

    toString() {
        let text: string;
        if (this.dependencies.length > 0) {
            text = `module ${this.name} ${ super.toString() }\n// externals: ${JSON.stringify(this.dependencies)}`;
        }
        else {
            text = `module ${this.name} ${ super.toString() }`;
        }
        return text + this.toTypeString();
    }

    //  We actually need to resolveType on Modules.
    //  *if* they contain a same named Class then we use that as the Module.
    protected resolveType(c: EvaluationContext): Type | null {
        throw new Error("We don't have Modules present at Type Inference time.");
        // return new ObjectType({
        //     location: this.location,
        //     properties: this.nodes.filter(isDeclaration).map(
        //         d => {
        //             let shortName = split(d.id.name).pop()!;
        //             return new Pair({
        //                 location: d.location,
        //                 key: new Identifier({ location: d.location, name: shortName }),
        //                 value: d.type!,
        //             });
        //         }
        //     )
        // });
    }

    toESNode(c: EvaluationContext): any {
        return {
            type: "Program",
            sourceType: "module",
            body: this.nodes.map(node => node.toESNode(c))
        }
    }

}
