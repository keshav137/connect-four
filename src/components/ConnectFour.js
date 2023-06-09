import React, { useState, useMemo } from "react";

const ConnectFour = ({ rows, columns }) => {
  const initialBoard = useMemo(() => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      grid.push([]);
      for (let j = 0; j < columns; j++) {
        grid[i].push("-");
      }
    }
    return grid;
  }, [rows, columns]);

  const [player, setPlayer] = useState("x");
  const [board, setBoard] = useState(initialBoard);
  const [gameOver, setGameOver] = useState(false);

  const isGameOver = (updatedBoard, row, column) => {
    // Checking vertically
    for (let i = 0; i < updatedBoard.length - 3; i++) {
      if (
        updatedBoard[i][column] === player &&
        updatedBoard[i + 1][column] === player &&
        updatedBoard[i + 2][column] === player &&
        updatedBoard[i + 3][column] === player
      ) {
        return true;
      }
    }

    // Checking horizontally
    for (let j = 0; j < updatedBoard[0].length - 3; j++) {
      if (
        updatedBoard[row][j] === player &&
        updatedBoard[row][j + 1] === player &&
        updatedBoard[row][j + 2] === player &&
        updatedBoard[row][j + 3] === player
      ) {
        return true;
      }
    }

    // Checking Diagonally from left to right
    for (let i = 0; i < updatedBoard.length - 3; i++) {
      for (let j = 0; j < updatedBoard[0].length - 3; j++) {
        if (
          updatedBoard[i][j] === player &&
          updatedBoard[i + 1][j + 1] === player &&
          updatedBoard[i + 2][j + 2] === player &&
          updatedBoard[i + 3][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Checking Diagonally from right to left
    for (let i = 3; i < updatedBoard.length; i++) {
      for (let j = 0; j < updatedBoard[0].length - 3; j++) {
        if (
          updatedBoard[i][j] === player &&
          updatedBoard[i - 1][j + 1] === player &&
          updatedBoard[i - 2][j + 2] === player &&
          updatedBoard[i - 3][j + 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const getBoardCopy = () => {
    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard.push([]);
      for (let j = 0; j < columns; j++) {
        newBoard[i][j] = board[i][j];
      }
    }
    return newBoard;
  };

  const handleOnClick = (event) => {
    const columnIndex = event.target.id;
    for (let i = rows - 1; i > -1; i--) {
      if (board[i][columnIndex] == "-") {
        let updatedBoard = getBoardCopy();
        updatedBoard[i][columnIndex] = player;
        setBoard(updatedBoard);
        if (isGameOver(updatedBoard, i, columnIndex)) {
          setGameOver(true);
        } else {
          setPlayer(player === "x" ? "o" : "x");
        }
        return;
      }
    }
  };

  const handleReset = () => {
    setPlayer("x");
    setBoard(initialBoard);
    setGameOver(false);
  };

  let matrix = [];
  let inputButtons = [];
  for (let i = 0; i < columns; i++) {
    inputButtons.push(
      <button
        disabled={gameOver}
        className="block"
        id={i}
        onClick={handleOnClick}
      ></button>
    );
  }

  for (let i = 0; i < board.length; i++) {
    let matrixRow = [];
    for (let j = 0; j < board[i].length; j++) {
      matrixRow.push(<div className="block">{board[i][j]}</div>);
    }
    matrix.push(<div className="board-row">{matrixRow}</div>);
  }

  return (
    <div>
      <h2>Connect 4</h2>
      <div className="board">
        <div className="board-row">{inputButtons}</div>
        {matrix}
        {gameOver ? (
          <div>
            <div>Player {player} won</div>
            <div>
              <button onClick={handleReset}>Reset Game</button>
            </div>
          </div>
        ) : (
          <div>Next Turn: {player}</div>
        )}
      </div>
    </div>
  );
};

export default ConnectFour;
