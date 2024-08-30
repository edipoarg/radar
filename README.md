
RADAR
==
RADAR es un proyecto periodístico colaborativo impulsado por el Equipo de Investigación Política (EdIPo) de la Revista Crisis con apoyo del Centro de Estudios Legales y Sociales (CELS) con el objetivo de fortalecer la democracia y la defensa de los derechos humanos. Presentamos un mapeo colaborativo de hechos de violencia política protagonizados por derechas radicalizadas con el fin de contribuir al diagnóstico colectivo y la elaboración de estrategias de autocuidado.

Llamamos derechas radicalizadas a aquellos sectores de la ultraderecha que apelan directa o indirectamente a la violencia como método de acción política. No se trata de un calificativo orientado al contenido de sus ideas, sino a las agresiones y ataques desplegados con intención de silenciar, amedrentar, disciplinar o aniquilar reivindicaciones de derechos individuales y/o colectivos, instaurar miedo e influir en la discusión pública.

si querés comunicarte con nosotrxs podés escribirnos a radar.edipo@gmail.com

# Contribuciones

Usamos la versión de Node detallada en el archivo `.nvmrc`, y para manejar dependencias usamos Yarn.

Se recomienda usar:

- Alguna distribución de Linux, aunque sea en WSL.
- [NVM](https://github.com/nvm-sh/nvm)
- Un editor de texto como VSCode o VSCodium, para el que se recomiendan las siguientes extensiones:
    - **CSS Modules** de clinyong
    - **ESLint** de dbaeumer
    - **Vitest** de vitest


## Documentación de React JS y MapLibre GL JS

* [React.js](https://reactjs.org/)
* [MapLibre GL JS](https://maplibre.org/)
* [MapTiler](https://www.maptiler.com/)
* [react-map-gl](https://visgl.github.io/react-map-gl/docs/get-started)

## Variables de ambiente
Para correr el proyecto, necesitás pasarle al script `yarn build` la variable de ambiente `CASES_SPREADSHEET_ID`:
y
`COLORS_BY_TYPE_SPREADSHEET_ID`:

`env CASES_SPREADSHEET_ID='000000000000000000000' COLORS_BY_TYPE_SPREADSHEET_ID='00000000000000000' yarn build`

reemplazando los ceros por las keys correspondientes.


## Herramientas de análisis de código

- ts-unused-exports: Permite ver qué variables o constantes se exportan pero no se usan. Ojo, que a veces tiene falsos positivos, como por ejemplo con los tipos que se importan en JSDoc. Usar con `npx ts-unused-exports ./tsconfig.json`.
- unimported: Permite ver qué archivos no se importan nunca. Usar con `npx unimported`.
- knip: muy parecido a los otros dos. Puede tirar falsos positivos con JSDoc. Se corre con `npx knip`.


## License

Distributed under the AGPLv3 License. See `LICENSE` for more information.
