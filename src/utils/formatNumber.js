export function formatNumber(num) {
  // Se não for número válido, retorna 0
  if (num === undefined || num === null || isNaN(num)) return "0"

  // Se for menor que 1000, mostra inteiro simples (ex: 950)
  if (num < 1000) return Math.floor(num).toLocaleString('pt-BR')

  // Calcula o expoente em base 1000 (0=unidade, 1=milhar, 2=milhão...)
  const exponent = Math.floor(Math.log10(num) / 3)

  // Prefixos padrão iniciais
  const standardSuffixes = ['', 'k', 'M', 'B', 'T']

  let suffix = ''

  if (exponent < standardSuffixes.length) {
    // Usa k, M, B, T
    suffix = standardSuffixes[exponent]
  } else {
    // Lógica Infinita: Gera aa, ab, ac... ba, bb...
    // O exponent 5 (Quadrilhão) vira 'aa'
    const offset = exponent - standardSuffixes.length

    // Cálculo das letras
    const charA = String.fromCharCode(97 + Math.floor(offset / 26)) // Primeira letra
    const charB = String.fromCharCode(97 + (offset % 26))         // Segunda letra

    suffix = charA + charB
  }

  // Reduz o número para o formato curto (ex: 1500000 -> 1.50)
  const mantissa = num / Math.pow(10, exponent * 3)

  // Retorna com 2 casas decimais + o sufixo
  return mantissa.toFixed(2) + suffix
}