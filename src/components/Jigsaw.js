import React, { useEffect, useState } from 'react';
import styles from './jigsawpuzz.module.css'; // Import as CSS module

const JigsawPuzzleGame = () => {
  const imageUrls = [
    "/Anastronautridingahorseinaphotorealisticstyle6.webp",
    "/images (1).jpeg",
    "/photo-1454023492550-5696f8ff10e1.jpeg",
    "/taj-mahal-agra-india-TAJ0217-9eab8f20d11d4391901867ed1ce222b8.jpg"
  ];

  const [selectedImage] = useState(imageUrls[Math.floor(Math.random() * imageUrls.length)]);
  const rows = 3, cols = 3;
  const [pieces, setPieces] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initPieces = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = {
          id: `${row}-${col}`,
          backgroundPosition: `-${col * 150}px -${row * 150}px`,
          correctPosition: `${row}-${col}`
        };
        initPieces.push(piece);
      }
    }
    const shuffledPieces = initPieces.sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
  }, [rows, cols]);

  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData("text/plain", piece.id);
  };

  const handleDrop = (e, piece) => {
    const draggedPieceId = e.dataTransfer.getData("text/plain");
    if (draggedPieceId !== piece.id) {
      const updatedPieces = pieces.map(p => {
        if (p.id === draggedPieceId) {
          return { ...p, backgroundPosition: piece.backgroundPosition };
        }
        if (p.id === piece.id) {
          return { ...p, backgroundPosition: pieces.find(p => p.id === draggedPieceId).backgroundPosition };
        }
        return p;
      });
      setPieces(updatedPieces);
      checkWin(updatedPieces);
    }
  };

  const checkWin = (pieces) => {
    const isSolved = pieces.every(piece =>
      piece.backgroundPosition === `-${piece.correctPosition.split('-')[1] * 150}px -${piece.correctPosition.split('-')[0] * 150}px`
    );
    setMessage(isSolved ? "Puzzle Solved!" : "");
  };

  return (
    <div className={styles.gameContainer}>
      <h2>Jigsaw Puzzle Game</h2>
      <div className={styles.puzzleContainer}>
        {pieces.map(piece => (
          <div
            key={piece.id}
            draggable
            onDragStart={e => handleDragStart(e, piece)}
            onDrop={e => handleDrop(e, piece)}
            onDragOver={e => e.preventDefault()}
            className={styles.piece}
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundPosition: piece.backgroundPosition,
            }}
          />
        ))}
      </div>
      {message && <div className={styles.winMessage}>{message}</div>}
    </div>
  );
};

export default JigsawPuzzleGame;
