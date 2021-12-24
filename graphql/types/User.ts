import { enumType, intArg, objectType, stringArg } from 'nexus';
import { extendType } from 'nexus';
import jwt from 'jsonwebtoken'


export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('ID');
    t.string('firstName');
    t.string('lastName');
    t.string('username');
    t.string('email');
    t.boolean('verified');
    t.string('role');
    t.list.field('capabilities', {
      type: Capability,
      resolve: async (root, args, ctx) => {
        if (!root.role) return [];

        let capabilities = await ctx.prisma.userRole.findUnique({
          where: { slug: 'admin' },
        }).capabilities({ select: { capability: true } });

        return capabilities.map(cap => cap.capability);
      }
    });
  },
});

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: User,
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.user.findMany({
          where: {
            username: 'admin'
          }
        });
      },
    });
  }
});

export const Capability = objectType({
  name: 'Capability',
  definition(t) {
    t.string('ID');
    t.string('name');
    t.string('slug');
  },
});

export const CapabilitiesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('capabilities', {
      type: Capability,
      resolve: async (root, args, ctx) => {
        return await ctx.prisma.roleCapability.findMany();
      },
    });
  }
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: User,
      args: {
        ID: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: { ID: args.ID },
        });
        if (!user) return null;

        return user;
      },
    })
  }
});

export const MeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: User,
      args: {
        token: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        let tokenDecoded = { ID: null };
        try {
          tokenDecoded = jwt.verify(args.token, process.env.JWT_SECRET);
          if (!tokenDecoded) return null;
        } catch(error) { return null; }

        const user = await ctx.prisma.user.findUnique({
          where: { ID: tokenDecoded.ID },
        });
        if (!user) return null;

        return user;
      },
    })
  }
});