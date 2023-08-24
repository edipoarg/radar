import React from 'react';
import './filtros.css'
import { Switch, Select, MenuItem } from "@mui/material";



export default function filtros(){


return(

 
    <div id="filtros">

      <div id='gap'></div>

      <div id='filtrosBox'>
        <div id='boxes'>
          <div id='display'>

            <h1>160</h1>
            <h4>casos de violencia</h4>
            <h3>Argentina</h3>
          </div>
          <div id='opciones'>

            <div id='filtroTipo'>

              <div class='tipos'>
    
             <div class='tipo1Icon'></div>
                   <h4>tipo 1</h4>
                   <Switch  defaultChecked></Switch>
               </div>
               
              <div class='tipos'>
              <div class='tipo2Icon'></div>
                <h4>tipo 2</h4>
                <Switch  defaultChecked></Switch> 
              </div>
              
              <div class='tipos'>            
              <div class='tipo3Icon'></div>
                 <h4>tipo 3</h4>
                <Switch  defaultChecked ></Switch>

              </div>


            </div>
            <div class='modo' >
                <h4>modos</h4>

  <Select
       labelId="modoFiltrado"
       id="simple-select"


  >
<MenuItem value={10}>Todos</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
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

