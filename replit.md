# Blog Application - Architecture Overview

## Overview

This is a full-stack blog application for a Russian journalist, built with a modern TypeScript stack. The application features a React frontend with shadcn/ui components, an Express.js backend, and uses Drizzle ORM for database operations. The blog focuses on articles about family, travel, biography, and journalism, with content primarily in Russian.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with development server and hot module replacement
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful APIs with JSON responses
- **Middleware**: Custom logging middleware for API requests
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reloading with tsx

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schema with Zod validation
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Neon Database serverless PostgreSQL

## Key Components

### Article Management System
- **Schema**: Articles table with fields for title, slug, content, excerpt, category, image URL, read time, and timestamps
- **Categories**: Four predefined categories (Family, Travel, Biography, Journalism)
- **Validation**: Zod schemas for input validation and type safety
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations

### Content Features
- **Rich Text**: Custom rich text editor with markdown-style formatting
- **Image Support**: Image upload and display capabilities
- **Search**: Full-text search functionality across articles
- **SEO**: Slug-based URLs for articles

### Admin Interface
- **Article Creation**: Form-based article creation with validation
- **Content Management**: Admin dashboard for managing articles
- **Draft System**: Local storage for draft articles

## Data Flow

### Article Retrieval
1. Frontend requests articles via TanStack Query
2. Express API routes handle requests
3. Storage layer queries database or in-memory store
4. JSON response sent to frontend
5. React components render article data

### Article Creation
1. Admin form captures article data
2. Client-side validation with Zod schemas
3. POST request to Express API
4. Server-side validation and storage
5. Query cache invalidation for real-time updates

### Search Functionality
1. Search query from frontend
2. API endpoint processes search parameters
3. Database search across article content
4. Filtered results returned to frontend

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Backend Dependencies
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Schema validation library
- **Nanoid**: Unique ID generation
- **Date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React application to static files
2. **Backend**: ESBuild bundles Express server for production
3. **Database**: Drizzle migrations ensure schema compatibility
4. **Assets**: Static files served by Express in production

### Environment Configuration
- **Development**: Vite dev server with Express API proxy
- **Production**: Single Express server serving both API and static files
- **Database**: Environment-based connection string configuration

### File Structure
- **Client**: Frontend React application in `/client` directory
- **Server**: Backend Express application in `/server` directory  
- **Shared**: Common types and schemas in `/shared` directory
- **Migrations**: Database migration files in `/migrations` directory

The application follows a monorepo structure with clear separation between frontend, backend, and shared code, enabling efficient development and deployment workflows.