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
const LOCALE = "en-US";

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

function fileNameFromUrl(url, slug) {
  const pathname = new URL(url).pathname;
  const ext = pathname.split(".").pop() || "png";
  return `${slug}.${ext}`;
}

async function uploadImageAsset(environment, { url, title, slug }) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image (${response.status}): ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "image/png";
  const fileName = fileNameFromUrl(url, slug);

  const upload = await environment.createUpload({ file: buffer });
  const asset = await environment.createAsset({
    fields: {
      title: { [LOCALE]: title },
      file: {
        [LOCALE]: {
          contentType,
          fileName,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  const processed = await asset.processForAllLocales();
  const published = await processed.publish();
  return published.sys.id;
}

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

  const fields = {
    title: { [LOCALE]: data.title },
    description: { [LOCALE]: data.description },
    slug: { [LOCALE]: slug },
    link: data.link ? { [LOCALE]: data.link } : undefined,
    keywords: data.keywords ? { [LOCALE]: data.keywords } : undefined,
    rank: data.rank != null ? { [LOCALE]: data.rank } : undefined,
  };

  if (data.image?.startsWith("http")) {
    const assetId = await uploadImageAsset(environment, {
      url: data.image,
      title: `${data.title} screenshot`,
      slug,
    });

    fields.screen = {
      [LOCALE]: {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: assetId,
        },
      },
    };
  }

  const entry = await environment.createEntry("portfolioProject", { fields });
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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
