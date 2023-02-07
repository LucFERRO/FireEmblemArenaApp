import styles from '../styles/Main.module.scss'
import FightLogs from './FightLogs'
import FightPreview from './FighterPreview'
import FighterInfo from './FighterInfo'
import FighterPreview from './FighterPreview'
import { useEffect, useState } from 'react'
import { apiService } from 'services/APIService'

import { Fighter } from 'classes/Fighter'
import ChooseFighter from './ChooseFighter'

export default function Main() {

    const [fighterList, setFighterList] = useState()

    const [fighter1, setFighter1] = useState()
    const [fighter2, setFighter2] = useState()

    const [dmgTakenFighter1, setDmgTakenFighter1] = useState()
    const [dmgTakenFighter2, setDmgTakenFighter2] = useState()

    const [fightStart, setFightStart] = useState(false)
    const [startNextMatch, setStartNextMatch] = useState(true)

    const changeFighter1 = (id) => {
        apiService.get(`fighters/${id}`).then(response => setFighter1(Object.assign(response.data, { current_hp: response.data.hp })))
    }
    const changeFighter2 = (id) => {
        apiService.get(`fighters/${id}`).then(response => setFighter2(Object.assign(response.data, { current_hp: response.data.hp })))
    }

    const nextMatch = () => {
        if(!fighter1 || !fighter2) return
        setFightStart(true)
        setTimeout(() => setStartNextMatch(!startNextMatch), 1000)
    }

    useEffect(() => {
        apiService.get(`characters/`).then(response => setFighterList(response.data))
    }, [])

    useEffect(() => {
        // console.log('NEXT MATCH')
        // console.log('Fighters', fighter1, fighter2)
        if (fighter1 && !fightStart) setFighter1({ ...fighter1, current_hp: fighter1.hp })
        if (fighter2 && !fightStart) setFighter2({ ...fighter2, current_hp: fighter2.hp })
    }, [fightStart])

    // useEffect(() => {
    //     apiService.get(`fighters/${13}`).then(response => setFighter1(Object.assign(response.data, { current_hp: response.data.hp })))
    //     apiService.get(`fighters/${11}`).then(response => setFighter2(Object.assign(response.data, { current_hp: response.data.hp })))
    //     // apiService.get(`fighters/${13}`).then(response => {
    //     //     setFighter1(new Fighter(response.data.name, response.data.class, response.data.level, response.data.weapon, response.data.weapon_type, response.data.sprite, response.data.atk, response.data.hp, response.data.hp, response.data.str, response.data.mag, response.data.dex, response.data.spd, response.data.def, response.data.res, response.data.lck, response.data.hit, response.data.crit, response.data.avo,
    //     //     ))
    //     // })
    //     // apiService.get(`fighters/${11}`).then(response => {
    //     //     setFighter2(new Fighter(response.data.name, response.data.class, response.data.level, response.data.weapon, response.data.weapon_type, response.data.sprite, response.data.atk, response.data.hp, response.data.hp, response.data.str, response.data.mag, response.data.dex, response.data.spd, response.data.def, response.data.res, response.data.lck, response.data.hit, response.data.crit, response.data.avo,
    //     //     ))
    //     // })
    // }, [])

    // useEffect(() => {
    //     console.log(fighter1)
    //     console.log(fighter2)
    // }, [fighter1, fighter2])

    // if (!fighter1 || !fighter2) return

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
