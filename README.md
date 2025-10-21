# Notes App Frontend

A modern, responsive notes management application built with React, TypeScript, and Tailwind CSS. This application provides a clean and intuitive interface for creating, organizing, and managing your notes with collections, search functionality, and customizable themes.

## Live Demo

[click here](notes-app-frontend-rosy.vercel.app)

## Features

- **Create & Edit Notes** - Rich text editing with auto-save functionality
- **Collections Management** - Organize notes into custom collections
- **Search & Filter** - Find notes quickly with advanced search
- **Archive System** - Archive notes and collections for later reference
- **Theme Customization** - Light/dark mode and font family options
- **Authentication** - Secure login system with test accounts
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Performance Optimized** - Code splitting, lazy loading, and memoization
- **Error Handling** - Comprehensive error management and user feedback
- **Real-time Validation** - Form validation with instant feedback

## Tech Stack

### Frontend Framework

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Fast build tool and development server

### State Management & Routing

- **Redux Toolkit 2.9.0** - Predictable state container
- **React Router 7.7.1** - Declarative routing
- **React Hook Form 7.61.1** - Performant form library

### Styling & UI

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Icons 5.5.0** - Popular icon library
- **clsx 2.1.1** - Conditional CSS classes

### Form Handling & Validation

- **Yup 1.6.1** - Schema validation
- **@hookform/resolvers 5.2.1** - Form validation resolvers

### Development Tools

- **ESLint 9.30.1** - Code linting and formatting
- **TypeScript ESLint 8.35.1** - TypeScript-specific linting
- **Vite React Plugin 4.6.0** - React support for Vite

## Project Structure

```
notes-frontend/
├── public/                     # Static assets
│   ├── notesAppIcon.svg       # App icon
│   └── fonts/                 # Custom fonts
├── src/
│   ├── api/                   # API layer
│   │   ├── auth.ts           # Authentication API
│   │   ├── notes.ts          # Notes management API
│   │   ├── collections.ts    # Collections API
│   │   └── store/            # Redux store configuration
│   ├── assets/               # Organized assets
│   │   ├── icons/           # Icon components and SVGs
│   │   └── images/          # Image assets
│   ├── constants/            # App constants
│   │   ├── theme/           # Theme configurations
│   │   ├── navigation/      # Navigation constants
│   │   └── ui/              # UI constants
│   ├── context/             # React contexts
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── AuthProvider.tsx # Auth provider component
│   ├── data/                # Mock data for development
│   │   ├── users.json       # Test user accounts
│   │   ├── notes.json       # Sample notes
│   │   └── collections.json # Sample collections
│   ├── hooks/               # Custom React hooks
│   │   ├── useActionModal.ts # Modal management
│   │   ├── useBack.ts       # Navigation helper
│   │   └── useIsMobile.tsx  # Responsive utilities
│   ├── lib/                 # Library configurations
│   │   └── queryClient.ts   # React Query setup
│   ├── pages/               # Page components
│   │   ├── auth/           # Authentication pages
│   │   ├── notes/          # Notes management pages
│   │   └── notFound/       # 404 error page
│   ├── router/              # Routing configuration
│   │   └── router.tsx       # Main router setup
│   ├── types/               # TypeScript type definitions
│   │   ├── components.ts    # Component prop types
│   │   ├── note.ts         # Note-related types
│   │   └── user.ts         # User-related types
│   ├── ui/                  # Reusable UI components
│   │   ├── components/     # Basic components (Button, Input, etc.)
│   │   ├── feedback/       # Loading and feedback components
│   │   ├── forms/          # Form-specific components
│   │   ├── layouts/        # Layout components
│   │   ├── modals/         # Modal components
│   │   ├── navigation/     # Navigation components
│   │   └── cards/          # Card components
│   ├── utils/               # Utility functions
│   │   ├── auth/           # Authentication utilities
│   │   ├── error/          # Error handling utilities
│   │   ├── performance/    # Performance optimization utilities
│   │   ├── validation/     # Form validation utilities
│   │   └── datetime/       # Date/time utilities
│   ├── App.tsx             # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── eslint.config.js       # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies and scripts
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/notes-app-frontend.git
   cd notes-app-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build the project for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

### Test Accounts

The application comes with pre-configured test accounts for development:

| Email                  | Password            | Description           |
| ---------------------- | ------------------- | --------------------- |
| `testUser@example.com` | `securePassword123` | Standard user account |
| `admin@example.com`    | `adminPass456`      | Administrator account |
| `demo@example.com`     | `demoPassword789`   | Demo user account     |

## Features in Detail

### Notes Management

- Create, edit, and delete notes with rich text support
- Auto-save functionality to prevent data loss
- Tab support for better text formatting
- Last edited timestamps for tracking changes

### Collections Organization

- Group related notes into custom collections
- Create, rename, and delete collections
- Move notes between collections
- Archive entire collections for later reference

### Search & Discovery

- Global search across all notes and collections
- Search by note content, title, or collection name
- Filter by archived/active status
- Quick navigation to search results

### Theme Customization

- **Color Themes**: Light and Dark mode support
- **Font Themes**: Sans-serif, Serif, and Monospace options
- Persistent theme settings across sessions
- Smooth transitions between theme changes

### User Experience

- Responsive design that works on all device sizes
- Intuitive navigation with breadcrumbs
- Context menus for quick actions
- Loading states and error feedback
- Keyboard shortcuts for power users

## Architecture

### Performance Optimizations

- **Code Splitting** - Lazy-loaded routes for faster initial load
- **Component Memoization** - Strategic use of React.memo and useMemo
- **Bundle Optimization** - Optimized build with Vite
- **Error Boundaries** - Graceful error handling and recovery

### State Management

- **Redux Toolkit** for global state management
- **Local State** for component-specific data
- **Context API** for authentication state
- **Form State** managed with React Hook Form

### Type Safety

- **Comprehensive TypeScript** coverage across the entire codebase
- **Strict type checking** for better development experience
- **Interface definitions** for all data structures
- **Type-safe API calls** and data handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- Redux Toolkit for simplified state management
- Vite for the blazing fast build tool
- All the open-source contributors who made this project possible
