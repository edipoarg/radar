La cosa es la siguiente. Si usamos los estilos que veníamos usando no tenemos tiles, pero si usamos los de Stadia la página dice Falklands en lugar de decir Malvinas. Impresentable. Aparte los océanos quedan en inglés, realmente una vergüenza.

La solución que se nos ocurrió fue bajarnos el archivo JSON de Stadia y meterle a todos los valores de todos los campos de text-field un array alrededor y antes de eso un 

```
"coalesce",
[
    "get",
    "name:es"
],
[
    // acá lo que había antes
]
```

De esa forma te busca antes que nada el nombre en español de las cosas, y tenemos la suerte de que en la traducción estándar al español las islas dicen Malvinas.

Véase la documentación de Stadia: https://docs.stadiamaps.com/tutorials/changing-the-map-label-language/
