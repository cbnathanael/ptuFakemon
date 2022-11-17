import DieType from "./interfaces/core/dieType";

export default {
  diceFormat(dice: DieType) {
    return `${dice.dice}d${dice.type}${dice.modifier > 0 ? '+'+dice.modifier : ''}`;
  }
} 