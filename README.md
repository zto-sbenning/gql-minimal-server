# Quelle est la problèmatique ?

Dans un monde où les débits de bande passante augmente de jour en jour, une feature devient de plus en plus critique dans nos applications: **le mode déconnecté** oO

Pour partager l'information, nos applications ont besoin d'interlocuteurs centralisés, qui maintiennent la donnée métier qu'elles manipulent.

Ces interlocuteurs, se sont nos back offices. Et pour communiquer, les back offices et nos applications utilsent un langage commun.

Dans la plupart des cas, ce langage, c'est REST (pour REpresentational State Transfert)
- [REST sur Wikipedia](https://fr.wikipedia.org/wiki/Representational_state_transfer) 
- [Marrant, un peu long, mais HYPER intéressant : comment j'ai expliqué REST à ma femme](http://www.pompage.net/traduction/comment-j-ai-explique-rest-a-ma-femme)

REST, c'est cool, ça marche bien, c'est assez simple et il y a des tonnes d'outils pour travailler avec.

Mais ...

REST possède certaines limitations.

- Si une ressource est un lien / URL, alors X ressources c'est X liens / URLs (Problème des N+1 requêtes *1 ). 
- Il existe peu de standard pour définir les structures complexes ou lourdes au travers de REST *2

> \*1 Underfetching and the n+1 problem. 
Underfetching generally means that a specific endpoint doesn’t provide enough of the required information. The client will have to make additional requests to fetch everything it needs. This can escalate to a situation where a client needs to first download a list of elements, but then needs to make one additional request per element to fetch the required data.

> \*2 [{json:api}](https://jsonapi.org/) est un de ces standards (c'est même une spécification), c'est très structuré, notamment pour la gestion des relations N-N.
Mais {json:api} est une spécification plutôt lourde et qui peut être relativement complexe à respecter.

C'est pourquoi, Facebook à créé GraphQL (GQL, pour Graph Query Langage) 

- [GraphQL sur Wikipedia](https://fr.wikipedia.org/wiki/GraphQL)
- [Site officiel / docs](https://graphql.org/)
- [Un article que j'ai trouvé intéressant](https://www.bluedrop.fr/content/graphql-complement-rest-drupal)

Donc **QL** pour Query Langage, qui (se veut) assez puissant et flexible pour résoudre les problématiques de **REST**.

**Cependant**, **GQL** possède d'autres lacunes, que REST n'a pas (comme la gestion de l'authentification et des autorisations, la pagination, et d'autres ...).

C'est pourquoi, à mon sens, les deux sont complémentaires.

## Nomonclature

En REST, on définit des **routes** (URL d'un web service), qui lorsqu'elles sont requêtées, invoquent leurs **controllers** respectifs.
Ces **controllers** invoquent des **services** qui traduisent l'intention du web service, en opérations en base de donnée. 

En GQL, on définit un **schema** (ensemble des **types**, **inputs**, **queries** et **mutations** utilisés par le endpoint). L'environnement d'exécution GraphQL utilise ce **schéma** pour invoquer les **resolvers** nécessaires à la resolution de la **query** / **mutation** reçut en requête. Les **resolvers** invoquent des **services** qui traduisent l'intention de la **query** / **mutation**, en opérations en base de donnée. 

Sur Node, nous pouvons utiliser Apollo Server pour implémenter le endpoint GraphQL.

- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)

# [Github tech lunch starter](https://github.com/zto-sbenning/gql-minimal-server)

## Part 1 -- Le server -- minimal implémentation

	$ git clone "https://github.com/zto-sbenning/gql-minimal-server.git"
	$ cd gql-minimal-server
	$ npm install
	$ npm run dev



