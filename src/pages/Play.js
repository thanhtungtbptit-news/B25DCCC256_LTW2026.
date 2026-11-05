import { useCallback, useEffect,useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Helpers from "../components/Helpers";
import QuestionCard from "../components/QuestionCard";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import { EXTRA_TIME, TIME_PER_QUESTION } from "../data";
import { calcScore, getRank } from "../util";

const Play = ({ playerName, questions, onFinishGame }) => {
    const hasFinishedRef = useRef(false);
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
    const [answers, setAnswers] = useState([]);
    const [status, setStatus] = useState("answering");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [endReason, setEndReason] = useState("");

    const [hiddenAnswer, setHiddenAnswer] = useState(null);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    const [usedExtraTime, setUsedExtraTime] = useState(false);
    const [usedLifebuoy, setUsedLifebuoy] = useState(false);
    const [lifebuoyActive, setLifebuoyActive] = useState(false);

    const currentQuestion = questions[currentIndex];
    const score = calcScore(answers);

    const finishGame = useCallback((reason) => {

    if (hasFinishedRef.current) {
        return;
    }

    
    hasFinishedRef.current = true;

    const finalScore = calcScore(answers);

    const finalRank = getRank(finalScore);

    const finalCorrectCount = answers.filter(
        (answer) => answer.correct
    ).length;

    const record = {
        id: Date.now(),
        name: playerName,
        score: finalScore,
        rank: finalRank,
        correctCount: finalCorrectCount,
        playedAt: new Date().toLocaleString("vi-VN")
    };

   
    onFinishGame(record);

    navigate("/result", {
        replace: true,
        state: {
            ...record,
            reason
        }
    });

}, [answers, playerName, onFinishGame, navigate]);

    const handleSelectAnswer = useCallback((answerIndex) => {
        if (
            status !== "answering"
            || answerIndex === hiddenAnswer
            || !currentQuestion
        ) {
            return;
        }

        const isCorrect = answerIndex === currentQuestion.answer;

        setSelectedAnswer(answerIndex);
        setAnswers((previousAnswers) => [
            ...previousAnswers,
            {
                id: currentQuestion.id,
                level: currentQuestion.level,
                correct: isCorrect,
                rescued: !isCorrect && lifebuoyActive
            }
        ]);

        if (isCorrect) {
            setEndReason("correct");
        } else if (lifebuoyActive) {
            setEndReason("rescued");
        } else {
            setEndReason("wrong");
        }

        setStatus("locked");
    }, [status, hiddenAnswer, currentQuestion, lifebuoyActive]);

    const handleFiftyFifty = () => {
        if (status !== "answering" || usedFiftyFifty) {
            return;
        }

        const wrongAnswers = currentQuestion.options
            .map((option, index) => index)
            .filter((index) => index !== currentQuestion.answer);

        const randomIndex = Math.floor(
            Math.random() * wrongAnswers.length
        );

        setHiddenAnswer(wrongAnswers[randomIndex]);
        setUsedFiftyFifty(true);
    };

    const handleExtraTime = () => {
        if (status !== "answering" || usedExtraTime) {
            return;
        }

        setTimeLeft((previousTime) => previousTime + EXTRA_TIME);
        setUsedExtraTime(true);
    };

    const handleLifebuoy = () => {
        if (status !== "answering" || usedLifebuoy) {
            return;
        }

        setUsedLifebuoy(true);
        setLifebuoyActive(true);
    };

    // Đồng hồ chỉ chạy khi người chơi đang trả lời.
    useEffect(() => {
        if (status !== "answering") {
            return undefined;
        }

        const interval = setInterval(() => {
            setTimeLeft((previousTime) => Math.max(previousTime - 1, 0));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [status]);

    // Hết giờ: lộ đáp án ngay; phao cho phép sang câu tiếp theo.
    useEffect(() => {
        if (status !== "answering" || timeLeft !== 0 || !currentQuestion) {
            return;
        }

        setAnswers((previousAnswers) => [
            ...previousAnswers,
            {
                id: currentQuestion.id,
                level: currentQuestion.level,
                correct: false,
                rescued: lifebuoyActive
            }
        ]);

        setSelectedAnswer(null);
        setEndReason(lifebuoyActive ? "timeoutRescued" : "timeout");
        setStatus("revealed");
    }, [timeLeft, status, currentQuestion, lifebuoyActive]);

    // Chờ 2 giây để lộ kết quả; sau đó chờ thêm 1,5 giây.
    useEffect(() => {
        let timeout;

        if (status === "locked") {
            timeout = setTimeout(() => {
                setStatus("revealed");
            }, 2000);
        }

        if (status === "revealed") {
            timeout = setTimeout(() => {
                if (endReason === "wrong") {
                    finishGame("wrong");
                    return;
                }

                if (endReason === "timeout") {
                    finishGame("timeout");
                    return;
                }

                const isLastQuestion = currentIndex === questions.length - 1;

                if (isLastQuestion) {
                    const hasRescuedAnswer = answers.some(
                        (answer) => answer.rescued
                    );

                    if (
                        endReason === "rescued"
                        || endReason === "timeoutRescued"
                        || hasRescuedAnswer
                    ) {
                        finishGame("completed");
                    } else {
                        finishGame("win");
                    }

                    return;
                }

                setCurrentIndex((previousIndex) => previousIndex + 1);
                setTimeLeft(TIME_PER_QUESTION);
                setSelectedAnswer(null);
                setHiddenAnswer(null);
                setLifebuoyActive(false);
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
        currentIndex,
        questions.length,
        answers,
        finishGame
    ]);

    // Phím 1, 2, 3, 4 tương ứng A, B, C, D.
    useEffect(() => {
        if (status !== "answering") {
            return undefined;
        }

        const handleKey = (event) => {
            if (!["1", "2", "3", "4"].includes(event.key)) {
                return;
            }

            const answerIndex = Number(event.key) - 1;

            if (answerIndex === hiddenAnswer) {
                return;
            }

            handleSelectAnswer(answerIndex);
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, [status, hiddenAnswer, handleSelectAnswer]);

    // Cập nhật tiêu đề tab trong lúc thi.
    useEffect(() => {
        document.title = `Câu ${currentIndex + 1}/15 – ${score} điểm`;
    }, [currentIndex, score]);

    // Khôi phục tiêu đề khi rời màn hình thi.
    useEffect(() => {
        return () => {
            document.title = "Rung chuông vàng";
        };
    }, []);

    if (!currentQuestion) {
        return <p>Không có câu hỏi để hiển thị.</p>;
    }

    return (
        <div>
            <h2>Rung chuông vàng</h2>

            <Timer timeLeft={timeLeft} />

            <Helpers
                status={status}
                usedFiftyFifty={usedFiftyFifty}
                usedExtraTime={usedExtraTime}
                usedLifebuoy={usedLifebuoy}
                lifebuoyActive={lifebuoyActive}
                onFiftyFifty={handleFiftyFifty}
                onExtraTime={handleExtraTime}
                onLifebuoy={handleLifebuoy}
            />

            <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                status={status}
                selectedAnswer={selectedAnswer}
                hiddenAnswer={hiddenAnswer}
                onSelectAnswer={handleSelectAnswer}
            />

            <ScoreBoard
                answers={answers}
                currentIndex={currentIndex}
                score={score}
            />
        </div>
    );
};

export default Play;