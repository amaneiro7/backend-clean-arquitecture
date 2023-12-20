import { type Response } from 'express'

interface Props {
  res: Response
  data?: object
  status?: number
  message?: string
  isError?: boolean
}
class SuccessResponses {
  response ({ res, data = {}, status = 200, message, isError = false }: Props): void {
    res.status(status).json({
      error: isError,
      status,
      body: data,
      message
    })
  }

  success ({ res, status = 200, data }: Props): void {
    this.response({ res, status, data, message: 'Elementos obtenidos exitosamente' })
  }

  created ({ res, status = 201, data }: Props): void {
    this.response({ res, status, data, message: 'Elemento creado exitosamente' })
  }

  updated ({ res, status = 201, data }: Props): void {
    this.response({ res, status, data, message: 'Elemento actualizado exitosamente' })
  }

  error ({ res, status, message }: Props): void {
    this.response({ res, status, message, isError: true })
  }
}

export const successResponses = new SuccessResponses()
