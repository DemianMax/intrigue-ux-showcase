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
      curriculo: {
        Row: {
          created_at: string | null
          educacao: Json | null
          experiencias: Json
          id: string
          nome: string
          resumo: string
          resumo_profissional: string
          titulo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          educacao?: Json | null
          experiencias: Json
          id?: string
          nome: string
          resumo: string
          resumo_profissional: string
          titulo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          educacao?: Json | null
          experiencias?: Json
          id?: string
          nome?: string
          resumo?: string
          resumo_profissional?: string
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      habilidades_tecnicas: {
        Row: {
          ativo: boolean | null
          categoria: string
          created_at: string | null
          icone: string
          id: string
          nome: string
          ordem: number | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria: string
          created_at?: string | null
          icone: string
          id?: string
          nome: string
          ordem?: number | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria?: string
          created_at?: string | null
          icone?: string
          id?: string
          nome?: string
          ordem?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          alt: string
          created_at: string
          id: string
          img: string
          link: string
        }
        Insert: {
          alt: string
          created_at?: string
          id?: string
          img: string
          link: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: string
          img?: string
          link?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          challenge: string | null
          created_at: string
          hashtags_text: string | null
          id: string
          image: string
          next_steps: string | null
          problem: string
          process_images_text: string | null
          process_legends_text: string | null
          results_text: string | null
          role: string
          solution: string
          solution_images_legends_text: string | null
          solution_images_text: string | null
          title: string
          ui_note: string | null
        }
        Insert: {
          challenge?: string | null
          created_at?: string
          hashtags_text?: string | null
          id?: string
          image: string
          next_steps?: string | null
          problem: string
          process_images_text?: string | null
          process_legends_text?: string | null
          results_text?: string | null
          role: string
          solution: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title: string
          ui_note?: string | null
        }
        Update: {
          challenge?: string | null
          created_at?: string
          hashtags_text?: string | null
          id?: string
          image?: string
          next_steps?: string | null
          problem?: string
          process_images_text?: string | null
          process_legends_text?: string | null
          results_text?: string | null
          role?: string
          solution?: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title?: string
          ui_note?: string | null
        }
        Relationships: []
      }
      projects_en: {
        Row: {
          challenge: string | null
          created_at: string
          hashtags_text: string | null
          id: string
          image: string
          next_steps: string | null
          problem: string
          process_images_data: Json | null
          process_images_text: string | null
          process_legends_text: string | null
          results_text: string | null
          role: string
          solution: string
          solution_images_legends_text: string | null
          solution_images_text: string | null
          title: string
          ui_note: string | null
        }
        Insert: {
          challenge?: string | null
          created_at?: string
          hashtags_text?: string | null
          id?: string
          image: string
          next_steps?: string | null
          problem: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          results_text?: string | null
          role: string
          solution: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title: string
          ui_note?: string | null
        }
        Update: {
          challenge?: string | null
          created_at?: string
          hashtags_text?: string | null
          id?: string
          image?: string
          next_steps?: string | null
          problem?: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          results_text?: string | null
          role?: string
          solution?: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title?: string
          ui_note?: string | null
        }
        Relationships: []
      }
      projects_pt: {
        Row: {
          challenge: string | null
          created_at: string
          hashtags_text: string | null
          id: string
          image: string
          next_steps: string | null
          problem: string
          process_images_data: Json | null
          process_images_text: string | null
          process_legends_text: string | null
          results_text: string | null
          role: string
          solution: string
          solution_images_legends_text: string | null
          solution_images_text: string | null
          title: string
          ui_note: string | null
        }
        Insert: {
          challenge?: string | null
          created_at?: string
          hashtags_text?: string | null
          id?: string
          image: string
          next_steps?: string | null
          problem: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          results_text?: string | null
          role: string
          solution: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title: string
          ui_note?: string | null
        }
        Update: {
          challenge?: string | null
          created_at?: string
          hashtags_text?: string | null
          id?: string
          image?: string
          next_steps?: string | null
          problem?: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          results_text?: string | null
          role?: string
          solution?: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title?: string
          ui_note?: string | null
        }
        Relationships: []
      }
      sobre: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          destaque: string | null
          id: string
          imagem_perfil: string | null
          resumo: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          destaque?: string | null
          id?: string
          imagem_perfil?: string | null
          resumo?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          destaque?: string | null
          id?: string
          imagem_perfil?: string | null
          resumo?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
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
    Enums: {},
  },
} as const
