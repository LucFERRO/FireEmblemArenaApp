import styles from '../styles/FighterInfo.module.scss'
import * as methods from '../methods/FightMethods'

export default function FighterInfo({ fighter1, fighter2, leftOrRight }) {

    if (!fighter1) return

    return (
        <div>
            <div className={leftOrRight ? styles.fighter1 : styles.fighter2}>
                <div className={styles.imgContainer}>
                    <img className={styles.sprite} src={require(`../../assets/images/${fighter1.sprite}.png`)} />
                </div>
                <div>{fighter1.name}</div>
                <div className={styles.weapContainer}>
                    <img className={styles.weaponType} src={require(`../../assets/images/weap_${fighter1.weapon_type}.png`)} />
                    {fighter1.weapon}
                </div>
                <div>HP: {fighter1.hp}</div>
                {fighter2 && <>
                    <div>Dmg: {methods.dmgCalc(fighter1.atk, fighter2.def)}{methods.isDualStrike(fighter1.spd, fighter2.spd) ? ' x2' : ''}</div>
                    <div>Hit: {methods.hitChance(fighter1.hit, fighter2.avo)}</div>
                    <div>Crit: {fighter1.crit}</div>
                </>}
            </div>
        </div>
    )
}