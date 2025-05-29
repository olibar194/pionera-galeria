// Dummy data based on the Sanity schemas

// Helper function to create block content
export const createBlockContent = (text: string) => [
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  },
]

// Artists
export const artists = [
  {
    _id: "artist-1",
    name: "Carmen Herrera",
    slug: { current: "carmen-herrera" },
    portraitImage: {
      url: "/placeholder.svg?height=400&width=300",
      alt: "Carmen Herrera portrait",
    },
    birthYear: 1915,
    country: {
      es: "Cuba",
      en: "Cuba",
    },
    city: {
      es: "La Habana",
      en: "Havana",
    },
    bio: {
      es: createBlockContent(
        "Carmen Herrera es una artista cubana conocida por sus pinturas geométricas minimalistas. Aunque comenzó a pintar en la década de 1930, no recibió reconocimiento significativo hasta que tenía 89 años. Su trabajo se caracteriza por formas geométricas simples y colores contrastantes.",
      ),
      en: createBlockContent(
        "Carmen Herrera is a Cuban artist known for her minimalist geometric paintings. Although she began painting in the 1930s, she did not receive significant recognition until she was 89 years old. Her work is characterized by simple geometric shapes and contrasting colors.",
      ),
    },
    statement: {
      es: createBlockContent(
        "Mi arte es sobre la creación de estructuras simples de color y línea que generan ritmo y movimiento. Busco la simplicidad y la precisión en cada obra.",
      ),
      en: createBlockContent(
        "My art is about creating simple structures of color and line that generate rhythm and movement. I seek simplicity and precision in each work.",
      ),
    },
    portfolio: {
      url: "#",
      filename: "carmen-herrera-portfolio.pdf",
    },
    highlights: [
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork 1" },
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork 2" },
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork 3" },
    ],
    videos: [
      {
        title: {
          es: "Entrevista con Carmen Herrera",
          en: "Interview with Carmen Herrera",
        },
        url: "https://www.youtube.com/watch?v=example1",
        thumbnail: {
          url: "/placeholder.svg?height=300&width=500",
          alt: "Video thumbnail",
        },
      },
    ],
    exhibitions: ["exhibition-1", "exhibition-2"],
    fairs: ["fair-1"],
    artworks: ["artwork-1", "artwork-2", "artwork-3"],
  },
  {
    _id: "artist-2",
    name: "Gabriel Orozco",
    slug: { current: "gabriel-orozco" },
    portraitImage: {
      url: "/placeholder.svg?height=400&width=300",
      alt: "Gabriel Orozco portrait",
    },
    birthYear: 1962,
    country: {
      es: "México",
      en: "Mexico",
    },
    city: {
      es: "Ciudad de México",
      en: "Mexico City",
    },
    bio: {
      es: createBlockContent(
        "Gabriel Orozco es un artista mexicano que trabaja en múltiples medios, incluyendo instalación, escultura, fotografía y pintura. Su trabajo explora la belleza de los objetos cotidianos y los espacios urbanos.",
      ),
      en: createBlockContent(
        "Gabriel Orozco is a Mexican artist who works in multiple media, including installation, sculpture, photography, and painting. His work explores the beauty of everyday objects and urban spaces.",
      ),
    },
    statement: {
      es: createBlockContent(
        "Mi trabajo busca revelar la poesía oculta en lo cotidiano, transformando objetos comunes en experiencias estéticas significativas.",
      ),
      en: createBlockContent(
        "My work seeks to reveal the hidden poetry in the everyday, transforming common objects into meaningful aesthetic experiences.",
      ),
    },
    portfolio: {
      url: "#",
      filename: "gabriel-orozco-portfolio.pdf",
    },
    highlights: [
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork 1" },
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork 2" },
    ],
    videos: [
      {
        title: {
          es: "Gabriel Orozco: Proceso creativo",
          en: "Gabriel Orozco: Creative Process",
        },
        url: "https://www.youtube.com/watch?v=example2",
        thumbnail: {
          url: "/placeholder.svg?height=300&width=500",
          alt: "Video thumbnail",
        },
      },
    ],
    exhibitions: ["exhibition-2"],
    fairs: ["fair-1", "fair-2"],
    artworks: ["artwork-4", "artwork-5"],
  },
  {
    _id: "artist-3",
    name: "Doris Salcedo",
    slug: { current: "doris-salcedo" },
    portraitImage: {
      url: "/placeholder.svg?height=400&width=300",
      alt: "Doris Salcedo portrait",
    },
    birthYear: 1958,
    country: {
      es: "Colombia",
      en: "Colombia",
    },
    city: {
      es: "Bogotá",
      en: "Bogota",
    },
    bio: {
      es: createBlockContent(
        "Doris Salcedo es una escultora colombiana cuyo trabajo aborda temas de pérdida, trauma y memoria, especialmente en relación con la violencia política en Colombia. Sus instalaciones a menudo incorporan objetos cotidianos transformados.",
      ),
      en: createBlockContent(
        "Doris Salcedo is a Colombian sculptor whose work addresses themes of loss, trauma, and memory, especially in relation to political violence in Colombia. Her installations often incorporate transformed everyday objects.",
      ),
    },
    statement: {
      es: createBlockContent(
        "Mi trabajo es un acto de memoria y duelo. Busco dar forma material al dolor y la ausencia, creando espacios para la contemplación y el recuerdo.",
      ),
      en: createBlockContent(
        "My work is an act of memory and mourning. I seek to give material form to pain and absence, creating spaces for contemplation and remembrance.",
      ),
    },
    portfolio: {
      url: "#",
      filename: "doris-salcedo-portfolio.pdf",
    },
    highlights: [
      { url: "/placeholder.svg?height=600&width=800", alt: "Installation 1" },
      { url: "/placeholder.svg?height=600&width=800", alt: "Installation 2" },
      { url: "/placeholder.svg?height=600&width=800", alt: "Installation 3" },
    ],
    videos: [],
    exhibitions: ["exhibition-3"],
    fairs: ["fair-2"],
    artworks: ["artwork-6", "artwork-7"],
  },
]

// Exhibitions
export const exhibitions = [
  {
    _id: "exhibition-1",
    title: {
      es: "Geometrías del Color",
      en: "Geometries of Color",
    },
    slug: { current: "geometrias-del-color" },
    subtitle: {
      es: "Abstracción geométrica en Latinoamérica",
      en: "Geometric abstraction in Latin America",
    },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Geometrías del Color",
    },
    gallery: [
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 1" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 2" },
    ],
    videos: [],
    description: {
      es: createBlockContent(
        "Una exploración de la abstracción geométrica en el arte latinoamericano, destacando artistas que han utilizado formas geométricas y colores vibrantes para crear un lenguaje visual distintivo.",
      ),
      en: createBlockContent(
        "An exploration of geometric abstraction in Latin American art, highlighting artists who have used geometric forms and vibrant colors to create a distinctive visual language.",
      ),
    },
    startDate: "2023-09-15T10:00:00.000Z",
    endDate: "2023-12-15T18:00:00.000Z",
    openingHours: "Martes a Sábado, 11am - 7pm",
    location: {
      es: "Galería Pionera, Madrid",
      en: "Pionera Gallery, Madrid",
    },
    curator: "María Rodríguez",
    artists: ["artist-1"], // Carmen Herrera
    artworks: ["artwork-1", "artwork-2", "artwork-3"],
  },
  {
    _id: "exhibition-2",
    title: {
      es: "Objetos y Espacios",
      en: "Objects and Spaces",
    },
    slug: { current: "objetos-y-espacios" },
    subtitle: {
      es: "Intervenciones en lo cotidiano",
      en: "Interventions in the everyday",
    },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Objetos y Espacios",
    },
    gallery: [
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 1" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 2" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 3" },
    ],
    videos: [
      {
        title: {
          es: "Recorrido por la exposición",
          en: "Exhibition tour",
        },
        url: "https://www.youtube.com/watch?v=example5",
        thumbnail: {
          url: "/placeholder.svg?height=300&width=500",
          alt: "Video thumbnail",
        },
      },
    ],
    description: {
      es: createBlockContent(
        "Una exposición que examina cómo los artistas contemporáneos transforman objetos cotidianos y espacios urbanos en obras de arte significativas, cuestionando nuestra percepción de lo ordinario.",
      ),
      en: createBlockContent(
        "An exhibition examining how contemporary artists transform everyday objects and urban spaces into meaningful artworks, questioning our perception of the ordinary.",
      ),
    },
    startDate: "2024-02-10T10:00:00.000Z",
    endDate: "2024-05-20T18:00:00.000Z",
    openingHours: "Martes a Domingo, 10am - 8pm",
    location: {
      es: "Galería Pionera, Madrid",
      en: "Pionera Gallery, Madrid",
    },
    curator: "Carlos Méndez",
    artists: ["artist-1", "artist-2"], // Carmen Herrera, Gabriel Orozco
    artworks: ["artwork-1", "artwork-4", "artwork-5"],
  },
  {
    _id: "exhibition-3",
    title: {
      es: "Memoria y Ausencia",
      en: "Memory and Absence",
    },
    slug: { current: "memoria-y-ausencia" },
    subtitle: {
      es: "Arte y trauma colectivo",
      en: "Art and collective trauma",
    },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Memoria y Ausencia",
    },
    gallery: [
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 1" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Exhibition view 2" },
    ],
    videos: [],
    description: {
      es: createBlockContent(
        "Una exposición que explora cómo los artistas abordan la memoria histórica, el trauma colectivo y la ausencia a través de instalaciones, esculturas y otros medios.",
      ),
      en: createBlockContent(
        "An exhibition exploring how artists address historical memory, collective trauma, and absence through installations, sculptures, and other media.",
      ),
    },
    startDate: "2024-06-15T10:00:00.000Z",
    endDate: "2024-09-30T18:00:00.000Z",
    openingHours: "Miércoles a Domingo, 12pm - 8pm",
    location: {
      es: "Galería Pionera, Madrid",
      en: "Pionera Gallery, Madrid",
    },
    curator: "Ana López",
    artists: ["artist-3"], // Doris Salcedo
    artworks: ["artwork-6", "artwork-7"],
  },
]

// Fairs
export const fairs = [
  {
    _id: "fair-1",
    name: {
      es: "ARCO Madrid",
      en: "ARCO Madrid",
    },
    startDate: "2024-02-21T10:00:00.000Z",
    endDate: "2024-02-25T20:00:00.000Z",
    slug: { current: "arco-madrid-2024" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "ARCO Madrid 2024",
    },
    gallery: [
      { url: "/placeholder.svg?height=800&width=1200", alt: "Fair view 1" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Fair view 2" },
    ],
    videos: [
      {
        title: {
          es: "Pionera Galería en ARCO 2024",
          en: "Pionera Gallery at ARCO 2024",
        },
        url: "https://www.youtube.com/watch?v=example6",
        thumbnail: {
          url: "/placeholder.svg?height=300&width=500",
          alt: "Video thumbnail",
        },
      },
    ],
    description: {
      es: createBlockContent(
        "ARCO Madrid es la feria internacional de arte contemporáneo más importante de España y una de las principales de Europa. Pionera Galería presenta una selección de obras de Carmen Herrera y Gabriel Orozco.",
      ),
      en: createBlockContent(
        "ARCO Madrid is the most important international contemporary art fair in Spain and one of the main ones in Europe. Pionera Gallery presents a selection of works by Carmen Herrera and Gabriel Orozco.",
      ),
    },
    location: {
      es: "IFEMA, Madrid",
      en: "IFEMA, Madrid",
    },
    boothNumber: "Stand 7B12",
    artists: ["artist-1", "artist-2"], // Carmen Herrera, Gabriel Orozco
    artworks: ["artwork-1", "artwork-2", "artwork-4"],
  },
  {
    _id: "fair-2",
    name: {
      es: "Art Basel",
      en: "Art Basel",
    },
    startDate: "2024-06-13T10:00:00.000Z",
    endDate: "2024-06-16T19:00:00.000Z",
    slug: { current: "art-basel-2024" },
    mainImage: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Art Basel 2024",
    },
    gallery: [
      { url: "/placeholder.svg?height=800&width=1200", alt: "Fair view 1" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Fair view 2" },
      { url: "/placeholder.svg?height=800&width=1200", alt: "Fair view 3" },
    ],
    videos: [],
    description: {
      es: createBlockContent(
        "Art Basel es una de las ferias de arte contemporáneo más prestigiosas del mundo. Pionera Galería participa con obras de Gabriel Orozco y Doris Salcedo, explorando temas de memoria, transformación y espacio.",
      ),
      en: createBlockContent(
        "Art Basel is one of the most prestigious contemporary art fairs in the world. Pionera Gallery participates with works by Gabriel Orozco and Doris Salcedo, exploring themes of memory, transformation, and space.",
      ),
    },
    location: {
      es: "Messe Basel, Basilea, Suiza",
      en: "Messe Basel, Basel, Switzerland",
    },
    boothNumber: "Stand 2.1 D14",
    artists: ["artist-2", "artist-3"], // Gabriel Orozco, Doris Salcedo
    artworks: ["artwork-5", "artwork-6", "artwork-7"],
  },
]

// Artworks
export const artworks = [
  {
    _id: "artwork-1",
    title: {
      es: "Composición en Rojo y Blanco",
      en: "Composition in Red and White",
    },
    year: 1963,
    medium: {
      es: "Acrílico sobre lienzo",
      en: "Acrylic on canvas",
    },
    dimensions: "120 x 120 cm",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Composición en Rojo y Blanco",
    },
    artist: "artist-1",
    description: {
      es: createBlockContent(
        "Una obra icónica de Carmen Herrera que ejemplifica su enfoque minimalista y su uso audaz del color. Las formas geométricas simples se combinan para crear una composición dinámica y equilibrada.",
      ),
      en: createBlockContent(
        "An iconic work by Carmen Herrera that exemplifies her minimalist approach and bold use of color. Simple geometric shapes combine to create a dynamic and balanced composition.",
      ),
    },
    gallery: [
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork detail 1" },
      { url: "/placeholder.svg?height=600&width=800", alt: "Artwork detail 2" },
    ],
    videos: [],
  },
  {
    _id: "artwork-2",
    title: {
      es: "Estructura Verde",
      en: "Green Structure",
    },
    year: 1972,
    medium: {
      es: "Óleo sobre madera",
      en: "Oil on wood",
    },
    dimensions: "90 x 90 cm",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Estructura Verde",
    },
    artist: "artist-1",
    description: {
      es: createBlockContent(
        "Una exploración de la forma y el color en la que Herrera utiliza el verde para crear una sensación de profundidad y movimiento. La estructura geométrica se convierte en un elemento central de la obra.",
      ),
      en: createBlockContent(
        "An exploration of form and color in which Herrera uses green to create a sense of depth and movement. The geometric structure becomes a central element of the work.",
      ),
    },
    gallery: [],
    videos: [],
  },
  {
    _id: "artwork-3",
    title: {
      es: "Amarillo Radiante",
      en: "Radiant Yellow",
    },
    year: 1985,
    medium: {
      es: "Acrílico sobre lienzo",
      en: "Acrylic on canvas",
    },
    dimensions: "150 x 150 cm",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Amarillo Radiante",
    },
    artist: "artist-1",
    description: {
      es: createBlockContent(
        "Una obra vibrante que destaca por su uso del amarillo y su composición dinámica. Herrera crea una sensación de energía y movimiento a través de la interacción de las formas geométricas.",
      ),
      en: createBlockContent(
        "A vibrant work that stands out for its use of yellow and its dynamic composition. Herrera creates a sense of energy and movement through the interaction of geometric shapes.",
      ),
    },
    gallery: [],
    videos: [],
  },
  {
    _id: "artwork-4",
    title: {
      es: "Círculo Cuadrado",
      en: "Square Circle",
    },
    year: 2000,
    medium: {
      es: "Fotografía digital",
      en: "Digital photography",
    },
    dimensions: "Variable",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Círculo Cuadrado",
    },
    artist: "artist-2",
    description: {
      es: createBlockContent(
        "Una intervención urbana en la que Orozco transforma un objeto cotidiano en una obra de arte efímera. El círculo y el cuadrado se combinan para crear una imagen sorprendente y reflexiva.",
      ),
      en: createBlockContent(
        "An urban intervention in which Orozco transforms an everyday object into an ephemeral work of art. The circle and the square combine to create a surprising and reflective image.",
      ),
    },
    gallery: [],
    videos: [],
  },
  {
    _id: "artwork-5",
    title: {
      es: "Estrella Fugaz",
      en: "Shooting Star",
    },
    year: 2005,
    medium: {
      es: "Escultura de arcilla",
      en: "Clay sculpture",
    },
    dimensions: "30 x 30 x 30 cm",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Estrella Fugaz",
    },
    artist: "artist-2",
    description: {
      es: createBlockContent(
        "Una pequeña escultura que captura la belleza y la fragilidad de un momento fugaz. Orozco utiliza la arcilla para crear una forma delicada y evocadora.",
      ),
      en: createBlockContent(
        "A small sculpture that captures the beauty and fragility of a fleeting moment. Orozco uses clay to create a delicate and evocative form.",
      ),
    },
    gallery: [],
    videos: [],
  },
  {
    _id: "artwork-6",
    title: {
      es: "Sillas Huérfanas",
      en: "Orphan Chairs",
    },
    year: 1995,
    medium: {
      es: "Instalación",
      en: "Installation",
    },
    dimensions: "Variable",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Sillas Huérfanas",
    },
    artist: "artist-3",
    description: {
      es: createBlockContent(
        "Una instalación conmovedora que aborda temas de pérdida y desplazamiento. Salcedo utiliza sillas para representar a las víctimas de la violencia política en Colombia.",
      ),
      en: createBlockContent(
        "A moving installation that addresses themes of loss and displacement. Salcedo uses chairs to represent the victims of political violence in Colombia.",
      ),
    },
    gallery: [],
    videos: [],
  },
  {
    _id: "artwork-7",
    title: {
      es: "Fragmentos",
      en: "Fragments",
    },
    year: 2002,
    medium: {
      es: "Escultura de cemento",
      en: "Concrete sculpture",
    },
    dimensions: "Variable",
    image: {
      url: "/placeholder.svg?height=600&width=600",
      alt: "Fragmentos",
    },
    artist: "artist-3",
    description: {
      es: createBlockContent(
        "Una escultura monumental que explora la fragmentación de la memoria y la experiencia. Salcedo utiliza el cemento para crear una forma imponente y evocadora.",
      ),
      en: createBlockContent(
        "A monumental sculpture that explores the fragmentation of memory and experience. Salcedo uses concrete to create an imposing and evocative form.",
      ),
    },
    gallery: [],
    videos: [],
  },
]

// Helper function to format date
export const formatDate = (dateString: string, language: "es" | "en") => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", options)
}

// Helper function to get current exhibitions
export const getCurrentExhibitions = () => {
  const now = new Date()
  return exhibitions.filter(
    (exhibition) => new Date(exhibition.startDate) <= now && new Date(exhibition.endDate) >= now,
  )
}

// Helper function to get upcoming exhibitions
export const getUpcomingExhibitions = () => {
  const now = new Date()
  return exhibitions
    .filter((exhibition) => new Date(exhibition.startDate) > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

// Helper function to get past exhibitions
export const getPastExhibitions = () => {
  const now = new Date()
  return exhibitions
    .filter((exhibition) => new Date(exhibition.endDate) < now)
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
}

// Helper function to get upcoming fairs
export const getUpcomingFairs = () => {
  const now = new Date()
  return fairs
    .filter((fair) => new Date(fair.startDate) > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

export const getArtistById = (id: string) => {
  return artists.find((artist) => artist._id === id)
}

export const getArtworkById = (id: string) => {
  return artworks.find((artwork) => artwork._id === id)
}

export const getArtistBySlug = (slug: string) => {
  return artists.find((artist) => artist.slug.current === slug)
}

export const getArtworksByArtistId = (artistId: string) => {
  return artworks.filter((artwork) => artwork.artist === artistId)
}

export const getExhibitionsByArtistId = (artistId: string) => {
  return exhibitions.filter((exhibition) => exhibition.artists.includes(artistId))
}

export const getFairsByArtistId = (artistId: string) => {
  return fairs.filter((fair) => fair.artists.includes(artistId))
}

export const getExhibitionBySlug = (slug: string) => {
  return exhibitions.find((exhibition) => exhibition.slug.current === slug)
}

export const getFairBySlug = (slug: string) => {
  return fairs.find((fair) => fair.slug.current === slug)
}
