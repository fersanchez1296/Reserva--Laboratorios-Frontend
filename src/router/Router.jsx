import React from 'react';
import {BrowserRouter,HashRouter,Route,Routes} from 'react-router-dom';
import { View } from '../components/subRoutes/View.jsx';
import {Login} from '../components/Login.jsx';
import { Main } from '../components/Main.jsx';
import { Create } from '../components/subRoutes/Create.jsx';
import {CreateTools} from '../components/subRoutes/CreateTools.jsx';
import { CreateSubjects } from '../components/subRoutes/CreateSubjects.jsx';
import { CreateLab } from '../components/subRoutes/CreateLab.jsx';
import { CreatePractice } from '../components/subRoutes/CreatePractice.jsx';
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
            <Route path='View' element={<View />} /> 
          </Route>
          {/*Componente Crear Usuario*/} 
          <Route path='/Create/Teacher' element={<Create/>} /> 
          {/*Componente Editar usuario*/}
          <Route path='/Edit/Teacher/:codigo' element={<Create/>} /> 
          {/*Componente Crear Materias*/} 
          <Route path='/Create/Subject' element={<CreateSubjects/>} /> 
          {/*Componente Editar materias*/}
          <Route path='/Edit/Subject/:crn' element={<CreateSubjects/>} />
          {/*Componente Crear Laboratorios*/} 
          <Route path='/Create/Lab/' element={<CreateLab/>} /> 
          {/*Componente Editar laboratorios*/}
          <Route path='/Edit/Lab/:id' element={<CreateLab/>} />
          {/*Componente Crear una Practica*/} 
          <Route path='/Create/Practice/' element={<CreatePractice/>} /> 
          {/*Componente Editar una practica*/}
          <Route path='/Edit/Practice/:id' element={<CreatePractice/>} />  
          {/*Componente Crear Equipo*/} 
          <Route path='/Create/Tools' element={<CreateTools/>} /> 
          {/*Componente Editar equipo*/}
          <Route path='/Edit/Tool/:id' element={<CreateTools/>} />  
            
        </Routes>
      </HashRouter>
    </ContextReservationsProvider>
  )
}
