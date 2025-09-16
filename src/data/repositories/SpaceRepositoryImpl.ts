// repositories/SpaceRepositoryImpl.ts
import { Space } from "../../domain/entities/Space";
import { User } from "../../domain/entities/User";
import { SpaceRepository } from "../../domain/repositories/SpaceRepository";

export class SpaceRepositoryImpl implements SpaceRepository {
  async createSpace(data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
  }): Promise<Space> {
    // Insert the space (request representation explicitly)
    const insertPayload: any = { ...data };
    const { data: insertedRows, error } = await supabase
      .from("spaces")
      .insert([insertPayload], { returning: 'representation' as any });

    if (error) throw error;
    const space = (insertedRows as any[])?.[0] as Space;

    // Link current user to this space (set app_users.space_id = space.id)
    const authUser = supabase.auth.user();
    if (authUser?.id && space?.id) {
      const { error: linkErr } = await supabase
        .from("app_users")
        .update({ space_id: space.id })
        .eq("id", authUser.id);
      if (linkErr) throw linkErr;
    }

    return space;
  }

  async getSpaces(): Promise<Space[]> {
    const { data, error } = await supabase.from("spaces").select("*");
    if (error) throw error;
    return data as Space[];
  }

  async getSpaceById(id: string): Promise<Space | null> {
    const { data, error } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Space | null;
  }

  async updateSpace(id: string, updates: Partial<Space>): Promise<Space> {
    const { data, error } = await supabase
      .from("spaces")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Space;
  }

  async deleteSpace(id: string): Promise<boolean> {
    const { error } = await supabase.from("spaces").delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  async joinSpaceByInvitationCode(userId: string, code: string): Promise<User> {
    // Cari space berdasarkan ID (bukan invitation_code)
    const { data: space, error: spaceError } = await supabase
      .from("spaces")
      .select("id")
      .eq("id", code)
      .single();

    if (spaceError) throw spaceError;
    if (!space) throw new Error("Space not found");

    // update user dengan space_id
    const { data: user, error: userError } = await supabase
      .from("app_users")
      .update({ space_id: space.id })
      .eq("id", userId)
      .select()
      .single();

    if (userError) throw userError;
    return user as User;
  }
}
