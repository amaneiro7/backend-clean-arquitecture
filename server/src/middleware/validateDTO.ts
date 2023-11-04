import { type ZodType } from 'zod'

export function validateDTO<T> ({ input, DTO }: { input: unknown, DTO: ZodType<T> }): any {
  return DTO.safeParse(input)
}
