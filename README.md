# The 900 Apartments - Interactive Floor Plan System

A modern apartment management system with interactive floor plans, built with Laravel, Inertia.js, and React.

## Features

### User Interface
- **Interactive Floor Plans**: Browse apartments with real-time availability
- **2D/3D Views**: Toggle between 2D floor plans and 3D virtual tours
- **Unit Details Modal**: Detailed information with pricing, amenities, and floor plans
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Hover Tooltips**: Quick unit information on hover

### Admin Interface
- **Unit Management**: Create, edit, and manage apartment units
- **Status Updates**: Mark units as available, occupied, maintenance, or reserved
- **Real-time Pricing**: Set and update rental prices
- **Floor Management**: Organize units by floors and buildings
- **Availability Tracking**: Monitor unit availability and occupancy

### Technical Features
- **Laravel Backend**: Robust API with proper relationships
- **Inertia.js**: Seamless SPA experience without API complexity
- **React Components**: Modern, reusable UI components
- **Tailwind CSS**: Beautiful, responsive styling
- **Database Seeding**: Sample data for floors 2-6 with units 201-239

## Database Structure

### Buildings
- Building information and amenities
- Multiple floors per building

### Floors
- Floor-specific information
- SVG floor plan data
- Associated with buildings

### Unit Types
- A3-1: 1 bed/1 bath (652 sq ft)
- B2-1: 2 bed/2 bath (950 sq ft) 
- C1-1: 1 bed/1 bath (580 sq ft)

### Units
- Individual apartment units
- Status tracking (available, occupied, maintenance, reserved)
- Pricing and availability dates
- Coordinates for floor plan positioning

## Setup Instructions

1. **Install Dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   ```bash
   # Configure your database in .env file
   php artisan migrate
   php artisan db:seed
   ```

4. **Build Assets**
   ```bash
   npm run build
   # or for development
   npm run dev
   ```

5. **Start Server**
   ```bash
   php artisan serve
   ```

## Usage

### Public Interface
- Visit `/floor-plans/dynamic` to browse available apartments
- Click on floors to view interactive floor plans
- Hover over units for quick information
- Click available units for detailed modal with floor plans

### Admin Interface
- Login and visit `/admin/units` for unit management
- Update unit status, pricing, and availability
- Create new units and manage existing ones

## Routes

### Public Routes
- `/` - Welcome page
- `/floor-plans/dynamic` - Interactive floor plan browser
- `/api/units/{unit}` - Unit details API

### Admin Routes (Authenticated)
- `/admin/units` - Unit management dashboard
- `/admin/units/create` - Create new unit
- `/admin/units/{unit}/edit` - Edit unit
- `/admin/units/{unit}/status` - Update unit status

## Components

### Floor Plan Components
- `FloorSelector` - Building and floor navigation
- `FloorPlanViewer` - Interactive SVG floor plan
- `UnitTooltip` - Hover information display
- `UnitModal` - Detailed unit information modal

### Admin Components
- `Units/Index` - Unit management dashboard
- Status update controls
- Filtering and search functionality

## Customization

### Adding New Unit Types
1. Create new unit type in database
2. Update seeder with new type information
3. Adjust pricing logic in seeder

### Customizing Floor Plans
1. Update floor plan SVG data in database
2. Modify coordinates for unit positioning
3. Adjust FloorPlanViewer component for custom layouts

### Styling
- Tailwind CSS classes throughout
- Color coding for unit status
- Responsive design patterns

## Sample Data

The system includes sample data for:
- 1 building (The 900 Apartments)
- 5 floors (floors 2-6)
- 195 units (39 units per floor, numbered 201-239, 301-339, etc.)
- 3 unit types with different layouts and pricing
- Mixed availability status for demonstration

## Technology Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 18, Inertia.js 2.0
- **Styling**: Tailwind CSS 3.2
- **Database**: MySQL/PostgreSQL
- **Build Tool**: Vite
- **Icons**: Heroicons, Lucide React

## Future Enhancements

- 3D virtual tour integration
- Online booking system
- Payment processing
- Tenant portal
- Maintenance request system
- Document management
- Email notifications
- Advanced reporting
- Mobile app
- Virtual reality tours