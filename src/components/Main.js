import styles from '../styles/Main.module.scss'
import FightLogs from './FightLogs'
import FightPreview from './FightPreview'
import { useEffect, useState } from 'react'
import { apiService } from 'services/APIService'


export default function Main() {

    const [fighter1, setFighter1] = useState()
    const [fighter2, setFighter2] = useState()

    useEffect(() => {
        apiService.get(`fighters/${12}`).then(response => setFighter1(Object.assign(response.data, {current_hp: response.data.hp})))
        apiService.get(`fighters/${11}`).then(response => setFighter2(Object.assign(response.data, {current_hp: response.data.hp})))
    }, [])

    useEffect(() => {
        console.log(fighter1)
        console.log(fighter2)
    }, [fighter1, fighter2])

    if (!fighter1 || !fighter2) return

    return (
        <div className={styles.container}>
            <FightPreview fighter1={fighter1} fighter2={fighter2} />
            <FightLogs fighter1={fighter1} fighter2={fighter2} />
        </div>
    )
}
