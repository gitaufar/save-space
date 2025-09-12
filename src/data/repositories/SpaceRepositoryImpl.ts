// repositories/SpaceRepositoryImpl.ts

import { supabase } from "../../core/utils/SupabaseClient";
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
    invitation_code: string;
  }): Promise<Space> {
    const { data: result, error } = await supabase
      .from("spaces")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result as Space;
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
    // cari space berdasarkan invitation_code
    const { data: space, error: spaceError } = await supabase
      .from("spaces")
      .select("id")
      .eq("invitation_code", code)
      .single();

    if (spaceError) throw spaceError;
    if (!space) throw new Error("Space not found");

    // update user dengan space_id
    const { data: user, error: userError } = await supabase
      .from("users")
      .update({ space_id: space.id })
      .eq("id", userId)
      .select()
      .single();

    if (userError) throw userError;
    return user as User;
  }
}
