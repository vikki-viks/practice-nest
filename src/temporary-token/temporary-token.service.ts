import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Cache } from 'cache-manager';

@Injectable()
export class TemporaryTokenService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async issue(userId: number) {
    const token = randomUUID();
    await this.cacheManager.set(token, userId, 100000);
    return token;
  }

  async validate(token: string) {
    const userId = await this.cacheManager.get(token);
    if (!userId) {
      throw new Error();
    }
    return userId;
  }
}
