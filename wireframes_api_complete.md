# Wireframes & Spécification API --- Plateforme Tournois TFT

## 1. Wireframes textuels

### 1.1 Page d'accueil

-   Header : Logo, Recherche, Connexion/Profil
-   Hero : CTA "Créer un tournoi"
-   Grille "Tournois en cours"
-   Section "Prochains tournois"
-   Footer

### 1.2 Création de tournoi (Wizard)

Étapes : 1. Infos générales 2. Format & règles 3. Participants 4.
Settings avancés 5. Review & Create

### 1.3 Vue tournoi

-   Colonne gauche : Infos + participants
-   Centre : Standings \| Matches \| Schedule \| Media
-   Colonne droite : Widgets

### 1.4 Saisie résultats (modal)

-   Liste joueurs + placements
-   Calcul points
-   Upload preuve
-   Notes

### 1.5 Dashboard organisateur

-   Overview
-   Participants
-   Matches
-   Media modération
-   Settings
-   Audit log

### 1.6 Page Media / POV

-   Filtres (jour, caster, joueur, type, statut)
-   Grille médias
-   Player modal (Twitch embed ou upload)
-   Admin actions (approve / reject)

### 1.7 Page Caster

-   Profil
-   POV list
-   Consentement Twitch

### 1.8 Profil utilisateur

-   Comptes connectés (Google/Discord/Twitch)
-   Mes tournois
-   Préférences

------------------------------------------------------------------------

## 2. Spécification API REST

### 2.1 Auth

#### POST /api/auth/login

-   Retourne 204 + cookie http-only

#### POST /api/auth/logout

-   204

#### GET /api/auth/me

Retourne :

``` json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "Pseudo",
  "roles": ["PLAYER"],
  "providers": ["google"]
}
```

------------------------------------------------------------------------

## 3. Tournois

### POST /api/tournaments

Payload :

``` json
{
  "name":"My TFT Cup",
  "description":"...",
  "region":"EUW",
  "start_date":"2026-03-01",
  "end_date":"2026-03-02",
  "format":"FFA",
  "rules": { "scoring":[], "rounds":6, "players_per_match":8 },
  "public": true,
  "allow_media": true
}
```

### GET /api/tournaments/{id}

Détails du tournoi.

### GET /api/tournaments

Liste + pagination.

------------------------------------------------------------------------

## 4. Participants

### POST /api/tournaments/{id}/participants

``` json
{
  "user_id":"uuid",
  "username":"Player123",
  "riot_id":"RiotID#1234"
}
```

### DELETE /api/participants/{id}

------------------------------------------------------------------------

## 5. Matches & Résultats

### GET /api/tournaments/{id}/matches

Liste matches :

``` json
{
  "id":"uuid",
  "round":1,
  "participants":[{"participant_id":"uuid","username":"p1"}],
  "status":"pending"
}
```

### POST /api/matches/{id}/results

``` json
{
  "placements":[
    {"participant_id":"p1","placement":1,"points":12},
    {"participant_id":"p2","placement":2,"points":8}
  ],
  "notes":"...",
  "evidence_url":"https://..."
}
```

### GET /api/tournaments/{id}/standings

``` json
[
  {
    "participant_id":"uuid",
    "username":"p1",
    "points":64,
    "average_placement":3.25,
    "wins":2
  }
]
```

------------------------------------------------------------------------

## 6. Media (POV / Casters / Twitch)

### GET /api/tournaments/{id}/media

``` json
{
  "id":"uuid",
  "caster":{"id":"uuid","display_name":"CasterX"},
  "type":"twitch_vod",
  "title":"Match POV",
  "embed_url":"https://player.twitch.tv/...",
  "thumbnail_url":"https://...",
  "match_id":"uuid",
  "status":"pending"
}
```

### POST /api/tournaments/{id}/media/import

``` json
{
  "twitch_channel_id":"123456",
  "since":"2025-12-01T00:00:00Z",
  "until":"2025-12-02T00:00:00Z",
  "auto_approve":false
}
```

### POST /api/tournaments/{id}/media/upload

### PUT /api/media/{id}/status

``` json
{
  "status":"approved",
  "moderator_id":"uuid",
  "comment":"ok"
}
```

### POST /api/media/consent

``` json
{
  "caster_id":"uuid",
  "tournament_id":"uuid",
  "consent_method":"oauth_twitch",
  "proof_url":"https://..."
}
```

------------------------------------------------------------------------

## 7. Admin

### GET /api/tournaments/{id}/audit

### POST /api/admin/tournaments/{id}/regenerate-pairings

------------------------------------------------------------------------

## 8. Erreurs

``` json
{
  "error": {
    "code":"VALIDATION_ERROR",
    "message":"Invalid fields",
    "details":[{"field":"rules.scoring","message":"missing"}],
    "trace_id":"abcd-1234"
  }
}
```

------------------------------------------------------------------------

## 9. Webhooks

### POST /api/webhooks/twitch/eventsub

------------------------------------------------------------------------

## 10. Sécurité

-   Cookies http-only
-   CSRF obligatoire
-   Rate limiting
-   Consentement média obligatoire
