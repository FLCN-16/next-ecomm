import {
  objectType,
  stringArg,
  nonNull,
  extendType,
  booleanArg,
  intArg,
  list,
} from "nexus"
import { Prisma } from "@prisma/client"
import { ProductType } from "./Product"
import type { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"

export const UserType = objectType({
  name: "User",
  description: "User",
  definition(t) {
    t.string("ID")
    t.string("firstName")
    t.string("lastName")
    t.string("username")
    t.string("email")
    t.boolean("verified")
    t.string("role")
    t.nonNull.list.nonNull.field("capabilities", {
      type: CapabilityType,
      resolve: async (root, args, ctx) => {
        if (!root.role) return []

        const capabilities = await ctx.prisma.userRole
          .findUnique({
            where: { slug: root.role },
          })
          .capabilities({ select: { capability: true } })

        return capabilities.map((cap: any) => cap.capability)
      },
    })
    t.nonNull.list.nonNull.field("products", {
      type: ProductType,
      args: {
        page: nonNull(intArg({ default: 1 })),
        limit: nonNull(intArg({ default: 10 })),
      },
      resolve: async (root, args, ctx) => {
        if (!root.ID) return []

        return ctx.prisma.product.findMany({
          where: { authorId: root.ID },
          skip: args.limit * (args.page - 1),
          take: args.limit,
        })
      },
    })
    t.field("createdAt", { type: "DateTime" })
    t.field("updatedAt", { type: "DateTime" })
  },
})

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: UserType,
      args: {
        search: nonNull(stringArg()),
        verified: booleanArg(),
        roles: list(stringArg({ description: "Roles to filter by" })),
        page: nonNull(intArg({ default: 1 })),
        limit: nonNull(intArg({ default: 10 })),
      },
      resolve: async (root, args, ctx) => {
        const where: Prisma.UserWhereInput = {}

        if (args.roles?.length) {
          where.role = {
            in: args.roles as string[],
          }
        }

        if (typeof args.verified === "boolean") {
          where.verified = args.verified
        }

        return ctx.prisma.user.findMany({
          where,
          skip: args.limit * (args.page - 1),
          take: args.limit,
        })
      },
    })
  },
})

export const CapabilityType = objectType({
  name: "Capability",
  description: "Capability of a user role",
  definition(t) {
    t.string("ID")
    t.string("name")
    t.string("slug")
  },
})

export const UserRoleType = objectType({
  name: "UserRole",
  description: "User role",
  definition(t) {
    t.string("slug")
    t.string("name")
    t.string("desc")
    t.list.field("capabilities", {
      type: CapabilityType,
    })
    t.field("createdAt", { type: "DateTime" })
    t.field("updatedAt", { type: "DateTime" })
  },
})

export const Query = extendType({
  type: "Query",
  definition(t) {
    // Query for a user by token
    t.field("me", {
      type: UserType,
      resolve: async (root, args, ctx) => ctx.user,
    })
    // Query User
    t.field("user", {
      type: UserType,
      args: {
        ID: nonNull(stringArg()),
      },
      resolve: async (root, args, ctx) => {
        if (!args.ID) return null

        const user = await ctx.prisma.user.findUnique({
          where: { ID: args.ID },
        })
        if (!user) return null

        return user
      },
    })
    // Query User Roles
    t.list.field("roles", {
      type: UserRoleType,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.userRole.findMany()
      },
    })
    // Query Capabilities
    t.list.field("capabilities", {
      type: CapabilityType,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.roleCapability.findMany()
      },
    })
  },
})
