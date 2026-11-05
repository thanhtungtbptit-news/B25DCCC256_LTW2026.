import AnswerButton from "./AnswerButton";

import { LEVELS, LETTERS } from "../data";

const QuestionCard = ({
    question,
    questionNumber,
    status,
    selectedAnswer,
    onSelectAnswer
}) => {
    return (
        <div>
            <p>
                Câu {questionNumber}/15
                {" · "}
                {question.topic}
                {" · "}
                {LEVELS[question.level]}
            </p>

            <h3>{question.question}</h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px"
                }}
            >
                {question.options.map((option, index) => (
                    <AnswerButton
                        key={index}
                        label={`${LETTERS[index]}. ${option}`}
                        index={index}
                        correctAnswer={question.answer}
                        selectedAnswer={selectedAnswer}
                        status={status}
                        onClick={() => onSelectAnswer(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;