import React, { useState } from 'react';
import './filtros.css'
import { Switch, Select, MenuItem } from "@mui/material";



export default function filtros({ caseCount, handleTipoFilter, tipoFilters, setTipoFilters }) {


  const handleTipoFilterChange = tipoId => event => {
    setTipoFilters(prevFilters => ({
      ...prevFilters,
      [tipoId]: event.target.checked,
    }));
    handleTipoFilter();
  };


  return (


    <div id="filtros">

      <div id='gap'></div>


      <div id='filtrosBox'>
        <div id='boxes'>
          <div id='botonFiltros'>
            <br />
          </div>
          
          <div id='display'>
            <h4>casos:</h4>
            <h1 id='cantCasos'>{caseCount}</h1>

          </div>
          <div id='opciones'>

            <div id='filtroTipo'>

            <div id='filtroTipo1' className='tipos'>
                <div id='tipo1Ref'>  <div className='tipo1Icon'></div>
                  <h4 className='tipoClass'>Ataque a símbolos y lugares </h4>
                </div>
                <Switch defaultChecked={tipoFilters.t1}
                  onChange={handleTipoFilterChange('t1')} ></Switch>

              </div>

              
              <div id='filtroTipo2' className='tipos'>
                <div id='tipo2Ref'> <div className='tipo2Icon'></div>
                  <h4 className='tipoClass'>Hostigamiento e intimidación </h4>
                </div>

                <Switch defaultChecked={tipoFilters.t2}
                  onChange={handleTipoFilterChange('t2')}></Switch>
              </div>

              <div id='filtroTipo3' className='tipos'>

                <div id='tipo3Ref'>  <div className='tipo3Icon'></div>
                  <h4 className='tipoClass'>Atentados contra la integridad física y la vida </h4>
                </div>
                <Switch defaultChecked={tipoFilters.t3}
                  onChange={handleTipoFilterChange('t3')}></Switch>
              </div>


             


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