export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  role?: "HRD" | "Karyawan";
  created_at?: string;
  updated_at?: string;
  space_id?: string | null;
  burnout_score?: number | null;
}
