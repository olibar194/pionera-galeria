// Dummy data for news based on the provided schema
import { createBlockContent } from "@/lib/dummy-data"

export const newsItems = [
  {
    _id: "news-1",
    title: {
      es: "Carmen Herrera: Retrospectiva en el MoMA",
      en: "Carmen Herrera: Retrospective at MoMA",
    },
    slug: { current: "carmen-herrera-retrospectiva-moma" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Carmen Herrera Retrospective",
    },
    summary: {
      es: "El Museo de Arte Moderno de Nueva York presenta una retrospectiva completa de la obra de Carmen Herrera, destacando su contribución al arte geométrico abstracto.",
      en: "The Museum of Modern Art in New York presents a comprehensive retrospective of Carmen Herrera's work, highlighting her contribution to geometric abstract art.",
    },
    content: {
      es: createBlockContent(
        "El Museo de Arte Moderno de Nueva York (MoMA) inaugura una retrospectiva completa dedicada a la artista cubana Carmen Herrera. La exposición, titulada 'Carmen Herrera: Líneas de Vida', recorre más de siete décadas de producción artística, desde sus primeras obras figurativas hasta sus icónicas pinturas geométricas abstractas.\n\nHerrera, quien no recibió reconocimiento significativo hasta los 89 años, es ahora celebrada como una pionera del minimalismo geométrico. La exposición incluye más de 50 obras, muchas de las cuales se exhiben por primera vez al público.\n\nPionera Galería se enorgullece de representar a Carmen Herrera y celebra este merecido reconocimiento a su extraordinaria carrera artística.",
      ),
      en: createBlockContent(
        "The Museum of Modern Art in New York (MoMA) inaugurates a comprehensive retrospective dedicated to Cuban artist Carmen Herrera. The exhibition, titled 'Carmen Herrera: Lines of Life', spans more than seven decades of artistic production, from her early figurative works to her iconic geometric abstract paintings.\n\nHerrera, who did not receive significant recognition until she was 89 years old, is now celebrated as a pioneer of geometric minimalism. The exhibition includes more than 50 works, many of which are being exhibited to the public for the first time.\n\nPionera Gallery is proud to represent Carmen Herrera and celebrates this well-deserved recognition of her extraordinary artistic career.",
      ),
    },
    publicationDate: "2024-03-15T10:00:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: null,
    relatedArtists: ["artist-1"], // Carmen Herrera
    relatedArtworks: ["artwork-1", "artwork-2", "artwork-3"],
    relatedExhibitions: [],
    relatedFairs: [],
  },
  {
    _id: "news-2",
    title: {
      es: "Gabriel Orozco gana el Premio Nacional de Arte",
      en: "Gabriel Orozco wins the National Art Prize",
    },
    slug: { current: "gabriel-orozco-premio-nacional-arte" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Gabriel Orozco Award Ceremony",
    },
    summary: {
      es: "El artista mexicano Gabriel Orozco ha sido galardonado con el prestigioso Premio Nacional de Arte por su contribución a las artes visuales contemporáneas.",
      en: "Mexican artist Gabriel Orozco has been awarded the prestigious National Art Prize for his contribution to contemporary visual arts.",
    },
    content: {
      es: createBlockContent(
        "El reconocido artista mexicano Gabriel Orozco ha sido galardonado con el Premio Nacional de Arte 2024, uno de los reconocimientos más importantes en el ámbito cultural de México.\n\nEl jurado destacó la capacidad de Orozco para transformar objetos cotidianos en obras de arte significativas, así como su influencia en generaciones más jóvenes de artistas latinoamericanos. La ceremonia de entrega del premio se llevará a cabo el próximo mes en el Palacio de Bellas Artes de la Ciudad de México.\n\nGabriel Orozco, representado por Pionera Galería desde 2015, ha desarrollado una carrera internacional que abarca múltiples medios, incluyendo escultura, fotografía, instalación y pintura. Su trabajo se caracteriza por una profunda reflexión sobre la relación entre los objetos, el espacio y la experiencia humana.",
      ),
      en: createBlockContent(
        "Renowned Mexican artist Gabriel Orozco has been awarded the 2024 National Art Prize, one of the most important recognitions in Mexico's cultural sphere.\n\nThe jury highlighted Orozco's ability to transform everyday objects into meaningful works of art, as well as his influence on younger generations of Latin American artists. The award ceremony will take place next month at the Palace of Fine Arts in Mexico City.\n\nGabriel Orozco, represented by Pionera Gallery since 2015, has developed an international career spanning multiple media, including sculpture, photography, installation, and painting. His work is characterized by a deep reflection on the relationship between objects, space, and human experience.",
      ),
    },
    publicationDate: "2024-04-02T14:30:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: null,
    relatedArtists: ["artist-2"], // Gabriel Orozco
    relatedArtworks: ["artwork-4", "artwork-5"],
    relatedExhibitions: ["exhibition-2"],
    relatedFairs: [],
  },
  {
    _id: "news-3",
    title: {
      es: "Pionera Galería en ARCO Madrid 2024",
      en: "Pionera Gallery at ARCO Madrid 2024",
    },
    slug: { current: "pionera-galeria-arco-madrid-2024" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Pionera Gallery at ARCO Madrid",
    },
    summary: {
      es: "Pionera Galería participa en la 43ª edición de ARCO Madrid con una selección de obras de Carmen Herrera y Gabriel Orozco.",
      en: "Pionera Gallery participates in the 43rd edition of ARCO Madrid with a selection of works by Carmen Herrera and Gabriel Orozco.",
    },
    content: {
      es: createBlockContent(
        "Pionera Galería se complace en anunciar su participación en la 43ª edición de ARCO Madrid, la feria internacional de arte contemporáneo más importante de España, que se celebrará del 21 al 25 de febrero de 2024 en IFEMA Madrid.\n\nEn el stand 7B12, Pionera Galería presentará una cuidada selección de obras de dos artistas latinoamericanos de renombre internacional: Carmen Herrera y Gabriel Orozco. La propuesta curatorial explora el diálogo entre la abstracción geométrica de Herrera y las intervenciones objetuales de Orozco, ofreciendo una visión de dos aproximaciones fundamentales al arte contemporáneo desde Latinoamérica.\n\nEntre las obras destacadas se incluyen 'Composición en Rojo y Blanco' (1963) de Carmen Herrera y 'Círculo Cuadrado' (2000) de Gabriel Orozco, junto con otras piezas significativas de ambos artistas.\n\nLes invitamos a visitar nuestro stand durante la feria y a participar en las conversaciones con los artistas que organizaremos el viernes 23 de febrero a las 17:00h.",
      ),
      en: createBlockContent(
        "Pionera Gallery is pleased to announce its participation in the 43rd edition of ARCO Madrid, Spain's most important international contemporary art fair, which will be held from February 21 to 25, 2024, at IFEMA Madrid.\n\nAt stand 7B12, Pionera Gallery will present a carefully selected collection of works by two internationally renowned Latin American artists: Carmen Herrera and Gabriel Orozco. The curatorial proposal explores the dialogue between Herrera's geometric abstraction and Orozco's object interventions, offering a vision of two fundamental approaches to contemporary art from Latin America.\n\nHighlighted works include Carmen Herrera's 'Composition in Red and White' (1963) and Gabriel Orozco's 'Square Circle' (2000), along with other significant pieces by both artists.\n\nWe invite you to visit our stand during the fair and to participate in the conversations with the artists that we will organize on Friday, February 23 at 5:00 pm.",
      ),
    },
    publicationDate: "2024-02-10T09:00:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: "fair-1", // ARCO Madrid
    relatedArtists: ["artist-1", "artist-2"], // Carmen Herrera, Gabriel Orozco
    relatedArtworks: ["artwork-1", "artwork-2", "artwork-4"],
    relatedExhibitions: [],
    relatedFairs: ["fair-1"],
  },
  {
    _id: "news-4",
    title: {
      es: "Doris Salcedo recibe el Premio Princesa de Asturias de las Artes",
      en: "Doris Salcedo receives the Princess of Asturias Award for the Arts",
    },
    slug: { current: "doris-salcedo-premio-princesa-asturias" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Doris Salcedo Award",
    },
    summary: {
      es: "La artista colombiana Doris Salcedo ha sido galardonada con el Premio Princesa de Asturias de las Artes 2024 por su obra que aborda el trauma y la memoria histórica.",
      en: "Colombian artist Doris Salcedo has been awarded the 2024 Princess of Asturias Award for the Arts for her work addressing trauma and historical memory.",
    },
    content: {
      es: createBlockContent(
        "La Fundación Princesa de Asturias ha anunciado que la artista colombiana Doris Salcedo ha sido galardonada con el Premio Princesa de Asturias de las Artes 2024. El jurado ha destacado 'su capacidad para transformar el dolor, el trauma y la pérdida en un poderoso espacio público de memoria colectiva'.\n\nSalcedo, conocida por sus instalaciones y esculturas que abordan temas de violencia política y memoria histórica, especialmente en el contexto colombiano, ha desarrollado a lo largo de su carrera un lenguaje artístico único que combina objetos cotidianos con materiales como cemento, madera y tela para crear obras de profundo impacto emocional.\n\nEntre sus obras más conocidas se encuentran 'Shibboleth', una grieta de 167 metros que atravesó el suelo de la Sala de Turbinas de la Tate Modern en Londres, y 'Palimpsesto', un homenaje a los migrantes ahogados en el Mediterráneo.\n\nPionera Galería, que representa a Doris Salcedo desde 2018, celebra este merecido reconocimiento a una de las voces más importantes del arte contemporáneo latinoamericano.",
      ),
      en: createBlockContent(
        "The Princess of Asturias Foundation has announced that Colombian artist Doris Salcedo has been awarded the 2024 Princess of Asturias Award for the Arts. The jury highlighted 'her ability to transform pain, trauma, and loss into a powerful public space of collective memory'.\n\nSalcedo, known for her installations and sculptures that address issues of political violence and historical memory, especially in the Colombian context, has developed throughout her career a unique artistic language that combines everyday objects with materials such as cement, wood, and fabric to create works of profound emotional impact.\n\nAmong her best-known works are 'Shibboleth', a 167-meter crack that crossed the floor of the Turbine Hall at the Tate Modern in London, and 'Palimpsest', a tribute to migrants drowned in the Mediterranean.\n\nPionera Gallery, which has represented Doris Salcedo since 2018, celebrates this well-deserved recognition of one of the most important voices in contemporary Latin American art.",
      ),
    },
    publicationDate: "2024-05-08T11:15:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: null,
    relatedArtists: ["artist-3"], // Doris Salcedo
    relatedArtworks: ["artwork-6", "artwork-7"],
    relatedExhibitions: ["exhibition-3"],
    relatedFairs: [],
  },
  {
    _id: "news-5",
    title: {
      es: "Nueva exposición: 'Memoria y Ausencia'",
      en: "New exhibition: 'Memory and Absence'",
    },
    slug: { current: "nueva-exposicion-memoria-ausencia" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Memory and Absence Exhibition",
    },
    summary: {
      es: "Pionera Galería presenta 'Memoria y Ausencia', una exposición individual de Doris Salcedo que explora temas de trauma colectivo y memoria histórica.",
      en: "Pionera Gallery presents 'Memory and Absence', a solo exhibition by Doris Salcedo exploring themes of collective trauma and historical memory.",
    },
    content: {
      es: createBlockContent(
        "Pionera Galería se complace en presentar 'Memoria y Ausencia', una exposición individual de la artista colombiana Doris Salcedo que se inaugurará el 15 de junio de 2024.\n\nLa exposición, curada por Ana López, reúne una serie de instalaciones y esculturas que exploran la relación entre la memoria histórica, el trauma colectivo y la ausencia. A través de su característico lenguaje visual, que transforma objetos cotidianos en poderosos testimonios, Salcedo invita a los espectadores a reflexionar sobre las consecuencias de la violencia política y social.\n\nEntre las obras destacadas se incluyen nuevas piezas creadas específicamente para esta exposición, así como algunas de sus esculturas más emblemáticas, como 'Fragmentos' (2002).\n\n'Memoria y Ausencia' estará abierta al público del 15 de junio al 30 de septiembre de 2024. Se organizarán visitas guiadas y actividades educativas durante todo el período de la exposición.",
      ),
      en: createBlockContent(
        "Pionera Gallery is pleased to present 'Memory and Absence', a solo exhibition by Colombian artist Doris Salcedo that will open on June 15, 2024.\n\nThe exhibition, curated by Ana López, brings together a series of installations and sculptures that explore the relationship between historical memory, collective trauma, and absence. Through her characteristic visual language, which transforms everyday objects into powerful testimonies, Salcedo invites viewers to reflect on the consequences of political and social violence.\n\nHighlighted works include new pieces created specifically for this exhibition, as well as some of her most emblematic sculptures, such as 'Fragments' (2002).\n\n'Memory and Absence' will be open to the public from June 15 to September 30, 2024. Guided tours and educational activities will be organized throughout the exhibition period.",
      ),
    },
    publicationDate: "2024-05-20T10:00:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: "exhibition-3", // Memoria y Ausencia exhibition
    relatedArtists: ["artist-3"], // Doris Salcedo
    relatedArtworks: ["artwork-6", "artwork-7"],
    relatedExhibitions: ["exhibition-3"],
    relatedFairs: [],
  },
  {
    _id: "news-6",
    title: {
      es: "Entrevista con Gabriel Orozco en El País",
      en: "Interview with Gabriel Orozco in El País",
    },
    slug: { current: "entrevista-gabriel-orozco-el-pais" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Gabriel Orozco Interview",
    },
    summary: {
      es: "El diario El País publica una extensa entrevista con Gabriel Orozco sobre su proceso creativo y su visión del arte contemporáneo.",
      en: "El País newspaper publishes an extensive interview with Gabriel Orozco about his creative process and his vision of contemporary art.",
    },
    publicationDate: "2024-03-25T08:45:00.000Z",
    isExternalLink: true,
    externalUrl: "https://elpais.com/cultura/2024-03-25/gabriel-orozco-entrevista.html",
    internalLinkRef: null,
    relatedArtists: ["artist-2"], // Gabriel Orozco
    relatedArtworks: [],
    relatedExhibitions: [],
    relatedFairs: [],
  },
  {
    _id: "news-7",
    title: {
      es: "Pionera Galería participará en Art Basel 2024",
      en: "Pionera Gallery will participate in Art Basel 2024",
    },
    slug: { current: "pionera-galeria-art-basel-2024" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Art Basel Announcement",
    },
    summary: {
      es: "Pionera Galería ha sido seleccionada para participar en Art Basel 2024, donde presentará obras de Gabriel Orozco y Doris Salcedo.",
      en: "Pionera Gallery has been selected to participate in Art Basel 2024, where it will present works by Gabriel Orozco and Doris Salcedo.",
    },
    content: {
      es: createBlockContent(
        "Pionera Galería se complace en anunciar su participación en Art Basel 2024, una de las ferias de arte contemporáneo más prestigiosas del mundo, que se celebrará del 13 al 16 de junio en Basilea, Suiza.\n\nEn el stand 2.1 D14, Pionera Galería presentará una selección de obras de Gabriel Orozco y Doris Salcedo, dos artistas latinoamericanos de renombre internacional cuyo trabajo explora temas de memoria, transformación y espacio.\n\nLa propuesta curatorial para Art Basel 2024 se centra en el diálogo entre las intervenciones objetuales de Orozco y las poderosas instalaciones de Salcedo, ofreciendo una reflexión sobre la capacidad del arte para transformar nuestra percepción de lo cotidiano y abordar cuestiones sociales y políticas.\n\nEntre las obras que se presentarán se incluyen 'Estrella Fugaz' (2005) de Gabriel Orozco y nuevas piezas de Doris Salcedo creadas específicamente para esta ocasión.\n\nLes invitamos a visitar nuestro stand durante la feria y a participar en las actividades que organizaremos.",
      ),
      en: createBlockContent(
        "Pionera Gallery is pleased to announce its participation in Art Basel 2024, one of the most prestigious contemporary art fairs in the world, which will be held from June 13 to 16 in Basel, Switzerland.\n\nAt stand 2.1 D14, Pionera Gallery will present a selection of works by Gabriel Orozco and Doris Salcedo, two internationally renowned Latin American artists whose work explores themes of memory, transformation, and space.\n\nThe curatorial proposal for Art Basel 2024 focuses on the dialogue between Orozco's object interventions and Salcedo's powerful installations, offering a reflection on art's ability to transform our perception of the everyday and address social and political issues.\n\nWorks to be presented include Gabriel Orozco's 'Shooting Star' (2005) and new pieces by Doris Salcedo created specifically for this occasion.\n\nWe invite you to visit our stand during the fair and to participate in the activities we will organize.",
      ),
    },
    publicationDate: "2024-04-15T09:30:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: "fair-2", // Art Basel
    relatedArtists: ["artist-2", "artist-3"], // Gabriel Orozco, Doris Salcedo
    relatedArtworks: ["artwork-5", "artwork-6", "artwork-7"],
    relatedExhibitions: [],
    relatedFairs: ["fair-2"],
  },
  {
    _id: "news-8",
    title: {
      es: "Adquisición de obra de Carmen Herrera por el Centro Pompidou",
      en: "Acquisition of Carmen Herrera's work by the Centre Pompidou",
    },
    slug: { current: "adquisicion-obra-carmen-herrera-pompidou" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Carmen Herrera Artwork Acquisition",
    },
    summary: {
      es: "El Centro Pompidou de París ha adquirido 'Amarillo Radiante' (1985) de Carmen Herrera para su colección permanente.",
      en: "The Centre Pompidou in Paris has acquired Carmen Herrera's 'Radiant Yellow' (1985) for its permanent collection.",
    },
    content: {
      es: createBlockContent(
        "El Centro Pompidou de París ha anunciado la adquisición de 'Amarillo Radiante' (1985), una obra emblemática de la artista cubana Carmen Herrera, para su colección permanente.\n\nEsta adquisición representa un importante reconocimiento a la trayectoria de Herrera y consolida su posición como una figura clave en la historia del arte geométrico abstracto. 'Amarillo Radiante' es una obra vibrante que destaca por su uso del color y su composición dinámica, características del estilo maduro de la artista.\n\nLa obra formará parte de la nueva presentación de la colección permanente del Centro Pompidou, que se inaugurará en septiembre de 2024, donde se exhibirá junto a piezas de otros maestros de la abstracción geométrica.\n\nPionera Galería, que ha representado a Carmen Herrera desde 2010, celebra esta importante adquisición que contribuye a la difusión internacional de la obra de la artista.",
      ),
      en: createBlockContent(
        "The Centre Pompidou in Paris has announced the acquisition of 'Radiant Yellow' (1985), an emblematic work by Cuban artist Carmen Herrera, for its permanent collection.\n\nThis acquisition represents an important recognition of Herrera's career and consolidates her position as a key figure in the history of geometric abstract art. 'Radiant Yellow' is a vibrant work that stands out for its use of color and dynamic composition, characteristics of the artist's mature style.\n\nThe work will be part of the new presentation of the Centre Pompidou's permanent collection, which will open in September 2024, where it will be exhibited alongside pieces by other masters of geometric abstraction.\n\nPionera Gallery, which has represented Carmen Herrera since 2010, celebrates this important acquisition that contributes to the international dissemination of the artist's work.",
      ),
    },
    publicationDate: "2024-05-05T14:00:00.000Z",
    isExternalLink: false,
    externalUrl: "",
    internalLinkRef: null,
    relatedArtists: ["artist-1"], // Carmen Herrera
    relatedArtworks: ["artwork-3"], // Amarillo Radiante
    relatedExhibitions: [],
    relatedFairs: [],
  },
]

// Helper functions for news data
export const getNewsBySlug = (slug: string) => {
  return newsItems.find((news) => news.slug.current === slug)
}

export const getLatestNews = (limit = 6) => {
  return [...newsItems]
    .sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
    .slice(0, limit)
}

export const getNewsByArtist = (artistId: string) => {
  return newsItems.filter((news) => news.relatedArtists && news.relatedArtists.includes(artistId))
}

export const getNewsByExhibition = (exhibitionId: string) => {
  return newsItems.filter((news) => news.relatedExhibitions && news.relatedExhibitions.includes(exhibitionId))
}

export const getNewsByFair = (fairId: string) => {
  return newsItems.filter((news) => news.relatedFairs && news.relatedFairs.includes(fairId))
}

export const getNewsByArtwork = (artworkId: string) => {
  return newsItems.filter((news) => news.relatedArtworks && news.relatedArtworks.includes(artworkId))
}
