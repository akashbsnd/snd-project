import { useState, useEffect } from "react";
import { labels } from "../../../static/labels";
import Button from "../../Button";

export default function AddNote({ handleChange, noteValue = "" }) {
  const [isVisible, setIsVisible] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBackdropClick = (e) => {
    // Close modal if clicking on the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleAdd = () => {
    handleClose();
  };

  return (
    <>
      {isVisible ? (
        <div
          className="noteModalOverlay"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-modal-title"
        >
          <div
            className="noteModalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <h2 id="note-modal-title" className="mb-4">
                Appointment note
              </h2>
              <textarea
                onChange={(e) => handleChange(e)}
                value={noteValue}
                rows={8}
                name="note"
                aria-label="Appointment note"
                maxLength="1000"
                className="flex-grow h-full market-textarea"
                autoFocus
              />
            </div>
            <section className="flex market-footer">
              <Button
                rank="secondary"
                className="button flex-grow mr-2 market-button"
                size="medium"
                type="button"
                variant="regular"
                label={"Cancel"}
                onClick={handleClose}
              />
              <Button
                rank="primary"
                className="button flex-grow market-button"
                size="medium"
                type="button"
                variant="regular"
                label={"Add"}
                onClick={handleAdd}
              />
            </section>
          </div>
        </div>
      ) : null}

      <div className="col-span-2 flex flex-col py-6 separator">
        <div className="flex items-center">
          <h3 className="flex-1">{labels.checkout.aptNote}</h3>
          <span className="market-link" hydrated="">
            <span
              className="addLink font-purple font-semibold"
              onClick={() => setIsVisible(true)}
            >
              {labels.checkout.addLink}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
