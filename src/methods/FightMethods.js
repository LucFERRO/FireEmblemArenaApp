export const dmgCalc = (atk1, def2) => {
    let dmg = atk1 - def2 > 0 ? atk1 - def2 : 0
    // let isDualStrike = spd1 >= spd2 + 5
    return dmg
}

export const hitChance = (hit1, avo2) => {
    let hitChance = hit1 - avo2 < 100 ? hit1 - avo2 : 100
    return hitChance
}

export const attack = (fighter1, fighter2) => {
    let turnActions = []
    let attacks = 2

    let attacker = fighter1
    let attacked = fighter2

    let speedDiff = attacker.spd - attacked.spd
    let speedCheck = undefined //Undefined if no one dual strikes

    if (speedDiff >= 5) speedCheck = true
    if (speedDiff <= -5) speedCheck = false
    if (speedDiff != undefined) attacks = 3 // 3 attacks this turn if someone dual strikes

    console.log('speedDiff', speedDiff)
    console.log('speedCheck', speedCheck)

    for (let i = 1; i <= attacks; i++) {
        let isFighter1sTurn = (i % 2 == 1)
        console.log(i, isFighter1sTurn)
        if (i==3 && !speedCheck) isFighter1sTurn = false

        if (!isFighter1sTurn) {
            attacker = fighter2
            attacked = fighter1
        }
        // [ isFighter1sTurn, isHit, isCrit, dmg ]
        let result = {isFighter1sTurn: isFighter1sTurn, isHit: isHit(attacker.hit, attacked.avo), isCrit: isCrit(attacker.crit), dmg: dmgCalc(attacker.atk, attacked.def)}

        turnActions.push(result)
    }

    return turnActions
}

export const turnAction = (attacker, attacked) => {
    const result = attack(attacker, attacked)
    if (!result[0]) return result.push(`${attacker.name} misses.`)
    let statement = `${attacker.name} hits ${attacked.name} for ${dmgCalc(attacker.atk, attacker.spd, attacked.def, attacked.spd)} damage.`
    if (result[1]) {
        statement = `Critical Hit ! ${attacker.name} hits ${attacked.name} for ${3 * dmgCalc(attacker.atk, attacker.spd, attacked.def, attacked.spd)} damage.`
    }
    result.push(statement)
    return result

}

export const attack2 = (dmg, hit, crit) => {
    let roll = Math.floor(Math.random() * 100)
    if (roll > hit) return false
    return isCrit(crit) ? dmg * 3 : dmg
}

export const isHit = (hit1, avo2) => {
    let roll = Math.floor(Math.random() * 100)
    let hitChance = hit1 - avo2 < 100 ? hit1 - avo2 : 100
    return roll < hitChance
}

export const isCrit = (crit) => {
    let roll = Math.floor(Math.random() * 100)
    return roll < crit
}