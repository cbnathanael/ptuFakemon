import DieType from "./interfaces/core/dieType";

export default {
  diceFormat(dice?: DieType) {
    if(dice)
      return `${dice.dice}d${dice.type}${dice.modifier > 0 ? '+'+dice.modifier : ''}`;
    else 
      return false;
  }
} 