import 'taro-ui/dist/style/index.scss';
import './app.less';
import Provider from './components/context';

const App = (props) => {
  return <Provider>{props.children}</Provider>;
};

export default App;
