import { objectType, stringArg, extendType } from "nexus"
import { Product, Category } from "nexus-prisma"

export const ProductType = objectType({
  name: Product.$name,
  description: Product.$description,
  definition(t) {
    t.field(Product.ID)
    t.field(Product.title)
    t.field(Product.slug)
    t.field(Product.description)
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
    t.field(Product.createdAt)
    t.field(Product.updatedAt)
  },
})

export const CategoryType = objectType({
  name: Category.$name,
  description: Category.$description,
  definition(t) {
    t.field(Category.ID)
    t.field(Category.title)
    t.field(Category.slug)
    t.field(Category.description)
    t.list.field("products", {
      type: ProductType,
    })
    t.field(Category.createdAt)
    t.field(Category.updatedAt)
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
