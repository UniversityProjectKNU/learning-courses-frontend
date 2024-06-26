import { z } from 'zod'
import { Api, ApiSchema } from '../../fetcher'

export const schema = {
  body: z.object({
    id: z.number(),
    title: z.string(),
    number: z.number(),
    description: z.string(),
  }),
  params: z.object({
    chapterTemplateId: z.number(),
  }),
  reply: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    number: z.number(),
    courseTemplateId: z.number(),
  }),
} satisfies ApiSchema

export const call = Api('/templates/chapters/chapter', schema, {
  method: 'PUT',
})
