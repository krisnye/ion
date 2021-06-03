
declare function Parser(): {
    parse(source: string, filename: string): any
    getError(message: string, location: string, source: string, filename: string): Error
}

export = Parser
