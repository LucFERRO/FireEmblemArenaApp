import { useState, useEffect } from 'react'
import styles from '../styles/FightLogs.module.scss'
import * as methods from '../methods/FightMethods'

export default function FightLogs({ fighter1, fighter2, setFightStart }) {

    const [first, setFirst] = useState(fighter1)
    const [second, setSecond] = useState(fighter2)

    const [turnAttacks, setTurnAttacks] = useState()
    const [turnActions, setTurnActions] = useState()

    const [logs, setLogs] = useState([])

    const [goNext, setGoNext] = useState(false)

    useEffect(() => {
        console.log('fight logs', fighter1.name, fighter2.name)
        startFight()
    }, [])

    const nextTurn = (fighter1, fighter2) => {
        let nextTurn = methods.turn(first, second)
        if (nextTurn.attacks.at(-1).isFighter1sTurn) {
            setFirst(nextTurn.attacks.at(-1).attacker)
            setSecond(nextTurn.attacks.at(-1).attacked)
        } else {
            setFirst(nextTurn.attacks.at(-1).attacked)
            setSecond(nextTurn.attacks.at(-1).attacker)
        }
        setTurnAttacks(nextTurn.attacks)
        setTurnActions(nextTurn.actions)

        logs.push(nextTurn.actions)
        setLogs(logs)
    }

    const startFight = () => {
        if (fighter1.current_hp * fighter2.current_hp != 0) {
            nextTurn(fighter1, fighter2)
            return setTimeout(() => startFight(), 1000)
        }
        setGoNext(true)
    }

    return (
        <div className={styles.container}>
            <h1>FightLogs</h1>
            <div className={styles.logs}>
                <div>
                    {logs.map((log, i) => {
                        return <span key={i}><h2>Turn {i+1}:</h2> {log.map((attack, y) => {
                            return <p key={y}>{attack}</p>
                        })}</span>
                    })}
                </div>
            </div>
            {goNext && <button onClick={()=> setFightStart(false)}>Go next</button>}
        </div>
    )
}
