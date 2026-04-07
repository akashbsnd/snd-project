export default function RenderAddOnsCart({ addOns }) {
  return (
    <>
      {addOns.map((addOn) => {
        return (
          <div
            key={addOn.optionName}
            className="relative flex flex py-[.25rem]"
          >
            <div className="flex relative items-center grow">
              <div className="flex flex-col flex-grow gap-0.5 text-core-text-20 text-sm font-normal">
                <span>{addOn.optionName}</span>
              </div>

              <div className="text-base font-normal ml-4 ">
                ${Number(addOn.optionPrice).toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
