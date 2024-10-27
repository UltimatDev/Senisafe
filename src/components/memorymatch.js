import React, { useState, useEffect } from 'react';
import styles from './memory.module.css';  // Import as CSS module

function MemoryMatch ()  {
  const symbols = [
    "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍊", "🍊", 
    "🍉", "🍉", "🍍", "🍍", "🍒", "🍒", "🥭", "🥭",
    "🥑", "🥑", "🍋", "🍋" 
  ];

  const [cards, setCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const shuffledSymbols = shuffle([...symbols]);
    const cardObjects = shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol: symbol,
      revealed: false,
      matched: false
    }));
    
    setCards(cardObjects);
    flashCards(cardObjects);
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const flashCards = (cards) => {
    setCards(cards.map(card => ({ ...card, revealed: true }))); // Show all cards
    setTimeout(() => {
      setCards(cards.map(card => ({ ...card, revealed: false }))); // Hide them after 2 seconds
    }, 2000);
  };

  const handleCardClick = (id) => {
    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard.revealed || clickedCard.matched || revealedCards.length === 2) return;

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, revealed: true } : card
    );
    setCards(updatedCards);
    setRevealedCards([...revealedCards, clickedCard]);

    if (revealedCards.length === 1) {
      checkForMatch(clickedCard);
    }
  };

  const checkForMatch = (clickedCard) => {
    const [firstCard] = revealedCards;
    if (firstCard.symbol === clickedCard.symbol) {
      const updatedCards = cards.map(card =>
        card.symbol === clickedCard.symbol ? { ...card, matched: true } : card
      );
      setCards(updatedCards);
      setMatchedCards([...matchedCards, firstCard, clickedCard]);
      if (updatedCards.filter(card => card.matched).length === symbols.length) {
        setTimeout(() => setShowCongrats(true), 500);
      }
    } else {
      setTimeout(() => {
        const resetCards = cards.map(card =>
          card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, revealed: false }
              : card
        );
        setCards(resetCards);
      }, 1000);
    }
    setRevealedCards([]);
  };

  return (
    <div className={styles['game-container']}>
      <h1 className={styles['title']}>MEMORY MATCHING GAME</h1>
      <div className={styles['game-board']}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles['card']} ${card.revealed ? styles['revealed'] : ''} ${card.matched ? styles['matched'] : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.revealed || card.matched ? card.symbol : ""}
          </div>
        ))}
      </div>

      {showCongrats && <div className={`${styles['congratulations']} ${styles['show']}`}>Congratulations! 🎉</div>}

      <button className={styles['reload']} onClick={() => window.location.reload()}>Reset</button>
    </div>
  );
};

export default MemoryMatch;
