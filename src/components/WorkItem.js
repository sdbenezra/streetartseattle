import React from 'react';
import './WorkItem.css';
import foxmural from '../images/foxmural.jpg';

function WorkImage(props) {
  const image = props.image;
  console.log(props.image);
  if (image) {
    return <img src={image} alt=''width={250} height={150} mode='fit'/>
  }
  else {
    return <img src={foxmural} alt=''width={250} height={150} mode='fit'/>
  }
}

const WorkItem = (props) => {
  const {title, artist, category, location} = props

  return(
    <div className='item'>
      <div className='item__details'>
        <WorkImage image={props.image}/>
      </div>
      <div className='item__details'>
        <h2>{title}</h2>
        <p>by {artist}</p>
        <p>{category}</p>
        <p>{location}</p>
      </div>
    </div>
  )
}



export default WorkItem;
