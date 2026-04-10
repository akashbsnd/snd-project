import { createClient } from "@sanity/client";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DOMAIN = "https://www.supremenomads.com";
const TODAY = new Date().toISOString().split("T")[0];

// Static routes with their priority and change frequency
const staticRoutes = [
  { path: "/",          changefreq: "weekly",  priority: "1.0" },
  { path: "/services",  changefreq: "monthly", priority: "0.9" },
  { path: "/booking",   changefreq: "monthly", priority: "0.9" },
  { path: "/gallery",   changefreq: "monthly", priority: "0.7" },
  { path: "/about",     changefreq: "yearly",  priority: "0.6" },
  { path: "/academy",   changefreq: "weekly",  priority: "0.8" },
  // Add-on service pages
  { path: "/services/cabin-air-filter-replacement", changefreq: "yearly", priority: "0.5" },
  { path: "/services/odor-removal",                 changefreq: "yearly", priority: "0.5" },
  { path: "/services/pet-hair-removal",             changefreq: "yearly", priority: "0.5" },
  { path: "/services/stain-removal",                changefreq: "yearly", priority: "0.5" },
  { path: "/services/engine-bay-detail",            changefreq: "yearly", priority: "0.5" },
  { path: "/services/headlight-restoration",        changefreq: "yearly", priority: "0.5" },
  { path: "/services/paint-touch-up",               changefreq: "yearly", priority: "0.5" },
  { path: "/services/trim-restoration",             changefreq: "yearly", priority: "0.5" },
  { path: "/services/undercarriage-cleaning",       changefreq: "yearly", priority: "0.5" },
];

function buildUrl({ loc, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function fetchPostSlugs() {
  const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || "cikhe43d",
    dataset: process.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2021-06-07",
    useCdn: true,
  });

  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
  );
  return posts;
}

async function generate() {
  console.log("Generating sitemap...");

  // Build static URL entries
  const staticEntries = staticRoutes.map((r) =>
    buildUrl({ loc: `${DOMAIN}${r.path}`, lastmod: TODAY, changefreq: r.changefreq, priority: r.priority })
  );

  // Fetch dynamic blog post slugs from Sanity
  let dynamicEntries = [];
  try {
    const posts = await fetchPostSlugs();
    console.log(`  Found ${posts.length} Sanity post(s)`);
    dynamicEntries = posts.map((p) =>
      buildUrl({
        loc: `${DOMAIN}/academy/${p.slug}`,
        lastmod: p.publishedAt ? p.publishedAt.split("T")[0] : TODAY,
        changefreq: "monthly",
        priority: "0.7",
      })
    );
  } catch (err) {
    console.warn("  Could not fetch Sanity posts (sitemap will contain static routes only):", err.message);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...dynamicEntries].join("\n")}
</urlset>`;

  const outPath = resolve(__dirname, "../public/sitemap.xml");
  writeFileSync(outPath, xml, "utf-8");
  console.log(`  Sitemap written to public/sitemap.xml (${staticEntries.length} static + ${dynamicEntries.length} posts)`);
}

generate();
