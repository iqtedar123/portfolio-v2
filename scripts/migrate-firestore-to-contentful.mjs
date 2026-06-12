/**
 * Migrates Firestore Projects collection to Contentful project entries.
 *
 * Prerequisites:
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_MANAGEMENT_TOKEN
 *   CONTENTFUL_ENVIRONMENT (optional, default: master)
 *   GOOGLE_APPLICATION_CREDENTIALS (path to Firebase service account JSON)
 *
 * Usage: npm run migrate:firestore
 */

import contentfulManagement from "contentful-management";
import admin from "firebase-admin";
import { readFileSync } from "fs";

const { createClient } = contentfulManagement;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!SPACE_ID || !MANAGEMENT_TOKEN || !CREDENTIALS_PATH) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, or GOOGLE_APPLICATION_CREDENTIALS."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const contentfulClient = createClient({ accessToken: MANAGEMENT_TOKEN });

async function findExistingProject(environment, slug) {
  const entries = await environment.getEntries({
    content_type: "portfolioProject",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0] ?? null;
}

async function createProjectEntry(environment, docId, data) {
  const slug = data.slug || docId;
  const existing = await findExistingProject(environment, slug);

  if (existing) {
    console.log(`Skipping "${slug}" — entry already exists.`);
    return;
  }

  const entry = await environment.createEntry("portfolioProject", {
    fields: {
      title: { "en-US": data.title },
      description: { "en-US": data.description },
      slug: { "en-US": slug },
      link: data.link ? { "en-US": data.link } : undefined,
      keywords: data.keywords ? { "en-US": data.keywords } : undefined,
      rank: data.rank != null ? { "en-US": data.rank } : undefined,
    },
  });

  if (data.image && data.image.startsWith("http")) {
    console.warn(
      `Project "${slug}" has external image URL. Upload to Contentful manually: ${data.image}`
    );
  }

  await entry.publish();
  console.log(`Migrated project "${slug}".`);
}

async function main() {
  const space = await contentfulClient.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  const snapshot = await db.collection("Projects").get();

  if (snapshot.empty) {
    console.log("No projects found in Firestore.");
    return;
  }

  for (const doc of snapshot.docs) {
    await createProjectEntry(environment, doc.id, doc.data());
  }

  console.log(`Migration complete. Processed ${snapshot.size} project(s).`);
  console.log("Upload project images as Contentful assets and link them to entries.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
