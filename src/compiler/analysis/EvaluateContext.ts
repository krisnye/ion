import { Lookup } from "@glas/traverse";
import { ScopeMaps } from "../createScopeMaps";

type EvaluateContext = { lookup: Lookup, scopes: ScopeMaps }

export default EvaluateContext
