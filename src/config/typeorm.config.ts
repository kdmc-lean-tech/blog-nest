import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'kokoaWIZNETw51001945-',
    database: 'blog',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}
