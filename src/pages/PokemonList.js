import React, { useState } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import PokemonViewer from "../components/PokemonViewer";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";
const GET_POKEMON_LIST = gql`
  query getPokemonList($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5em 0;
  a {
    color: black;
    text-decoration: none;
  }

  a:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const PokemonListPage = () => {
  const { data, loading, error } = useQuery(GET_POKEMON_LIST, {
    variables: { limit: 40, offset: 100 },
  });
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  return (
    <Container>
      {/* <h3>Pokédex</h3>
      <h4>Owned Pokémons:</h4> */}
      {
        // data.pokemons.results.map((x) => (
        //   <p key={x.id}>{x.name}</p>
        // ))
        data.pokemons.results.map((x) => (
          // <PokemonViewer key={x.id} pokemonData={x} />
          <Link to={'/pokedex/'+x.name}>
            <PokemonCard
              key={x.id}
              image={x.image}
              name={x.name}
              number={x.id}
            />
          </Link>
        ))
      }
    </Container>
  );
};
export default PokemonListPage;
