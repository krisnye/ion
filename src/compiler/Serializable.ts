
export class Serializable {

    toJSON() {
        return { "": this.constructor.name, ...this }
    }

}