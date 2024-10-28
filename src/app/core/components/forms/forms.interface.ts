import { EFormIcon } from "./forms.enum"

export interface IInputText {
  label?: string
  placeholder?: string
  icon?: EFormIcon
}

export interface IInputList extends IInputText {
  list: ITypedParam[]
  search?: boolean
}

export interface IInputDate {
  label?: string
  placeholder?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface ITypedParam {
  key: string | number
  value: string | number
}
