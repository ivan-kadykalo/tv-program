import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Телепрограма',
    short_name: 'Телепрограма',
    description: 'Які фільми та мультфільми були в трансляції на тв протягом 10 днів',
    start_url: 'https://tv-pr.vercel.app/',
    lang: 'uk',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        "src":"icons/icon-192x192.png",
        "sizes":"192x192",
        "type":"image/png",
        "purpose":"any"
      },
      {
        "src": "icons/icon-512x512.png",
        "sizes":"512x512",
        "type":"image/png",
        "purpose":"maskable"
      }
    ],
    screenshots: [
      {
        "src": "screenshots/general-screen.png",
        "type": "image/png",
        "sizes": "872x1772",
        "form_factor": "narrow",
      },
      {
        "src": "screenshots/movies-screen.png",
        "type": "image/png",
        "sizes": "872x1772",
        "form_factor": "narrow",
      }
    ],
  }
}