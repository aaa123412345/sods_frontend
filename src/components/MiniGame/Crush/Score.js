const Score = ({ score, passingScore, numberofAction }) => {
  return (
    <div>
      <h3>Moves Lefted : {numberofAction}</h3>
      <h3>The Passing Score:{passingScore}</h3>
      <h3>Your Score: {score}</h3>
    </div>
  );
};

export default Score;
