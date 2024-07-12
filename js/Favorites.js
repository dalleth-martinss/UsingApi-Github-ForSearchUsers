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
         <td class="Repositories">
            48
         </td>
         <td class="Followers">
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