import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='dialog'>
        <span className='add-task'>Add a task</span>
        <div className='rectangle'>
          <span className='assign'>assign</span>
        </div>
        <div className='user-name' />
        <span className='topic'>Topic</span>
        <div className='user-name-1' />
        <span className='class'>Class</span>
        <div className='user-name-2' />
        <span className='end-date'>End Date</span>
      </div>
    </div>
  );
}
