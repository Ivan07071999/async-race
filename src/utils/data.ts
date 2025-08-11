import getCars, { type ICar } from '../store/garage/garageThunks';

export const carsModels = [
  'Toyota',
  'Honda',
  'Ford',
  'BMW',
  'Mercedes',
  'Audi',
  'Nissan',
  'Volkswagen',
  'Hyundai',
  'Kia',
  'Mazda',
  'Subaru',
  'Tesla',
  'Chevrolet',
  'Jaguar XE',
  'Land Rover',
  'Lexus',
  'Dodge',
  'Mitsubishi',
  'Porsche',
];

export const carsColors = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FFA500',
  '#800080',
  '#00FFFF',
  '#FFC0CB',
  '#808080',
  '#008080',
  '#4B0082',
  '#FFD700',
  '#006400',
  '#8B4513',
  '#FF1493',
  '#4682B4',
  '#FF8C00',
  '#800000',
  '#FFFFFF',
  '#C0C0C0',
];

export const carsArray = getCars<ICar[]>();
export const PAGE_LENGTH = 7;
