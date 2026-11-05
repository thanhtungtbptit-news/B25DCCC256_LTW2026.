import { useParams, useNavigate } from "react-router-dom";

import { POINTS, LEVELS, LETTERS } from "../data";

const QuestionDetail = ({ questions }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Chuyển id từ chuỗi sang số
    const questionId = Number(id);

    // Tìm câu hỏi theo id
    const question = questions.find(
        (item) => item.id === questionId
    );

    // Nếu không tìm thấy câu hỏi
    if (!question) {
        return <p>Không tìm thấy câu hỏi</p>;
    }

    return (
        <div>
            <h2>
                Câu hỏi số {question.id} – {question.topic} (
                {LEVELS[question.level]}, {POINTS[question.level]} điểm)
            </h2>

            <p>{question.question}</p>

            {question.options.map((option, index) => {
                const isCorrect = index === question.answer;

                return (
                    <p
                        key={index}
                        style={
                            isCorrect
                                ? { backgroundColor: "green" }
                                : {}
                        }
                    >
                        {LETTERS[index]}. {option}

                        {isCorrect && " (Đáp án đúng)"}
                    </p>
                );
            })}

            <button onClick={() => navigate(-1)}>
                Quay lại
            </button>
        </div>
    );
};

export default QuestionDetail;