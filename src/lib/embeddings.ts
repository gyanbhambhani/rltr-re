import OpenAI from 'openai';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const MAX_EMBEDDING_CHARS = 8000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const clean = (value?: string | null) => (value ?? '').trim();

const truncate = (value: string) => (value.length > MAX_EMBEDDING_CHARS ? value.slice(0, MAX_EMBEDDING_CHARS) : value);

export async function getEmbeddingForText(text: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const normalized = truncate(text.replace(/\s+/g, ' ').trim());
  if (!normalized) {
    throw new Error('Cannot generate embedding for empty text');
  }

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: normalized,
  });

  return response.data[0]?.embedding ?? [];
}

export type ContactEmbeddingSource = {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  type?: string | null;
};

export const buildContactEmbeddingText = (contact: ContactEmbeddingSource) =>
  [
    `${clean(contact.first_name)} ${clean(contact.last_name)}`.trim(),
    clean(contact.email),
    clean(contact.phone),
    clean(contact.type),
  ]
    .filter(Boolean)
    .join(' '.repeat(2));

export type PropertyEmbeddingSource = {
  address: string;
  city: string;
  state: string;
  zip: string;
  beds?: number | null;
  baths?: number | null;
  list_price?: number | null;
};

export const buildPropertyEmbeddingText = (property: PropertyEmbeddingSource) =>
  [
    `${clean(property.address)}, ${clean(property.city)}, ${clean(property.state)} ${clean(property.zip)}`.trim(),
    property.beds ? `${property.beds} beds` : '',
    property.baths ? `${property.baths} baths` : '',
    property.list_price ? `$${property.list_price.toLocaleString()}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

export type TransactionEmbeddingSource = {
  property_address?: string | null;
  buyer_name?: string | null;
  seller_name?: string | null;
  stage?: string | null;
  offer_price?: number | null;
};

export const buildTransactionEmbeddingText = (transaction: TransactionEmbeddingSource) =>
  [
    clean(transaction.property_address),
    transaction.buyer_name ? `Buyer: ${transaction.buyer_name}` : '',
    transaction.seller_name ? `Seller: ${transaction.seller_name}` : '',
    transaction.stage ? `Stage: ${transaction.stage}` : '',
    transaction.offer_price ? `Offer: $${transaction.offer_price.toLocaleString()}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

export type DocumentEmbeddingSource = {
  name: string;
  type?: string | null;
  text_content?: string | null;
};

export const buildDocumentEmbeddingText = (document: DocumentEmbeddingSource) =>
  truncate(
    [
      `${clean(document.name)} ${clean(document.type)}`.trim(),
      clean(document.text_content),
    ]
      .filter(Boolean)
      .join('\n')
  );
