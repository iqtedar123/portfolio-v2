/**
 * Verifies Contentful content types exist for this portfolio.
 *
 * Prerequisites:
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_MANAGEMENT_TOKEN
 *   CONTENTFUL_ENVIRONMENT (optional, default: master)
 *
 * Usage: npm run setup:contentful
 */

import contentfulManagement from "contentful-management";

const { createClient } = contentfulManagement;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

const REQUIRED_CONTENT_TYPES = [
  "banner",
  "contactInformation",
  "socialLink",
  "portfolioProject",
];

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN env vars."
  );
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  for (const contentTypeId of REQUIRED_CONTENT_TYPES) {
    try {
      await environment.getContentType(contentTypeId);
      console.log(`Content type "${contentTypeId}" found.`);
    } catch {
      console.error(`Missing content type "${contentTypeId}".`);
      process.exitCode = 1;
    }
  }

  if (process.exitCode === 1) {
    console.error("Create the missing content types in Contentful before running the app.");
    return;
  }

  console.log("Contentful content types verified.");
  console.log("Publish entries for banner, contactInformation, socialLink, and portfolioProject.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
