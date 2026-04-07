import { isOptionChecked } from "../../hooks/isOptionChecked";
import { formatTimeOptionRadios } from "../../hooks/formatTimeOptionRadios";

export default function OptionRadios({
  packageName,
  optionId,
  optionName,
  optionPrice,
  optionTimeAlloted,
  setPackageOption,
  className = "",
}) {
  return (
    <label
      aria-selected="true"
      id="option-form"
      htmlFor={optionName}
      className={`px-4 option-form-container market-row ]has-slotted-control ${className}`}
    >
      <div className="radio-label-container">
        <label slot="label">{optionName}</label>
        <span>
          ${optionPrice}・{formatTimeOptionRadios({ optionTimeAlloted })}
        </span>
      </div>

      <input
        onChange={() => {
          setPackageOption({
            id: optionId,
            name: optionName,
            price: optionPrice,
            timeAlloted: optionTimeAlloted,
          });
        }}
        defaultChecked={isOptionChecked({ optionName, packageName })}
        type="radio"
        aria-label={optionName}
        name="options"
        id={optionName}
      />
    </label>
  );
}
