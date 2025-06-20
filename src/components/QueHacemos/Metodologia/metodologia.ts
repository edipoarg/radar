import type { DefinitionList } from "../definition-list";

export const metodologia: DefinitionList = {
  title: "Metodología",
  terms: {
    "¿De dónde proviene la información?": {
      definitions: [
        {
          paragraphs: [
            "La base de datos se construyó recuperando entre 2020 y 2023 aquellos ataques que fueron noticia en los principales medios de comunicación o en prensa independiente/activista.",
            "A partir del año 2023, el registro combina los reportes espontáneos por parte de personas que sufrieron ataques o allegadxs a esas personas.",
            "Este registro se realiza a través de un formulario al que se accede a través del sitio web de RADAR.",
            "El equipo de relevamiento de RADAR realiza un contacto con aquellas personas para constatar los hechos y luego pasan a formar parte de la base de datos.",
            "Por otro lado, también se recuperan casos que son sumados a la base de datos a través de revisión periódica de ataques que cuentan con cobertura periodística en medios oficiales e independientes.",
          ],
        },
      ],
      members: [],
    },
    "Descripción general del modelo de la base de datos:": {
      definitions: [
        {
          paragraphs: [
            "Para su sistematización, la información está organizada en una base de datos que releva información de la siguiente manera:",
          ],
        },
      ],
      members: [
        "Fecha del hecho",
        "Fuente",
        "Descripción del hecho",
        "Víctimas",
        "Tipo de ataque",
        "Modalidad de ataque",
        "Componente de la violencia",
        "Coordenadas geográficas",
        "Provincia",
        "Agresor(es)",
        "Uso de armas",
        "Denuncia/Judicialización del ataque",
      ],
    },
    "Cómo se construyen las variables y las categorías": {
      definitions: [
        {
          paragraphs: [
            "Las perspectivas de RADAR acerca de las diversas problemáticas relativas al avance de las derechas radicalizadas y su pase del ataque virtual al campo físico informan y alimentan la base de datos.",
            "Estas discusiones son dinámicas, como lo son las problemáticas abordadas, pero se trata no de cambios repentinos sino del resultado de procesos y debates en el campo de la investigación política.",
            "Por lo tanto, la construcción de variables y categorías de análisis pretende ser un reflejo de ello y puede cambiar a lo largo del tiempo.",
            "Por ejemplo, la categorización de la narrativa de odio contra medios de comunicación no existía y se agregó frente a un contexto de ataques continuos contra los periodistas y trabajadores de prensa, promovidos por grupos de derecha radicalizada.",
            "Algo similar sucede en el caso de la clasificación de los hechos registrados por la base, que obedece a una tipología de casos establecida en función de ataques geolocalizables.",
            "Las investigaciones llevadas adelante por el equipo de trabajo de RADAR desde el establecimiento de la base de datos en julio de 2023 han echado luz sobre nuevas formas en que estos hechos ocurren, lo cual finalmente ha dado lugar a un nuevo subsistema de categorización de los hechos.",
            "Dicho subsistema tiene como núcleo una manera de distinguir problemáticas que es transversal a la tipología principal de hechos, y pretende contrarrestar algunas limitaciones identificadas en aquel anterior sistema de categorías sin tener que cambiarlas completamente, lo que hubiera producido un corte en la serie temporal.",
            "Por ejemplo, en un principio se buscaba darle visibilidad exclusivamente a la violencia que pasaba a las acciones directas físicas.",
            'Sin embargo, más adelante observamos el crecimiento de una modalidad de ataque que tiene su origen en lo virtual pero busca explícitamente promover acciones que traspasan la pantalla: el "doxeo".',
            "Esta práctica, ya desplegada ampliamente en otras partes del mundo, desembarcó con fuerza en las redes sociales de Argentina (específicamente en Twitter, ahora X), siendo ejecutada mayormente por militantes de ultraderecha para vulnerar, desacreditar y silenciar a distintas personas, marcadas como objetivo por su identidad política o partidaria.",
            "A partir de la irrupción de los doxeos en el ecosistema de violencia política decidimos ampliar nuestro registro para poder abordarlos en nuestro análisis.",
            "Actualmente, hemos desarrollado una investigación sobre el tema. A su vez, estamos trabajando para próximamente compartir en nuestra plataforma información sobre prevención y primeros auxilios ante este tipo de ataques.",
          ],
        },
      ],
      members: [],
    },
  },
};
