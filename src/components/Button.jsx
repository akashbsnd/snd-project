export default function Button({ label, className, onClick, disabled }) {
  return (
    <button
      role="button"
      disabled={disabled}
      className={`${className}  cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
      {label}
    </button>
  );
}
