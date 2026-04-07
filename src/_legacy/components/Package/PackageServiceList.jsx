export default function PackageServiceList({ packageFeatureList }) {
  return (
    <div
      className="flex flex-col items-start paragraph-20 text-core-text-20 whitespace-pre-wrap"
      data-testid="service-description"
    >
      {packageFeatureList
        ? packageFeatureList.split("\n").map((feature) => {
            return <span key={feature}>{feature}</span>;
          })
        : ""}
    </div>
  );
}
