import { objectType, stringArg, nonNull, extendType } from 'nexus';
import prisma from 'nexus-prisma'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'


export const User = objectType({
  name: prisma.User.$name,
  description: prisma.User.$description,
  definition(t) {
    t.field(prisma.User.ID);
    t.field(prisma.User.firstName);
    t.field(prisma.User.lastName);
    t.field(prisma.User.username);
    t.field(prisma.User.email);
    t.field(prisma.User.verified);
    t.field(prisma.User.role);
    t.field(prisma.User.createdAt);
    t.field(prisma.User.updatedAt);
    t.list.field('capabilities', {
      type: Capability,
      resolve: async (root, args, ctx) => {
        if (!root.role) return [];

        let capabilities = await ctx.prisma.userRole.findUnique({
          where: { slug: 'admin' },
        }).capabilities({ select: { capability: true } });

        return capabilities.map((cap: any) => cap.capability);
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
        return ctx.prisma.user.findMany({
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
        return ctx.prisma.roleCapability.findMany();
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
        ID: nonNull(stringArg()),
      },
      resolve: async (root, args, ctx) => {
        if (!args.ID) return null;

        const user = await ctx.prisma.user.findUnique({
          where: { ID: args.ID },
        });
        if (!user) return null;

        return {
          ID: user.ID,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          email: user.email,
          role: user.role,
          verified: user.verified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
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
        token: nonNull(stringArg()),
      },
      resolve: async (root, args, ctx) => {
        if (!args.token) return null;

        let tokenDecoded: JwtPayload;
        try {
          tokenDecoded = jwt.verify(args.token, process.env.JWT_SECRET!) as JwtPayload;
          if (!tokenDecoded) return null;
        } catch(error) { return null; }

        if (!tokenDecoded?.ID) return null;

        const user = await ctx.prisma.user.findUnique({
          where: { ID: tokenDecoded.ID },
        });
        if (!user) return null;

        return user;
      },
    })
  }
});