import DieType from "../core/dieType"
import Evolution from "./evolution";
import PokemonMove from "./pokemonMove";
import pokemonTMHMMove from "./pokemonTMHMMove";
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
    abilities: {
        basic: string[],
        advanced: string[],
        high: string[]
    },
    moves: PokemonMove[],
    tmHmMoves: pokemonTMHMMove[],
    tutorMoves: string[],
    evolutions: Evolution[]
    capabilities: string[],
    size: {
        height: {
            inches: number,
            metric: number,
            scale: string
        },
        weight: {
            pounds: number,
            kilograms: number,
            scale: number
        }
    },
    breeding: {
        ratio:{male:number,female:number},
        eggGroups: string[]
        hatchRate?: number
    },
    diet: string[],
    habitat: string[],
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