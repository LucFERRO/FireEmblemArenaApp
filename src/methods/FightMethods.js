import { Fighter } from "classes/Fighter"

export const dmgCalc = (atk1, def2, isCrit) => {
    let dmg = atk1 - def2 > 0 ? atk1 - def2 : 0
    return isCrit ? 3 * dmg : dmg
}

export const isDualStrike = (spd1, spd2) => {
    let speedDiff = spd1 - spd2
    return speedDiff >= 5
}

export const hitChance = (hit1, avo2) => {
    let hitChance = hit1 - avo2 < 100 ? hit1 - avo2 : 100
    return hitChance
}

export const isHit = (hit1, avo2) => {
    let roll = Math.floor(Math.random() * 100)
    return roll <= hitChance(hit1, avo2)
}

export const isCrit = (crit) => {
    let roll = Math.floor(Math.random() * 100)
    return roll <= crit
}

export const attack = (fighter1, fighter2) => {
    let turnAttacks = []
    let attacks = 2
    let endOfFight = false

    let attacker = fighter1
    let attacked = fighter2

    let speedDiff = attacker.spd - attacked.spd
    let speedCheck = 'no dual strike'

    if (speedDiff >= 5) speedCheck = true
    if (speedDiff <= -5) speedCheck = false
    if (typeof speedCheck != 'string') attacks = 3 // 3 attacks this turn if someone dual strikes

    for (let i = 1; i <= attacks && !endOfFight; i++) {
        let isFighter1sTurn = (i % 2 == 1)
        if (i == 3 && !speedCheck) isFighter1sTurn = false

        if (!isFighter1sTurn) {
            attacker = fighter2
            attacked = fighter1
        } else {
            attacker = fighter1
            attacked = fighter2
        }
        // console.log('next turn')
        // console.log('attacked hp pre hit', attacked.current_hp)

        let hitResult = isHit(attacker.hit, attacked.avo)
        let critResult = isCrit(attacker.crit)
        let dmgResult = dmgCalc(attacker.atk, attacked.def, critResult)
        let isFightOver = false

        if (hitResult) attacked.current_hp = attacked.current_hp - dmgResult
        if (attacked.current_hp <= 0) {
            attacked.current_hp = 0
            isFightOver = true
            endOfFight = true
        }
        // console.log('attacked hp post hit', attacked.current_hp)

        let result = {
            isFighter1sTurn: isFighter1sTurn,
            attacker: attacker,
            attacked: attacked,
            hp_left: attacked.current_hp,
            isHit: hitResult,
            isCrit: critResult,
            dmg: dmgResult,
            endOfFight: isFightOver
        }
        turnAttacks.push(result)
    }
    // console.log('attack in atk function', turnAttacks)
    return turnAttacks
}

export const turn = (fighter1, fighter2) => {
    const attacks = attack(fighter1, fighter2)
    let actions = []
    let fightOver = false

    attacks.map(attack => {
        if (!attack.isHit) {
            actions.push(`${attack.attacker.name} misses.`)
        } else {
            let statement = `${attack.attacker.name} hits ${attack.attacked.name} for ${attack.dmg} damage.`
            if (attack.isCrit) statement = `Critical Hit ! ` + statement
            if (attack.endOfFight) {
                statement = statement + ` ${attack.attacked.name} is out.`
            } else {
                statement = statement + ` ${attack.attacked.name} has ${attack.hp_left} HP left.`
            }
            actions.push(statement)
        }
        if (attack.endOfFight) fightOver = true

    })
    // console.log('attacks', attacks)
    // console.log('actions', actions)
    return { attacks, actions, fightOver }

}