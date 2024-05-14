import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='flex-row-d'>
        <div className='logo' />
        <span className='teachers-name'>Teacher’s name</span>
      </div>
      <div className='flex-row-f'>
        <div className='rectangle'>
          <span className='class-1'>
            class 1<br />
          </span>
          <span className='student-1'>student 1</span>
          <div className='delete' />
          <div className='line' />
          <span className='student'>student 2</span>
          <div className='delete-1' />
          <div className='line-2' />
          <span className='student-3'>student 3</span>
          <div className='delete-4' />
          <div className='line-5' />
        </div>
        <div className='rectangle-6'>
          <span className='all-tasks'>All the tasks for this class</span>
          <div className='task-date'>
            <span className='task-1'>task 1 </span>
            <span className='task-date-7'> task date </span>
          </div>
          <div className='task-date-8'>
            <span className='task-2'>task 2</span>
            <span className='text-a'> task date </span>
          </div>
          <div className='task-date-9'>
            <span className='task'>task 3 </span>
            <span className='task-date-a'> task date </span>
          </div>
          <div className='task-date-b'>
            <span className='task-c'>task 4 </span>
            <span className='task-date-d'> task date </span>
          </div>
          <div className='task-date-e'>
            <span className='task-f'>task 5 </span>
            <span className='task-date-10'> task date </span>
          </div>
          <div className='task-task-date'>
            <span className='task-6'>task 6 </span>
            <span className='task-date-11'> task date </span>
          </div>
          <span className='plus'>+</span>
          <div className='ellipse' />
        </div>
      </div>
    </div>
  );
}
