import { MenuItem } from '../interfaces/Menu.interfcae';

export const MainMenu: MenuItem[] = [
  {
    category: 1,
    itemName: 'Hamburguesa',
    type: ['res', 'pollo', 'veggie'],
    sizes: [
      { size: 'Sencilla', price: 10 },
      { size: 'Doble', price: 15 }
    ],
    extras: {
      price: 1,
      options: ['Queso', 'Huevo']
    },
    imgUrl: 'https://cookieandkate.com/images/2013/05/best-veggie-burger-recipe-3.jpg'
  },
  {
    category: 2,
    itemName: 'Agua',
    type: null,
    sizes: [
      { size: '500ml', price: 5 },
      { size: '750ml', price: 8 }
    ],
    extras: null,
    imgUrl: 'https://revistafortuna.com.mx/contenido/wp-content/uploads/2019/12/agua.jpg'
  },
  {
    category: 2,
    itemName: 'Gaseosa',
    type: null,
    sizes: [
      { size: '500ml', price: 8 },
      { size: '750ml', price: 10 }
    ],
    extras: null,
    imgUrl: 'https://www.elespectador.com/resizer/m_SZrY-fxGRcPpTtWFSYAnWdcb0=/657x0/cloudfront-us-east-1.images.arcpublishing.com/elespectador/HQTLOAYS7RCS3IWNMNTOL7LNFQ.jpg'
  },
  {
    category: 3,
    itemName: 'Papas Fritas',
    type: null,
    sizes: [
      { size: 'estandard', price: 1 }    
    ],
    imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_679006-MLM31227784346_062019-F.webp'
  },
  {
    category: 3,
    itemName: 'Onion Rings',
    type: null,
    sizes: [
      { size: 'estandard', price: 1 }    
    ],
    imgUrl: 'https://www.justataste.com/wp-content/uploads/2013/01/best-beer-battered-onion-rings-recipe.jpg'
  }
];