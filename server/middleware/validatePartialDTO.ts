import { type SafeParseReturnType } from 'zod'

export function validatePartialDTO<T> ({ input, DTO }: { input: any, DTO: any }): SafeParseReturnType<T, T> {
  return DTO.partial().safeParse(input)
}
