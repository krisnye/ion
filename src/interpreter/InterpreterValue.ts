import { Function } from "../compiler/ast/Function";
import { Type } from "../compiler/ast/Type";
import { InterpreterInstance } from "./InterpreterInstance";

export type InterpreterValue = InterpreterInstance | Function | Type;
