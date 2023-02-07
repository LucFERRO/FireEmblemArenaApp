import { useState, useEffect, useRef } from 'react'
import styles from '../styles/ActualFight.module.scss'
import { gsap } from 'gsap'

export default function ActualFight({ fighter1, fighter2, attacks }) {

    const fighter1Ref = useRef(null)
    const fighter2Ref = useRef(null)

    const [currentTurn, setCurrentTurn] = useState()
    useEffect(() => {
        attacks.forEach((attack, i) => {
            setTimeout(() => {
                setCurrentTurn(previous => attack)
                // gsap.timeline()
                //     .fromTo(dmg1Ref.current, {
                //         scale: 1,
                //     },
                //         {
                //             scale: 1.5,
                //             duration: 1,
                //         })
                //     .fromTo(dmg1Ref.current, {
                //         scale: 1,
                //     },
                //         {
                //             scale: 1.5,
                //             duration: 1,
                //         })
                //     .to(dmg1Ref.current, {
                //         scale: 0,
                //         duration: 0.5
                //     })
            }, i * 1000)
        })
    }, [])

    useEffect(() => {
        console.log(currentTurn)
    },[currentTurn])

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                {/* <p ref={dmg1Ref} className={styles.dmgNumber}>{dmgTakenFighter1}</p> */}
                <img ref={fighter1Ref} className={styles.sprite} src={require(`../../assets/images/${fighter1.sprite}.png`)} />
            </div>
            <div className={styles.imgContainer}>
                {/* <p ref={dmg2Ref} className={styles.dmgNumber}>{dmgTakenFighter2}</p> */}
                <img ref={fighter2Ref} className={styles.sprite} src={require(`../../assets/images/${fighter2.sprite}.png`)} />
            </div>
        </div>
    )
}
