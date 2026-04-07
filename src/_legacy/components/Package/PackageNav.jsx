import { labels } from "../../static/labels";

export default function PackageNav({ packageNavName }) {
  return (
    <nav aria-label="Breadcrumb" className="font-semibold mb-5 text-sm">
      <ol className="flex list-none m-0 p-0">
        <li className="after:content-['/'] after:mx-2 after:text-core-text-20">
          <a
            className="min-w-fit text-nowrap !text-core-text-20"
            href={labels.links.bookingsLink}
          >
            <span>{labels.services.allServices}</span>
          </a>
        </li>
        <li>
          <span className="line-clamp-1">{packageNavName}</span>
        </li>
      </ol>
    </nav>
  );
}
