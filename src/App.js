import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./Components/hooks/useTelegram";
import {Route,Routes} from "react-router-dom";
import Header from "./Components/header/header";
import ProductList from "./Components/ProductList/ProductList";
import Form from "./Components/Form/Form";


function App() {
    const {onToggleButton,tg} =useTelegram();

    useEffect(() => {

        tg.ready();
    },[])

  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route index element={<ProductList/>}/>
            <Route path={'form'} element={<Form/>}/>
        </Routes>


    </div>
  );
}

export default App;
