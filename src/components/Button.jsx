export default function Button({ label, className, onClick, disabled }) {
  return (
    <button
      role="button"
      disabled={disabled}
      className={`${className} cursor-pointer flex items-center justify-center gap-2`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
      {disabled && (
        <span className="inline-block animate-spin">
          <iconify-icon icon="lucide:loader-2" style={{ fontSize: "1.25rem" }} />
        </span>
      )}
      {label}
    </button>
  );
}
