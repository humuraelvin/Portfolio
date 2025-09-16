export function getPlaceholderGradient(projectId) {
  // Array of gradient combinations for placeholders
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-purple-500 to-pink-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-teal-500 to-blue-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-sky-500 to-indigo-500',
    'from-amber-500 to-red-500',
    'from-emerald-500 to-teal-500',
  ];

  // Get a consistent gradient based on project ID
  const index = projectId % gradients.length;
  return gradients[index];
}

export function generatePlaceholderDataUrl(projectId) {
  // Generate a placeholder color based on project ID
  const gradient = getPlaceholderGradient(projectId);
  
  // Create an SVG with the gradient
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
        <filter id="noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="multiply"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
      <text x="50%" y="50%" font-family="Arial" font-size="42" text-anchor="middle" fill="white">Project Preview</text>
    </svg>
  `;
  
  // Convert SVG to data URL
  const encodedSVG = encodeURIComponent(svg);
  return `data:image/svg+xml,${encodedSVG}`;
} 