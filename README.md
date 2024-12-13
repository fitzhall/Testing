# Creator Business Score

A React application that helps creators assess their business health and receive personalized recommendations.

## Tech Stack

- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase
- PostHog Analytics
- React Hot Toast
- Recharts
- Lucide React Icons

## Features

- Multi-step assessment form
- Real-time score calculation
- Interactive visualizations
- Analytics tracking
- Detailed analysis generation
- Email report delivery

## Project Structure

```
src/
├── components/        # React components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
│   ├── analytics/    # Analytics tracking
│   ├── scoring/      # Score calculation
│   └── analysis/     # Analysis generation
├── types/            # TypeScript types
└── config/           # Configuration files
```

## Environment Variables

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_POSTHOG_KEY=your_posthog_key
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```