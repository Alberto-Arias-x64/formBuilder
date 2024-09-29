/* eslint-disable @typescript-eslint/no-explicit-any */
export type IForm = IInputForm[]

export interface IInputForm {
  id: number
  nombre: string
  descripcion: string
  tipo: string
  valor: any
  campo: string
  tipoCampo: 'text' | 'number' | 'password' | 'list' | 'date' | 'checkbox'
  obligatorio: boolean
  visible: boolean
  requerido: boolean
  orden: number
  fechaCreacion: string
  creadoPor: string
  modificadoPor: any
  fechaModificacion: any
  columns?: number
  icon?: string
}
