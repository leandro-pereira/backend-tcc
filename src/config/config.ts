import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Publication } from 'src/publication/entities/publication.entity';

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
        host: this.getValue('DBHOST'),
        port: +this.getValue('DBPORT'),
        username: this.getValue('DBUSER'),
        password: this.getValue('DBPASSWORD'),
        database: this.getValue('DBDATABASE'),
        synchronize: true,
        entities: [
          User,
          Publication
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
    'DBHOST',
    'DBPORT',
    'DBUSER',
    'DBPASSWORD',
    'DBDATABASE'
  ]);
  
  export { configService };