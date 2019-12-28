import React from 'react';
import { animated, useSpring } from 'react-spring';

const LightsAnimation = ({ stopAnimation, startDelay }) => {

  const opacityFirst = useSpring({
    from: { opacity: 0 },
    to: [{ opacity: (!stopAnimation && !startDelay) ? 1 : 0 }, { opacity: 0, delay: 2000 }],
  })

  const opacitySecond = useSpring({
    from: { opacity: 0 },
    to: [{ opacity: !stopAnimation ? 1 : 0 }, { opacity: 0, delay: 0 }],
    delay: 2000,
  })

  const opacityThird = useSpring({
    from: { opacity: 0 },
    to: [{ opacity: !stopAnimation ? 1 : 0 }, { opacity: 0, delay: 2000 }],
    delay: 3000,
  })

  return (
    <div className="starting-lights">
      <animated.div className="starting-lights__light" style={opacityFirst} ></animated.div>
      <animated.div className="starting-lights__light" style={opacitySecond}></animated.div>
      <animated.div className="starting-lights__light starting-lights__light--green" style={opacityThird}></animated.div>
    </div>
  );
}

export default LightsAnimation;