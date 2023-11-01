import { type SafeParseReturnType, type ZodType } from 'zod'

export function validateDTO<T> ({ input, DTO }: { input: string, DTO: ZodType<T> }): SafeParseReturnType<T, T> {
  return DTO.safeParse(input)
}
