export default {
    getD6roll(qty: number) {
            const rolls = [];
            for(let i = 0; i < qty; i++) {
                rolls.push(Math.floor( Math.random() * 6 )+1)

            }
            return(rolls)
    },
    getPercentageRoll() {
        Math.floor( Math.random() * 100 )+1
    },
    getNumberBetween(min:number, max:number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}