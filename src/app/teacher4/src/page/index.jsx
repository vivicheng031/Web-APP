import React from 'react';
import './index.css';

export default function Main() {
  return (
    <div className='main-container'>
      <div className='flex-row-d'>
        <div className='logo' />
        <span className='teachers-name'>Teacher’s name</span>
      </div>
      <div className='flex-row-db'>
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
          <div className='flex-row-eb'>
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
            <span className='student-7'>Student 1</span>
          </div>
          <div className='flex-row-ef'>
            <div className='rectangle-8'>
              <div className='flex-row-bf'>
                <div className='line-9' />
                <div className='picture' />
                <div className='picture-a' />
              </div>
              <div className='flex-row-cae'>
                <div className='description-date'>
                  <span className='description'>
                    description
                    <br />
                  </span>
                  <span className='date'>date</span>
                </div>
                <div className='description-date-b'>
                  <span className='description-c'>
                    description
                    <br />
                  </span>
                  <span className='date-d'>date</span>
                </div>
                <span className='p2'>p2</span>
                <span className='p1'>p1</span>
              </div>
            </div>
            <div className='ellipse-e'>
              <div className='vector-f' />
            </div>
            <div className='ellipse-10'>
              <div className='vector-11' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
