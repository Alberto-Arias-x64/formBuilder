import type { IFormMap } from '@components/form-builder/form-builder.interface'
import { EFormIcon, EFormType } from '@components/forms/forms.enum'

const today = new Date()
const since18YearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

export const formMock: IFormMap[] = [
  {
    title: 'First form',
    formData: [
      {
        id: 1,
        name: 'idType',
        placeholder: 'Seleccione...',
        label: 'Tipo de identificación',
        type: EFormType.LIST,
        icon: EFormIcon.NUMBER,
        orden: 1,
        columns: 2,
        list: [
          { key: 1, value: 'CC' },
          { key: 2, value: 'NIT' }
        ],
        validations: {
          required: true
        }
      },
      {
        id: 2,
        name: 'documentNumber',
        label: 'Numero de documento',
        placeholder: 'Numero de documento',
        orden: 2,
        type: EFormType.NUMBER,
        icon: EFormIcon.NUMBER,
        validations: {
          required: true,
          minLength: 5,
          maxLength: 10
        }
      },
      {
        id: 3,
        name: 'birdDate',
        label: 'Fecha de nacimiento',
        placeholder: 'Mayor a 18 años',
        orden: 3,
        type: EFormType.DATE,
        dateTo: since18YearsAgo,
        validations: {
          required: true
        }
      },
      {
        id: 4,
        name: 'password',
        label: 'Crea una contraseña',
        placeholder: '******',
        orden: 4,
        type: EFormType.PASSWORD,
        validations: {
          required: true,
          minLength: 8
        }
      },
      {
        id: 5,
        name: 'incoming',
        label: 'Cuanto ganas',
        placeholder: '$1',
        orden: 5,
        type: EFormType.MONEY,
        validations: {
          required: true,
          min: 10,
          max: 1000
        }
      }
    ]
  },
  {
    title: 'Second form',
    formData: [
      {
        id: 1,
        name: 'accord',
        label: 'Esta de acuerdo en los terminos de uso',
        orden: 1,
        type: EFormType.CHECKBOX
      }
    ]
  }
]
