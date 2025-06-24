# ZuHause Real Estate Platform

## Overview

ZuHause is a full-stack real estate platform built for property management and client interaction. The application is a Portuguese-language real estate website focused on property listings, contact management, and client testimonials. It features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom ZuHause branding
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful endpoints under `/api` prefix
- **Development Server**: Custom development setup with Vite middleware integration
- **Request Logging**: Custom middleware for API request/response logging

### Database Architecture
- **Database**: PostgreSQL (configured for deployment)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: @neondatabase/serverless for production database connectivity
- **Schema Validation**: Zod schemas integrated with Drizzle for type safety

## Key Components

### Core Pages
- **Home Page**: Hero section, property search, featured properties, testimonials, and contact form
- **Properties Page**: Complete property listings with filtering capabilities
- **Property Detail Page**: Individual property view with detailed information and image galleries
- **404 Page**: Custom not found page

### UI Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Property Cards**: Interactive property display with favorite functionality
- **Contact Form**: Form handling with validation and submission
- **Property Search**: Search interface with filters for type, location, and price

### Database Schema
- **Properties Table**: Core property data including price, location, features, images, and rental/sale status
- **Contacts Table**: Customer inquiries with contact information and messages
- **Testimonials Table**: Customer reviews and ratings

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests, validate data, and interact with database
3. **Database Operations**: Drizzle ORM manages PostgreSQL operations with type safety
4. **Response Handling**: Data flows back through the API to update React component state
5. **UI Updates**: Components re-render based on query state changes

### Error Handling
- Client-side error boundaries and loading states
- Server-side error middleware with structured error responses
- Database connection error handling
- Form validation with Zod schemas

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Neon Database**: Serverless PostgreSQL provider for production

### UI Libraries
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: For component variant management

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Server-side bundling for production

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16
- **Port Configuration**: Application runs on port 5000, exposed as port 80
- **Development Command**: `npm run dev` starts the development server with hot reloading

### Production Build
- **Client Build**: Vite builds the React application to `dist/public`
- **Server Build**: ESBuild bundles the Express server to `dist/index.js`
- **Asset Serving**: Production server serves static files from the build directory
- **Database Migrations**: Drizzle Kit handles schema migrations

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Auto-scaling**: Configured for autoscale deployment target
- **Environment**: Supports both development and production modes

## Changelog

Recent Changes:
- June 19, 2025: Restored featured property card animations on homepage to match Properties page
  - Added slideInUp animation with staggered delays
  - Implemented hover effects with elevation and shadow transitions
  - Added backdrop blur and transparency effects
  - Maintained performance optimizations while restoring visual animations
- June 19, 2025: Comprehensive performance optimization implementation
  - Added lazy loading for all images with proper loading attributes
  - Implemented React.memo() and useCallback() for PropertyCard component optimization
  - Configured React Query cache with 5-minute stale time and 10-minute garbage collection
  - Added gzip compression middleware with 6-level compression for responses >1KB
  - Implemented aggressive caching headers for static assets (1 year for images, 1 day for videos)
  - Added lazy loading for page components with Suspense boundaries
  - Optimized CSS with content-visibility and contain-intrinsic-size for images
  - Added will-change property for hover animations to improve GPU acceleration
  - Configured video preload="none" to prevent automatic loading
  - Implemented code splitting strategy for vendor, UI, forms, and icons bundles
- June 17, 2025: Comprehensive mobile responsiveness optimization across all components and pages
- June 17, 2025: Enhanced property detail pages with mobile-optimized hero sections, responsive grids, and touch-friendly interfaces
- June 17, 2025: Improved property cards with flexible layouts, responsive typography, and mobile-friendly interaction elements
- June 17, 2025: Optimized navigation, hero section, footer, and contact forms for mobile devices with adaptive spacing and sizing
- June 17, 2025: Enhanced image gallery modal with mobile-optimized controls, responsive positioning, and touch navigation
- June 17, 2025: Increased navigation and footer logo sizes by 50% for better visibility and branding
- June 17, 2025: Removed "Clique para ampliar" text from Properties page, kept only on property detail pages
- June 17, 2025: Created floating WhatsApp button for all pages with custom call-to-action message
- June 17, 2025: Removed green WhatsApp contact button from property detail pages in favor of floating button
- June 17, 2025: Added actual video to "Sobre Nós" section replacing placeholder
- June 17, 2025: Implemented advanced image gallery popup with carousel functionality above all UI elements
- June 17, 2025: Removed all rental references and "À Venda" tags since company focuses exclusively on sales
- June 17, 2025: Updated search filters to remove rental options, enhanced property type options
- June 17, 2025: Added premium property video to Properties page hero section
- June 17, 2025: Fixed contact form positioning in property details to remain fixed while scrolling
- June 17, 2025: Updated contact form styling from purple to blue theme throughout
- June 17, 2025: Enhanced contact form with "Trabalhar na Zuhause" option and PDF file upload functionality
- June 14, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.