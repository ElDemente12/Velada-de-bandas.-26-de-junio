import regularCrowd from '../images/grupos/RegularCrowd.png';
import anastasiaGeneral from '../images/grupos/AnastasiaGeneral.jpeg';
import carajoBaby from '../images/grupos/Carajobaby.png';

export const bands = [
  {
    id: 'regular-crowd',
    name: 'Regular Crowd',
    image: regularCrowd,
    members: [
      {
        id: 'rc-Ernesto',
        name: 'Ernesto Sánchez',
        coords: { x: 0, y: 0, w: 25, h: 100 },
        stats: { poder: 92, velocidad: 78, puestaEnEscena: 95, resistencia: 85, tecnica: 88, pesaje: '78 kg', altura: '1.83 m', edad: 27 },
        bio: 'El frontman que enciende el ring con su presencia magnética. Su voz es un arma de destrucción masiva.'
      },
      {
        id: 'rc-pepe',
        name: 'Pepe Martínez',
        coords: { x: 25, y: 0, w: 25, h: 100 },
        stats: { poder: 75, velocidad: 82, puestaEnEscena: 70, resistencia: 79, tecnica: 93, pesaje: '72 kg', altura: '1.78 m', edad: 29 },
        bio: 'Guitarrista de precisión quirúrgica. Sus dedos se mueven más rápido que el juicio de un crítico.'
      },
      {
        id: 'rc-adrian',
        name: 'Adrián Garre',
        coords: { x: 50, y: 0, w: 25, h: 100 },
        stats: { poder: 88, velocidad: 65, puestaEnEscena: 72, resistencia: 91, tecnica: 80, pesaje: '85 kg', altura: '1.90 m', edad: 31 },
        bio: 'La batería retumba como sus puños. Resistencia sobrehumana y un swing que noquea.'
      },
      {
        id: 'rc-Esteban',
        name: 'Esteban Linares',
        coords: { x: 75, y: 0, w: 25, h: 100 },
        stats: { poder: 70, velocidad: 72, puestaEnEscena: 68, resistencia: 82, tecnica: 85, pesaje: '80 kg', altura: '1.85 m', edad: 26 },
        bio: 'El bajista que cimenta el sonido. Su groove es tan sólido que podría sostener un edificio.'
      },
    ],
  },
  {
    id: 'anastasia-general',
    name: 'Anastasia General',
    image: anastasiaGeneral,
    members: [
      {
        id: 'ag-pablo',
        name: 'Pablo Jimenez',
        coords: { x: 0, y: 0, w: 27.73, h: 99.71 },
        stats: { poder: 85, velocidad: 80, puestaEnEscena: 92, resistencia: 78, tecnica: 82, pesaje: '76 kg', altura: '1.80 m', edad: 28 },
        bio: 'Vocalista de carisma arrollador. Cada palabra que lanza es un directo al hígado.'
      },
      {
        id: 'ag-victor',
        name: 'Victor Murcia',
        coords: { x: 68.26, y: 0, w: 31.74, h: 99.90 },
        stats: { poder: 78, velocidad: 90, puestaEnEscena: 75, resistencia: 76, tecnica: 88, pesaje: '74 kg', altura: '1.76 m', edad: 25 },
        bio: 'Guitarrista letal. Su velocidad de ejecución deja al público sin aliento y a sus rivales sin respuesta.'
      },
      {
        id: 'ag-damian',
        name: 'Damian Fernandez',
        coords: { x: 21.58, y: 53.71, w: 53.32, h: 46.19 },
        stats: { poder: 82, velocidad: 75, puestaEnEscena: 85, resistencia: 80, tecnica: 90, pesaje: '82 kg', altura: '1.88 m', edad: 30 },
        bio: 'Multiinstrumentista versátil. Donde lo pongan, él ofrece una actuación de campeonato.'
      },
      {
        id: 'ag-rafica',
        name: 'Rafica',
        coords: { x: 27.05, y: 0, w: 46.09, h: 54.10 },
        stats: { poder: 79, velocidad: 88, puestaEnEscena: 82, resistencia: 77, tecnica: 91, pesaje: '73 kg', altura: '1.77 m', edad: 26 },
        bio: 'El comodín de la banda. Capaz de adaptarse a cualquier situación con una técnica impecable.'
      },
    ],
  },
  {
    id: 'carajo-baby',
    name: 'Carajo Baby',
    image: carajoBaby,
    members: [
      {
        id: 'cb-Teixi',
        name: 'Teixi',
        coords: { x: 0, y: 0, w: 33.3, h: 100 },
        stats: { poder: 90, velocidad: 72, puestaEnEscena: 88, resistencia: 83, tecnica: 78, pesaje: '79 kg', altura: '1.82 m', edad: 27 },
        bio: 'Frontman explosivo. Su presencia escénica es un vendaval que arrastra todo a su paso.'
      },
      {
        id: 'cb-Alvaro',
        name: 'Alvaro',
        coords: { x: 33.3, y: 0, w: 33.3, h: 100 },
        stats: { poder: 76, velocidad: 85, puestaEnEscena: 72, resistencia: 88, tecnica: 80, pesaje: '71 kg', altura: '1.75 m', edad: 26 },
        bio: 'El motor rítmico de la banda. Su resistencia en el ring es legendaria entre los suyos.'
      },
      {
        id: 'cb-Miguel',
        name: 'Miguel',
        coords: { x: 66.6, y: 0, w: 33.3, h: 100 },
        stats: { poder: 80, velocidad: 78, puestaEnEscena: 95, resistencia: 75, tecnica: 72, pesaje: '77 kg', altura: '1.79 m', edad: 24 },
        bio: 'Showman nato. Si la música no te atrapa, su carisma lo hará. El público es su ring.'
      },
    ],
  },
];

export const statLabels = {
  poder: 'PODER',
  velocidad: 'VELOCIDAD',
  puestaEnEscena: 'PUESTA EN ESCENA',
  resistencia: 'RESISTENCIA',
  tecnica: 'TÉCNICA',
};
