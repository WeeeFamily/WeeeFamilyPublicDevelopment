import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./Components/hooks/useTelegram.jsx";
import {Route,Routes} from "react-router-dom";
import Header from "./Components/header/header.jsx";
import ProductList from "./Components/ProductList/ProductList.jsx";
import Form from "./Components/Form/Form.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import NavBar from "./Components/NavBar/NavBar.js";
import Map from "./Components/Map/map.jsx";
import AddCar from './Components/Add/addcar.jsx';

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
              <Route path={'addCar'} element={<AddCar/>}/>

          </Routes>


          <NavBar/>


      </div>
  );
}

export default App;
