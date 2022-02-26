import { GraphQLScalarType } from "graphql"
import { JSONObjectResolver, DateTimeResolver } from "graphql-scalars"
import { asNexusMethod, makeSchema } from "nexus"
import { join } from "path"
import * as types from "./types"

const jsonScalar = new GraphQLScalarType({
  ...JSONObjectResolver,
  // Override the default 'JsonObject' name with one that matches what Nexus Prisma expects.
  name: "Json",
})

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver)

export const schema = makeSchema({
  types: [
    asNexusMethod(jsonScalar, "json"),
    asNexusMethod(dateTimeScalar, "dateTime"),
    types,
  ],
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
    mapping: {
      Date: "Date",
      DateTime: "Date",
      UUID: "string",
    },
    debug: process.env.NODE_ENV === "production",
  },
})
