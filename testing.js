async function repairSvgAttributes(svgContent) {
    // Check if content is truncated in the middle of a tag
    const lastOpenTag = svgContent.lastIndexOf("<");
    const lastCloseTag = svgContent.lastIndexOf(">");
    
    // If the content ends with an unclosed tag
    if (lastOpenTag > lastCloseTag) {
      // Find the last complete element
      const lastCompleteTagEnd = svgContent.lastIndexOf(">", lastOpenTag);
      if (lastCompleteTagEnd !== -1) {
        // Truncate to the last complete element
        svgContent = svgContent.substring(0, lastCompleteTagEnd + 1);
        
        // Now add necessary closing tags
        // Count opening vs closing tags for key elements
        const openGs = (svgContent.match(/<g[^>]*>/g) || []).length;
        const closeGs = (svgContent.match(/<\/g>/g) || []).length;
        const missingGs = openGs - closeGs;
        
        // Add missing closing tags
        for (let i = 0; i < missingGs; i++) {
          svgContent += '</g>';
        }
        
        // Close any other main container elements that might be open
        if (svgContent.includes('<svg') && !svgContent.includes('</svg>')) {
          svgContent += '</svg>';
        }
      }
    }
    
    // Now apply other repairs
    return svgContent
      // Step 1: Fix basic attribute issues
      .replace(/(\w+)=([^"'][^\s>]*)/g, '$1="$2"')  // Add missing quotes
      .replace(/(\w+)='([^']*)"([^']*)'/, '$1=\'$2\\\'$3\'')  // Fix mixed quotes
      .replace(/(\w+)="([^"]*)\'([^"]*)"/, '$1="$2\\\"$3"')  // Fix mixed quotes
      
      // Step 2: Fix common SVG structure issues
      .replace(/<\/text>([^<]*)<\/text>/g, '</text>') // Remove duplicate closing text tags
      .replace(/<\/g>([^<]*)<\/g>/g, '</g>') // Remove duplicate closing g tags
      .replace(/<\/path>([^<]*)<\/path>/g, '</path>') // Remove duplicate closing path tags
      .replace(/<\/p><\/g>/g, '</g>') // Fix common Claude error with </p></g>
      .replace(/<\/p><\/path>/g, '</path>') // Fix common Claude error with </p></path>
      .replace(/<\/tex>/g, '</g>') // Fix Claude error replacing </g> with </tex>
      
      // Step 3: Fix defs tag specifically
      .replace(/<\/defs>[\s\n]*<\/defs>/g, '</defs>') // Remove duplicate closing defs tags
      .replace(/<defs>[\s\n]*<style>/g, '<defs>\n    <style>') // Ensure proper nesting of style in defs
      
      // Step 4: Fix unclosed or unopened tags
      .replace(/<g[^>]*>\s*<\/tex>/g, '') // Remove empty g/tex combinations
      .replace(/<g[^>]*>\s*<\/g>/g, '') // Remove empty g tags
      
      // Step 5: Fix truncated content
      .replace(/x2="%[^"]*$/, 'x2="500"') // Fix truncated x2="%" values
      .replace(/x2="500"[^>]*$/, 'x2="500" y2="20" />') // Fix truncated line tag
      
      // Step 6: Fix other common structural issues
      .replace(/J<\/text>/g, 'J</text>') // Fix split text like "BMJ</text>"
      .replace(/t<\/text>/g, 't</text>') // Fix split text like "abstract</text>"
      .replace(/([a-z])<\/text>([a-z])<\/text>/g, '$1$2</text>') // Join split text with double closing tags
      .replace(/<\/([a-z]+)>([a-z])<\/\1>/g, '$2</$1>') // Fix overlapped closing tags
      
      // Step 7: Ensure single root tag
      .replace(/<svg[^>]*>[\s\S]*<\/svg>[\s\S]*<svg[^>]*>/g, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1100">');
  }
let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1100">
  <defs>
    <style>
      /* Color palette (Using provided names, ensure hex values match original if possible) */
      :root {
        --primary-blue: #0072BC; /* BMJ Blue Approx */
        --light-blue: #F0F4F7; /* Lighter background than original, adjust if needed */
        --medium-blue: #50A0D0;
        --dark-blue: #005B94;
        --orange: #FDB913; /* Approx chart orange */
        --purple: #5B5FAE; /* Approx chart purple */
        --coral: #FF6F61; /* Illustration color */
        --dark-gray: #333333; /* Standard dark text */
        --light-gray: #F5F5F5; /* Card background - okay */
        --medium-gray: #AAAAAA; /* Lines */
        --stroke-gray: #E0E0E0; /* Card Stroke */
        --white: #FFFFFF;
        --chart-area-purple: #A8A2D1; /* Approx IQR Purple */
        --chart-area-orange: #FDDC9A; /* Approx IQR Orange */
      }

      /* Text styles */
      text {
        font-family: Arial, Helvetica, sans-serif; /* Added Helvetica as fallback */
        fill: var(--dark-gray);
        dominant-baseline: central; /* Better vertical alignment control */
      }
      .title {
        font-size: 24px; /* Slightly adjusted */
        font-weight: bold;
      }
      .subtitle {
        font-size: 20px; /* Adjusted */
        font-weight: bold;
        fill: var(--primary-blue);
      }
      .body-text {
        font-size: 15px; /* Adjusted */
        line-height: 1.4; /* Added for potential multi-line text */
      }
      .data-point {
        font-size: 16px; /* Adjusted */
        font-weight: bold;
      }
      .chart-title {
        font-size: 18px; /* Adjusted */
        font-weight: bold;
      }
      .chart-label {
        font-size: 13px; /* Adjusted */
      }
      .chart-data {
        font-size: 11px; /* Adjusted */
      }
      .stat-highlight {
        font-size: 22px; /* Adjusted */
        font-weight: bold;
        fill: var(--primary-blue);
      }
      .small-white-text {
         font-family: Arial, Helvetica, sans-serif;
         font-size: 13px;
         fill: var(--white);
         dominant-baseline: central;
      }
      .small-blue-text {
         font-family: Arial, Helvetica, sans-serif;
         font-size: 13px;
         fill: var(--primary-blue);
         dominant-baseline: central;
      }
      .footer-text {
        font-size: 13px;
      }

      /* Shape styles */
      .card {
        fill: var(--white);
        stroke: var(--stroke-gray);
        stroke-width: 1;
        rx: 8; /* Adjusted */
        ry: 8;
      }
      .header-bg {
        fill: var(--primary-blue);
      }
      /* Base Icon Styling */
      .icon-shape {
         fill: var(--primary-blue);
         stroke: none;
      }
      .icon-path-white {
          stroke: var(--white);
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
      }
      .summary-quote {
        fill: none;
        stroke: var(--primary-blue);
        stroke-width: 3;
      }
      .purple-box {
        fill: var(--purple);
        rx: 6; /* Adjusted */
        ry: 6;
      }
      .orange-box {
        fill: var(--orange);
        rx: 6; /* Adjusted */
        ry: 6;
      }
      .survival-line {
        fill: none;
        stroke: var(--purple);
        stroke-width: 2;
      }
      .survival-area {
        fill: var(--chart-area-purple); /* Use specific color */
        opacity: 0.6; /* Adjusted opacity */
      }
      .admission-line {
        fill: none;
        stroke: var(--orange);
        stroke-width: 2;
      }
      .admission-area {
        fill: var(--chart-area-orange); /* Use specific color */
        opacity: 0.6; /* Adjusted opacity */
      }
      .divider-line {
          stroke: var(--medium-gray);
          stroke-width: 1;
      }
    </style>
  </defs>

  <rect width="1200" height="1100" fill="var(--light-blue)" />

  <g id="header" transform="translate(20, 20)">
    <rect x="0" y="0" width="100" height="50" class="header-bg" rx="5" ry="5" />
    <text x="10" y="26" fill="white" font-size="18px" font-weight="bold">BMJ</text>
    <circle cx="130" cy="15" r="7" fill="none" stroke="var(--primary-blue)" stroke-width="1.5"/>
    <circle cx="130" cy="15" r="3" fill="var(--primary-blue)"/>
    <text x="150" y="15" font-size="14px">Visual abstract</text>

    <text x="450" y="15" class="title">Effects of intensive blood pressure treatment</text>
    <text x="450" y="45" class="title">on orthostatic hypertension</text>
  </g>

  <g id="summary-section" transform="translate(20, 90)">
    <rect x="0" y="0" width="1160" height="100" class="card" />

    <g id="summary-icon" transform="translate(25, 30)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
        <path d="M5 10 L 35 10 M5 20 L 25 20 M5 30 L 30 30" class="icon-path-white"/>
     </g>
    <text x="85" y="51" class="subtitle">Summary</text>

    <g id="orthostatic-hypertension-definition" transform="translate(200, 20)">
        <text x="0" y="10" class="body-text">Orthostatic hypertension:</text>
        <text x="0" y="35" class="body-text">Increase in systolic BP ≥20 mm Hg or</text>
        <text x="0" y="60" class="body-text">diastolic BP ≥10 mm Hg after standing</text>
    </g>

    <line x1="450" y1="15" x2="450" y2="85" class="divider-line" />

    <g id="key-finding" transform="translate(480, 25)">
      <text x="0" y="10" class="body-text">Intensive blood pressure treatment</text>
      <text x="0" y="35" class="body-text">modestly reduced the occurrence</text>
      <text x="0" y="60" class="body-text">of orthostatic hypertension</text>
    </g>

    <line x1="780" y1="15" x2="780" y2="85" class="divider-line" />

    <g id="risk-reduction" transform="translate(810, 35)">
      <text x="0" y="10" class="stat-highlight">7%</text>
      <text x="75" y="10" class="body-text">reduced odds of</text>
      <text x="0" y="35" class="body-text">orthostatic hypertension with intensive treatment</text>
    </g>
  </g>

  <g id="study-design" transform="translate(20, 210)">
    <rect x="0" y="0" width="1160" height="80" class="card" />

    <g id="study-design-icon" transform="translate(25, 20)">
       <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
       <path d="M10 5 L 30 5 M10 12 L 30 12 M10 19 L 30 19 M10 26 L 20 26 M10 33 L 25 33" class="icon-path-white"/>
    </g>
    <text x="85" y="41" class="subtitle">Study design</text>

    <g transform="translate(300, 25)">
       <rect x="0" y="0" width="30" height="30" fill="#EEEEEE" stroke="var(--primary-blue)" stroke-width="1" rx="3" ry="3"/>
       <path d="M7 15 L 23 15 M15 7 L 15 23" stroke="var(--primary-blue)" stroke-width="2" />
       <text x="45" y="8" class="body-text">Individual participant data meta-analysis</text>
       <text x="45" y="28" class="body-text">of 9 randomized controlled trials</text>
    </g>

    <line x1="620" y1="15" x2="620" y2="65" class="divider-line" />

    <g transform="translate(660, 25)">
      <text x="0" y="8" class="body-text">Participants:</text>
      <text x="0" y="28" class="body-text">31,124 adults with hypertension</text>
    </g>

    <g transform="translate(900, 25)">
      <text x="0" y="8" class="body-text">Measurements:</text>
      <text x="0" y="28" class="body-text">315,497 standing BP assessments</text>
    </g>
  </g>

  <g id="data-sources" transform="translate(20, 310)">
    <rect x="0" y="0" width="1160" height="120" class="card" />

    <g id="data-sources-icon" transform="translate(25, 20)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
        <circle cx="13" cy="15" r="6" fill="white"/>
        <path d="M5 35 C 5 25, 21 25, 21 35 Z" fill="white"/>
        <circle cx="27" cy="15" r="6" fill="white"/>
        <path d="M19 35 C 19 25, 35 25, 35 35 Z" fill="white"/>
     </g>
    <text x="85" y="41" class="subtitle">Participant characteristics</text>

    <g transform="translate(280, 25)">
        <rect x="0" y="0" width="30" height="30" fill="var(--primary-blue)" rx="3" ry="3" />
         <path d="M7 8 L 12 8 M 16 8 L 23 8 M 7 15 L 12 15 M 16 15 L 23 15 M 7 22 L 12 22 M 16 22 L 23 22" stroke="white" stroke-width="1.5"/>
        <text x="45" y="8" class="body-text">Mean age: 67.6 years (SD 10.4)</text>
        <text x="45" y="28" class="body-text">47.4% women, 26.1% black</text>
    </g>

    <line x1="580" y1="15" x2="580" y2="105" class="divider-line" />

    <g transform="translate(620, 25)">
       <circle cx="10" cy="10" r="8" fill="var(--primary-blue)" />
       <path d="M3 25 C 3 18, 17 18, 17 25 Z" fill="var(--primary-blue)"/>
       <circle cx="25" cy="10" r="8" fill="var(--primary-blue)" />
       <path d="M18 25 C 18 18, 32 18, 32 25 Z" fill="var(--primary-blue)"/>
      <text x="45" y="8" class="stat-highlight">152.6/80.9</text>
      <text x="160" y="8" class="body-text">mm Hg</text>
      <text x="45" y="32" class="body-text">Mean seated blood pressure</text>
    </g>

    <line x1="860" y1="15" x2="860" y2="105" class="divider-line" />

    <g transform="translate(900, 20)">
        <circle cx="50" cy="40" r="35" fill="var(--primary-blue)" />
        <path d="M50 5 A 35 35 0 0 1 96.5 60 L 50 40 Z" fill="var(--white)" transform="rotate(-120, 50, 40)" />
        <text x="110" y="30" class="stat-highlight" fill="var(--primary-blue)">16.7%</text>
        <text x="110" y="55" class="body-text" fill="var(--primary-blue)">had orthostatic hypertension</text>
     </g>
  </g>

  <g id="outcomes" transform="translate(20, 450)">
    <g id="outcomes-icon" transform="translate(25, 0)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
        <path d="M5 35 V 20 H 15 V 35 Z M 17 35 V 10 H 27 V 35 Z M 29 35 V 25 H 39 V 35 Z" stroke="white" fill="white"/>
     </g>
    <text x="85" y="21" class="subtitle">Results</text>
  </g>

  <g id="charts-area" transform="translate(20, 500)">

      <g id="odds-ratios-chart">
        <rect x="0" y="0" width="570" height="520" class="card" />
        <text x="25" y="30" class="chart-title">Odds Ratios for Orthostatic Hypertension</text>

        <rect x="350" y="15" width="190" height="80" class="purple-box" />
        <text x="360" y="35" class="small-white-text">Intensive treatment</text>
        <text x="360" y="55" class="small-white-text">reduced odds of</text>
        <text x="360" y="75" class="small-white-text">orthostatic hypertension</text>

        <g id="odds-ratios-plot" transform="translate(50, 110)">
            <rect x="0" y="0" width="500" height="320" fill="var(--white)" stroke="var(--stroke-gray)" />

            <text x="-10" y="20" class="chart-label" text-anchor="end">1.2</text>
            <line x1="0" y1="20" x2="%`

console.log(await repairSvgAttributes(svgContent))