import { useSpring, animated } from '@react-spring/web';
import { ScreenContent } from '../../components/Shared/Layout/ScreenContent';

const HomeScreen = () => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  return (
    <animated.div style={props}>
      <ScreenContent>
        <h1>asdasd</h1>
      </ScreenContent>
    </animated.div>
  );
};

export default HomeScreen;
