# React Three.js Portfolio

A modern, interactive portfolio website built with React, Three.js, and TypeScript. Features stunning 3D animations, interactive components, and a responsive design.

## ✨ Features

- **Interactive 3D Elements**
  - Animated 3D models and scenes
  - Dynamic lighting and effects
  - Responsive 3D components
  
- **Modern Tech Stack**
  - React 18 with TypeScript for type safety
  - Three.js with React Three Fiber for 3D graphics
  - Framer Motion for smooth animations
  - Tailwind CSS for styling
  - Vite for fast development and building

- **Performance Optimized**
  - Code splitting and lazy loading
  - Optimized 3D model loading
  - Responsive design for all devices
  - WebP image optimization

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mucahitkayadan/react-threejs-portfolio.git
cd react-threejs-portfolio
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

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run ts:check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run validate` - Run all checks (types, lint, build)

### Project Structure

```
react-threejs-portfolio/
├── src/
│   ├── assets/          # Static assets (images, 3D models)
│   │   ├── canvas/     # Three.js canvas components
│   │   └── ...         # Other components
│   ├── constants/      # Constants and configuration
│   ├── hoc/           # Higher-order components
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── styles.ts      # Global styles and types
├── public/            # Public assets
└── ...               # Config files
```

### Key Components

- **3D Components**
  - `Ball.tsx`: Interactive 3D ball component
  - `Earth.tsx`: 3D Earth model component
  - `Stars.tsx`: Background stars effect
  - `Computers.tsx`: 3D computer model

- **Core Components**
  - `About.tsx`: About section with animations
  - `Contact.tsx`: Contact form with email integration
  - `Hero.tsx`: Hero section with 3D elements
  - `Navbar.tsx`: Navigation component

## 🧪 Quality Assurance

### Type Checking

The project uses TypeScript for type safety. Run type checks:
```bash
npm run ts:check
```

### Linting

ESLint is configured for code quality. Run linting:
```bash
npm run lint
# or fix issues automatically
npm run lint:fix
```

### Code Formatting

Prettier is configured for consistent code style:
```bash
npm run format
```

### Pre-commit Hooks

Husky and lint-staged are configured to run checks before commits:
- TypeScript type checking
- ESLint
- Prettier formatting

## 🚀 Deployment

### Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

### Deployment Options

The project can be deployed to:
- GitHub Pages (configured in CI/CD)
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the Conventional Commits specification:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js for 3D graphics capabilities
- React Three Fiber for React integration
- Framer Motion for animations
- Tailwind CSS for styling
- All other open-source contributors

## 📞 Contact

For questions or feedback, please reach out through:
- GitHub Issues
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)

