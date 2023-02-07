import { useState, useEffect } from 'react'
import styles from '../styles/FightLogs.module.scss'
import * as methods from '../methods/FightMethods'

export default function FightLogs({ fighter1, fighter2, setDmgTakenFighter1, setDmgTakenFighter2, setFightStart }) {

    const [goNext, setGoNext] = useState(false)
    const [first, setFirst] = useState(fighter1)
    const [second, setSecond] = useState(fighter2)

    const [attacks, setAttacks] = useState([])
    const [logs, setLogs] = useState([])

    const [displayedLogs, setDisplayedLogs] = useState([])

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
            // return setTimeout(() => Fight(), nbOfAttacksThisTurn*1000)
        }
        displayFight()

    }

    const displayFight = () => {
        console.log('display attacks', attacks.flat(1))
        console.log(logs)
        attacks.flat(1).forEach((attack, i) => setTimeout(() => {
            if (attack.isFighter1sTurn) {
                setDmgTakenFighter1('')
                setDmgTakenFighter2(attack.dmg)
            } else {
                setDmgTakenFighter1(attack.dmg)
                setDmgTakenFighter2('')
            }
            setDisplayedLogs(logs.flat(1).slice(0, i + 1))
        }, i * 1000))

        // setDisplayedLogs(attacks.flat(1))
        // console.log('display fight',logs.flat(1))
        // let res = []
        // logs.forEach((log, i) => {
        //     setTimeout(() => {
        //     console.log('Turn', i + 1)
        //     log.forEach((attack, y) => {
        //         setTimeout(() => {
        //             console.log('Turn', i + 1, 'attack', y, attack)
        //         }, (i) * (y) * 500)
        //     })
        //     }, (i)*log.length*500)
        // })
        setGoNext(true)
    }

    return (
        <div className={styles.container}>
            <h1>FightLogs</h1>
            <div className={styles.logs}>
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
            </div>
            {goNext && <button onClick={() => setFightStart(false)}>Go next</button>}
        </div>
    )
}
