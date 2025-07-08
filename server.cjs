// server.js - Simple proxy server for Replicate API
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Your API key (keep this secure!)
const VITE_REPLICATE_API_KEY = 'r8_GBxG6VdUacjlPX5LhekFikvLhiqmvGM1oMVTX';

app.use(cors());
app.use(express.json());

// Proxy endpoint for Replicate API
app.post('/api/generate-qr', async (req, res) => {
  try {
    const { prompt, qrData } = req.body;
    
    console.log('Generating QR code with prompt:', prompt);
    
    // Call Replicate API
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "monster-labs/control_v1p_sd15_qrcode_monster:c7c75a9e7c3f4b8b5b0c6f3e9b2a8d7e1c5b9f8a2d4e7c1b6a9f3e8d2c5b7a4f1",
        input: {
          prompt: prompt,
          qr_code_content: qrData,
          num_inference_steps: 20,
          guidance_scale: 7.5,
          controlnet_conditioning_scale: 1.0,
        }
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`API Error: ${result.detail || 'Unknown error'}`);
    }
    
    // If the prediction is still processing, poll for completion
    if (result.status === 'starting' || result.status === 'processing') {
      const completedResult = await pollForCompletion(result.id);
      return res.json(completedResult);
    }
    
    res.json(result);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to generate QR code'
    });
  }
});

// Poll for completion
async function pollForCompletion(predictionId) {
  const maxAttempts = 30;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${VITE_REPLICATE_API_KEYREPLICATE_API_KEY}`,
        },
      });
      
      const result = await response.json();
      
      if (result.status === 'succeeded') {
        return result;
      }
      
      if (result.status === 'failed') {
        throw new Error(result.error || 'Generation failed');
      }
      
      // Wait 10 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
      
    } catch (error) {
      throw error;
    }
  }
  
  throw new Error('Generation timed out');
}

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`🔗 Use this endpoint: http://localhost:${PORT}/api/generate-qr`);
});