// App.js
import React, { useState, useEffect } from "react";
import "./ProductCard.css";

const ProductCard = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.punkapi.com/v2/beers");
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Container">
      <h1 className="Title">Beer Store</h1>
      <input
        type="text"
        placeholder="Search for beers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Outer Container */}
      <div className="beer-container">
        {filteredBeers.map((beer) => (
          // Inner Container
          <div key={beer.id} className="beer-card">
            {/* Image Container */}
            <div className="imgContainer">
              <img src={beer.image_url} alt={beer.name} />
            </div>

            {/* Text Container */}
            <div className="textContainer">
              <h5>{beer.name}</h5>
              <p>{beer.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
