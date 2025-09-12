export interface User {
  id: string;
  name?: string;
  email: string;
  role?: "Manager" | "Karyawan";
  created_at?: string;
  updated_at?: string;
  space_id?: string | null;
  burnout_score?: number | null;
  avatar_url?: string | null;
}
