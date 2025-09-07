import { User } from '../../entities/User';
import { AuthRepository } from '../../repositories/AuthRepository';

export class LoginUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    try {
      return await this.repo.signIn(email, password);
    } catch (err: any) {
      if (err.message.includes('Invalid login credentials')) {
        throw new Error('Email atau password salah');
      }
      throw err;
    }
  }
}
