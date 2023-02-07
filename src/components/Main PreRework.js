import styles from '../styles/MainPreRework.module.scss'
import FightLogs from './FightLogs'
import FightPreview from './FighterPreview'
import FighterInfo from './FighterInfo'
import FighterPreview from './FighterPreview'
import { useEffect, useState } from 'react'
import { apiService } from 'services/APIService'

import { Fighter } from 'classes/NotImplemented'
import ChooseFighter from './ChooseFighter'

export default function Main() {

    const [fighter1, setFighter1] = useState()
    const [fighter2, setFighter2] = useState()

    const [chooseFighter1, setChooseFighter1] = useState()
    const [chooseFighter2, setChooseFighter2] = useState()

    const [fightStart, setFightStart] = useState(false)
    const [startNextMatch, setStartNextMatch] = useState(true)

    const changeFighter1 = () => {
        apiService.get(`fighters/${chooseFighter1}`).then(response => setFighter1(Object.assign(response.data, { current_hp: response.data.hp })))
    }
    const changeFighter2 = () => {
        apiService.get(`fighters/${chooseFighter2}`).then(response => setFighter2(Object.assign(response.data, { current_hp: response.data.hp })))
    }

    const nextMatch = () => {
        setFightStart(true)
        setTimeout(() => setStartNextMatch(!startNextMatch), 1000)
    }

    useEffect(() => {
        console.log('NEXT MATCH')
        console.log('Fighters', fighter1, fighter2)
        if (fighter1 && !fightStart) setFighter1({ ...fighter1, current_hp: fighter1.hp })
        if (fighter2 && !fightStart) setFighter2({ ...fighter2, current_hp: fighter2.hp })
    }, [fightStart])


    // if (!fighter1 || !fighter2) return

    return (
        <div className={styles.container}>
            <div className={styles.choose}>
                <h2>Choose your fighters:</h2>
                <div className={styles.inputs}>
                    <ChooseFighter fighterPosition={'Fighter1'} changeFighter={changeFighter1} setChooseFighter={setChooseFighter1} />
                    <div className={styles.cheat1}></div>
                    <ChooseFighter fighterPosition={'Fighter2'} changeFighter={changeFighter2} setChooseFighter={setChooseFighter2} />
                </div>
            </div>
            {(fighter1 && fighter2) ?
                <div className={styles.FightPreview}>
                    <FighterInfo fighter1={fighter1} fighter2={fighter2} leftOrRight={true} />
                    <div onClick={() => nextMatch()}>
                        <img className={styles.vs} src={require(`../../assets/images/vs.png`)} />
                    </div>
                    <FighterInfo fighter1={fighter2} fighter2={fighter1} leftOrRight={false} />
                </div>
                : <div className={styles.cheat2}></div>}
            {fightStart && <FightLogs fighter1={fighter1} fighter2={fighter2} setFightStart={setFightStart} />}
        </div>
    )
}
