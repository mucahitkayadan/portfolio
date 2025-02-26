# React Three.js Portfolio Documentation

## Project Overview
This is a modern portfolio website built with React, Three.js, and TypeScript. It features 3D animations, interactive components, and a responsive design.

## Architecture

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm/yarn
- **CI/CD**: GitHub Actions

### Directory Structure
```
react-threejs-portfolio/
├── src/
│   ├── assets/          # Static assets (images, 3D models)
│   ├── components/      # React components
│   │   ├── canvas/     # Three.js canvas components
│   │   └── ...         # Other components
│   ├── constants/      # Constants and configuration
│   ├── hoc/           # Higher-order components
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── styles.ts      # Global styles and types
├── public/            # Public assets
├── .github/           # GitHub Actions workflows
├── dist/             # Build output
└── ...               # Config files
```

### Key Components
1. **Canvas Components** (`src/components/canvas/`)
   - `Ball.tsx`: Interactive 3D ball component
   - `Earth.tsx`: 3D Earth model component
   - `Stars.tsx`: Background stars effect
   - `Computers.tsx`: 3D computer model

2. **Core Components**
   - `About.tsx`: About section with animations
   - `Contact.tsx`: Contact form with email integration
   - `Hero.tsx`: Hero section with 3D elements
   - `Navbar.tsx`: Navigation component
   - `Loader.tsx`: Loading animation component
   - `ErrorBoundary.tsx`: Error handling component

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/mucahitkayadan/react-threejs-portfolio.git
cd react-threejs-portfolio

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server
```bash
# Start development server
npm run dev
# or
yarn dev
```

### Building for Production
```bash
# Create production build
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

## Type Checking and Linting

### TypeScript Configuration
The project uses TypeScript for type safety. Configuration is in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    // ... other options
  }
}
```

### Running Type Checks
```bash
# Run TypeScript type checking
npm run ts:check
# or
yarn ts:check
```

### ESLint Configuration
ESLint is configured for code quality and consistency. Configuration in `.eslintrc.js`:
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  // ... other options
}
```

### Running Linting
```bash
# Run ESLint
npm run lint
# or
yarn lint

# Fix auto-fixable issues
npm run lint:fix
# or
yarn lint:fix
```

## CI/CD Pipeline

### GitHub Actions Workflow
The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/`:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Run type checking
        run: npm run ts:check
      - name: Run linting
        run: npm run lint
      - name: Build
        run: npm run build
```

### Deployment
The project can be deployed to various platforms:
- Vercel (recommended)
- GitHub Pages
- Netlify
- AWS S3 + CloudFront

## Git Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes

### Common Git Commands
```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Update from main
git checkout main
git pull
git checkout feature/new-feature
git merge main
```

### Commit Message Convention
We follow the Conventional Commits specification:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

## Performance Optimization

### Code Splitting
The application uses dynamic imports for route-based code splitting:
```typescript
const About = React.lazy(() => import('./components/About'));
```

### Asset Optimization
- Images are optimized and served in WebP format
- 3D models are compressed and loaded asynchronously
- Tailwind CSS purges unused styles in production

### Monitoring
- Vercel Analytics for performance monitoring
- React DevTools for component profiling
- Lighthouse for performance auditing

## Troubleshooting

### Common Issues
1. **Three.js Model Loading**
   - Ensure models are in the correct format (GLTF/GLB)
   - Check model paths in development and production

2. **TypeScript Errors**
   - Run `npm run ts:check` to identify type issues
   - Check @types packages are installed for dependencies

3. **Build Issues**
   - Clear the build cache: `rm -rf dist/`
   - Update dependencies: `npm update`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 