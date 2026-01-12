import { DataSource } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

const ds = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Organization, Role, User],
  synchronize: true,
});

async function seed() {
  await ds.initialize();

  const orgRepo = ds.getRepository(Organization);
  const roleRepo = ds.getRepository(Role);
  const userRepo = ds.getRepository(User);

  // Roles
  const ownerRole = await roleRepo.save({ name: 'OWNER' });
  const adminRole = await roleRepo.save({ name: 'ADMIN' });
  const viewerRole = await roleRepo.save({ name: 'VIEWER' });

  // Organization
  const org = await orgRepo.save({ name: 'TurboVets' });

  // Users
  await userRepo.save({
    email: 'owner@turbovets.com',
    password: '123',
    role: ownerRole,
    organization: org,
  });

  await userRepo.save({
    email: 'admin@turbovets.com',
    password: '123',
    role: adminRole,
    organization: org,
  });

  await userRepo.save({
    email: 'viewer@turbovets.com',
    password: '123',
    role: viewerRole,
    organization: org,
  });

  await ds.destroy();
  console.log('✅ Seed completed');
}

seed();
