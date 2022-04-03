import { Converter } from "../../converters/Converter";
import { Node } from "../../Node";
import { addTypesToLiterals } from "./addTypesToLiterals";

export const simplifyConverters: Converter<Node,Node>[] = [...addTypesToLiterals] as any;
