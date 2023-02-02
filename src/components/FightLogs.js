import { useState, useEffect } from 'react'
import * as methods from '../methods/FightMethods'

export default function FightLogs({ fighter1, fighter2 }) {

    const [first, setFirst] = useState(fighter1)
    const [second, setSecond] = useState(fighter2)

    const [turnResult, setTurnResult] = useState()

    useEffect(() => {
        setTurnResult(methods.attack(first, second))
    }, [])

    useEffect(() => {
        console.log('turnResult', turnResult)
    }, [turnResult])

    if (!turnResult) return

    return (
        <div>FightLogs:
            {/* {turnResult} */}
        </div>
    )
}
