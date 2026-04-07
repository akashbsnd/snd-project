export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="w-full pb-4 false market-footer"
      style={{ style: "margin-bottom: 0px" }}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-2 leading-4 text-[12px] text-core-text-20">
          &copy; {new Date().getFullYear()} Supreme Nomads Detailing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
