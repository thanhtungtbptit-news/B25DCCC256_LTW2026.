const Helpers = ({
    status,
    usedFiftyFifty,
    usedExtraTime,
    usedLifebuoy,
    lifebuoyActive,
    onFiftyFifty,
    onExtraTime,
    onLifebuoy
}) => {
    return (
        <div className="helpers">
            <h3>Quyền trợ giúp</h3>

            <button
                type="button"
                disabled={status !== "answering" || usedFiftyFifty}
                onClick={onFiftyFifty}
            >
                Loại 1 đáp án
            </button>

            <button
                type="button"
                disabled={status !== "answering" || usedExtraTime}
                onClick={onExtraTime}
            >
                Thêm 15 giây
            </button>

            <button
                type="button"
                disabled={status !== "answering" || usedLifebuoy}
                onClick={onLifebuoy}
            >
                {lifebuoyActive ? "Phao đang bật" : "Phao cứu sinh"}
            </button>
        </div>
    );
};

export default Helpers;