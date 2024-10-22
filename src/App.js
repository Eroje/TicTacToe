import React, { useState } from 'react';
import './TicTacToe.css'; // optional for styling

const TicTacToe = () => {
  // Initialize the board as an array with 9 nulls (3x3 grid)
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return; // If the game has a winner or the square is already clicked, do nothing

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O'; // Set X or O depending on whose turn it is

    setBoard(newBoard);
    setIsXNext(!isXNext); // Switch turns
    checkWinner(newBoard); // Check if the current move leads to a winner
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]); // Set the winner to 'X' or 'O'
        return;
      }
    }

    if (newBoard.every(cell => cell)) {
      setWinner('Draw'); // Set Draw if all squares are filled and no winner
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setIsXNext(true); // Reset to X's turn
    setWinner(null); // Clear the winner
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>

      <div className="status">
        {winner ? (winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`) : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
