import { type Rule } from 'antd/es/form'

const FullNameRules: Rule[] = [
  { pattern: /\w+ (?:\w+)+/, message: 'Favor informar nome completo!' },
  { pattern: /^[a-zA-Z\u00C0-\u00FF ]+$/i, message: 'Nome Inválido!' }
]

const EmailRules: Rule[] = [{ pattern: /^[-_.\w]+@[-_.\w]+\.(?:[-_.\w]+\.?)+[-_.\w]$/, message: 'E-mail inválido!' }]

const AnoModeloRules: Rule[] = [{ pattern: /^\d+\/\d+$/, message: 'Ano Modelo Inválido' }]

function cpf (cpf: string): boolean {
  const replaced = cpf.replace(/[^\d]+/g, '')
  if (replaced === '') return false
  // Elimina CPFs invalidos conhecidos
  if (replaced.length !== 11 ||
    replaced === '00000000000' ||
    replaced === '11111111111' ||
    replaced === '22222222222' ||
    replaced === '33333333333' ||
    replaced === '44444444444' ||
    replaced === '55555555555' ||
    replaced === '66666666666' ||
    replaced === '77777777777' ||
    replaced === '88888888888' ||
    replaced === '99999999999') { return false }
  // Valida 1o digito
  let add = 0
  for (let i = 0; i < 9; i++) { add += parseInt(replaced.charAt(i)) * (10 - i) }
  let rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) { rev = 0 }
  if (rev !== parseInt(replaced.charAt(9))) { return false }
  // Valida 2o digito
  add = 0
  for (let i = 0; i < 10; i++) { add += parseInt(replaced.charAt(i)) * (11 - i) }
  rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) { rev = 0 }
  if (rev !== parseInt(replaced.charAt(10))) { return false }
  return true
}

export default {
  FullNameRules,
  EmailRules,
  AnoModeloRules,
  cpf
}
