import z from 'zod'

export const createBrandDTO = z.object({
  name: z.string({
    invalid_type_error: 'El nombre de la marca debe ser una cadena de texto',
    required_error: 'El nombre de la marca es requerido'
  })
})

export const updateBrandDTO = createBrandDTO.partial()
