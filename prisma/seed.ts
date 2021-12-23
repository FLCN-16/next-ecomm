import prisma from '../lib/prisma';


async function seedUserRoleCaps() {
  let userRoleCaps = [
    {
      name: 'Access Admin',
      slug: 'access_admin',
      desc: 'Can access Admin Panel',
    },
    {
      name: 'Create User',
      slug: 'create_user',
      desc: 'Can Create User',
    },
    {
      name: 'Create Role',
      slug: 'create_role',
      desc: 'Can Create Role',
    },
  ];

  for ( let userRoleCap of userRoleCaps ) {
    await prisma.roleCapability.create({ data: userRoleCap });
  }
}

async function seedUserRoles() {
  let userRoles = [
    {
      name: 'Admin',
      slug: 'admin',
      desc: 'Administrator',
      capabilities: [
        'access_admin',
        'create_user',
        'create_role'
      ]
    },
    {
      name: 'Manager',
      slug: 'manager',
      desc: 'Shop Manager',
      capabilities: [
        'access_admin',
        'create_user'
      ]
    },
    {
      name: 'Customer',
      slug: 'customer',
      desc: 'Customer',
      capabilities: []
    }
  ];

  for ( let userRole of userRoles ) {
    await prisma.userRole.create({
      data: {
        ...userRole,
        capabilities: {
          create: userRole.capabilities.map(capability => ({
            assignedAt: new Date(),
            capability: {
              connect: { slug: capability },
            },
          }))
        }
      }
    });
  }
}

async function seedUsers() {
  let users = [
    {
      username: 'admin',
      email: 'admin@email.com',
      password: 'admin',
      verified: true,
      user_role: {
        connect: { slug: 'admin' },
      },
    }
  ];

  for ( let user of users ) {
    await prisma.user.create({ data: user });
  }
}

async function main() {
  await seedUserRoleCaps();
  await seedUserRoles();
  await seedUsers();
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect()
})