import {
    useLocation,
    useNavigate,
    Navigate
} from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state;

    if (!result) {
        return <Navigate to="/" replace />;
    }

    const {
        name,
        score,
        rank,
        correctCount,
        reason
    } = result;

    let message = "";

    if (reason === "win") {
        message = "Chúc mừng! Bạn đã rung chuông vàng";
    } else if (reason === "wrong") {
        message = "Bạn đã bị loại";
    } else if (reason === "timeout") {
        message = "Hết giờ!";
    }

    return (
        <div>
            <h2>{message}</h2>

            <p>Người chơi: {name}</p>

            <p>
                Số câu trả lời đúng: {correctCount}
            </p>

            <p>Điểm: {score}</p>

            <p>Danh hiệu: {rank}</p>

            <button onClick={() => navigate("/play")}>
                Chơi lại
            </button>

            <button onClick={() => navigate("/")}>
                Về trang chủ
            </button>
        </div>
    );
};

export default Result;