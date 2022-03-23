import React, { useState, useEffect } from "react";
import "./PlayersDetails.css";

const PlayersDetails = () => {
  const [details, setDetails] = useState([]);
  const [finder, setFinder] = useState("");
  const [searchDetails, setSearchDetails] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((response) => response.json())
      .then((data) => setDetails(data.playerList.reverse()));
  }, []);

  useEffect(() => {
    setSearchDetails([]);
    details.filter((val) => {
      if (val.PFName.toLowerCase().includes(finder.toLowerCase())) {
        setSearchDetails((searchDetails) => [...searchDetails, val]);
      } else if (val.TName.toLowerCase().includes(finder.toLowerCase())) {
        setSearchDetails((searchDetails) => [...searchDetails, val]);
      }
    });
  }, [finder]);

  return (
    <div className="main">
      <div className="search">
        <div>
          <label style={{color:'blue', fontSize:'bold'}}>Search Player </label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setFinder(e.target.value)}
          />
        </div>
      </div>

      <div className="cards">
        
        {finder.length > 0 &&
          searchDetails.map((data) => {
            return (
              <div key={data.Id}>
                <div>
                  <img
                    key={data.Id}
                    src={require(`../player-images/${data.Id}.jpg`)}
                    alt="players"
                  />
                  <div>
                    <h5>{data.PFName}</h5>
                    <ul key={data.id}>
                      <li>{data.SkillDesc}</li>
                      <li>Rating: {data.Value}</li>
                      {data.UpComingMatchesList.map((dataUpComing) => {
                        return (
                          <div>
                            <li key={data.Id}>
                              UpComingMatch:
                              {dataUpComing.CCode} vs {dataUpComing.VsCCode}
                            </li>
                            <span>Match Time: {dataUpComing.MDate}</span>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        {finder.length===0 &&
          details.map((data) => {
            return (
              <div key={data.Id}>
                <div>
                  <img
                    key={data.Id}
                    src={require(`../player-images/${data.Id}.jpg`)}
                    alt="players"
                  />
                  <div>
                    <h5>{data.PFName}</h5>
                    <ul key={data.id}>
                      <li>{data.SkillDesc}</li>
                      <li>Rating: {data.Value}</li>
                      {data.UpComingMatchesList.map((dataUpComing) => {
                        return (
                          <div key={data.id}>
                            <li key={data.Id}>
                              UpComingMatch:
                              {dataUpComing.CCode} vs. {dataUpComing.VsCCode}
                            </li>
                            <span>Match Time: {dataUpComing.MDate}</span>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
  );
};

export default PlayersDetails;
