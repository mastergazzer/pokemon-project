import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import Cards from '../components/Cards';
import PokemonCard from "../components/PokemonCard";
import "../App.css";
import { MyPokemonContext } from '../App.js';
const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      stats {
        stat {
          name
        }
        base_stat
      }
    }
  }
`;

const MoveCard = styled.div`
  width: 50%;
  display: block;
  background: #eee;
  padding: 0.6em 1em 0.6em 0.6em;
  margin-bottom: 1em;
  border-radius: 0.3em;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 6px 10px;
  border: solid 1px #ccc;
  h3 {
    margin: 0;
    font-size: 1em;
    text-transform: uppercase;
  }
`;
const Button = styled.button`
  background: #cb2d3e;
  background: linear-gradient(to bottom, #ef473a, #cb2d3e);
  color: #fafafa;
  font-size: 12px;

  border-radius: 5px;

  cursor: pointer;
`;
const SmallBox = styled.div`
  min-width: 80px;
  height: 80px;
  border-radius: 0.3em;

  opacity: 0.7;
  margin: 0 0.6em 0 0;
  border: solid 1px firebrick;
`;
const MyPokemonList = ()=>{
  const {savePokemon, setSavePokemon} = useContext(MyPokemonContext);
  const save = (newPokemon) => {
    localStorage.setItem("myPokemons", JSON.stringify(newPokemon));
  };
  useEffect(() => {
    if (localStorage.getItem("myPokemons")) {
      setSavePokemon(JSON.parse(localStorage.getItem("myPokemons")));
    }
  }, [setSavePokemon]);
  const deletePoke = (id) => {
    let newPokemon = savePokemon.filter((x) => x.id !== id);
    setSavePokemon(newPokemon);
    save(newPokemon);
  };
  // const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
  //   variables: { name: savePokemon.map(x=>x.species).toString() },
  // });
  // if (loading) return "Loading details...";
  // if (error) return <pre>{error.message}</pre>;
return(
 
      (savePokemon.map((x) => (
      //   <div key={x.id}>
      //     <SmallBox>
      //       <h3>{x.species}</h3>
      //     <p >{x.nickname}</p>
      //     <Button onClick={()=>deletePoke(x.id)}>
      //   Release
      // </Button>
      //     </SmallBox>
      //   </div>
      <PokemonCard
      key={x.id}
        number={x.number}
        image={x.image}
        name={x.nickname}
        typeLabel
        type={x.type.map((y) => y.type.name + " ")}
        stats={x.stats.map((y) => (
          <tr>
            <th>{y.stat.name}</th>
            <td>{y.base_stat}</td>
          </tr>
        ))}
        abilityLabel
        moves={x.moves.slice(0, 4).map((y) => (
          <li>{y.move.name.replace("-", " ")}</li>
        ))}
        abilities={x.abilities.slice(0, 4).map((y) => (
          <li>{y.ability.name.replace("-", " ")}</li>
        ))}
        buttonReleasePokemon
        buttonReleaseHandler={()=>deletePoke(x.id)}
      /> 
      )))
)
}
export default MyPokemonList;