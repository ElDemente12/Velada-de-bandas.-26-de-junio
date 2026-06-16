import regularCrowd from '../images/grupos/regular-crowd-WEB.jpg';
import anastasiaGeneral from '../images/grupos/anastasia-general-WEB.jpg';
import carajoBaby from '../images/grupos/carajo-baby-WEB.jpg';

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
        stats: { poder: 95, velocidad: 98, puestaEnEscena: 100, resistencia: 95, tecnica: 0, pesaje: '80 kg', altura: '1.83 m', edad: 44 },
        bio: '43 primaveras y sigue aporreando parches como si no hubiera un mañana. La veteranía no es un grado, es una sartén bien curada. Mientras los jóvenes se queman, él sigue friendo ritmos con la misma soltura con la que se fríe un huevo.'
      },
      {
        id: 'rc-pepe',
        name: 'Pepe Martínez',
        coords: { x: 25, y: 0, w: 25, h: 100 },
        stats: { poder: 85, velocidad: 90, puestaEnEscena: 100, resistencia: 75, tecnica: 0, pesaje: '72 kg', altura: '1.78 m', edad: 26 },
        bio: 'La navaja suiza de la banda. Cuando las cuerdas no bastan, suelta la garganta. Capaz de empalmar un solo con un estribillo sin despeinarse. Un luchador completo que no necesita segunda ración.'
      },
      {
        id: 'rc-adrian',
        name: 'Adrián Garre',
        coords: { x: 50, y: 0, w: 25, h: 100 },
        stats: { poder: 95, velocidad: 85, puestaEnEscena: 100, resistencia: 70, tecnica: 0, pesaje: '85 kg', altura: '1.90 m', edad: 26 },
        bio: 'La voz que parte la sala en dos y el único capaz de hacer un corro mientras rasga un acorde. Su presencia escénica es como el aceite de oliva virgen extra: fundamental, españolísima y deja a todos con buen sabor de boca.'
      },
      {
        id: 'rc-Esteban',
        name: 'Esteban Linares',
        coords: { x: 75, y: 0, w: 25, h: 100 },
        stats: { poder: 75, velocidad: 95, puestaEnEscena: 100, resistencia: 60, tecnica: 0, pesaje: '80 kg', altura: '1.80 m', edad: 24 },
        bio: 'El ancla del barco, el hueso del jamón, la patata del guiso. Mientras los demás hacen florituras, él sujeta el groove con la solidez de una buena tortilla. Sin él, todo se desmorona como un bocadillo sin pan.'
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
        svgPath: "m 0.56061472,126.22646 c 0.39713839,-4.62494 0.49676998,-4.20842 2.82245758,-6.58281 l 4.8794309,-2.53731 0.9758863,-1.36624 -0.9758863,-3.57824 -1.8867133,0.13011 -0.910827,-1.23612 L 0.71564989,99.995806 0.78070897,95.116376 2.407186,94.530843 0.91082713,87.894818 0.26023632,83.926213 0.19517724,76.444418 1.8867133,72.345697 l 4.5541355,-7.351675 8.3926212,-5.7252 9.108272,-1.821653 8.392622,0.71565 7.351675,3.773427 6.115553,6.766144 2.081892,8.197443 1.236123,8.522739 0.05837,1.432446 1.656133,-0.598048 1.748142,0.690055 1.150093,2.116172 0.09201,5.796467 -1.748142,8.648696 -1.288102,2.3922 h -1.840148 l -0.644054,0.18401 0.138012,4.04833 3.865586,0.59766 4.424018,2.34212 10.409452,7.1565 4.424019,4.81437 0.520472,3.90355 4.096695,-2.34487 5.888476,-1.1961 3.496281,1.74814 4.968401,6.07249 2.484202,11.86896 2.11617,11.86896 3.680298,16.37732 2.622219,8.83272 -0.92008,-0.23002 -1.794145,2.89823 0.552042,4.60038 3.036253,8.32667 1.84015,2.99024 2.62221,-0.13801 0.69005,0.18401 0.64406,2.4382 -12.65103,7.95864 -9.430761,7.08458 -10.166823,8.18866 -4.09433,3.45028 -5.106413,9.66078 -4.202668,9.84915 v 7.02638 l -0.84577,0.84577 -0.130116,2.66742 -1.431301,0.84577 0.130119,3.77344 H 0 Z",
        stats: { poder: 77, velocidad: 100, puestaEnEscena: 85, resistencia: 59, tecnica: 100, pesaje: '76 kg', altura: '1.80 m', edad: 28 },
        bio: 'De las cuatro cuerdas a los parches sin red. Pablo no solo cambió de instrumento, cambió de dimensión. Ahora reparte grooves desde atrás mientras suelta estribillos por el micro. Dicen que ha formado una conexión sobrenatural con un combatiente misterioso venido de otras trincheras, y que juntos han levantado una sección rítmica que promete dar más guerra que una tortilla a las tres de la mañana.'
      },
      {
        id: 'ag-victor',
        name: 'Victor Murcia',
        coords: { x: 68.26, y: 0, w: 31.74, h: 99.90 },
        svgPath: "m 159.6329,102.7723 4.04833,-5.888473 8.37267,-4.140335 22.2658,-5.520443 4.32435,-2.300187 4.78439,-3.680299 v -6.992564 l -1.61013,-1.334109 c 0,0 -0.23002,-9.384757 -0.27603,-9.568772 -0.046,-0.184015 -0.41403,-5.520447 -0.41403,-5.520447 0,0 1.10409,-1.2421 1.33411,-1.426115 0.23002,-0.184015 1.10409,-0.966078 1.10409,-0.966078 l 0.32202,-8.510688 1.28811,-4.968401 1.65613,-3.404275 5.15242,-4.416356 3.95632,-1.10409 1.93215,-3.22026 6.71655,-2.760223 10.02881,-0.276022 9.84479,3.036245 8.18866,6.440522 3.03625,6.256504 1.84015,6.164498 -0.09,4.025924 -1.49636,5.399902 -3.83848,9.043212 1.49636,0.390356 0.065,1.496359 -3.31801,7.156497 -1.95177,6.115556 -0.91083,1.821653 -1.82165,-0.195178 -0.97589,-0.260236 -1.36624,3.838485 -0.52047,1.626478 2.14695,1.821654 1.54048,2.894989 5.06041,2.852229 10.67286,5.060408 2.50181,0.67036 v 100.42363 l -1.55902,0.52048 -6.50591,-4.94449 -7.54685,-5.33485 -0.0651,2.21201 -2.27707,8.71792 -5.59508,10.40945 -7.80709,6.31073 -7.1565,2.60236 -0.24016,3.81853 -3.22026,8.18867 -5.33643,9.20074 -0.92008,1.2881 -1.01782,-6.4915 -0.45541,-8.84804 -2.01683,-8.2625 -1.82165,-5.66014 -1.43131,-1.88671 0.3025,-11.72657 -1.84015,-3.49628 -8.55669,-24.56599 -8.6487,-21.34572 -6.53252,-11.86896 -12.05298,-16.28532 -8.28067,-7.54461 -0.55204,-2.07016 -0.87407,-6.90056 -1.33411,-3.6803 z",
        stats: { poder: 50, velocidad: 100, puestaEnEscena: 0, resistencia: 75, tecnica: 94, pesaje: '74 kg', altura: '1.76 m', edad: 25 },
        bio: 'Sus dedos corren el mástil como si llevaran turbo. Riff maestro, melódico y punzante como un buen corte de jamón. Cuando Víctor afina, las demás bandas tiemblan porque saben que vienen curvas.'
      },
      {
        id: 'ag-damian',
        name: 'Damian Fernandez',
        coords: { x: 21.58, y: 53.71, w: 53.32, h: 46.19 },
        svgPath: "m 60.43262,264.07665 -0.02974,-3.6036 1.150094,-0.87408 -0.046,-2.34619 0.828066,-0.82806 0.046,-7.17658 4.434636,-10.67649 5.760041,-9.11617 9.192153,-7.8523 10.133126,-7.76809 10.488294,-6.8559 6.13349,-3.78078 -1.05809,-2.6222 -2.76022,0.64405 -1.2881,-1.74814 -2.44468,-5.27077 -2.081886,-6.89626 0.260236,-3.38307 1.23613,-1.7566 1.88671,0.39036 0.65059,0.45541 -0.26023,-5.7252 -0.65059,-10.27933 0.71565,-4.22884 2.73247,-5.3999 3.70838,-3.70837 4.61919,-3.70837 7.93721,-2.14695 7.54685,0.39035 8.2625,3.31802 5.46496,4.03366 3.64332,4.87943 1.49636,5.92038 0.78071,7.48179 0.065,6.0505 2.18292,0.12418 1.1501,1.56413 0.18401,2.85223 -1.70215,5.19842 -1.01207,4.46236 -0.78206,3.31227 -1.56414,0.82807 h -0.69005 l -0.36893,3.45313 0.26024,3.05778 2.14695,0.65059 5.23494,3.29895 3.93839,2.8166 3.61636,0.61248 5.47038,2.2844 4.39707,3.7873 3.8219,1.90362 6.96133,5.00955 5.13966,4.48907 2.08189,3.96861 4.68364,7.58938 4.8764,9.38476 1.57895,3.58366 0.44522,6.44515 0.69005,3.86431 c -46.95582,0.91678 -94.27868,-0.55456 -141.293625,-0.35271 z",
        stats: { poder: 69, velocidad: 100, puestaEnEscena: 91, resistencia: 44, tecnica: 20, pesaje: '82 kg', altura: '1.88 m', edad: 30 },
        bio: 'La voz que pone los pelos de punta y las palmas a contratiempo. Dueño del micro y del público, su carisma pesa más que una sartén de hierro fundido. Cuando canta, hasta las patatas se quedan fritas.'
      },
      {
        id: 'ag-rafica',
        name: 'Rafica',
        coords: { x: 27.05, y: 0, w: 46.09, h: 54.10 },
        svgPath: "m 48.599134,110.47032 0.06506,-4.55414 2.342126,-0.26023 1.680374,-4.10064 1.832816,-9.431652 -0.576285,-4.062525 -1.505605,-1.987969 6.570967,-1.040945 4.619194,1.951771 7.091442,0.195177 2.537303,-1.236122 4.228841,-0.06506 5.660139,2.992718 2.862598,-0.845767 3.448132,0.585531 2.091161,-0.467347 0.460039,-2.208178 -1.840151,-2.116172 -2.208178,-3.496281 1.012082,-3.680298 2.852232,-2.300184 -0.828067,-0.644054 -1.84015,-2.4842 1.380111,-3.404274 1.196097,1.012081 2.300187,0.184015 3.036244,-3.58829 -0.920072,-4.968401 2.300184,-2.944238 3.312265,-2.116172 4.50837,-2.208178 4.14033,-5.428438 7.36059,-5.612455 7.45261,-0.644052 2.85223,1.288106 2.94424,2.300184 2.66821,-2.300184 5.15242,-1.196097 5.06041,1.012082 5.98048,4.692377 9.98281,9.246749 2.30019,3.450277 -0.41404,2.300188 0.27602,2.024162 2.02417,2.484202 v 4.692377 l 1.33092,2.742637 1.04095,2.472243 -2.53731,0.910828 2.47225,1.366239 0.52047,3.448132 -1.82165,2.407187 -0.78071,2.602363 2.27707,1.496359 1.95177,-1.040945 -2.14695,4.033663 -2.47225,1.951773 -1.03066,2.083501 -1.74814,2.484199 0.92007,1.748147 -1.1961,1.2881 -1.8246,1.11397 3.70837,4.2939 0.52047,5.46496 1.10601,5.13967 10.53957,10.92992 11.97087,17.56596 5.20473,9.88898 7.9372,21.07914 5.73701,15.70287 4.15197,9.54005 0.39036,12.8817 3.51319,8.32756 3.3534,20.95886 0.48509,9.29361 0.84576,0.97589 v 10.14921 H 202.0735 l -0.76124,-10.11387 -2.39219,-5.61246 -6.90055,-11.1329 -5.06041,-8.37267 -9.47677,-8.83272 -12.88104,-7.82063 -6.44052,-1.65613 -11.96097,-6.90056 0.83371,-6.11349 2.14695,-0.65059 0.52047,-3.25296 1.62648,-7.09144 1.49636,-4.55413 -1.106,-2.21201 -2.92766,-0.52047 -0.0141,-10.75175 -2.66821,-10.21282 -7.31909,-6.91748 -10.49221,-4.12702 -10.53957,0.26023 -10.66969,6.50591 -4.55414,7.80709 -1.30118,10.14922 0.91083,7.1565 -5.204728,-14.83347 -4.163782,-19.64784 -2.054919,-9.44701 -3.956319,-7.54461 -4.692378,-3.03625 -2.484202,0.36803 -5.152416,2.57621 -2.668215,0.92008 -1.84015,-6.44052 -7.360595,-6.62454 -6.256504,-4.04832 z",
        stats: { poder: 98, velocidad: 54, puestaEnEscena: 78, resistencia: 75, tecnica: 59, pesaje: '73 kg', altura: '1.77 m', edad: 26 },
        bio: 'Ya no ocupa su sitio en la batería, pero su espíritu sigue retumbando en cada golpe. Sentó las bases, marcó el tempo y dejó el listón tan alto que aún hoy se le echa de menos. Una leyenda que ningún compás podrá borrar.'
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
        bio: 'El que marca el compás y el ritmo de la batalla. Sus baquetas son como palillos de tortilla: reparten a partes iguales y no dejan títere con cabeza. Cuando Teixi empieza a golpear, el ring tiembla y los cimientos de la sala piden clemencia.'
      },
      {
        id: 'cb-Alvaro',
        name: 'Alvaro',
        coords: { x: 33.3, y: 0, w: 33.3, h: 100 },
        stats: { poder: 76, velocidad: 85, puestaEnEscena: 72, resistencia: 88, tecnica: 80, pesaje: '71 kg', altura: '1.75 m', edad: 26 },
        bio: 'Doble amenaza: rasga el mástil con la furia de un toro bravo y canta como si cada nota fuera la última. Lleva el peso de la banda en los hombros y encima pide más. Un frontman de los que ya no quedan, como la tortilla de patatas bien hecha.'
      },
      {
        id: 'cb-Miguel',
        name: 'Miguel',
        coords: { x: 66.6, y: 0, w: 33.3, h: 100 },
        stats: { poder: 80, velocidad: 78, puestaEnEscena: 95, resistencia: 75, tecnica: 72, pesaje: '77 kg', altura: '1.79 m', edad: 24 },
        bio: 'El que engrasa la maquinaria con su bajo y remata las canciones con coros que saben a gloria. Su todoterreno en el escenario es tan fiable como una sartén bien curada. Sin él, el sonido cojea; con él, la banda vuela.'
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
