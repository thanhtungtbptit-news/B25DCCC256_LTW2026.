const AnswerButton = ({
    label,
    index,
    correctAnswer,
    selectedAnswer,
    status,
    onClick
}) => {
    const buttonStyle = {};

    if (
        status === "locked" &&
        selectedAnswer === index
    ) {
        buttonStyle.backgroundColor = "yellow";
    }

    if (status === "revealed") {
        if (index === correctAnswer) {
            buttonStyle.backgroundColor = "green";
        } else if (index === selectedAnswer) {
            buttonStyle.backgroundColor = "red";
        }
    }

    return (
        <button
            type="button"
            style={buttonStyle}
            disabled={status !== "answering"}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AnswerButton;