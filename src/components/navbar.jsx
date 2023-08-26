import React from 'react';
import './navbar.css';



export default function Navbar(){
 return (
  <div className="heading">
   <div id="logo">
 <img id= "logoImg" src="../src/assets/logo.png" alt="" />  
 </div> 

 <div id="menu">

<div id="menuPCBox">
   <ul id="menuPC">
        <li><a href="">informes</a></li>
        <li><a href="">nosotrxs</a></li>
        <button id='botonReporta'>reportá</button>

    </ul>
</div>
   
 
    <div id="botonMenu" >

       <img id= "menuImg" src="../src/assets/menu.png" alt="" />

     </div>
 

 </div>
   



  </div>

 );
}