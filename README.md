# RLTR - AI-Native Infrastructure Platform for Real Estate

RLTR is an AI-native infrastructure platform built to modernize how real estate agents operate. Today's brokerage ecosystem is fragmented—agents juggle half a dozen tools to search the MLS, draft contracts, manage transactions, and communicate with clients. RLTR eliminates that fragmentation by unifying everything into one intelligent operating system. It doesn't just digitize the old workflow—it redefines it through automation, semantic understanding, and integrated AI reasoning.

## Core Modules

### MLS Agent
The MLS Agent serves as a smarter, faster wrapper around traditional MLS systems, letting agents query listings in natural language and receive intelligent insights—like comps, pricing anomalies, or recommendations tailored to a client's profile.

### Legal Agent
The Legal Agent acts as an AI transaction coordinator, automatically drafting contracts, connecting to DocuSign or Glide for e-signatures, and handling checklist tasks like escrow, inspection, and appraisal scheduling.

### Custom Agent (Coming Soon)
A drag-and-drop workflow builder where agents can create automations for their own business logic—sending comps to clients, scheduling showings, or triggering offers based on market updates. The system uses a Model Context Protocol (MCP) layer to let agents interact with AI workflows directly, turning everyday actions into reusable automations.

## Mission

RLTR's mission is simple: to make real estate operations intelligent, efficient, and beautifully integrated—so agents spend time building relationships, not managing software.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Authentication:** Supabase Auth
- **Database:** Supabase
- **Forms:** React Hook Form with Zod validation
- **Icons:** React Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rltr.git
   cd rltr
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
