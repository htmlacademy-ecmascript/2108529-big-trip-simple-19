import {getRandomArrayElement, getRandomAmountOfRandomArrayElements} from '../utils/common';

const OFFERS_AMOUNT = 4;
const DESTINATIONS_AMOUNT = 3;
const EVENTS_AMOUNT = 5;

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const PICTURES = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chamonix_valley_from_la_Fl%C3%A9g%C3%A8re%2C2010_07.JPG/1200px-Chamonix_valley_from_la_Fl%C3%A9g%C3%A8re%2C2010_07.JPG',
  'https://frenchmoments.eu/wp-content/uploads/2012/11/Chamonix-Mont-Blanc-Featured-Image-copyright-French-Moments.jpg',
  'https://ru.ski-france.com/media/cache/gallery_default/5872716-Chamonix-%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD-%D1%83-%D0%B3%D0%BE%D1%80%D0%BD%D0%BE%D0%BB%D1%8B%D0%B6%D0%BD%D1%8B%D1%85-%D1%82%D1%80%D0%B0%D1%81%D1%81-.jpg',
  'https://a.cdn-hotels.com/gdcs/production125/d882/347f73d7-bd57-44cf-b3fa-0837c96cb193.jpg',
  'https://hips.hearstapps.com/harpersbazaaruk.cdnds.net/15/37/original/original-geneva-fountain-jpg-dd767c5e.jpg',
  'https://www.theinvisibletourist.com/wp-content/uploads/2019/12/featured_130.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg',
  'https://www.travelandleisure.com/thmb/_3nQ1ivxrnTKVphdp9ZYvukADKQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/amsterdam-nl-AMSTERDAMTG0521-6d2bfaac29704667a950bcf219680640.jpg',
  'https://planetofhotels.com/guide/sites/default/files/styles/big_gallery_image/public/text_gallery/Amsterdam-4.jpg',
];

const destinations = Array.from({length: DESTINATIONS_AMOUNT}, (_, index) => (
  {
    id: index,
    description: `description ${index}`,
    name: `name ${index}`,
    pictures: getRandomAmountOfRandomArrayElements(PICTURES)
      .map((picture) => (
        {
          src: picture,
          description: `description ${index}`
        }
      ))
  }
));

const offersByType = TYPES.map((type) => ({
  type: type,
  offers: Array.from({length: OFFERS_AMOUNT}, (_, index) => ({
    id: index,
    title: `offer ${index + 1}`,
    price: `${index + 1}`
  }))
}));

const mockEvents = Array.from({length: EVENTS_AMOUNT}, (_, index) => (
  {
    id: index,
    basePrice: Math.floor(Math.random() * 3000),
    dateFrom: `2019-0${Math.floor(Math.random() * 7 + 1)}-1${Math.floor(Math.random() * 7 + 1)}T12:00:56.845Z`,
    dateTo: `2019-0${Math.floor(Math.random() * 7 + 1)}-1${Math.floor(Math.random() * 7 + 1)}T23:50:13.375Z`,
    destination: getRandomArrayElement(destinations).id,
    offers: getRandomAmountOfRandomArrayElements([1, 2, 3, 4]),
    type: getRandomArrayElement(TYPES)
  }
));

export {destinations, offersByType, mockEvents};
