# JupFluencer Helm Generator

Transform your profile picture with our space helmet design and join the Jupiter ecosystem! This Next.js application combines user-uploaded images with a static helmet design using OpenAI's image editing API.

## Features

- 🚀 Upload your profile picture
- 🪐 Automatic combination with space helmet design
- ⚡ Powered by OpenAI's DALL-E image editing
- 💫 Jupiter-inspired dark theme
- 📱 Responsive design
- ⬇️ Download your generated helm avatar

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **OpenAI API** for image generation
- **File Upload** handling for images

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd auto-generate-picture
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Make sure you have the helmet.png file in the `/public` directory

5. Add your logo.jpg file to the `/public` directory

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Upload**: Users upload their profile picture
2. **Process**: The image is sent to OpenAI's DALL-E API along with the helmet design
3. **Generate**: AI combines the user's photo with the space helmet
4. **Download**: Users can download their new JupFluencer helm avatar

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # OpenAI API integration
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main upload and generation UI
├── lib/
│   └── openai.ts                 # OpenAI client configuration
public/
├── helmet.png                    # Static helmet design
└── logo.jpg                     # JupFluencer logo
```

## Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## API Routes

### POST /api/generate

Generates a new profile picture by combining the uploaded image with the helmet design.

**Request**: FormData with `image` file
**Response**: JSON with base64 encoded generated image

## Customization

- Update the helmet design by replacing `/public/helmet.png`
- Modify the AI prompt in `/src/app/api/generate/route.ts`
- Customize the theme colors in the Tailwind classes
- Add your own logo by replacing `/public/logo.jpg`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Join the Jupiter ecosystem with your custom helm avatar!** 🚀
