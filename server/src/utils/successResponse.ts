import { type Response } from 'express'

interface Props {
  res: Response
  message?: object
  status?: number
}
class SuccessResponses {
  response ({ res, message = {}, status = 200 }: Props): void {
    res.status(status).json({
      error: false,
      status,
      body: message
    })
  }

  success ({ res, status = 200, message }: Props): void {
    this.response({ res, status, message })
  }

  created ({ res, status = 201, message }: Props): void {
    this.response({ res, status, message })
  }
}

export const successResponses = new SuccessResponses()
