//Print
console.log("Olá mundo");
//var(global) - variavel automatica pro programa todo
var num1 = 1;
//let(regional) - variavel automatica para um intervalo especifico[so vale dentro das chaves de um if por exemplo]
let num2 = 5;
let num3 = '5';

if (num3 === num2){

    console.log('O num 3 e o  num 2 sao iguais');

}else{

    console.log('Os dois são diferentes');

}


console.log(somar(2,3))

function somar(a, b){

    return a+b;

}

switch (num2){

    case 1: 
    console.log('O numero é 1')
    break;
    case 5:
    console.log('O numero é 5')
    break;
}