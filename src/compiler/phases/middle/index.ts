import { identity } from "../identity";
import { Phase } from "../Phase";
import { createMultiFunctions } from "./createMultiFunctions";
import { removeSSANames } from "./removeSSANames";

export const middlePhasesAssembly: Phase[] = [  
    createMultiFunctions,
    removeSSANames,
    identity,
];
