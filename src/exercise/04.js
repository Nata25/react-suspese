// Cache resources
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

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

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName))
}

const CacheContext = React.createContext(null)

const PokemonCacheProvider = ({cacheTime, children}) => {  
  const pokemonResourceCache = React.useRef({})

  React.useEffect(() => {
    const int = setInterval(() => {
      console.log('clearing cache')
      pokemonResourceCache.current = {}
      setInterval(int)
    }, cacheTime)
    return () => { clearInterval(int)}
  }, [cacheTime])

  const getPokemonResourceMemo = React.useCallback(
    function getPokemonResource (pokemonName) {
      let resource
      if (!pokemonResourceCache.current[pokemonName]) {
        resource = createPokemonResource(pokemonName)
        pokemonResourceCache.current[pokemonName] = resource
      }
      return pokemonResourceCache.current[pokemonName]
  }, [])

  return (
    <CacheContext.Provider value={getPokemonResourceMemo}>
      {children}
    </CacheContext.Provider>
  )
}

function useCacheContext () {
  return React.useContext(CacheContext)
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const resource = useCacheContext()

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      setPokemonResource(resource(pokemonName))
    })
  }, [pokemonName, startTransition, resource])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

function AppWithProvider() {
  return (
    <PokemonCacheProvider cacheTime={10000}>
      <App />
    </PokemonCacheProvider>
  )
}

export default AppWithProvider
