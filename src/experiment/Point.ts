
export default class Point {

    x = 0
    y = 0

    static distance(a: Point, b: Point) {
        return Math.hypot(a.x - b.x, a.y - b.y)
    }

    static readonly foo = 22

}

export const distance = Point.distance
export const foo = Point.foo
