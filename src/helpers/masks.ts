function phone (value: string): string {
  let initialValue = value.replace(/\D/g, '')
  if (initialValue.length > 11) initialValue = initialValue.replace(/(?<=\d{11})\d?/g, '')

  let formated = initialValue

  if (formated.length <= 2) formated = formated.replace(/^(\d{0,2})/, '($1')
  else formated = formated.replace(/^(\d{0,2})/, '($1) ')

  if (initialValue.length < 11) formated = formated.replace(/(?<=\(\d{2}\) )(\d{4})(?=\d)/, '$1-')
  else if (initialValue.length === 11) {
    formated = formated
      .replace(/(?<=\(\d{2}\) )(\d)/, '$1 ')
      .replace(/(?<=\(\d{2}\) \d )(\d{0,4})/, '$1-')
  }

  return formated
}

function licensePlate (value: string): string {
  let initialValue = value.replace(/[^[A-Za-z0-9]/g, '')
  if (initialValue.length > 7) initialValue = initialValue.replace(/(?<=.{7}).?/g, '')

  let formated = initialValue.toUpperCase()

  formated = formated.replace(/(^[A-Z]{0,2})(\d+)/, '$1')
  if (formated.length > 3) {
    if (formated.match(/[A-Z]{3}[A-Z]+/) != null) formated = formated.replace(/([A-Z]{3})[A-Z]+/, '$1')
    if (formated.match(/.{5,6}[A-Z]+/) != null) formated = formated.replace(/(.{5,6})([A-Z]+)/, '$1')

    formated = formated.replace(/(\w{3})(.+)/, '$1-$2')
  }

  return formated
}

function yearyear (value: string): string {
  let initialValue = value.replace(/\D/g, '')
  if (initialValue.length > 8) initialValue = initialValue.replace(/(?<=\d{8})\d?/g, '')

  const formated = initialValue.replace(new RegExp(`(.{${Math.floor(initialValue.length / 2)}})(.*)`), '$1/$2')

  return formated
}

function cep (value: string): string {
  let initialValue = value.replace(/\D/g, '')
  if (initialValue.length > 8) initialValue = initialValue.replace(/(?<=\d{8})\d?/g, '')

  let formated = initialValue

  if (initialValue.length > 5) formated = formated.replace(/(\d{5})(\d*)/, '$1-$2')

  return formated
}

function UF (value: string): string {
  let initialValue = value.replace(/[^A-Za-z]/g, '')
  if (initialValue.length > 2) initialValue = initialValue.replace(/(?<=.{2}).?/g, '')

  const formated = initialValue.toUpperCase()

  return formated
}

export default {
  phone,
  licensePlate,
  yearyear,
  cep,
  UF
}
