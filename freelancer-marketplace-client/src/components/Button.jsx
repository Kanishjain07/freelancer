function Button({ text, type = "submit", className = "" }) {
  return (
    <button
      type={type}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
