const offersByType = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Turn on your music',
        'price': 105
      },
      {
        'id': 3,
        'title': 'Meet with a sign',
        'price': 100
      },
      {
        'id': 4,
        'title': 'Transportation of an animal',
        'price': 110
      },
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Add luggage',
        'price': 70,
        isSelected: false
      },
      {
        'id': 2,
        'title': 'Switch to comfort class',
        'price': 130,
        isSelected: true
      },
      {
        'id': 3,
        'title': 'Add meal',
        'price': 80,
        isSelected: false
      },
      {
        'id': 4,
        'title': 'Choose seats',
        'price': 20,
        isSelected: false
      },
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Excursion service',
        'price': 120,
        isSelected: false
      },
      {
        'id': 2,
        'title': 'Food and drinks',
        'price': 90,
        isSelected: true
      },
      {
        'id': 3,
        'title': 'Luggage tray',
        'price': 80,
        isSelected: false
      },
      {
        'id': 4,
        'title': 'Translator',
        'price': 105,
        isSelected: false
      },
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Add meals',
        'price': 120,
        isSelected: true
      },
      {
        'id': 2,
        'title': 'Add luggage',
        'price': 90,
        isSelected: false
      },
      {
        'id': 3,
        'title': 'Luggage tray',
        'price': 80,
        isSelected: false
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Show programs',
        'price': 120,
        isSelected: true
      },
      {
        'id': 2,
        'title': 'Fireworks',
        'price': 90,
        isSelected: false
      },
      {
        'id': 3,
        'title': 'Upholstered furniture',
        'price': 80,
        isSelected: true
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 1,
        'title': 'Excursions',
        'price': 120,
        isSelected: false
      },
      {
        'id': 2,
        'title': 'Translator',
        'price': 90,
        isSelected: false
      },
      {
        'id': 3,
        'title': 'VIP apartments',
        'price': 80,
        isSelected: true
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 1,
        'title': 'Excursions',
        'price': 120,
        isSelected: false
      },
      {
        'id': 2,
        'title': 'Translator',
        'price': 90,
        isSelected: false
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'Birthday greetings',
        'price': 120,
        isSelected: true
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 1,
        'title': 'Сar for rent',
        'price': 100,
        isSelected: true
      }
    ]
  },
];

const mockEvents = [
  {
    'id': 0,
    'basePrice': 1100,
    'dateFrom': '2019-07-10T12:00:56.845Z',
    'dateTo': '2019-07-11T23:50:13.375Z',
    'destination': {
      'id': 1,
      'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      'name': 'Chamonix',
      'pictures': [
        {
          'src': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chamonix_valley_from_la_Fl%C3%A9g%C3%A8re%2C2010_07.JPG/1200px-Chamonix_valley_from_la_Fl%C3%A9g%C3%A8re%2C2010_07.JPG',
          'description': 'Chamonix'
        },
        {
          'src': 'https://frenchmoments.eu/wp-content/uploads/2012/11/Chamonix-Mont-Blanc-Featured-Image-copyright-French-Moments.jpg',
          'description': 'Chamonix'
        },
        {
          'src': 'https://ru.ski-france.com/media/cache/gallery_default/5872716-Chamonix-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD-%D1%83-%D0%B3%D0%BE%D1%80%D0%BD%D0%BE%D0%BB%D1%8B%D0%B6%D0%BD%D1%8B%D1%85-%D1%82%D1%80%D0%B0%D1%81%D1%81-.jpg',
          'description': 'Chamonix'
        }
      ]
    },
    'offers': [1, 3],
    'type': 'bus'
  },
  {
    'id': 1,
    'basePrice': 1200,
    'dateFrom': '2019-06-10T22:55:56.845Z',
    'dateTo': '2019-06-11T11:22:13.375Z',
    'destination': {
      'id': 2,
      'description': 'Geneva, is a beautiful city, the second-most populous city in Switzerland',
      'name': 'Geneva',
      'pictures': [
        {
          'src': 'https://a.cdn-hotels.com/gdcs/production125/d882/347f73d7-bd57-44cf-b3fa-0837c96cb193.jpg',
          'description': 'Geneva'
        },
        {
          'src': 'https://hips.hearstapps.com/harpersbazaaruk.cdnds.net/15/37/original/original-geneva-fountain-jpg-dd767c5e.jpg',
          'description': 'Geneva'
        },
        {
          'src': 'https://www.theinvisibletourist.com/wp-content/uploads/2019/12/featured_130.jpg',
          'description': 'Geneva'
        }
      ]
    },
    'offers': [2, 4],
    'type': 'flight'
  },
  {
    'id': 2,
    'basePrice': 1300,
    'dateFrom': '2019-05-13T22:55:56.845Z',
    'dateTo': '2019-05-14T11:22:13.375Z',
    'destination': {
      'id': 3,
      'description': 'Amsterdam\'s main attractions include its historic canals, the Rijksmuseum, the state museum with a vast collection Dutch Gold Age art',
      'name': 'Amsterdam',
      'pictures': [
        {
          'src': 'https://upload.wikimedia.org/wikipedia/commons/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg',
          'description': 'Amsterdam'
        },
        {
          'src': 'https://www.travelandleisure.com/thmb/_3nQ1ivxrnTKVphdp9ZYvukADKQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/amsterdam-nl-AMSTERDAMTG0521-6d2bfaac29704667a950bcf219680640.jpg',
          'description': 'Amsterdam'
        },
        {
          'src': 'https://planetofhotels.com/guide/sites/default/files/styles/big_gallery_image/public/text_gallery/Amsterdam-4.jpg',
          'description': 'Amsterdam'
        },
      ]
    },
    'offers': [1],
    'type': 'check-in'
  }
];

export {offersByType, mockEvents};
