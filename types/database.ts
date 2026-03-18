// types/database.ts
// Tipos TypeScript que reflejan el esquema de Supabase

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          original_price: number | null
          category: string
          status: 'active' | 'sold_out'
          sizes: string[]
          colors: { hex: string; name: string }[]
          images: string[]
          sku: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      config: {
        Row: {
          id: string
          key: string
          value: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['config']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['config']['Insert']>
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export interface CartItem {
  id: string
  name: string
  price: number
  img: string | null
  color: { hex: string; name: string } | null
  size: string | null
  qty: number
}

export interface StoreConfig {
  name: string
  whatsapp: string
  slogan: string
  instagram: string
  facebook: string
  tiktok: string
}
