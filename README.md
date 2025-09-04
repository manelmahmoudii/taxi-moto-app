# 🏍️ MotoRide - Moto Taxi Service Platform

A modern, full-stack web application for moto taxi services, similar to Uber/Bolt but specifically designed for motorcycle transportation. Built with Next.js and optimized for mobile-first experience.

## 📱 Platform Type

**This is a responsive web application, not a native mobile app.** It's designed with a mobile-first approach and works seamlessly on:
- Mobile browsers (iOS Safari, Android Chrome)
- Desktop browsers
- Tablets
- Can be installed as a PWA (Progressive Web App)

## 🚀 Technologies Used

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and server components
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Framer Motion** - Smooth animations and transitions

### Backend & Database
- **Supabase** - Backend-as-a-Service (Authentication, Database, Real-time)
- **PostgreSQL** - Primary database (via Supabase)
- **Neon** - Alternative PostgreSQL provider
- **Server Actions** - Next.js server-side functions

### Development & Deployment
- **Docker & Docker Compose** - Containerization
- **Vercel** - Deployment platform
- **ESLint & Prettier** - Code quality and formatting

## 📁 Project Structure

\`\`\`
moto-taxi-app/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard
│   │   ├── dashboard/           # Admin overview and metrics
│   │   └── drivers/             # Driver management
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # User login
│   │   ├── register/            # User registration
│   │   ├── check-email/         # Email verification
│   │   └── success/             # Registration success
│   ├── book/                     # Ride booking interface
│   ├── driver/                   # Driver-specific pages
│   │   ├── dashboard/           # Driver dashboard
│   │   ├── profile/             # Driver profile management
│   │   ├── earnings/            # Earnings tracking
│   │   └── payouts/             # Payout management
│   ├── rider/                    # Customer-specific pages
│   │   ├── dashboard/           # Rider dashboard
│   │   └── payment/             # Payment methods
│   ├── payment/                  # Payment processing
│   │   ├── checkout/            # Payment checkout
│   │   ├── success/             # Payment success
│   │   └── receipt/             # Ride receipts
│   ├── track/                    # Real-time ride tracking
│   ├── notifications/            # Notification settings
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Homepage/landing page
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui base components
│   ├── interactive-map.tsx      # Map component with geolocation
│   └── notification-center.tsx  # Notification system
├── lib/                         # Utility libraries
│   └── supabase/               # Supabase client configuration
│       ├── client.ts           # Browser client
│       ├── server.ts           # Server client
│       └── middleware.ts       # Auth middleware
├── hooks/                       # Custom React hooks
│   └── use-toast.ts            # Toast notification hook
├── scripts/                     # Database and setup scripts
│   ├── 001_create_tables.sql   # Database schema
│   ├── 002_create_triggers.sql # Database triggers
│   └── setup-docker.sh         # Docker setup script
├── docker-compose.yml           # Docker services configuration
├── Dockerfile                   # Container configuration
├── Makefile                     # Development commands
└── README-DOCKER.md            # Docker-specific documentation
\`\`\`

## 🎯 Key Features

### For Customers (Riders)
- **User Registration & Authentication** - Secure signup/login with email verification
- **Interactive Booking** - Set pickup/destination with map integration
- **Real-time Tracking** - Live driver location and ETA updates
- **Payment Processing** - Multiple payment methods (card, cash, digital wallets)
- **Ride History** - Complete history with receipts and ratings
- **Notifications** - Real-time updates on ride status

### For Drivers
- **Driver Dashboard** - Online/offline status, incoming ride requests
- **Profile Management** - Vehicle details, documents, verification
- **Earnings Tracking** - Daily/weekly/monthly earnings with breakdowns
- **Navigation Interface** - Turn-by-turn directions to pickup/destination
- **Payout Management** - Multiple payout methods and history

### For Administrators
- **Admin Dashboard** - Platform overview with key metrics
- **Driver Management** - Approve/reject driver applications
- **Ride Monitoring** - Real-time ride tracking and dispute handling
- **Analytics** - Revenue, user growth, and performance metrics
- **User Management** - Customer and driver account management

## 🛠️ Setup Instructions

### Quick Start with Docker (Recommended)
\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd moto-taxi-app

# Run the setup script
chmod +x scripts/setup-docker.sh
./scripts/setup-docker.sh

# Or use Make commands
make setup
\`\`\`

### Manual Setup
\`\`\`bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Set up Supabase (see Supabase Setup section)
# Add your environment variables to .env.local

# Run database migrations
# Execute scripts/001_create_tables.sql in your Supabase dashboard
# Execute scripts/002_create_triggers.sql in your Supabase dashboard

# Start development server
npm run dev
\`\`\`

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Development
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Optional: Neon Database (alternative to Supabase)
NEON_NEON_DATABASE_URL=your_neon_database_url
\`\`\`

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts (riders and drivers)
- **user_profiles** - Extended user information
- **drivers** - Driver-specific information and verification
- **rides** - Ride requests and history
- **payments** - Payment transactions
- **notifications** - User notifications

## 🎨 Design System

### Color Palette
- **Primary**: Fresh Green (#2ecc71) - Action buttons, highlights
- **Secondary**: Charcoal (#2c3e50) - Text, navigation
- **Accent**: Light Green (#27ae60) - Success states
- **Neutral**: Grays and whites for backgrounds and borders

### Typography
- **Headings**: Inter font family, weights 400-700
- **Body**: Inter font family, weights 400-500
- **Mobile-first**: Responsive typography with proper line heights

### Layout Principles
- **Mobile-first design** - Optimized for smartphone usage
- **Flexbox layouts** - Consistent spacing and alignment
- **Generous whitespace** - Clean, uncluttered interface
- **Smooth animations** - Enhanced user experience

## 🚀 Development Workflow

### Available Scripts
\`\`\`bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Docker commands
make setup              # Initial setup with Docker
make dev                # Start development environment
make build              # Build Docker images
make logs               # View container logs
make clean              # Clean up containers and images

# Database
make db-reset           # Reset database
make db-migrate         # Run migrations
\`\`\`

### Code Quality
- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting with Next.js rules
- **Prettier** - Consistent code formatting
- **Component-based architecture** - Reusable, maintainable components

## 📱 Mobile Optimization

### Responsive Design
- **Mobile-first CSS** - Tailwind breakpoints (sm, md, lg, xl)
- **Touch-friendly UI** - Proper button sizes and spacing
- **Gesture support** - Swipe actions where appropriate
- **Fast loading** - Optimized images and code splitting

### Progressive Web App (PWA) Features
- **Installable** - Can be added to home screen
- **Offline support** - Basic functionality without internet
- **Push notifications** - Real-time updates (when implemented)
- **App-like experience** - Full-screen, native feel

## 🔐 Security Features

### Authentication
- **Supabase Auth** - Secure user authentication
- **Email verification** - Confirmed email addresses
- **Row Level Security (RLS)** - Database-level access control
- **JWT tokens** - Secure session management

### Data Protection
- **Input validation** - Client and server-side validation
- **SQL injection prevention** - Parameterized queries
- **CORS configuration** - Proper cross-origin settings
- **Environment variables** - Sensitive data protection

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Docker Deployment
\`\`\`bash
# Build and run with Docker Compose
docker-compose up -d

# Or build for production
docker build -t moto-taxi-app .
docker run -p 3000:3000 moto-taxi-app
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
1. Check the documentation in this README
2. Review the Docker setup guide in `README-DOCKER.md`
3. Check the database scripts in the `scripts/` folder
4. Open an issue on GitHub for bugs or feature requests

---

**Built with ❤️ using Next.js, Supabase, and modern web technologies**
