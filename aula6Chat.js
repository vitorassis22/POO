//VER COMO ARRUMAR O ARRAY APARECENDO NO DONO DO CACHORRO E O HISTORICO/VARIACAO DE DINHEIRO

class Cachorro {
  nome;
  raca;
  idade;
  dono;

  constructor(nome, dono) {
    this.nome = nome;
    this.dono = dono; // O dono é passado como parâmetro
  }

  // Getter para acessar o dinheiro do dono
  get dinheiro() {
    return this.dono.historico;
  }

  // Setter para modificar o dinheiro do dono
  set dinheiro(valor) {
    this.dono.historico = valor; // Atualiza o valor de dinheiro do dono
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
    // Verificar se o passageiro é uma pessoa ou um cachorro
    if (passageiro.dinheiro !== undefined) {
      // Caso seja uma pessoa
      if (passageiro.dinheiro >= this.valorPassagem) {
        this.passageiros.push(passageiro);
        passageiro.dinheiro -= this.valorPassagem;
      }
    } else if (passageiro.dono && passageiro.dono.dinheiro !== undefined) {
      // Caso seja um cachorro e o dono tenha dinheiro
      if (passageiro.dono.dinheiro >= this.valorPassagem) {
        this.passageiros.push(passageiro);
        passageiro.dono.dinheiro -= this.valorPassagem;
      }
    }
  }
}

// Criando as instâncias
const cczTL = new CCZ();
let joao = new Pessoa("Joao", 50);
let maria = new Pessoa("Maria", 9);
maria.dinheiro += 20; // Chama o setter para Maria, agora ela tem 29

// Criando cachorros com seus donos
let rex = new Cachorro("Rex", joao); // O dono de Rex é Joao
let lessie = new Cachorro("Lessie", maria); // O dono de Lessie é Maria

// Registrando os cachorros no CCZ
cczTL.animal = rex;
cczTL.animal = lessie;

// Criando o ônibus
const transLagoas = new Busao();

// Tentando embarcar os passageiros
transLagoas.embarcarPassageiros(joao);
transLagoas.embarcarPassageiros(maria);
transLagoas.embarcarPassageiros(rex);
transLagoas.embarcarPassageiros(lessie);

console.log("Passageiros do translagoas:");
console.log(transLagoas.passageiros);
console.log("Animais registrados no CCZ:");
console.log(cczTL.animal);

// Acessando o dinheiro dos cachorros
console.log("Dinheiro de Rex:", rex.dinheiro); // Deve mostrar 50 (dinheiro de João)
console.log("Dinheiro de Lessie:", lessie.dinheiro); // Deve mostrar 29 (dinheiro de Maria)

// Alterando o dinheiro do cachorro
//rex.dinheiro = 60; // Modificando o dinheiro do dono de Rex
console.log("Novo dinheiro de Rex:", rex.dinheiro); // Deve mostrar 60 (dinheiro de João)
console.log("Novo dinheiro do dono de Rex (João):", joao.dinheiro); // Deve mostrar 60
