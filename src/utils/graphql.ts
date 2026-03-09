import type { Policy } from '../types';

// Both dev and production use /wp-graphql — Vite dev proxy and Apache
// production proxy both rewrite this to the real WordPress GraphQL endpoint.
// This keeps the backend domain completely hidden from the browser.
const GRAPHQL_ENDPOINT = '/wp-graphql';

// WordPress uploads prefix — stripped and replaced with /documents/ so the
// backend domain is never exposed to the browser. In dev Vite reverse-proxies
// /documents/ to the WP uploads dir; in production Apache does the same.
const WP_UPLOADS_PREFIX = /^https?:\/\/[^/]+\/wp-content\/uploads\//;

/* ── Language name → ISO 639-1 code ────────────────────────────── */
const LANGUAGE_MAP: Record<string, string> = {
  english: 'en',
  french: 'fr',
  arabic: 'ar',
  portuguese: 'pt',
  swahili: 'sw',
  spanish: 'es',
  amharic: 'am',
  somali: 'so',
  hausa: 'ha',
  yoruba: 'yo',
  igbo: 'ig',
  zulu: 'zu',
  afrikaans: 'af',
  malagasy: 'mg',
  tigrinya: 'ti',
};
const KNOWN_LANGUAGES = new Set(Object.keys(LANGUAGE_MAP));

/* ── Comprehensive African country name → ISO-2 + region ──────── */
const AFRICAN_COUNTRIES: Record<string, { iso2: string; region: string }> = {
  algeria: { iso2: 'DZ', region: 'North Africa' },
  angola: { iso2: 'AO', region: 'Southern Africa' },
  benin: { iso2: 'BJ', region: 'West Africa' },
  botswana: { iso2: 'BW', region: 'Southern Africa' },
  'burkina faso': { iso2: 'BF', region: 'West Africa' },
  burundi: { iso2: 'BI', region: 'East Africa' },
  cameroon: { iso2: 'CM', region: 'Central Africa' },
  'cabo verde': { iso2: 'CV', region: 'West Africa' },
  'cape verde': { iso2: 'CV', region: 'West Africa' },
  'central african republic': { iso2: 'CF', region: 'Central Africa' },
  chad: { iso2: 'TD', region: 'Central Africa' },
  comoros: { iso2: 'KM', region: 'East Africa' },
  congo: { iso2: 'CG', region: 'Central Africa' },
  'republic of the congo': { iso2: 'CG', region: 'Central Africa' },
  'democratic republic of the congo': { iso2: 'CD', region: 'Central Africa' },
  'dr congo': { iso2: 'CD', region: 'Central Africa' },
  djibouti: { iso2: 'DJ', region: 'East Africa' },
  egypt: { iso2: 'EG', region: 'North Africa' },
  'equatorial guinea': { iso2: 'GQ', region: 'Central Africa' },
  eritrea: { iso2: 'ER', region: 'East Africa' },
  eswatini: { iso2: 'SZ', region: 'Southern Africa' },
  swaziland: { iso2: 'SZ', region: 'Southern Africa' },
  ethiopia: { iso2: 'ET', region: 'East Africa' },
  gabon: { iso2: 'GA', region: 'Central Africa' },
  gambia: { iso2: 'GM', region: 'West Africa' },
  'the gambia': { iso2: 'GM', region: 'West Africa' },
  ghana: { iso2: 'GH', region: 'West Africa' },
  guinea: { iso2: 'GN', region: 'West Africa' },
  'guinea-bissau': { iso2: 'GW', region: 'West Africa' },
  'ivory coast': { iso2: 'CI', region: 'West Africa' },
  "côte d'ivoire": { iso2: 'CI', region: 'West Africa' },
  "cote d'ivoire": { iso2: 'CI', region: 'West Africa' },
  kenya: { iso2: 'KE', region: 'East Africa' },
  lesotho: { iso2: 'LS', region: 'Southern Africa' },
  liberia: { iso2: 'LR', region: 'West Africa' },
  libya: { iso2: 'LY', region: 'North Africa' },
  madagascar: { iso2: 'MG', region: 'East Africa' },
  malawi: { iso2: 'MW', region: 'Southern Africa' },
  mali: { iso2: 'ML', region: 'West Africa' },
  mauritania: { iso2: 'MR', region: 'West Africa' },
  mauritius: { iso2: 'MU', region: 'East Africa' },
  morocco: { iso2: 'MA', region: 'North Africa' },
  mozambique: { iso2: 'MZ', region: 'Southern Africa' },
  namibia: { iso2: 'NA', region: 'Southern Africa' },
  niger: { iso2: 'NE', region: 'West Africa' },
  nigeria: { iso2: 'NG', region: 'West Africa' },
  rwanda: { iso2: 'RW', region: 'East Africa' },
  'são tomé and príncipe': { iso2: 'ST', region: 'Central Africa' },
  'sao tome and principe': { iso2: 'ST', region: 'Central Africa' },
  senegal: { iso2: 'SN', region: 'West Africa' },
  seychelles: { iso2: 'SC', region: 'East Africa' },
  'sierra leone': { iso2: 'SL', region: 'West Africa' },
  somalia: { iso2: 'SO', region: 'East Africa' },
  'south africa': { iso2: 'ZA', region: 'Southern Africa' },
  'south sudan': { iso2: 'SS', region: 'East Africa' },
  sudan: { iso2: 'SD', region: 'North Africa' },
  tanzania: { iso2: 'TZ', region: 'East Africa' },
  togo: { iso2: 'TG', region: 'West Africa' },
  tunisia: { iso2: 'TN', region: 'North Africa' },
  uganda: { iso2: 'UG', region: 'East Africa' },
  zambia: { iso2: 'ZM', region: 'Southern Africa' },
  zimbabwe: { iso2: 'ZW', region: 'Southern Africa' },
};

const YEAR_REGEX = /^\d{4}$/;
const SKIP_CATEGORIES = new Set(['uncategorized']);

/* ── Regional organization names (for tab classification) ─────── */
const REGIONAL_ORGS = new Set([
  'african union', 'au', 'ecowas', 'sadc', 'eac', 'igad', 'comesa',
  'eccas', 'amu', 'cen-sad', 'auc', 'nepad', 'afdb',
]);

/* ── GraphQL types ─────────────────────────────────────────────── */
interface GraphQLMediaNode {
  databaseId: number;
  title: string;
  description?: string | null;
  mediaItemUrl?: string | null;
  mimeType?: string | null;
  fileSize?: number | null;
  date?: string | null;
  categories: {
    nodes: Array<{ name: string }>;
  };
}

interface DocumentsResponse {
  data: {
    mediaItems: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: GraphQLMediaNode[];
    };
  };
}

interface SingleDocumentResponse {
  data: { mediaItem: GraphQLMediaNode | null };
}

/* ── Queries ───────────────────────────────────────────────────── */
const DOCUMENTS_QUERY = `
  query GetDocuments($first: Int!, $after: String) {
    mediaItems(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        title
        description
        mediaItemUrl
        mimeType
        fileSize
        date
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const SINGLE_DOCUMENT_QUERY = `
  query GetDocument($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      databaseId
      title
      description
      mediaItemUrl
      mimeType
      fileSize
      date
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

/* ── Helpers ───────────────────────────────────────────────────── */
async function graphqlFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors.map((e: { message: string }) => e.message).join(', '),
    );
  }

  return result;
}

function parseCategories(categoryNodes: Array<{ name: string }>) {
  const years: number[] = [];
  const languages: string[] = [];
  const themes: string[] = [];
  let countryCode = '';
  let countryName = '';
  let region = '';
  let isRegional = false;

  for (const { name } of categoryNodes) {
    const trimmed = name.trim();
    const lower = trimmed.toLowerCase();

    if (SKIP_CATEGORIES.has(lower)) continue;

    if (YEAR_REGEX.test(trimmed)) {
      years.push(parseInt(trimmed, 10));
    } else if (KNOWN_LANGUAGES.has(lower)) {
      languages.push(LANGUAGE_MAP[lower]);
    } else if (AFRICAN_COUNTRIES[lower]) {
      const info = AFRICAN_COUNTRIES[lower];
      countryCode = info.iso2;
      countryName = trimmed;
      region = info.region;
    } else if (REGIONAL_ORGS.has(lower)) {
      isRegional = true;
    } else {
      themes.push(trimmed);
    }
  }

  return {
    year: years.length > 0 ? Math.max(...years) : new Date().getFullYear(),
    country: countryName,
    countryCode,
    region,
    languages: languages.length > 0 ? languages : ['en'],
    themes,
    isRegional,
  };
}

/** Rewrite a WordPress media URL to a local /documents/ path. */
function toLocalFileUrl(url: string | null | undefined): string {
  if (!url) return '';
  return url.replace(WP_UPLOADS_PREFIX, '/documents/');
}

function transformMediaNode(node: GraphQLMediaNode): Policy {
  const parsed = parseCategories(node.categories.nodes);

  const summary = node.description
    ? node.description.replace(/<[^>]*>/g, '').trim()
    : '';

  return {
    id: node.databaseId.toString(),
    title: node.title || 'Untitled Document',
    country: parsed.country,
    countryCode: parsed.countryCode,
    region: parsed.region,
    year: parsed.year,
    type: parsed.isRegional ? 'regional' : 'national',
    organization: parsed.isRegional ? 'regional' : undefined,
    languages: parsed.languages,
    summary,
    themes: parsed.themes,
    fileUrl: toLocalFileUrl(node.mediaItemUrl),
    tags: parsed.themes.map((t) => t.toLowerCase().replace(/\s+/g, '-')),
  };
}

/* ── Public API ────────────────────────────────────────────────── */

/** Fetch all documents from the WordPress GraphQL backend. */
export async function fetchAllDocuments(): Promise<Policy[]> {
  const allDocuments: Policy[] = [];
  let cursor: string | null = null;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result: DocumentsResponse = await graphqlFetch(
      DOCUMENTS_QUERY,
      { first: 100, after: cursor },
    );

    const { nodes, pageInfo } = result.data.mediaItems;

    for (const node of nodes) {
      allDocuments.push(transformMediaNode(node));
    }

    if (!pageInfo.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }

  return allDocuments;
}

/** Fetch a single document by its database ID. */
export async function fetchDocumentById(
  id: string,
): Promise<Policy | null> {
  try {
    const result: SingleDocumentResponse = await graphqlFetch(
      SINGLE_DOCUMENT_QUERY, { id },
    );

    if (!result.data.mediaItem) return null;
    return transformMediaNode(result.data.mediaItem);
  } catch {
    return null;
  }
}
