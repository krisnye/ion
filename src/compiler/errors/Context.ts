import LocationCalculator from "./LocationCalculator"

export default class Context
{
    readonly filename: string
    source: string
    offset: number = 0
    state: {[name: string]: any} = {}
    private locationCalculator?: LocationCalculator

    constructor(source: string, filename: string) {
        this.source = source
        this.filename = filename
        this.lines = this.source.split(/\r?\n/g)
    }

    private lines: string[]
    getLine(indexStartingAtOne: number) {
        return this.lines[indexStartingAtOne - 1]
    }

    getLocationCalculator() {
        if (this.locationCalculator == null)
            this.locationCalculator = new LocationCalculator(this.source)
        return this.locationCalculator
    }

}