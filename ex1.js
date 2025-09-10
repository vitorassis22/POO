// ## (Aula 2) Exercicio 1 - calculadora sem if e switch ##

const prompt = require('prompt-sync')({sigint: true}) //configuracao para usar o console no vscode
console.log('\x1Bc')  //limpar o console
let a = Number(prompt('Digite um numero: '))
let operacao = prompt('Digite a operacao desejada (+, -, /, *): ')
let b = Number(prompt('Digite outro numero: '))

let dicOperacoes = new Map(); //new - traz pra memoria uma copia da classe criada (dicionario)
dicOperacoes.set("+", function(a,b){ return a + b})//jeito 1 - funcao anonima
dicOperacoes.set("-", subtrair)//jeito 2 - puxa a funcao existente
dicOperacoes.set("/", function(a,b){return a / b})
dicOperacoes.set("*", function(a,b){return a * b})

function subtrair(a,b)
{
  return a-b
}

console.log(dicOperacoes.get(operacao)(a,b))