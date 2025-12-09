## IMPORTANTE
- Herança
```javascript
filho extends pai{
  constructor(atributosPai,atributosEspecificos)
    super(atributosPai) // Sempre chamar o super na primeira linha
    this.atributosEspecificos
}

```

- Associacao (Pega todos os atributos da classe)

```javascript
compra{
  pessoa, produto
  constructor(pessoa, produto)
    this.pessoa = pessoa // A classe toda
    this.pessoa.nome = x // Um atributo da classe
}

```

- Seguranca (#) set e get
```javascript
class produto{
  nome
  #preco
  constructor(nome, preco){
    this.nome = nome
    this.preco = preco
  }
  get preco(){ //Permite ler o valor seguro
    return this.#preco
  }
  set preco(novoPreco){ // Permite alterar o valor seguro
    if (novoPreco < 0){
      console.log("valor invalido") 
    }else{
      this.#preco = novoPreco
    }
  }
}

```
