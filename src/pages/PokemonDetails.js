import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import PokemonDetailViewer from "../components/PokemonDetailViewer";
import PokemonCard from "../components/PokemonCard";
import Cards from "../components/Cards";
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

const Tag = styled.span`
  align-self: flex-start;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
  border: solid 1px firebrick;
  color: black;
  margin-left: 0.5em;
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
const Image = styled.div`
  min-width: 80px;
  height: 80px;
  border-radius: 0.3em;
  background: linear-gradient(to bottom, #d6c091 0%, #c05c9a 100%);
  opacity: 0.7;
  margin: 0 0.6em 0 0;
  border: solid 1px firebrick;
`;

const Content = styled.div`
  p {
    margin: 0;
    font-size: 0.7em;
    color: #222;
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

const PokemonDetails = () => {
  //const [savePokemon, setSavePokemon] = useState([]);
  const {savePokemon, setSavePokemon} = useContext(MyPokemonContext);
  const [newNickname, setNickname] = useState("");
  const [catchResult, setCatchResult] = useState("");
  const [inputVisibility, setInputVisibility] = useState(true);
 
  const save = (newPokemon) => {
    localStorage.setItem("myPokemons", JSON.stringify(newPokemon));
  };

  useEffect(() => {
    if (localStorage.getItem("myPokemons")) {
      setSavePokemon(JSON.parse(localStorage.getItem("myPokemons")));
    }
  }, [setSavePokemon]);

  const params = useParams();

  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name: params.pokeName },
  });
  if (loading) return "Loading details...";
  if (error) return <pre>{error.message}</pre>;

  const onSavePoke = (image,type,stats,moves,abilities,number) => {
    if (newNickname.trim()) {
      let newPokemon = [
        ...savePokemon,
        {
          nickname: newNickname.trim(),
          id: Date.now(),
          species: params.pokeName,
          image:image,
          type:type,
          stats:stats,
          moves:moves,
          abilities:abilities,
          number:number
        },
      ];
      setSavePokemon(newPokemon);
      setNickname("");
      save(newPokemon);
    }
  };

  const deletePoke = (id) => {
    let newPokemon = savePokemon.filter((x) => x.id !== id);
    setSavePokemon(newPokemon);
    save(newPokemon);
  };
  const catchChance = () => {
    if (Math.random() >= 0.5) {
      //alert("you caught it!");
      setCatchResult("Successfully Caught!");
      setInputVisibility(false);
    } else {
      //alert("it got away...");
      setCatchResult("It Got Away...");
      setInputVisibility(true);
    }
  };
  return (
    // <MoveCard>
    //   <Cards
    //     image={data.pokemon.sprites.front_default}
    //     name={params.pokeName}
    //     type={data.pokemon.types.map((x) => (
    //       <Tag>{x.type.name}</Tag>
    //     ))}
    //     moves={data.pokemon.moves.slice(0, 4).map((x) => (
    //       <ul>{x.move.name.replace("-", " ")}</ul>
    //     ))}
    //     buttonHandler={catchChance}
    //   />
    // <input
    //   type="text"
    //   id="todoInput"
    //   className="form-control"
    //   placeholder="Enter Nickname"
    //   hidden={inputVisibility}
    //   value={newNickname}
    //   onChange={(e) => setNickname(e.target.value)}
    // />
    //   <Button hidden={inputVisibility} onClick={onSavePoke}>
    //     Save
    //   </Button>
    //   <h2>My Pokemons: {savePokemon.length}</h2>

    //   {savePokemon.map((x) => (
    //     <div key={x.id}>
    //       <SmallBox>
    //         <h3>{x.species}</h3>
    //       <p >{x.nickname}</p>
    //       <Button onClick={()=>deletePoke(x.id)}>
    //     Release
    //   </Button>
    //       </SmallBox>
    //     </div>
    //   ))}
    // </MoveCard>
    // <myPokemonContext.Provider value={savePokemon}>


    <div>
      <PokemonCard
        number={data.pokemon.id}
        image={data.pokemon.sprites.front_default}
        name={params.pokeName}
        typeLabel
        type={data.pokemon.types.map((x) => x.type.name + " ")}
        stats={data.pokemon.stats.map((x) => (
          <tr>
            <th>{x.stat.name}</th>
            <td>{x.base_stat}</td>
          </tr>
        ))}
        abilityLabel
        moves={data.pokemon.moves.slice(0, 4).map((x) => (
          <li>{x.move.name.replace("-", " ")}</li>
        ))}
        abilities={data.pokemon.abilities.slice(0, 4).map((x) => (
          <li>{x.ability.name.replace("-", " ")}</li>
        ))}
        buttonVisibility
        buttonHandler={(e) => {
          catchChance();
          e.preventDefault();
          window.location.href = "#result-modal";
        }}
      />
      <div className="box">
        {/* <a href="#result-modal" className="link-1" id="m1-c">Modal 1</a> */}
        {/* <button onClick={(e) => {
      e.preventDefault();
      window.location.href='#result-modal';
      }}>Modal1</button> */}
        {/* <p className="box__info">Without Background</p> */}

        <div className="modal-container" id="result-modal">
          <div className="modal">
            <h1 className="modal__title">Results</h1>
            <p className="modal__text">{catchResult}</p>
            <input
              type="text"
              id="todoInput"
              className="form-control"
              placeholder="Enter Nickname"
              hidden={inputVisibility}
              value={newNickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button
              hidden={inputVisibility}
              className="modal__btn"
              onClick={()=>onSavePoke(data.pokemon.sprites.front_default,data.pokemon.types,data.pokemon.stats,data.pokemon.moves.slice(0, 4),data.pokemon.abilities.slice(0, 4),data.pokemon.id)}
            >
              Save &rarr;
            </button>
            <a href="#" className="link-2"></a>
          </div>
        </div>
      </div>
      {/* {savePokemon.map((x) => (
        <div key={x.id}>
          <SmallBox>
            <h3>{x.species}</h3>
          <p >{x.nickname}</p>
          <Button onClick={()=>deletePoke(x.id)}>
        Release
      </Button>
          </SmallBox>
        </div>
      ))} */}
      
    </div>
    // </myPokemonContext.Provider>
  );
};
export default PokemonDetails;
