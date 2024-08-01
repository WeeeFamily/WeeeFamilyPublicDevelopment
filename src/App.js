import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./Components/hooks/useTelegram";
import {Route,Routes} from "react-router-dom";
import Header from "./Components/header/header";
import ProductList from "./Components/ProductList/ProductList";
import Form from "./Components/Form/Form";
import Profile from "./Components/Profile/Profile";
import NavBar from "./Components/NavBar/NavBar";
import Map from "./Components/Map/map"


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
            <Route path={'profile'} element={<Profile/>}/>
            <Route path={'map'} element={<Map/>}/>
        </Routes>
         <NavBar />


    </div>
  );
}

export default App;
