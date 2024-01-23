export default function ProgressBar({ todos }) {
  const totalAmount = todos.length;
  const completedAmount = todos.filter(({ completed }) => completed).length;

  const allCompleted = completedAmount === totalAmount;

  return (
    <div className="d-flex align-items-center my-2">
      <div className="progress w-100 me-2" role="progressbar">
        <div
          className={`progress-bar${allCompleted ? " bg-success" : ""}`}
          style={{
            width: `${((completedAmount / totalAmount) * 100).toFixed(0)}%`,
          }}
        ></div>
      </div>
      <span
        className={`badge rounded-pill text-bg-${
          allCompleted ? "success" : "secondary"
        }`}
      >{`${completedAmount} / ${totalAmount}`}</span>
    </div>
  );
}
