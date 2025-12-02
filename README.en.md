# Asset Management System - Inpasa

Web system for IT asset management, built with React and Vite, enabling complete control of equipment, tickets, and users.

## 📋 About the Project

The Inpasa Asset Management System is a modern web application that facilitates the control and monitoring of information technology assets. The system offers functionalities for registering, editing, deleting, and filtering assets, as well as managing tickets and users.

### Main Features

- **Asset Management**: Complete CRUD for IT assets with advanced filters
- **Ticket Management**: Control of requests and technical support
- **User Administration**: User registration and management
- **Authentication**: Secure login system with JWT
- **Responsive Interface**: Modern design adaptable to different devices

## 🚀 Technologies Used

- **React 19.1.1**: JavaScript library for building user interfaces
- **Vite 7.1.7**: High-performance build tool and dev server
- **React Router DOM 6.30.1**: Route management
- **Axios 1.13.2**: HTTP client for API requests
- **React Icons 5.5.0**: Icon library
- **CSS Modules**: Styling with local scope
- **ESLint**: Linting and code quality
- **React Compiler**: Automatic performance optimization

## 📁 Project Structure

```
gestao-de-ativos-inpasa/
├── Components/
│   ├── Header/              # Application header
│   ├── Sidebar/             # Side navigation menu
│   ├── Layout/              # Main layout
│   └── Pages/
│       ├── Ativos/          # Asset management module
│       ├── Chamados/        # Tickets module
│       ├── Login/           # Authentication page
│       └── Usuarios/        # Users module
├── Hooks/
│   ├── AuthContext.jsx      # Authentication context
│   ├── LayoutContext.jsx    # Layout context
│   └── useAuth.jsx          # Custom authentication hook
├── Helper/
│   └── ProtectedRouter.jsx  # Private route protection
├── src/
│   ├── api/
│   │   ├── axios.js         # Axios configuration
│   │   └── README.md        # API documentation
│   ├── App.jsx              # Main component
│   └── main.jsx             # Entry point
├── assets/
│   ├── img/                 # Images and logos
│   └── App.css              # Global styles
└── vite.config.js           # Vite configuration
```

## 🔧 Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Backend API running at `http://localhost:5234/api`

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd gestao-de-ativos-inpasa
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API URL (if needed):
   - Edit the file `src/api/axios.js`
   - Change the `API_BASE_URL` constant to your API address

4. Start the development server:
```bash
npm run dev
```

5. Access the application at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Generates production build
- `npm run preview`: Previews the production build
- `npm run lint`: Runs the linter to check code quality

## 🔐 Authentication

The system uses JWT (JSON Web Token) based authentication:

- **Login**: Endpoint `/api/Login` with employee ID and password
- **Token**: Stored in localStorage
- **Interceptors**: Automatically add token to requests
- **Protection**: Protected routes redirect to login if not authenticated

### Login Example

```javascript
const response = await axiosPublic.post('/Login', {
  Matricula: 12345,
  Password: 'password123'
});
```

## 🎨 System Modules

### Asset Management

Allows managing all company IT assets:

- Register new assets
- Edit information
- Delete assets
- Advanced filters by:
  - Name
  - Model
  - Type
  - Inventory code
  - Location (city/state)
  - Responsible user

### Tickets

Request and technical support management system.

### Users

System user administration with permission control.

## 🌐 API and Requests

The project uses two Axios instances:

### axiosPublic
For public requests (without authentication):
```javascript
import { axiosPublic } from '../src/api/axios';
const response = await axiosPublic.post('/Login', data);
```

### axiosPrivate
For authenticated requests (token added automatically):
```javascript
import { axiosPrivate } from '../src/api/axios';
const response = await axiosPrivate.get('/Ativos');
const response = await axiosPrivate.post('/Ativos/register', data);
const response = await axiosPrivate.put('/Ativos/123', data);
const response = await axiosPrivate.delete('/Ativos/123');
```

## 🎯 React Contexts

### AuthContext
Manages authentication state:
- `isLogged`: Authentication status
- `user`: Logged user data
- `login()`: Login function
- `logout()`: Logout function
- `getToken()`: Returns JWT token

### LayoutContext
Manages layout state:
- `pageTitle`: Current page title
- `setPageTitle()`: Updates the title

## 🛣️ Routes

- `/login`: Authentication page
- `/`: Dashboard (home page)
- `/ativos`: Asset management
- `/chamados`: Ticket management
- `/usuarios`: User administration
- `/licencas`: License control (in development)
- `/localizacoes`: Location management (in development)

## 🎨 Styling

The project uses CSS Modules for styling with local scope, ensuring:
- Style isolation
- Prevention of class conflicts
- Better maintainability
- Optimized performance

## 🔄 State and Performance

- **React Compiler**: Enabled for automatic optimization
- **Context API**: Global state management
- **Debounce**: Implemented in filters to reduce requests
- **Loading States**: Visual feedback during asynchronous operations

## 🐛 Error Handling

- User-friendly error messages
- Interceptors for HTTP error handling
- Automatic redirect on expired token
- Detailed console logs for debugging

## 📦 Build and Deploy

To generate the production build:

```bash
npm run build
```

Optimized files will be generated in the `dist/` folder.

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## 📄 License

This project is private and belongs to Inpasa.

## 👥 Team

Developed by Inpasa's IT team.

## 📞 Support

For support or questions, contact the development team.
