import Joi from 'joi'
import { STATUS } from '../../domain/entities/status.entity'

const id = Joi.string().guid({ version: ['uuidv4'] })
const name = Joi.string().min(3).max(25).trim()
const serial = Joi.string().empty('').trim().allow(null)
const activo = Joi.string().empty('').trim().allow(null)
const status = Joi.string().valid(...Object.values(STATUS))
const limit = Joi.number().integer().min(1)
const offset = Joi.number().integer().min(0)

export const getIdDTO = Joi.object({
  id: id.required()
})

export const createDTO = Joi.object({
  name: name.required()
})

export const updateDTO = Joi.object({
  name: name.optional()
})

export const createModelSeriesDTO = Joi.object({
  name: name.required(),
  categoryId: id.required(),
  brandId: id.required()
})

export const updateModelSeriesDTO = Joi.object({
  name: name.optional(),
  categoryId: id.optional(),
  brandId: id.optional()
})

export const createDeviceDTO = Joi.object({
  serial: serial.optional(),
  activo: activo.optional(),
  status: status.required(),
  modelId: id.required()
}).or('serial', 'activo')

export const updateDeviceDTO = Joi.object({
  serial: serial.optional(),
  activo: activo.optional(),
  status: status.optional(),
  modelId: id.optional()
})

export const queryDto = Joi.object({
  limit,
  offset
}).with('limit', 'offset').with('offset', 'limit')
