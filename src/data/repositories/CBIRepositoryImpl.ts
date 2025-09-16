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
      const result = await this.supabaseDataSource.getCBITestByEmployee(employeeId);
      return result;
    } catch (error) {
      console.error('Error getting CBI test by employee ID:', error);
      return null; // Return null if not found instead of throwing
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

  async markCBITestAsFinished(id: string, personalBurnout: number, workBurnout: number, clientBurnout: number): Promise<CBITest> {
    try {
      const result = await this.supabaseDataSource.markCBITestAsFinished(id, clientBurnout, personalBurnout, workBurnout);
      return result;
    } catch (error) {
      console.error('Error marking CBI test as finished:', error);
      throw error;
    }
  }
}