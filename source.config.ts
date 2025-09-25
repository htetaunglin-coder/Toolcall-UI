import { fileGenerator, remarkDocGen, remarkInstall } from "fumadocs-docgen"
import { defineConfig, defineDocs, frontmatterSchema, getDefaultMDXOptions } from "fumadocs-mdx/config"
import { z } from "zod"

export const { docs, meta } = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      docs: z.string().optional(),
      apiReference: z.string().optional(),
      styleSource: z.string().optional(),
    }),
    mdxOptions: getDefaultMDXOptions({
      remarkPlugins: [remarkInstall, [remarkDocGen, { generators: [fileGenerator()] }]],
    }),
  },
})

export default defineConfig()
