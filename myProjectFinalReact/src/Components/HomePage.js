
import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/HomePage.css';
import BackgroundHome from './BackgraoundHome';
import CategoryAreas from './CategoryAreas';
import AllTherpistFilter from './AllTherpistFilter';
import About from './About';

const HomePage = () => {
  return (<>
    <div className="background-container">
      <BackgroundHome />
    </div>
    <CategoryAreas />
    <div className='divBlack' ></div>
    <About/>
  </>
  );
};

export default HomePage;


