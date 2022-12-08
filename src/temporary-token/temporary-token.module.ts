import { CacheModule, Module } from '@nestjs/common';
import { TemporaryTokenService } from './temporary-token.service';

@Module({
  imports: [CacheModule.register()],
  providers: [TemporaryTokenService],
  exports: [TemporaryTokenService],
})
export class TemporaryTokenModule {}
