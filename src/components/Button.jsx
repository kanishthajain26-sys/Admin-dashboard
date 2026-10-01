function Button({ text, onClick, type = "primary" }) {
  return (
    <button
      className={`dashboard-button ${type}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;