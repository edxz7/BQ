import { MenuItem } from '../interfaces/Menu.interfcae';

export const breakfastMenu: MenuItem[] = [
  {
    category: 3,
    itemName: 'Cafe Americano',
    sizes: [
      { size: 'estandard', price: 5 },
    ],
    imgUrl: 'http://pieinthesky.com.mx/content/793465/cafe_americano_1.jpg',
  },
  {
    category: 3,
    itemName: 'Cafe con Leche',
    sizes: [
      { size: 'estandard', price: 5 },
    ],
    extras: {
      price: 7
    },
    imgUrl: 'https://nutricious.com.mx/wp-content/uploads/2019/05/cafe-con-leche.png',
  },
  {
    category: 3,
    itemName:'Jugo Natural', 
    sizes: [
      { size: 'estandard', price: 7 },
    ],
    imgUrl: 'https://nutricious.com.mx/wp-content/uploads/2019/05/jugo-de-naranja.png'
  },
  {
    category: 3,
    itemName:'Sandwich de jamon con queso',
    sizes: [
      { size: 'estandard', price: 10 },
    ],
    imgUrl: 'https://nutricious.com.mx/wp-content/uploads/2019/05/sandwich-de-jamon.png'
  }
];