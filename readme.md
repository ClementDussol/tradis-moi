# INSTALLATION

Ouvrez votre terminal au repertoire de votre choix
Clonez ce repertoire git grâce à la commande :
```
git clone https://github.com/ClementDussol/tradis-moi.git
```

Accedez au dossier grâce à la commande :
```
cd tradis-moi
```

Installez les librairies dont dépend l'application grâce à la commande (nécessite d'avoir installé nodejs) :
```
npm install
```

Lancez le serveur grâce à la commande (nécessite d'avoir installé nodejs) :
```
node server.js
```

Maintenant, ouvrez votre navigateur et accéder au projet via l'url http://localhost:8080

# UTILISATION

Pour commencer, cliquez sur le bouton 'JOUER'.
Vous démarrez la partie avec 10 points.
A chaque round, un mot est choisi au hasard. Il vous faudra le traduire en anglais.
Si vous reussissez, vous gagnez un point. Sinon, vous perdez un point.
Arrivé à 20 points, la partie est gagnée, sinon, la partie est perdue.

Par soucis de test, les réponses sont données dans la console de votre navigateur (touche f12 ou ctrl + maj + I)

# FONCTIONNALITES

* base de données : les mots sont stockés sur une base de données en ligne et récupérés dynamiquement à chaque nouveau round
* difficulté intelligente : à chaque mot est attribué une difficulté (sur une échelle de 1 à 5), si le joueur réussit la difficulté augmente d'un point, elle baisse d'un point si il se trompe
* historique (bonus) : à la fin de la partie, un récapitulatif de tous les rounds est affiché avec le mot en français et sa traduction ansi que la réponse entrée par le joueur (marquée en rouge si elle était incorrect, en vert si elle était correcte)

# TECHNOLOGIES

### back-end :

* NodeJS (ExpressJS) : gestion de l'application et des routes côté serveur
* MongoDB et mongoose : gestion de la base de données
* MLab : base de données hebergée en ligne gratuitement
* google-translate-api : API de traduction gratuite (non officielle)
* async : gestion de multiples requêtes asynchrones

### front-end :

* jQuery : gestion du DOM, utilisée principalement pour la gestion de l'interface utilisateur
* HTML/CSS/JS

# TEMPS ET PROCESSUS

prospection et benchmarking sur les differentes technologies envisagées
apprentissage partiel de nodeJS via le framework ExpressJS, ainsi que MongoDB via le framework mongoose

**(~1 jour)**

mise en place du back-end

**(~1 jour)**

mise en place du front-end, debuggage et polish

**(~1 jour)**

Temps total : **~3 jours**

# DIFFICULTEES RENCONTREES

* Traduction : Certains des mots choisis sont compliqués et ne disposaient pas d'une traduction correcte via l'API. Il a donc fallu vérifier que chaque mot dispose d'une traduction correcte avant des les enregistrer dans la base (jusqu'à ce qu'elle en contienne 500).

* Saisie et UX : Pour la gestion des caractères saisis par l'utilisateur, plusieurs options étaient envisageables et présentaient toutes quelques problèmes qu'il a fallu régler.  

# AMELIORATIONS

### l'application : 

* Améliorer la requête de mots pour qu'elle ne puisse pas sélectionner 2 fois le même mot dans une même partie
* UI responsive
* Améliorer les feedbacks (un peu plus de pep's lors des interractions)
* Ajout d'un timer pour chaque round et calcul du score final (en fonction du temps passé sur chaque round et du nombre total du round)
* Utilisation d'une API de traduction plus fiable telles que Google Translate ou Bing Translate (payantes)

### workflow & boilerplate (en situation de production) :

* J'aurais probablement utilisé des technologies sur lesquelles je suis à l'aise (comme firebase ou PHP mySQL pour le back-end) - par soucis d'efficacité et de rapidité.
* J'aurais consulté mon équipe avant d'ajouter des features supplémentaires comme l'historique des rounds.
* Mise en place d'un environnement de développement complet avec des compilers et modules managers tels que Webpack, BABEL, Sass/Less, etc.
