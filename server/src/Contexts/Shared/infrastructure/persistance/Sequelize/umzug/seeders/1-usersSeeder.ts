import type { Seeder } from '../'
import { RoleTypes } from '../../../../../../User/domain/Role'
import { UserPassword } from '../../../../../../User/domain/UserPassword'

const users = [
  {
    id: '4a9c8e24-58b3-4cf7-b7a1-db67d4f11d07',
    email: 'admin@bnc.com.ve',
    name: 'admin',
    lastName: 'admin',
    role: RoleTypes.ADMIN,
    password: new UserPassword('Admin12345*').toString(),
    created_at: new Date(),
    updated_at: new Date()
  }
]

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('users', users)
}

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('users', {})
}
