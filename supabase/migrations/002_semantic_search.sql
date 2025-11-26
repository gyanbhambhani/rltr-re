-- Enable pgvector for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding columns to core tables
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

ALTER TABLE transaction_documents
  ADD COLUMN IF NOT EXISTS text_content TEXT,
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create IVFFlat indexes for fast similarity search (requires data to ANALYZE beforehand)
CREATE INDEX IF NOT EXISTS idx_contacts_embedding
  ON contacts USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_properties_embedding
  ON properties USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_transactions_embedding
  ON transactions USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_transaction_documents_embedding
  ON transaction_documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Helper functions for scoped similarity search
DROP FUNCTION IF EXISTS match_contacts(vector, integer, uuid);
CREATE OR REPLACE FUNCTION match_contacts(
  query_embedding vector(1536),
  target_user_id uuid,
  match_count integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  first_name text,
  last_name text,
  email text,
  phone text,
  type contact_type,
  similarity double precision
) AS $$
  SELECT c.id,
         c.user_id,
         c.first_name,
         c.last_name,
         c.email,
         c.phone,
         c.type,
         1 - (c.embedding <=> query_embedding) AS similarity
  FROM contacts c
  WHERE c.user_id = target_user_id
    AND c.embedding IS NOT NULL
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;

DROP FUNCTION IF EXISTS match_properties(vector, integer, uuid);
CREATE OR REPLACE FUNCTION match_properties(
  query_embedding vector(1536),
  target_user_id uuid,
  match_count integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  address text,
  city text,
  state text,
  zip text,
  list_price decimal,
  beds integer,
  baths decimal,
  similarity double precision
) AS $$
  SELECT p.id,
         p.user_id,
         p.address,
         p.city,
         p.state,
         p.zip,
         p.list_price,
         p.beds,
         p.baths,
         1 - (p.embedding <=> query_embedding) AS similarity
  FROM properties p
  WHERE p.user_id = target_user_id
    AND p.embedding IS NOT NULL
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;

DROP FUNCTION IF EXISTS match_transactions(vector, integer, uuid);
CREATE OR REPLACE FUNCTION match_transactions(
  query_embedding vector(1536),
  target_user_id uuid,
  match_count integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  property_id uuid,
  buyer_contact_id uuid,
  seller_contact_id uuid,
  stage transaction_stage,
  offer_price decimal,
  close_date date,
  property_address text,
  property_city text,
  property_state text,
  property_zip text,
  buyer_name text,
  seller_name text,
  similarity double precision
) AS $$
  SELECT t.id,
         t.user_id,
         t.property_id,
         t.buyer_contact_id,
         t.seller_contact_id,
         t.stage,
         t.offer_price,
         t.close_date,
         p.address,
         p.city,
         p.state,
         p.zip,
         CONCAT_WS(' ', bc.first_name, bc.last_name),
         CONCAT_WS(' ', sc.first_name, sc.last_name),
         1 - (t.embedding <=> query_embedding) AS similarity
  FROM transactions t
  LEFT JOIN properties p ON p.id = t.property_id
  LEFT JOIN contacts bc ON bc.id = t.buyer_contact_id
  LEFT JOIN contacts sc ON sc.id = t.seller_contact_id
  WHERE t.user_id = target_user_id
    AND t.embedding IS NOT NULL
  ORDER BY t.embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;

DROP FUNCTION IF EXISTS match_transaction_documents(vector, integer, uuid);
CREATE OR REPLACE FUNCTION match_transaction_documents(
  query_embedding vector(1536),
  target_user_id uuid,
  match_count integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  transaction_id uuid,
  name text,
  type document_type,
  property_id uuid,
  stage transaction_stage,
  property_address text,
  property_city text,
  property_state text,
  similarity double precision
) AS $$
  SELECT d.id,
         d.transaction_id,
         d.name,
         d.type,
         t.property_id,
         t.stage,
         p.address,
         p.city,
         p.state,
         1 - (d.embedding <=> query_embedding) AS similarity
  FROM transaction_documents d
  JOIN transactions t ON t.id = d.transaction_id
  LEFT JOIN properties p ON p.id = t.property_id
  WHERE t.user_id = target_user_id
    AND d.embedding IS NOT NULL
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;
