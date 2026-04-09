import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "cikhe43d",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2021-06-07",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
