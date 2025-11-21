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

export interface Database {
  public: {
    Tables: {
      // Add your table types here as you create them
      // Example:
      // profiles: {
      //   Row: {
      //     id: string
      //     full_name: string | null
      //     avatar_url: string | null
      //     created_at: string
      //   }
      //   Insert: {
      //     id: string
      //     full_name?: string | null
      //     avatar_url?: string | null
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     full_name?: string | null
      //     avatar_url?: string | null
      //     created_at?: string
      //   }
      // }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

