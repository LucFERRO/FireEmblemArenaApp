import React, { useEffect } from 'react'
import styles from '../styles/ChooseFighter.module.scss'

export default function ChooseFighter({ fighterList, fighterPosition, changeFighter }) {

    return (
        <div className={styles.container}>
            <h1>{fighterPosition}</h1>
            <select
                onChange={(e) => changeFighter(e.target.value)}
            // className={style.select_month}
            >
                <option value="" disabled selected hidden>Choose a hero</option>
                {fighterList.map((fighter, i) => <option key={i} value={fighter.character_id}>{fighter.name}</option>)}
            </select>
        </div>
    )
}
