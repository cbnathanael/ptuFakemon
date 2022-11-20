import * as  Realm from 'realm-web';
import appRealm from '@/services/realm'; 
import Pokemon from '@/interfaces/pokemon/pokemon';
import PokemonAbility from '@/interfaces/pokemon/PokemonAbility';
import PokemonNature from '@/interfaces/pokemon/PokemonNature';
const mongo = appRealm.currentUser?.mongoClient("Cluster0");

const pokemon = {
    namespaced: true,

    state: () => ({
        pokemonNames: [],
        activePokemon: null,
        abilities: [],
        natures: []
    }),

    actions: {
        async getPokemonNames({commit, state}:any) {
            if(state.pokemonNames.length == 0) {
                const collection = mongo?.db("fakemon").collection("pokemon");
                const pokemon = await collection?.find({}, {sort: {name: 1}});
                
                const names: string[] = [];
                pokemon?.forEach(p =>{
                    if(p.abilities)
                        names.push(p.name);
                });
                commit('setPokemonNames', names)
                return true;
            } else {
                return true;
            }
        },
        async setActivePokemon({commit}:any, name:string) {
            const collection = mongo?.db("fakemon").collection("pokemon");
            const pokemon = await collection?.findOne({name: name});
            commit('setActivePokemon', pokemon);
            return pokemon;
        },
        async lookupAbility({commit, state}:any, abilityName:string) {
            const ability = state.abilities.find((ability: PokemonAbility) => ability.name === abilityName)
            if(ability) {
                //no need to add it to the store
                return ability;
            } else {
                const collection = mongo?.db("fakemon").collection("pokemonAbilities");
                const ability = await collection?.findOne({name: abilityName});
                if(ability) {
                    commit("addAbility", ability);
                    return ability;
                }
            }
        },
        async lookupNature({commit, state}:any, natureName:string) {
            const nature = state.natures.find((nature: PokemonNature) => nature.nature === natureName)
            if(nature) {
                //no need to add it to the store
                return nature;
            } else {
                const collection = mongo?.db("fakemon").collection("pokemonNatures");
                const nature = await collection?.findOne({name: natureName});
                if(nature) {
                    commit("addnature", nature);
                    return nature;
                }
            }
        }  
        
    },
    getters: {
        pokemonNames: (state:any)=> {
            return state.pokemonNames;
        },
        ability: (state:any) => (abilityName:string) => {
            return state.abilities.find((ability: PokemonAbility) => ability.name === abilityName)
        }
    },
    mutations: {
        setPokemonNames(state: any, names: string[]) {
            state.pokemonNames = names;
        },
        setActivePokemon(state:any, pokemon:Pokemon) {
            state.activePokemon = pokemon;
        },
        addAbility(state:any, ability:PokemonAbility) {
            state.abilities.push(ability);
        },
        addNature(state:any, nature:PokemonNature) {
            state.abilities.push(nature);
        }
    },
}

export default pokemon;