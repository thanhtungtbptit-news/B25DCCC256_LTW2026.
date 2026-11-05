import { useState } from "react";
import { Link } from "react-router-dom";

import { LEVELS, TOPICS } from "../data";

const QuestionBank = ({ questions }) => {
    const [selectedTopic, setSelectedTopic] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");

    const handleTermShift = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredQuestions = questions.filter((question) => {
        const matchTopic =
            selectedTopic === "Tất cả" ||
            question.topic === selectedTopic;

        const matchSearch = question.question
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchTopic && matchSearch;
    });

    return (
        <div>
            <h2>Ngân hàng câu hỏi</h2>

            <select
                value={selectedTopic}
                onChange={(event) =>
                    setSelectedTopic(event.target.value)
                }
            >
                <option value="Tất cả">Tất cả</option>

                {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                        {topic}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                value={searchTerm}
                onChange={handleTermShift}
            />

            <p>Có {filteredQuestions.length} câu hỏi</p>

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Chủ đề</th>
                        <th>Mức độ</th>
                        <th>Câu hỏi</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredQuestions.map((question, index) => (
                        <tr key={question.id}>
                            <td>{index + 1}</td>

                            <td>{question.topic}</td>

                            <td>{LEVELS[question.level]}</td>

                            <td>
                                <Link to={`/questions/${question.id}`}>
                                    {question.question}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionBank;