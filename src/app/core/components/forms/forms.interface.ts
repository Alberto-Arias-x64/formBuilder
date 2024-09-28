export interface IInputText {
  label?: string
  placeholder?: string
  icon?: string
  inputType: 'text' | 'number' | 'password'
}

export interface IInputList {
  label?: string
  placeholder?: string
  icon?: string
  list: ITypedParam[]
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
