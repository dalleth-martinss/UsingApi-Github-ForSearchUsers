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
