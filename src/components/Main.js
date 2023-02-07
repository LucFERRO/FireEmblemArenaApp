import styles from '../styles/Main.module.scss'
import FightLogs from './FightLogs'
import FightPreview from './FighterPreview'
import FighterInfo from './FighterInfo'
import FighterPreview from './FighterPreview'
import { useEffect, useState } from 'react'
import { apiService } from 'services/APIService'

import ChooseFighter from './ChooseFighter'
import { fighters } from '../classes/DefinitelyAnApi'
console.log(fighters)
export default function Main() {

    const [fighterList, setFighterList] = useState(fighters)

    const [fighter1, setFighter1] = useState()
    const [fighter2, setFighter2] = useState()

    const [dmgTakenFighter1, setDmgTakenFighter1] = useState()
    const [dmgTakenFighter2, setDmgTakenFighter2] = useState()

    const [fightStart, setFightStart] = useState(false)
    const [startNextMatch, setStartNextMatch] = useState(true)

    const changeFighter1 = (id) => {
        let chosenFighter = fighters.filter(fighter => fighter.character_id == id)[0]
        setFighter1(Object.assign(chosenFighter, { current_hp: chosenFighter.hp }))
    }
    const changeFighter2 = (id) => {
        let chosenFighter = fighters.filter(fighter => fighter.character_id == id)[0]
        setFighter2(Object.assign(chosenFighter, { current_hp: chosenFighter.hp }))
    }

    const nextMatch = () => {
        if (!fighter1 || !fighter2) return
        setFightStart(true)
        setTimeout(() => setStartNextMatch(!startNextMatch), 1000)
    }

    useEffect(() => {
        // console.log('NEXT MATCH')
        // console.log('Fighters', fighter1, fighter2)
        setDmgTakenFighter1(null)
        setDmgTakenFighter2(null)

        if (fighter1 && !fightStart) setFighter1({ ...fighter1, current_hp: fighter1.hp })
        if (fighter2 && !fightStart) setFighter2({ ...fighter2, current_hp: fighter2.hp })
    }, [fightStart])

    if (!fighterList) return

    return (
        <div className={styles.container}>
            <div className={styles.fightPreviewContainer}>
                <FighterPreview dmgTakenFighter={dmgTakenFighter1} fighterList={fighterList} fighterPosition={'Fighter1'} changeFighter={changeFighter1} fighter1={fighter1} fighter2={fighter2} leftOrRight={true} />
                <div onClick={() => nextMatch()}>
                    <img className={styles.vs} src={require(`../../assets/images/vs.png`)} />
                </div>
                <FighterPreview dmgTakenFighter={dmgTakenFighter2} fighterList={fighterList} fighterPosition={'Fighter2'} changeFighter={changeFighter2} fighter1={fighter2} fighter2={fighter1} leftOrRight={false} />
            </div>
            {fightStart ? <FightLogs fighter1={fighter1} fighter2={fighter2} setDmgTakenFighter1={setDmgTakenFighter1} setDmgTakenFighter2={setDmgTakenFighter2} setFightStart={setFightStart} /> : <div className={styles.cheatLogs}></div>}
        </div>
    )
}
