import { useEffect, useState } from 'react'
import styles from '../styles/FightPreview.module.scss'
import FighterInfo from './FighterInfo'

export default function FightPreview({ fighter1, fighter2 }) {

    if (!fighter1 || !fighter2) return

    return (
        <>
            <div className={styles.FightPreview}>
                <FighterInfo fighter1={fighter1} fighter2={fighter2} leftOrRight={true} />
                <div className={styles.fightRecap}><img src={require(`../../assets/images/vs.png`)} /></div>
                <FighterInfo fighter1={fighter2} fighter2={fighter1} leftOrRight={false} />
            </div>

        </>
    )
}