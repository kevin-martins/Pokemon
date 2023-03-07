import React from 'react';
// import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const valid

describe('PokemonComponent', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      pokemon: {
        status: 'idle',
        pokedex: [],
        team: [],
        alert: { action: 'none', pokemonChange: [] },
        computerTeam: [],
        shop: [],
        evolutionList: [],
        berries: 10,
        onlyDiscovered: true,
      },
    });
  });

  it('renders the component', async () => {
    render(
      <Provider store={store}>
        <PokemonComponent />
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('dispatches fetchDataAsync action on mount', async () => {
    await store.dispatch(fetchDataAsync({ from: 1, to: 2 }));
    expect(store.getActions().length).toBe(2);
    expect(store.getActions()[0].type).toBe(fetchDataAsync.pending.type);
    expect(store.getActions()[1].type).toBe(fetchDataAsync.fulfilled.type);
  });

  it('renders fetched data', async () => {
    store = mockStore({
      pokemon: {
        status: 'succeeded',
        pokedex: [
          {
            id: 1,
            name: 'bulbasaur',
            discovered: true,
            evolutions: [],
          },
          {
            id: 2,
            name: 'ivysaur',
            discovered: true,
            evolutions: [],
          },
        ],
        team: [],
        alert: { action: 'none', pokemonChange: [] },
        computerTeam: [],
        shop: [],
        evolutionList: [],
        berries: 10,
        onlyDiscovered: true,
      },
    })

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });

  // Add more tests here...
});
