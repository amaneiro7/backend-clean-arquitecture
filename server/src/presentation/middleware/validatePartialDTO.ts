import { type ZodParsedType, type ZodError, type ZodType, type ZodObject } from 'zod'

type Input = unknown

interface Output<T> {
  success: boolean
  data?: T
  error?: ZodError
}
export function validatePartialDTO<T extends ZodType<any>> ({ input, DTO }: { input: Input, DTO: ZodObject<Input> }): Output<ZodParsedType<T>> {
  return DTO.partial().safeParse(input)
}
