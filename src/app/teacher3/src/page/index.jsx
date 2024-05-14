import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='flex-row-df'>
        <div className='logo' />
        <span className='teachers-name'>Teacher’s name</span>
      </div>
      <div className='flex-row-e'>
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
          <span className='student-7'>Student 1</span>
          <div className='flex-row-fb'>
            <div className='rectangle-8'>
              <div className='cover' />
              <div className='topic-finish-date'>
                <span className='topic'>
                  topic
                  <br />
                </span>
                <span className='finish-date'>finish date</span>
              </div>
              <div className='ellipse'>
                <div className='vector' />
              </div>
            </div>
            <div className='rectangle-9'>
              <div className='cover-a' />
              <div className='topic-finish-date-b'>
                <span className='topic-c'>
                  topic
                  <br />
                </span>
                <span className='finish-date-d'>finish date</span>
              </div>
              <div className='ellipse-e'>
                <div className='vector-f' />
              </div>
            </div>
          </div>
          <div className='flex-row-da'>
            <span className='plus'>+</span>
            <div className='ellipse-10' />
          </div>
        </div>
      </div>
    </div>
  );
}
