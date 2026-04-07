export default function CheckoutCarForm({
  carLabel,
  htmlForId,
  handleChange,
  className,
}) {
  return (
    <span>
      <label className="font-semibold" htmlFor={htmlForId}>
        {carLabel}
      </label>
      <input
        className={`mt-2 ${className}`}
        onChange={(e) => {
          handleChange(e);
        }}
        name={htmlForId}
        type="text"
        id={htmlForId}
        placeholder="Enter your response"
        required
      />
    </span>
  );
}
