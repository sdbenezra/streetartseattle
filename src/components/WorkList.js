import React from 'react';
import WorkItem from './WorkItem';
import './WorkList.css';


const WorkList = (props) => {
  const list = props.works.map((work, i) => {
    return (
      <WorkItem
        key={i}
        {...work}
      />
    );
  });

  return(
    <div className='worklist'>
      {list}
    </div>
  );
}

export default WorkList;
