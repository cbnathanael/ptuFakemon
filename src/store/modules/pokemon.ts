import * as  Realm from 'realm-web';
import appRealm from '@/services/realm'; 
const authentication = {
    namespaced: true,

    state: () => ({
        pokemonNames: null,
        activePokemon: null
    }),

    actions: {
        async getPokemonNames({commit, state}:any) {
            if(state.pokemonNames == null) {
                const mongo = appRealm.currentUser?.mongoClient("Cluster0");
                const collection = mongo?.db("fakemon").collection("pokemon");
                const pokemon = await collection?.find({}, {sort: {name: 1}});
                
                const names: string[] = [];
                pokemon?.forEach(p =>{
                    names.push(p.name);
                });
                commit('setPokemonNames', names)
                return true;
            } else {
                return true;
            }
        },
        async setActivePokemon({commit}:any, name:string) {
            const mongo = appRealm.currentUser?.mongoClient("Cluster0");
            const collection = mongo?.db("fakemon").collection("pokemon");
            const pokemon = await collection?.findOne({name: name});
            commit('setActivePokemon', pokemon);
            return pokemon;
        }
        
    },
    getters: {
        pokemonNames(state:any) {
            return state.pokemonNames;
        }
    },
    mutations: {
        setPokemonNames(state: any, names: string[]) {
            state.pokemonNames = names;
        },
        setActivePokemon(state:any, pokemon:any) {
            state.activePokemon = pokemon;
        }
    },
}

export default authentication;