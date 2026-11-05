import { useNavigate } from "react-router-dom";

const Home = ({ playerName, setPlayerName }) => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (playerName.trim() === "") {
            return;
        }

        navigate("/play");
    };

    return (
        <div>
            <h1>Rung chuông vàng</h1>

            <h3>Luật chơi</h3>

            <p>
                Trò chơi có 15 câu hỏi về HTML, CSS,
                JavaScript và React.
            </p>

            <p>
                Mỗi câu hỏi có 20 giây để trả lời.
            </p>

            <p>
                Câu dễ được 10 điểm, câu trung bình
                được 20 điểm, câu khó được 30 điểm.
            </p>

            <p>
                Trả lời sai hoặc hết giờ sẽ bị loại.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="playerName">
                    Tên người chơi:
                </label>

                <input
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(event) =>
                        setPlayerName(event.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={playerName.trim() === ""}
                >
                    Vào thi
                </button>
            </form>
        </div>
    );
};

export default Home;