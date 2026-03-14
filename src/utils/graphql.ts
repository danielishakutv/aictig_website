import type { Policy, Publication, NewsArticle } from '../types';

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

/* ── Organization names → level + display label ───────────────── */
const ORGANIZATIONS: Record<string, { level: 'continental' | 'regional' | 'international'; label: string; key: string }> = {
  // Continental (African Union family)
  'african union':  { level: 'continental', label: 'African Union',  key: 'au' },
  'au':             { level: 'continental', label: 'African Union',  key: 'au' },
  'auc':            { level: 'continental', label: 'African Union',  key: 'au' },
  'nepad':          { level: 'continental', label: 'NEPAD',          key: 'nepad' },
  'afdb':           { level: 'continental', label: 'AfDB',           key: 'afdb' },
  // Regional Economic Communities
  'ecowas':         { level: 'regional', label: 'ECOWAS',           key: 'ecowas' },
  'sadc':           { level: 'regional', label: 'SADC',             key: 'sadc' },
  'eac':            { level: 'regional', label: 'EAC',              key: 'eac' },
  'igad':           { level: 'regional', label: 'IGAD',             key: 'igad' },
  'comesa':         { level: 'regional', label: 'COMESA',           key: 'comesa' },
  'eccas':          { level: 'regional', label: 'ECCAS',            key: 'eccas' },
  'amu':            { level: 'regional', label: 'AMU',              key: 'amu' },
  'cen-sad':        { level: 'regional', label: 'CEN-SAD',          key: 'cen-sad' },
  'asean':          { level: 'regional', label: 'ASEAN',            key: 'asean' },
  'arab league':    { level: 'regional', label: 'Arab League',      key: 'arab-league' },
  // International
  'international':  { level: 'international', label: 'International', key: 'international' },
  'itu':            { level: 'international', label: 'ITU',           key: 'itu' },
  'united nations': { level: 'international', label: 'United Nations', key: 'un' },
  'un':             { level: 'international', label: 'United Nations', key: 'un' },
};

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
    mediaItems(
      first: $first
      after: $after
      where: { hasPassword: false }
    ) {
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
  let orgLabel = '';
  let orgKey = '';
  let orgLevel: 'continental' | 'regional' | 'international' | '' = '';

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
    } else if (ORGANIZATIONS[lower]) {
      const org = ORGANIZATIONS[lower];
      orgLabel = org.label;
      orgKey = org.key;
      orgLevel = org.level;
    } else {
      themes.push(trimmed);
    }
  }

  // Determine document level: org-level if an org was found, otherwise national
  const level: 'national' | 'regional' | 'continental' | 'international' =
    orgLevel || (countryCode ? 'national' : 'national');

  return {
    year: years.length > 0 ? Math.max(...years) : new Date().getFullYear(),
    country: countryName,
    countryCode,
    region,
    languages: languages.length > 0 ? languages : ['en'],
    themes,
    level,
    orgLabel,
    orgKey,
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
    type: parsed.level === 'national' ? 'national' : parsed.level,
    level: parsed.level,
    organization: parsed.orgLabel || undefined,
    organizationKey: parsed.orgKey || undefined,
    languages: parsed.languages,
    summary,
    themes: parsed.themes,
    fileUrl: toLocalFileUrl(node.mediaItemUrl),
    tags: parsed.themes.map((t) => t.toLowerCase().replace(/\s+/g, '-')),
  };
}

/**
 * A valid repository document must have at least one repository-relevant
 * category assigned (country/region, theme/sector, language, or year).
 * Media items that lack ALL of these are generic uploads (logos, photos, etc.)
 * and should be excluded from the repository.
 */
function isRepositoryDocument(node: GraphQLMediaNode): boolean {
  const cats = node.categories?.nodes;
  if (!cats || cats.length === 0) return false;

  for (const { name } of cats) {
    const lower = name.trim().toLowerCase();
    if (SKIP_CATEGORIES.has(lower)) continue;

    // Year
    if (YEAR_REGEX.test(name.trim())) return true;
    // Language
    if (KNOWN_LANGUAGES.has(lower)) return true;
    // Country
    if (AFRICAN_COUNTRIES[lower]) return true;
    // Organization (continental / regional / international)
    if (ORGANIZATIONS[lower]) return true;
    // Any other non-skipped category counts as a theme
    return true;
  }

  return false;
}

/* ── Public API ────────────────────────────────────────────────── */

/** Fetch all repository documents from the WordPress GraphQL backend.
 *  Only items with at least one repository-relevant category
 *  (Region, Country, Theme/Sector, Language, Year) are returned.
 */
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
      if (isRepositoryDocument(node)) {
        allDocuments.push(transformMediaNode(node));
      }
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

/* ══════════════════════════════════════════════════════════════════
   Posts (Publications & News)
   ══════════════════════════════════════════════════════════════════ */

interface GraphQLPostNode {
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author: { node: { name: string } };
  featuredImage: { node: { sourceUrl: string } } | null;
  categories: { nodes: Array<{ name: string }> };
  tags: { nodes: Array<{ name: string }> };
}

interface PostsResponse {
  data: {
    posts: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: GraphQLPostNode[];
    };
  };
}

interface SinglePostResponse {
  data: { post: GraphQLPostNode | null };
}

const POSTS_QUERY = `
  query GetPosts($first: Int!, $after: String, $categoryName: String!) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, categoryName: $categoryName }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        title
        slug
        date
        excerpt
        content
        author { node { name } }
        featuredImage { node { sourceUrl } }
        categories { nodes { name } }
        tags { nodes { name } }
      }
    }
  }
`;

const SINGLE_POST_QUERY = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      title
      slug
      date
      excerpt
      content
      author { node { name } }
      featuredImage { node { sourceUrl } }
      categories { nodes { name } }
      tags { nodes { name } }
    }
  }
`;

/** Strip HTML tags from a string. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/** Rewrite a WordPress image URL to a local /documents/ path. */
function toLocalImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  return url.replace(WP_UPLOADS_PREFIX, '/documents/');
}

function transformPostToPublication(node: GraphQLPostNode): Publication {
  const tagNames = node.tags.nodes.map((t) => t.name);
  const catNames = node.categories.nodes
    .map((c) => c.name)
    .filter((n) => n.toLowerCase() !== 'publications');

  // Use the first non-"publications" category as the type, or fallback to 'Article'
  const type = catNames[0] || 'Article';

  return {
    id: node.databaseId.toString(),
    title: node.title,
    slug: node.slug,
    authors: [node.author.node.name],
    year: new Date(node.date).getFullYear(),
    type,
    abstract: stripHtml(node.excerpt),
    content: node.content,
    fileUrl: '',
    cover: toLocalImageUrl(node.featuredImage?.node?.sourceUrl),
    tags: tagNames,
  };
}

function transformPostToNewsArticle(node: GraphQLPostNode): NewsArticle {
  const tagNames = node.tags.nodes.map((t) => t.name);

  return {
    id: node.databaseId.toString(),
    title: node.title,
    slug: node.slug,
    date: node.date,
    excerpt: stripHtml(node.excerpt),
    body: node.content,
    image: toLocalImageUrl(node.featuredImage?.node?.sourceUrl),
    author: node.author.node.name,
    tags: tagNames,
  };
}

/** Fetch all published posts in a given category. */
async function fetchPostsByCategory(categoryName: string): Promise<GraphQLPostNode[]> {
  const allNodes: GraphQLPostNode[] = [];
  let cursor: string | null = null;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result: PostsResponse = await graphqlFetch(
      POSTS_QUERY,
      { first: 100, after: cursor, categoryName },
    );

    const { nodes, pageInfo } = result.data.posts;
    allNodes.push(...nodes);

    if (!pageInfo.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }

  return allNodes;
}

/** Fetch all published publications (posts in the "publications" category). */
export async function fetchPublications(): Promise<Publication[]> {
  const nodes = await fetchPostsByCategory('publications');
  return nodes.map(transformPostToPublication);
}

/** Fetch all published news articles (posts in the "news" category). */
export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  const nodes = await fetchPostsByCategory('news');
  return nodes
    .map(transformPostToNewsArticle)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Fetch a single publication by slug. */
export async function fetchPublicationBySlug(
  slug: string,
): Promise<Publication | null> {
  try {
    const result: SinglePostResponse = await graphqlFetch(
      SINGLE_POST_QUERY, { slug },
    );

    if (!result.data.post) return null;

    const isPub = result.data.post.categories.nodes.some(
      (c) => c.name.toLowerCase() === 'publications',
    );
    if (!isPub) return null;

    return transformPostToPublication(result.data.post);
  } catch {
    return null;
  }
}

/** Fetch a single news article by slug. */
export async function fetchNewsArticleBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  try {
    const result: SinglePostResponse = await graphqlFetch(
      SINGLE_POST_QUERY, { slug },
    );

    if (!result.data.post) return null;

    // Verify this post is in the "news" category
    const isNews = result.data.post.categories.nodes.some(
      (c) => c.name.toLowerCase() === 'news',
    );
    if (!isNews) return null;

    return transformPostToNewsArticle(result.data.post);
  } catch {
    return null;
  }
}

/* ══════════════════════════════════════════════════════════════════
   Latest updates ticker (cached, merges all content types)
   ══════════════════════════════════════════════════════════════════ */

const UPDATES_CACHE_KEY = 'aictig_updates';
const UPDATES_CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface CachedUpdates {
  ts: number;
  items: { text: string; link: string }[];
}

/**
 * Return the N most recent items across news, publications, and repository
 * documents. Results are cached in sessionStorage for 15 min so the backend
 * is hit at most once per browser tab per 15 min window.
 */
export async function fetchLatestUpdates(
  count = 10,
): Promise<{ text: string; link: string }[]> {
  // 1. Try sessionStorage cache
  try {
    const raw = sessionStorage.getItem(UPDATES_CACHE_KEY);
    if (raw) {
      const cached: CachedUpdates = JSON.parse(raw);
      if (Date.now() - cached.ts < UPDATES_CACHE_TTL) return cached.items;
    }
  } catch { /* ignore corrupted cache */ }

  // 2. Fetch all three sources in parallel
  const [news, pubs, docs] = await Promise.all([
    fetchNewsArticles().catch(() => [] as NewsArticle[]),
    fetchPublications().catch(() => [] as Publication[]),
    fetchAllDocuments().catch(() => [] as Policy[]),
  ]);

  // 3. Normalise into a common shape with a sortable timestamp
  const merged: { text: string; link: string; date: number }[] = [
    ...news.map((a) => ({
      text: a.title,
      link: `/news/${a.slug}`,
      date: new Date(a.date).getTime(),
    })),
    ...pubs.map((p) => ({
      text: p.title,
      link: `/publications/${p.slug}`,
      date: new Date(`${p.year}-01-01`).getTime(),
    })),
    ...docs.map((d) => ({
      text: d.title,
      link: `/repository/${d.id}`,
      date: new Date(`${d.year}-01-01`).getTime(),
    })),
  ];

  // 4. Sort newest-first, take the top N
  merged.sort((a, b) => b.date - a.date);
  const items = merged.slice(0, count).map(({ text, link }) => ({ text, link }));

  // 5. Cache
  try {
    sessionStorage.setItem(
      UPDATES_CACHE_KEY,
      JSON.stringify({ ts: Date.now(), items } satisfies CachedUpdates),
    );
  } catch { /* quota exceeded — no big deal */ }

  return items;
}
