import React, { useEffect, useState, useRef } from 'react';
import Counter from './Counter';
import Car from './Car';
import LightsAnimation from './LightsAnimation';
import FinishGame from './FinishGame';

const DragRace = (props) => {

  const { name } = props.location.state;

  const gameOverText = "Your car has gone out. The engine speed was too low or you didn't adjust the speed to the current gear. Click the cross above to play again. Good Luck!!!"

  const [speedIndicator, setSpeedIndicator] = useState(-135);
  const [speedResult, setSpeedResult] = useState(0);
  const [tachIndicator, setTachIndicator] = useState(-135);
  const [tachResult, setTachResult] = useState(0);

  const [speedRatioPlus, setSpeedRatioPlus] = useState(0);
  const [speedRatioMinus, setSpeedRatioMinus] = useState(0);
  const [tachRatioPlus, setTachRatioPlus] = useState(0);
  const [tachRatioMinus, setTachRatioMinus] = useState(0);

  const [gear, setGear] = useState('N');

  const [momentChangeGear, setMomentChangeGear] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const intervalEngine = useRef(false);
  const intervalUpdate = useRef(false);

  const [finish, setFinish] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  const [startDelay, setStartDelay] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);
  const [counterBlock, setCounterBlock] = useState(false);

  useEffect(() => {

    const startEngine = (e) => {
      if (!startDelay) return;
      if (gameOver) return;
      if (tachResult > 7800) return;
      changeGear(e)
      if (gear === 'N') return
      else if (gear !== 'N') {
        clearInterval(intervalEngine.current)
        if (e.keyCode === 32 && e.type === 'keydown') {
          if (tachIndicator < 135 && speedIndicator < 135) {
            setSpeedIndicator(speedIndicator + speedRatioPlus)
            setTachIndicator(tachIndicator + tachRatioPlus)
            setSpeedResult((((135 + speedIndicator) / 270) * 240).toFixed())
            setTachResult((((135 + tachIndicator) / 270) * 8000).toFixed())
          } else stopEngine()
        } else stopEngine()
      }
    }

    const stopEngine = () => {
      if (gameOver) return;
      if (speedIndicator > -135 && speedIndicator <= 136) {
        setSpeedIndicator(speedIndicator - speedRatioMinus)
        setSpeedResult((((135 + speedIndicator) / 270) * 240).toFixed())
      }
      if (tachIndicator > -135 && tachIndicator <= 140) {
        setTachIndicator(tachIndicator - tachRatioMinus)
        setTachResult((((135 + tachIndicator) / 270) * 8000).toFixed())
      }
      changeRatio()
    }

    const changeRatio = () => {
      if (tachRatioMinus > 10) {
        setSpeedRatioPlus(1)
        setSpeedRatioMinus(0.2)
        setTachRatioPlus(4.8)
        setTachRatioMinus(0.96)
      }
    }

    const updateRatio = () => {
      let ratioPlus;
      let ratioMinus;
      if (gear === 1) {
        ratioPlus = 4.8;
        ratioMinus = 0.2;
        if (speedResult > 5 && speedResult < 20) {
          setSpeedRatioPlus(1.2)
        } else if (speedResult > 20 && speedResult < 35) {
          setSpeedRatioPlus(1.4)
        } else if (speedResult > 35 && speedResult < 55) {
          setSpeedRatioPlus(1.6)
        } else {
          setSpeedRatioPlus(1)
        }
        setSpeedRatioMinus(speedRatioPlus * ratioMinus)
        setTachRatioPlus(speedRatioPlus * ratioPlus)
        setTachRatioMinus(speedRatioPlus * ratioPlus * ratioMinus)
      } else if (gear === 2) {
        if (tachResult < 1250 || speedResult < 10) {
          setGameOver(true)
          setGear('N')
          setSpeedIndicator(-135)
          setTachIndicator(-135)
          setSpeedResult(0)
          setTachResult(0)
        }
        ratioPlus = (((8000 - tachResult) / 8000) / ((100 - speedResult) / 240));
        ratioMinus = 0.3;
        if (momentChangeGear < 4000) {
          setSpeedRatioPlus(1)
        } else if (momentChangeGear > 4000 && momentChangeGear < 5000) {
          setSpeedRatioPlus(1.2)
        }
        else if (momentChangeGear > 5000 && momentChangeGear < 6000) {
          setSpeedRatioPlus(1.4)
        } else if (momentChangeGear > 6000 && momentChangeGear < 7000) {
          setSpeedRatioPlus(1.8)
        } else if (momentChangeGear > 7000 && momentChangeGear < 8000) {
          setSpeedRatioPlus(2.4)
        }
        setSpeedRatioMinus(speedRatioPlus * ratioMinus)
        setTachRatioPlus(speedRatioPlus * ratioPlus)
        setTachRatioMinus(speedRatioPlus * ratioPlus * ratioMinus)
      } else if (gear === 3) {
        if (tachResult < 1250 || speedResult < 25) {
          setGameOver(true)
          setGear('N')
          setSpeedIndicator(-135)
          setTachIndicator(-135)
          setSpeedResult(0)
          setTachResult(0)
        }
        ratioPlus = (((8000 - tachResult) / 8000) / ((140 - speedResult) / 240));
        ratioMinus = 0.4;
        if (momentChangeGear < 4000) {
          setSpeedRatioPlus(0.8)
        } else if (momentChangeGear > 4000 && momentChangeGear < 5000) {
          setSpeedRatioPlus(1)
        }
        else if (momentChangeGear > 5000 && momentChangeGear < 6000) {
          setSpeedRatioPlus(1.2)
        } else if (momentChangeGear > 6000 && momentChangeGear < 7000) {
          setSpeedRatioPlus(1.6)
        } else if (momentChangeGear > 7000 && momentChangeGear < 8000) {
          setSpeedRatioPlus(2.2)
        }
        setSpeedRatioMinus(speedRatioPlus * ratioMinus)
        setTachRatioPlus(speedRatioPlus * ratioPlus)
        setTachRatioMinus(speedRatioPlus * ratioPlus * ratioMinus)
      } else if (gear === 4) {
        if (tachResult < 1250 || speedResult < 40) {
          setGameOver(true)
          setGear('N')
          setSpeedIndicator(-135)
          setTachIndicator(-135)
          setSpeedResult(0)
          setTachResult(0)
        }
        ratioPlus = (((8000 - tachResult) / 8000) / ((180 - speedResult) / 240));
        ratioMinus = 0.4;
        if (momentChangeGear < 4000) {
          setSpeedRatioPlus(0.6)
        } else if (momentChangeGear > 4000 && momentChangeGear < 5000) {
          setSpeedRatioPlus(0.8)
        }
        else if (momentChangeGear > 5000 && momentChangeGear < 6000) {
          setSpeedRatioPlus(1)
        } else if (momentChangeGear > 6000 && momentChangeGear < 7000) {
          setSpeedRatioPlus(1.4)
        } else if (momentChangeGear > 7000 && momentChangeGear < 8000) {
          setSpeedRatioPlus(2)
        }
        setSpeedRatioMinus(speedRatioPlus * ratioMinus)
        setTachRatioPlus(speedRatioPlus * ratioPlus)
        setTachRatioMinus(speedRatioPlus * ratioPlus * ratioMinus)
      } else if (gear === 5) {
        if (tachResult < 1250 || speedResult < 55) {
          setGameOver(true)
          setGear('N')
          setSpeedIndicator(-135)
          setTachIndicator(-135)
          setSpeedResult(0)
          setTachResult(0)
        }
        ratioPlus = (((8000 - tachResult) / 8000) / ((210 - speedResult) / 240));
        ratioMinus = 0.4;
        if (momentChangeGear < 4000) {
          setSpeedRatioPlus(0.2)
        } else if (momentChangeGear > 4000 && momentChangeGear < 5000) {
          setSpeedRatioPlus(0.4)
        }
        else if (momentChangeGear > 5000 && momentChangeGear < 6000) {
          setSpeedRatioPlus(0.6)
        } else if (momentChangeGear > 6000 && momentChangeGear < 7000) {
          setSpeedRatioPlus(1)
        } else if (momentChangeGear > 7000 && momentChangeGear < 8000) {
          setSpeedRatioPlus(1.6)
        }
        setSpeedRatioMinus(speedRatioPlus * ratioMinus)
        setTachRatioPlus(speedRatioPlus * ratioPlus)
        setTachRatioMinus(speedRatioPlus * ratioPlus * ratioMinus)
      } else if (gear === 6) {
        if (tachResult < 1250 || speedResult < 70) {
          setGameOver(true)
          setGear('N')
          setSpeedIndicator(-135)
          setTachIndicator(-135)
          setSpeedResult(0)
          setTachResult(0)
        }
        ratioPlus = (((8000 - tachResult) / 8000) / ((240 - speedResult) / 240));
        ratioMinus = 0.4;
        if (momentChangeGear < 4000) {
          setSpeedRatioPlus(0.1)
        } else if (momentChangeGear > 4000 && momentChangeGear < 5000) {
          setSpeedRatioPlus(0.15)
        }
        else if (momentChangeGear > 5000 && momentChangeGear < 6000) {
          setSpeedRatioPlus(0.2)
        } else if (momentChangeGear > 6000 && momentChangeGear < 7000) {
          setSpeedRatioPlus(0.6)
        } else if (momentChangeGear > 7000 && momentChangeGear < 8000) {
          setSpeedRatioPlus(1.2)
        }
        setSpeedRatioMinus(speedRatioPlus * ratioMinus)
        setTachRatioPlus(speedRatioPlus * ratioPlus)
        setTachRatioMinus(speedRatioPlus * ratioPlus * ratioMinus)
      }

      if (finish || gear === 'N') {
        if (speedResult <= 2) {
          setSpeedResult(0)
          setSpeedIndicator(-135)
        }
        if (tachResult < 100) {
          setTachResult(0)
          setTachIndicator(-135)
        }
      }
    }

    const changeGear = (e) => {
      if (e.keyCode === 38 && e.type === 'keydown') {
        if (gear === 'N' && (speedResult === 0 || speedResult === '0')) {
          setGear(1)
          setSpeedRatioPlus(1)
          setSpeedRatioMinus(0.2)
          setTachRatioPlus(4.8)
          setTachRatioMinus(0.96)
        } else if ((gear < 6 || gear === 'N') && e.type === 'keydown') {
          if (gear === 1) {
            if (tachResult > 1500) {
              setTachRatioMinus(40)
              setMomentChangeGear(tachResult);
              setGear(2)
            } else alert("you don't have enough speed to change gear")
          } else if (gear === 2) {
            if (tachResult > 1500) {
              setTachRatioMinus(40)
              setMomentChangeGear(tachResult);
              setGear(3)
            } else alert("you don't have enough speed to change gear")
          } else if (gear === 3) {
            if (tachResult > 1500) {
              setTachRatioMinus(40)
              setMomentChangeGear(tachResult);
              setGear(4)
            } else alert("you don't have enough speed to change gear")
          }
          else if (gear === 4) {
            if (tachResult > 1500) {
              setTachRatioMinus(40)
              setMomentChangeGear(tachResult);
              setGear(5)
            } else alert("you don't have enough speed to change gear")
          }
          else if (gear === 5) {
            if (tachResult > 1500) {
              setTachRatioMinus(40)
              setMomentChangeGear(tachResult);
              setGear(6)
            } else alert("you don't have enough speed to change gear")
          }
        }
      } else if (e.keyCode === 78) {
        setTachRatioMinus(2)
        setGear('N')
      }
    }

    window.addEventListener('keydown', startEngine)
    window.addEventListener('keydown', updateRatio)

    if (tachRatioMinus < 10 && speedResult > 0) {
      intervalUpdate.current = setInterval(updateRatio, 16.67)
    }


    if (speedResult > 0 || tachResult > 20) {
      intervalEngine.current = setInterval(stopEngine, 16.67);
    }

    return () => {
      window.removeEventListener('keydown', startEngine)
      window.removeEventListener('keydown', updateRatio)
      clearInterval(intervalUpdate.current)
      clearInterval(intervalEngine.current)
    }
  })

  useEffect(() => {
    if (!startDelay) {
      setTimeout(() => {
        setStartDelay(true);
        setTimeout(() => {
          setStopAnimation(true);
        }, 2000)
      }, 3000)
    }

  }, [startDelay, stopAnimation, speedResult])

  const checkFinish = (data) => {
    setFinish(data);
    if (finish) {
      setGear('N')
      setSpeedRatioMinus(2)
      setTachRatioMinus(2.5)
    }
  }

  const handleGameOver = () => {
    setGameOver(false)
    setStartDelay(false)
    setStopAnimation(false)
    setTimeout(() => {
      setCounterBlock(false)
    }, 3000)
  }

  return (
    <div className="game-container">
      {!stopAnimation ? <LightsAnimation stopAnimation={stopAnimation} startDelay={startDelay} gameOver={gameOver} /> : null}
      <div className="dashboard">
        <div className="dashboard__nickname"><p className="dashboard__nickname-text">{name === '' ? 'unknown' : name}</p></div>
        <div className="dashboard__speedometer">
          <div className="dashboard__indicator" style={{ transform: `rotate(${speedIndicator}deg) translateX(-50%)` }}></div>
          <div className="dashboard__info">km/h</div>
          <div className="dashboard__text" style={{ top: '70%', left: '20%' }}>0</div>
          <div className="dashboard__text" style={{ top: '60%', left: '12%' }}>20</div>
          <div className="dashboard__text" style={{ top: '45%', left: '8%' }}>40</div>
          <div className="dashboard__text" style={{ top: '32%', left: '12%' }}>60</div>
          <div className="dashboard__text" style={{ top: '22%', left: '20%' }}>80</div>
          <div className="dashboard__text" style={{ top: '12%', left: '28%' }}>100</div>
          <div className="dashboard__text" style={{ top: '8%', left: '43%' }}>120</div>
          <div className="dashboard__text" style={{ top: '10%', left: '58%' }}>140</div>
          <div className="dashboard__text" style={{ top: '21%', left: '70%' }}>160</div>
          <div className="dashboard__text" style={{ top: '32%', left: '78%' }}>180</div>
          <div className="dashboard__text" style={{ top: '47%', left: '80%' }}>200</div>
          <div className="dashboard__text" style={{ top: '60%', left: '76%' }}>220</div>
          <div className="dashboard__text" style={{ top: '70%', left: '68%' }}>240</div>
          <div className="dashboard__line" style={{ top: '78%', left: '12%', transform: 'rotate(-135deg)' }}></div>
          <div className="dashboard__line" style={{ top: '62%', left: '2%', transform: 'rotate(-120deg)' }}></div>
          <div className="dashboard__line" style={{ top: '44%', left: '-2%', transform: 'rotate(-100deg)' }}></div>
          <div className="dashboard__line" style={{ top: '26%', left: '1%', transform: 'rotate(-80deg)' }}></div>
          <div className="dashboard__line" style={{ top: '9%', left: '12%', transform: 'rotate(-52deg)' }}></div>
          <div className="dashboard__line" style={{ top: '-3%', left: '28%', transform: 'rotate(-30deg)' }}></div>
          <div className="dashboard__line" style={{ top: '-8%', left: '48%', transform: 'rotate(0deg)' }}></div>
          <div className="dashboard__line" style={{ top: '-4%', left: '70%', transform: 'rotate(30deg)' }}></div>
          <div className="dashboard__line" style={{ top: '8%', left: '86%', transform: 'rotate(48deg)' }}></div>
          <div className="dashboard__line" style={{ top: '26%', left: '98%', transform: 'rotate(80deg)' }}></div>
          <div className="dashboard__line" style={{ top: '43%', left: '100%', transform: 'rotate(90deg)' }}></div>
          <div className="dashboard__line" style={{ top: '60%', left: '97%', transform: 'rotate(105deg)' }}></div>
          <div className="dashboard__line" style={{ top: '76%', left: '86%', transform: 'rotate(135deg)' }}></div>
        </div>
        <div className="dashboard__tachometer">
          <div className="dashboard__indicator" style={{ transform: `rotate(${tachIndicator}deg) translateX(-50%)` }}></div>
          <div className="dashboard__info">x1000r/min</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '68%', left: '20%' }}>0</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '50%', left: '13%' }}>1</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '30%', left: '16%' }}>2</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '14%', left: '26%' }}>3</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '8%', left: '46%' }}>4</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '15%', left: '68%' }}>5</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '33%', left: '80%' }}>6</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '52%', left: '82%' }}>7</div>
          <div className="dashboard__text dashboard__text--tach" style={{ top: '70%', left: '71%' }}>8</div>
          <div className="dashboard__line" style={{ top: '76%', left: '12%', transform: 'rotate(-135deg)' }}></div>
          <div className="dashboard__line" style={{ top: '50%', left: '4%', transform: 'rotate(-105deg)' }}></div>
          <div className="dashboard__line" style={{ top: '25%', left: '4%', transform: 'rotate(-80deg)' }}></div>
          <div className="dashboard__line" style={{ top: '2%', left: '19%', transform: 'rotate(-45deg)' }}></div>
          <div className="dashboard__line" style={{ top: '-8%', left: '48%', transform: 'rotate(0deg)' }}></div>
          <div className="dashboard__line" style={{ top: '4%', left: '80%', transform: 'rotate(45deg)' }}></div>
          <div className="dashboard__line" style={{ top: '25%', left: '94%', transform: 'rotate(65deg)' }}></div>
          <div className="dashboard__line" style={{ top: '51%', left: '96%', transform: 'rotate(100deg)' }}></div>
          <div className="dashboard__line" style={{ top: '77%', left: '84%', transform: 'rotate(130deg)' }}></div>
        </div>
        <div className="dashboard__speed-info-container"><p className="dashboard__speed-result">{speedResult === "-0" ? 0 : speedResult}</p><p className="dashboard__speed-unit">km/h</p></div>
        <div className="dashboard__gear-info-container"><p className="dashboard__gear-result">{gear}</p></div>
      </div>
      {
        gameOver ? <div className="game-over">
          <p className="game-over__text">{gameOverText}</p>
          <button className="game-over__button" onClick={handleGameOver}><span className="far fa-times-circle"></span></button>
        </div> : null
      }
      <Counter gear={gear} gameOver={gameOver} finish={finish} playAgain={playAgain} startDelay={startDelay} counterBlock={counterBlock} setCounterBlock={setCounterBlock} />
      <Car speedResult={speedResult} checkFinish={checkFinish} gameOver={gameOver} playAgain={playAgain} setPlayAgain={setPlayAgain} startDelay={startDelay} />
      <FinishGame finish={finish} setPlayAgain={setPlayAgain} speedResult={speedResult} setStartDelay={setStartDelay} setStopAnimation={setStopAnimation} />
    </div >
  );
}

export default DragRace;