import {useScroll} from 'react-use';

export default function Demo () {
  const scrollRef = React.useRef(null);
  const {x, y} = useScroll(scrollRef);

  console.log(x, y)
  return (
    <div ref={scrollRef}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};