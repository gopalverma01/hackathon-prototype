import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CitizenFlow from './components/CitizenFlow';
import KabadiwalaFlow from './components/KabadiwalaFlow';
import RecyclerFlow from './components/RecyclerFlow';
import './styles.css';

const App = () => {
  const [currentRole, setCurrentRole] = useState('citizen');

  const renderFlow = () => {
    switch (currentRole) {
      case 'citizen':
        return <CitizenFlow />;
      case 'kabadiwala':
        return <KabadiwalaFlow />;
      case 'recycler':
        return <RecyclerFlow />;
      default:
        return <CitizenFlow />;
    }
  };

  return (
    <div className="container">
      <Navbar onRoleChange={setCurrentRole} />
      {renderFlow()}
    </div>
  );
};

export default App;