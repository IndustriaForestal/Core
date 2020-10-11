const initialState = {
  products: [
    {
      id: 15,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'CUÑA 1.56 X 6 X 34',
      description: 'TABLA CON CUÑA',
      length: 86.36,
      width: 15.24,
      height: 11.43,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'A',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 16,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '4 X 10',
      description: 'TARIMA DE MADERA 4 X 10',
      length: 304.8,
      width: 121.92,
      height: 6.033,
      feet: null,
      capacityCharge: 400,
      stock: 194,
      quality: 'A',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 17,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '4 X 8',
      description: 'TARIMA DE MADERA 4 X 8',
      length: 243.84,
      width: 121.92,
      height: 6.985,
      feet: null,
      capacityCharge: 400,
      stock: 33,
      quality: 'A',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 18,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '3 X 10',
      description: 'TARIMA DE MADERA 3 X 10',
      length: 304.8,
      width: 91.44,
      height: 6.985,
      feet: null,
      capacityCharge: 400,
      stock: 116,
      quality: 'A',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 19,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '42 X 48',
      description: 'TARIMA DE MADERA 42 X 48',
      length: 121.92,
      width: 106.68,
      height: 22.86,
      feet: null,
      capacityCharge: 400,
      stock: 155,
      quality: 'A',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 20,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '40 X 48',
      description: 'AMAME 40 X 48',
      length: 121.92,
      width: 88.9,
      height: 1.905,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'A',
      customer: {
        idCustomer: 20,
        name: 'VITRO S.A.B. DE C.V.',
        address: 'KERAMOS PONIENTE # 225 DEL PRADO MONTERREY, MEXICO.',
        email: 'ABASTOSEMPAQUE1@vitro.com',
        phone: '2147483647',
        numberShipments: 3,
      },
    },

    {
      id: 21,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '40 X 48',
      description: 'ATRME 40 X 48',
      length: 121.92,
      width: 78.74,
      height: 6.452,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'A',
      customer: {
        idCustomer: 20,
        name: 'VITRO S.A.B. DE C.V.',
        address: 'KERAMOS PONIENTE # 225 DEL PRADO MONTERREY, MEXICO.',
        email: 'ABASTOSEMPAQUE1@vitro.com',
        phone: '2147483647',
        numberShipments: 3,
      },
    },

    {
      id: 24,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '44 X 56-6',
      description: 'AMAME 44 X 56-6',
      length: 142.24,
      width: 88.9,
      height: 2.54,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'A',
      customer: {
        idCustomer: 20,
        name: 'VITRO S.A.B. DE C.V.',
        address: 'KERAMOS PONIENTE # 225 DEL PRADO MONTERREY, MEXICO.',
        email: 'ABASTOSEMPAQUE1@vitro.com',
        phone: '2147483647',
        numberShipments: 3,
      },
    },

    {
      id: 26,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'EXPORTACION',
      description: 'TARIMA CERVECERA EXPORTACION USA 1100 X 1200',
      length: 120.0,
      width: 110.0,
      height: 14.3,
      feet: null,
      capacityCharge: 350,
      stock: 417,
      quality: 'A',
      customer: {
        idCustomer: 16,
        name: 'CERVECERÍA CUAUHTEMOC MOCTEZUMA S.A. DE C.V.',
        address:
          'AV. ALFONSO LOPEZ REYES NORTE, BELLA VISTA, MONTERREY, MEXICO.',
        email: 'consuelo.zapata@heineken.com',
        phone: '27281088',
        numberShipments: 5,
      },
    },

    {
      id: 28,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'CHEEP',
      description: 'TARIMA CHEEP 1000 X 1200 ',
      length: 120.0,
      width: 100.0,
      height: 9.5,
      feet: null,
      capacityCharge: 350,
      stock: 887,
      quality: 'A',
      customer: {
        idCustomer: 17,
        name: 'INGENIO SAN NICOLAS S.A DE C.V',
        address:
          'AV. BOULEBARD MANUEL AVILA CAMACHO LOCALES N 601 PISO 5, LOMAS DE CHAPULTEPEC, DELEGACION MIGUEL HIDALGO, CIUDAD DE MEXICO.',
        email: 'Yazmin.Castro@asr-group.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 29,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'HEAVY PALLET',
      description: 'TARIMA DE MADERA HEAVY PALLET 1200 X 1000',
      length: 120.0,
      width: 100.0,
      height: 14.3,
      feet: null,
      capacityCharge: 432,
      stock: 2315,
      quality: 'A',
      customer: {
        idCustomer: 16,
        name: 'CERVECERÍA CUAUHTEMOC MOCTEZUMA S.A. DE C.V.',
        address:
          'AV. ALFONSO LOPEZ REYES NORTE, BELLA VISTA, MONTERREY, MEXICO.',
        email: 'consuelo.zapata@heineken.com',
        phone: '27281088',
        numberShipments: 5,
      },
    },

    {
      id: 43,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MARCO EXPORTACION',
      description: 'MARCO DE MADERA MARCO EXPORTACION',
      length: 2.0,
      width: 1.0,
      height: 1.0,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'A',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 5,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '73430-500-67',
      description: 'PALLET FOR PLENUM STANDAR',
      length: 208.28,
      width: 160.02,
      height: 13.97,
      feet: null,
      capacityCharge: 70,
      stock: 18,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 6,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MTR13395',
      description: 'PALLET 71-13/16',
      length: 182.404,
      width: 96.838,
      height: 12.065,
      feet: null,
      capacityCharge: 400,
      stock: 325,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 7,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MTR13394',
      description: 'PALLET 61-9/16',
      length: 156.369,
      width: 88.265,
      height: 12.065,
      feet: null,
      capacityCharge: 350,
      stock: 569,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 8,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MTR13390',
      description: 'PALLET 48',
      length: 121.92,
      width: 101.6,
      height: 12.065,
      feet: null,
      capacityCharge: 350,
      stock: 2641,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 9,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MFR63352',
      description: 'PALLET 75&quot; X 48&quot; 4-WAY HT',
      length: 190.5,
      width: 121.92,
      height: 12.065,
      feet: null,
      capacityCharge: 350,
      stock: 236,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 10,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MFR63350',
      description: 'PALLET 60&quot; X 48&quot; 4-WAY HT',
      length: 152.4,
      width: 121.92,
      height: 12.065,
      feet: null,
      capacityCharge: 350,
      stock: 33,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 11,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MFR34650',
      description: 'PALLET 90&quot; X 45&quot; 4-WAY HT',
      length: 228.6,
      width: 114.3,
      height: 12.065,
      feet: null,
      capacityCharge: 350,
      stock: 370,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 12,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MTR13380',
      description: 'CREATE SOLID TOP, 71-1/2&quot; X 38-1/2&quot;',
      length: 184.15,
      width: 97.79,
      height: 0.5,
      feet: null,
      capacityCharge: 1000,
      stock: 212,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 13,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MTR13387',
      description: 'CREATE SOLID END, 37-5/8&quot; X 23&quot;',
      length: 95.568,
      width: 58.42,
      height: 0.5,
      feet: null,
      capacityCharge: 1000,
      stock: 109,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 14,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'MTR13386',
      description: 'CREATE SOLID SIDE, 71-3/8&quot; X 23&quot;',
      length: 180.658,
      width: 58.42,
      height: 0.5,
      feet: null,
      capacityCharge: 1000,
      stock: 75,
      quality: 'B',
      customer: {
        idCustomer: 14,
        name: 'Schneider Electric SA de CV.',
        address:
          'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
        email: 'schneider@se.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 25,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'FERRERO',
      description: 'FERRERO 40 X 48',
      length: 121.92,
      width: 101.6,
      height: 13.653,
      feet: null,
      capacityCharge: 352,
      stock: 33,
      quality: 'B',
      customer: {
        idCustomer: 17,
        name: 'INGENIO SAN NICOLAS S.A DE C.V',
        address:
          'AV. BOULEBARD MANUEL AVILA CAMACHO LOCALES N 601 PISO 5, LOMAS DE CHAPULTEPEC, DELEGACION MIGUEL HIDALGO, CIUDAD DE MEXICO.',
        email: 'Yazmin.Castro@asr-group.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 30,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '40 X 48',
      description: 'MARCO DE MADERA AMAME 40 X 48',
      length: 121.92,
      width: 88.9,
      height: 1.905,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 31,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'AMAME 44X56',
      description: 'MARCO DE MADERA AMAME 44 X 56',
      length: 142.24,
      width: 96.52,
      height: 1.905,
      feet: null,
      capacityCharge: 1000,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 32,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'AMAME 44X56 COCA',
      description: 'MARCO DE MADERA AMAME 44 X 56 COCA',
      length: 121.92,
      width: 86.36,
      height: 2.54,
      feet: null,
      capacityCharge: 1000,
      stock: 405,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 33,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'AMAME 44X 56-7',
      description: 'MARCO DE MADERA AMAME 44X56-7',
      length: 142.24,
      width: 111.76,
      height: 2.54,
      feet: null,
      capacityCharge: 800,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 34,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'AMAME 44X56-6',
      description: 'MARCO DE MADERA AMAME 44X56-6',
      length: 121.92,
      width: 101.6,
      height: 2.54,
      feet: null,
      capacityCharge: 800,
      stock: 77,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 35,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATRME 40X48',
      description: 'TARIMA DE MADERA ATRME 40X48',
      length: 121.92,
      width: 101.6,
      height: 10.16,
      feet: null,
      capacityCharge: 528,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 36,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATR 44X56',
      description: 'TARIMA DE MADERA ATR 44X56',
      length: 142.24,
      width: 111.76,
      height: 13.018,
      feet: null,
      capacityCharge: 336,
      stock: 2612,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 37,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATRME 44X56CCM',
      description: 'TARIMA DE MADERA ATRME 44X56CCM',
      length: 142.24,
      width: 111.76,
      height: 12.7,
      feet: null,
      capacityCharge: 336,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 38,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATRME 44X56MC',
      description: 'TARIMA DE MADERA ATRME 44X56MC',
      length: 142.24,
      width: 111.76,
      height: 12.7,
      feet: null,
      capacityCharge: 336,
      stock: 1184,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 39,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATBME 40X48',
      description: 'TARIMA DE MADERA ATBME 40X48',
      length: 121.92,
      width: 101.6,
      height: 12.065,
      feet: null,
      capacityCharge: 528,
      stock: 1430,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 40,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATBME 40X48REF',
      description: 'TARIMA DE MADERA ATBME 40X48REF',
      length: 121.92,
      width: 101.6,
      height: 12.7,
      feet: null,
      capacityCharge: 528,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 41,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ATRME 44X56',
      description: 'TARIMA DE MADERA ATRME 44X56',
      length: 142.24,
      width: 111.76,
      height: 12.7,
      feet: null,
      capacityCharge: 336,
      stock: 4709,
      quality: 'B',
      customer: {
        idCustomer: 21,
        name: 'OWENS AMERICA S. DE R.L. DE C.V.',
        address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
        email: 'Proveedores.Callcentermx@o-i.com',
        phone: '0',
        numberShipments: 5,
      },
    },

    {
      id: 42,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'SAN NICOLAS',
      description: 'TARIMA DE MADERA SAN NICOLAS',
      length: 1.0,
      width: 1.0,
      height: 1.0,
      feet: null,
      capacityCharge: 264,
      stock: 0,
      quality: 'B',
      customer: {
        idCustomer: 17,
        name: 'INGENIO SAN NICOLAS S.A DE C.V',
        address:
          'AV. BOULEBARD MANUEL AVILA CAMACHO LOCALES N 601 PISO 5, LOMAS DE CHAPULTEPEC, DELEGACION MIGUEL HIDALGO, CIUDAD DE MEXICO.',
        email: 'Yazmin.Castro@asr-group.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 44,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'ROCACERO',
      description: 'TARIMA DE MADERA ROCACERO',
      length: 2.0,
      width: 1.0,
      height: 1.0,
      feet: null,
      capacityCharge: 400,
      stock: 0,
      quality: 'C',
      customer: {
        idCustomer: 18,
        name: 'ROCACERO DE PUEBLA S.A. DE C.V.',
        address:
          'KM 12.0 CARRETERA FEDERAL PUEBLA-ATLIXCO, TONANTZINTLA, SANTA MARIA, PUEBLA.',
        email: 'compras@rocacerodepuebla.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 45,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '20X42',
      description: 'TARIMA DE MADERA 20X42',
      length: 1.0,
      width: 1.0,
      height: 1.0,
      feet: null,
      capacityCharge: 300,
      stock: 0,
      quality: 'C',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 46,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: '3X8',
      description: 'TARIMA DE MADERA 3X8',
      length: 1.0,
      width: 1.0,
      height: 1.0,
      feet: null,
      capacityCharge: 350,
      stock: 0,
      quality: 'C',
      customer: {
        idCustomer: 19,
        name: 'GRUPO COLLADO S.A. DE C.V.',
        address:
          'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
        email: 'guadalupe.diaz@gcollado.com',
        phone: '2147483647',
        numberShipments: 5,
      },
    },

    {
      id: 47,
      image:
        'https://images.uline.com/is/image/content/dam/images/H/H3500/H-3445.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      model: 'kirux 120x125',
      description: 'TARIMA DE MADERA KIRUX 120X125',
      length: 1.0,
      width: 1.0,
      height: 1.0,
      feet: null,
      capacityCharge: 450,
      stock: 0,
      quality: 'C',
      customer: {
        idCustomer: 23,
        name: 'KIIRUX SA DE CV',
        address: 'CIUDAD DE MEXICO',
        email: 'pagos@kiirux.com.mx',
        phone: '0',
        numberShipments: 1,
      },
    },
  ],
  customers: [
    {
      id: 14,
      name: 'Schneider Electric SA de CV. planta 2',
      address:
        'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
      email: 'schneider@se.com',
      phone: '2147483647',
      numberShipments: 5,
    },

    {
      id: 16,
      name: 'CERVECERÍA CUAUHTEMOC MOCTEZUMA S.A. DE C.V.',
      address: 'AV. ALFONSO LOPEZ REYES NORTE, BELLA VISTA, MONTERREY, MEXICO.',
      email: 'consuelo.zapata@heineken.com',
      phone: '27281088',
      numberShipments: 5,
    },

    {
      id: 17,
      name: 'INGENIO SAN NICOLAS S.A DE C.V',
      address:
        'AV. BOULEBARD MANUEL AVILA CAMACHO LOCALES N 601 PISO 5, LOMAS DE CHAPULTEPEC, DELEGACION MIGUEL HIDALGO, CIUDAD DE MEXICO.',
      email: 'Yazmin.Castro@asr-group.com',
      phone: '2147483647',
      numberShipments: 5,
    },

    {
      id: 18,
      name: 'ROCACERO DE PUEBLA S.A. DE C.V.',
      address:
        'KM 12.0 CARRETERA FEDERAL PUEBLA-ATLIXCO, TONANTZINTLA, SANTA MARIA, PUEBLA.',
      email: 'compras@rocacerodepuebla.com',
      phone: '2147483647',
      numberShipments: 5,
    },

    {
      id: 19,
      name: 'GRUPO COLLADO S.A. DE C.V. PLANTA GAVILAN',
      address:
        'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
      email: 'guadalupe.diaz@gcollado.com',
      phone: '2147483647',
      numberShipments: 5,
    },

    {
      id: 20,
      name: 'VITRO S.A.B. DE C.V.',
      address: 'KERAMOS PONIENTE # 225 DEL PRADO MONTERREY, MEXICO.',
      email: 'ABASTOSEMPAQUE1@vitro.com',
      phone: '2147483647',
      numberShipments: 3,
    },

    {
      id: 21,
      name: 'OWENS AMERICA S. DE R.L. DE C.V. PLANTA REYES',
      address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
      email: 'Proveedores.Callcentermx@o-i.com',
      phone: '0',
      numberShipments: 5,
    },

    {
      id: 22,
      name: 'DOMINO COMERCIO S.A DE C.V.',
      address:
        'AV.BOULEVARD MANUEL AVILA CAMACHO, #66 COLONIA LOMAS DE CHAPULTEPEC, CIUDAD DE MEXICO.',
      email: 'Karina.Vallejo@asr-group.com',
      phone: '2147483647',
      numberShipments: 5,
    },

    {
      id: 23,
      name: 'KIIRUX SA DE CV',
      address: 'CIUDAD DE MEXICO',
      email: 'pagos@kiirux.com.mx',
      phone: '0',
      numberShipments: 1,
    },

    {
      id: 24,
      name: 'GRUPO COLLADO S.A. DE C.V. PLANTA SANTA BARBARA',
      address:
        'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
      email: 'guadalupe.diaz@gcollado.com',
      phone: '2147483647',
      numberShipments: 5,
    },

    {
      id: 25,
      name: 'GRUPO COLLADO S.A. DE C.V. PLANTA PANTITLAN',
      address:
        'AV. GAVILAN, # 200 COLONIA GUADALUPE DEL MORAL IZTAPALAPA, CIUDAD DE MEXICO.',
      email: 'guadalupe.diaz@gcollado.com',
      phone: '147483647',
      numberShipments: 5,
    },

    {
      id: 26,
      name: 'OWENS AMERICA S. DE R.L. DE C.V. PLANTA QUERETARO',
      address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
      email: 'Proveedores.Callcentermx@o-i.com',
      phone: '0',
      numberShipments: 10,
    },

    {
      id: 27,
      name: 'OWENS AMERICA S. DE R.L. DE C.V. PLANTA TOLUCA',
      address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
      email: 'Proveedores.Callcentermx@o-i.com',
      phone: '0',
      numberShipments: 10,
    },

    {
      id: 28,
      name: 'Schneider Electric SA de CV. PLANTA 1',
      address:
        'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
      email: 'schneider@se.com',
      phone: '2147483647',
      numberShipments: 10,
    },

    {
      id: 29,
      name: 'Schneider Electric SA de CV. PLANTA CEDIS',
      address:
        'Rojo Gomez, Calzada Javier Rojo Gomez No. 1121-A COL. Guadalupe del Moral DF, CP 09300',
      email: 'schneider@se.com',
      phone: '2147483647',
      numberShipments: 10,
    },

    {
      id: 30,
      name: 'NUEVA FABRICA DE VIDRIO SA DE CV',
      address: 'MAGALLANES ORIENTE, #517 TREVIÑO MONMTERREY MEXICO',
      email: '',
      phone: '0',
      numberShipments: 10,
    },

    {
      id: 31,
      name: 'INDUSTRIA FORESTAL INTEGRAL S.A DE C.V',
      address: 'BLVD ROMERO VARGAS #411 CHIGNAHUAPAN PUEBLA',
      email: 'contabilidad@ifisa.com.mx',
      phone: '2147483647',
      numberShipments: 0,
    },
  ],
  topbar: { title: 'Demo', menu: { Menu1: '/' } },
  aside: true,
  user: { user: 'Demo', position: 'Dev' },
}

export default initialState
