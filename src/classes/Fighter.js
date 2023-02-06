export class Fighter {

    constructor(name, classs, level, weapon, weapon_type, sprite, atk, hp, current_hp, str, mag, dex, spd, def, res, lck, hit, crit, avo) {
    this.name = name;
    this.classs = classs;
    this.level = level;
    this.weapon = weapon;
    this.weapon_type = weapon_type;
    this.sprite = sprite;
    this.atk = atk;
    this.hp = hp;
    this.current_hp = current_hp;
    this.str = str;
    this.mag = mag;
    this.dex = dex;
    this.spd = spd;
    this.def = def;
    this.res = res;
    this.lck = lck;
    this.hit = hit;
    this.crit = crit;
    this.avo = avo;
}

setCurrentHp(hp) {
    this.current_hp = hp
}

getCurrentHp() {
    return this.current_hp
}

isDead() {
    return this.current_hp <= 0
}

}