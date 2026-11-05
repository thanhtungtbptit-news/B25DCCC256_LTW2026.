const ScoreBoard = ({
    answers,
    currentIndex,
    score
}) => {
    const questionNumbers = Array.from(
        { length: 15 },
        (_, index) => index + 1
    );

    return (
        <div className="score-board">
            <h3>Điểm: {score}</h3>

            <div className="score-board-numbers">
                {questionNumbers.map((number, index) => {
                    const answer = answers.find(
                        (item) => item.id === number
                    );

                    let className = "score-board-cell";

                    if (answer && answer.correct) {
                        className += " score-correct";
                    }

                    if (answer && answer.rescued) {
                        className += " score-rescued";
                    }

                    if (index === currentIndex) {
                        className += " score-current";
                    }

                    return (
                        <div
                            key={number}
                            className={className}
                        >
                            {number}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScoreBoard;