import { objectType, stringArg, extendType } from "nexus"

export const ProductType = objectType({
  name: "Product",
  description: "Product",
  definition(t) {
    t.string("ID")
    t.string("title")
    t.string("slug")
    t.string("description")
    t.list.field("categories", {
      type: CategoryType,
      resolve: async (root, args, ctx) => {
        if (!root.ID) return []

        return ctx.prisma.product
          .findUnique({
            where: { ID: root.ID },
          })
          .categories()
      },
    })
    t.dateTime("createdAt")
    t.dateTime("updatedAt")
  },
})

export const CategoryType = objectType({
  name: "Category",
  description: "Category of a product",
  definition(t) {
    t.string("ID")
    t.string("title")
    t.string("slug")
    t.string("description")
    t.list.field("products", {
      type: ProductType,
    })
    t.dateTime("createdAt")
    t.dateTime("updatedAt")
  },
})

export const ProductQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("product", {
      type: ProductType,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        if (!args.ID) return null

        return ctx.prisma.product.findUnique({
          where: { ID: args.ID },
        })
      },
    })
    t.list.field("products", {
      type: ProductType,
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
      type: CategoryType,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        if (!args.ID) return null

        return ctx.prisma.category.findUnique({
          where: { ID: args.ID },
        })
      },
    })
    t.list.field("categories", {
      type: CategoryType,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.category.findMany()
      },
    })
  },
})
