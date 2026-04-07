import OptionRadios from "./OptionRadios";

export default function PackageList({
  packageName,
  packageOptionList,
  setPackageOption,
}) {
  return (
    <div
      aria-multiselectable="false"
      aria-labelledby="service-variations-header"
    >
      {packageOptionList.map((option, i) => {
        return (
          <OptionRadios
            optionId={option.id}
            packageName={packageName}
            setPackageOption={setPackageOption}
            className="border-seperator"
            key={i}
            optionName={option.name}
            optionPrice={(option.priceMoneyAmt / 100).toFixed(2)}
            optionTimeAlloted={option.serviceDuration}
          />
        );
      })}
    </div>
  );
}
