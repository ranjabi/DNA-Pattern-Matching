import './App.css';
import AddDisease from './components/AddDisease';
import TestDNA from './components/TestDNA';
import FindResult from './components/FindResult';

function App() {
  return (
    <div className="Container">
      <AddDisease/>
      <TestDNA/>
      <FindResult/>
    </div>
  );
}

export default App;
