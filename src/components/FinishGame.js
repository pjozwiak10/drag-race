import React, { useRef } from 'react';
import { useSpring, useChain, animated } from 'react-spring';

const FinishGame = ({ finish, setPlayAgain, setStartDelay, setStopAnimation }) => {

  const finishText = 'You made it, you finished the race. Play again to beat your score.'

  const springText = useRef();
  const [{ x, opacity }, setX] = useSpring(() => ({ x: -200, opacity: 0, ref: springText }))
  setX({ x: finish ? 0 : -200, opacity: finish ? 1 : 0 })

  const springButton = useRef()
  const [{ y }, setY] = useSpring(() => ({ y: -200, ref: springButton }))
  setY({ y: finish ? 0 : -200 })

  const springDisplay = useRef()
  const [{ display }, setDisplay] = useSpring(() => ({ display: 'none', ref: springDisplay }))
  setDisplay({ display: finish ? 'flex' : 'none' })

  useChain(finish ? [springDisplay, springText, springButton] : [springText, springButton, springDisplay], finish ? [0, 0, 2] : [0, 0, 2])

  const handleClick = () => {
    setPlayAgain(true)
    setTimeout(() => {
      setPlayAgain(false)
      setStartDelay(false)
      setStopAnimation(false)
    }, 50)
  }

  return (
    <animated.div className="finish-game" style={{ display }}>
      <animated.p className="finish-game__text" style={{ opacity, transform: x.to(x => `translateX(${x}%)`) }}>{finishText}</animated.p>
      <animated.button className="finish-game__button" style={{ transform: y.to(y => `translateY(${y}%)`) }} onClick={handleClick}>Play Again</animated.button>
    </animated.div>
  );
}

export default FinishGame;