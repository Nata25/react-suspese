// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'

// 💰 use it like this: fetchPokemon(pokemonName).then(handleSuccess, handleFailure)

let pokemon
let error

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
const pokemonName = Math.random() > 0.5 ? 'pikachu' : 'ddd'
const pokemonPromise = fetchPokemon(pokemonName)
.then(data => { pokemon = data }, e => { error = e })

function PokemonInfo() {
  if (error) throw error
  if (!pokemon) throw pokemonPromise

  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>loading...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
