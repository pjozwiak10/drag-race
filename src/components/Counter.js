import React, { useEffect, useState, useRef } from 'react';

const Counter = ({ gear, gameOver, finish, playAgain, startDelay, counterBlock, setCounterBlock }) => {

  const [counter, setCounter] = useState(0);
  const intervalCounter = useRef(false);

  useEffect(() => {
    if (finish && playAgain === false) {
      clearInterval(intervalCounter.current)
    }

    if (gameOver) {
      clearInterval(intervalCounter.current)
      setCounter(0);
    }

    if (startDelay && gear === 'N' && !counterBlock) {
      setTimeout(() => {
        intervalCounter.current = setInterval(() => {
          setCounter(counter => counter + 0.1)
        }, 100)
      }, 250)
      setCounterBlock(true)
    }

    if (playAgain) {
      setCounter(0)
      setTimeout(() => {
        setCounterBlock(false)
      }, 3000)
    }

  }, [setCounter, gameOver, gear, finish, playAgain, startDelay, counterBlock, setCounterBlock])


  return (
    <div className="counter-container">
      <p className="counter-container__header">Timer</p>
      <div className="counter-container__counter">{counter.toFixed(1)}</div>
    </div>
  );
}

export default Counter;