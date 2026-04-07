import { Button } from "../ui/button";

export default function CalendarArrowButtons({ setCurrentPage, currentPage }) {
  return (
    <div className="flex">
      <div className="mr-4">
        <Button
          onClick={() => {
            if (currentPage > 5) {
              setCurrentPage(currentPage - 6);
            }
          }}
          aria-label="Previous week"
          data-testid="prior-week-button"
          disabled=""
          icon-only=""
          rank="secondary"
          size="small"
          className="cursor-pointer h-10 market-button cal-arrow-button"
          type="button"
          variant="regular"
          hydrated=""
        >
          <section slot="icon" className="market-accessory" hydrated="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                currentPage === 0
                  ? "cursor-not-allowed text-core-text-30 fill-current"
                  : "text-black fill-current"
              }
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L11.2929 19.7071L12.7071 18.2929L7.41421 13L19 13V11H7.41421L12.7071 5.70712L11.2929 4.29291L4.29289 11.2929Z"
              ></path>
            </svg>
          </section>
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            if (currentPage < 36) {
              setCurrentPage(currentPage + 6);
            }
          }}
          aria-label="Next week"
          data-testid="next-week-button"
          icon-only=""
          rank="secondary"
          size="small"
          className="cursor-pointer h-10 market-button cal-arrow-button"
          type="button"
          variant="regular"
          hydrated=""
        >
          <section slot="icon" className="market-accessory" hydrated="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={
                currentPage === 36
                  ? "cursor-not-allowed text-core-text-30 fill-current"
                  : "text-black fill-current"
              }
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071L11.2929 18.2929L16.5858 13L5 13L5 11H16.5858L11.2929 5.70712L12.7071 4.29291L19.7071 11.2929Z"
              ></path>
            </svg>
          </section>
        </Button>
      </div>
    </div>
  );
}
