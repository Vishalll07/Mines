"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import '../globals.css';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface SquareProps {
  mine: boolean;
  setGameOver: (gameOver: boolean) => void;
  gameOver: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Square = ({ mine, setGameOver, gameOver, setScore }: SquareProps) => {
  const [revealed, setRevealed] = useState<boolean>(false);

  // Function to handle clicking on a square
  const clickHandler = () => {
    if (gameOver || revealed) return;
    if (mine) {
      alert("You Lose The Game!");
      setScore((prevValue) => prevValue - 10);
      setGameOver(true);
    } else {
      setScore((prevValue) => prevValue + 10);
      setRevealed(true);
    }
  };

  return (
    <div
      className="square-item flex items-center justify-center border-2 border-gray-700 w-24 h-24 bg-gray-800 cursor-pointer hover:bg-gray-700"
      onClick={clickHandler}
    >
      {revealed ? (mine ? 0 : 1) : ""}
    </div>
  );
};

export default function gamePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(100);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  
    const generateRandomNumbers = () => {
      const numbers: number[] = [];
      while (numbers.length < 3) {
        const randomNumber = getRandomInt(1, 9);
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      setRandomNumbers(numbers);
    };
    

  const resetGame= () => {
    setGameOver(false);
    generateRandomNumbers();
  };
   useEffect(() => {
    generateRandomNumbers();
   },[]);

  const items = [];
  for (let index = 1; index <= 9; index++) {
    items.push(
      <Square
        key={index}
        mine={randomNumbers.includes(index)}
        setGameOver={setGameOver}
        gameOver={gameOver}
        setScore={setScore}
      />
    );
  }

  return (
<div className="game-page bg-gray-900 text-black min-h-screen flex items-center justify-center">
      <button 
        className="new-game-btn bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={resetGame}
      >
        New Game
      </button>
     
  <div className="game-container bg-gray-800 p-8 rounded-lg shadow-lg">
    <div className="score-section mb-6 text-lg">
      <p>Welcome, {name || 'Player'}!</p>
      <p>Current Credit: {score}</p>
      <p>Win: +10</p>
      <p>Lose: -10</p>
    </div>

    <div className="grid-container">
      {items}
    </div>
  </div>
</div>

  );
}
