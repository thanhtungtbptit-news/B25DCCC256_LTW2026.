const BUILD_TAG = "rc-5307";

/* eslint-disable import/first */

import { useEffect, useState } from "react";
import axios from "axios";

import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";
import Play from "./pages/Play";
import Result from "./pages/Result";

/* eslint-enable import/first */

void BUILD_TAG;

const App = () => {
    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const getQuestions = async () => {
            try {
                const response = await axios.get(
                    "/data/questions.json",
                    {
                        signal: controller.signal
                    }
                );

                setQuestions(response.data);

            } catch (err) {
                if (axios.isCancel(err)) {
                    return;
                }

                setError(true);

            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        getQuestions();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route
                    index
                    element={
                        <Home
                            playerName={playerName}
                            setPlayerName={setPlayerName}
                        />
                    }
                />

                <Route
                    path="questions"
                    element={
                        loading ? (
                            <p>Đang tải câu hỏi...</p>
                        ) : error ? (
                            <p>Không tải được câu hỏi.</p>
                        ) : (
                            <QuestionBank questions={questions} />
                        )
                    }
                />

                <Route
                    path="questions/:id"
                    element={
                        loading ? (
                            <p>Đang tải câu hỏi...</p>
                        ) : error ? (
                            <p>Không tải được câu hỏi.</p>
                        ) : (
                            <QuestionDetail questions={questions} />
                        )
                    }
                />

                <Route
                    path="play"
                    element={
                        playerName.trim() === "" ? (
                            <Navigate to="/" replace />
                        ) : loading ? (
                            <p>Đang tải câu hỏi...</p>
                        ) : error ? (
                            <p>Không tải được câu hỏi.</p>
                        ) : (
                            <Play
                                playerName={playerName}
                                questions={questions}
                            />
                        )
                    }
                />

                <Route
                    path="result"
                    element={<Result />}
                />

                <Route
                    path="history"
                    element={<h2>Lịch sử</h2>}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Route>
        </Routes>
    );
};

export default App;