# Pokémon Trainer

Aplicación Angular que consume la PokéAPI para crear un perfil de entrenador Pokémon, seleccionar un equipo de 3 Pokémon de la primera generación y ver un panel con estadísticas.

## Prerequisitos

- Node.js 22- (las versiones más actuales de node js no son soportadas por Angular 19) 
- Angular CLI (`npm install -g @angular/cli`)

## Instalación

npm install

## Desarrollo

npm start

Navegar a `http://localhost:4200/`.

## Build

ng build --configuration=production

## Docker

docker build -t pokemon-trainer .
docker run -p 8000:80 pokemon-trainer

Navegar a `http://localhost:8080/`.

## Estructura

```
src/app/
├── components/           #componentes visuales del proyecto (Navbar, Tarjeta entrenador etc)
├── guards/               #guards de perfil y equipo
├── models/               #modelos de pokemon y entrenador
├── pages/                #paginas del proyecto (Perfil, Equipo, Home)
└── services/             #servicios de pokemon y entrenador

```

## Features
-Formulario de perfil de entrenador con carga de foto, autocompletado de pasatiempos y validación de DUI
-Selección de equipo Pokémon con búsqueda y filtros entre los 151 Pokémon de la primera generación
-Panel (dashboard) con tarjeta del entrenador y barras de estadísticas de los Pokémon
-Edición del perfil y del equipo desde el panel principal
-Persistencia de datos mediante sessionStorage
-Búsqueda de pokemons posible mediante id original del pokemon como el id formateado mostrado en tarjeta (i.e. #001)

