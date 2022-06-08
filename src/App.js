import './App.css';
import { UseState } from "./UseState";
import { ClassState } from "./ClassState";
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <ClassState name = "Class State"/>
      <UseReducer name = "Use Reducer" />
      <UseState name = "Use State"/>
    </div>
  );
}

export default App;
