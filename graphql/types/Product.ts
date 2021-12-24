import { enumType, intArg, objectType, stringArg } from 'nexus';
import { extendType } from 'nexus';


export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.string('ID');
    t.string('title');
    t.string('slug');
    t.string('description');
    t.list.field('categories', {
      type: Category,
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.product.findUnique({
          where: { ID: root.ID },
        }).categories();
      }
    });
    t.string('createdAt');
    t.string('updatedAt');
  }
});

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.string('ID');
    t.string('title');
    t.string('slug');
    t.string('description');
    t.list.field('products', {
      type: Product,
    });
    t.string('createdAt');
    t.string('updatedAt');
  }
});

export const ProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('product', {
      type: Product,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, { ID }, ctx) => {
        return await ctx.prisma.product.findUnique({
          where: { ID }
        });
      }
    });
    t.list.field('products', {
      type: Product,
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.product.findMany();
      }
    });
  }
});

export const CategoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('category', {
      type: Category,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, { ID }, ctx) => {
        return await ctx.prisma.category.findUnique({
          where: { ID }
        });
      }
    });
    t.list.field('categories', {
      type: Category,
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.category.findMany();
      }
    });
  }
});