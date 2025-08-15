export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      curriculo_en: {
        Row: {
          created_at: string
          educacao: Json
          experiencias: Json
          id: number
          nome: string
          resumo: string
          resumo_profissional: string
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educacao: Json
          experiencias: Json
          id?: number
          nome: string
          resumo: string
          resumo_profissional: string
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educacao?: Json
          experiencias?: Json
          id?: number
          nome?: string
          resumo?: string
          resumo_profissional?: string
          titulo?: string
          updated_at?: string
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
          additional_images_grid: string | null
          challenge: string | null
          created_at: string
          final_solution_images: string | null
          final_solution_text: string | null
          final_solution_title: string | null
          final_solution_video: string | null
          hashtags_text: string | null
          id: string
          image: string
          learning_conclusion_text: string | null
          learning_conclusion_title: string | null
          next_steps: string | null
          problem: string
          process_images_data: Json | null
          process_images_text: string | null
          process_legends_text: string | null
          process_text: string | null
          prototyping_images: string | null
          prototyping_text: string | null
          prototyping_title: string | null
          results_text: string | null
          role: string
          solution: string
          solution_images_legends_text: string | null
          solution_images_text: string | null
          title: string
          topPageimg: string | null
          ui_note: string | null
        }
        Insert: {
          additional_images_grid?: string | null
          challenge?: string | null
          created_at?: string
          final_solution_images?: string | null
          final_solution_text?: string | null
          final_solution_title?: string | null
          final_solution_video?: string | null
          hashtags_text?: string | null
          id?: string
          image: string
          learning_conclusion_text?: string | null
          learning_conclusion_title?: string | null
          next_steps?: string | null
          problem: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          process_text?: string | null
          prototyping_images?: string | null
          prototyping_text?: string | null
          prototyping_title?: string | null
          results_text?: string | null
          role: string
          solution: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title: string
          topPageimg?: string | null
          ui_note?: string | null
        }
        Update: {
          additional_images_grid?: string | null
          challenge?: string | null
          created_at?: string
          final_solution_images?: string | null
          final_solution_text?: string | null
          final_solution_title?: string | null
          final_solution_video?: string | null
          hashtags_text?: string | null
          id?: string
          image?: string
          learning_conclusion_text?: string | null
          learning_conclusion_title?: string | null
          next_steps?: string | null
          problem?: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          process_text?: string | null
          prototyping_images?: string | null
          prototyping_text?: string | null
          prototyping_title?: string | null
          results_text?: string | null
          role?: string
          solution?: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title?: string
          topPageimg?: string | null
          ui_note?: string | null
        }
        Relationships: []
      }
      projects_pt: {
        Row: {
          additional_images_grid: string | null
          challenge: string | null
          created_at: string
          final_solution_images: string | null
          final_solution_text: string | null
          final_solution_title: string | null
          final_solution_video: string | null
          hashtags_text: string | null
          id: string
          image: string
          image_m: string | null
          image_t: string | null
          imageCardDesktop: string | null
          imageCardMobile: string | null
          imageCardTablet: string | null
          learning_conclusion_text: string | null
          learning_conclusion_title: string | null
          next_steps: string | null
          problem: string
          process_images_data: Json | null
          process_images_text: string | null
          process_legends_text: string | null
          process_text: string | null
          prototyping_images: string | null
          prototyping_text: string | null
          prototyping_title: string | null
          results_text: string | null
          role: string
          solution: string
          solution_images_legends_text: string | null
          solution_images_text: string | null
          title: string
          topPageimg: string | null
          ui_note: string | null
        }
        Insert: {
          additional_images_grid?: string | null
          challenge?: string | null
          created_at?: string
          final_solution_images?: string | null
          final_solution_text?: string | null
          final_solution_title?: string | null
          final_solution_video?: string | null
          hashtags_text?: string | null
          id?: string
          image: string
          image_m?: string | null
          image_t?: string | null
          imageCardDesktop?: string | null
          imageCardMobile?: string | null
          imageCardTablet?: string | null
          learning_conclusion_text?: string | null
          learning_conclusion_title?: string | null
          next_steps?: string | null
          problem: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          process_text?: string | null
          prototyping_images?: string | null
          prototyping_text?: string | null
          prototyping_title?: string | null
          results_text?: string | null
          role: string
          solution: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title: string
          topPageimg?: string | null
          ui_note?: string | null
        }
        Update: {
          additional_images_grid?: string | null
          challenge?: string | null
          created_at?: string
          final_solution_images?: string | null
          final_solution_text?: string | null
          final_solution_title?: string | null
          final_solution_video?: string | null
          hashtags_text?: string | null
          id?: string
          image?: string
          image_m?: string | null
          image_t?: string | null
          imageCardDesktop?: string | null
          imageCardMobile?: string | null
          imageCardTablet?: string | null
          learning_conclusion_text?: string | null
          learning_conclusion_title?: string | null
          next_steps?: string | null
          problem?: string
          process_images_data?: Json | null
          process_images_text?: string | null
          process_legends_text?: string | null
          process_text?: string | null
          prototyping_images?: string | null
          prototyping_text?: string | null
          prototyping_title?: string | null
          results_text?: string | null
          role?: string
          solution?: string
          solution_images_legends_text?: string | null
          solution_images_text?: string | null
          title?: string
          topPageimg?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
