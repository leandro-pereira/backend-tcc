import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}
  
    public getValue(key: string, throwOnMissing = true): string {
      const value = this.env[key];
      if (!value && throwOnMissing) { 
        throw new Error(`config error - missing env.${key}`);
      }
  
      return value;
    }
  
    public ensureValues(keys: string[]) {
      keys.forEach(k => this.getValue(k, true));
      return this;
    }
  


  
    public getTypeOrmConfig(): TypeOrmModuleOptions {
      return {
        type: 'mysql',
        host: this.getValue('HOST'),
        port: +this.getValue('PORT'),
        username: this.getValue('USER'),
        password: this.getValue('PASSWORD'),
        database: this.getValue('DATABASE'),
        synchronize: true,
        entities: [
          User
        ],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
      };
    }
  }
  
  const configService = new ConfigService(process.env).ensureValues([
    'HOST',
    'PORT',
    'USER',
    'PASSWORD',
    'DATABASE'
  ]);
  
  export { configService };