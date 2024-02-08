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
      ActivityProgress: {
        Row: {
          ActivityProgressID: string
          ActivityType: Database["public"]["Enums"]["activitytypes"]
          BelongsToTeamID: string
          CreatedAt: string
          CreatedByProfileID: string
          RawProgress: number | null
          UpdatedAt: string
        }
        Insert: {
          ActivityProgressID?: string
          ActivityType: Database["public"]["Enums"]["activitytypes"]
          BelongsToTeamID: string
          CreatedAt?: string
          CreatedByProfileID: string
          RawProgress?: number | null
          UpdatedAt?: string
        }
        Update: {
          ActivityProgressID?: string
          ActivityType?: Database["public"]["Enums"]["activitytypes"]
          BelongsToTeamID?: string
          CreatedAt?: string
          CreatedByProfileID?: string
          RawProgress?: number | null
          UpdatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "ActivityProgress_BelongsToTeamID_fkey"
            columns: ["BelongsToTeamID"]
            isOneToOne: false
            referencedRelation: "Teams"
            referencedColumns: ["TeamID"]
          },
          {
            foreignKeyName: "ActivityProgress_BelongsToTeamID_fkey"
            columns: ["BelongsToTeamID"]
            isOneToOne: false
            referencedRelation: "TeamStats"
            referencedColumns: ["TeamID"]
          },
          {
            foreignKeyName: "ActivityProgress_CreatedByProfileID_fkey"
            columns: ["CreatedByProfileID"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["ProfileID"]
          },
          {
            foreignKeyName: "ActivityProgress_CreatedByProfileID_fkey"
            columns: ["CreatedByProfileID"]
            isOneToOne: false
            referencedRelation: "ProfileStats"
            referencedColumns: ["ProfileID"]
          }
        ]
      }
      Events: {
        Row: {
          CreatedAt: string
          CreatedByUserID: string
          EndsAt: string
          EventID: string
          Name: string
          StartsAt: string
          Type: Database["public"]["Enums"]["ActivityTypes"]
          UpdatedAt: string
        }
        Insert: {
          CreatedAt?: string
          CreatedByUserID: string
          EndsAt: string
          EventID?: string
          Name: string
          StartsAt: string
          Type: Database["public"]["Enums"]["ActivityTypes"]
          UpdatedAt?: string
        }
        Update: {
          CreatedAt?: string
          CreatedByUserID?: string
          EndsAt?: string
          EventID?: string
          Name?: string
          StartsAt?: string
          Type?: Database["public"]["Enums"]["ActivityTypes"]
          UpdatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Events_CreatedByUserID_fkey"
            columns: ["CreatedByUserID"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["ProfileID"]
          },
          {
            foreignKeyName: "Events_CreatedByUserID_fkey"
            columns: ["CreatedByUserID"]
            isOneToOne: false
            referencedRelation: "ProfileStats"
            referencedColumns: ["ProfileID"]
          }
        ]
      }
      Profiles: {
        Row: {
          CreatedAt: string
          Name: string | null
          ProfileID: string
          UpdatedAt: string
        }
        Insert: {
          CreatedAt?: string
          Name?: string | null
          ProfileID: string
          UpdatedAt?: string
        }
        Update: {
          CreatedAt?: string
          Name?: string | null
          ProfileID?: string
          UpdatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Profiles_ProfileID_fkey"
            columns: ["ProfileID"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Teams: {
        Row: {
          BelongsToEventID: string
          CreatedAt: string
          Name: string
          TeamID: string
          UpdatedAt: string
        }
        Insert: {
          BelongsToEventID: string
          CreatedAt?: string
          Name: string
          TeamID?: string
          UpdatedAt?: string
        }
        Update: {
          BelongsToEventID?: string
          CreatedAt?: string
          Name?: string
          TeamID?: string
          UpdatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Team_BelongsToEventID_fkey"
            columns: ["BelongsToEventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          },
          {
            foreignKeyName: "Team_BelongsToEventID_fkey"
            columns: ["BelongsToEventID"]
            isOneToOne: false
            referencedRelation: "EventStats"
            referencedColumns: ["EventID"]
          }
        ]
      }
      TeamsProfiles: {
        Row: {
          ProfileID: string
          TeamID: string
        }
        Insert: {
          ProfileID: string
          TeamID: string
        }
        Update: {
          ProfileID?: string
          TeamID?: string
        }
        Relationships: [
          {
            foreignKeyName: "TeamsProfiles_ProfileID_fkey"
            columns: ["ProfileID"]
            isOneToOne: false
            referencedRelation: "Profiles"
            referencedColumns: ["ProfileID"]
          },
          {
            foreignKeyName: "TeamsProfiles_ProfileID_fkey"
            columns: ["ProfileID"]
            isOneToOne: false
            referencedRelation: "ProfileStats"
            referencedColumns: ["ProfileID"]
          },
          {
            foreignKeyName: "TeamsProfiles_TeamID_fkey"
            columns: ["TeamID"]
            isOneToOne: false
            referencedRelation: "Teams"
            referencedColumns: ["TeamID"]
          },
          {
            foreignKeyName: "TeamsProfiles_TeamID_fkey"
            columns: ["TeamID"]
            isOneToOne: false
            referencedRelation: "TeamStats"
            referencedColumns: ["TeamID"]
          }
        ]
      }
    }
    Views: {
      EventStats: {
        Row: {
          EventID: string | null
          Name: string | null
          TotalScore: number | null
        }
        Insert: {
          EventID?: string | null
          Name?: string | null
          TotalScore?: never
        }
        Update: {
          EventID?: string | null
          Name?: string | null
          TotalScore?: never
        }
        Relationships: []
      }
      ProfileStats: {
        Row: {
          Name: string | null
          ProfileID: string | null
          TotalScore: number | null
        }
        Insert: {
          Name?: string | null
          ProfileID?: string | null
          TotalScore?: never
        }
        Update: {
          Name?: string | null
          ProfileID?: string | null
          TotalScore?: never
        }
        Relationships: [
          {
            foreignKeyName: "Profiles_ProfileID_fkey"
            columns: ["ProfileID"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      TeamStats: {
        Row: {
          BelongsToEventID: string | null
          Name: string | null
          TeamID: string | null
          TotalScore: number | null
        }
        Insert: {
          BelongsToEventID?: string | null
          Name?: string | null
          TeamID?: string | null
          TotalScore?: never
        }
        Update: {
          BelongsToEventID?: string | null
          Name?: string | null
          TeamID?: string | null
          TotalScore?: never
        }
        Relationships: [
          {
            foreignKeyName: "Team_BelongsToEventID_fkey"
            columns: ["BelongsToEventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          },
          {
            foreignKeyName: "Team_BelongsToEventID_fkey"
            columns: ["BelongsToEventID"]
            isOneToOne: false
            referencedRelation: "EventStats"
            referencedColumns: ["EventID"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activitytypes: "Steps" | "Distance"
      ActivityTypes: "Steps" | "Distance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never


export type SBEvent = Tables<'Events'>;
export type SBTeamStats = Tables<'TeamStats'>;
export type SBTeam = Tables<'Teams'>;