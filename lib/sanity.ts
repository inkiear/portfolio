import sanityClient from "@sanity/client";

export const sanity = sanityClient({
  projectId: "65os119z",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-09-21",
});
