
# Solution de Planification Personnelle

Bonjour tout le monde ! 👋

Voici une solution de planification personnelle (comme Calendly, Cal.com), mais qui soit simple, gratuite, sans branding et sans fonctionnalités superflues.

![img.png](img.png)

Vous avez également accès à une page d'administration `your-domain/admin`

## Fonctionnalités

- Nécessite les API de Google Calendar et de Gmail (désolé, pas d'Outlook ni d'iCloud ; mais parser un flux ICS n'est pas difficile !)
- Prend en charge plusieurs calendriers pour calculer les disponibilités.
- Intègre seulement une configuration de disponibilité de base : vous pouvez spécifier les heures de travail en fonction du jour de la semaine.
- Actuellement optimisée pour des réunions par téléphone ou Google Meet (vs. en présentiel ou avec des ressources).

## Workflow

1. Un utilisateur demande un rendez-vous.
2. Le système vous envoie un email pour vous demander de confirmer ou de refuser.
3. Une fois confirmé, le rendez-vous est envoyé par email à l'utilisateur et ajouté à vos deux calendriers.

Comme mentionné, cette solution est conçue pour des cas d'utilisation simples, pensées pour les individus.

## Notes Techniques

- Utilise Next.js 13 et TypeScript avec Tailwind.
- Inclut (un peu de) tests pour les fonctions plus complexes.
- Utilise des bibliothèques minimales. Par exemple, un wrapper léger a été créé pour appeler directement les API Google, afin d'éviter d'importer `googleapis`.
- Comprend des fonctionnalités agréables telles qu'une limitation de cache LRU pour les points de terminaison API, une sélection de fuseaux horaires plus intuitive, et des emails bien formatés.

Je suis ouvert aux retours et suggestions ; amusez-vous bien !

Voir l'article connexe sur [Dev.to](https://dev.to/timfee/build-and-host-your-own-calendy-like-scheduling-page-using-nextjs-and-google-apis-5ack)

## Setup

1. Renommer le fichier `.env.local.txt` en `.env.local` et ajouter les variables d'environnement à ce fichier.
2. Créer un nouveau projet Firebase et configurer Firestore Database ainsi que l'authentification :
   - Accédez à https://console.firebase.google.com/u/3/
   - Documentation : https://firebase.google.com/docs
