import type { DefinitionListWithCategories } from "../definition-list";

export const patronDeCasos: DefinitionListWithCategories = {
  title: "Patrón de Casos",
  categories: {
    "Por tipo de ataques:": {
      terms: {
        "Ataque a símbolos y lugares": {
          definitions: [
            {
              paragraphs: [
                "Acciones de vandalización o pintadas sobre murales, centros culturales, locales, cartelería, placas, monumentos, objetos.",
              ],
            },
          ],
          members: [
            "Rotura, robo, tachaduras",
            "Pintadas de amenazas, insultos, frases y símbolos",
            "Incendio, pedradas, disparos",
            "Intervenciones públicas identitarias",
          ],
        },
        "Hostigamiento e intimidación": {
          definitions: [
            {
              paragraphs: [
                "Acciones directas o indirectas contra personas o lugares físicos con el fin de agredir o amedrentar. Abarca desde la amenaza hasta la confrontación, y puede incluir o no armas.",
              ],
            },
          ],
          members: [
            "Amenazas personales o a su familia",
            "Agresiones discursivas",
            "Persecución o espionaje",
            "Acoso físico y/o virtual",
          ],
        },
        "Atentados contra la integridad física y la vida": {
          definitions: [
            {
              paragraphs: [
                "Agresiones o intentos de agresión física o con armas a personas, con la intención de herir o asesinar.",
              ],
            },
          ],
          members: [
            "Agresión física",
            "Lesiones",
            "Asesinato",
            "Intento de asesinato",
            "Violencia sexual",
          ],
        },
      },
    },
    "Por componente de violencia - Narrativas de odio:": {
      terms: {
        "": {
          definitions: [
            {
              paragraphs: [
                "Los componentes de violencia o narrativas de odio que consideramos refieren al mensaje explícito o implícito en la agresión o ataque registrado. Un mismo ataque puede incluir más de un componente, entre los que distinguimos:",
              ],
            },
          ],
          members: [
            "Negacionismo y apología a la dictadura",
            "Contra militancias políticas",
            "Racismo y xenofobia",
            "Misoginia, antifeminismo y antilgbtinbq+",
            "Nazismo, antisemitismo y supremacismo",
            "Contra medios de comunicación y periodistas",
          ],
        },
      },
    },
  },
};
