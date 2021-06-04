import Chat from './components/Chat';
import Join from './components/Join';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="contaiter">
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  );
};

export default App;
