const Score= ({score, passingScore, numberofAction}) =>{

    return (
        <div>
            <h2>Moves Lefted : {numberofAction}</h2>
            <h2>The Passing Score:{passingScore}</h2>
            <h2>Your Score: {score}</h2>
        </div>
    )
}


export default Score