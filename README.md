# Projet CCPE - Tableau Intéractif Commissions

## Préambule 

Lors de mon stage au sein de la CCPE, j'ai pu effectuer un projet ayant pour but de regrouper les informations relatives aux commissions afin de simplifier les échanges avec les différents élus et la direction. Pour réaliser cela, j'ai créer un tableau de bord interactif, pouvant être mis à jour automatiquement via des fichiers Excel. La durée de ce projet était de 5 semaines, du 22 juin au 24 juillet 2026.


## Introduction

L'intégralité du projet, regroupant : l'interface utilisateur, les création et récupération de données et la création de toute l'architecture fonctionnelle du projet, a été réalisée par Bastian Hanart. La CCPE a, quant à elle, permis l'accès à différentes ressources afin de simplifier la réalisation de celui-ci. L'interêt de ce projet est strictement réserver au siège de la CCPE. Toute réutilisation, partage ou revente de ces informations hors de ce site est formellement interdite.

## Description du projet

### Visuel

Le site propose 8 pages, relatives au 8 différentes commission présente au sein de la CCPE.

#### Description des pages

Chaque pages possèdent les mêmes éléments :

- 4 KPI's (Des indicateurs de suivis) qui permettent d'avoir des indicateurs concrets sur la commission et son travail au cours de l'année
- Les champs d'interventions de la commission permettant de présenter les différentes actions que la commission pourrait être amenée à effectuer
- Un graphique permettant de mettre en lumière un suivi d'un indicateur majeur à cette commission. 
- Les différents membres de l'équipe de la commission
- Un suivi budgétaire de chaque commission avec les détails de chaque catégorie.
- Et enfin les différents projet de celle-ci avec des détails comme l'avancement ou sa priorité 

### Technique

Passons rapidement sur le côté technique construisant ce projet.

#### <u>Architecture</u>

Le tableau de bord est fait en React. React est une bibliothèque open source JavaScript pour créer des interfaces utilisateurs. Pour faire simple, c'est une multitude d'outils pour faire des visuels dynamiques et avoir une interface utilisateur claire et facilement utilisable.
J'ai utilisé le framework "Tailwind CSS" pour le style de la page (les couleurs, les encadrés, etc.), la bibliothèque d'icônes "Lucide React" pour avoir les icônes de chaque catégorie. L'outil "Vite" pour pouvoir visualiser l'avancement en temps réel du tableau de bord.
Et enfin j'ai utilisé "Recharts" qui est une librairie que j'ai utilisée pour faire des graphiques, et "xlsx" qui est un analyseur de données (data parser) qui va récupérer toutes les informations d'un fichier Excel qui vont être ensuite transformées en données utilisables dans le code.

#### <u>Création des pages</u>

Pour les différentes pages, j'ai créé différents composants que je viens charger ou décharger selon où se trouve l'utilisateur. Cette séparation en différents composants me permet de ne pas avoir des codes trop massifs et de pouvoir réutiliser certains éléments à plusieurs endroits différents dans le code sans devoir les réécrire.


#### <u>Données</u>

Les données récupérées depuis le PCAET sont ajoutées dans plusieurs fichier Excel eux-mêmes divisé en plusieurs pages. Chaque page Excel représente un élément précis pour la page relative au fichier (le fichier "amenagement.xlsx" permet de modifier la page "Amenagement")
Chaque donnée doit être divisée dans un tableau, par exemple son nom, sa valeur, son unité, etc., pour pouvoir être récupérée facilement ensuite.

Lorsque l'on a fini de modifier le fichier Excel, on sauvegarde nos changements et au moment de la sauvegarde, cela va activer un script en .mjs (module JavaScript). Pour simplifier, ce fichier va d'abord vérifier qu'il existe bien le fichier qu'on lui demande de vérifier. Si c'est le cas, il va l'observer pour capter lorsqu'il sera mis à jour. Quand c'est le cas, il va lancer le script qui va venir prendre les données de Excel et les mettre dans un fichier .json, qui est le moyen le plus simple de stocker des données lorsque l'on code pour les utiliser facilement. Ces données sont stockées de manière classée, chaque donnée a une clé et sa valeur, ce qui les rend facilement identifiables et facilement utilisables.

## Lancement du projet

Pour lancer le projet, ce n'est pas bien sorcier, si c'est la première fois que vous le lancez, ouvrez un terminal de commande et mettez-vous à la racine du projet (dossier CCPE-Services).
Ensuite exécuter cette commande :

```bash
npm install
```

Lorsque cela est fait, vous n'avez plus qu'à effectuer ces deux commandes : 

```bash
npm run dev
npm run watch-data
```

Et désormais, le projet est lancé, il vous suffit d'aller dans un navigateur internet et d'aller sur l'URL correspondante (en local c'est généralement 'http://localhost:5173')