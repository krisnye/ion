import { Immutable } from "../Immutable";
import { SourceLocation } from "./SourceLocation";


export class Node extends Immutable {

    location!: SourceLocation;

    toJSON() {
        return { ...super.toJSON(), location: void 0 }
    }

}