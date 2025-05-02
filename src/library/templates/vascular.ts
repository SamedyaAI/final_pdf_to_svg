export const vascularTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <!-- Background -->
  <rect width="1200" height="800" fill="#ffffff"/>
  
  <!-- Header background -->
  <rect width="1200" height="120" fill="#B45B51"/>
  
  <!-- Title -->
  <text x="600" y="45" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">Therapeutic Anticoagulation After Index Peripheral Endovascular</text>
  <text x="600" y="90" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white">Intervention in Patients with Claudication</text>
  
  <!-- Study Description Bar -->
  <rect width="1200" height="60" y="120" fill="#E6C0BA"/>
  
  <g transform="translate(20, 150)">
    <!-- Icon for clipboard/document -->
    <path d="M5,0 h30 v5 h-5 v35 h-25 z" fill="#333333"/>
    <path d="M30,0 v5 h5 z" fill="#333333"/>
    <path d="M10,10 h20 v2 h-20 z M10,15 h20 v2 h-20 z M10,20 h20 v2 h-20 z" fill="#333333"/>
    
    <text x="50" y="25" font-family="Arial, sans-serif" font-size="22" fill="#333333">Retrospective review of the VQI database</text>
    
    <!-- Icon for people/patients -->
    <g transform="translate(600, 0)">
      <!-- First figure -->
      <circle cx="10" cy="10" r="6" fill="#333333"/>
      <path d="M10,16 v12 M4,20 h12 M4,28 l6,10 M16,28 l-6,10" fill="none" stroke="#333333" stroke-width="2"/>
      
      <!-- Second figure (slightly overlapping) -->
      <circle cx="20" cy="12" r="6" fill="#333333"/>
      <path d="M20,18 v12 M14,22 h12 M14,30 l6,10 M26,30 l-6,10" fill="none" stroke="#333333" stroke-width="2"/>
      
      <text x="50" y="25" font-family="Arial, sans-serif" font-size="22" fill="#333333">26,240 patients undergoing peripheral endovascular intervention for claudication</text>
    </g>
  </g>
  
  <!-- Main Content -->
  <!-- Large Circle with 9.1% -->
  <g transform="translate(250, 400)">
    <circle cx="0" cy="0" r="150" fill="#B45B51"/>
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="100" font-weight="bold" text-anchor="middle" fill="white">9.1%</text>
    <text x="0" y="40" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">of patients</text>
    <text x="0" y="70" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">discharged on</text>
    <text x="0" y="100" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">anticoagulation</text>
    
    <!-- Pill Icon -->
    <g transform="translate(100, 100)">
      <!-- Capsule pill shape -->
      <path d="M-20,30 L30,30 C45,30 45,0 30,0 L-20,0 C-35,0 -35,30 -20,30 Z" fill="white"/>
      <path d="M-20,0 L30,0 C45,0 45,30 30,30 L-20,30 C-35,30 -35,0 -20,0 Z M5,0 L5,30" fill="none" stroke="black" stroke-width="2"/>
    </g>
  </g>
  
  <!-- Results Boxes -->
  <!-- Any Anticoagulation Box -->
  <g transform="translate(600, 220)">
    <rect width="550" height="150" rx="5" ry="5" fill="#FDE5E5" stroke="#B45B51" stroke-width="2"/>
    
    <text x="20" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#333333">Patients receiving <tspan fill="#B45B51">any anticoagulation</tspan> with:</text>
    
    <text x="20" y="70" font-family="Arial, sans-serif" font-size="24" fill="#333333">•</text>
    <text x="40" y="70" font-family="Arial, sans-serif" font-size="24" fill="#333333">Higher risk of <tspan font-weight="bold">mortality</tspan> (HR 1.61)</text>
    
    <text x="20" y="105" font-family="Arial, sans-serif" font-size="24" fill="#333333">•</text>
    <text x="40" y="105" font-family="Arial, sans-serif" font-size="24" fill="#333333">No difference in <tspan font-weight="bold">MALE</tspan></text>
    
    <text x="20" y="140" font-family="Arial, sans-serif" font-size="24" fill="#333333">•</text>
    <text x="40" y="140" font-family="Arial, sans-serif" font-size="24" fill="#333333">No difference in <tspan font-weight="bold">patency loss</tspan></text>
  </g>
  
  <!-- Red Arrow pointing to Vitamin K -->
  <g transform="translate(650, 385)">
    <!-- Large right-facing bracket/arrow shape -->
    <path d="M 0,0 L 100,0 L 100,45 L 150,45" fill="none" stroke="#B45B51" stroke-width="10" stroke-linejoin="round" stroke-linecap="square"/>
    <!-- Arrow tip -->
    <path d="M 150,45 L 130,30 L 130,60 Z" fill="#B45B51"/>
  </g>
  
  <!-- Vitamin K Box -->
  <g transform="translate(800, 400)">
    <rect width="350" height="120" rx="5" ry="5" fill="#FFF0E0" stroke="#B45B51" stroke-width="1"/>
    
    <text x="20" y="30" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#B45B51">Vitamin K antagonist:</text>
    
    <text x="20" y="60" font-family="Arial, sans-serif" font-size="20" fill="#333333">•</text>
    <text x="40" y="60" font-family="Arial, sans-serif" font-size="20" fill="#333333">Higher risk of <tspan font-weight="bold">patency loss</tspan> (HR 1.32)</text>
    
    <text x="20" y="90" font-family="Arial, sans-serif" font-size="20" fill="#333333">•</text>
    <text x="40" y="90" font-family="Arial, sans-serif" font-size="20" fill="#333333">Higher risk of <tspan font-weight="bold">MALE</tspan> (HR 1.33)</text>
    
    <text x="20" y="120" font-family="Arial, sans-serif" font-size="20" fill="#333333">•</text>
    <text x="40" y="120" font-family="Arial, sans-serif" font-size="20" fill="#333333">Higher risk of <tspan font-weight="bold">mortality</tspan> (HR 1.46)</text>
  </g>
  
  <!-- Red Arrow pointing to Oral Factor Xa -->
  <g transform="translate(650, 545)">
    <!-- Large right-facing bracket/arrow shape -->
    <path d="M 0,0 L 100,0 L 100,45 L 150,45" fill="none" stroke="#B45B51" stroke-width="10" stroke-linejoin="round" stroke-linecap="square"/>
    <!-- Arrow tip -->
    <path d="M 150,45 L 130,30 L 130,60 Z" fill="#B45B51"/>
  </g>
  
  <!-- Oral Factor Xa Box -->
  <g transform="translate(800, 550)">
    <rect width="350" height="90" rx="5" ry="5" fill="#FFF0E0" stroke="#B45B51" stroke-width="1"/>
    
    <text x="20" y="30" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#B45B51">Oral Factor Xa Inhibitor:</text>
    
    <text x="20" y="60" font-family="Arial, sans-serif" font-size="20" fill="#333333">•</text>
    <text x="40" y="60" font-family="Arial, sans-serif" font-size="20" fill="#333333">Lower risk of <tspan font-weight="bold">patency loss</tspan> (HR 0.61)</text>
    
    <text x="20" y="90" font-family="Arial, sans-serif" font-size="20" fill="#333333">•</text>
    <text x="40" y="90" font-family="Arial, sans-serif" font-size="20" fill="#333333">Higher risk of <tspan font-weight="bold">mortality</tspan> (HR 1.51)</text>
  </g>
  
  <!-- Footer -->
  <g transform="translate(0, 700)">
    <rect width="1200" height="100" fill="#B45B51"/>
    
    <!-- JVS logo as oval -->
    <g transform="translate(80, 50)">
      <ellipse cx="0" cy="0" rx="60" ry="35" fill="#B45B51" stroke="white" stroke-width="2"/>
      <text x="0" y="10" font-family="Arial, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="white">JVS</text>
    </g>
    
    <text x="160" y="40" font-family="Arial, sans-serif" font-style="italic" font-size="18" fill="#ffffff">Journal of</text>
    <text x="160" y="60" font-family="Arial, sans-serif" font-style="italic" font-size="18" fill="#ffffff">Vascular Surgery</text>
    
    <text x="480" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Lee et al. J Vasc Surg. December 2023</text>
    <text x="480" y="75" font-family="Arial, sans-serif" font-size="12" fill="#ffffff">Copyright © 2023 by the Society for Vascular Surgery®</text>
    
    <!-- Social media links -->
    <g transform="translate(950, 50)">
      <!-- LinkedIn icon (simplified) -->
      <rect x="0" y="-10" width="20" height="20" rx="2" fill="white"/>
      <text x="25" y="5" font-family="Arial, sans-serif" font-size="14" fill="#ffffff">LinkedIn</text>
      
      <!-- Facebook icon (simplified) -->
      <rect x="100" y="-10" width="20" height="20" rx="2" fill="white"/>
      <text x="125" y="5" font-family="Arial, sans-serif" font-size="14" fill="#ffffff">FB@TheJVascSurg</text>
      
      <!-- X/Twitter icon (simplified) -->
      <rect x="230" y="-10" width="20" height="20" rx="2" fill="white"/>
      <text x="255" y="5" font-family="Arial, sans-serif" font-size="14" fill="#ffffff">X@JVascSurg</text>
    </g>
  </g>
</svg>`;