import styled from "@emotion/styled";

const Card = styled.figure`
  display: inline-block;
  width: 300px;
  padding: 1em;
  border-radius: 15px;
  margin: 10px;
  background: #ddd;
  text-align: left;
  position: relative;
  transition: 0.4s;
  box-shadow: 0px 5px 20px -10px #111111;
  &:hover {
    z-index: 5;
    box-shadow: 0px 13px 30px -15px #000000;
    transform: translateY(-10px);
  }
  background: linear-gradient(
    90deg,
    rgba(255, 222, 0, 1) 34%,
    rgba(232, 255, 153, 1) 83%
  );
  .card__type {
    background-color: #000;
  }
`;

const Caption = styled.figcaption`
  background-color: rgba(255, 255, 255, 0.65);
  padding: 1em;
  position: relative;
  border-radius: 0 0 3px 3px;
`;

const ImageContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  padding: 1em 1em 0;
  border-radius: 3px 3px 0 0;
`;

const Type = styled.h3`
  position: absolute;
  top: 0;
  right: 1em;
  transform: translateY(-50%);
  color: #ffffff;
  text-transform: uppercase;
  font-family: "Open Sans Condensed", "Open Sans", helvetica, sans-serif;
  letter-spacing: 0.1em;
  padding: 0.25em;
  line-height: 1;
  border-radius: 2px;
  background: #bbbbbb;
`;
const Number = styled.h3`
  position: absolute;
  top: 0;
  right: 13em;
  transform: translateY(-50%);
  color: #ffffff;
  text-transform: uppercase;
  font-family: "Open Sans Condensed", "Open Sans", helvetica, sans-serif;
  letter-spacing: 0.1em;
  padding: 0.25em;
  line-height: 1;
  border-radius: 2px;
  background: #bbbbbb;
`;

const Label = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 400;
  display: block;
  margin-bottom: 3px;
`;

const Name = styled.h1`
  font-family: "Open Sans Condensed", "Open Sans", helvetica, sans-serif;
  text-align: center;
  font-size: 1.5em;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: capitalize;
`;

const Stats = styled.table`
  text-transform: capitalize;
  margin: 1em 0;
  th {
    font-family: "Open Sans Condensed", "Open Sans", helvetica, sans-serif;
    text-align: right;
    font-weight: 300;
  }
  width: 100%;

  th,
  td {
    width: 50%;
    padding: 0.25em 0.5em 0;
  }
`;

const Abilities = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Ability = styled.h4`
  margin-top: 1em;
  flex: 1 0;
  li {
    list-style-type: none;
  }
  text-transform: capitalize;
`;
const Button = styled.button`
  background: #cb2d3e;
  background: linear-gradient(
    0deg,
    rgba(199, 24, 0, 1) 10%,
    rgba(252, 194, 69, 1) 100%
  );
  color: #fafafa;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width: -webkit-fill-available;
`;

const PokemonCard = (props) => {
  return (
    <Card key={props.key}>
      <ImageContainer>
        <img src={props.image} alt="poke-img"></img>
      </ImageContainer>
      <Caption>
        <Name>{props.name}</Name>
        <Number>#{props.number}</Number>
        {props.typeLabel ? <Type>{props.type}</Type> : ""}
        <Stats>
          <tbody>{props.stats}</tbody>
        </Stats>
        {props.abilityLabel ? (
          <Abilities>
            <Ability>
              <Label>Moves</Label>
              <ul>{props.moves}</ul>
            </Ability>
            <Ability>
              <Label>Abilities</Label>
              <ul>{props.abilities}</ul>
            </Ability>
          </Abilities>
        ) : (
          ""
        )}
        {props.buttonVisibility ? (
          <Button onClick={props.buttonHandler}>Catch!</Button>
        ) : (
          ""
        )}
        {props.buttonReleasePokemon ? (
          <Button onClick={props.buttonReleaseHandler}>Release</Button>
        ) : (
          ""
        )}
      </Caption>
    </Card>
  );
};

export default PokemonCard;
