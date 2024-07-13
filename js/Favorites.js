export class Favorites {
   constructor(root) {
      this.root = document.querySelector(root)
      this.load()
   }

   load(){
      this.entries = [
         {
            login: 'dalleth-martinss',
            name: "Dalleth Martins",
            public_repos: '43',
            followers: '4'
         },
         {
            login: 'diego3g',
            name: "Diego Fernandes",
            public_repos: '48',
            followers: '22503'
         }
      ]
     
      delete(user){
         //recria um array, se retornar true, add no array se retornar false retira do array
         const filteredEntries = this.entries.filter(entry => {
         return false
         })
         console.log(entry)
      }

   }
}

export class FavoritesView extends Favorites {
   constructor(root) {
      super(root)
      
      this.tbody = this.root.querySelector('table tbody') 

      this.update()
   }

   update() { 
      this.removeAllTr()
      
       this.entries.forEach(user => {
         const row = this.createRow()

         row.querySelector('.user img').src = 
         `https://github.com/${user.login}.png`
         row.querySelector('.user img').alt = `Image de ${user.name}`
         row.querySelector('.user p').textContent = user.name
         row.querySelector('.user span').textContent = user.login
         row.querySelector('.repositories').textContent = user.public_repos
         row.querySelector('.followers').textContent = user.followers
         
         row.querySelector('.remove').onclick = () => {
            const isOk = confirm('Tem certeza que deseja deletar?')
            if(isOk){
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