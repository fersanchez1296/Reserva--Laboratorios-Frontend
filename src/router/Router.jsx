import React from 'react';
import {BrowserRouter,HashRouter,Route,Routes} from 'react-router-dom';
import { View } from '../components/subRoutes/View.jsx';
import {Login} from '../components/Login.jsx'
import { Main } from '../components/Main.jsx';
import { Create } from '../components/subRoutes/Create.jsx';
import { ContextReservationsProvider } from '../components/context/Context.jsx';

export const Router = () => {
  return (
    <ContextReservationsProvider>
      <HashRouter>
        <Routes>
          {/*Componente login*/}
          <Route path='/' element={<Login />}/>
          {/*Componente Main*/}
          <Route path='/Main/*' element={<Main/>}>
            {/*Componente AdminTeacher*/}
            <Route path='View/' element={<View />} />
          </Route>
          {/*Componente Crear Usuario*/}
          <Route path='/Create' element={<Create/>} /> 
          {/*Componente Editar usuario*/}
          <Route path='/Edit/:codigo' element={<Create/>} />   
        </Routes>
      </HashRouter>
    </ContextReservationsProvider>
  )
}
