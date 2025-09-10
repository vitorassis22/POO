// ## calculadora sem if e switch ##

const prompt = require('prompt-sync')({sigint: true})
console.log('\x1Bc') 
const numA = Number(prompt('Digite um numero: '))
const numB = Number(prompt('Digite outro numero para somar: '))

const operacao = prompt('Escolha entre: soma, subtracao, divisao ou multiplicacao: ').toLocaleLowerCase()

while(operacao == 'subtracao'){

  const sub = (numA - numB) 
  console.log('O resultado e: ', sub)
  break
} 

while(operacao == 'soma'){

  const soma = (numA + numB) 
  console.log('O resultado e: ', soma)
  break
} 

while(operacao == 'multiplicacao'){

  const mult = (numA * numB) 
  console.log('O resultado e: ', mult)
  break
} 

while(operacao == 'divisao'){

  const div = (numA / numB) 
  console.log('O resultado e: ', div)
  break
} 
