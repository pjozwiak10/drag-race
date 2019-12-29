import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InitialMenu = () => {

  const [name, setName] = useState('');
  const [instruction, setInstruction] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    setName(value)
  }

  return (
    <div className="game-container">
      <div className="initial-menu">
        <span className="fas fa-cog initial-menu__config" onClick={() => setInstruction(!instruction)} style={{ color: instruction ? 'rgba(255,255,255)' : 'rgba(255,255,255,0.6' }}></span>
        <h1 className="initial-menu__header">Drag Race</h1>
        <input type="text" className="initial-menu__input" placeholder='Enter your nickname' value={name} onChange={handleInput} />
        <Link className="initial-menu__link" to={{
          pathname: '/Project1/game',
          state: {
            name: name,
          }
        }}>Start Game</Link>
        {instruction ? <div className="initial-menu__instruction">
          <h1 className="initial-menu__instruction-header">How to Play</h1>
          <div className="initial-menu__instruction-rule">
            <div className="initial-menu__instruction-key" style={{ marginRight: '20%', marginLeft: '10%' }}><span className="fas fa-arrow-up"></span></div>
            <p className="initial-menu__instruction-text">Higher gear</p>
          </div>
          <div className="initial-menu__instruction-rule">
            <div className="initial-menu__instruction-key">'SPACE'</div>
            <p className="initial-menu__instruction-text">Acceleration</p>
          </div>
          <div className="initial-menu__instruction-rule">
            <div className="initial-menu__instruction-key" style={{ marginRight: '35%' }}>'N'</div>
            <p className="initial-menu__instruction-text">Idle</p>
          </div>
        </div> : null}
      </div>
    </div>
  );
}

export default InitialMenu;