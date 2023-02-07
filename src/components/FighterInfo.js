import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from '../styles/FighterInfo.module.scss'
import * as methods from '../methods/FightMethods'

export default function FighterInfo({ fighter1, fighter2, leftOrRight, dmgTakenFighter }) {

    const dmgRef = useRef(null)

    const [previousDmg, setPreviousDmg] = useState(dmgTakenFighter)

    useEffect(() => {
        setPreviousDmg(dmgTakenFighter)
    }, [dmgTakenFighter])

    useEffect(() => {
        // gsap.fromTo(dmgRef.current, {
        //     scale: 1,
        // },
        //     {
        //         scale: 1.5,
        //         duration: 1,
        //         yoyo: true
        //     })
        gsap.timeline()
            .fromTo(dmgRef.current, {
                scale: 1,
            },
                {
                    scale: 1.5,
                    duration: 1,
                })
            .fromTo(dmgRef.current, {
                scale: 1,
            },
                {
                    scale: 1.5,
                    duration: 1,
                })
            .to(dmgRef.current, {
                scale: 0,
                duration: 0.5
            })
    }, [previousDmg])

    if (!fighter1) return

    return (
        <div>
            <div className={leftOrRight ? styles.fighter1 : styles.fighter2}>
                <div className={styles.imgContainer}>
                    <p ref={dmgRef} className={styles.dmgNumber}>{dmgTakenFighter}</p>
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