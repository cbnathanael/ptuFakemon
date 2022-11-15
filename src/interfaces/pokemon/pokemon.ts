import { DieType } from "../core/dieType"

export default interface Pokemon {
    id: number,
    name: string,
    stats: {
        hp: number,
        attack: number,
        defense: number,
        specialAttack: number,
        specialDefense: number,
        speed: number,
    },
    movement: {
        overland: number,
        sky: number,
        swim: number,
        levitate: number,
        burrow: number,
        hJump: number,
        lJump: number,
    },
    power: number,
    naturewalk: string[],
    capabilities: string[],
    size: string,
    weight: number,
    eggGroups: string[],
    types: string[],
    skills: {
        acrobatics: DieType,
        athletics: DieType
        charm: DieType
        combat: DieType
        command: DieType
        generalEducation: DieType
        medicalEducation: DieType
        occultEducation: DieType
        pokemonEducation: DieType
        technologyEducation: DieType
        focus: DieType
        guile: DieType
        intimidate: DieType
        intuition: DieType
        perception: DieType
        stealth: DieType
        survival: DieType
    }
}