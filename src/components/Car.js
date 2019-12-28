import React, { useEffect, useState, useRef } from 'react';
import car from '../images/racing.svg';
import wheel from '../images/wheel.svg';

const Car = ({ speedResult, checkFinish, gameOver, playAgain }) => {

  const [positionCar, setPositionCar] = useState(0);
  const [finish, setFinish] = useState(false);
  const intervalMove = useRef(false);

  useEffect(() => {

    if (gameOver) {
      setPositionCar(0)
      clearInterval(intervalMove.current)
    }

    const sendMessage = () => {
      checkFinish(finish)
    }

    if (positionCar > window.innerWidth && playAgain === false) {
      setFinish(true)
      sendMessage()
      setTimeout(() => {
        clearInterval(intervalMove.current)
      }, 500)
    }

    if (playAgain) {
      setPositionCar(0)
      setFinish(false)
      sendMessage()
    }

    const moveCar = () => {
      setPositionCar(positionCar + speedResult / 40)
    }

    if (speedResult > 0) {
      intervalMove.current = setInterval(moveCar, 8)
    }

    return () => {
      clearInterval(intervalMove.current)
    }

  }, [positionCar, speedResult, checkFinish, finish, gameOver, playAgain, setPositionCar])


  return (
    <div className="car" style={{ transform: `translateX(${positionCar}px)` }}>
      <img src={car} alt="car" className="car__image" />
      <img src={wheel} alt="wheel" className="car__wheel" style={{ transform: `rotate(${positionCar * 6}deg)` }} />
      <img src={wheel} alt="wheel" className="car__wheel car__wheel--front" style={{ transform: `rotate(${positionCar * 6}deg)` }} />
    </div>
  );
}

export default Car;
