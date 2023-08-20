import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import ProgressBar from "./progressbar";
import CharacterList from "./HomePage";

const CharacterDetails = (props) => {
  const [characterData, setCharacterData] = useState(null);
  const [testData, setTestData] = useState([]);
  const [speedData, setspeedData] = useState([]);
  const [strengthData, setstrengthData] = useState([]);
  const [durabilityData, setdurabilityData] = useState([]);
  const [powerData, setpowerData] = useState([]);
  const [combatData, setcombatData] = useState([]);
  const [scoreData, setscoreData] = useState([]);

  const { character, charnumber } = props;
  useEffect(() => {
    const apiUrl = `https://www.superheroapi.com/api.php/819453993175921/${charnumber}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setCharacterData(response.data);

        const holdScore =
          parseInt(response.data.powerstats.speed) +
          parseInt(response.data.powerstats.intelligence) +
          parseInt(response.data.powerstats.strength) +
          parseInt(response.data.powerstats.combat) +
          parseInt(response.data.powerstats.durability) +
          parseInt(response.data.powerstats.power);

        setscoreData(Math.ceil(holdScore / 6));

        const newTestData = [
          {
            bgcolor: "linear-gradient(to right, #882939,  #F44A51)",
            completed: response.data.powerstats.intelligence
          }
        ];
        setTestData(newTestData);

        const newspeedData = [
          {
            bgcolor: "linear-gradient(to right, #882939,  #F44A51)",
            completed: response.data.powerstats.speed
          }
        ];
        setspeedData(newspeedData);

        const newstrengthData = [
          {
            bgcolor: "linear-gradient(to right, #882939,  #F44A51)",
            completed: response.data.powerstats.strength
          }
        ];
        setstrengthData(newstrengthData);

        const newdurabilityData = [
          {
            bgcolor: "linear-gradient(to right, #882939,  #F44A51)",
            completed: response.data.powerstats.durability
          }
        ];
        setdurabilityData(newdurabilityData);

        const newpowerData = [
          {
            bgcolor: "linear-gradient(to right, #882939,  #F44A51)",
            completed: response.data.powerstats.power
          }
        ];
        setpowerData(newpowerData);

        const newcombatData = [
          {
            bgcolor: "linear-gradient(to right, #882939,  #F44A51)",
            completed: response.data.powerstats.combat
          }
        ];
        setcombatData(newcombatData);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {characterData ? (
        <div className="master-cont">
          <img
            className="imgs"
            src={characterData.image.url}
            alt={characterData.name}
          />
          <div>
            <h2 className="char-name">{characterData.name.toUpperCase()}</h2>
            <h3 className="score">SCORE: {scoreData}</h3>
            <div className="spaceStats">
              <h4 className="stats">INTELLIGENCE:</h4>
              {testData.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                />
              ))}

              <h4 className="stats">STRENGTH:</h4>
              {strengthData.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                />
              ))}
              <h4 className="stats">SPEED:</h4>
              {speedData.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                />
              ))}
              <h4 className="stats">DURABILITY:</h4>
              {durabilityData.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                />
              ))}
              <h4 className="stats">POWER:</h4>
              {powerData.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                />
              ))}
              <h4 className="stats">COMBAT:</h4>
              {combatData.map((item, idx) => (
                <ProgressBar
                  key={idx}
                  bgcolor={item.bgcolor}
                  completed={item.completed}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {characterData && characterData.biography && (
        <div>
          <h2 className="char-name">BIOGRAPHY</h2>
          <h3 className="bio">
            FULL NAME: {characterData.biography["full-name"]}
          </h3>
          <h3 className="bio">
            ALTER EGOS: {characterData.biography["alter-egos"]}
          </h3>
          <h3 className="bio">
            PLACE OF BIRTH: {characterData.biography["place-of-birth"]}
          </h3>
          <h3 className="bio">
            FIRST APPEARANCE:{"  "}
            {characterData.biography["first-appearance"]}
          </h3>
          <h3 className="bio">
            PUBLISHER:{"  "}
            {characterData.biography["publisher"]}
          </h3>
        </div>
      )}

      {characterData && characterData.appearance && (
        <div>
          <h2 className="char-name">APPEARANCE</h2>
          <h3 className="appear">
            GENDER: {characterData.appearance["gender"]}
          </h3>
          <h3 className="appear">RACE: {characterData.appearance["race"]}</h3>
          <h3 className="appear">
            HEIGHT: {characterData.appearance["height"][0]}
          </h3>
          <h3 className="appear">
            EYE COLOR:{"  "}
            {characterData.appearance["eye-color"]}
          </h3>
          <h3 className="appear">
            HAIR COLOR:{"  "}
            {characterData.appearance["hair-color"]}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
