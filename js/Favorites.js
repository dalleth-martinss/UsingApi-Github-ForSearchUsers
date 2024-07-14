
export class GithubUser {
   static search(username) {
      const endpoint = `https://api.github.com/users/${username}`

      //fetch é o cara que vai buscar qualquer endereço de URL que nós quisermos
      //ele é uma promessa,quando finalizar a promessa de pegar os dados da URL,
      //ele vai transformar esse dado em JSON
      return fetch(endpoint)
         .then(data => data.json()) // transformar o dado em JSON 
         .then(({ login, name, public_repos, followers }) => ({ //desestrutura, pega os dados e retorn um Objt
            login,
            name,
            public_repos,
            followers
         }))
   }
}

export class Favorites {
   constructor(root) {
      this.root = document.querySelector(root)
      this.load() // Inicializa this.entries chamando load()
   }
   load() {
      this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [] // Atribui a this.entries
   }

   save() { // Método save para salvar no localStorage
      localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
   }

   async add(username) {
      try {
         const user = await GithubUser.search(username)
         if (user.login === undefined) {
            throw new Error('Usuário não encontrado!')
         }

         this.entries = [user, ...this.entries] // Atualiza this.entries
         this.save() // Salva no localStorage após adicionar
         this.update()

      } catch (error) {
         alert(error.message)
      }
   }

   delete(user) {
      const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
      this.entries = filteredEntries //Atualiza this.entries
      this.save() // Salva no localStorage após remover
      this.update()
   }
}

export class FavoritesView extends Favorites {
   constructor(root) {
      super(root)

      this.tbody = this.root.querySelector('table tbody')

      this.update()
      this.onadd()
   }

   onadd() {
      const addButton = this.root.querySelector('.search button')
      addButton.onclick = () => {  //pega o evento do click, quando houver o evento ele vai entrar no #app que é root, e vai pegar o valor do input
         const { value } = this.root.querySelector('.search input') //desestrutura e pega só o velue do input
         this.add(value)
         /*const input  = this.root.querySelector('.search input')
          ".dir" vai pegar o input q está sendo mostrado como HTML e vai mostrar como um OBJT
         console.dir(input) */
      }
   }

   update() {
      this.removeAllTr()

      this.entries.forEach(user => { // Certifica-se de que this.entries é atualizado
         const row = this.createRow()

         row.querySelector('.user img').src = `https://github.com/${user.login}.png`
         row.querySelector('.user img').alt = `Image de ${user.name}`
         row.querySelector('.user p').textContent = user.name
         row.querySelector('.user span').textContent = user.login
         row.querySelector('.repositories').textContent = user.public_repos
         row.querySelector('.followers').textContent = user.followers

         row.querySelector('.remove').onclick = () => {
            const isOk = confirm('Tem certeza que deseja deletar?')
            if (isOk) {
               this.delete(user)
            }
         }

         this.tbody.append(row)
      })
   }

   createRow() {
      const tr = document.createElement('tr')

      tr.innerHTML = `
         <td class="user">
            <img src="https://github.com/diego3g.png" alt="Foto de Diego">
            <a href="https://github.com/diego3g" target="_blank"></a>
            <p>Diego Fernandes</p>
            <span>diego3g</span>
         </td>
         <td class="repositories">
            48
         </td>
         <td class="followers">
            22503
         </td>
         <td>
            <button class="remove">&times;</button>
         </td>
      `
      return tr
   }

   removeAllTr() {
      this.tbody.querySelectorAll('tr').forEach((tr) => {
         tr.remove()
      })
   }
}
