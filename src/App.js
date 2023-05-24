import DataProvider from "./DataProvider";
import ModelViewer from "./ModelViewer";
import Controls from "./Controls";
import './App.css';

function App() {
  return (
    <DataProvider>
      <div style={{height: '100vh', width: '100vw', display: 'flex'}}>
        <div style={{height: '100vh', width: '80vw'}}>
          <ModelViewer/>
        </div>
        <div style={{height: '100vh', width: '20vw'}}>
          <Controls/>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
