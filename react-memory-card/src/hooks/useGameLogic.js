import { useEffect, useRef, useState } from "react";
import { initialCardsList } from "../utils/initialCardsList";
import { cardValues } from "../data/cardValues";

function useGameLogic() {
  const timeRef = useRef(null);
  const [cards, setCards] = useState(() => initialCardsList(cardValues));
  const [moves, setMoves] = useState(0);
  const [matchedList, setMatchedList] = useState([]);
  const [selectList, setSelectList] = useState([]);

  const score = matchedList.length / 2;
  const endGame = matchedList.length === cards.length;
  const isBlocked = selectList.length === 2;

  useEffect(() => {
    if (selectList.length === 2) {

      if (selectList[0].value === selectList[1].value) {
        timeRef.current = setTimeout(() => {
          setMatchedList((prev) => [...prev, ...selectList]);
          setCards(prev=>
            prev.map((c) =>
              c.id === selectList[0].id || c.id === selectList[1].id
                ? { ...c, isMatched: true }
                : c,
            ),
          );
          setSelectList([]);
          setMoves((prev) => prev + 1);
        }, 500);
      } else {
		
        timeRef.current = setTimeout(() => {
          setCards(prev=>
           prev.map((c) =>
              c.id === selectList[0].id || c.id === selectList[1].id
                ? { ...c, isFlipped: false }
                : c,
            ),
          );
          setSelectList([]);
          setMoves((prev) => prev + 1);
        }, 1000);
      }
    }

    return () => clearTimeout(timeRef.current);
  }, [selectList]);

  function startNewGame() {
    setCards(initialCardsList(cardValues));
    setMoves(0);
    setMatchedList([]);
    setSelectList([]);
  }

  function flippedCard(card) {
    setCards( prev=> 
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)),
    );
    setSelectList((prev) => [...prev, card]);
  }

	return {cards, moves, startNewGame, flippedCard, endGame, score, isBlocked} ;
}

export default useGameLogic;