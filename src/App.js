import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./Components/hooks/useTelegram"; 
import header from "../../Components/Header/Header";

function App() {
    const {onToggleButton,tg} =useTelegram();

    useEffect(() => {

        tg.ready();
    },[])




  return (
    <div className="App">
New Web APP - Weee Family.
        <header />
        <button onClick={onToggleButton}> toggle</button>
    </div>
  );
}

export default App;
