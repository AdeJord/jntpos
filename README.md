# Jerk n Thyme POS System

A Progressive Web App (PWA) for a Jamaican restaurant Point of Sale system. This application includes both customer-facing menu functionality and an admin panel for menu management.

## Features

- **Progressive Web App**: Works offline and can be installed on mobile devices
- **Responsive Design**: Optimized for tablets and desktops
- **Menu Management**: Add, edit, and delete menu items through the admin interface
- **Order Processing**: Track and manage customer orders
- **Export Functionality**: Export order history to CSV files
- **Local Storage**: All data is stored locally for offline use

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jerk-n-thyme-pos
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173/`

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Usage

### Customer POS Interface

- Browse menu items by category (Main Dishes, Side Dishes, Drinks, Desserts)
- Add items to order with the "+ Add" button
- View current order in the right panel
- Remove items from the order by clicking the "×" button
- Submit order with the "Submit Order" button

### Admin Interface

- Access the admin panel by clicking "Admin Access" and entering the password (`admin123`)
- View and manage menu items by category
- Add new menu items to each category
- Edit or delete existing menu items
- Export all orders to a CSV file

## Project Structure

```
jerk-n-thyme-pos/
├── public/             # Static assets and service worker
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable React components
│   ├── context/        # React context for state management
│   ├── data/           # Initial data and fixtures
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Root component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── index.html          # HTML template
└── package.json        # Project dependencies and scripts
```

## Customization

### Modifying the Menu

The initial menu items are defined in `src/data/initialMenuItems.js`. You can edit this file to change the default menu.

### Changing the Theme

The Jamaican flag colors (green, yellow, black) are used as the default theme. To change the theme, modify the CSS variables in `src/index.css`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Vite and React
- Styled with custom CSS
- PWA functionality with vite-plugin-pwa