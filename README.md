# 🎮 TFT Tournament - Plateforme de Tournois Teamfight Tactics

Une plateforme web moderne pour organiser, gérer et suivre des tournois TFT (Teamfight Tactics).

## 📋 Table des matières

- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Lancement](#-lancement)
- [API Documentation](#-api-documentation)
- [Roadmap](#-roadmap)
- [Auteur](#-auteur)

## 🎯 Description

TFT Tournament est une solution complète pour la gestion de tournois Teamfight Tactics, destinée aux :
- **Organisateurs** : Création et gestion de tournois avec différents formats
- **Joueurs** : Inscription, suivi des résultats et classements
- **Spectateurs** : Consultation des standings en temps réel
- **Casters & Streamers** : Page dédiée aux POV et VODs Twitch

### Points forts

- 🏆 **Formats flexibles** : Swiss, Bracket, Round Robin, Lobby unique
- 📊 **Standings automatiques** : Calcul des points TFT avec gestion des tiebreaks
- 🎥 **Intégration Twitch** : POV joueurs et casters avec player embedded
- 🔐 **Sécurité robuste** : JWT, OAuth2 (Google, Discord), protection brute force

## ✨ Fonctionnalités

### MVP (Version actuelle)
- ✅ Authentification JWT sécurisée (cookies HTTP-only)
- ✅ OAuth2 (Google, Facebook)
- ✅ Gestion des utilisateurs avec rôles (ADMIN, ORGANIZER, USER)
- ✅ Vérification email et réinitialisation mot de passe
- 🚧 Création et gestion de tournois
- 🚧 Inscription des participants
- 🚧 Génération automatique des matchs
- 🚧 Saisie des résultats
- 🚧 Calcul des standings avec tiebreaks

### V1+ (Roadmap)
- 📋 Formats complexes (phases multiples)
- 📋 Export CSV/PDF des résultats
- 📋 Notifications temps réel
- 📋 Intégration Riot API
- 📋 OAuth Discord
- 📋 Page POV & Casters Twitch
- 📋 Mode ligue

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
| POST | `/api/v1/auth/register` | Inscription |
| POST | `/api/v1/auth/login` | Connexion |
| POST | `/api/v1/auth/refresh` | Rafraîchir tokens |
| POST | `/api/v1/auth/logout` | Déconnexion |
| GET | `/api/v1/auth/me` | Utilisateur courant |

### Tournois (à venir)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/tournaments` | Créer un tournoi |
| GET | `/api/v1/tournaments` | Lister les tournois |
| GET | `/api/v1/tournaments/{id}` | Détails d'un tournoi |
| POST | `/api/v1/tournaments/{id}/participants` | S'inscrire |
| POST | `/api/v1/tournaments/{id}/matches` | Générer les matchs |
| PUT | `/api/v1/matches/{id}/results` | Saisir résultats |

## 🗺️ Roadmap

- [x] Sprint 1-2 : Authentification & Base
- [ ] Sprint 3 : Entités Tournament, Participant, Match
- [ ] Sprint 4 : Génération de matchs & Formats
- [ ] Sprint 5 : Calcul standings & Tiebreaks
- [ ] Sprint 6 : OAuth Discord
- [ ] Sprint 7 : Page Media & POV Twitch
- [ ] Sprint 8 : Dashboard & Export

## 👤 Auteur

**Fethi Benseddik**
- GitHub: [@Benseddik-Fethi](https://github.com/Benseddik-Fethi)

## 📄 Licence

Ce projet est sous licence MIT.

---

⭐ N'hésitez pas à contribuer ou à ouvrir des issues !
