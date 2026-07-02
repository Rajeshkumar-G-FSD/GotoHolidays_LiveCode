import { motion, AnimatePresence } from 'motion/react';
import { X, Binoculars, Globe, Building2, Waves, Landmark, Mountain, Utensils, ChevronRight, Search, Check, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── Destination list (exactly as per company offerings) ──────────────────────
const destinations = [
  { name: 'Maldives',     flag: '🇲🇻', price: '₹14,999',  origPrice: '₹20,000'  },
  { name: 'Dubai',        flag: '🇦🇪', price: '₹12,999',  origPrice: '₹18,500'  },
  { name: 'Thailand',     flag: '🇹🇭', price: '₹12,999',  origPrice: '₹19,200'  },
  { name: 'Malaysia',     flag: '🇲🇾', price: '₹13,499',  origPrice: '₹18,000'  },
  { name: 'Andaman',      flag: '🌴',  price: '₹10,999',  origPrice: '₹14,999'  },
  { name: 'Singapore',    flag: '🇸🇬', price: '₹13,999',  origPrice: '₹19,500'  },
  { name: 'Lakshadweep',  flag: '🌊',  price: '₹12,499',  origPrice: '₹17,500'  },
  { name: 'Srilanka',     flag: '🇱🇰', price: '₹11,999',  origPrice: '₹16,000'  },
  { name: 'Bali',         flag: '🇮🇩', price: '₹12,999',  origPrice: '₹17,500'  },
  { name: 'Azerbaijan',   flag: '🇦🇿', price: '₹13,999',  origPrice: '₹19,000'  },
  { name: 'Vietnam',      flag: '🇻🇳', price: '₹11,999',  origPrice: '₹16,000'  },
  { name: 'Russia',       flag: '🇷🇺', price: '₹14,999',  origPrice: '₹22,000'  },
];

// ── Icon map (avoids JSX in data) ─────────────────────────────────────────────
const iconMap = {
  globe:     Globe,
  city:      Building2,
  beach:     Waves,
  culture:   Landmark,
  adventure: Mountain,
  food:      Utensils,
} as const;
type IconKey = keyof typeof iconMap;

// ── Content data ──────────────────────────────────────────────────────────────
const contentMap: Record<string, {
  duration: string; tagline: string; heroImage: string; intro: string;
  stats: { label: string; value: string }[];
  sections?: { icon: IconKey; title: string; desc: string; image: string }[];
  bannerImage?: string;
  featureTitle?: string;
  paragraphs?: string[];
  packageInfo?: { price: string; priceNum: number; nights: number; days: number; offers: string[] };
  ctaTitle: string; ctaDesc: string;
}> = {

  Thailand: {
    duration: '4 Nights & 5 Days',
    tagline: 'Discover the Best of Thailand',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-2f1408198f29?w=1600&q=80',
    intro: "Bangkok, the bustling capital of Thailand, is a vibrant metropolis where ancient temples, gleaming skyscrapers, and bustling street markets coexist. From the opulent Grand Palace to the aromatic street food stalls lining its chaotic lanes, Bangkok offers a sensory feast for travelers. With its rich cultural heritage, thriving nightlife, and diverse culinary scene, Bangkok is a city that captivates…",
    stats: [
      { label: 'Duration',  value: '4N / 5D'    },
      { label: 'Best Time', value: 'Nov – Mar'   },
      { label: 'Currency',  value: 'Thai Baht'   },
      { label: 'Visa',      value: 'On Arrival'  },
    ],
    bannerImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&q=80',
    featureTitle: 'Finest Features of the Resort',
    paragraphs: [
      "Thailand is renowned for its vibrant culture, stunning landscapes, delicious cuisine, and warm hospitality, making it a top destination for travelers worldwide. From the bustling streets of Bangkok to the tranquil beaches of Phuket and the ancient temples of Chiang Mai, Thailand offers a diverse range of experiences to suit every taste.",
      "Bangkok, the capital city, is a dynamic metropolis where modernity meets tradition. Visitors can explore the ornate Grand Palace, shop at bustling markets like Chatuchak Weekend Market, or indulge in mouthwatering street food along bustling lanes.",
      "For those seeking sun and sand, Thailand's islands and beaches are unparalleled. Phuket, Koh Samui, and Krabi are just a few of the idyllic destinations boasting crystal-clear waters, pristine beaches, and vibrant marine life, perfect for snorkeling, diving, or simply lounging under the sun.",
      "Cultural enthusiasts can delve into Thailand's rich heritage by visiting ancient temples such as Wat Arun and Wat Pho in Bangkok, or exploring the ancient city of Ayutthaya, a UNESCO World Heritage Site.",
      "Adventure-seekers can trek through the lush jungles of northern Thailand, visit hill tribes, or embark on adrenaline-pumping activities like zip-lining and white-water rafting.",
      "Thailand's culinary scene is another major draw, with its flavorful dishes ranging from spicy curries and aromatic soups to fresh seafood and tropical fruits. Visitors can also participate in cooking classes to learn the secrets of Thai cuisine firsthand.",
      "Overall, Thailand offers a kaleidoscope of experiences that appeal to all kinds of travelers, making it a must-visit destination in Southeast Asia.",
    ],
    packageInfo: {
      price: '₹12,999',
      priceNum: 12999,
      nights: 4,
      days: 5,
      offers: [
        'Coral Island Tour with Lunch on SIC',
        'Alcazar Show with PVT Transfer',
        'Bangkok City Tour on PVT Basis',
        'Safari World & Marina Park With Lunch on SIC Basis',
        'Return Airport Transfer on PVT Bases',
      ],
    },
    ctaTitle: 'Create Unforgettable Memories with Goto Holidays',
    ctaDesc: "Whether you're planning a family vacation, honeymoon, group tour, or a relaxing getaway, Thailand offers the perfect combination of adventure, relaxation, and cultural discovery. Let Goto Holidays help you experience the very best of Thailand with carefully designed travel packages and personalized service.",
  },

  Maldives: {
    duration: '4 Nights & 5 Days',
    tagline: 'Luxury in the Heart of the Indian Ocean',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80',
    intro: 'Escape to the pristine paradise of the Maldives, where overwater bungalows, turquoise lagoons, and vibrant coral reefs await. Perfect for honeymooners, luxury travelers, and those seeking absolute serenity in one of the world\'s most exclusive destinations.',
    stats: [
      { label: 'Duration',  value: '4N / 5D'   },
      { label: 'Best Time', value: 'Nov – Apr'  },
      { label: 'Currency',  value: 'MVR'        },
      { label: 'Visa',      value: 'On Arrival' },
    ],
    sections: [
      { icon: 'beach',     title: 'Overwater Villas & Crystal Lagoons',      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80', desc: 'Experience the ultimate luxury of staying in stunning overwater bungalows surrounded by crystal-clear lagoons. Wake up to breathtaking views of the Indian Ocean with direct access to pristine waters teeming with colorful marine life.' },
      { icon: 'adventure', title: 'World-Class Snorkeling & Diving',          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', desc: 'The Maldives is a diver\'s paradise with some of the world\'s finest coral reefs. Swim alongside majestic manta rays, whale sharks, sea turtles, and vibrant tropical fish in waters of unparalleled clarity and warmth.' },
      { icon: 'globe',     title: 'Romantic Sunset & Spa Experiences',        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80', desc: 'Indulge in private sunset cruises, candlelit beach dinners, and couples spa treatments designed for two. The Maldives sets the perfect stage for romance with its spectacular sunsets and starlit skies.' },
    ],
    packageInfo: {
      price: '₹14,999',
      priceNum: 14999,
      nights: 3,
      days: 4,
      offers: [
        'Speed Boat Transfer to Resort & Back',
        'Snorkeling at House Reef (SIC)',
        'Sunset Fishing Trip with Crew',
        'Water Villa Stay – 1 Night',
        'Return Male Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Your Private Paradise Awaits',
    ctaDesc: 'Let Goto Holidays craft the perfect Maldives retreat for you. From luxury resort selection to seamless seaplane transfers, we handle every detail so you can focus entirely on the experience.',
  },

  Dubai: {
    duration: '4 Nights & 5 Days',
    tagline: 'Where Luxury Meets the Desert',
    heroImage: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1600&q=80',
    intro: 'Dubai is a city like no other — a dazzling fusion of ultramodern architecture, world-class shopping, desert adventures, and unparalleled luxury. Explore iconic landmarks, indulge in spectacular dining, and discover a destination that constantly redefines what is possible.',
    stats: [
      { label: 'Duration',  value: '4N / 5D'     },
      { label: 'Best Time', value: 'Oct – Apr'    },
      { label: 'Currency',  value: 'UAE Dirham'   },
      { label: 'Visa',      value: 'Required'     },
    ],
    sections: [
      { icon: 'city',      title: 'Iconic Skyline & Landmarks',         image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80', desc: 'Marvel at the Burj Khalifa, explore the Palm Jumeirah, and visit the Dubai Frame. Dubai\'s skyline and landmarks are a testament to human ambition and architectural brilliance that must be seen to be believed.' },
      { icon: 'adventure', title: 'Desert Safari & Thrilling Adventures', image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80', desc: 'Experience the thrill of dune bashing, camel rides, sandboarding, and a traditional Bedouin camp dinner under the stars. The Arabian desert offers an unforgettable contrast to Dubai\'s urban glamour.' },
      { icon: 'food',      title: 'World-Class Shopping & Dining',       image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80', desc: 'From the legendary Dubai Mall and Gold Souk to Michelin-starred restaurants and vibrant street markets, Dubai delivers an extraordinary culinary and retail experience that satisfies every taste.' },
    ],
    packageInfo: {
      price: '₹12,999',
      priceNum: 12999,
      nights: 3,
      days: 4,
      offers: [
        'Desert Safari with BBQ Dinner (SIC)',
        'Dubai City Tour on PVT Basis',
        'Dhow Cruise Marina with Dinner',
        'Burj Khalifa 124th Floor (PVT)',
        'Return Dubai Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Live the Dubai Dream with Goto Holidays',
    ctaDesc: 'Let us design your perfect Dubai itinerary — from luxury hotel stays and visa assistance to desert safaris and exclusive attractions. Dubai is waiting to amaze you.',
  },

  Malaysia: {
    duration: '5 Nights & 6 Days',
    tagline: 'Truly Asia — Culture, Nature & Modern Marvels',
    heroImage: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1600&q=80',
    intro: "Malaysia is a land of incredible diversity where ultramodern cities stand beside ancient rainforests, pristine beaches, and rich multicultural heritage. From the iconic Petronas Twin Towers to the paradise island of Langkawi, Malaysia offers a truly unique travel experience.",
    stats: [
      { label: 'Duration',  value: '5N / 6D'          },
      { label: 'Best Time', value: 'Mar – Oct'         },
      { label: 'Currency',  value: 'Ringgit'           },
      { label: 'Visa',      value: 'Visa Free'         },
    ],
    sections: [
      { icon: 'city',    title: 'Kuala Lumpur — City of Contrasts',  image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80', desc: 'Explore Kuala Lumpur, a dynamic metropolis where colonial heritage meets futuristic architecture. Visit the Petronas Twin Towers, explore vibrant Chinatown, and discover a food scene that reflects Malaysia\'s extraordinary cultural diversity.' },
      { icon: 'beach',   title: 'Langkawi Island Paradise',          image: 'https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?w=800&q=80', desc: "Discover Langkawi — a stunning archipelago of 99 islands blessed with pristine beaches, lush rainforests, cable car experiences, and duty-free shopping. Perfect for relaxation, adventure, and natural exploration." },
      { icon: 'food',    title: 'Extraordinary Cuisine & Culture',   image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80', desc: "Malaysian cuisine is a remarkable fusion of Malay, Chinese, Indian, and indigenous influences. From hawker centres to fine dining, the food experience alone makes Malaysia a destination worth visiting." },
    ],
    packageInfo: {
      price: '₹13,499',
      priceNum: 13499,
      nights: 4,
      days: 5,
      offers: [
        'Kuala Lumpur City Tour on PVT Basis',
        'Petronas Towers Sky Bridge Visit',
        'Genting Highlands Day Trip (SIC)',
        'Batu Caves & Cultural Heritage Tour',
        'Return KL Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Explore Malaysia with Goto Holidays',
    ctaDesc: 'Let Goto Holidays create your perfect Malaysia experience — covering Kuala Lumpur, Langkawi, Penang, and beyond with tailored packages that match your travel style.',
  },

  Andaman: {
    duration: '4 Nights & 5 Days',
    tagline: "India's Hidden Tropical Paradise",
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    intro: "The Andaman & Nicobar Islands offer pristine white sandy beaches, turquoise waters, and some of the world's best coral reefs. Perfect for beach lovers, divers, and nature enthusiasts seeking an unspoiled tropical escape within India.",
    stats: [
      { label: 'Duration',  value: '4N / 5D'       },
      { label: 'Best Time', value: 'Oct – May'      },
      { label: 'Currency',  value: 'Indian Rupee'   },
      { label: 'Visa',      value: 'Not Required'   },
    ],
    sections: [
      { icon: 'beach',     title: 'Pristine Beaches & Clear Waters',        image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800&q=80', desc: "Radhanagar Beach, Elephant Beach, and Neil Island offer some of the most beautiful unspoiled beaches in Asia. The emerald waters and powdery white sands create a picture-perfect setting for relaxation and photography." },
      { icon: 'adventure', title: 'World-Class Diving & Snorkeling',        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', desc: "The Andamans are home to some of Asia's finest diving spots, with visibility up to 40 metres and vibrant coral ecosystems. From beginner snorkeling to advanced wreck diving, the underwater world here is truly spectacular." },
      { icon: 'culture',   title: 'History, Nature & Bioluminescence',      image: 'https://images.unsplash.com/photo-1568123985180-7cd6d7b67427?w=800&q=80', desc: "Explore lush tropical forests, discover the historic Cellular Jail, and witness the magical bioluminescent waters at night. Mangrove kayaking and wildlife spotting add layers of adventure to this extraordinary destination." },
    ],
    packageInfo: {
      price: '₹10,999',
      priceNum: 10999,
      nights: 3,
      days: 4,
      offers: [
        'Cellular Jail Light & Sound Show',
        'Radhanagar Beach Excursion (PVT)',
        'Elephant Beach Snorkeling on SIC',
        'Glass Bottom Boat Ride',
        'Return Port Blair Transfer (PVT)',
      ],
    },
    ctaTitle: 'Discover Andaman with Goto Holidays',
    ctaDesc: 'Book your Andaman island package with Goto Holidays and enjoy a seamless tropical experience — from flights and resorts to guided diving and island-hopping adventures.',
  },

  Singapore: {
    duration: '4 Nights & 5 Days',
    tagline: 'The Lion City — Where the World Comes Together',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80',
    intro: "Singapore is a city-state that seamlessly blends futuristic design, multicultural diversity, and world-class attractions into one extraordinary destination. From the dazzling Gardens by the Bay to the vibrant hawker food scene, Singapore offers an unparalleled urban travel experience.",
    stats: [
      { label: 'Duration',  value: '4N / 5D'         },
      { label: 'Best Time', value: 'Feb – Jul'        },
      { label: 'Currency',  value: 'Singapore Dollar' },
      { label: 'Visa',      value: 'Not Required'     },
    ],
    sections: [
      { icon: 'city',    title: 'Iconic Attractions & Modern Marvels', image: 'https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?w=800&q=80', desc: "Marvel at Gardens by the Bay's spectacular Supertrees, thrill at Universal Studios Singapore, and take in the Marina Bay Sands skyline. Singapore's iconic attractions set new benchmarks for entertainment and design worldwide." },
      { icon: 'food',    title: 'World-Renowned Food Culture',         image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80', desc: "Singapore's food culture is legendary. From hawker centre classics like Hainanese chicken rice and laksa to Michelin-starred restaurants, the city offers an extraordinary culinary journey across multiple world cuisines." },
      { icon: 'globe',   title: 'Shopping, Heritage & Nightlife',      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', desc: "Orchard Road is Asia's premier shopping destination. Explore Chinatown, Little India, and Arab Street's colorful heritage, then experience Singapore's vibrant nightlife at Clarke Quay and Sentosa." },
    ],
    packageInfo: {
      price: '₹13,999',
      priceNum: 13999,
      nights: 3,
      days: 4,
      offers: [
        'Universal Studios Singapore (SIC)',
        'Gardens by the Bay – Supertree Grove',
        'Singapore City Tour on PVT Basis',
        'Sentosa Island Full-Day Visit',
        'Return Changi Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Experience Singapore with Goto Holidays',
    ctaDesc: 'From visa assistance to hotel selection and curated itineraries, Goto Holidays makes your Singapore trip effortless and unforgettable. Let us show you the best of the Lion City.',
  },

  Lakshadweep: {
    duration: '4 Nights & 5 Days',
    tagline: "India's Coral Paradise — Untouched and Pristine",
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=80',
    intro: "Lakshadweep, India's smallest Union Territory, is a collection of 36 coral islands in the Arabian Sea offering pristine lagoons, crystal-clear waters, and vibrant marine ecosystems. A perfect escape for those seeking serenity and unspoiled natural beauty.",
    stats: [
      { label: 'Duration',  value: '4N / 5D'      },
      { label: 'Best Time', value: 'Oct – May'     },
      { label: 'Currency',  value: 'Indian Rupee'  },
      { label: 'Visa',      value: 'Not Required'  },
    ],
    sections: [
      { icon: 'beach',     title: 'Pristine Coral Lagoons',            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', desc: "Lakshadweep's breathtaking coral lagoons offer some of the clearest waters in India. The shallow turquoise lagoons are perfect for swimming, snorkeling, and kayaking, while the untouched beaches provide privacy and paradise rarely found elsewhere." },
      { icon: 'adventure', title: 'Marine Life & Water Sports',         image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', desc: "Home to diverse coral species, sea turtles, dolphins, and tropical fish, Lakshadweep is a haven for marine enthusiasts. Scuba diving, snorkeling, glass-bottom boat rides, and water sports activities are available across the islands." },
      { icon: 'culture',   title: 'Eco-Tourism & Authentic Culture',   image: 'https://images.unsplash.com/photo-1568123985180-7cd6d7b67427?w=800&q=80', desc: "Experience the unique culture of the island communities, savor freshly caught seafood, and participate in eco-friendly tourism that helps preserve this fragile paradise. Lakshadweep offers a slow, sustainable, and deeply authentic travel experience." },
    ],
    packageInfo: {
      price: '₹12,499',
      priceNum: 12499,
      nights: 3,
      days: 4,
      offers: [
        'Bangaram Island Day Excursion',
        'Glass Bottom Boat Ride at Lagoon',
        'Snorkeling at Coral Reef on SIC',
        'Island Hopping by Speed Boat',
        'Return Agatti Airstrip Transfer (PVT)',
      ],
    },
    ctaTitle: 'Explore Lakshadweep with Goto Holidays',
    ctaDesc: "Entry to Lakshadweep requires permits and advance planning. Let Goto Holidays handle all permit applications, resort bookings, and travel logistics for a seamless island experience.",
  },

  Srilanka: {
    duration: '5 Nights & 6 Days',
    tagline: 'The Pearl of the Indian Ocean',
    heroImage: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1600&q=80',
    intro: "Sri Lanka is a land of extraordinary diversity — ancient temples, verdant tea plantations, golden beaches, majestic wildlife, and warm, welcoming people. Often called the Pearl of the Indian Ocean, Sri Lanka offers an authentic, unhurried travel experience that leaves a lasting impression.",
    stats: [
      { label: 'Duration',  value: '5N / 6D'            },
      { label: 'Best Time', value: 'Dec – Mar'           },
      { label: 'Currency',  value: 'Sri Lankan Rupee'    },
      { label: 'Visa',      value: 'e-Visa Required'     },
    ],
    sections: [
      { icon: 'culture', title: 'Ancient Temples & Cultural Triangle',   image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e4?w=800&q=80', desc: "Sri Lanka's Cultural Triangle includes UNESCO World Heritage Sites like Sigiriya Rock Fortress, Anuradhapura, and the Temple of the Tooth in Kandy — offering a profound glimpse into centuries of Buddhist civilization and royal heritage." },
      { icon: 'beach',   title: 'Beautiful Beaches & Coastal Life',       image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80', desc: "From the golden shores of Unawatuna and Mirissa to the surf breaks of Arugam Bay, Sri Lanka offers some of the most beautiful beaches in South Asia. Whale watching, surfing, and beach relaxation make the coastline a major highlight." },
      { icon: 'adventure', title: 'Tea Plantations & Hill Country',       image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80', desc: "Journey through the emerald hills of Nuwara Eliya and Ella, where endless tea plantations create stunning landscapes. Visit working tea estates, ride the scenic train to Ella, and experience the cool mountain climate that makes this region unique." },
    ],
    packageInfo: {
      price: '₹11,999',
      priceNum: 11999,
      nights: 4,
      days: 5,
      offers: [
        'Colombo City Tour on PVT Basis',
        'Sigiriya Rock Fortress Day Visit',
        'Kandy Temple of the Tooth Relic',
        'Scenic Train Ride – Ella to Kandy',
        'Return Colombo Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Discover Sri Lanka with Goto Holidays',
    ctaDesc: 'From colonial Colombo to misty hill stations and pristine beaches, let Goto Holidays curate your perfect Sri Lanka itinerary with expert guidance and seamless travel arrangements.',
  },

  Bali: {
    duration: '5 Nights & 6 Days',
    tagline: 'Island of the Gods — A Spiritual Paradise',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80',
    intro: "Bali is one of the world's most beloved destinations, enchanting visitors with lush tropical landscapes, ancient Hindu temples, vibrant arts, world-class surf, and warm Balinese hospitality. Whether you seek spiritual renewal, adventure, or pure relaxation, Bali delivers an unforgettable experience.",
    stats: [
      { label: 'Duration',  value: '5N / 6D'          },
      { label: 'Best Time', value: 'Apr – Oct'         },
      { label: 'Currency',  value: 'Indonesian Rupiah' },
      { label: 'Visa',      value: 'On Arrival'        },
    ],
    sections: [
      { icon: 'culture',   title: 'Sacred Temples & Spiritual Culture',   image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', desc: "Bali is home to thousands of intricately designed Hindu temples. Highlights include the cliffside Uluwatu Temple, the water temple of Pura Tirta Empul, and the majestic Besakih — Bali's Mother Temple — each offering a glimpse into the island's deeply spiritual culture." },
      { icon: 'adventure', title: 'Rice Terraces, Volcanoes & Nature',    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', desc: "The iconic Tegallalang rice terraces, volcanic Mount Batur, and lush Ubud jungle create a backdrop of extraordinary natural beauty. Sunrise hikes, waterfall trekking, and cycling through village lanes offer authentic Balinese experiences." },
      { icon: 'beach',     title: 'World-Class Beaches & Surfing',        image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', desc: "From the iconic beaches of Kuta and Seminyak to the quieter shores of Nusa Dua and Sanur, Bali's coastline offers something for every beach lover. Surfers flock to Uluwatu and Canggu for world-class breaks." },
    ],
    packageInfo: {
      price: '₹12,999',
      priceNum: 12999,
      nights: 4,
      days: 5,
      offers: [
        'Ubud Cultural & Rice Terrace Tour (PVT)',
        'Tanah Lot Sunset Temple Visit',
        'Kuta Beach Surfing Lesson',
        'Traditional Balinese Cooking Class',
        'Return Ngurah Rai Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Experience the Magic of Bali with Goto Holidays',
    ctaDesc: "Let Goto Holidays design your perfect Bali retreat — from luxury private villas and temple tours to cooking classes and surf lessons. Bali's magic is waiting to be discovered.",
  },

  Azerbaijan: {
    duration: '5 Nights & 6 Days',
    tagline: 'The Land of Fire — Where East Meets West',
    heroImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&q=80',
    intro: "Azerbaijan, the Land of Fire, is one of the world's most fascinating emerging destinations. Baku, its capital, is a stunning blend of medieval old city and ultramodern architecture. From Caspian Sea shores to ancient fire temples and mountain landscapes, Azerbaijan offers a truly unique travel experience.",
    stats: [
      { label: 'Duration',  value: '5N / 6D'            },
      { label: 'Best Time', value: 'Apr – Jun'           },
      { label: 'Currency',  value: 'Azerbaijani Manat'   },
      { label: 'Visa',      value: 'e-Visa Required'     },
    ],
    sections: [
      { icon: 'city',      title: 'Baku — A City of Contrasts',            image: 'https://images.unsplash.com/photo-1509483894208-d0e6e3c31a5c?w=800&q=80', desc: "Baku is a city that defies expectations — its UNESCO-listed Old City sits beside the futuristic Flame Towers and the stunning Heydar Aliyev Centre. Baku's unique architecture, vibrant cafe culture, and seaside boulevard make it one of the most photogenic cities in the world." },
      { icon: 'culture',   title: 'Ancient Fire Temples & Rock Art',       image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80', desc: "Visit the eternal flames of Yanar Dag (Burning Mountain) and the ancient Ateshgah Fire Temple — sacred sites that have burned naturally for centuries. The Gobustan rock carvings, dating back 40,000 years, add another layer of historical fascination." },
      { icon: 'adventure', title: 'Caspian Coast & Mountain Villages',     image: 'https://images.unsplash.com/photo-1551918120-9739cb430171?w=800&q=80', desc: "Azerbaijan's diverse landscapes range from Caspian Sea shores to the stunning Greater Caucasus mountain villages of Lahij and Sheki. Discover traditional craftsmanship, ancient caravanserais, and mountain hospitality unchanged for centuries." },
    ],
    packageInfo: {
      price: '₹13,999',
      priceNum: 13999,
      nights: 4,
      days: 5,
      offers: [
        'Baku Old City (Icherisheher) Walking Tour',
        'Heydar Aliyev Centre Visit (PVT)',
        'Yanar Dag Fire Mountain & Ateshgah Tour',
        'Gobustan Rock Art Museum Day Trip',
        'Return Heydar Aliyev Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Discover Azerbaijan with Goto Holidays',
    ctaDesc: "Azerbaijan is a destination like no other. Let Goto Holidays guide you through this extraordinary country with expertly crafted itineraries that reveal the very best of the Land of Fire.",
  },

  Vietnam: {
    duration: '6 Nights & 7 Days',
    tagline: 'Breathtaking Beauty and Rich Heritage',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80',
    intro: "Vietnam is a country of extraordinary natural beauty and vibrant cultural heritage. From the emerald waters of Ha Long Bay and the ancient streets of Hoi An to the bustling energy of Hanoi and Ho Chi Minh City, Vietnam captivates every traveler with its warmth, history, and stunning landscapes.",
    stats: [
      { label: 'Duration',  value: '6N / 7D'          },
      { label: 'Best Time', value: 'Feb – Apr'         },
      { label: 'Currency',  value: 'Vietnamese Dong'   },
      { label: 'Visa',      value: 'e-Visa Required'   },
    ],
    sections: [
      { icon: 'beach',   title: "Ha Long Bay — A Natural Wonder",     image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', desc: "Ha Long Bay, a UNESCO World Heritage Site, is one of the world's most breathtaking natural wonders. Over 1,600 limestone karst islands rise dramatically from emerald waters, creating a landscape of ethereal beauty. A cruise through Ha Long Bay is a once-in-a-lifetime experience." },
      { icon: 'culture', title: 'Ancient Towns & Cultural Heritage',  image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80', desc: "Hoi An's Ancient Town, perfectly preserved with its lantern-lit streets and traditional architecture, is one of Southeast Asia's most charming destinations. Hue's Imperial Citadel offers a fascinating window into Vietnam's imperial past." },
      { icon: 'food',    title: 'World-Famous Vietnamese Cuisine',    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80', desc: "Vietnamese cuisine is among the world's healthiest and most flavorful. Savor iconic dishes like pho, banh mi, fresh spring rolls, and bun cha. Street food tours in Hanoi and Ho Chi Minh City are an essential part of the Vietnam experience." },
    ],
    packageInfo: {
      price: '₹11,999',
      priceNum: 11999,
      nights: 4,
      days: 5,
      offers: [
        'Ha Long Bay 1-Night Cruise on SIC',
        'Hanoi Old Quarter Walking Tour (PVT)',
        'Hoi An Ancient Town Guided Tour',
        'Traditional Vietnamese Cooking Class',
        'Return Noi Bai Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Explore Vietnam with Goto Holidays',
    ctaDesc: "From Ha Long Bay cruises to motorbike tours and cooking classes, Goto Holidays designs Vietnam experiences that go beyond the ordinary. Let us show you the real Vietnam.",
  },

  Russia: {
    duration: '7 Nights & 8 Days',
    tagline: 'The Land of Tsars, Art, and Grand Palaces',
    heroImage: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600&q=80',
    intro: "Russia, the world's largest country, offers travelers an extraordinary journey through imperial palaces, onion-domed cathedrals, world-class museums, and breathtaking natural landscapes. Moscow and Saint Petersburg stand as two of Europe's most magnificent cities, each offering a unique window into Russia's rich and complex history.",
    stats: [
      { label: 'Duration',  value: '7N / 8D'      },
      { label: 'Best Time', value: 'May – Sep'     },
      { label: 'Currency',  value: 'Russian Ruble' },
      { label: 'Visa',      value: 'Required'      },
    ],
    sections: [
      { icon: 'city',      title: 'Moscow — Heart of the Empire',           image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80', desc: "Moscow's iconic Red Square, the magnificent Kremlin, and St. Basil's Cathedral create one of the world's most recognizable cityscapes. World-class ballet, underground metro stations, and contemporary arts make Moscow a multifaceted destination." },
      { icon: 'culture',   title: 'Saint Petersburg — Cultural Capital',    image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&q=80', desc: "Saint Petersburg, the 'Venice of the North,' is home to the magnificent Hermitage Museum, the opulent Catherine Palace, and the stunning Church of the Savior on Spilled Blood. During the famous White Nights of summer, the city takes on a magical, dreamlike quality." },
      { icon: 'adventure', title: 'Trans-Siberian & Natural Wonders',       image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80', desc: "Lake Baikal, the world's deepest lake, and the Kamchatka Peninsula's volcanic landscapes represent Russia's most spectacular natural attractions. The Trans-Siberian Railway journey is an epic adventure across the world's largest country." },
    ],
    packageInfo: {
      price: '₹14,999',
      priceNum: 14999,
      nights: 5,
      days: 6,
      offers: [
        'Moscow Red Square & Kremlin Tour (PVT)',
        'St. Petersburg Hermitage Museum Visit',
        'Catherine Palace & Pushkin Day Trip',
        'White Nights Canal Cruise (SIC)',
        'Return Moscow Airport Transfer (PVT)',
      ],
    },
    ctaTitle: 'Discover Russia with Goto Holidays',
    ctaDesc: "Russia's visa process and travel logistics require expert planning. Goto Holidays manages every aspect of your Russian adventure — from visa applications to private tours of imperial palaces.",
  },
};

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton({ flag, name }: { flag: string; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 px-6 md:px-20 max-w-7xl mx-auto"
    >
      {/* Spinner */}
      <div className="flex flex-col items-center gap-6 mb-20">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-b-transparent animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">{flag}</div>
        </div>
        <div className="text-center space-y-2">
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary"
          >
            Curating Your Experience
          </motion.p>
          <p className="font-display text-3xl text-on-surface">{name}</p>
        </div>
      </div>

      {/* Skeleton shimmer */}
      <div className="space-y-8 animate-pulse">
        <div className="h-72 bg-black/6 rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-black/5 rounded-2xl" />)}
        </div>
        {[1, 2].map(i => (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${i % 2 === 0 ? 'md:[direction:rtl]' : ''}`}>
            <div className="h-64 bg-black/5 rounded-2xl md:[direction:ltr]" />
            <div className="space-y-4 md:[direction:ltr]">
              <div className="h-7 bg-black/8 rounded-xl w-2/3" />
              <div className="h-3.5 bg-black/5 rounded-xl" />
              <div className="h-3.5 bg-black/5 rounded-xl w-5/6" />
              <div className="h-3.5 bg-black/5 rounded-xl w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Package Card ──────────────────────────────────────────────────────────────
type PackageInfo = NonNullable<(typeof contentMap)[string]['packageInfo']>;

function PackageCard({ info, destination }: { info: PackageInfo; destination: string }) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const end  = info.priceNum;
      const step = Math.ceil(end / 70);
      const tick = () => {
        cur = Math.min(cur + step, end);
        if (priceRef.current) priceRef.current.textContent = '₹' + cur.toLocaleString('en-IN');
        if (cur < end) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [info.priceNum]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75 }}
      className="mx-6 md:mx-20 max-w-7xl xl:mx-auto my-20 rounded-3xl overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0305 60%, #2d0008 100%)' }}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

      <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* ── Left: Price + Duration + CTA ── */}
        <div className="space-y-7">
          {/* Price */}
          <div>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary/60 block mb-2">Package Price</span>
            <div className="flex items-end gap-3">
              <span ref={priceRef} className="font-display text-5xl md:text-6xl text-white leading-none tabular-nums">₹0</span>
              <span className="text-white/35 text-sm font-semibold mb-1.5">/ person</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-white/25 text-xs line-through">₹24,500</span>
              <span className="text-[8px] font-black tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-0.5">
                Best Value
              </span>
            </div>
          </div>

          {/* Duration Badges */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, borderColor: 'rgba(153,0,17,0.5)' }}
              className="flex flex-col items-center gap-1 bg-white/4 border border-white/10 rounded-2xl px-7 py-4 cursor-default select-none transition-colors duration-200"
            >
              <span className="font-display text-4xl text-white leading-none">{info.nights}</span>
              <span className="text-[8px] font-black tracking-[0.25em] uppercase text-white/35">Nights</span>
            </motion.div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="w-0.5 h-4 bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>
            <motion.div
              whileHover={{ scale: 1.05, borderColor: 'rgba(153,0,17,0.5)' }}
              className="flex flex-col items-center gap-1 bg-white/4 border border-white/10 rounded-2xl px-7 py-4 cursor-default select-none transition-colors duration-200"
            >
              <span className="font-display text-4xl text-white leading-none">{info.days}</span>
              <span className="text-[8px] font-black tracking-[0.25em] uppercase text-white/35">Days</span>
            </motion.div>
            <span className="text-white/15 text-xs font-semibold ml-1 hidden sm:block">{destination}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-black text-[10px] tracking-widest uppercase hover:brightness-115 hover:scale-105 transition-all shadow-2xl shadow-primary/30"
            >
              Inquire Now <ChevronRight size={13} />
            </Link>
            <a
              href="tel:9840454061"
              className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/55 px-8 py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:border-white/25 hover:text-white/80 transition-all"
            >
              +91 98404 54061
            </a>
          </div>
        </div>

        {/* ── Right: What We Offer ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-primary" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50">What We Offer</span>
          </div>
          <ul className="space-y-3">
            {info.offers.map((offer, i) => (
              <motion.li
                key={offer}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                className="flex items-start gap-3 group cursor-default"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 group-hover:border-primary/60 transition-all duration-200">
                  <Check size={10} className="text-primary" />
                </span>
                <span className="text-white/55 font-sans text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-200">
                  {offer}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(153,0,17,0.5), transparent)' }} />
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Packages() {
  const [query, setQuery]           = useState('');
  const [selected, setSelected]     = useState<typeof destinations[0] | null>(null);
  const [showDropdown, setShowDrop] = useState(false);
  const [isLoading, setIsLoading]   = useState(false);
  const [showContent, setShow]      = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const searchRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowDrop(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const filtered = query
    ? destinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
    : destinations;

  const handleSelect = (dest: typeof destinations[0]) => {
    setSelected(dest);
    setQuery(dest.name);
    setShowDrop(false);
    setShow(false);
    setShowDetails(false);
    setIsLoading(false);
  };

  const handleClear = () => {
    setQuery(''); setSelected(null); setShow(false); setShowDetails(false); setIsLoading(false);
  };

  const handleExplore = () => {
    if (!selected) return;
    setShowDrop(false);
    setShow(false);
    setShowDetails(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShow(true);
      setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }, 1100);
  };

  const data = selected ? contentMap[selected.name] : null;

  return (
    <div className="w-full">

      {/* ── Hero + Search Bar ──────────────────────────────────────────────── */}
      <header className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
            alt="Holiday Packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/35 to-surface-dim" />
        </div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-bold tracking-widest mb-6"
          >
            <Globe size={11} />  CURATED HOLIDAY PACKAGES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white mb-4 tracking-tighter max-w-4xl leading-tight"
          >
            Discover Your<br /><span className="text-primary italic">Dream Escape</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/55 font-sans text-lg mb-10 max-w-lg leading-relaxed"
          >
            Handpicked holiday packages to the world's most breathtaking destinations.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xl relative"
          >
            <div className="bg-white rounded-2xl md:rounded-full flex items-center gap-2 p-2 shadow-2xl shadow-black/40 border border-white/10">
              {/* Flag / Globe */}
              <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 ml-1 text-2xl select-none">
                {selected ? selected.flag : <Globe size={18} className="text-on-surface-variant" />}
              </div>

              {/* Input */}
              <div className="flex-1 flex items-center gap-2 px-1">
                <Search size={15} className="text-on-surface-variant flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setShowDrop(true); if (!e.target.value) setSelected(null); }}
                  onFocus={() => setShowDrop(true)}
                  onKeyDown={e => { if (e.key === 'Enter' && selected) handleExplore(); }}
                  placeholder="Choose a destination..."
                  className="flex-1 bg-transparent text-on-surface font-semibold text-base placeholder:text-on-surface-variant/50 outline-none py-2"
                />
                {query && (
                  <button onClick={handleClear} className="p-1 hover:bg-black/5 rounded-full text-on-surface-variant flex-shrink-0">
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Explore Button */}
              <button
                onClick={handleExplore}
                disabled={!selected}
                className="bg-primary text-white px-7 py-3.5 rounded-xl md:rounded-full font-black text-[11px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center gap-2 flex-shrink-0 disabled:opacity-40 disabled:pointer-events-none"
              >
                <Binoculars size={15} /> Explore
              </button>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {showDropdown && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-3 bg-white rounded-3xl shadow-2xl shadow-black/25 overflow-hidden z-50 border border-black/5 max-h-[380px] overflow-y-auto"
                >
                  {filtered.map((dest, i) => (
                    <motion.button
                      key={dest.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleSelect(dest)}
                      className={`w-full flex items-center gap-4 px-6 py-3 hover:bg-surface-container-low transition-colors text-left group border-b border-black/4 last:border-0 ${selected?.name === dest.name ? 'bg-primary/5' : ''}`}
                    >
                      <span className="text-2xl leading-none w-8 text-center flex-shrink-0">{dest.flag}</span>
                      <span className={`font-semibold text-sm transition-colors flex-1 ${selected?.name === dest.name ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                        {dest.name}
                      </span>
                      <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-[10px] text-on-surface-variant/40 line-through font-medium">{dest.origPrice}</span>
                        <span className="text-on-surface-variant/30 text-[10px]">→</span>
                        <span className={`text-[12px] font-black ${selected?.name === dest.name ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                          {dest.price}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      {/* ── Loading Skeleton ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isLoading && selected && (
          <LoadingSkeleton flag={selected.flag} name={selected.name} />
        )}
      </AnimatePresence>

      {/* ── Destination Content ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showContent && data && selected && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Destination Hero */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-end overflow-hidden pb-16">
              <motion.div
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <img src={data.heroImage} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
              </motion.div>

              <div className="relative z-10 w-full px-6 md:px-20 max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="max-w-3xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">{selected.flag}</span>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-[10px] font-bold tracking-widest">
                      {data.duration}
                    </span>
                  </div>
                  <h1 className="font-display text-5xl md:text-7xl text-white mb-4 tracking-tighter leading-tight">
                    {selected.name}<br /><span className="text-primary italic text-4xl md:text-5xl">{data.tagline}</span>
                  </h1>
                  <p className="text-white/65 font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                    {data.intro}
                  </p>
                  <button
                    onClick={() => {
                      setShowDetails(true);
                      setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
                    }}
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl shadow-primary/40"
                  >
                    Explore Packages <ChevronRight size={15} />
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Stats Bar */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="bg-white border-b border-black/6 shadow-sm"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-20 py-5 grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                {/* Price — special column */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="col-span-1 flex flex-col gap-0.5 text-center md:text-left border-r border-black/5 pr-4 md:pr-6"
                >
                  <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">Package Price</span>
                  <span className="text-[10px] text-on-surface-variant/40 line-through font-semibold leading-none mt-0.5">{selected.origPrice}</span>
                  <span className="font-display text-xl md:text-2xl text-primary leading-tight">{selected.price}</span>
                  <span className="text-[7px] font-bold uppercase tracking-widest text-on-surface-variant/40">per person</span>
                </motion.div>

                {/* Duration, Best Time, Currency, Visa */}
                {data.stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.07 }}
                    className="flex flex-col gap-1 text-center md:text-left border-r border-black/5 last:border-0 pr-4 md:pr-6 last:pr-0"
                  >
                    <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">{s.label}</span>
                    <span className="font-display text-base md:text-xl text-on-surface leading-snug">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Detailed content: revealed after "Explore Packages" click ── */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  ref={detailsRef}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                >
                  {/* Big Banner */}
                  {data.bannerImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.0 }}
                      className="relative h-[50vh] md:h-[65vh] overflow-hidden"
                    >
                      <img
                        src={data.bannerImage}
                        alt={selected.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-surface-dim/60 via-transparent to-transparent" />
                      {data.featureTitle && (
                        <motion.div
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.7 }}
                          className="absolute bottom-8 left-0 right-0 px-6 md:px-20 max-w-7xl mx-auto"
                        >
                          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 text-[10px] font-bold tracking-widest">
                            <MapPin size={10} /> {selected.name}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Article: featureTitle + paragraphs */}
                  {data.featureTitle && data.paragraphs && (
                    <div className="py-16 px-6 md:px-20 max-w-5xl mx-auto">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.65 }}
                        className="font-display text-3xl md:text-4xl text-on-surface tracking-tighter mb-10 leading-snug"
                      >
                        {data.featureTitle}
                      </motion.h2>
                      <div className="space-y-5">
                        {data.paragraphs.map((para, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.07, duration: 0.55 }}
                            className="text-on-surface-variant font-sans text-base md:text-[17px] leading-[1.85]"
                          >
                            {para}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Package Card */}
                  {data.packageInfo && (
                    <PackageCard info={data.packageInfo} destination={selected.name} />
                  )}
                  {/* ── Sections (destinations with sections data) ── */}
                  {data.sections && data.sections.length > 0 && (
                    <div className="py-20 px-6 md:px-20 max-w-7xl mx-auto space-y-24">
                      {data.sections.map((section, i) => {
                        const Icon = iconMap[section.icon];
                        const isReverse = i % 2 !== 0;
                        return (
                          <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${isReverse ? 'md:[direction:rtl]' : ''}`}
                          >
                            <div className={`relative overflow-hidden rounded-3xl h-80 md:h-[420px] group ${isReverse ? 'md:[direction:ltr]' : ''}`}>
                              <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                              <div className="absolute bottom-5 left-5 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center text-primary shadow-lg">
                                <Icon size={20} />
                              </div>
                            </div>
                            <div className={`space-y-6 ${isReverse ? 'md:[direction:ltr]' : ''}`}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                  <Icon size={18} />
                                </div>
                                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary">
                                  {selected.name} Highlights
                                </span>
                              </div>
                              <h3 className="font-display text-3xl md:text-4xl text-on-surface tracking-tight leading-snug">
                                {section.title}
                              </h3>
                              <p className="text-on-surface-variant font-sans text-base leading-[1.8]">
                                {section.desc}
                              </p>
                              <Link
                                to="/contact"
                                className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-3 transition-all duration-200"
                              >
                                Inquire About This <ChevronRight size={14} />
                              </Link>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final CTA — shown after details revealed */}
            {showDetails && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-[#990011] py-24 px-6 md:px-20 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                  <span className="text-5xl mb-6 block">{selected.flag}</span>
                  <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-tighter leading-tight">
                    {data.ctaTitle}
                  </h2>
                  <p className="text-white/70 font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                    {data.ctaDesc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-white text-primary px-10 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-2xl"
                    >
                      Inquire Now <ChevronRight size={14} />
                    </Link>
                    <a
                      href="tel:9840454061"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-10 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:border-white hover:scale-105 transition-all"
                    >
                      +91 98404 54061
                    </a>
                  </div>
                </div>
              </motion.section>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[160px] -z-10 pointer-events-none" />
    </div>
  );
}
