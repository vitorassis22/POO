// ## (Aula 2) Exercicio 1 - calculadora sem if e switch ##

const prompt = require('prompt-sync')({sigint: true}) //configuracao para usar o console no vscode
console.log('\x1Bc')  //limpar o console
const numA = Number(prompt('Digite um numero: '))
const numB = Number(prompt('Digite outro numero para somar: '))
const operacao = prompt('Escolha entre: soma, subtracao, divisao ou multiplicacao: ').toLocaleLowerCase() //.toLocaleLoweCase - faz tudo escrito virar minusculo

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
