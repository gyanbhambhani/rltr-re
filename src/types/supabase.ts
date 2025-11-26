// This file can be extended with your database types
// Generate types from your Supabase schema using:
// npx supabase gen types typescript --project-id your-project-id > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ContactType = 'buyer' | 'seller' | 'lender' | 'other'
export type ContactSource = 'csv_import' | 'manual'
export type TransactionStage = 'lead' | 'offer_drafting' | 'offer_submitted' | 'in_escrow' | 'closed' | 'dead'
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type DocumentType = 'offer' | 'disclosure' | 'inspection' | 'other'
export type IntegrationType = 'mls'
export type IntegrationStatus = 'connected' | 'error' | 'disconnected'

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          type: ContactType
          source: ContactSource
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          type?: ContactType
          source?: ContactSource
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          type?: ContactType
          source?: ContactSource
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          user_id: string
          mls_id: string | null
          address: string
          city: string
          state: string
          zip: string
          list_price: number | null
          beds: number | null
          baths: number | null
          sqft: number | null
          raw_mls_json: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mls_id?: string | null
          address: string
          city: string
          state: string
          zip: string
          list_price?: number | null
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          raw_mls_json?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mls_id?: string | null
          address?: string
          city?: string
          state?: string
          zip?: string
          list_price?: number | null
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          raw_mls_json?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          buyer_contact_id: string
          seller_contact_id: string | null
          property_id: string
          stage: TransactionStage
          offer_price: number | null
          close_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          buyer_contact_id: string
          seller_contact_id?: string | null
          property_id: string
          stage?: TransactionStage
          offer_price?: number | null
          close_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          buyer_contact_id?: string
          seller_contact_id?: string | null
          property_id?: string
          stage?: TransactionStage
          offer_price?: number | null
          close_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transaction_tasks: {
        Row: {
          id: string
          transaction_id: string
          title: string
          status: TaskStatus
          order_index: number
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          transaction_id: string
          title: string
          status?: TaskStatus
          order_index?: number
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          transaction_id?: string
          title?: string
          status?: TaskStatus
          order_index?: number
          created_at?: string
          completed_at?: string | null
        }
      }
      transaction_documents: {
        Row: {
          id: string
          transaction_id: string
          name: string
          type: DocumentType
          file_url: string
          created_at: string
        }
        Insert: {
          id?: string
          transaction_id: string
          name: string
          type?: DocumentType
          file_url: string
          created_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string
          name?: string
          type?: DocumentType
          file_url?: string
          created_at?: string
        }
      }
      integration_connections: {
        Row: {
          id: string
          user_id: string
          type: IntegrationType
          provider: string
          config: Json
          status: IntegrationStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: IntegrationType
          provider: string
          config?: Json
          status?: IntegrationStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: IntegrationType
          provider?: string
          config?: Json
          status?: IntegrationStatus
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_type: ContactType
      contact_source: ContactSource
      transaction_stage: TransactionStage
      task_status: TaskStatus
      document_type: DocumentType
      integration_type: IntegrationType
      integration_status: IntegrationStatus
    }
  }
}

// Helper types for domain models
export type Contact = Database['public']['Tables']['contacts']['Row']
export type Property = Database['public']['Tables']['properties']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransactionTask = Database['public']['Tables']['transaction_tasks']['Row']
export type TransactionDocument = Database['public']['Tables']['transaction_documents']['Row']
export type IntegrationConnection = Database['public']['Tables']['integration_connections']['Row']
