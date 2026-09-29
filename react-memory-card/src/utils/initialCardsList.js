import { shuffleArray } from "./shuffleArray";

export function initialCardsList(cardValues) {
  const list = cardValues.map((card, index) => ({
    id: index,
    value: card,
    isFlipped: false,
    isMatched: false,
  }));
  return shuffleArray(list);
}
