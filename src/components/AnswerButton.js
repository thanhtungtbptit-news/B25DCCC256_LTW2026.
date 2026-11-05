const AnswerButton = ({
    label,
    index,
    correctAnswer,
    selectedAnswer,
    status,
    hidden,
    onClick
}) => {
    let className = "answer-button";

    if (hidden) {
        className += " answer-button-hidden";
    } else if (
        status === "locked" &&
        selectedAnswer === index
    ) {
        className += " answer-button-selected";
    } else if (status === "revealed") {
        if (index === correctAnswer) {
            className += " answer-button-correct";
        } else if (index === selectedAnswer) {
            className += " answer-button-wrong";
        }
    }

    return (
        <button
            type="button"
            className={className}
            disabled={status !== "answering" || hidden}
            onClick={onClick}
        >
            {hidden ? "\u00A0" : label}
        </button>
    );
};

export default AnswerButton;