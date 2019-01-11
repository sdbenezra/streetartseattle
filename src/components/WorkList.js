import React from 'react';
import WorkItem from './WorkItem';
import './WorkList.css';


const WorkList = (props) => {
  const list = props.works.map((work, i) => {
    if (props.filter){
      props.toggleFilter();
    }
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
