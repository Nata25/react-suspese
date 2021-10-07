// Render as you fetch
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary
} from '../pokemon'
import { createResource } from '../utils'

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()

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
  const [pokemonName, setPokemonName] = React.useState('')
  const [pokemonResource, setResource] = React.useState(null)

  React.useEffect(() => {
    if (pokemonName) setResource(createResource(fetchPokemon(pokemonName)))
    else setResource(null)
  }, [pokemonName])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function onReset () {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
      <PokemonErrorBoundary name={pokemonName} onReset={onReset}>
        <React.Suspense fallback={<PokemonInfoFallback name={pokemonName}/>}>
          {pokemonResource ? (
            <PokemonInfo pokemonResource={createResource(fetchPokemon(pokemonName))} />
          ) : (
            'Submit a pokemon'
          )}
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
