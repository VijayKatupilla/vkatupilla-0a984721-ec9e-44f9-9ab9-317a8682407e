import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './src/entities/user.entity';
import { Role } from './src/entities/role.entity';
import { Organization } from './src/entities/organization.entity';
import { Task } from './src/entities/task.entity';


async function run() {
  const ds = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Role, Organization, Task],
    synchronize: true,
  });

  await ds.initialize();

  const users = await ds.getRepository(User).find({
    select: { id: true, email: true, passwordHash: true },
  });

  console.log(users);
  await ds.destroy();
}

run().catch(console.error);
