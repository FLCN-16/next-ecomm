import { objectType, stringArg, extendType } from "nexus"
import prisma from "nexus-prisma"

export const Product = objectType({
  name: prisma.Product.$name,
  description: prisma.Product.$description,
  definition(t) {
    t.field(prisma.Product.ID)
    t.field(prisma.Product.title)
    t.field(prisma.Product.slug)
    t.field(prisma.Product.description)
    t.list.field("categories", {
      type: Category,
      resolve: async (root, args, ctx) => {
        if (!root.ID) return []

        return ctx.prisma.product
          .findUnique({
            where: { ID: root.ID },
          })
          .categories()
      },
    })
    t.field(prisma.Product.createdAt)
    t.field(prisma.Product.updatedAt)
  },
})

export const Category = objectType({
  name: prisma.Category.$name,
  description: prisma.Category.$description,
  definition(t) {
    t.field(prisma.Category.ID)
    t.field(prisma.Category.title)
    t.field(prisma.Category.slug)
    t.field(prisma.Category.description)
    t.list.field("products", {
      type: Product,
    })
    t.field(prisma.Category.createdAt)
    t.field(prisma.Category.updatedAt)
  },
})

export const ProductQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("product", {
      type: Product,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        return ctx.prisma.product.findUnique({
          where: { ID: args.ID },
        })
      },
    })
    t.list.field("products", {
      type: Product,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.product.findMany()
      },
    })
  },
})

export const CategoryQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("category", {
      type: Category,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        return ctx.prisma.category.findUnique({
          where: { ID: args.ID },
        })
      },
    })
    t.list.field("categories", {
      type: Category,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.category.findMany()
      },
    })
  },
})
