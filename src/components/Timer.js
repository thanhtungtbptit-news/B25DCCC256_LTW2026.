const Timer = ({ timeLeft }) => {
    return (
        <p
            style={{
                color: timeLeft <= 5 ? "red" : "black"
            }}
        >
            Còn {timeLeft} giây
        </p>
    );
};

export default Timer;