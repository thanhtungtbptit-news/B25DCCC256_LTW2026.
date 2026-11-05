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
        <div>
            <p>Điểm: {score}</p>    

            <div
                style={{
                    display: "flex",
                    gap: "5px",
                    flexWrap: "wrap"
                }}
            >
                {questionNumbers.map((number, index) => {
                    const answer = answers.find(
                        (item) => item.id === number
                    );

                    const boxStyle = {
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                            answer && answer.correct
                                ? "green"
                                : "gray"
                    };

                    if (index === currentIndex) {
                        boxStyle.border = "2px solid black";
                    }

                    return (
                        <div
                            key={number}
                            style={boxStyle}
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