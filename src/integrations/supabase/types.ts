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
      campus_pulse_feed: {
        Row: {
          content_id: string | null
          content_type: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_viewed: boolean
          priority: number
          title: string
          user_id: string
        }
        Insert: {
          content_id?: string | null
          content_type: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_viewed?: boolean
          priority?: number
          title: string
          user_id: string
        }
        Update: {
          content_id?: string | null
          content_type?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_viewed?: boolean
          priority?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      college_admins: {
        Row: {
          admin_user_id: string | null
          college_id: string | null
          created_at: string | null
          id: string
          permissions: Json | null
          role: string
          updated_at: string | null
        }
        Insert: {
          admin_user_id?: string | null
          college_id?: string | null
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          admin_user_id?: string | null
          college_id?: string | null
          created_at?: string | null
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "college_admins_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_admins_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      college_statistics: {
        Row: {
          average_rating: number | null
          college_id: string | null
          id: string
          last_updated: string | null
          monthly_revenue: number | null
          total_active_users: number | null
          total_listings: number | null
          total_transactions: number | null
        }
        Insert: {
          average_rating?: number | null
          college_id?: string | null
          id?: string
          last_updated?: string | null
          monthly_revenue?: number | null
          total_active_users?: number | null
          total_listings?: number | null
          total_transactions?: number | null
        }
        Update: {
          average_rating?: number | null
          college_id?: string | null
          id?: string
          last_updated?: string | null
          monthly_revenue?: number | null
          total_active_users?: number | null
          total_listings?: number | null
          total_transactions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "college_statistics_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: true
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          address: string | null
          admin_contact_email: string | null
          admin_contact_phone: string | null
          city: string | null
          college_code: string | null
          college_name: string
          college_type: string | null
          created_at: string | null
          district: string | null
          establishment_year: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          state: string | null
          total_students: number | null
          university_affiliation: string | null
          verification_status: string | null
        }
        Insert: {
          address?: string | null
          admin_contact_email?: string | null
          admin_contact_phone?: string | null
          city?: string | null
          college_code?: string | null
          college_name: string
          college_type?: string | null
          created_at?: string | null
          district?: string | null
          establishment_year?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          state?: string | null
          total_students?: number | null
          university_affiliation?: string | null
          verification_status?: string | null
        }
        Update: {
          address?: string | null
          admin_contact_email?: string | null
          admin_contact_phone?: string | null
          city?: string | null
          college_code?: string | null
          college_name?: string
          college_type?: string | null
          created_at?: string | null
          district?: string | null
          establishment_year?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          state?: string | null
          total_students?: number | null
          university_affiliation?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      disputes: {
        Row: {
          admin_notes: string | null
          booking_id: string
          created_at: string | null
          dispute_reason: string
          evidence_text: string | null
          evidence_urls: string[] | null
          id: string
          initiator_id: string
          other_party_id: string
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["dispute_status"] | null
        }
        Insert: {
          admin_notes?: string | null
          booking_id: string
          created_at?: string | null
          dispute_reason: string
          evidence_text?: string | null
          evidence_urls?: string[] | null
          id?: string
          initiator_id: string
          other_party_id: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
        }
        Update: {
          admin_notes?: string | null
          booking_id?: string
          created_at?: string | null
          dispute_reason?: string
          evidence_text?: string | null
          evidence_urls?: string[] | null
          id?: string
          initiator_id?: string
          other_party_id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "rental_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_initiator_id_fkey"
            columns: ["initiator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_other_party_id_fkey"
            columns: ["other_party_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_transactions: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          dispute_id: string | null
          escrow_status: string | null
          id: string
          payment_id: string | null
          platform_fee: number
          release_scheduled_at: string | null
          released_at: string | null
          updated_at: string | null
          vendor_amount: number
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          dispute_id?: string | null
          escrow_status?: string | null
          id?: string
          payment_id?: string | null
          platform_fee: number
          release_scheduled_at?: string | null
          released_at?: string | null
          updated_at?: string | null
          vendor_amount: number
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          dispute_id?: string | null
          escrow_status?: string | null
          id?: string
          payment_id?: string | null
          platform_fee?: number
          release_scheduled_at?: string | null
          released_at?: string | null
          updated_at?: string | null
          vendor_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "escrow_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "rental_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_transactions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      group_rental_participants: {
        Row: {
          created_at: string
          group_rental_id: string
          id: string
          participant_id: string
          payment_status: string
        }
        Insert: {
          created_at?: string
          group_rental_id: string
          id?: string
          participant_id: string
          payment_status?: string
        }
        Update: {
          created_at?: string
          group_rental_id?: string
          id?: string
          participant_id?: string
          payment_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_rental_participants_group_rental_id_fkey"
            columns: ["group_rental_id"]
            isOneToOne: false
            referencedRelation: "group_rentals"
            referencedColumns: ["id"]
          },
        ]
      }
      group_rentals: {
        Row: {
          cost_per_person: number
          created_at: string
          description: string | null
          end_date: string
          id: string
          item_id: string | null
          max_participants: number
          organizer_id: string
          start_date: string
          status: string
          title: string
        }
        Insert: {
          cost_per_person: number
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          item_id?: string | null
          max_participants: number
          organizer_id: string
          start_date: string
          status?: string
          title: string
        }
        Update: {
          cost_per_person?: number
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          item_id?: string | null
          max_participants?: number
          organizer_id?: string
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_rentals_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "rental_items"
            referencedColumns: ["id"]
          },
        ]
      }
      item_requests: {
        Row: {
          category: Database["public"]["Enums"]["item_category"] | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_fulfilled: boolean | null
          item_name: string
          max_price_per_day: number | null
          needed_from: string | null
          needed_until: string | null
          requester_id: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["item_category"] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_fulfilled?: boolean | null
          item_name: string
          max_price_per_day?: number | null
          needed_from?: string | null
          needed_until?: string | null
          requester_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["item_category"] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_fulfilled?: boolean | null
          item_name?: string
          max_price_per_day?: number | null
          needed_from?: string | null
          needed_until?: string | null
          requester_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message_text: string
          recipient_id: string
          sender_id: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_text: string
          recipient_id: string
          sender_id: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_text?: string
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "rental_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_data: Json | null
          action_url: string | null
          created_at: string | null
          delivery_method: string[] | null
          expires_at: string | null
          id: string
          message: string
          notification_type: string
          priority: string | null
          read_at: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          scheduled_for: string | null
          sent_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_data?: Json | null
          action_url?: string | null
          created_at?: string | null
          delivery_method?: string[] | null
          expires_at?: string | null
          id?: string
          message: string
          notification_type: string
          priority?: string | null
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_data?: Json | null
          action_url?: string | null
          created_at?: string | null
          delivery_method?: string[] | null
          expires_at?: string | null
          id?: string
          message?: string
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          currency: string | null
          failure_reason: string | null
          gateway_response: Json | null
          gateway_transaction_id: string | null
          id: string
          payer_id: string
          payment_gateway: string | null
          payment_method: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          payment_type: string | null
          processed_at: string | null
          refund_amount: number | null
          refunded_at: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          payer_id: string
          payment_gateway?: string | null
          payment_method: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_type?: string | null
          processed_at?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          currency?: string | null
          failure_reason?: string | null
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          payer_id?: string
          payment_gateway?: string | null
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_type?: string | null
          processed_at?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "rental_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string | null
          bio: string | null
          campus_credits: number | null
          campus_verified: boolean | null
          college_id: string | null
          course: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string | null
          gender: string | null
          hostel_block: string | null
          id: string
          karma_score: number | null
          last_active_at: string | null
          notification_preferences: Json | null
          phone_number: string | null
          preferred_language: string | null
          profile_image_url: string | null
          referral_code: string | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"]
          room_number: string | null
          social_links: Json | null
          student_id: string | null
          successful_rentals: number | null
          trust_level: string | null
          trust_score: number | null
          updated_at: string | null
          verification_documents: Json | null
          year_of_study: number | null
        }
        Insert: {
          account_status?: string | null
          bio?: string | null
          campus_credits?: number | null
          campus_verified?: boolean | null
          college_id?: string | null
          course?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name?: string | null
          gender?: string | null
          hostel_block?: string | null
          id: string
          karma_score?: number | null
          last_active_at?: string | null
          notification_preferences?: Json | null
          phone_number?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          room_number?: string | null
          social_links?: Json | null
          student_id?: string | null
          successful_rentals?: number | null
          trust_level?: string | null
          trust_score?: number | null
          updated_at?: string | null
          verification_documents?: Json | null
          year_of_study?: number | null
        }
        Update: {
          account_status?: string | null
          bio?: string | null
          campus_credits?: number | null
          campus_verified?: boolean | null
          college_id?: string | null
          course?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string | null
          gender?: string | null
          hostel_block?: string | null
          id?: string
          karma_score?: number | null
          last_active_at?: string | null
          notification_preferences?: Json | null
          phone_number?: string | null
          preferred_language?: string | null
          profile_image_url?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          room_number?: string | null
          social_links?: Json | null
          student_id?: string | null
          successful_rentals?: number | null
          trust_level?: string | null
          trust_score?: number | null
          updated_at?: string | null
          verification_documents?: Json | null
          year_of_study?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_bookings: {
        Row: {
          auto_extend_enabled: boolean | null
          booking_notes: string | null
          cancelled_by: string | null
          cancelled_reason: string | null
          created_at: string | null
          damage_charges: number | null
          damage_report: string | null
          deposit_amount: number | null
          discount_amount: number | null
          dropoff_location: string | null
          dropoff_time: string | null
          end_date: string
          extension_approved: boolean | null
          extension_requested: boolean | null
          id: string
          item_id: string
          item_received_at: string | null
          item_returned_at: string | null
          late_fee: number | null
          lister_id: string
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          pickup_location: string | null
          pickup_photos: string[] | null
          pickup_time: string | null
          platform_fee: number | null
          refund_amount: number | null
          reminder_sent_at: string | null
          rental_agreement_accepted: boolean | null
          rental_agreement_accepted_at: string | null
          renter_id: string
          return_photos: string[] | null
          start_date: string
          status: Database["public"]["Enums"]["rental_status"] | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          auto_extend_enabled?: boolean | null
          booking_notes?: string | null
          cancelled_by?: string | null
          cancelled_reason?: string | null
          created_at?: string | null
          damage_charges?: number | null
          damage_report?: string | null
          deposit_amount?: number | null
          discount_amount?: number | null
          dropoff_location?: string | null
          dropoff_time?: string | null
          end_date: string
          extension_approved?: boolean | null
          extension_requested?: boolean | null
          id?: string
          item_id: string
          item_received_at?: string | null
          item_returned_at?: string | null
          late_fee?: number | null
          lister_id: string
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          pickup_location?: string | null
          pickup_photos?: string[] | null
          pickup_time?: string | null
          platform_fee?: number | null
          refund_amount?: number | null
          reminder_sent_at?: string | null
          rental_agreement_accepted?: boolean | null
          rental_agreement_accepted_at?: string | null
          renter_id: string
          return_photos?: string[] | null
          start_date: string
          status?: Database["public"]["Enums"]["rental_status"] | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          auto_extend_enabled?: boolean | null
          booking_notes?: string | null
          cancelled_by?: string | null
          cancelled_reason?: string | null
          created_at?: string | null
          damage_charges?: number | null
          damage_report?: string | null
          deposit_amount?: number | null
          discount_amount?: number | null
          dropoff_location?: string | null
          dropoff_time?: string | null
          end_date?: string
          extension_approved?: boolean | null
          extension_requested?: boolean | null
          id?: string
          item_id?: string
          item_received_at?: string | null
          item_returned_at?: string | null
          late_fee?: number | null
          lister_id?: string
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          pickup_location?: string | null
          pickup_photos?: string[] | null
          pickup_time?: string | null
          platform_fee?: number | null
          refund_amount?: number | null
          reminder_sent_at?: string | null
          rental_agreement_accepted?: boolean | null
          rental_agreement_accepted_at?: string | null
          renter_id?: string
          return_photos?: string[] | null
          start_date?: string
          status?: Database["public"]["Enums"]["rental_status"] | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_bookings_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "rental_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_lister_id_fkey"
            columns: ["lister_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_renter_id_fkey"
            columns: ["renter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_items: {
        Row: {
          availability_end_date: string | null
          availability_start_date: string | null
          avg_rating: number | null
          booking_type: Database["public"]["Enums"]["booking_type"] | null
          boost_credits_used: number | null
          brand: string | null
          cancellation_policy: string | null
          category: Database["public"]["Enums"]["item_category"]
          condition: Database["public"]["Enums"]["item_condition"]
          created_at: string | null
          damage_policy: string | null
          deposit_amount: number | null
          description: string | null
          featured_until: string | null
          id: string
          image_urls: string[] | null
          included_accessories: string[] | null
          insurance_covered: boolean | null
          is_active: boolean | null
          is_available: boolean | null
          lister_id: string
          location_details: Json | null
          max_rental_days: number | null
          min_rental_days: number | null
          model: string | null
          original_price: number | null
          pickup_instructions: string | null
          price_per_day: number
          quality_score: number | null
          rental_count: number | null
          safety_verified: boolean | null
          tags: string[] | null
          title: string
          total_earnings: number | null
          total_reviews: number | null
          updated_at: string | null
          usage_guidelines: string | null
          video_url: string | null
          view_count: number | null
          year_purchased: number | null
        }
        Insert: {
          availability_end_date?: string | null
          availability_start_date?: string | null
          avg_rating?: number | null
          booking_type?: Database["public"]["Enums"]["booking_type"] | null
          boost_credits_used?: number | null
          brand?: string | null
          cancellation_policy?: string | null
          category: Database["public"]["Enums"]["item_category"]
          condition: Database["public"]["Enums"]["item_condition"]
          created_at?: string | null
          damage_policy?: string | null
          deposit_amount?: number | null
          description?: string | null
          featured_until?: string | null
          id?: string
          image_urls?: string[] | null
          included_accessories?: string[] | null
          insurance_covered?: boolean | null
          is_active?: boolean | null
          is_available?: boolean | null
          lister_id: string
          location_details?: Json | null
          max_rental_days?: number | null
          min_rental_days?: number | null
          model?: string | null
          original_price?: number | null
          pickup_instructions?: string | null
          price_per_day: number
          quality_score?: number | null
          rental_count?: number | null
          safety_verified?: boolean | null
          tags?: string[] | null
          title: string
          total_earnings?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          usage_guidelines?: string | null
          video_url?: string | null
          view_count?: number | null
          year_purchased?: number | null
        }
        Update: {
          availability_end_date?: string | null
          availability_start_date?: string | null
          avg_rating?: number | null
          booking_type?: Database["public"]["Enums"]["booking_type"] | null
          boost_credits_used?: number | null
          brand?: string | null
          cancellation_policy?: string | null
          category?: Database["public"]["Enums"]["item_category"]
          condition?: Database["public"]["Enums"]["item_condition"]
          created_at?: string | null
          damage_policy?: string | null
          deposit_amount?: number | null
          description?: string | null
          featured_until?: string | null
          id?: string
          image_urls?: string[] | null
          included_accessories?: string[] | null
          insurance_covered?: boolean | null
          is_active?: boolean | null
          is_available?: boolean | null
          lister_id?: string
          location_details?: Json | null
          max_rental_days?: number | null
          min_rental_days?: number | null
          model?: string | null
          original_price?: number | null
          pickup_instructions?: string | null
          price_per_day?: number
          quality_score?: number | null
          rental_count?: number | null
          safety_verified?: boolean | null
          tags?: string[] | null
          title?: string
          total_earnings?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          usage_guidelines?: string | null
          video_url?: string | null
          view_count?: number | null
          year_purchased?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_items_lister_id_fkey"
            columns: ["lister_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          communication_rating: number | null
          condition_rating: number | null
          created_at: string | null
          delivery_rating: number | null
          helpful_votes: number | null
          id: string
          is_public: boolean | null
          item_care_rating: number | null
          photos: string[] | null
          rating: number | null
          reported_count: number | null
          response_at: string | null
          response_text: string | null
          review_type: string | null
          reviewed_id: string
          reviewer_id: string
          value_rating: number | null
          verified_purchase: boolean | null
        }
        Insert: {
          booking_id: string
          comment?: string | null
          communication_rating?: number | null
          condition_rating?: number | null
          created_at?: string | null
          delivery_rating?: number | null
          helpful_votes?: number | null
          id?: string
          is_public?: boolean | null
          item_care_rating?: number | null
          photos?: string[] | null
          rating?: number | null
          reported_count?: number | null
          response_at?: string | null
          response_text?: string | null
          review_type?: string | null
          reviewed_id: string
          reviewer_id: string
          value_rating?: number | null
          verified_purchase?: boolean | null
        }
        Update: {
          booking_id?: string
          comment?: string | null
          communication_rating?: number | null
          condition_rating?: number | null
          created_at?: string | null
          delivery_rating?: number | null
          helpful_votes?: number | null
          id?: string
          is_public?: boolean | null
          item_care_rating?: number | null
          photos?: string[] | null
          rating?: number | null
          reported_count?: number | null
          response_at?: string | null
          response_text?: string | null
          review_type?: string | null
          reviewed_id?: string
          reviewer_id?: string
          value_rating?: number | null
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "rental_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_id_fkey"
            columns: ["reviewed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string | null
          id: string
          notify_new_listings: boolean | null
          search_criteria: Json
          search_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notify_new_listings?: boolean | null
          search_criteria: Json
          search_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notify_new_listings?: boolean | null
          search_criteria?: Json
          search_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_applications: {
        Row: {
          applicant_id: string | null
          applied_at: string | null
          business_address: string | null
          business_description: string | null
          business_name: string
          business_type: string
          college_id: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          documents_urls: string[] | null
          id: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
        }
        Insert: {
          applicant_id?: string | null
          applied_at?: string | null
          business_address?: string | null
          business_description?: string | null
          business_name: string
          business_type: string
          college_id?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          documents_urls?: string[] | null
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Update: {
          applicant_id?: string | null
          applied_at?: string | null
          business_address?: string | null
          business_description?: string | null
          business_name?: string
          business_type?: string
          college_id?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          documents_urls?: string[] | null
          id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_applications_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "rental_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_platform_fee: {
        Args: { amount: number }
        Returns: number
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_college_statistics: {
        Args: Record<PropertyKey, never> | { college_id_param: string }
        Returns: undefined
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "active"
        | "completed"
        | "cancelled"
        | "disputed"
      booking_type: "instant" | "request"
      dispute_status: "open" | "under_review" | "resolved" | "closed"
      item_category:
        | "textbooks"
        | "reference_books"
        | "competitive_exam_prep"
        | "notes_handwritten_printed"
        | "stationery_supplies"
        | "study_lamps"
        | "whiteboards_easels"
        | "laptop_stands_accessories"
        | "laptops_notebooks"
        | "tablets_ipads"
        | "mobile_phones_accessories"
        | "headphones_earbuds"
        | "speakers_sound_systems"
        | "gaming_consoles_accessories"
        | "cameras_photography_gear"
        | "projectors_screens"
        | "extension_cords_adapters"
        | "room_coolers_fans"
        | "room_heaters"
        | "mattresses_bedding"
        | "furniture_small"
        | "storage_solutions"
        | "iron_box_steamers"
        | "kitchen_appliances_mini"
        | "utensils_cutlery"
        | "room_decor"
        | "ethnic_wear_festive"
        | "formal_wear_interviews"
        | "costumes_theme_party"
        | "jewelry_accessories_fashion"
        | "sports_equipment_indoor"
        | "sports_equipment_outdoor"
        | "fitness_gear_yoga"
        | "musical_instruments"
        | "art_craft_supplies"
        | "books_novels_comics"
        | "board_games_puzzles"
        | "travel_bags_backpacks"
        | "camping_gear_basic"
        | "basic_tool_kit"
        | "musical_event_equipment"
        | "event_specific_items"
        | "electronics"
        | "books"
        | "vehicles"
        | "furniture"
        | "gaming"
        | "other"
      item_condition: "new" | "like_new" | "good" | "fair" | "functional"
      payment_status: "pending" | "paid" | "failed" | "refunded" | "partial"
      rental_category:
        | "electronics"
        | "furniture"
        | "books"
        | "vehicles"
        | "sports"
        | "musical_instruments"
        | "appliances"
        | "fashion"
        | "tools"
        | "gaming"
        | "photography"
        | "study_materials"
        | "camping"
        | "other"
      rental_status:
        | "pending"
        | "confirmed"
        | "active"
        | "completed"
        | "cancelled"
        | "disputed"
      user_role: "student" | "vendor" | "admin"
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
    Enums: {
      booking_status: [
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "disputed",
      ],
      booking_type: ["instant", "request"],
      dispute_status: ["open", "under_review", "resolved", "closed"],
      item_category: [
        "textbooks",
        "reference_books",
        "competitive_exam_prep",
        "notes_handwritten_printed",
        "stationery_supplies",
        "study_lamps",
        "whiteboards_easels",
        "laptop_stands_accessories",
        "laptops_notebooks",
        "tablets_ipads",
        "mobile_phones_accessories",
        "headphones_earbuds",
        "speakers_sound_systems",
        "gaming_consoles_accessories",
        "cameras_photography_gear",
        "projectors_screens",
        "extension_cords_adapters",
        "room_coolers_fans",
        "room_heaters",
        "mattresses_bedding",
        "furniture_small",
        "storage_solutions",
        "iron_box_steamers",
        "kitchen_appliances_mini",
        "utensils_cutlery",
        "room_decor",
        "ethnic_wear_festive",
        "formal_wear_interviews",
        "costumes_theme_party",
        "jewelry_accessories_fashion",
        "sports_equipment_indoor",
        "sports_equipment_outdoor",
        "fitness_gear_yoga",
        "musical_instruments",
        "art_craft_supplies",
        "books_novels_comics",
        "board_games_puzzles",
        "travel_bags_backpacks",
        "camping_gear_basic",
        "basic_tool_kit",
        "musical_event_equipment",
        "event_specific_items",
        "electronics",
        "books",
        "vehicles",
        "furniture",
        "gaming",
        "other",
      ],
      item_condition: ["new", "like_new", "good", "fair", "functional"],
      payment_status: ["pending", "paid", "failed", "refunded", "partial"],
      rental_category: [
        "electronics",
        "furniture",
        "books",
        "vehicles",
        "sports",
        "musical_instruments",
        "appliances",
        "fashion",
        "tools",
        "gaming",
        "photography",
        "study_materials",
        "camping",
        "other",
      ],
      rental_status: [
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "disputed",
      ],
      user_role: ["student", "vendor", "admin"],
    },
  },
} as const
