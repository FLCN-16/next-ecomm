import { objectType, stringArg, nonNull, extendType } from "nexus"
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
    t.dateTime("createdAt")
    t.dateTime("updatedAt")
    t.nonNull.list.nonNull.field("capabilities", {
      type: CapabilityType,
      resolve: async (root, args, ctx) => {
        if (!root.role) return []

        const capabilities = await ctx.prisma.userRole
          .findUnique({
            where: { slug: "admin" },
          })
          .capabilities({ select: { capability: true } })

        return capabilities.map((cap: any) => cap.capability)
      },
    })
  },
})

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: UserType,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.user.findMany({
          where: {
            username: "admin",
          },
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

export const CapabilitiesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("capabilities", {
      type: CapabilityType,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.roleCapability.findMany()
      },
    })
  },
})

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
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
  },
})

export const MeQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("me", {
      type: UserType,
      args: {
        token: nonNull(stringArg()),
      },
      resolve: async (root, args, ctx) => {
        if (!args.token) return null

        let tokenDecoded: JwtPayload
        try {
          tokenDecoded = jwt.verify(args.token, process.env.JWT_SECRET!) as JwtPayload
          if (!tokenDecoded) return null
        } catch (error) {
          return null
        }

        if (!tokenDecoded?.ID) return null

        const user = await ctx.prisma.user.findUnique({
          where: { ID: tokenDecoded.ID },
        })
        if (!user) return null

        return user
      },
    })
  },
})
