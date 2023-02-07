import { useState, useEffect } from 'react'
import styles from '../styles/FightLogs.module.scss'
import * as methods from '../methods/FightMethods'
import ActualFight from './ActualFight'

export default function FightLogs({ fighter1, fighter2, dmgTakenFighter1, dmgTakenFighter2, setDmgTakenFighter1, setDmgTakenFighter2, setFightStart }) {

    const [goNext, setGoNext] = useState(false)
    const [first, setFirst] = useState(fighter1)
    const [second, setSecond] = useState(fighter2)

    const [attacks, setAttacks] = useState([])
    const [logs, setLogs] = useState([])

    const [displayedLogs, setDisplayedLogs] = useState([])

    const [visibleFight, setVisibleFight] = useState(false)

    useEffect(() => {
        Fight()
    }, [])

    const nextTurn = (fighter1, fighter2) => {
        let nextTurn = methods.turn(first, second)
        // console.log('Next turn', nextTurn)
        if (nextTurn.attacks.at(-1).isFighter1sTurn) {
            setFirst(nextTurn.attacks.at(-1).attacker)
            setSecond(nextTurn.attacks.at(-1).attacked)
        } else {
            setFirst(nextTurn.attacks.at(-1).attacked)
            setSecond(nextTurn.attacks.at(-1).attacker)
        }
        attacks.push(nextTurn.attacks)
        logs.push(nextTurn.actions)
        // Useless?
        setLogs(logs)
        return nextTurn.actions.length
    }

    const Fight = () => {
        if (fighter1.current_hp * fighter2.current_hp != 0) {
            let nbOfAttacksThisTurn = nextTurn(fighter1, fighter2)
            return Fight()
        }
        displayFight()

    }

    const displayFight = () => {
        console.log(attacks)
        attacks.flat(1).forEach((attack, i) => setTimeout(() => {
            if (attack.isFighter1sTurn) {
                setDmgTakenFighter1(null)
                setDmgTakenFighter2(attack.dmg)
            } else {
                setDmgTakenFighter1(attack.dmg)
                setDmgTakenFighter2(null)
            }
            setDisplayedLogs(logs.flat(1).slice(0, i + 1))
        }, i * 1000))
        setTimeout(() => {
            setGoNext(true)
        }, attacks.flat(1).length * 1000)
    }

    return (
        <div className={styles.container}>
            <h1 onClick={() => setVisibleFight(!visibleFight)}>FightLogs</h1>
            <div className={styles.fightOrLogs}>
                <div className={styles.logsContainer}>

                    {/* {logs?.map((log, i) => {
                    return <span key={i}><h2>Turn {i + 1}:</h2> {log.map((attack, y) => {
                        return <p key={y}>{attack}</p>
                    })}</span>
                })} */}
                    {displayedLogs?.map((attack, i) => {
                        return <p key={i}>{attack}</p>
                    })}
                </div>
                {visibleFight && <div className={styles.fight}>
                    <ActualFight fighter1={fighter1} fighter2={fighter2} attacks={attacks.flat(1)}/>
                </div>}
            </div>
            <button className={!goNext ? styles.hiddenButton : ''} onClick={() => setFightStart(false)}>Next</button>
        </div>
    )
}
