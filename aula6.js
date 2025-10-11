class papagaio {
  nome;
  dono;
  idade;
}
class cachorro {
  nome;
  raca;
  idade;
  dono;
  din;

  get dinheiro() {
    return this.din;
  }
  set dinheiro(valor) {
    this.din = valor;
  }
}

class Pessoa {
  nome;
  #din;
  historico = [];

  get dinheiro() {
    return this.#din;
  }

  set dinheiro(valor) {
    this.historico.push(valor - this.#din); // Guardar a diferença no histórico
    this.#din = valor; // Atualizar o valor
  }

  constructor(nome, dinheiro) {
    this.nome = nome;
    this.#din = dinheiro; // Inicializa corretamente com o valor passado
  }
}

class Busao {
  passageiros = [];
  valorPassagem = 10;

  embarcarPassageiros(passageiro) {
    if (Object.hasOwn(passageiro, "dinheiro")) {
    }
    if (passageiro.dinheiro >= this.valorPassagem) {
      // Verificar se tem dinheiro suficiente
      this.passageiros.push(passageiro);
      passageiro.dinheiro -= this.valorPassagem; // Deduzir o valor da passagem
    }
  }
}

let jeremias = new papagaio();
jeremias.nome = jeremias;
jeremias.dinheiro = 0;
//pets
cachorro.prototype.dinheiro = 100;
let rex = new cachorro();
Object.preventExtensions(rex);
rex.nome = "rex";
rex.dinheiro = 15;
rex.correnteOuro = "2 kilates";
let lessie = new cachorro();
lessie.nome = "lessie";
lessie.dinheiro = 13;
lessie.dono = "lara";
//pessoas
let joao = new Pessoa("Joao", 50);
let maria = new Pessoa("Maria", 9);
maria.dinheiro += 20; // Aqui o setter é chamado corretamente

// Comprando passagens
const transLagoas = new Busao();
transLagoas.embarcarPassageiros(joao);
transLagoas.embarcarPassageiros(maria);
transLagoas.embarcarPassageiros(rex);
transLagoas.embarcarPassageiros(lessie);
console.log("Passageiros do translagoas:");
console.log(transLagoas.passageiros);
