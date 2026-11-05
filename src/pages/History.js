import React from 'react';

const History = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="card">
        <h2>Lịch sử các lượt chơi</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => b.score - a.score);
  const highestScore = sortedHistory[0].score;
  const averageScore = Math.round(
    history.reduce((sum, item) => sum + item.score, 0) / history.length
  );

  return (
    <div className="card">
      <h2>Lịch sử các lượt chơi</h2>
      <p>{`Số lượt chơi: ${history.length}`}</p>
      <p>{`Điểm cao nhất: ${highestScore}`}</p>
      <p>{`Điểm trung bình: ${averageScore}`}</p>

      <button className="btn btn-danger" onClick={onClearHistory}>
        Xóa lịch sử
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Điểm</th>
            <th>Danh hiệu</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.correctCount}</td>
              <td>{item.score}</td>
              <td>{item.rank}</td>
              <td>{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;