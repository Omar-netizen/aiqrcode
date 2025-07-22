# AI QR Generator 🎨✨

A beautiful, modern web application that generates artistic QR codes using AI. Transform boring QR codes into stunning visual art while maintaining full functionality.


# Screenshot
<img width="1667" height="816" alt="image" src="https://github.com/user-attachments/assets/e7cdbd64-eb5f-4510-a968-c6b89e38a125" />



## 🌟 Features

- **AI-Powered Design**: Create QR codes with artistic styles using creative prompts
- **Custom Data**: Encode any URL, text, or data into your QR codes
- **Beautiful UI**: Modern, responsive design with glassmorphism effects
- **Download Ready**: High-quality PNG downloads for immediate use
- **Real-time Generation**: Watch your artistic QR codes come to life
- **Mobile Responsive**: Works perfectly on all device sizes

## 🎯 Use Cases

- **Marketing Materials**: Eye-catching QR codes for campaigns and advertisements
- **Event Management**: Beautiful QR codes for tickets, invitations, and check-ins
- **Business Cards**: Professional QR codes that match your brand aesthetic
- **Art Projects**: Create QR codes that double as decorative elements
- **Social Media**: Share stylized QR codes that stand out in feeds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Replicate API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-qr-generator.git
   cd ai-qr-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```env
   VITE_REPLICATE_API_KEY=your_replicate_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

## 🔧 Configuration

### Getting a Replicate API Key

1. Sign up at [Replicate.com](https://replicate.com)
2. Go to your account settings
3. Generate an API key
4. Add it to your `.env` file

### Backend Setup (Optional)

If you're using the proxy server approach mentioned in the code:

1. Create a simple Express.js backend server
2. Set it up on `http://localhost:3001`
3. Configure CORS for your frontend domain

## 📝 How to Use

1. **Enter a Creative Prompt**
   - Describe the artistic style you want (e.g., "cyberpunk neon city", "watercolor flowers")
   - Be creative and specific for better results

2. **Add Your QR Data**
   - Enter any URL, text, or data you want to encode
   - This can be website URLs, contact info, WiFi passwords, etc.

3. **Generate Your QR Code**
   - Click the "Generate QR Code" button
   - Wait for the AI to work its magic (usually 30-60 seconds)

4. **Download and Use**
   - Download your high-quality PNG file
   - Use it anywhere you need a QR code!

## 🛠️ Built With

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Beautiful icons
- **Replicate AI** - AI model for QR generation

## 📁 Project Structure

```
ai-qr-generator/
├── src/
│   ├── components/
│   │   └── AIQRGenerator.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your Replicate API key secure
- The `.env` file is already included in `.gitignore`
- Consider using environment-specific API keys for development and production

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_REPLICATE_API_KEY` | Your Replicate API key for AI generation | Yes |

## 🎨 Customization

You can easily customize the application by:

- Modifying colors in the Tailwind classes
- Adjusting the gradient backgrounds
- Adding new input fields or options
- Implementing different AI models or parameters

## 🐛 Troubleshooting

### Common Issues

1. **"API key not determined" error**
   - Make sure your `.env` file exists in the project root
   - Verify the variable name is exactly `VITE_REPLICATE_API_KEY`
   - Restart your development server after adding the API key

2. **Generation takes too long**
   - AI generation typically takes 30-60 seconds
   - Check your internet connection
   - Verify your Replicate API key is valid and has credits

3. **Images not displaying**
   - Check browser console for CORS errors
   - Ensure the image URLs are accessible
   - Try refreshing the page


## 🙏 Acknowledgments

- [Replicate](https://replicate.com) for providing the AI infrastructure
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- The open-source community for inspiration and support


