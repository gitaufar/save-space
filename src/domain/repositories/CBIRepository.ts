// repositories/CBIRepository.ts
export interface CBITest {
  id?: string;
  employee_id: string;
  personal_burnout: number;
  work_burnout: number;
  client_burnout: number;
  summary: number;
  finished: boolean;
  created_at: string;
}

export interface CBIRepository {
  createCBITestForSpace(spaceId: string): Promise<CBITest[]>;
  
  getCBITestByEmployeeId(employeeId: string): Promise<CBITest | null>;
  
  updateCBITest(testId: string, updates: Partial<CBITest>): Promise<CBITest>;
}