import { useCallback, useEffect, useState } from "react";
import jan4 from "./images/jan4.png";
import ji6 from "./images/ji6.png";
import lai5 from "./images/lai5.png";
import zi3 from "./images/zi3.png";
import seon3 from "./images/seon3.png";
import blank from "./images/blank.png";
import Score from "./Score";
import "./Crush.css";
import Modal from "./Modal";
import Menu from "./Menu";
import HTP from "./HTP";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const width = 8;
const characters = [jan4, ji6, lai5, zi3, seon3];

const Crush = () => {
  const [currentArrangment, setCurrentArrangment] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);
  const [passingScore, setPassingScore] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [numberofAction, setNumberOfAction] = useState(5);
  const [losemodalOpen, setLoseModalOpen] = useState(false);
  const [winmodalOpen, setWinModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [HTPOpen, setHTPOPen] = useState(false);
  const [displayGame, setdisplayGame] = useState(false);

  //Call this function after user click one of the difficulities button in Menu
  const StartNewGame = (pScore) => {
    console.log("StartNewGame");
    //setMenuOpen(false);
    setPassingScore(pScore);
    setNumberOfAction(5);
    setSquareBeingDragged(null);
    setSquareBeingReplaced(null);
    setScore(0);
    setdisplayGame(true);
    createBoard();
  };

  const BTM = () => {
    console.log("You click Back to Menu Button!!");
    setLoseModalOpen(false);
    setWinModalOpen(false);
    setHTPOPen(false);
    setMenuOpen(true);
  };

  const PA = () => {
    console.log("Your click Play Again Button!!");
    setLoseModalOpen(false);
    setWinModalOpen(false);
    StartNewGame(passingScore);
  };

  const GameOver = () => {
    console.log("The Player used all the moves!!");
    setNumberOfAction(1);
    if (score >= passingScore) {
      //Player win
      setWinModalOpen(true);
      setLoseModalOpen(false);
    } else {
      setLoseModalOpen(true);
      setWinModalOpen(false);
    }
    setdisplayGame(false);
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentArrangment[i];
      const isBlank = currentArrangment[i] === blank;
      if (
        columnOfFour.every(
          (square) => currentArrangment[square] === decidedColor && !isBlank
        )
      ) {
        if (gameStarted) {
          setScore((scores) => scores + 4);
        }

        columnOfFour.forEach((square) => (currentArrangment[square] = blank));
        return true;
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentArrangment[i];
      const isBlank = currentArrangment[i] === blank;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 54,
        55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (square) => currentArrangment[square] === decidedColor && !isBlank
        )
      ) {
        if (gameStarted) {
          setScore((scores) => scores + 4);
        }

        rowOfFour.forEach((square) => (currentArrangment[square] = blank));
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentArrangment[i];
      const isBlank = currentArrangment[i] === blank;
      if (
        columnOfThree.every(
          (square) => currentArrangment[square] === decidedColor && !isBlank
        )
      ) {
        if (gameStarted) {
          setScore((scores) => scores + 3);
        }

        columnOfThree.forEach((square) => (currentArrangment[square] = blank));
        return true;
      }
    }
  };
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentArrangment[i];
      const isBlank = currentArrangment[i] === blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) => currentArrangment[square] === decidedColor && !isBlank
        )
      ) {
        if (gameStarted) {
          setScore((scores) => scores + 3);
        }
        rowOfThree.forEach((square) => (currentArrangment[square] = blank));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstrow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isfirstrow = firstrow.includes(i);
      if (isfirstrow && currentArrangment[i] === blank) {
        let randomNumber = Math.floor(Math.random() * characters.length);
        currentArrangment[i] = characters[randomNumber];
      }

      if (currentArrangment[i + width] === blank) {
        currentArrangment[i + width] = currentArrangment[i];
        currentArrangment[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setGameStarted(true);
    console.log("drag start");
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    console.log("drag end");

    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    currentArrangment[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");
    currentArrangment[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");

    /*const validMoveofsquare = [
      squareBeingDraggedId -1,
      squareBeingDraggedId -width,
      squareBeingDraggedId +1,
      squareBeingDraggedId + width
    ];*/
    const validMoveofsquare = [];
    if (squareBeingDragged % 8 === 0) {
      //take p8
      validMoveofsquare.push(squareBeingDraggedId - width); //0
      validMoveofsquare.push(squareBeingDraggedId - width + 1); //1
      validMoveofsquare.push(squareBeingDraggedId - 1); //7
      validMoveofsquare.push(squareBeingDraggedId + 1); //9
      validMoveofsquare.push(squareBeingDraggedId + width - 1); //15
      validMoveofsquare.push(squareBeingDraggedId + width); //16
      validMoveofsquare.push(squareBeingDraggedId + width + 1); //17
      validMoveofsquare.push(squareBeingDraggedId + width * 2 - 1); //23
    } else if (squareBeingDragged % 8 === 7) {
      //TAKE P15
      validMoveofsquare.push(squareBeingDraggedId - width - 7); //0
      validMoveofsquare.push(squareBeingDraggedId - width - 1); //6
      validMoveofsquare.push(squareBeingDraggedId - width); //7
      validMoveofsquare.push(squareBeingDraggedId - width + 1); //8
      validMoveofsquare.push(squareBeingDraggedId - 1); //14
      validMoveofsquare.push(squareBeingDraggedId + 1); //16
      validMoveofsquare.push(squareBeingDraggedId + width - 1); //22
      validMoveofsquare.push(squareBeingDraggedId + width); //23
    } else {
      validMoveofsquare.push(squareBeingDraggedId - 1 - width);
      validMoveofsquare.push(squareBeingDraggedId - width);
      validMoveofsquare.push(squareBeingDraggedId - width + 1);
      validMoveofsquare.push(squareBeingDraggedId - 1);
      validMoveofsquare.push(squareBeingDraggedId + 1);
      validMoveofsquare.push(squareBeingDraggedId + width - 1);
      validMoveofsquare.push(squareBeingDraggedId + width);
      validMoveofsquare.push(squareBeingDraggedId + width + 1);
    }

    const validMove = validMoveofsquare.includes(squareBeingReplacedId);
    console.log("This move is" + validMove);

    const C4 = checkForColumnOfFour();
    const R4 = checkForRowOfFour();
    const C3 = checkForColumnOfThree();
    const R3 = checkForRowOfThree();
    console.log("C4 , R4 , C3, R3 is" + (C4 || R4 || C3 || R3));
    if (squareBeingReplacedId && validMove && (C4 || R4 || C3 || R3)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setNumberOfAction((numberofAction) => numberofAction - 1);
      console.log("Current number of Action is " + numberofAction);
    } else {
      currentArrangment[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      currentArrangment[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
    }
  };

  const createBoard = () => {
    const randomArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const random = characters[Math.floor(Math.random() * characters.length)];
      randomArrangment.push(random);
    }
    setCurrentArrangment(randomArrangment);
    setGameStarted(false);
  };

  useEffect(() => {
    createBoard();
  }, []);
  useEffect(() => {
    if (numberofAction <= 0) {
      //console.log("line 204 executed");
      GameOver();
    }
  }, [GameOver, numberofAction]);
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentArrangment([...currentArrangment]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentArrangment,
  ]);

  //console.log(currentArrangment);

  return (
    <div className="crush">
      {displayGame && (
        <div className="gameboard">
          {currentArrangment.map((character, index) => (
            <img
              key={index}
              src={character}
              alt={character}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
      )}
      {displayGame && (
        <Score
          score={score}
          passingScore={passingScore}
          numberofAction={numberofAction}
        />
      )}
      {losemodalOpen && (
        <Modal
          title={"You Lose!!"}
          titlecolor="red"
          score={score}
          passingScore={passingScore}
          BTM={BTM}
          PA={PA}
        />
      )}
      {winmodalOpen && (
        <Modal
          title={"You Win!!"}
          titlecolor="green"
          score={score}
          passingScore={passingScore}
          BTM={BTM}
          PA={PA}
        />
      )}
      {menuOpen && (
        <Menu
          setMenuOpen={setMenuOpen}
          StartNewGame={StartNewGame}
          setHTPOpen={setHTPOPen}
        />
      )}
      {HTPOpen && <HTP BTM={BTM} />}
    </div>
  );
};

export default Crush;
