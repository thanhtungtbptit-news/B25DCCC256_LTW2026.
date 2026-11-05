import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import ScoreBoard from "../components/ScoreBoard";

import { TIME_PER_QUESTION } from "../data";
import { calcScore, getRank } from "../util";

const Play = ({ playerName, questions }) => {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const [timeLeft, setTimeLeft] = useState(
        TIME_PER_QUESTION
    );

    const [answers, setAnswers] = useState([]);

    const [status, setStatus] = useState("answering");

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [endReason, setEndReason] = useState("");

    const currentQuestion = questions[currentIndex];

    const score = calcScore(answers);

    // Tính số câu trả lời đúng
    const correctCount = answers.filter(
        (answer) => answer.correct
    ).length;

    // Hàm kết thúc lượt chơi
    const finishGame = useCallback((reason) => {
        const finalScore = calcScore(answers);
        const finalRank = getRank(finalScore);

        const finalCorrectCount = answers.filter(
            (answer) => answer.correct
        ).length;

        navigate("/result", {
            replace: true,
            state: {
                name: playerName,
                score: finalScore,
                rank: finalRank,
                correctCount: finalCorrectCount,
                reason: reason
            }
        });
    }, [answers, navigate, playerName]);

   
    const handleSelectAnswer = (answerIndex) => {
        if (status !== "answering") {
            return;
        }

        const isCorrect =
            answerIndex === currentQuestion.answer;

        setSelectedAnswer(answerIndex);

        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                id: currentQuestion.id,
                level: currentQuestion.level,
                correct: isCorrect
            }
        ]);

        setStatus("locked");
    };

   
    useEffect(() => {
        if (status !== "answering") {
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((previousTime) =>
                Math.max(previousTime - 1, 0)
            );
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [status]);

    useEffect(() => {
        if (status === "answering" && timeLeft === 0) {
            setAnswers((prevAnswers) => [
                ...prevAnswers,
                {
                    id: currentQuestion.id,
                    level: currentQuestion.level,
                    correct: false
                }
            ]);

            setSelectedAnswer(null);
            setEndReason("timeout");
            setStatus("revealed");
        }
    }, [timeLeft, status, currentQuestion]);

  
    useEffect(() => {
        let timeout;

        if (status === "locked") {
            timeout = setTimeout(() => {
                setStatus("revealed");
            }, 2000);
        }

        if (status === "revealed") {
            timeout = setTimeout(() => {

           
                if (endReason === "timeout") {
                    finishGame("timeout");
                    return;
                }

         
                if (
                    selectedAnswer !== currentQuestion.answer
                ) {
                    finishGame("wrong");
                    return;
                }

                
                if (currentIndex === questions.length - 1) {
                    finishGame("win");
                    return;
                }

                setCurrentIndex((previousIndex) =>
                    previousIndex + 1
                );

                setTimeLeft(TIME_PER_QUESTION);
                setSelectedAnswer(null);
                setEndReason("");
                setStatus("answering");

            }, 1500);
        }

        return () => {
            clearTimeout(timeout);
        };

    }, [
        status,
        endReason,
        selectedAnswer,
        currentQuestion,
        currentIndex,
        questions.length,
        finishGame
    ]);

    if (!currentQuestion) {
        return <p>Không có câu hỏi để hiển thị.</p>;
    }

    return (
        <div>
            <h2>Rung chuông vàng</h2>

            <Timer timeLeft={timeLeft} />

            <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                status={status}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
            />

            <ScoreBoard
                answers={answers}
                currentIndex={currentIndex}
                score={score}
            />

            <p>Số câu trả lời đúng: {correctCount}</p>
        </div>
    );
};

export default Play;