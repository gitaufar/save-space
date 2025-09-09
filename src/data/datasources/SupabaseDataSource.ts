import { supabase } from '../../core/utils/SupabaseClient';

export class SupabaseDataSource {
  // ==== SPACES ====
  async createSpace(data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
    invitation_code: string;
  }) {
    const { data: result, error } = await supabase
      .from('spaces')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getSpaces() {
    const { data, error } = await supabase.from('spaces').select('*');
    if (error) throw error;
    return data;
  }

  async getSpaceById(id: string) {
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async updateSpace(id: string, updates: Record<string, any>) {
    const { data, error } = await supabase
      .from('spaces')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteSpace(id: string) {
    const { error } = await supabase.from('spaces').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // ==== USERS ====
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: 'HRD' | 'Karyawan';
    space_id?: string;
  }) {
    const { data: result, error } = await supabase
      .from('users')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getUsersBySpace(spaceId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('space_id', spaceId);
    if (error) throw error;
    return data;
  }

  async updateUser(id: string, updates: Record<string, any>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteUser(id: string) {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // ==== MOOD RESPONSES ====
  async addMoodResponse(data: {
    employee_id: string;
    question_id?: string;
    mood: string;
    response_text?: string;
  }) {
    const { data: result, error } = await supabase
      .from('mood_responses')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getLatestMoodResponsesBySpace(spaceId: string) {
    const { data, error } = await supabase
      .from('mood_responses')
      .select(
        `
      id,
      employee_id,
      mood,
      response_text,
      created_at,
      users!inner (
        id,
        name,
        email,
        space_id
      )
    `,
      )
      .eq('users.space_id', spaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const latestByEmployee: Record<string, any> = {};
    data?.forEach(item => {
      if (!latestByEmployee[item.employee_id]) {
        latestByEmployee[item.employee_id] = item;
      }
    });

    return Object.values(latestByEmployee);
  }

  // ==== AI INSIGHTS ====
  async createAIInsight(data: {
    employee_id: string;
    insight_text: string;
    mood_summary?: string;
  }) {
    const { data: result, error } = await supabase
      .from('ai_insights')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getAIInsightsByEmployee(employeeId: string) {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getAIInsightById(id: string) {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateAIInsight(
    id: string,
    updates: Partial<{ insight_text: string; mood_summary: string }>,
  ) {
    const { data, error } = await supabase
      .from('ai_insights')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteAIInsight(id: string) {
    const { error } = await supabase.from('ai_insights').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  
  async getLatestAIInsightByEmployee(employeeId: string) {
  const { data, error } = await supabase
    .from("ai_insights")
    .select("*")
    .eq("employee_id", employeeId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

}
