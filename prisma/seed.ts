import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma: PrismaClient = new PrismaClient()

async function seedUserRoleCaps() {
  const userRoleCaps = [
    {
      name: "Access Admin",
      slug: "access_admin",
      desc: "Can access Admin Panel",
    },
    {
      name: "Create User",
      slug: "create_user",
      desc: "Can Create User",
    },
    {
      name: "Create Role",
      slug: "create_role",
      desc: "Can Create Role",
    },
    {
      name: "Manage Categories",
      slug: "manage_categories",
      desc: "Can Manage Categories",
    },
    {
      name: "Create Category",
      slug: "create_category",
      desc: "Can Create Category",
    },
    {
      name: "Manage Users",
      slug: "manage_users",
      desc: "Can Manage Users",
    },
    {
      name: "Create User",
      slug: "create_user",
      desc: "Can Create User",
    },
    {
      name: "Create Product",
      slug: "create_product",
      desc: "Can Create Product",
    },
    {
      name: "Manage Products",
      slug: "manage_products",
      desc: "Can Manage Products",
    },
    {
      name: "Manage Orders",
      slug: "manage_orders",
      desc: "Can Manage Orders",
    },
    {
      name: "Manage Settings",
      slug: "manage_settings",
      desc: "Can Manage Settings",
    },
    {
      name: "Manage Payment Settings",
      slug: "manage_payment_settings",
      desc: "Can Manage Payment Settings",
    },
  ]

  for (const userRoleCap of userRoleCaps) {
    await prisma.roleCapability.create({ data: userRoleCap })
  }
}

async function seedUserRoles() {
  const userRoles = [
    {
      name: "Admin",
      slug: "admin",
      desc: "Administrator",
      capabilities: [
        "access_admin",
        "create_user",
        "create_role",
        "manage_categories",
        "create_category",
        "manage_products",
        "create_product",
        "manage_orders",
        "manage_users",
        "create_user",
        "issue_refunds",
        "manage_settings",
        "manage_payment_settings",
      ],
    },
    {
      name: "Manager",
      slug: "manager",
      desc: "Shop Manager",
      capabilities: ["access_admin", "create_user"],
    },
    {
      name: "Customer",
      slug: "customer",
      desc: "Customer",
      capabilities: [],
    },
  ]

  for (const userRole of userRoles) {
    await prisma.userRole.create({
      data: {
        ...userRole,
        capabilities: {
          create: userRole.capabilities.map((capability) => ({
            assignedAt: new Date(),
            capability: {
              connect: { slug: capability },
            },
          })),
        },
      },
    })
  }
}

async function seedUsers() {
  const password = await bcrypt.hash("admin", 10)

  const users = [
    {
      username: "admin",
      email: "admin@email.com",
      password,
      verified: true,
      user_role: {
        connect: { slug: "admin" },
      },
    },
  ]

  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

async function main() {
  await seedUserRoleCaps()
  await seedUserRoles()
  await seedUsers()
}

main()
  .catch((e) => {
    console.log(e)
    // process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect()
  })
