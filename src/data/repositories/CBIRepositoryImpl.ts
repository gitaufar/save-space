// repositories/CBIRepositoryImpl.ts

import { SupabaseDataSource } from "../datasources/SupabaseDataSource";
import { CBIRepository, CBITest } from "../../domain/repositories/CBIRepository";

export class CBIRepositoryImpl implements CBIRepository {
  private supabaseDataSource: SupabaseDataSource;

  constructor() {
    this.supabaseDataSource = new SupabaseDataSource();
  }

  async createCBITestForSpace(spaceId: string): Promise<CBITest[]> {
    try {
      const result = await this.supabaseDataSource.createCBITestForSpace(spaceId);
      return result || [];
    } catch (error) {
      console.error('Error creating CBI test for space:', error);
      throw error;
    }
  }

  async getCBITestByEmployeeId(employeeId: string): Promise<CBITest | null> {
    try {
      // This method would need to be implemented in SupabaseDataSource if needed
      // For now, returning null as a placeholder
      return null;
    } catch (error) {
      console.error('Error getting CBI test by employee ID:', error);
      throw error;
    }
  }

  async updateCBITest(testId: string, updates: Partial<CBITest>): Promise<CBITest> {
    try {
      // This method would need to be implemented in SupabaseDataSource if needed
      // For now, throwing an error as a placeholder
      throw new Error('updateCBITest not implemented yet');
    } catch (error) {
      console.error('Error updating CBI test:', error);
      throw error;
    }
  }
}