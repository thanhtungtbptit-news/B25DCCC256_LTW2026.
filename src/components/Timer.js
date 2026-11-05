const Timer = ({ timeLeft }) => {
    return (
        <p className={
            timeLeft <= 5
                ? "timer timer-warning"
                : "timer"
        }>
            Còn {timeLeft} giây
        </p>
    );
};

export default Timer;