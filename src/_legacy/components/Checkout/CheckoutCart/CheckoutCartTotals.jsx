import { labels } from "../../../static/labels";
import { calculateItemsTotal } from "../../../hooks/calculateItemsTotal";

export default function CheckoutCartTotals() {
  return (
    <div className="px-4 flex flex-col">
      <div
        size="small"
        className="before:hidden market-row preload flex justify-between mb-2"
        drag-handle-position="trailing"
        hydrated=""
      >
        <label className="font-semibold" slot="label">
          {labels.checkout.subtotal}
        </label>
        <label slot="side-label">${calculateItemsTotal()}</label>
      </div>
      <div
        size="small"
        className="before:hidden market-row preload flex justify-between mb-2"
        drag-handle-position="trailing"
        hydrated=""
      >
        <label className="font-semibold" slot="label">
          {labels.checkout.taxes}
        </label>
        <label slot="side-label">$0.00</label>
      </div>
      <div
        size="small"
        className="pb-2 market-row preload flex justify-between mb-2"
        drag-handle-position="trailing"
        hydrated=""
      >
        <label className="font-semibold" slot="label">
          {labels.checkout.total}
        </label>
        <label slot="side-label">${calculateItemsTotal()}</label>
      </div>

      <div className="totals-footer flex-col flex">
        <div
          size="small"
          className="pb-2 market-row preload flex justify-between"
          drag-handle-position="trailing"
          hydrated=""
        >
          <label className="font-semibold" slot="label">
            {labels.checkout.dueToday}
          </label>
          <label slot="side-label">$0.00</label>
        </div>
        <div
          size="small"
          className="pb-2 market-row preload flex justify-between"
          drag-handle-position="trailing"
          hydrated=""
        >
          <span
            className="text-core-text-20 text-sm font-normal"
            slot="subtext"
          >
            {labels.checkout.dueAtAppt}
          </span>
          <label
            className="text-core-text-20 text-sm font-normal"
            slot="side-subtext"
          >
            ${calculateItemsTotal()}
          </label>
        </div>
      </div>
    </div>
  );
}
