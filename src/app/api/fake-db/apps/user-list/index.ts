// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

export const db: UsersType[] = [
  {
    id: 1,
    fullName: 'Juan Pérez',
    document: '1001234567',
    email: 'juan.perez@example.com',
    role: 'asesor',
    status: 'active'
  },
  {
    id: 2,
    fullName: 'Carlos Martínez',
    document: '1002345678',
    email: 'carlos.martinez@example.com',
    role: 'asesor',
    status: 'inactive'
  },
  {
    id: 3,
    fullName: 'María Rodríguez',
    document: '1003456789',
    email: 'maria.rodriguez@example.com',
    role: 'asesor',
    status: 'active'
  },
  {
    id: 4,
    fullName: 'Laura Gómez',
    document: '1004567890',
    email: 'laura.gomez@example.com',
    role: 'asesor',
    status: 'inactive'
  }
]

