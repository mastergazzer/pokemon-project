import React, { useState, createContext } from "react";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import PokemonListPage from "./pages/PokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import MainHeader from "./components/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";

import { from } from "apollo-boost";
//import { ApolloClient } from "@apollo/client";
export const MyPokemonContext = createContext();
function App() {
  const [savePokemon, setSavePokemon] = useState([]);
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    // <div className="App">
    //   <header className="App-header">

    //     <p>
    //       <code>let's do this</code>
    //     </p>

    //   </header>
    // </div>
    <ApolloProvider client={client}>
      <div className="container">
        <MyPokemonContext.Provider value={{savePokemon,setSavePokemon}}>
          <Switch>
            <Route path="/pokedex" exact>
              <PokemonListPage />
            </Route>
            <Route path="/pokedex/:pokeName">
              <PokemonDetails />
            </Route>
            <Route path="/pokemon">
              <MyPokemonList />
            </Route>
            <Route path="/" exact>
            <Redirect to="/pokedex" /> 
            </Route>
          </Switch>
          <MainHeader />
        </MyPokemonContext.Provider>
      </div>
    </ApolloProvider>
  );
}

export default App;
