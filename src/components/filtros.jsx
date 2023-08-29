import React, {useState} from 'react';
import './filtros.css'
import { Switch, Select, MenuItem } from "@mui/material";



export default function filtros({caseCount, handleTipoFilter, tipoFilters, setTipoFilters}){


  const handleTipoFilterChange = tipoId => event => {
    setTipoFilters(prevFilters => ({
      ...prevFilters,
      [tipoId]: event.target.checked,
    }));
    handleTipoFilter();
  };


return(

 
    <div id="filtros">

      <div id='gap'></div>


      <div id='filtrosBox'>
        <div id='boxes'>
        <div id='botonFiltros'>
          <button id='plegable'><h6 id='cerrarFiltros'>x</h6>
          <h6>Filtros</h6>
          
        </button>
        </div>

          <div id='display'>
          <h4>casos:</h4>
            <h1 id='cantCasos'>{caseCount}</h1>
            
          </div>
          <div id='opciones'>

            <div id='filtroTipo'>

              <div id='filtroTipo3' class='tipos'>
    
             <div class='tipo3Icon'></div>
                   <h4 class='tipoClass'>violencia física, sexual y atentados contra la vida </h4>
                   <Switch  defaultChecked={tipoFilters.t3}
    onChange={handleTipoFilterChange('t3')}></Switch>
               </div>
               
              <div id='filtroTipo2' class='tipos'>
              <div class='tipo2Icon'></div>
                <h4 class='tipoClass'>insultos, hostigamientos y amenazas </h4>
                <Switch  defaultChecked={tipoFilters.t2}
    onChange={handleTipoFilterChange('t2')}></Switch> 
              </div>
              
              <div id='filtroTipo1' class='tipos'>            
              <div class='tipo1Icon'></div>
                 <h4 class='tipoClass'>Ataque a símbolos, murales y lugares </h4>
                <Switch  defaultChecked={tipoFilters.t1}
    onChange={handleTipoFilterChange('t1')} ></Switch>

              </div>


            </div>
            <div class='componente' >
                <h4>componentes</h4>

  <Select
       labelId="modoFiltrado"
       id="simple-select"


  >
<MenuItem value={1}>Todos</MenuItem>
    <MenuItem value={2}>negacionismo y apología a la dictadura</MenuItem>
    <MenuItem value={3}>contra identidades políticas</MenuItem>
    <MenuItem value={4}>nazismo, antisemitismo y supremacismo</MenuItem>
    <MenuItem value={5}>misoginia, antifeminismo y antiLGBTINBQ+</MenuItem>
    <MenuItem value={6}>racismo y xenofobia</MenuItem>




  </Select>


              </div>

             

          </div>
       </div>
    
    
       <div id='mapGap'>
        

       </div>


      </div>

      <div id='gap2'></div>



    </div>
);
}