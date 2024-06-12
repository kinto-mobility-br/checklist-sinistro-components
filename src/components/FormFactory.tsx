import { DatePicker, type DatePickerProps, Form, type FormInstance, type FormProps, Input, Select, type SelectProps, Switch } from 'antd'
import locale from 'antd/es/date-picker/locale/pt_BR'
import { type Rule } from 'antd/es/form'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import SelectBadges, { type SelectBadgesItem } from './SelectBadges'
import UploadList from './UploadList'
import SignatureCanvas from './SignatureCanvas'

interface Condition {
  field: string
  operation: string
  comparison: string
}

type Field = {
  type: string
  name: string
  label: string
  required?: boolean
  condition?: Condition
  errorMessage?: string
  customRules?: Rule[]
  colon?: boolean
} & (
  | {
    type: 'document'
    size: number
    optional?: number
  }
  | {
    type: 'input'
    mask?: (value: string) => string
    onBlur?: () => void
    max?: number
    min?: number
  }
  | {
    type: 'switch'
  }
  | {
    type: 'date'
  }
  | {
    type: 'textarea'
    min: number
    max: number
  }
  | {
    type: 'selectbadges'
    items: SelectBadgesItem[]
    groups?: string[]
  } | {
    type: 'select'
    options: SelectProps['options']
  } | {
    type: 'signature'
  }
)

interface OwnProps<T = unknown> {
  onSendForm?: (payload: T) => void
  formConfig?: FormProps
  formRef: FormInstance
  fields: Field[]
}

const disabledDate: DatePickerProps['disabledDate'] = (current) => {
  return current > dayjs()
}

const FormFactory = <T,>(props: OwnProps<T>): React.ReactElement => {
  const [openFields, setOpenFields] = useState<Record<string, boolean>>({})

  function RenderDefault (field: Field): unknown {
    switch (field.type) {
      case 'switch': return false
      case 'document': return []
      case 'date': return dayjs()
      case 'input': return ''
      case 'select': return ''
      case 'selectbadges': return []
      case 'signature': return {}
      case 'textarea': return ''
    }
  }

  function RenderRules (field: Field): Rule[] {
    const rules: Rule[] = []

    if (field.required != null) rules.push({ required: field.required, message: field.errorMessage ?? 'Campo Obrigatório!' })
    if (field.customRules != null) rules.push(...field.customRules)
    if (field.type === 'document') {
      rules.push({
        validator: async (_, value) => {
          const mandatoryCount = (field.size - (field.optional ?? 0))
          if (value != null && value.length < mandatoryCount) throw new Error(`Obrigatório o envio de ${mandatoryCount} documentos`)
        }
      })
    }

    if (field.type === 'textarea' || field.type === 'input') {
      if (field.min != null) {
        rules.push({
          validator: async (_, value) => {
            if (value != null && value.length < (field.min ?? 0)) throw new Error(`Minimo de ${field.min} caracteres`)
          }
        })
      }
    }

    return rules
  }

  function RenderItem (field: Field): React.JSX.Element {
    switch (field.type) {
      case 'document': return (
        <UploadList size={field.size} optional={field.optional} />
      )
      case 'input':

        return (
          <Input
            maxLength={field.max}
            minLength={field.min}
            onChange={() => {
              if (field.mask != null) {
                const value: string = props.formRef.getFieldValue(field.name)
                if (value != null) props.formRef.setFieldValue(field.name, field.mask(value))
              }
            }}
            onBlur={() => {
              if (field.onBlur != null) field.onBlur()
            }} />
        )
      case 'switch': return (
        <Switch checkedChildren="Sim" unCheckedChildren="Não" />
      )
      case 'date': return (
        <DatePicker
          disabledDate={disabledDate}
          format="DD/MM/YYYY"
          placeholder={field.label}
          style={{ width: '100%' }}
          locale={locale}
        />
      )
      case 'textarea': return (
        <Input.TextArea
          rows={4}
          showCount
          maxLength={field.max}
          minLength={field.min}
        />
      )
      case 'selectbadges': return (
        <SelectBadges items={field.items} groups={field.groups} />
      )
      case 'select': return (
        <Select options={field.options} />
      )
      case 'signature': return (
        <SignatureCanvas />
      )
      default: return <></>
    }
  }

  useEffect(() => { RenderConditions() }, [props.fields])

  function RenderConditions (): void {
    const newFields = openFields

    for (const field of props.fields) {
      if (field.condition != null) {
        const comparisonFieldValue = props.formRef.getFieldValue(field.condition.field)
        switch (field.condition.operation) {
          case 'contains':
            newFields[field.name] = comparisonFieldValue?.includes(field.condition.comparison)
            break
        }
      } else newFields[field.name] = true
    }

    setOpenFields(Object.assign({}, newFields))
  }

  return (
    <Form
      form={props.formRef}
      onValuesChange={() => { RenderConditions() }}
      {...(props.formConfig ?? {})}
    >
      <Form.ErrorList />
      {props.fields.map(field => {
        return (
          <>
            {
              openFields[field.name] && (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={RenderRules(field)}
                  initialValue={RenderDefault(field)}
                  colon={field.colon}
                >
                  {
                    RenderItem(field)
                  }
                </Form.Item>
              )
            }
          </>
        )
      }
      )}
    </Form>
  )
}

export default FormFactory
