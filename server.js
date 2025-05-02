// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import { Anthropic } from '@anthropic-ai/sdk';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load environment variables
// dotenv.config();

// const app = express();
// const upload = multer({ limits: { fileSize: 25 * 1024 * 1024 } }); // 25MB limit

// // Enable CORS and JSON parsing
// app.use(cors());
// app.use(express.json({ limit: '25mb' }));

// // Test endpoint
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API server is working!' });
// });

// // Initialize Anthropic client
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY,
// });

// // Process PDF endpoint
// app.post('/api/process-pdf', upload.single('pdfFile'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No PDF file provided' });
//     }

//     const pdfBase64 = req.file.buffer.toString('base64');
//     const template = req.body.template;
    
//     if (!template) {
//       return res.status(400).json({ error: 'No template specified' });
//     }

//     const message = await anthropic.messages.create({
//       model: 'claude-3-7-sonnet-20250219',
//       max_tokens: 4096,
//       messages: [
//         {
//           role: 'user',
//           content: [
//             {
//               type: 'document',
//               source: {
//                 type: 'base64',
//                 media_type: 'application/pdf',
//                 data: pdfBase64,
//               },
//             },
//             {
//               type: 'text',
//               text: `Please analyze this PDF document and update the following SVG template with the relevant information. Here's the SVG template: ${req.body.svgTemplate}. Please return only the modified SVG with the content updated based on the PDF analysis.`
//             }
//           ]
//         }
//       ]
//     });

//     res.json({ svg: message.content[0].text });
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({ 
//       error: 'Error processing file', 
//       details: error.message 
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });