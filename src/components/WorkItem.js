import React from 'react';
import './WorkItem.css';


const WorkItem = (props) => {
  const {title, image, artist, category, location} = props

  return(
    <div className='item'>
      <div className='item__details'>
        <img src={image} alt=''width={250} height={150} mode='fit'/>
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
