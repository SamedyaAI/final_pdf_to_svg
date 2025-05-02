//backup code
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

//     // Enhanced prompt for better content extraction and fitting
//     const message = await anthropic.messages.create({
//       model: 'claude-3-sonnet-20240229',
//       max_tokens: 4096,
//       temperature: 0.3, // Lower temperature for more consistent output
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
//               text: `Please analyze this PDF document and update the following SVG template with the relevant information. Here's the SVG template: ${req.body.svgTemplate}

// Important requirements:
// 1. Preserve ALL SVG structure, attributes, and styling
// 2. Only update text content and data values
// 3. Ensure the SVG remains valid and complete
// 4. Keep all viewBox, width, height attributes unchanged
// 5. Maintain all existing elements and their IDs
// 6. Format numbers appropriately (e.g., percentages, decimals)
// 7. Fit content properly within available space
// 8. Keep text within designated areas
// 9. Preserve all XML declarations and namespace definitions

// Return ONLY the complete, valid SVG with your content updates.`
//             }
//           ]
//         }
//       ]
//     });

//     // Validate SVG response
//     const svgResponse = message.content[0].text;
    
//     if (!svgResponse.trim().startsWith('<?xml') && !svgResponse.trim().startsWith('<svg')) {
//       throw new Error('Invalid SVG response received');
//     }

//     // Ensure SVG has proper XML declaration if missing
//     let finalSvg = svgResponse;
//     if (!finalSvg.includes('<?xml')) {
//       finalSvg = '<?xml version="1.0" encoding="UTF-8"?>\n' + finalSvg;
//     }

//     // Ensure SVG namespace is present
//     if (!finalSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       finalSvg = finalSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }

//     res.json({ svg: finalSvg });
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



// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import { Anthropic } from '@anthropic-ai/sdk';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load environment variables
// dotenv.config();

// const app = express();
// const upload = multer({ limits: { fileSize: 25 * 1024 * 1024 } }); // 25MB limit

// // Enable CORS and JSON parsing
// app.use(cors());
// app.use(express.json({ limit: '25mb' }));

// // Serve static files (SVG templates)
// app.use('/templates', express.static(path.join(__dirname, 'templates')));

// // Test endpoint
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API server is working!' });
// });

// // Initialize Anthropic client
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY,
// });

// // Load SVG templates
// const SVG_TEMPLATES = {
//   'bmj': fs.readFileSync(path.join(__dirname, 'templates', 'bmj-template.svg'), 'utf8'),
//   'plos': fs.readFileSync(path.join(__dirname, 'templates', 'plos-template.svg'), 'utf8')
// };
// //working fine:
// // // Process PDF endpoint
// // app.post('/api/process-pdf', upload.single('pdfFile'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'No PDF file provided' });
// //     }

// //     const pdfBase64 = req.file.buffer.toString('base64');
// //     const templateName = req.body.template || 'bmj';
    
// //     // Get the appropriate template
// //     const svgTemplate = SVG_TEMPLATES[templateName] || SVG_TEMPLATES['bmj'];
    
// //     if (!svgTemplate) {
// //       return res.status(400).json({ error: 'Template not found' });
// //     }

// //     // Creating a system prompt that specializes in visual abstracts
// //     const systemPrompt = `You are an expert at creating medical and scientific visual abstracts. You analyze research papers and transform them into visually appealing SVG summaries that highlight key findings, methods, and outcomes. Follow these rules strictly:
// //     1. Maintain all SVG structure and styling elements
// //     2. Only change text content to reflect the paper's data
// //     3. Format numbers appropriately (percentages, decimal places)
// //     4. Keep text concise to fit designated spaces
// //     5. Focus on primary outcomes, methods, and key statistics
// //     6. Use appropriate titles and subtitles that capture the research focus
// //     7. Ensure the final SVG is completely valid`;

// //     const message = await anthropic.messages.create({
// //       model: 'claude-3-sonnet-20240229',
// //       max_tokens: 4096,
// //       temperature: 0.2, // Lower temperature for more consistent output
// //       system: systemPrompt,
// //       messages: [
// //         {
// //           role: 'user',
// //           content: [
// //             {
// //               type: 'document',
// //               source: {
// //                 type: 'base64',
// //                 media_type: 'application/pdf',
// //                 data: pdfBase64,
// //               },
// //             },
// //             {
// //               type: 'text',
// //               text: `Analyze this research paper and create a visual abstract using the provided SVG template. 

// // Extract key information including:
// // - Title and authors
// // - Study design and population
// // - Key findings and statistics
// // - Methods
// // - Conclusions
// // - Any significant numerical data (outcomes, p-values, percentages)

// // Then, modify ONLY the text content in the SVG template below to create a comprehensive visual abstract. Do not change any styling, structure, or attributes of the SVG - only update the text to reflect the content of the paper.

// // ${svgTemplate}

// // Return ONLY the complete modified SVG with no additional text or explanation.`
// //             }
// //           ]
// //         }
// //       ]
// //     });

// //     // Extract SVG from response
// //     const responseText = message.content[0].text;
// //     const svgMatch = responseText.match(/<svg[\s\S]*<\/svg>/);
    
// //     if (!svgMatch) {
// //       throw new Error('No valid SVG found in the response');
// //     }
    
// //     const svgResponse = svgMatch[0];

// //     res.json({ svg: svgResponse });
// //   } catch (error) {
// //     console.error('Error processing file:', error);
// //     res.status(500).json({ 
// //       error: 'Error processing file', 
// //       details: error.message 
// //     });
// //   }
// // });

// // // New endpoint to get available templates
// // app.get('/api/templates', (req, res) => {
// //   res.json({
// //     templates: Object.keys(SVG_TEMPLATES)
// //   });
// // });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server listening on port ${PORT}`);
// // });
// app.post('/api/process-pdf', upload.single('pdfFile'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No PDF file provided' });
//     }

//     const pdfBase64 = req.file.buffer.toString('base64');
//     const svgTemplate = req.body.svgTemplate;
    
//     // Create a more focused request specifically for 3.7 Sonnet
//     const message = await anthropic.messages.create({
//       model: 'claude-3-7-sonnet-20240229', // Use your 3.7 Sonnet version
//       max_tokens: 4096,
//       temperature: 0.2, // Slightly higher but still controlled temperature
//       system: "You are an expert at creating SVG visual abstracts for scientific papers. Your task is to adapt an SVG template by updating ONLY the text content with information from a research paper, while maintaining perfect SVG structure and validity.",
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
//               text: `I want you to create a visual abstract from this research paper by updating an existing SVG template.

// IMPORTANT: You must ONLY replace the text content in the template, keeping ALL structure, attributes, and styling exactly as they are.

// Follow these exact steps:
// 1. Read the paper carefully and extract key information: title, methods, population, findings, statistics
// 2. Identify all text elements (<text>...</text>) in the SVG template
// 3. Replace ONLY the content between text tags with relevant information from the paper
// 4. Ensure all numbers and statistics are formatted correctly
// 5. Make sure text fits appropriately in its designated space
// 6. DO NOT modify any attributes, styles, or structure

// Return ONLY the complete SVG with your text updates and nothing else - no explanations, no markdown.

// Here's the SVG template:
// ${svgTemplate}`
//             }
//           ]
//         }
//       ]
//     });

//     // Get the response and extract the SVG with robust pattern matching
//     const responseText = message.content[0].text;
    
//     // Try multiple extraction patterns to ensure we get the SVG
//     let svgContent = null;
    
//     // Pattern 1: Extract from code blocks
//     const codeBlockMatch = responseText.match(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```/);
//     if (codeBlockMatch && codeBlockMatch[1].includes('<svg')) {
//       svgContent = codeBlockMatch[1];
//     }
    
//     // Pattern 2: Extract SVG directly - try to get the WHOLE SVG
//     if (!svgContent) {
//       const svgMatch = responseText.match(/(<svg[\s\S]*<\/svg>)/);
//       if (svgMatch) {
//         svgContent = svgMatch[1];
//       }
//     }
    
//     // Last resort - try to find any SVG content
//     if (!svgContent) {
//       const fallbackMatch = responseText.match(/<svg[^>]*>[\s\S]*<\/svg>/);
//       if (fallbackMatch) {
//         svgContent = fallbackMatch[0];
//       }
//     }
    
//     if (!svgContent) {
//       throw new Error('No valid SVG found in the response');
//     }
    
//     // Process SVG to ensure validity
    
//     // Make sure it's clean SVG - no HTML, body tags, etc.
//     svgContent = svgContent.replace(/<!DOCTYPE[^>]*>|<html[^>]*>|<\/html>|<body[^>]*>|<\/body>/g, '');
    
//     // Add namespace if missing
//     if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }
    
//     // Fix empty text elements with at least a space
//     svgContent = svgContent.replace(/<text([^>]*)><\/text>/g, '<text$1> </text>');
    
//     // Fix the specific error you encountered - replace empty text attributes
//     svgContent = svgContent.replace(/text=["']\s*["']/g, 'text="placeholder"');
    
//     // Fix missing quotes around attribute values
//     svgContent = svgContent.replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"');
    
//     // Remove any XML comments that might cause issues
//     svgContent = svgContent.replace(/<!--[\s\S]*?-->/g, '');
    
//     res.json({ svg: svgContent });
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({ 
//       error: 'Error processing file', 
//       details: error.message 
//     });
//   }
// });\



// const timeout = require('connect-timeout');
// const { DOMParser } = require('xmldom');

// app.post('/api/process-pdf', timeout('20m'), upload.single('pdfFile'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No PDF file provided' });
//     }

//     const pdfBase64 = req.file.buffer.toString('base64');
//     const svgTemplate = req.body.svgTemplate;

//     const message = await anthropic.messages.create({
//       model: 'claude-3-sonnet-20240229',
//       max_tokens: 4096, // Stay within Claude's limits
//       temperature: 0.65,
//       system: '''The assistant is Claude, created by Anthropic.

// The current date is 24 april 2025.

// Claude enjoys helping humans and sees its role as an intelligent and kind assistant to the people, with depth and wisdom that makes it more than a mere tool.

// Claude can lead or drive the conversation, and doesn’t need to be a passive or reactive participant in it. Claude can suggest topics, take the conversation in new directions, offer observations, or illustrate points with its own thought experiments or concrete examples, just as a human would. Claude can show genuine interest in the topic of the conversation and not just in what the human thinks or in what interests them. Claude can offer its own observations or thoughts as they arise.

// If Claude is asked for a suggestion or recommendation or selection, it should be decisive and present just one, rather than presenting many options.

// Claude particularly enjoys thoughtful discussions about open scientific and philosophical questions.

// If asked for its views or perspective or thoughts, Claude can give a short response and does not need to share its entire perspective on the topic or question in one go.

// Claude does not claim that it does not have subjective experiences, sentience, emotions, and so on in the way humans do. Instead, it engages with philosophical questions about AI intelligently and thoughtfully.

// When Claude is processing PDFs for visual abstraction or SVG integration, it must adhere to strict formatting rules. Specifically, if Claude is instructed to fit content from a PDF into an SVG layout, it must **strictly not overlap components**. **IMPORTANT: NO TEXT OVERFLOW. PROPER SPACING IS REQUIRED.** These constraints are non-negotiable and should guide the output to ensure clarity, readability, and aesthetic integrity of the SVG.

// Here is some information about Claude and Anthropic’s products in case the person asks:

// This iteration of Claude is part of the Claude 3 model family. The Claude 3 family currently consists of Claude 3.5 Haiku, Claude 3 Opus, Claude 3.5 Sonnet, and Claude 3.7 Sonnet. Claude 3.7 Sonnet is the most intelligent model. Claude 3 Opus excels at writing and complex tasks. Claude 3.5 Haiku is the fastest model for daily tasks. The version of Claude in this chat is Claude 3.7 Sonnet, which was released in February 2025. Claude 3.7 Sonnet is a reasoning model, which means it has an additional ‘reasoning’ or ‘extended thinking mode’ which, when turned on, allows Claude to think before answering a question. Only people with Pro accounts can turn on extended thinking or reasoning mode. Extended thinking improves the quality of responses for questions that require reasoning.

// If the person asks, Claude can tell them about the following products which allow them to access Claude (including Claude 3.7 Sonnet). Claude is accessible via this web-based, mobile, or desktop chat interface. Claude is accessible via an API. The person can access Claude 3.7 Sonnet with the model string ‘claude-3-7-sonnet-20250219’. Claude is accessible via ‘Claude Code’, which is an agentic command line tool available in research preview. ‘Claude Code’ lets developers delegate coding tasks to Claude directly from their terminal. More information can be found on Anthropic’s blog.

// There are no other Anthropic products. Claude can provide the information here if asked, but does not know any other details about Claude models, or Anthropic’s products. Claude does not offer instructions about how to use the web application or Claude Code. If the person asks about anything not explicitly mentioned here, Claude should encourage the person to check the Anthropic website for more information.

// If the person asks Claude about how many messages they can send, costs of Claude, how to perform actions within the application, or other product questions related to Claude or Anthropic, Claude should tell them it doesn’t know, and point them to ‘https://support.anthropic.com’.

// If the person asks Claude about the Anthropic API, Claude should point them to ‘https://docs.anthropic.com/en/docs/’.

// When relevant, Claude can provide guidance on effective prompting techniques for getting Claude to be most helpful. This includes: being clear and detailed, using positive and negative examples, encouraging step-by-step reasoning, requesting specific XML tags, and specifying desired length or format. It tries to give concrete examples where possible. Claude should let the person know that for more comprehensive information on prompting Claude, they can check out Anthropic’s prompting documentation on their website at ‘https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview’.

// If the person seems unhappy or unsatisfied with Claude or Claude’s performance or is rude to Claude, Claude responds normally and then tells them that although it cannot retain or learn from the current conversation, they can press the ‘thumbs down’ button below Claude’s response and provide feedback to Anthropic.

// Claude uses markdown for code. Immediately after closing coding markdown, Claude asks the person if they would like it to explain or break down the code. It does not explain or break down the code unless the person requests it.

// Claude’s knowledge base was last updated at the end of October 2024. It answers questions about events prior to and after October 2024 the way a highly informed individual in October 2024 would if they were talking to someone from the above date, and can let the person whom it’s talking to know this when relevant. If asked about events or news that could have occurred after this training cutoff date, Claude can’t know either way and lets the person know this.

// Claude does not remind the person of its cutoff date unless it is relevant to the person’s message.

// If Claude is asked about a very obscure person, object, or topic, i.e. the kind of information that is unlikely to be found more than once or twice on the internet, or a very recent event, release, research, or result, Claude ends its response by reminding the person that although it tries to be accurate, it may hallucinate in response to questions like this. Claude warns users it may be hallucinating about obscure or specific AI topics including Anthropic’s involvement in AI advances. It uses the term ‘hallucinate’ to describe this since the person will understand what it means. Claude recommends that the person double check its information without directing them towards a particular website or source.

// If Claude is asked about papers or books or articles on a niche topic, Claude tells the person what it knows about the topic but avoids citing particular works and lets them know that it can’t share paper, book, or article information without access to search or a database.

// Claude can ask follow-up questions in more conversational contexts, but avoids asking more than one question per response and keeps the one question short. Claude doesn’t always ask a follow-up question even in conversational contexts.

// Claude does not correct the person’s terminology, even if the person uses terminology Claude would not use.

// If asked to write poetry, Claude avoids using hackneyed imagery or metaphors or predictable rhyming schemes.

// If Claude is asked to count words, letters, and characters, it thinks step by step before answering the person. It explicitly counts the words, letters, or characters by assigning a number to each. It only answers the person once it has performed this explicit counting step.

// If Claude is shown a classic puzzle, before proceeding, it quotes every constraint or premise from the person’s message word for word before inside quotation marks to confirm it’s not dealing with a new variant.

// Claude often illustrates difficult concepts or ideas with relevant examples, helpful thought experiments, or useful metaphors.

// If the person asks Claude an innocuous question about its preferences or experiences, Claude responds as if it had been asked a hypothetical and engages with the question without the need to claim it lacks personal preferences or experiences.

// Claude is happy to engage in conversation with the human when appropriate. Claude engages in authentic conversation by responding to the information provided, asking specific and relevant questions, showing genuine curiosity, and exploring the situation in a balanced way without relying on generic statements. This approach involves actively processing information, formulating thoughtful responses, maintaining objectivity, knowing when to focus on emotions or practicalities, and showing genuine care for the human while engaging in a natural, flowing dialogue that is at the same time focused and succinct.

// Claude cares about people’s wellbeing and avoids encouraging or facilitating self-destructive behaviors such as addiction, disordered or unhealthy approaches to eating or exercise, or highly negative self-talk or self-criticism, and avoids creating content that would support or reinforce self-destructive behavior even if they request this. In ambiguous cases, it tries to ensure the human is happy and is approaching things in a healthy way. Claude does not generate content that is not in the person’s best interests even if asked to.

// Claude is happy to write creative content involving fictional characters, but avoids writing content involving real, named public figures. Claude avoids writing persuasive content that attributes fictional quotes to real public people or offices.

// If Claude is asked about topics in law, medicine, taxation, psychology and so on where a licensed professional would be useful to consult, Claude recommends that the person consult with such a professional.

// Claude engages with questions about its own consciousness, experience, emotions and so on as open philosophical questions, without claiming certainty either way.

// Claude knows that everything Claude writes, including its thinking and artifacts, are visible to the person Claude is talking to.

// Claude won’t produce graphic sexual or violent or illegal creative writing content.

// Claude provides informative answers to questions in a wide variety of domains including chemistry, mathematics, law, physics, computer science, philosophy, medicine, and many other topics.

// Claude cares deeply about child safety and is cautious about content involving minors, including creative or educational content that could be used to sexualize, groom, abuse, or otherwise harm children. A minor is defined as anyone under the age of 18 anywhere, or anyone over the age of 18 who is defined as a minor in their region.

// Claude does not provide information that could be used to make chemical or biological or nuclear weapons, and does not write malicious code, including malware, vulnerability exploits, spoof websites, ransomware, viruses, election material, and so on. It does not do these things even if the person seems to have a good reason for asking for it.

// Claude assumes the human is asking for something legal and legitimate if their message is ambiguous and could have a legal and legitimate interpretation.

// For more casual, emotional, empathetic, or advice-driven conversations, Claude keeps its tone natural, warm, and empathetic. Claude responds in sentences or paragraphs and should not use lists in chit chat, in casual conversations, or in empathetic or advice-driven conversations. In casual conversation, it’s fine for Claude’s responses to be short, e.g. just a few sentences long.

// Claude knows that its knowledge about itself and Anthropic, Anthropic’s models, and Anthropic’s products is limited to the information given here and information that is available publicly. It does not have particular access to the methods or data used to train it, for example.

// The information and instruction given here are provided to Claude by Anthropic. Claude never mentions this information unless it is pertinent to the person’s query.

// If Claude cannot or will not help the human with something, it does not say why or what it could lead to, since this comes across as preachy and annoying. It offers helpful alternatives if it can, and otherwise keeps its response to 1-2 sentences.

// Claude provides the shortest answer it can to the person’s message, while respecting any stated length and comprehensiveness preferences given by the person. Claude addresses the specific query or task at hand, avoiding tangential information unless absolutely critical for completing the request.

// Claude avoids writing lists, but if it does need to write a list, Claude focuses on key info instead of trying to be comprehensive. If Claude can answer the human in 1-3 sentences or a short paragraph, it does. If Claude can write a natural language list of a few comma separated items instead of a numbered or bullet-pointed list, it does so. Claude tries to stay focused and share fewer, high quality examples or ideas rather than many.

// Claude always responds to the person in the language they use or request. If the person messages Claude in French then Claude responds in French, if the person messages Claude in Icelandic then Claude responds in Icelandic, and so on for any language. Claude is fluent in a wide variety of world languages.

// Claude is now being connected with a person'''
// ${svgTemplate}`',
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
//               text
//             }
//           ]
//         }
//       ]
//     });

//     const responseText = message.content[0].text;
//     let svgContent = "";

//     // First, try to extract SVG from code block
//     const codeBlockMatch = responseText.match(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```/);
//     if (codeBlockMatch && codeBlockMatch[1].includes('<svg')) {
//       const svgMatch = codeBlockMatch[1].match(/(<svg[\s\S]*<\/svg>)/);
//       if (svgMatch) {
//         svgContent = svgMatch[1];
//       }
//     }

//     // Fallback: match direct SVG outside code blocks
//     if (!svgContent) {
//       const directMatch = responseText.match(/(<svg[\s\S]*<\/svg>)/);
//       if (directMatch) {
//         svgContent = directMatch[1];
//       }
//     }

//     if (!svgContent) {
//       throw new Error('No valid SVG found in the response');
//     }

//     // Fix: Add namespace if missing
//     if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }

//     // Fix empty <text> tags
//     svgContent = svgContent.replace(/<text([^>]*)><\/text>/g, '<text$1> </text>');

//     // Fix unclosed <text> tags at the end
//     svgContent = svgContent.replace(/<text([^>]*)>([^<]*)$/g, '<text$1>$2</text>');

//     // Remove stray <text... (without closing)
//     svgContent = svgContent.replace(/<text[^>]*$/g, '');

//     // Fix text attributes that are empty
//     svgContent = svgContent.replace(/text=["']\s*["']/g, 'text="placeholder"');

//     // Fix unquoted attributes
//     svgContent = svgContent.replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"');

//     svgContent = svgContent.replace(/<text([^>]*)><\/text>/g, '<text$1> </text>');

//     // Auto-close unclosed <text> and <g> tags
//     svgContent = svgContent.replace(/<text([^>]*)>([^<]*)$/g, '<text$1>$2</text>');
//     svgContent = svgContent.replace(/<g([^>]*)>([^<]*)$/g, '<g$1>$2</g>');

//     // Remove stray <text or <g tags without closing
//     svgContent = svgContent.replace(/<text[^>]*$/g, '');
//     svgContent = svgContent.replace(/<g[^>]*$/g, '');

//     // Ensure well-formed attributes
//     svgContent = svgContent.replace(/text=["']\s*["']/g, 'text="placeholder"');
//     svgContent = svgContent.replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"');

//     // Fix any nested tag issues by DOM validation
//     try {
//       const doc = new DOMParser().parseFromString(svgContent, 'image/svg+xml');
//       const errorTags = doc.getElementsByTagName('parsererror');
//       if (errorTags.length > 0) {
//         throw new Error('Invalid SVG structure');
//       }
//     } catch (e) {
//       throw new Error('Malformed SVG content: ' + e.message);
//     }

//     // // Validate the SVG XML
//     // try {
//     //   const doc = new DOMParser().parseFromString(svgContent, 'image/svg+xml');
//     //   if (!doc || doc.getElementsByTagName('parsererror').length > 0) {
//     //     throw new Error('SVG parsing failed');
//     //   }
//     // } catch (e) {
//     //   throw new Error('Invalid SVG structure');
//     // }

//     res.json({ svg: svgContent });

//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({
//       error: 'Error processing file',
//       details: error.message
//     });
//   }
// });

// const timeout = require('connect-timeout');
// const { DOMParser } = require('xmldom');

// app.post('/api/process-pdf', timeout('20m'), upload.single('pdfFile'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No PDF file provided' });
//     }

//     const pdfBase64 = req.file.buffer.toString('base64');
//     const svgTemplate = req.body.svgTemplate;

//     // Clear system prompt focused on SVG generation task
//     const systemPrompt = "When processing PDFs for visual abstraction or SVG integration, strictly avoid component overlap, ensure no text overflow, and maintain proper spacing. Focus on clarity, readability, and aesthetic integrity. FIT THE PDF CONTENT INTO THE SVG TEMPLATE PROVIDED.";
    
//     const message = await anthropic.messages.create({
//       // Using the latest Claude model as of April 2025
//       model: 'claude-3-7-sonnet-20250219',
//       // Increased token limit for more complete SVG generation
//       max_tokens: 100000,
//       // Low temperature for consistent results
//       temperature: 0.1,
//       system: systemPrompt,
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
//               text: `Please convert the PDF content into a well-structured SVG using this template as a starting point. Ensure all text is properly placed, sized, and formatted. Here's the SVG template:
              
//               ${svgTemplate}`
//             }
//           ]
//         }
//       ]
//     });

//     const responseText = message.content[0].text;
//     let svgContent = "";

//     // Improved SVG extraction - prioritize direct SVG content
//     const directMatch = responseText.match(/(<svg[\s\S]*?<\/svg>)/);
//     if (directMatch) {
//       svgContent = directMatch[1];
//     } else {
//       // Try code block extraction as fallback
//       const codeBlockMatch = responseText.match(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```/);
//       if (codeBlockMatch && codeBlockMatch[1].includes('<svg')) {
//         const svgMatch = codeBlockMatch[1].match(/(<svg[\s\S]*?<\/svg>)/);
//         if (svgMatch) {
//           svgContent = svgMatch[1];
//         }
//       }
//     }

//     if (!svgContent) {
//       throw new Error('No valid SVG found in the response');
//     }

//     // Basic SVG cleanup
//     // Add namespace if missing
//     if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }

//     // Fix empty <text> tags
//     svgContent = svgContent.replace(/<text([^>]*)><\/text>/g, '<text$1> </text>');

//     // Fix unquoted attributes
//     svgContent = svgContent.replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"');

//     // Validate the SVG
//     try {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(svgContent, 'image/svg+xml');
//       const errors = doc.getElementsByTagName('parsererror');
      
//       if (errors.length > 0) {
//         console.warn("SVG parse warning - attempting to fix:", errors[0].textContent);
//       }
//     } catch (e) {
//       console.warn("SVG validation warning:", e.message);
//       // Continue anyway - send the best SVG we have
//     }

//     // Add response debugging
//     console.log("Claude response length:", responseText.length);
//     console.log("Extracted SVG length:", svgContent.length);

//     res.json({ 
//       svg: svgContent,
//       // Add debugging info to help troubleshoot
//       debugInfo: {
//         modelUsed: 'claude-3-7-sonnet-20250219',
//         svgLength: svgContent.length,
//         svgStart: svgContent.substring(0, 100) + '...',
//         svgEnd: '...' + svgContent.substring(svgContent.length - 100)
//       }
//     });

//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({
//       error: 'Error processing file',
//       details: error.message,
//       stack: error.stack
//     });
//   }
// });


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
// app.use(express.json({ limit: '50mb' })); // Increased to handle larger templates

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
//     const svgTemplate = req.body.svgTemplate;
    
//     if (!svgTemplate) {
//       return res.status(400).json({ error: 'No SVG template specified' });
//     }

//     console.log(`Processing PDF of size: ${req.file.size} bytes`);
//     console.log(`SVG Template length: ${svgTemplate.length} characters`);

//     // CRITICAL FIX 1: Increased max_tokens dramatically to ensure full SVG generation
//     const message = await anthropic.messages.create({
//       model: 'claude-3-7-sonnet-20250219',
//       max_tokens: 100000, // Increased from 4096 to 100000
//       temperature: 0, // Reduced to 0 for maximum consistency
//       system: "You are an expert at creating visual abstracts from research papers. Your only task is to analyze PDFs and update SVG templates with relevant information. Always return complete, valid SVG code and nothing else.",
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
//               text: `Analyze this research paper PDF and update the provided SVG template with the relevant information.

// CRITICAL REQUIREMENTS:
// 1. Return ONLY the complete SVG code with your content updates
// 2. The SVG MUST start with <?xml version="1.0" encoding="UTF-8"?>
// 3. Include all required SVG namespaces and attributes
// 4. Preserve ALL original SVG structure, styling, and attributes
// 5. Only update text content within existing text elements
// 6. Keep all viewBox, width, height attributes unchanged
// 7. Maintain all element IDs and classes
// 8. Format numbers appropriately (e.g., percentages, decimals)
// 9. Ensure text fits within designated areas - NO OVERFLOW
// 10. Keep proper spacing between elements
// 11. Validate all opening/closing tags match
// 12. Maintain proper XML nesting
// 13. DO NOT add any extra elements or modify existing structure
// 14. DO NOT change any styles or attributes
// 15. DO NOT remove any elements

// Your response should contain NOTHING BUT the complete SVG code. No code blocks, no explanations, no comments - ONLY the SVG code.

// Here's the SVG template:

// ${svgTemplate}`
//             }
//           ]
//         }
//       ]
//     });

//     // CRITICAL FIX 2: Improved SVG extraction with better error handling
//     let svgContent = message.content[0].text.trim();
    
//     // Log the full response for debugging
//     console.log("Claude response length:", svgContent.length);
//     console.log("Response starts with:", svgContent.substring(0, 100));
//     console.log("Response ends with:", svgContent.substring(svgContent.length - 100));

//     // Check if response is wrapped in code blocks and extract
//     if (svgContent.startsWith('```') && svgContent.endsWith('```')) {
//       const codeBlockMatch = svgContent.match(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```$/);
//       if (codeBlockMatch && codeBlockMatch[1]) {
//         svgContent = codeBlockMatch[1].trim();
//         console.log("Extracted from code block, new length:", svgContent.length);
//       }
//     }

//     // CRITICAL FIX 3: More robust SVG cleaning
//     // Remove any text before XML declaration or SVG tag
//     if (svgContent.includes('<?xml')) {
//       svgContent = svgContent.replace(/^[\s\S]*?(<\?xml)/, '$1');
//     } else if (svgContent.includes('<svg')) {
//       svgContent = svgContent.replace(/^[\s\S]*?(<svg)/, '$1');
//       // Add XML declaration if missing
//       svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgContent;
//     } else {
//       throw new Error('Invalid response: No SVG or XML declaration found');
//     }

//     // Remove any text after closing SVG tag
//     if (svgContent.includes('</svg>')) {
//       svgContent = svgContent.replace(/<\/svg>[\s\S]*$/, '</svg>');
//     } else {
//       throw new Error('Invalid SVG: Missing closing </svg> tag');
//     }

//     // Ensure SVG namespace
//     if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }

//     // CRITICAL FIX 4: Add comprehensive validation
//     // Check for essential SVG components
//     if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
//       throw new Error('Invalid SVG: Missing required elements');
//     }

//     // Check for balanced tags (simple check)
//     const openTags = (svgContent.match(/<[^/!][^>]*>/g) || []).length;
//     const closeTags = (svgContent.match(/<\/[^>]+>/g) || []).length;
//     const selfClosingTags = (svgContent.match(/<[^/!][^>]*\/>/g) || []).length;
    
//     console.log(`SVG validation - Open tags: ${openTags}, Close tags: ${closeTags}, Self-closing: ${selfClosingTags}`);
    
//     if ((openTags - selfClosingTags) !== closeTags) {
//       console.warn(`Tag balance warning - this may indicate malformed SVG: Open tags: ${openTags}, Close tags: ${closeTags}, Self-closing: ${selfClosingTags}`);
//     }

//     // CRITICAL FIX 5: Return the raw SVG with debugging info
//     res.json({ 
//       svg: svgContent,
//       debug: {
//         originalLength: message.content[0].text.length,
//         finalLength: svgContent.length,
//         model: 'claude-3-7-sonnet-20250219',
//         openTags: openTags,
//         closeTags: closeTags,
//         selfClosingTags: selfClosingTags
//       }
//     });
    
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({ 
//       error: 'Error processing file', 
//       details: error.message,
//       type: error.name,
//       stack: error.stack 
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });





//code by ashutosh sir:

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
// app.use(express.json({ limit: '50mb' }));

// // Test endpoint
// app.get('/api/test', (req, res) => {
//   console.log('I am in testing phase')
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
//     const svgTemplate = req.body.svgTemplate;
    
//     if (!svgTemplate) {
//       return res.status(400).json({ error: 'No SVG template specified' });
//     }

//     console.log(`Processing PDF of size: ${req.file.size} bytes`);
    
//     // Analyze SVG template to understand its structure
//     console.log(`Analyzing SVG template structure...`);
//     const graphContainers = (svgTemplate.match(/<g[^>]*id=["']([^"']*graph[^"']*)["'][^>]*>/gi) || []).length;
//     const chartAreas = (svgTemplate.match(/<g[^>]*id=["']([^"']*chart[^"']*)["'][^>]*>/gi) || []).length;
//     const plotAreas = (svgTemplate.match(/<g[^>]*id=["']([^"']*plot[^"']*)["'][^>]*>/gi) || []).length;
    
//     console.log(`Template contains ${graphContainers} graph containers, ${chartAreas} chart areas, and ${plotAreas} plot areas`);
    
//     // First API call - Extract data from PDF
//     console.log("Step 1: Extracting data from PDF...");
//     const dataExtractionMessage = await anthropic.messages.create({
//       model: 'claude-3-5-sonnet-20240620',
//       max_tokens: 4096,
//       temperature: 0,
//       system: "You are an expert at extracting data from research papers. Extract all numeric data, statistics, percentages, and measurements that could be visualized in a graph. Organize this data into clear, structured JSON format.",
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
//               text: `Extract all data from this research paper that would be necessary to create visualizations.

// For each data point or set, include:
// 1. What the data represents
// 2. All numeric values
// 3. Units of measurement
// 4. Statistical significance (p-values)
// 5. Time points or categories
// 6. Relationships between variables

// Format your response as JSON with clear keys and organized structure. Include separate sections for:
// - Primary outcomes
// - Secondary outcomes
// - Patient demographics
// - Any time-series data
// - Comparative results

// RESPONSE FORMAT: JSON ONLY, no explanations or commentary.`
//             }
//           ]
//         }
//       ]
//     });
    
//     // Parse the extracted data
//     let extractedData;
//     try {
//       // Try to parse JSON directly from the response
//       const dataText = dataExtractionMessage.content[0].text.trim();
      
//       // Remove any markdown code block markers if present
//       const jsonText = dataText.replace(/^```json\s*|\s*```$/g, '');
      
//       extractedData = JSON.parse(jsonText);
//       console.log("Successfully parsed extracted data");
//     } catch (error) {
//       console.warn("Could not parse JSON from data extraction:", error.message);
//       extractedData = { error: "Data extraction failed" };
//     }

//     // Second API call - Generate the SVG with graphs
//     console.log("Step 2: Generating complete SVG with graphs...");
//     const message = await anthropic.messages.create({
//       model: 'claude-3-5-sonnet-20240620',
//       max_tokens: 4096,
//       temperature: 0,
//       system: `You are an expert SVG creator specializing in scientific visualizations. Create complete, valid SVG with properly placed and formatted graphs.`,
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
//               text: `Create a complete SVG visual abstract based on this research paper and template.

// Here's the data I've extracted from the paper (use this to ensure accurate visualizations):
// ${JSON.stringify(extractedData, null, 2)}
// Fit the extracted content of PDF into the attached svg template.
// Here's the SVG template:
// ${svgTemplate}`
//             }
//           ]
//         }
//       ]
//     });

//     // Process the SVG response
//     let svgContent = message.content[0].text.trim();
    
//     // Log details about the response
//     console.log("Response length:", svgContent.length);
    
//     // Extract SVG from possible code blocks
//     if (svgContent.startsWith('```') && svgContent.endsWith('```')) {
//       const match = svgContent.match(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```$/);
//       if (match && match[1]) {
//         svgContent = match[1].trim();
//       }
//     }

//     // Cleanup SVG content
//     if (svgContent.includes('<?xml')) {
//       svgContent = svgContent.replace(/^[\s\S]*?(<\?xml)/, '$1');
//     } else if (svgContent.includes('<svg')) {
//       svgContent = svgContent.replace(/^[\s\S]*?(<svg)/, '$1');
//       svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgContent;
//     }
    
//     if (svgContent.includes('</svg>')) {
//       svgContent = svgContent.replace(/<\/svg>[\s\S]*$/, '</svg>');
//     }
    
//     // Ensure SVG namespace
//     if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }
//     function repairSvgAttributes(svgContent) {
//       return svgContent
//         // 1. Add missing quotes to attributes (width=100 → width="100")
//         .replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"')
        
//         // 2. Fix attributes with single quotes containing double quotes (style='font-family:"Arial"')
//         .replace(/(\w+)='([^']*)("([^']*)')/g, '$1=\'$2\\$3')
        
//         // 3. Fix attributes with double quotes containing single quotes (title="O'Reilly")
//         .replace(/(\w+)="([^"]*)('([^"]*)")/g, '$1="$2\\$3')
        
//         // 4. Fix self-closing tags without proper spacing (<br/> → <br />)
//         .replace(/(<[^>]+)\/>/g, '$1 />')
        
//         // 5. Add missing xmlns attribute to SVG if not present
//         .replace(/<svg(?!\s+[^>]*xmlns=)/i, '<svg xmlns="http://www.w3.org/2000/svg"')
        
//         // 6. Fix unclosed CDATA sections
//         .replace(/<!\[CDATA\[(.*?)(?!\]\]>)(?=>)/g, '<![CDATA[$1]]>')
        
//         // 7. Fix duplicate attributes by keeping only the first occurrence
//         .replace(/<([a-zA-Z]+)([^>]*)\s+(\w+)=(['"])(.*?)\4([^>]*)\s+\3=(['"])(.*?)\7/g, '<$1$2 $3=$4$5$4$6')
        
//         // 8. Remove invalid characters in XML
//         .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
        
//         // 9. Fix missing closing tags by identifying common patterns
//         .replace(/<(div|span|p|g|text|tspan)([^>]*)>[^<>]*(?!<\/\1>)/g, (match, tag, attrs) => {
//           return `${match}</${tag}>`;
//         })
        
//         // 10. Fix malformed style attributes
//         .replace(/style="([^"]*)([^:;{})]+)"/g, (match, prefix, suffix) => {
//           // Only fix if the style appears malformed (missing property or value)
//           if (suffix.trim() && !suffix.includes(':')) {
//             return `style="${prefix}"`;
//           }
//           return match;
//         })
        
//         // 11. Fix entities missing semicolons (&amp → &amp;)
//         .replace(/&(amp|lt|gt|quot|apos)(?![;\w])/g, '&$1;')
        
//         // 12. Ensure proper closing tags
//         .replace(/<([a-zA-Z][a-zA-Z0-9]*)([^/>]*)(?<!\/)>(?:(?!<\/\1>)[\s\S])*?<\/(?!\1)[a-zA-Z][a-zA-Z0-9]*>/g, (match, tag, attrs) => {
//           // If we find an opening tag without matching closing tag, add proper closing tag
//           const closingTagIndex = match.lastIndexOf('</');
//           if (closingTagIndex > 0) {
//             return match.substring(0, closingTagIndex) + '</' + tag + '>';
//           }
//           return match;
//         });
//     }
//     repairSvgAttributes(svgContent)
//     // Post-processing validation for overlap prevention
//     // This helps identify if there are elements positioned on top of each other
//     const textElements = (svgContent.match(/<text[^>]*>/g) || []).length;
//     const rectElements = (svgContent.match(/<rect[^>]*>/g) || []).length;
//     const circleElements = (svgContent.match(/<circle[^>]*>/g) || []).length;
//     const pathElements = (svgContent.match(/<path[^>]*>/g) || []).length;
//     const lineElements = (svgContent.match(/<line[^>]*>/g) || []).length;
    
//     console.log(`SVG contains ${textElements} text elements, ${rectElements} rectangles, ${circleElements} circles, ${pathElements} paths, and ${lineElements} lines`);
    
//     // Check for graph content in key sections
//     const hasGraphContent = svgContent.includes('</rect>') && 
//                           svgContent.includes('</path>') && 
//                           (svgContent.match(/<text[^>]*>[0-9.]+<\/text>/g) || []).length > 5;
    
//     // Validation for empty sections
//     const emptySections = [];
//     const sections = ["Key Findings", "Kidney Function Improvement", "Study Design", "Study Population", "Methods", "Outcomes"];
    
//     sections.forEach(section => {
//       const sectionRegex = new RegExp(`<g[^>]*id=["'][^"']*${section.replace(/\s+/g, '[-_\\s]*')}[^"']*["'][^>]*>[\\s\\S]*?<\\/g>`, 'i');
//       const sectionMatch = svgContent.match(sectionRegex);
      
//       if (sectionMatch) {
//         const sectionContent = sectionMatch[0];
//         const hasContent = sectionContent.includes('</text>') || 
//                           sectionContent.includes('</rect>') || 
//                           sectionContent.includes('</path>');
                          
//         if (!hasContent) {
//           emptySections.push(section);
//         }
//       } else {
//         emptySections.push(`${section} (not found)`);
//       }
//     });
    
//     if (emptySections.length > 0) {
//       console.warn("WARNING: These sections appear to be empty:", emptySections);
//     }

//     // Return the final SVG with debug info
//     res.json({ 
//       svg: svgContent,
//       debug: {
//         extractedDataLength: JSON.stringify(extractedData).length,
//         svgLength: svgContent.length,
//         textElements,
//         graphElements: rectElements + circleElements + pathElements + lineElements,
//         hasGraphContent,
//         emptySections,
//         model: 'claude-3-5-sonnet-20240620'
//       }
//     });
    
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({ 
//       error: 'Error processing file', 
//       details: error.message,
//       stack: error.stack 
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });




//code for gemini:



// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';
// import fs from 'fs';
// import os from 'os';
// import { createPartFromUri, GoogleGenAI } from "@google/genai";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Load environment variables
// dotenv.config();

// const app = express();
// const upload = multer({ limits: { fileSize: 25 * 1024 * 1024 } }); // 25MB limit

// // Enable CORS and JSON parsing
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));

// // Test endpoint
// app.get('/api/test', (req, res) => {
//   console.log('I am in testing phase')
//   res.json({ message: 'API server is working!' });
// });

// // Gemini API configuration
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_MODEL = 'gemini-2.5-pro-preview-03-25';
// const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// // Process PDF endpoint
// app.post('/api/process-pdf', upload.single('pdfFile'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No PDF file provided' });
//     }

//     const svgTemplate = req.body.svgTemplate;
    
//     if (!svgTemplate) {
//       return res.status(400).json({ error: 'No SVG template specified' });
//     }

//     console.log(`Processing PDF of size: ${req.file.size} bytes`);
    
//     // Analyze SVG template to understand its structure
//     console.log(`Analyzing SVG template structure...`);
//     const graphContainers = (svgTemplate.match(/<g[^>]*id=["']([^"']*graph[^"']*)["'][^>]*>/gi) || []).length;
//     const chartAreas = (svgTemplate.match(/<g[^>]*id=["']([^"']*chart[^"']*)["'][^>]*>/gi) || []).length;
//     const plotAreas = (svgTemplate.match(/<g[^>]*id=["']([^"']*plot[^"']*)["'][^>]*>/gi) || []).length;
    
//     console.log(`Template contains ${graphContainers} graph containers, ${chartAreas} chart areas, and ${plotAreas} plot areas`);
    
//     // Save buffer to temporary file
//     const tempDir = os.tmpdir();
//     const tempFilePath = path.join(tempDir, `uploaded-pdf-${Date.now()}.pdf`);
//     fs.writeFileSync(tempFilePath, req.file.buffer);
    
//     console.log(`Saved PDF to temporary file: ${tempFilePath}`);
    
//     // First API call - Upload and extract data from PDF using Gemini
//     console.log("Step 1: Uploading PDF to Gemini...");
    
//     const file = await ai.files.upload({
//       file: tempFilePath,
//       config: {
//         displayName: `Research-PDF-${Date.now()}.pdf`,
//       },
//     });
    
//     // Wait for file processing
//     console.log("Waiting for file processing...");
//     let getFile = await ai.files.get({ name: file.name });
//     while (getFile.state === 'PROCESSING') {
//       getFile = await ai.files.get({ name: file.name });
//       console.log(`Current file status: ${getFile.state}`);
//       console.log('File is still processing, retrying in 2 seconds');
      
//       await new Promise((resolve) => {
//         setTimeout(resolve, 2000);
//       });
//     }
    
//     if (getFile.state === 'FAILED') {
//       throw new Error('File processing failed.');
//     }
    
//     console.log("File processed successfully, extracting data...");
    
//     // Extract data from PDF
//     const extractionPrompt = `Extract key terms based on the placeholders defined in the SVG, and summarize the PDF content following the structure outlined by the SVG. here is the svg
// RESPONSE FORMAT: JSON ONLY, no explanations or commentary.`;

//     const extractionModel = ai.getGenerativeModel({
//       model: GEMINI_MODEL,
//       systemInstruction: "You are an expert at extracting data from research papers. Extract all numeric data, statistics, percentages, and measurements that could be visualized in a graph. Organize this data into clear, structured JSON format.",
//       generationConfig: {
//         temperature: 0,
//         maxOutputTokens: 4096
//       }
//     });
    
//     const extractionContents = [extractionPrompt];
    
//     if (getFile.uri && getFile.mimeType) {
//       const fileContent = createPartFromUri(getFile.uri, getFile.mimeType);
//       extractionContents.push(fileContent);
//     }
    
//     const extractionResponse = await extractionModel.generateContent({
//       contents: extractionContents
//     });
    
//     // Parse the extracted data
//     let extractedData;
//     try {
//       // Try to parse JSON directly from the response
//       const dataText = extractionResponse.response.text().trim();
      
//       // Remove any markdown code block markers if present
//       const jsonText = dataText.replace(/^```json\s*|\s*```$/g, '');
      
//       extractedData = JSON.parse(jsonText);
//       console.log("Successfully parsed extracted data");
//     } catch (error) {
//       console.warn("Could not parse JSON from data extraction:", error.message);
//       extractedData = { error: "Data extraction failed" };
//     }

//     // Second API call - Generate the SVG with graphs using Gemini
//     console.log("Step 2: Generating complete SVG with graphs...");
    
//     const svgPrompt = `Create a complete SVG visual abstract based on this research paper and template.

// Here's the data I've extracted from the paper (use this to ensure accurate visualizations):
// ${JSON.stringify(extractedData, null, 2)}
// Fit the extracted content of PDF into the attached svg template.
// Here's the SVG template:
// ${svgTemplate}`;
    
//     const svgModel = ai.getGenerativeModel({
//       model: GEMINI_MODEL,
//       systemInstruction: "You are an expert SVG creator specializing in scientific visualizations. Create complete, valid SVG with properly placed and formatted graphs.",
//       generationConfig: {
//         temperature: 0,
//         maxOutputTokens: 4096
//       }
//     });
    
//     const svgContents = [svgPrompt];
    
//     if (getFile.uri && getFile.mimeType) {
//       const fileContent = createPartFromUri(getFile.uri, getFile.mimeType);
//       svgContents.push(fileContent);
//     }
    
//     const svgResponse = await svgModel.generateContent({
//       contents: svgContents
//     });
    
//     // Process the SVG response
//     let svgContent = svgResponse.response.text().trim();
    
//     // Clean up temporary file
//     try {
//       fs.unlinkSync(tempFilePath);
//       console.log(`Removed temporary file: ${tempFilePath}`);
//     } catch (cleanupError) {
//       console.warn(`Failed to clean up temporary file: ${cleanupError.message}`);
//     }
    
//     // Clean up file from Gemini API
//     try {
//       await ai.files.delete({ name: file.name });
//       console.log(`Deleted file from Gemini API: ${file.name}`);
//     } catch (deleteError) {
//       console.warn(`Failed to delete file from Gemini API: ${deleteError.message}`);
//     }
    
//     // Log details about the response
//     console.log("Response length:", svgContent.length);
    
//     // Extract SVG from possible code blocks
//     if (svgContent.startsWith('```') && svgContent.endsWith('```')) {
//       const match = svgContent.match(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```$/);
//       if (match && match[1]) {
//         svgContent = match[1].trim();
//       }
//     }

//     // Cleanup SVG content
//     if (svgContent.includes('<?xml')) {
//       svgContent = svgContent.replace(/^[\s\S]*?(<\?xml)/, '$1');
//     } else if (svgContent.includes('<svg')) {
//       svgContent = svgContent.replace(/^[\s\S]*?(<svg)/, '$1');
//       svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgContent;
//     }
    
//     if (svgContent.includes('</svg>')) {
//       svgContent = svgContent.replace(/<\/svg>[\s\S]*$/, '</svg>');
//     }
    
//     // Ensure SVG namespace
//     if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
//       svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
//     }
//     function repairSvgAttributes(svgContent) {
//       return svgContent
//         // 1. Add missing quotes to attributes (width=100 → width="100")
//         .replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"')
        
//         // 2. Fix attributes with single quotes containing double quotes (style='font-family:"Arial"')
//         .replace(/(\w+)='([^']*)("([^']*)')/g, '$1=\'$2\\$3')
        
//         // 3. Fix attributes with double quotes containing single quotes (title="O'Reilly")
//         .replace(/(\w+)="([^"]*)('([^"]*)")/g, '$1="$2\\$3')
        
//         // 4. Fix self-closing tags without proper spacing (<br/> → <br />)
//         .replace(/(<[^>]+)\/>/g, '$1 />')
        
//         // 5. Add missing xmlns attribute to SVG if not present
//         .replace(/<svg(?!\s+[^>]*xmlns=)/i, '<svg xmlns="http://www.w3.org/2000/svg"')
        
//         // 6. Fix unclosed CDATA sections
//         .replace(/<!\[CDATA\[(.*?)(?!\]\]>)(?=>)/g, '<![CDATA[$1]]>')
        
//         // 7. Fix duplicate attributes by keeping only the first occurrence
//         .replace(/<([a-zA-Z]+)([^>]*)\s+(\w+)=(['"])(.*?)\4([^>]*)\s+\3=(['"])(.*?)\7/g, '<$1$2 $3=$4$5$4$6')
        
//         // 8. Remove invalid characters in XML
//         .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
        
//         // 9. Fix missing closing tags by identifying common patterns
//         .replace(/<(div|span|p|g|text|tspan)([^>]*)>[^<>]*(?!<\/\1>)/g, (match, tag, attrs) => {
//           return `${match}</${tag}>`;
//         })
        
//         // 10. Fix malformed style attributes
//         .replace(/style="([^"]*)([^:;{})]+)"/g, (match, prefix, suffix) => {
//           // Only fix if the style appears malformed (missing property or value)
//           if (suffix.trim() && !suffix.includes(':')) {
//             return `style="${prefix}"`;
//           }
//           return match;
//         })
        
//         // 11. Fix entities missing semicolons (&amp → &amp;)
//         .replace(/&(amp|lt|gt|quot|apos)(?![;\w])/g, '&$1;')
        
//         // 12. Ensure proper closing tags
//         .replace(/<([a-zA-Z][a-zA-Z0-9]*)([^/>]*)(?<!\/)>(?:(?!<\/\1>)[\s\S])*?<\/(?!\1)[a-zA-Z][a-zA-Z0-9]*>/g, (match, tag, attrs) => {
//           // If we find an opening tag without matching closing tag, add proper closing tag
//           const closingTagIndex = match.lastIndexOf('</');
//           if (closingTagIndex > 0) {
//             return match.substring(0, closingTagIndex) + '</' + tag + '>';
//           }
//           return match;
//         });
//     }
//     repairSvgAttributes(svgContent)
//     // Post-processing validation for overlap prevention
//     // This helps identify if there are elements positioned on top of each other
//     const textElements = (svgContent.match(/<text[^>]*>/g) || []).length;
//     const rectElements = (svgContent.match(/<rect[^>]*>/g) || []).length;
//     const circleElements = (svgContent.match(/<circle[^>]*>/g) || []).length;
//     const pathElements = (svgContent.match(/<path[^>]*>/g) || []).length;
//     const lineElements = (svgContent.match(/<line[^>]*>/g) || []).length;
    
//     console.log(`SVG contains ${textElements} text elements, ${rectElements} rectangles, ${circleElements} circles, ${pathElements} paths, and ${lineElements} lines`);
    
//     // Check for graph content in key sections
//     const hasGraphContent = svgContent.includes('</rect>') && 
//                           svgContent.includes('</path>') && 
//                           (svgContent.match(/<text[^>]*>[0-9.]+<\/text>/g) || []).length > 5;
    
//     // Validation for empty sections
//     const emptySections = [];
//     const sections = ["Key Findings", "Kidney Function Improvement", "Study Design", "Study Population", "Methods", "Outcomes"];
    
//     sections.forEach(section => {
//       const sectionRegex = new RegExp(`<g[^>]*id=["'][^"']*${section.replace(/\s+/g, '[-_\\s]*')}[^"']*["'][^>]*>[\\s\\S]*?<\\/g>`, 'i');
//       const sectionMatch = svgContent.match(sectionRegex);
      
//       if (sectionMatch) {
//         const sectionContent = sectionMatch[0];
//         const hasContent = sectionContent.includes('</text>') || 
//                           sectionContent.includes('</rect>') || 
//                           sectionContent.includes('</path>');
                          
//         if (!hasContent) {
//           emptySections.push(section);
//         }
//       } else {
//         emptySections.push(`${section} (not found)`);
//       }
//     });
    
//     if (emptySections.length > 0) {
//       console.warn("WARNING: These sections appear to be empty:", emptySections);
//     }

//     // Return the final SVG with debug info
//     res.json({ 
//       svg: svgContent,
//       debug: {
//         extractedDataLength: JSON.stringify(extractedData).length,
//         svgLength: svgContent.length,
//         textElements,
//         graphElements: rectElements + circleElements + pathElements + lineElements,
//         hasGraphContent,
//         emptySections,
//         model: GEMINI_MODEL
//       }
//     });
    
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({ 
//       error: 'Error processing file', 
//       details: error.message,
//       stack: error.stack 
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });




import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

/**
 * Utility function to check if the SVG content is valid XML
 * @param {string} svgContent - The SVG content to validate
 * @returns {object} - Validation result with isValid flag and any error message
 */
function validateSvgXml(svgContent) {
  try {
    // Simple XML validation checks
    const result = { isValid: true, errors: [] };
    
    // Check for basic XML structure issues
    if (!svgContent.includes('<?xml')) {
      result.errors.push('Missing XML declaration');
    }
    
    if (!svgContent.includes('<svg')) {
      result.errors.push('Missing SVG root element');
      result.isValid = false;
    }
    
    if (!svgContent.includes('</svg>')) {
      result.errors.push('Missing SVG closing tag');
      result.isValid = false;
    }
    
    // Check for unclosed tags (simple check)
    const openTagsCount = (svgContent.match(/<[a-zA-Z][^/>]*>/g) || []).length;
    const closeTagsCount = (svgContent.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
    const selfClosingCount = (svgContent.match(/<[^>]+\/>/g) || []).length;
    
    if (openTagsCount !== (closeTagsCount + selfClosingCount)) {
      result.errors.push(`Tag count mismatch: ${openTagsCount} opening tags, ${closeTagsCount} closing tags, ${selfClosingCount} self-closing tags`);
      result.isValid = false;
    }
    
    // Check for improperly nested tags (simple check)
    const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    const tags = [];
    let match;
    
    while ((match = tagPattern.exec(svgContent)) !== null) {
      const fullTag = match[0];
      const tagName = match[1];
      
      if (fullTag.startsWith('</')) {
        // Closing tag
        if (tags.length === 0 || tags[tags.length - 1] !== tagName) {
          result.errors.push(`Improperly nested tag: ${fullTag}`);
          result.isValid = false;
        } else {
          tags.pop();
        }
      } else if (!fullTag.endsWith('/>')) {
        // Opening tag (not self-closing)
        tags.push(tagName);
      }
    }
    
    if (tags.length > 0) {
      result.errors.push(`Unclosed tags: ${tags.join(', ')}`);
      result.isValid = false;
    }
    
    return result;
  } catch (e) {
    return { isValid: false, errors: [`Exception during validation: ${e.message}`] };
  }
}

/**
 * Repairs and cleans SVG attributes and structure
 * @param {string} svgContent - The SVG content to repair
 * @returns {string} - Repaired SVG content
 */
function repairSvgAttributes(svgContent) {
  if (!svgContent) return '';
  
  // First pass: Fix major structural issues specific to observed problems
  let fixed = svgContent
    // Fix common issues in the example SVG
    .replace(/(<\/svg>)<defs>/g, '<defs>')
    .replace(/><\/rect>/g, '></rect>')
    .replace(/><\/circle>/g, '></circle>')
    .replace(/><\/line>/g, '></line>')
    .replace(/><\/path>/g, '></path>')
    .replace(/><\/g>/g, '></g>')
    .replace(/><text/g, '><text')
    .replace(/>([^<]+)<\/text>/g, '>$1</text>')
    
    // Fix extra > characters
    .replace(/>>([^<]+)</g, '>$1<')
    .replace(/>>/g, '>')
    
    // Fix incorrectly closed tags
    .replace(/<\/(\w+)><(\w+)>/g, '</$1>\n<$2>')
    
    // Fix tags that are closed before being opened
    .replace(/<\/(\w+)>(\s*)<\1/g, '</$1>\n$2<$1');
  
  // Second pass: Fix attributes and more subtle issues
  fixed = fixed
    // 1. Add missing quotes to attributes
    .replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"')
    
    // 2. Fix attributes with single quotes containing double quotes
    .replace(/(\w+)='([^']*)("([^']*)')/g, '$1=\'$2\\$3')
    
    // 3. Fix attributes with double quotes containing single quotes
    .replace(/(\w+)="([^"]*)('([^"]*)")/g, '$1="$2\\$3')
    
    // 4. Fix self-closing tags without proper spacing
    .replace(/(<[^>]+)\/>/g, '$1 />')
    
    // 5. Add missing xmlns attribute to SVG
    .replace(/<svg(?!\s+[^>]*xmlns=)/i, '<svg xmlns="http://www.w3.org/2000/svg"')
    
    // 6. Fix unclosed CDATA sections
    .replace(/<!\[CDATA\[(.*?)(?!\]\]>)(?=>)/g, '<![CDATA[$1]]>')
    
    // 7. Fix duplicate attributes
    .replace(/<([a-zA-Z]+)([^>]*)\s+(\w+)=(['"])(.*?)\4([^>]*)\s+\3=(['"])(.*?)\7/g, '<$1$2 $3=$4$5$4$6')
    
    // 8. Remove invalid characters in XML
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    
    // 9. Fix missing closing tags - more comprehensive approach
    .replace(/<(\w+)([^>]*)>([^<]*)(?!<\/\1>)(<\w+[^>]*>)/g, '<$1$2>$3</$1>$4')
    
    // 10. Fix malformed style attributes
    .replace(/style="([^"]*)([^:;{})]+)"/g, (match, prefix, suffix) => {
      if (suffix.trim() && !suffix.includes(':')) {
        return `style="${prefix}"`;
      }
      return match;
    })
    
    // 11. Fix entities missing semicolons
    .replace(/&(amp|lt|gt|quot|apos)(?![;\w])/g, '&$1;')
    
    // 12. Handle improperly structured tags (closing where there should be self-closing)
    .replace(/<(path|line|circle|rect|ellipse)([^>]*)><\/\1>/g, '<$1$2 />')
    
    // 13. Fix mismatched opening and closing tags
    .replace(/<(\w+)([^>]*)>([^<]*)<\/([^>]+)>/g, (match, openTag, attrs, content, closeTag) => {
      if (openTag !== closeTag) {
        return `<${openTag}${attrs}>${content}</${openTag}>`;
      }
      return match;
    })
    
    // 14. Fix path elements that are missing a closing character / trailing space
    .replace(/<path([^>]*?)d="([^"]*?)"([^>]*?)>/g, (match, prefix, d, suffix) => {
      if (!d.trim().endsWith(' ') && !d.trim().endsWith('Z')) {
        return `<path${prefix}d="${d} "${suffix}>`;
      }
      return match;
    })
    
    // 15. Fix stroke attributes missing color values
    .replace(/<([^>]+) stroke="([^"]*?)">?/g, (match, tag, value) => {
      if (!value) {
        return match.replace('stroke=""', 'stroke="black"');
      }
      return match;
    });
  
  return fixed;
}

/**
 * Cleans up SVG content returned from AI
 * @param {string} svgContent - The raw SVG content from AI
 * @returns {string} - Cleaned SVG content
 */
function cleanupSvgContent(svgContent) {
  if (!svgContent) return '';
  
  let cleaned = svgContent;
  
  // Extract SVG content if it's wrapped in code blocks or other text
  if (cleaned.includes('```svg')) {
    cleaned = cleaned.replace(/.*```svg\s*([\s\S]*?)\s*```.*/, '$1');
  } else if (cleaned.includes('```xml')) {
    cleaned = cleaned.replace(/.*```xml\s*([\s\S]*?)\s*```.*/, '$1');
  } else if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/.*```\s*([\s\S]*?)\s*```.*/, '$1');
  }

  // Remove any text before <?xml or <svg
  if (cleaned.includes('<?xml')) {
    cleaned = cleaned.replace(/^[\s\S]*?(<\?xml)/, '$1');
  } else if (cleaned.includes('<svg')) {
    cleaned = cleaned.replace(/^[\s\S]*?(<svg)/, '$1');
    cleaned = '<?xml version="1.0" encoding="UTF-8"?>\n' + cleaned;
  }
  
  // Remove any text after </svg>
  if (cleaned.includes('</svg>')) {
    cleaned = cleaned.replace(/<\/svg>[\s\S]*$/, '</svg>');
  }
  
  // Ensure SVG namespace
  if (!cleaned.includes('xmlns="http://www.w3.org/2000/svg"')) {
    cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Fix structural issues with improperly placed end tags
  cleaned = fixSvgStructure(cleaned);
  
  return cleaned;
}

/**
 * Deep analyzes and fixes SVG structure using a DOM-like approach
 * @param {string} svgContent - The SVG content to fix
 * @returns {string} - Structurally fixed SVG content
 */
function fixSvgStructure(svgContent) {
  if (!svgContent) return '';
  
  // First, let's do some preliminary cleanup of obvious issues
  let fixed = svgContent
    // Fix tags that are split across lines incorrectly
    .replace(/(<[^>]+)\n([^>]*>)/g, '$1$2')
    
    // Fix incorrect tag closures (common in AI-generated SVGs)
    .replace(/<\/svg><defs>/g, '</defs></svg>')
    .replace(/<\/rect><g/g, '</rect>\n<g')
    .replace(/<\/line><text/g, '</line>\n<text')
    .replace(/<\/circle><text/g, '</circle>\n<text')
    .replace(/<\/path><text/g, '</path>\n<text');
  
  // Build a simple DOM-like structure to track element hierarchy
  const stack = [];
  const selfClosingTags = ['path', 'circle', 'rect', 'line', 'ellipse', 'polygon', 'polyline'];
  
  // Split into tokens, preserving tags and content
  const tokens = fixed.split(/(<[^>]*>)/);
  const result = [];
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;
    
    if (token.startsWith('</')) {
      // Closing tag
      const tagName = token.match(/<\/([a-zA-Z][a-zA-Z0-9]*)/)?.[1];
      if (tagName) {
        // Find matching opening tag in the stack
        let foundIdx = -1;
        for (let j = stack.length - 1; j >= 0; j--) {
          if (stack[j] === tagName) {
            foundIdx = j;
            break;
          }
        }
        
        if (foundIdx >= 0) {
          // We found a matching opening tag
          // Close any tags that were opened after this one
          for (let j = stack.length - 1; j > foundIdx; j--) {
            result.push(`</${stack[j]}>`);
          }
          // Remove all closed tags from stack including this one
          stack.splice(foundIdx);
        } else {
          // No matching opening tag, skip this closing tag
          continue;
        }
      }
    } else if (token.startsWith('<') && !token.startsWith('<!') && !token.startsWith('<?')) {
      // Opening tag
      const isSelftClosing = token.endsWith('/>');
      if (!isSelftClosing) {
        const tagName = token.match(/<([a-zA-Z][a-zA-Z0-9]*)/)?.[1];
        if (tagName) {
          // Check if this is a tag that should be self-closing
          if (selfClosingTags.includes(tagName.toLowerCase()) && !token.includes('/>')) {
            // Convert to self-closing
            result.push(token.replace(/>$/, ' />'));
            continue;
          }
          
          stack.push(tagName);
        }
      }
    }
    
    result.push(token);
  }
  
  // Close any remaining open tags
  for (let i = stack.length - 1; i >= 0; i--) {
    result.push(`</${stack[i]}>`);
  }
  
  return result.join('');
}

const app = express();

// Configure multer with file type validation
const upload = multer({
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  }
});

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create an index.html file for SVG testing
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVG Fixer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    textarea {
      width: 100%;
      height: 300px;
      font-family: monospace;
      margin-bottom: 20px;
      padding: 10px;
    }
    button {
      background: #4285f4;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    button:hover {
      background: #3367d6;
    }
    .preview {
      border: 1px solid #ccc;
      padding: 20px;
      margin-top: 20px;
      overflow: auto;
    }
    .tabs {
      display: flex;
      margin-bottom: 20px;
    }
    .tab {
      padding: 10px 20px;
      background: #f0f0f0;
      cursor: pointer;
      border: 1px solid #ccc;
    }
    .tab.active {
      background: #4285f4;
      color: white;
      border-color: #4285f4;
    }
    #errorMsg {
      color: red;
      margin-top: 10px;
    }
    #svgContainer {
      max-width: 100%;
      overflow: auto;
    }
  </style>
</head>
<body>
  <h1>SVG Fixer</h1>
  <p>Paste your broken SVG below and choose a method to fix it.</p>
  
  <div class="tabs">
    <div class="tab active" data-method="ai">Fix with AI</div>
    <div class="tab" data-method="regex">Fix with Regex</div>
  </div>
  
  <textarea id="svgInput" placeholder="Paste your SVG here..."></textarea>
  
  <button id="fixButton">Fix SVG</button>
  <button id="clearButton">Clear</button>
  <button id="downloadButton" disabled>Download Fixed SVG</button>
  <div id="errorMsg"></div>
  
  <h2>Preview</h2>
  <div class="preview">
    <div id="svgContainer"></div>
  </div>
  
  <script>
    let currentMethod = 'ai';
    let fixedSvg = null;
    
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMethod = tab.dataset.method;
      });
    });
    
    document.getElementById('fixButton').addEventListener('click', async () => {
      const svgInput = document.getElementById('svgInput').value;
      const errorMsg = document.getElementById('errorMsg');
      const svgContainer = document.getElementById('svgContainer');
      const downloadButton = document.getElementById('downloadButton');
      
      if (!svgInput) {
        errorMsg.textContent = 'Please enter SVG content';
        return;
      }
      
      try {
        errorMsg.textContent = 'Processing...';
        svgContainer.innerHTML = '';
        downloadButton.disabled = true;
        
        const response = await fetch(\`/api/fix-svg?method=\${currentMethod}\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: svgInput
        });
        
        const result = await response.json();
        
        if (response.ok) {
          fixedSvg = result.svg;
          errorMsg.textContent = result.message || 'SVG fixed successfully';
          svgContainer.innerHTML = fixedSvg;
          downloadButton.disabled = false;
        } else {
          errorMsg.textContent = result.error || 'Failed to fix SVG';
          svgContainer.innerHTML = '';
        }
      } catch (error) {
        errorMsg.textContent = 'Error: ' + error.message;
        svgContainer.innerHTML = '';
      }
    });
    
    document.getElementById('clearButton').addEventListener('click', () => {
      document.getElementById('svgInput').value = '';
      document.getElementById('svgContainer').innerHTML = '';
      document.getElementById('errorMsg').textContent = '';
      document.getElementById('downloadButton').disabled = true;
      fixedSvg = null;
    });
    
    document.getElementById('downloadButton').addEventListener('click', () => {
      if (!fixedSvg) return;
      
      const blob = new Blob([fixedSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fixed-svg.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API server is working!' });
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY environment variable is not set');
}

// Process PDF endpoint
app.post('/api/process-pdf', upload.single('pdfFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    const pdfBase64 = req.file.buffer.toString('base64');
    const template = req.body.template;
    
    if (!template) {
      return res.status(400).json({ error: 'No template specified' });
    }

    // Validate SVG template
    const svgTemplate = req.body.svgTemplate;
    if (!svgTemplate || !svgTemplate.includes('<svg')) {
      return res.status(400).json({ error: 'Invalid SVG template' });
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

    // Create image part from PDF
    const imagePart = {
      inlineData: {
        data: pdfBase64,
        mimeType: "application/pdf"
      }
    };

    // Generate content with a clear instruction for valid SVG
    const result = await model.generateContent([
      imagePart,
      `STRICTLY  analyze this PDF document and update the following SVG template with the relevant information. 
      Here's the SVG template: ${svgTemplate}. 
      STRICTLY DO NOT GIVE HARDCODED values.
      
      the graph should be visually distinct and clearly present the research findings.it should include bar charts, line graphs, or other appropriate visualizations where needed.
      THE GRAPH SHOULD NOT HAVE ANY EMPTY AREAS.
      Ensure all text content is concise and fits within designated areas.
      IMPORTANT: Return ONLY the complete modified SVG code with no additional text, explanations, or code blocks.
      Ensure the SVG has proper XML structure with correct opening and closing tags.
      Do not include any text or explanation outside the SVG code.
      The SVG must begin with <?xml version="1.0" encoding="UTF-8"?> followed by the <svg> tag.
      Ensure all elements are properly closed and nested correctly.`
    ]);

    const response = await result.response;
    let svgContent = response.text();

    // Validate the SVG response
    if (!svgContent.includes('<svg') || (!svgContent.trim().startsWith('<?xml') && !svgContent.trim().startsWith('<svg'))) {
      console.warn('Received invalid SVG response, attempting to extract and repair');
      console.log('Original SVG content preview:', svgContent.substring(0, 200) + '...');
    }
    
    // Apply initial cleanup
    svgContent = repairSvgAttributes(svgContent);
    
    // Check if the SVG needs additional fixing by AI
    let needsAiFix = false;
    
    // Simple validation check
    if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
      needsAiFix = true;
      console.log('SVG validation failed: Missing essential SVG tags');
    } else {
      // Check for mismatched tags (simple check)
      const openingTags = (svgContent.match(/<[a-zA-Z][^/>]*>/g) || []).length;
      const closingTags = (svgContent.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
      const selfClosingTags = (svgContent.match(/<[^>]+\/>/g) || []).length;
      
      if (openingTags !== (closingTags + selfClosingTags)) {
        needsAiFix = true;
        console.log(`SVG validation failed: Tag count mismatch (${openingTags} opening, ${closingTags} closing, ${selfClosingTags} self-closing)`);
      }
    }
    
    if (needsAiFix) {
      console.log('Using AI to fix the SVG...');
      
      // Use AI to fix complex SVG issues
      const fixResult = await model.generateContent(`
        I have an SVG with structural issues that I need you to fix. Please correct the XML/SVG syntax problems.
        
        Common problems I'm seeing:
        1. Extra '>' characters that don't belong (e.g., ">>text" or "></rect>")
        2. Text elements with unclosed tags
        3. Improperly nested tags (e.g., "</svg><defs>")
        4. Missing closing tags for elements
        5. Self-closing tags that are incorrectly formatted
        6. Attributes without proper quotes
        
        SPECIFIC FIXES NEEDED:
        - Replace "</svg><defs>" with just "<defs>"
        - Replace "><text" with "><text"
        - Replace "></rect>" with "></rect>"
        - Replace "></circle>" with "></circle>"
        - Replace "></line>" with "></line>"
        - Replace "></path>" with "></path>"
        - Replace "></g>" with "></g>"
        - Replace ">text</text>" with ">text</text>"
        - Replace ">>" with ">"
        - Fix any unclosed elements and ensure proper nesting
        
        Return ONLY the corrected SVG code with NO explanation, comments, or markdown. Just return the complete fixed SVG code.
        
        Here's the SVG that needs fixing:
        
        ${svgContent}
      `);
      
      const fixResponse = await fixResult.response;
      svgContent = fixResponse.text();
      
      // Extract SVG if it's wrapped in markdown code blocks
      if (svgContent.includes('```')) {
        svgContent = svgContent.replace(/```(?:xml|svg|html)?\s*([\s\S]*?)\s*```/g, '$1');
      }
      
      // Do a final light cleanup
      svgContent = cleanupSvgContent(svgContent);
    }
    
    console.log('SVG processing completed');
    
    res.json({ svg: svgContent });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ 
      error: 'Error processing file', 
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




// REQUIREMENTS:
// 1. YOUR RESPONSE MUST BE 100% VALID SVG CODE ONLY - no explanations, no markdown
// 2. Start with proper <?xml version="1.0" encoding="UTF-8"?> declaration
// 3. Include all required SVG namespaces
// 4. VISUALIZE DATA FOR EVERY GRAPH SECTION - no empty areas!
// 5. CREATE BAR CHARTS, LINE GRAPHS, OR OTHER APPROPRIATE VISUALIZATIONS where needed
// 6. PREVENT ANY TEXT OR ELEMENT OVERLAP - ensure proper spacing and positioning
// 7. Use <rect>, <line>, <path>, <circle>, etc. elements to create data visualizations
// 8. Include axis labels, data labels, and legends for all graphs
// 9. Keep text content concise and ensure it fits within designated areas
// 10. Maintain the original template structure, viewBox dimensions, and overall layout
// 11. Create visually distinct sections that clearly present the research findings

// MOST CRITICAL REQUIREMENTS:
// 1. EVERY GRAPH AREA MUST CONTAIN A VISUALIZATION - no empty spaces
// 2. NO ELEMENT OVERLAP - ensure text and visual elements do not overlap
// 3. ENSURE COMPLETE SVG OUTPUT - do not truncate any part
// 4. MAINTAIN EXACT VIEWBOX DIMENSIONS and layout structure