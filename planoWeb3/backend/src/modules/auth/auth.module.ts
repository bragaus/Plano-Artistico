import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, AuthModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET não definido no .env');
        }

        const expiresIn =
          config.get<StringValue>('JWT_EXPIRES_IN') ?? ('1h' as StringValue);

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
})
export class AuthModule {}
