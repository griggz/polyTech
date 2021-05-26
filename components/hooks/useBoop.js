import { useEffect, useState, useCallback } from "react";
import { animated, useSpring } from "react-spring";

function useBoop({
  x = 0,
  y = 0,
  rotation = 60,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 100,
    friction: 15,
  },
}) {
  const [isBooped, setIsBooped] = useState(false);

  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  });

  useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped]);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);
  return [style, trigger];
}

export default useBoop;
