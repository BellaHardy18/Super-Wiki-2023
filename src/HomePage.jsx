import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepagestyle.css";
import CharacterDetails from "./Characters";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isCharacterClicked, setIsCharacterClicked] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const characterURLs = Array.from(
        { length: 731 },
        (_, i) =>
          `https://www.superheroapi.com/api.php/819453993175921/${i + 1}`
      );

      try {
        const characterPromises = characterURLs.map((url) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises);
        const characterData = characterResponses.map(
          (response) => response.data
        );
        setCharacters(characterData);
        console.log(characterData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsCharacterClicked(true);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name?.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <div className="toppage">
        <div className="test1">
          <h1 className="pagetitle">SUPER WIKI</h1>
          <button
            className="homebutton"
            onClick={() => {
              setSelectedCharacter(false);
              setIsCharacterClicked(false);
            }}
          >
            HOME
          </button>

          {isCharacterClicked ? null : (
            <div className="search-container">
              <input
                className="searchdesign"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Characters..."
              />
            </div>
          )}
        </div>
      </div>
      <div>
        {characters.length === 0 ? (
          <h2 className="load">LOADING...</h2>
        ) : (
          <div className="holdgrid">
            {isCharacterClicked ? null : filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => (
                <div key={character.id}>
                  <img
                    className="photos"
                    src={character.image?.url || ""}
                    alt={character.name}
                    onClick={() => handleCharacterClick(character)}
                  />
                  <h1 className="charname">{character.name.toUpperCase()}</h1>
                </div>
              ))
            ) : (
              <p>No matching characters found.</p>
            )}
          </div>
        )}
      </div>
      {isCharacterClicked && selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          charnumber={selectedCharacter.id}
        />
      )}
    </div>
  );
};

export default CharacterList;
