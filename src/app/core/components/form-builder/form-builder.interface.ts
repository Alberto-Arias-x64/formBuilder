import type { EFormIcon, EFormType } from '@components/forms/forms.enum'
import type { ITypedParam } from '@components/forms/forms.interface'

export interface IFormMap {
  title: string
  order: number
  formData: IInputForm[]
}
export interface IInputForm {
  id: number | string
  name: string
  label?: string
  placeholder?: string
  type: EFormType
  orden: number
  icon?: EFormIcon
  columns?: number
  list?: ITypedParam[]
  dateFrom?: Date
  dateTo?: Date
  validations?: IFormValidations
}

export interface IFormValidations {
  required?: boolean
  requiredTrue?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  email?: boolean
}
