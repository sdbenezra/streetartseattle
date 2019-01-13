import React from 'react';
import WorkItem from './WorkItem';
import './WorkList.css';


const WorkList = (props) => {

  const list = props.works.map((work, i) => {
    return (
      <WorkItem
        key={i}
        {...work}
        showDetail={props.showDetail}
        hideDetail={props.hideDetail}
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
