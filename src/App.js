import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./Components/hooks/useTelegram";
const tg= window.Telegram.WebApp;

function App() {
    const {onToggleButton,tg} =useTelegram();

    useEffect(() => {

        tg.ready();
    },[])



  return (
    <div className="App">
work 12224
        <button onClick={onToggleButton}> toggle</button>
    </div>
  );
}

export default App;
