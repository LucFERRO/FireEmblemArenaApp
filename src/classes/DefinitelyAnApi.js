const finalSpeed = (speed, strength, weight) => {
    let strengthImpact = Math.floor(strength / 5)
    if (strengthImpact > weight) strengthImpact = weight
    let finalSpeed = speed - (weight - strengthImpact)
    if (finalSpeed < 0) finalSpeed = 0
    return finalSpeed
}

const calcHit = (weap_hit, dex, luck) => {
    let finalHit = Math.floor(weap_hit + dex * 2 + luck / 2)
    return finalHit
}

const calcCrit = (weap_crit, dex) => {
    let finalCrit = Math.floor(weap_crit + dex / 2)
    return finalCrit
}

const calcAvo = (speed, luck) => {
    let finalAvo = Math.floor(speed * 2 + luck / 2)
    return finalAvo
}

let characters = [
    {
        "character_id": 11,
        "name": "Hector",
        "level": 10,
        "class_id": 11,
        "weapon_id": 11,
        "base_hp": 30,
        "base_str": 12,
        "base_mag": 2,
        "base_dex": 7,
        "base_spd": 5,
        "base_def": 10,
        "base_res": 4,
        "base_lck": 4,
        "sprite": "hector"
    },
    {
        "character_id": 12,
        "name": "Marth",
        "level": 5,
        "class_id": 12,
        "weapon_id": 12,
        "base_hp": 300,
        "base_str": 7,
        "base_mag": 2,
        "base_dex": 10,
        "base_spd": 10,
        "base_def": 4,
        "base_res": 4,
        "base_lck": 6,
        "sprite": "marth"
    },
    {
        "character_id": 13,
        "name": "Dimitri",
        "level": 7,
        "class_id": 13,
        "weapon_id": 13,
        "base_hp": 28,
        "base_str": 9,
        "base_mag": 1,
        "base_dex": 8,
        "base_spd": 6,
        "base_def": 8,
        "base_res": 5,
        "base_lck": 5,
        "sprite": "dimitri"
    }
]

let classes = [
    {
        "class_id": 11,
        "class_name": "Lord",
        "available_weap": [
            "axe",
            "lance"
        ],
        "bonus_hp": 10,
        "bonus_str": 8,
        "bonus_mag": -2,
        "bonus_dex": 1,
        "bonus_spd": -1,
        "bonus_def": 5,
        "bonus_res": -1,
        "bonus_lck": 2
    },
    {
        "class_id": 12,
        "class_name": "Noble",
        "available_weap": [
            "sword"
        ],
        "bonus_hp": 5,
        "bonus_str": 1,
        "bonus_mag": 0,
        "bonus_dex": 2,
        "bonus_spd": 3,
        "bonus_def": 1,
        "bonus_res": 0,
        "bonus_lck": 3
    },
    {
        "class_id": 13,
        "class_name": "Rider",
        "available_weap": [
            "lance"
        ],
        "bonus_hp": 7,
        "bonus_str": 4,
        "bonus_mag": 0,
        "bonus_dex": 2,
        "bonus_spd": 2,
        "bonus_def": 3,
        "bonus_res": 0,
        "bonus_lck": 3
    }
]

let weapons = [
    {
        "weapon_id": 11,
        "weapon_name": "Armads",
        "weapon_type": "axe",
        "mt": 16,
        "hit": 60,
        "crit": 10,
        "wt": 12
    },
    {
        "weapon_id": 12,
        "weapon_name": "Falchion",
        "weapon_type": "sword",
        "mt": 10,
        "hit": 90,
        "crit": 20,
        "wt": 6
    },
    {
        "weapon_id": 13,
        "weapon_name": "Moon Gradivus",
        "weapon_type": "lance",
        "mt": 14,
        "hit": 75,
        "crit": 15,
        "wt": 9
    }
]

let fighters = []

characters.forEach(character => {
    let fittingClass = classes.filter(classs => classs.class_id == character.class_id)[0]
    let fittingWeapon = weapons.filter(weapon => weapon.weapon_id == character.weapon_id)[0]
    let newFighter = {
        name: character.name,
        character_id: character.character_id,
        class: fittingClass.class_name,
        weapon: fittingWeapon.weapon_name,
        weapon_type: fittingWeapon.weapon_type,
        sprite: character.sprite,
        level: character.level,
        atk: character.base_str + fittingClass.bonus_str + fittingWeapon.mt,
        hp: character.base_hp + fittingClass.bonus_hp,
        str: character.base_str + fittingClass.bonus_str,
        mag: character.base_mag + fittingClass.bonus_mag,
        dex: character.base_dex + fittingClass.bonus_dex,
        spd: finalSpeed(character.base_spd + fittingClass.bonus_spd, character.base_str + fittingClass.bonus_str, fittingWeapon.wt),
        def: character.base_def + fittingClass.bonus_def,
        res: character.base_res + fittingClass.bonus_res,
        lck: character.base_lck + fittingClass.bonus_lck,
        hit: calcHit(fittingWeapon.hit, character.base_dex + fittingClass.bonus_dex, character.base_lck + fittingClass.bonus_lck),
        crit: calcCrit(fittingWeapon.crit, character.base_dex + fittingClass.bonus_dex),
        avo: calcAvo(character.base_spd + fittingClass.bonus_spd, character.base_lck + fittingClass.bonus_lck)
    }
    fighters.push(newFighter)
})

export { fighters }