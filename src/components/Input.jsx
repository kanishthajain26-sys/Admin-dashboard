function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="dashboard-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;