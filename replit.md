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

Changelog:
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.