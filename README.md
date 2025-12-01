# 🎮 TFT Tournament - Plateforme de Tournois Teamfight Tactics

Une plateforme web moderne pour organiser, gérer et suivre des tournois TFT (Teamfight Tactics).

## 📋 Table des matières

- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Wireframes](#-wireframes)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement](#-lancement)
- [API Documentation](#-api-documentation)
- [Sécurité](#-sécurité)
- [Roadmap](#-roadmap)
- [Auteur](#-auteur)

## 🎯 Description

TFT Tournament est une solution complète pour la gestion de tournois Teamfight Tactics, destinée aux :
- **Organisateurs** : Création et gestion de tournois avec différents formats
- **Joueurs** : Inscription, suivi des résultats et classements
- **Spectateurs** : Consultation des standings en temps réel
- **Casters & Streamers** : Page dédiée aux POV et VODs Twitch

> 📄 Pour les spécifications détaillées de l'API et des wireframes, voir [wireframes_api_complete.md](wireframes_api_complete.md)

### Points forts

- 🏆 **Formats flexibles** : Swiss, Bracket, Round Robin, Lobby unique
- 📊 **Standings automatiques** : Calcul des points TFT avec gestion des tiebreaks
- 🎥 **Intégration Twitch** : POV joueurs et casters avec player embedded
- 🔐 **Sécurité robuste** : JWT, OAuth2 (Google, Discord), protection brute force

## ✨ Fonctionnalités

### MVP (Version actuelle)
- ✅ Authentification JWT sécurisée (cookies HTTP-only)
- ✅ OAuth2 (Google, Discord, Twitch prévu)
- ✅ Gestion des utilisateurs avec rôles (ADMIN, ORGANIZER, PLAYER, CASTER)
- ✅ Vérification email et réinitialisation mot de passe
- ✅ Design Hextech TFT (thème dark/light)
- ✅ Entités de données (Tournament, Match, Participant, etc.)
- ✅ API REST Tournois (CRUD complet)
- ✅ Pages publiques (liste tournois, détails, circuits)
- ✅ Inscription des participants
- 🚧 Génération automatique des matchs
- 🚧 Saisie des résultats avec preuves
- 🚧 Calcul des standings avec tiebreaks

### V1 - Media & POV
- 📋 Page Media / POV avec filtres
- 📋 Import automatique VODs Twitch
- 📋 Modération des médias (approve/reject)
- 📋 Page Caster avec consentement Twitch
- 📋 Player embedded Twitch

### V2 - Administration
- 📋 Dashboard organisateur complet
- 📋 Audit log des actions
- 📋 Regenerate pairings
- 📋 Export CSV/PDF des résultats

### V3+
- 📋 Formats complexes (phases multiples)
- 📋 Notifications temps réel (WebSocket)
- 📋 Intégration Riot API
- 📋 Mode ligue / circuits

## 🎨 Wireframes

### Pages principales

| Page | Description | Status |
|------|-------------|--------|
| Page d'accueil | Hero CTA, grille tournois en cours, prochains tournois | ✅ |
| Création tournoi | Wizard 5 étapes (Infos, Format, Participants, Settings, Review) | 🚧 |
| Vue tournoi | 3 colonnes (Infos/Participants, Standings/Matches/Schedule/Media, Widgets) | 🚧 |
| Saisie résultats | Modal avec placements, calcul points, upload preuve | 🚧 |
| Dashboard organisateur | Overview, Participants, Matches, Media modération, Settings, Audit log | 📋 |
| Page Media/POV | Filtres, grille médias, player modal, admin actions | 📋 |
| Page Caster | Profil, POV list, consentement Twitch | 📋 |
| Profil utilisateur | Comptes connectés, mes tournois, préférences | ✅ |

## 🏗️ Architecture

### Backend (Spring Boot - Clean Architecture)

```
backend/src/main/java/com/tft/tournament/
├── config/           # Configuration (Security, JWT, CORS)
├── controller/       # Contrôleurs REST
├── domain/           # Entités JPA
├── dto/              # Objets de transfert
│   ├── request/
│   └── response/
├── exception/        # Gestion des erreurs
├── mapper/           # MapStruct mappers
├── repository/       # Spring Data JPA
├── security/         # JWT & OAuth2
├── service/          # Logique métier
└── util/             # Utilitaires
```

### Frontend (React + TypeScript)

```
frontend/src/
├── components/       # Composants réutilisables
├── config/           # Configuration
├── context/          # Contextes React
├── hooks/            # Hooks personnalisés
├── i18n/             # Internationalisation
├── layouts/          # Layouts de page
├── lib/              # Utilitaires
├── pages/            # Pages de l'application
├── services/         # Services API
└── types/            # Types TypeScript
```

## 🛠️ Technologies

### Backend
| Technologie | Version | Description |
|-------------|---------|-------------|
| Java | 21 | Langage |
| Spring Boot | 4.0 | Framework |
| Spring Security | 6 | Authentification |
| PostgreSQL | 18+ | Base de données |
| JJWT | 0.13 | Tokens JWT |
| MapStruct | 1.6 | Mapping DTO |
| Liquibase | - | Migrations BDD |

### Frontend
| Technologie | Version | Description |
|-------------|---------|-------------|
| React | 19 | Framework UI |
| TypeScript | 5.9 | Typage |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Styling |
| Shadcn/ui | - | Composants |
| React Hook Form | 7 | Formulaires |
| Zod | 4 | Validation |
| Axios | 1.13 | Client HTTP |
| i18next | 25 | i18n |

## 📦 Prérequis

- **Java** 21+
- **Node.js** 20+
- **PostgreSQL** 15+ (ou Docker)
- **Maven** 3.9+

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Benseddik-Fethi/tft-tournament.git
cd tft-tournament
```

### 2. Lancer les services Docker

```bash
docker-compose up -d
```

Cela démarre :
- PostgreSQL sur `localhost:5432`
- Mailpit (emails de test) sur `localhost:8025`

### 3. Configurer le backend

```bash
cd backend
cp .env.example .env
# Éditer .env si nécessaire
```

### 4. Installer les dépendances frontend

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Variables d'environnement (backend/.env)

| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port du serveur | 8080 |
| `DATABASE_URL` | URL PostgreSQL | jdbc:postgresql://localhost:5432/tft_tournament_db |
| `JWT_SECRET` | Secret JWT (64+ chars) | - |
| `GOOGLE_CLIENT_ID` | OAuth Google | - |
| `MAIL_HOST` | Serveur SMTP | localhost |

## 🏃 Lancement

### Backend

```bash
cd backend
mvn spring-boot:run
```

Le serveur démarre sur http://localhost:8080

### Frontend

```bash
cd frontend
npm run dev
```

L'application démarre sur http://localhost:5173

### Comptes de test (mode dev)

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| admin@tft-tournament.com | Password123! | ADMIN |
| user@tft-tournament.com | Password123! | USER |

## 📡 API Documentation

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/login` | Connexion (retourne 204 + cookie http-only) |
| POST | `/api/v1/auth/logout` | Déconnexion |
| GET | `/api/v1/auth/me` | Utilisateur courant (id, email, username, roles, providers) |
| POST | `/api/v1/auth/register` | Inscription |
| POST | `/api/v1/auth/refresh` | Rafraîchir tokens |

### Tournois

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/tournaments` | Créer un tournoi |
| GET | `/api/v1/public/tournaments` | Lister les tournois (+ pagination) |
| GET | `/api/v1/public/tournaments/{slug}` | Détails d'un tournoi |
| GET | `/api/v1/public/tournaments/{slug}/standings` | Classement |

### Participants

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/tournaments/{id}/participants` | S'inscrire |
| DELETE | `/api/v1/participants/{id}` | Se désinscrire |

### Matches & Résultats

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/public/tournaments/{slug}/matches` | Liste des matchs |
| POST | `/api/v1/matches/{id}/results` | Soumettre résultats (placements, points, notes, evidence_url) |

### Media (POV / Casters / Twitch)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/tournaments/{id}/media` | Liste des médias |
| POST | `/api/v1/tournaments/{id}/media/import` | Import VODs Twitch |
| POST | `/api/v1/tournaments/{id}/media/upload` | Upload média |
| PUT | `/api/v1/media/{id}/status` | Approuver/Rejeter média |
| POST | `/api/v1/media/consent` | Consentement caster |

### Admin

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/tournaments/{id}/audit` | Audit log |
| POST | `/api/v1/admin/tournaments/{id}/regenerate-pairings` | Régénérer pairings |

### Webhooks

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/webhooks/twitch/eventsub` | Callback Twitch EventSub |

### Format d'erreur

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid fields",
    "details": [{"field": "rules.scoring", "message": "missing"}],
    "trace_id": "abcd-1234"
  }
}
```

## 🔐 Sécurité

- **Cookies HTTP-only** : Tokens JWT stockés de manière sécurisée
- **CSRF** : Protection obligatoire sur les mutations
- **Rate Limiting** : Protection contre les abus
- **Consentement média** : Obligatoire pour l'import de VODs
- **OAuth2** : Google, Discord, Twitch

## 🗺️ Roadmap

- [x] Sprint 1-2 : Authentification & Base
- [x] Sprint 3 : Entités Tournament, Participant, Match
- [x] Sprint 3.5 : Design Hextech TFT
- [x] Sprint 4 : API Tournois & Pages publiques
- [ ] Sprint 5 : Calcul standings & Tiebreaks (en cours)
- [ ] Sprint 6 : Saisie résultats avec modal
- [ ] Sprint 7 : OAuth Discord & Twitch
- [ ] Sprint 8 : Page Media & POV Twitch
- [ ] Sprint 9 : Dashboard organisateur
- [ ] Sprint 10 : Audit log & Admin features

## 🎨 Thème

L'application utilise un thème **Hextech** inspiré de l'univers TFT/League of Legends :

### Couleurs principales
| Couleur | Hex | Utilisation |
|---------|-----|-------------|
| Or Hextech | `#C8AA6E` | Primary, accents, boutons |
| Bleu Arcane | `#0AC8B9` | Secondary, liens, succès |
| Violet Mystique | `#9D4DFF` | Accent, highlights |
| Bleu Nuit | `#0A1428` | Background dark |
| Blanc Nacré | `#F0E6D2` | Texte dark mode |

### Modes
- **Dark Mode** (par défaut) : Thème sombre avec tons bleu nuit
- **Light Mode** : Thème clair avec tons bleu-gris légers

## 👤 Auteur

**Fethi Benseddik**
- GitHub: [@Benseddik-Fethi](https://github.com/Benseddik-Fethi)

## 📄 Licence

Ce projet est sous licence MIT.

---

⭐ N'hésitez pas à contribuer ou à ouvrir des issues !
