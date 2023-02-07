import { useEffect, useState } from 'react'
import styles from '../styles/FighterPreview.module.scss'
import FighterInfo from './FighterInfo'
import ChooseFighter from './ChooseFighter'

export default function FighterPreview({ fighterList, fighterPosition, changeFighter, fighter1, fighter2, leftOrRight, dmgTakenFighter }) {

    return (
        <div className={styles.fighterPreview}>
            <ChooseFighter fighterList={fighterList} fighterPosition={fighterPosition} changeFighter={changeFighter}  />
            <FighterInfo fighter1={fighter1} fighter2={fighter2} leftOrRight={leftOrRight} dmgTakenFighter={dmgTakenFighter} />
        </div>
    )
}