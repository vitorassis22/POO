class cachorro {
  nome;
  raca;
  idade;
  dono;
  constructor(nome, ccz) {
    this.nome = nome;
    ccz.animal = this;
  }
}

class CCZ {
  #animais = [];
  set animal(ani) {
    this.#animais.push(ani);
  }
  get animal() {
    return this.#animais;
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
    if ((Object.getPrototypeOf(passageiro), "dinheiro")) {
      if (passageiro.dinheiro > this.valorPassagem) {
        this.passageiros.push(passageiro);
        passageiro.dinheiro -= this.valorPassagem;
      }
    } else {
      if (passageiro.dono.dinheiro > this.valorPassagem) {
        this.passageiros.push(passageiro);
        passageiro.dono.dinheiro -= this.valorPassagem;
      }
    }
  }
}

cczTL = new CCZ();
//pets
cachorro.prototype.dinheiro = 100;
let rex = new cachorro("rex", cczTL);
Object.preventExtensions(rex);
rex.nome = "rex";
rex.dinheiro = 15;
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
console.log("animais registrados");
console.log(cczTL.animal);
