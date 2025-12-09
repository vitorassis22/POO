class livro{
    titulo //declarar a variavel antes do constructor é uma boa pratica
    autor
    disponivel = true
    constructor(titulo, autor){
        this.titulo = titulo
        this.autor = autor
    }
}

class pessoa{
    nome
    identidade
    constructor(nome,identidade){
        this.identidade = identidade
        this.nome = nome
    }
}
// ===== HERANÇA =====
class usuario extends pessoa{
    matricula
    constructor(nome, identidade, matricula){
        super(nome, identidade)
        this.matricula = matricula
    }
}

class emprestimo{
    usuario
    livro
    constructor(usuario, livro){
        this.usuario = usuario
        this.livro = livro
    }

    emprestimo(){
        if (this.livro.disponivel === true){
            console.log(`O livro ${this.livro.titulo} foi emprestado para ${this.usuario.nome}`)
            this.livro.disponivel = false
        } else {
            console.log(`O livro ${this.livro.titulo} está indisponível`)
        }
    }
}

const livro1 = new livro("Piratas do caribe", "N sei")
const usuario1 = new usuario("mario", "444.444.444-44", "202051781")
const usuario2 = new usuario("guilherme")

const emprestimo1 = new emprestimo(usuario1, livro1)
emprestimo1.emprestimo()

const emprestimo2 = new emprestimo(usuario2, livro1);
emprestimo2.emprestimo();