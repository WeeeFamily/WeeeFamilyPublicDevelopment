import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./Components/hooks/useTelegram";
import {Route,Routes} from "react-router-dom";
import Header from "./Components/header/header";
import ProductList from "./Components/ProductList/ProductList";
import Form from "./Components/Form/Form";
import button from "./Components/button/Button";
function App() {
    const {onToggleButton,tg} =useTelegram();

    useEffect(() => {
        tg.ready();
    },[])

  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path={'/form'} element={<FormPage/>}/>
        </Routes>


    </div>
  );
}

export default App;
