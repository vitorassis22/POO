## Primeira aula de JS
---
- node -v (ver vesao do js)
- ir para a pasta criada; cd (copy relative path no arquivo no vscode)
- dir (ver arquivos na pasta)
- com o console dentro da pasta digitar node (nome do arquivo) vai fazer o arquivo rodar no cmd
---
- JS possui alguns tipos primitivos de variaveis:

    String - texto
    Number - numeros
    Symbol - valor unico e imutavel
    BigInt - numero inteiro muito grande
    Boolean - verdadeiro ou falso
    Float - numeros quebrados
    Null - nulo
    Const - variavel constante
---
- O js identifica a variavel sozinho, use var, let e const
- == compara o valor independente da variavel
- === compara o valor desde que a variavel seja a mesma
- switch [serve para chavear varios casos, economiza ifs e fors]


---
## Segunda aula de JS

- Instalar prompt-sync no terminal do vs code: `npm install prompt-sync @types/prompt-sync` 
    - serve para permitir que tenhamos dados síncronos de entrada do usuário
- node (nome do arquivo) para usar a saida e entrada no terminal

---
## Terceira aula de JS

```
//declara variavel
let jose
//linguagem tipada a variavel é do tipo da classe especificada, java, c#
Pessoa jose
//instanciar novo objeto na classe em js
jose = new Pessoa()
```

- Método construtor em java

```
class Pessoa (){

    Pessoa(){

    }
}
```
- Método construtor em JS

```
class Pessoa{

    constructor(){

    }

}

- Exemplos de console.log

```
console.log('Nova pessoa registrada', this.nome)
console.log(`O nome é ${nome}`) 
```

- Sobrecarga: Mais de um método com a mesma nomenclatura e na mesma classe, exemplo: Criar varios construtores, um só com nome, um com nome e data de nascimento e um com nome, data de nascimento e cpf. Isto serve para redundancia, apresentando os dados do objeto criado independente se tem mais ou menos dados (n funciona no js, pois ele sobrescreve a funcao anterior com a ultima feita)

- Sobre escrita: Mesma coisa que a sobrecarga porem para classes diferentes

- Herança: (Filho extends Pai) || (super.pai) [soma o metodo original com a sobre escrição]

```
    //Herança
class Funcionario extends Pessoa{

    funcao;
    matricula;

    //sobre escrita
    apresentar(){
        //somar o metodo antigo com o novo sobre escrito
        super.apresentar()
        console.log(`A função é ${this.funcao} e a matricula é ${this.matricula}`)
    }

}
```