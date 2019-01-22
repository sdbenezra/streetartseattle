import React from 'react';
import './Home.css'

const Home = () => {
  return (
    <div className="crossfade">
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <figure></figure>
          <p className="main-text">Seattle has a vibrant arts scene and tons of great outdoor sculptures and street art. Many pieces are highly visible, however there are many treasures tucked away in hidden places. This site is dedicated to helping us all discover the wonderful outdoor art around us, from public installations to homegrown murals to neighborhood graffiti.{'\n'}Click on the Listings link to see the current list of artworks cataloged here. You can also search for a piece by name, artist, location or category such as "Mural" or "Sculpture". And if you can't find a piece in the database, please feel free to add one through the Add New Work link. This is meant to be a crowd sourced database listing all the great street art in Seattle, so please contribute if you see a great piece of art.{'\n'}Enjoy!</p>  
    </div>
  )
}

export default Home;
