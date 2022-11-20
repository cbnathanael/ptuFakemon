import Pokemon from "./pokemon";
import Move from './move';
import PokemonNature from "./PokemonNature";
export default interface PokemonCharacter  {
    speciesData: Pokemon,
    name: string,
    experience: number,
    level: number,
    hitPoints: number
    stats: {
        hp: {base: number, mod:number},
        attack: {base: number, mod:number},
        defense: {base: number, mod:number},
        specialAttack: {base: number, mod:number},
        specialDefense: {base: number, mod:number},
        speed: {base: number, mod:number},
    },
    movement: {
        overland: {base: number, mod:number},
        sky: {base: number, mod:number},
        swim: {base: number, mod:number},
        levitate: {base: number, mod:number},
        burrow: {base: number, mod:number},
        hJump: {base: number, mod:number},
        lJump: {base: number, mod:number},
    },
    power: number,
    naturewalk: string[],
    abilities: string[],
    moves: Move[],
    capabilities: string[],
    gender: string,
    nature: PokemonNature|undefined
}

