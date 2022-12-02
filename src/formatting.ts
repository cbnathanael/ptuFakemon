import DieType from "./interfaces/core/dieType";

export default {
  diceFormat(dice?: DieType) {
    if (dice)
      return `${dice.dice}d${dice.type}${dice.modifier > 0 ? '+' + dice.modifier : ''}`;
    else
      return false;
  },
  typeColor(color: string) {
    switch (color) {
      case "normal": return { std: 'rgb(166, 168, 167)', dark: 'rgb(142, 142, 142)', light: 'rgb(218, 218, 218)' };
      case "bug": return { std: 'rgb(151, 159, 22)', dark: 'rgb(85, 88, 42)', light: 'rgb(217, 227, 56)' };
      case "electric": return { std: 'rgb(255, 197, 0)', dark: 'rgb(163, 135, 41)', light: 'rgb(255, 220, 102)' };
      case "fighting": return { std: 'rgb(255, 127, 0)', dark: 'rgb(163, 102, 41)', light: 'rgb(255, 178, 102)' };
      case "ghost": return { std: 'rgb(109, 63, 109)', dark: 'rgb(74, 47, 74)', light: 'rgb(169, 105, 169)' };
      case "psychic": return { std: 'rgb(237, 66, 118)', dark: 'rgb(180, 72, 105)', light: 'rgb(246, 159, 186)' };
      case "flying": return { std: 'rgb(129, 184, 240)', dark: 'rgb(122, 159, 196)', light: 'rgb(220, 235, 251)' };
      case "steel": return { std: 'rgb(99, 163, 190)', dark: 'rgb(100, 127, 138)', light: 'rgb(171, 205, 220)' };
      case "ice": return { std: 'rgb(73, 215, 253)', dark: 'rgb(70, 177, 205)', light: 'rgb(174, 237, 254)' };
      case "poison": return { std: 'rgb(147, 64, 208)', dark: 'rgb(114, 88, 133)', light: 'rgb(193, 146, 228)' };
      case "fire": return { std: 'rgb(227, 42, 39)', dark: 'rgb(147, 69, 68)', light: 'rgb(239, 131, 129)' };
      case "dragon": return { std: 'rgb(76, 100, 236)', dark: 'rgb(76, 88, 160)', light: 'rgb(168, 180, 246)' };
      case "ground": return { std: 'rgb(147, 82, 24)', dark: 'rgb(79, 59, 41)', light: 'rgb(222, 132, 51)' };
      case "water": return { std: 'rgb(47, 127, 240)', dark: 'rgb(63, 109, 173)', light: 'rgb(142, 186, 247)' };
      case "dark": return { std: 'rgb(77, 64, 56)', dark: 'rgb(41, 41, 41)', light: 'rgb(136, 113, 99)' };
      case "rock": return { std: 'rgb(179, 171, 132)', dark: 'rgb(130, 130, 130)', light: 'rgb(218, 214, 195)' };
      case "grass": return { std: 'rgb(61, 162, 34)', dark: 'rgb(62, 91, 54)', light: 'rgb(109, 218, 80)' };
      case "fairy": return { std: 'rgb(244, 108, 240)', dark: 'rgb(199, 102, 196)', light: 'rgb(199, 102, 196)' };
    }
  }
}

