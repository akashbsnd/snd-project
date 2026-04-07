import Button from "../Button";

export default function TimeButton({ time, addBookingToCart }) {
  return (
    <Button
      onClick={() => addBookingToCart({ time })}
      size="small"
      data-testid="time-slot"
      role="listitem"
      className="text-black w-24 sm:w-36 whitespace-nowrap flex-none market-button time-button"
      rank="secondary"
      type="button"
      variant="regular"
      hydrated=""
      label={time}
    />
  );
}
