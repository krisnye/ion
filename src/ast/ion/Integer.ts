/*
This file was generated from ion source. Do not edit.
*/
import * as Number from './Number';
export type Integer = Number.Number;
export function isInteger(value): value is Integer {
    return Number.isNumber(value) && value % 1 === 0;
}
export default Integer;