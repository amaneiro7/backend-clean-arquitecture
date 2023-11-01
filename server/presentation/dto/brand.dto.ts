import z from 'zod'

export const brandDTO = z.object({
  name: z.string({
    invalid_type_error: 'El nombre de la marca debe ser una cadena de texto',
    required_error: 'El nombre de la marca es requerido'
  })
})
