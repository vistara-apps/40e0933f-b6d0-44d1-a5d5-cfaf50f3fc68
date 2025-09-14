# VeriLex - AI-Powered Legal Verification

VeriLex is a Base Mini App that enables founders to get AI-generated legal memos verified by human lawyers, simulating hyper-local, expert advice.

## Features

- **AI Memo Generation**: Generate comprehensive legal memos using advanced AI
- **Lawyer Network**: Connect with verified lawyers from top firms
- **Review Workflow**: Streamlined process for lawyer review and approval
- **Jurisdictional Compliance**: Support for multiple jurisdictions and legal areas
- **Subscription Model**: Tiered plans with memo credits and review options

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **AI**: OpenAI GPT-4 (via OpenRouter)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/verilex.git
   cd verilex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # App providers
├── components/            # React components
│   ├── FrameWrapper.tsx   # Frame container
│   ├── MemoGenerator.tsx  # AI memo generation
│   ├── LawyerNetwork.tsx  # Lawyer selection
│   └── ...               # Other components
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants
└── public/               # Static assets
```

## Key Components

### MemoGenerator
Handles AI-powered legal memo generation with:
- Prompt templates for common legal scenarios
- Jurisdiction and legal area selection
- Real-time generation with loading states

### LawyerNetwork
Manages lawyer discovery and selection:
- Verified lawyer profiles
- Expertise-based filtering
- Availability and rating display

### StatusDashboard
Provides user analytics and activity tracking:
- Memo generation statistics
- Review status tracking
- Recent activity feed

## API Integration

### OpenAI Integration
```typescript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});
```

### MiniKit Integration
```typescript
<MiniKitProvider
  chain={base}
  apiKey={process.env.NEXT_PUBLIC_MINIKIT_API_KEY}
>
  {children}
</MiniKitProvider>
```

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Self-hosted

3. **Configure environment variables** in your deployment platform

4. **Update manifest.json** with your production URLs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@verilex.app or join our Discord community.
