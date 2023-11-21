import { z } from 'zod'
import { Api, ApiSchema } from '../fetcher'

export const schema = {
  body: z.object({
    login: z.string(),
    password: z.string(),
  }),
  reply: z.object({
    token: z.string(),
  }),
} satisfies ApiSchema

export const call = Api('/sign-in', schema)
