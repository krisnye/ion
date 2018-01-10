
function speculate(reserveRate: number, initialCrashRisk: number, growth: number, months: number = 48) {
    let crashRisk = initialCrashRisk
    let total = 100000
    let riskIncrease = 0.01
    for (let i = 0; i < months; i++) {
        let reserve = total * reserveRate
        let invest = total - reserve
        // rebalance investments
        let crash = Math.random() <= crashRisk
        if (crash) {
            crashRisk = initialCrashRisk
            invest = 0
        } else {
            invest = invest * growth
        }
        //  set new total
        total = reserve + invest
        //  increase risk of crash
        crashRisk += riskIncrease
    }
    return total
}

function average(fn: () => number, count = 1000) {
    let total = 0
    for (let i = 0; i < count; i++) {
        total += fn()
    }
    return Math.round(total / count)
}

function speculateAverage(reserveRate: number, crashRisk = 0.05, growth = 1.8) {
    return average(speculate.bind(null, reserveRate, crashRisk, growth))
}

export function testVariableReserveRate() {
    for (let reserveRate = 0; reserveRate <= 100; reserveRate++) {
        let result = speculateAverage(reserveRate / 100)
        let paddedReserveRate = reserveRate.toString()
        if (paddedReserveRate.length < 2)
            paddedReserveRate = "0" + paddedReserveRate
        console.log(paddedReserveRate + "% => " + result)
    }
}

testVariableReserveRate()
