# FlipFund - Real Estate Crowdfunding Platform

FlipFund is a modern crowdfunding platform that connects real estate flippers with investors. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion, it provides a seamless experience for both property flippers and investors.

## Features

- 🏠 Property Listings: Browse and invest in carefully vetted real estate opportunities
- 💰 Investment Tracking: Monitor your investments and returns in real-time
- 📊 Analytics Dashboard: Track performance metrics and portfolio growth
- 🔐 Secure Authentication: Built-in user authentication and role-based access
- 💳 Payment Processing: Integrated with Stripe for secure transactions
- 🎨 Modern UI: Beautiful, responsive design with smooth animations
- 📱 Mobile-First: Optimized for all devices and screen sizes

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Authentication:** Supabase Auth
- **Database:** Supabase
- **Payments:** Stripe
- **Forms:** React Hook Form with Zod validation
- **Icons:** React Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flipfund.git
   cd flipfund
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # App router pages
├── components/         # Reusable components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   ├── layout/        # Layout components
│   └── ui/            # UI components
├── lib/               # Utility functions and configurations
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by Hunter.io and Apple.com
- Icons from React Icons
- UI components built with Tailwind CSS
