import * as  Realm from 'realm-web';
import appRealm from '@/services/realm'; 
import Move from '@/interfaces/pokemon/move';

const mongo = appRealm.currentUser?.mongoClient("Cluster0");


const moves = {
    namespaced: true,

    state: () => ({
        moves: []
    }),
    actions: {
        async lookupMove({commit, state}:any, moveName:string) {
            const move = state.moves.find((move: Move) => move.name === moveName)
            if(move) {
                //no need to add it to the store
                return move;
            } else {
                const collection = mongo?.db("fakemon").collection("pokemonMoves");
                const move = await collection?.findOne({name: moveName});
                if(move) {
                    commit("addMove", move);
                    return move;
                }
            }
        } 
    },
    getters: {
        ability: (state:any) => (moveName:string) => {
            return state.moves.find((move: Move) => move.name === moveName)
        }
    },
    mutations: {
        addMove(state:any, move:Move) {
            if(!state.moves.find((m: Move) => m.name === move.name))
                state.moves.push(move);
        }
    }
}

export default moves;