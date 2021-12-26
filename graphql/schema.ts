import { makeSchema, nullabilityGuardPlugin } from 'nexus'
import { join } from 'path'
import * as types from "./types";

export const schema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
  sourceTypes: {
    modules: [],
    mapping: {
      Date: 'Date',
      DateTime: 'Date',
      UUID: 'string',
    },
    debug: false,
  }
})