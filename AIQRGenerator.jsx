import React, { useState } from 'react';
import { Download, Sparkles, Zap, Loader2 } from 'lucide-react';

const AIQRGenerator = () => {
  // State management
  const [prompt, setPrompt] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // IMPORTANT: Move your API key to environment variables for security
  // Create a .env file in your project root and add:
  // VITE_REPLICATE_API_KEY=your_api_key_here
 const API_KEY = import.meta.env.VITE_REPLICATE_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_REPLICATE_API_KEY environment variable is not set');
}

  // Updated API function to use proxy server
  const generateQRWithReplicate = async (prompt, qrData) => {
    try {
      const response = await fetch('http://localhost:3001/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          qrData: qrData,
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return {
        success: true,
        imageUrl: result.output && result.output[0] ? result.output[0] : null
      };
      
    } catch (error) {
      console.error('API error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };

  // No longer needed - proxy server handles polling

  // Main generation function
  const handleGenerate = async () => {
    // Input validation
    if (!prompt.trim()) {
      setError('Please enter a creative prompt');
      return;
    }
    if (!qrData.trim()) {
      setError('Please enter data for the QR code');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const result = await generateQRWithReplicate(prompt, qrData);
      
      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else {
        setError(result.error || 'Failed to generate QR code');
      }
    } catch (err) {
      setError('An error occurred while generating the QR code');
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Download functionality
  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">AI QR Generator</h1>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-lg">
            Create stunning, artistic QR codes with AI magic
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Create Your QR Code
            </h2>
            
            {/* Creative Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Creative Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the style you want... (e.g., 'cyberpunk neon city', 'watercolor flowers', 'geometric minimalist')"
                className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            {/* QR Data Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                QR Code Data
              </label>
              <input
                type="text"
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                placeholder="Enter URL, text, or data to encode..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate QR Code
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Generated QR Code
            </h2>
            
            <div className="aspect-square bg-white/5 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300">Creating your AI QR code...</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full h-full p-4">
                  <img 
                    src={generatedImage} 
                    alt="Generated AI QR Code" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <p>Your AI-generated QR code will appear here</p>
                </div>
              )}
            </div>

            {/* Download Button */}
            {generatedImage && (
              <button
                onClick={handleDownload}
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">How to Use:</h3>
          <ol className="text-gray-300 space-y-2">
            <li>1. Enter a creative prompt describing your desired style</li>
            <li>2. Add the data you want encoded in the QR code</li>
            <li>3. Click "Generate QR Code" and wait for the AI magic</li>
            <li>4. Download your beautiful, functional QR code</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AIQRGenerator;