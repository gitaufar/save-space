import { supabase } from '../../core/utils/SupabaseClient';

export class SupabaseDataSource {
  // ==== SPACES ====
  async createSpace(data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
  }) {
    const insertPayload: any = { ...data };
    const { data: insertedRows, error } = await supabase
      .from('spaces')
      .insert([insertPayload], { returning: 'representation' as any });

    if (error) throw error;
    const space = (insertedRows as any[])?.[0];

    // Set current user's app_users.space_id to this space id
    const authUser = supabase.auth.user();
    if (authUser?.id && space?.id) {
      const { error: linkErr } = await supabase
        .from('app_users')
        .update({ space_id: space.id })
        .eq('id', authUser.id);
      if (linkErr) throw linkErr;
    }

    return space;
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

  async joinSpaceByInvitationCode(userId: string, code: string) {
    // cari space berdasarkan ID (bukan invitation_code)
    const { data: space, error: spaceError } = await supabase
      .from('spaces')
      .select('id')
      .eq('id', code)
      .single();

    if (spaceError) throw spaceError;
    if (!space) throw new Error('Space not found');

    // update user dengan space_id
    const { data: user, error: userError } = await supabase
      .from('app_users')
      .update({ space_id: space.id })
      .eq('id', userId)
      .select()
      .single();

    if (userError) throw userError;
    return user;
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

  async uploadAvatar(userId: string, file: File) {
    // kasih nama file unik
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // upload ke bucket "avatars"
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false, // kalau true, bisa overwrite file dengan nama sama
      });

    if (error) throw error;

    // ambil public url
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

    if (!data || !data.publicURL) {
      throw new Error('Failed to get public URL for avatar.');
    }

    return data.publicURL; // ini bisa disimpan ke tabel users
  }

  async updateUserAvatar(userId: string, file: File) {
    const avatarUrl = await this.uploadAvatar(userId, file);

    const { data, error } = await supabase
      .from('users')
      .update({ avatar_url: avatarUrl }) // tambahin kolom avatar_url di tabel users
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==== MOOD RESPONSES ====
async getMoodResponsesLast7Days(userId: string) {
  const { data, error } = await supabase
    .from('mood_responses')
    .select(
      `
      id,
      employee_id,
      mood,
      response_text,
      created_at
    `
    )
    .eq('employee_id', userId) // filter by user id
    .gte(
      'created_at',
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 hari terakhir
    )
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

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

  async getLatestAIInsightByEmployeeToday(employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // awal hari

    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('employee_id', employeeId)
      .gte('created_at', today.toISOString()) // hanya ambil yg created hari ini
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  // ==== DIVISION_EVALUATION ====
   async getDivisionEvaluationsBySpace(spaceId: string) {
    const { data, error } = await supabase
      .from('division_evaluasion')
      .select('*')
      .eq('space_id', spaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createDivisionEvaluation(data: {
    space_id: string;
    evaluation_text: string;
  }) {
    const { data: result, error } = await supabase
      .from('division_evaluasion')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  // === CBI TEST ===
    async getCBITestByEmployee(employeeId: string) {
    const { data, error } = await supabase
      .from('cbitest')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false }) // biar urut dari terbaru
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  }

  async markCBITestAsFinished(id: string) {
    const { data, error } = await supabase
      .from('cbitest')
      .update({ finished: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
