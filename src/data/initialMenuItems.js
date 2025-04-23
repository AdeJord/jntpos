import { v4 as uuidv4 } from 'uuid';

const initialMenuItems = [
  {
    id: uuidv4(),
    name: 'Jerk Chicken',
    description: 'Spicy grilled chicken with Jamaican jerk spices',
    price: 8.95,
    category: 'Main Dishes'
  },
  {
    id: uuidv4(),
    name: 'Curry Goat',
    description: 'Tender goat meat in aromatic curry sauce',
    price: 10.95,
    category: 'Main Dishes'
  },
  {
    id: uuidv4(),
    name: 'Oxtail Stew',
    description: 'Slow-cooked oxtail with butter beans',
    price: 11.95,
    category: 'Main Dishes'
  },
  {
    id: uuidv4(),
    name: 'Ackee & Saltfish',
    description: 'Jamaica\'s national dish with saltfish and vegetables',
    price: 9.95,
    category: 'Main Dishes'
  },
  {
    id: uuidv4(),
    name: 'Brown Stew Chicken',
    description: 'Chicken stewed in rich brown sauce',
    price: 8.50,
    category: 'Main Dishes'
  },
  {
    id: uuidv4(),
    name: 'Escovitch Fish',
    description: 'Fried fish topped with spicy pickled vegetables',
    price: 10.50,
    category: 'Main Dishes'
  },
  {
    id: uuidv4(),
    name: 'Rice & Peas',
    description: 'Traditional rice cooked with coconut milk and kidney beans',
    price: 3.50,
    category: 'Side Dishes'
  },
  {
    id: uuidv4(),
    name: 'Fried Plantains',
    description: 'Sweet ripe plantains, fried until golden',
    price: 3.00,
    category: 'Side Dishes'
  },
  {
    id: uuidv4(),
    name: 'Festival',
    description: 'Sweet fried cornmeal dumplings',
    price: 2.50,
    category: 'Side Dishes'
  },
  {
    id: uuidv4(),
    name: 'Callaloo',
    description: 'Leafy green vegetable dish similar to spinach',
    price: 3.95,
    category: 'Side Dishes'
  },
  {
    id: uuidv4(),
    name: 'Sorrel Drink',
    description: 'Traditional Jamaican hibiscus drink with ginger and spices',
    price: 2.95,
    category: 'Drinks'
  },
  {
    id: uuidv4(),
    name: 'Ginger Beer',
    description: 'Spicy homemade ginger drink',
    price: 2.75,
    category: 'Drinks'
  },
  {
    id: uuidv4(),
    name: 'Ting',
    description: 'Jamaican grapefruit soda',
    price: 2.50,
    category: 'Drinks'
  },
  {
    id: uuidv4(),
    name: 'Rum Punch',
    description: 'Sweet tropical fruit punch with Jamaican rum',
    price: 4.95,
    category: 'Drinks'
  },
  {
    id: uuidv4(),
    name: 'Sweet Potato Pudding',
    description: 'Traditional spiced pudding made with sweet potatoes',
    price: 4.50,
    category: 'Desserts'
  },
  {
    id: uuidv4(),
    name: 'Rum Cake',
    description: 'Rich cake infused with Jamaican rum',
    price: 4.95,
    category: 'Desserts'
  },
  {
    id: uuidv4(),
    name: 'Grater Cake',
    description: 'Sweet coconut candy with vibrant colors',
    price: 3.50,
    category: 'Desserts'
  },
  {
    id: uuidv4(),
    name: 'Banana Fritters',
    description: 'Fried sweet banana batter with cinnamon',
    price: 3.95,
    category: 'Desserts'
  }
];

export default initialMenuItems;