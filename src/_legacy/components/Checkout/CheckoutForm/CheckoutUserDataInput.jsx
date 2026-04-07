export default function CheckoutUserDataInput({
  label,
  htmlForId,
  type,
  handleChange,
  className,
}) {
  return (
    <div className={`field ${className}`}>
      <input
        name={htmlForId}
        className={className}
        onChange={(e) => handleChange(e)}
        type={type}
        id={htmlForId}
        placeholder=" "
        required
      />
      <label htmlFor={htmlForId}>{label}</label>
    </div>
  );
}
