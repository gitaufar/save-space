export interface Space {
  id: string;
  name: string | null;
  division: string | null;
  job_desc: string | null;
  work_hours: string | null;
  work_culture: string | null;
  created_at: Date;
  updated_at: Date;
}
