import AnswerButton from "./AnswerButton";
import { LEVELS, LETTERS } from "../data";

const QuestionCard = ({
    question,
    questionNumber,
    status,
    selectedAnswer,
    hiddenAnswer,
    onSelectAnswer
}) => {
    return (
        <div className="question-card">
            <p className="question-info">
                Câu {questionNumber}/15
                {" · "}
                {question.topic}
                {" · "}
                {LEVELS[question.level]}
            </p>

            <h3>{question.question}</h3>

            <div className="answer-grid">
                {question.options.map((option, index) => (
                    <AnswerButton
                        key={index}
                        label={`${LETTERS[index]}. ${option}`}
                        index={index}
                        correctAnswer={question.answer}
                        selectedAnswer={selectedAnswer}
                        status={status}
                        hidden={hiddenAnswer === index}
                        onClick={() => onSelectAnswer(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;