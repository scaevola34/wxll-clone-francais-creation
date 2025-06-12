export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artist_projects: {
        Row: {
          artist_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          title: string
          year: number | null
        }
        Insert: {
          artist_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          title: string
          year?: number | null
        }
        Update: {
          artist_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          title?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_projects_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artists: {
        Row: {
          bio: string | null
          contact_email: string | null
          coverage_area: string | null
          created_at: string | null
          description: string | null
          experience_years: number | null
          id: string
          instagram_handle: string | null
          location: string | null
          name: string
          previous_works_urls: string[] | null
          profile_image_url: string | null
          projects_count: number | null
          style: string | null
          visibility: boolean | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          contact_email?: string | null
          coverage_area?: string | null
          created_at?: string | null
          description?: string | null
          experience_years?: number | null
          id?: string
          instagram_handle?: string | null
          location?: string | null
          name: string
          previous_works_urls?: string[] | null
          profile_image_url?: string | null
          projects_count?: number | null
          style?: string | null
          visibility?: boolean | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          contact_email?: string | null
          coverage_area?: string | null
          created_at?: string | null
          description?: string | null
          experience_years?: number | null
          id?: string
          instagram_handle?: string | null
          location?: string | null
          name?: string
          previous_works_urls?: string[] | null
          profile_image_url?: string | null
          projects_count?: number | null
          style?: string | null
          visibility?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          biographie: string | null
          created_at: string | null
          email: string | null
          id: string
          localisation: string | null
          nom_complet: string | null
          style_artistique: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          biographie?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          localisation?: string | null
          nom_complet?: string | null
          style_artistique?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          biographie?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          localisation?: string | null
          nom_complet?: string | null
          style_artistique?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          artist_id: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          title: string
          wall_owner_id: string | null
        }
        Insert: {
          artist_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title: string
          wall_owner_id?: string | null
        }
        Update: {
          artist_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title?: string
          wall_owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_wall_owner_id_fkey"
            columns: ["wall_owner_id"]
            isOneToOne: false
            referencedRelation: "wall_owners"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          artist_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          reviewer_name: string
        }
        Insert: {
          artist_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          reviewer_name: string
        }
        Update: {
          artist_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewer_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      wall_owners: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          contact_email: string | null
          created_at: string | null
          description: string | null
          desired_timing: Database["public"]["Enums"]["timing_enum"] | null
          height_m: number
          id: string
          image_url: string | null
          indoor: boolean
          location_postal_code: string
          Name: string | null
          owner_type: Database["public"]["Enums"]["owner_type_enum"]
          photo_urls: string[] | null
          surface_area_m2: number | null
          surface_type: Database["public"]["Enums"]["surface_type_enum"]
          visibility: boolean | null
          width_m: number
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          desired_timing?: Database["public"]["Enums"]["timing_enum"] | null
          height_m: number
          id?: string
          image_url?: string | null
          indoor: boolean
          location_postal_code: string
          Name?: string | null
          owner_type: Database["public"]["Enums"]["owner_type_enum"]
          photo_urls?: string[] | null
          surface_area_m2?: number | null
          surface_type: Database["public"]["Enums"]["surface_type_enum"]
          visibility?: boolean | null
          width_m: number
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          desired_timing?: Database["public"]["Enums"]["timing_enum"] | null
          height_m?: number
          id?: string
          image_url?: string | null
          indoor?: boolean
          location_postal_code?: string
          Name?: string | null
          owner_type?: Database["public"]["Enums"]["owner_type_enum"]
          photo_urls?: string[] | null
          surface_area_m2?: number | null
          surface_type?: Database["public"]["Enums"]["surface_type_enum"]
          visibility?: boolean | null
          width_m?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_artist_rating: {
        Args: { artist_uuid: string }
        Returns: number
      }
    }
    Enums: {
      owner_type_enum: "individuel" | "copropriété" | "syndic" | "collectivité"
      surface_type_enum: "béton" | "brique" | "bois" | "verre" | "autre"
      timing_enum: "urgent" | "3mois" | "6mois" | "1an"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      owner_type_enum: ["individuel", "copropriété", "syndic", "collectivité"],
      surface_type_enum: ["béton", "brique", "bois", "verre", "autre"],
      timing_enum: ["urgent", "3mois", "6mois", "1an"],
    },
  },
} as const
