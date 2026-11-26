export interface GalleryItem {
  id: string;
  title: string;
  category:
    | 'Wedding Stories'
    | 'Pre-Wedding'
    | 'Couple Portraits'
    | 'Traditional Celebrations'
    | 'Candid Moments'
    | 'Engagement Stories';
  galleryFilter:
    | 'Traditional Rituals'
    | 'Bridal & Groom'
    | 'Couple Stories'
    | 'Candid & Family'
    | 'Details & Celebrations'
    | 'Monochrome';
  src: string;
  alt: string;
  aspect: 'portrait' | 'landscape' | 'tall';
  caption: string;
  isFeaturedStory?: boolean;
}

export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  eventOption: string;
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export interface InstagramPreviewItem {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export const siteConfig = {
  brand: {
    name: 'SRINIVASA PHOTOGRAPHY',
    shortName: 'Srinivasa Photography',
    logoPath: '/assets/logo.jpg',
    tagline: 'Every Frame. A Forever Story.',
    closingStatement: 'Every moment. A story worth remembering.',
    shortDescription:
      'Preserving emotions, celebrating love, and turning life’s most cherished celebrations into timeless visual heirlooms.',
    portfolioDisclaimer:
      'Demonstration curation shown during website preview; official studio portfolio frames will be updated by Srinivasa Photography.',
  },
  trial: {
    // Fixed deadline: December 3, 2026 at 07:17 AM IST (+05:30)
    deadlineIso: '2026-12-03T07:17:00+05:30',
    announcementLabel: 'WEBSITE PREVIEW • FREE TRIAL ENDS IN',
    expiredTitle: 'FREE TRIAL ENDED',
    expiredSubtitle: 'This website preview period has come to an end.',
    expiredInstruction: 'Contact us to reactivate the experience.',
    storageKey: 'srinivasa_photography_trial_state_v1',
  },
  social: {
    instagramHandle: '@srinivasaaphotography',
    instagramUrl: 'https://www.instagram.com/srinivasaaphotography/',
  },
  contact: {
    // Replace these configurable placeholders with verified studio details before final launch
    isConfigured: false,
    email: '', // e.g., 'hello@srinivasaphotography.com'
    emailDisplay: 'To be configured — Studio Email',
    phone: '', // e.g., '+91 XXXXX XXXXX'
    phoneDisplay: 'To be configured — Studio Phone',
    whatsappNumber: '', // International digits without +, e.g., '91XXXXXXXXXX'
    whatsappDisplay: 'Configurable WhatsApp Enquiry',
    locationDisplay: 'Configurable Studio Location — India',
    eventTypes: [
      'Wedding Photography',
      'Wedding Films',
      'Pre-Wedding Photography',
      'Candid Photography',
      'Engagement Photography',
      'Event Photography',
      'Couple Portraits',
      'Traditional Photography',
    ],
  },
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Stories', href: '#stories' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    image: '/assets/photos/hero-wedding.jpg',
    imageAlt:
      'South Indian bride and groom sharing a quiet smiling glance during a golden-hour floral mandapam wedding ceremony',
    label: 'SRINIVASA PHOTOGRAPHY',
    headlineLine1: 'Every Frame.',
    headlineLine2: 'A Forever Story.',
    supportingText:
      "Preserving emotions, celebrating love, and turning life's most beautiful moments into timeless memories.",
    primaryCta: 'EXPLORE OUR STORIES',
    secondaryCta: 'BOOK YOUR DATE',
  },
  introduction: {
    label: 'OUR PHILOSOPHY',
    headline: 'Some moments deserve to live forever.',
    description:
      'Beyond photographs, we believe in preserving emotions, stories and the beautiful details that make every celebration unique.',
    secondaryNote:
      'Every celebration carries its own quiet rhythm — the warmth of family blessings, unspoken glances, and heirloom traditions woven into a single day. Our approach honors both grandeur and intimacy without intrusion.',
    image: '/assets/photos/intro-ritual.jpg',
    imageAlt:
      'Bride and groom exchanging fresh floral and jasmine garlands during a traditional Tamil wedding ritual',
  },
  cinematicFeature: {
    image: '/assets/photos/cinematic-motion.jpg',
    imageAlt:
      'Indian bride and groom walking hand-in-hand through a heritage courtyard illuminated by brass oil lamps at dusk',
    headlineLine1: 'Not just photographs.',
    headlineLine2: 'Memories in motion.',
    supportingText:
      'Every glance, every celebration, every emotion — thoughtfully captured and beautifully preserved.',
    ctaLabel: 'EXPLORE OUR WORK',
  },
  featuredStories: [
    {
      id: 'story-wedding',
      title: 'Sacred Vows in Golden Light',
      category: 'Wedding Stories',
      galleryFilter: 'Traditional Rituals',
      src: '/assets/photos/tamil-ritual.jpg',
      alt: 'Traditional Tamil Hindu wedding ceremony around the sacred Vedic Agni fire',
      aspect: 'landscape',
      caption: 'Vedic rituals bathed in warm ceremonial firelight',
      isFeaturedStory: true,
    },
    {
      id: 'story-prewedding',
      title: 'Stillness at Dusk',
      category: 'Pre-Wedding',
      galleryFilter: 'Couple Stories',
      src: '/assets/photos/prewedding-outdoor.jpg',
      alt: 'Couple walking along quiet coastal rocks and backwaters during twilight pre-wedding shoot',
      aspect: 'portrait',
      caption: 'Quiet coastal horizons and unhurried companionship',
      isFeaturedStory: true,
    },
    {
      id: 'story-portraits',
      title: 'Heirloom Grace',
      category: 'Couple Portraits',
      galleryFilter: 'Bridal & Groom',
      src: '/assets/photos/bridal-portrait.jpg',
      alt: 'Editorial South Indian bridal portrait in forest-green Kanjeevaram silk and antique temple jewellery',
      aspect: 'tall',
      caption: 'Classic portraiture rooted in heritage craft',
      isFeaturedStory: true,
    },
    {
      id: 'story-traditions',
      title: 'Threads of Heritage',
      category: 'Traditional Celebrations',
      galleryFilter: 'Details & Celebrations',
      src: '/assets/photos/jewellery-details.jpg',
      alt: 'Macro still-life of South Indian bridal temple gold jewellery, jasmine garlands, and lit brass lamp',
      aspect: 'portrait',
      caption: 'Kemp gold, jasmine, and Kanjeevaram zari details',
      isFeaturedStory: true,
    },
    {
      id: 'story-candid',
      title: 'Unguarded Morning Joy',
      category: 'Candid Moments',
      galleryFilter: 'Candid & Family',
      src: '/assets/photos/candid-laughter.jpg',
      alt: 'Indian bride laughing candidly with her family during morning wedding preparations',
      aspect: 'landscape',
      caption: 'Spontaneous laughter between quiet morning rituals',
      isFeaturedStory: true,
    },
    {
      id: 'story-engagement',
      title: 'The First Promise',
      category: 'Engagement Stories',
      galleryFilter: 'Couple Stories',
      src: '/assets/photos/engagement-story.jpg',
      alt: 'Indian couple exchanging rings inside a sunlit garden pavilion',
      aspect: 'portrait',
      caption: 'An intimate afternoon celebrating a new beginning',
      isFeaturedStory: true,
    },
  ] as GalleryItem[],
  galleryItems: [
    {
      id: 'gal-1',
      title: 'Under the Mandapam',
      category: 'Wedding Stories',
      galleryFilter: 'Traditional Rituals',
      src: '/assets/photos/hero-wedding.jpg',
      alt: 'South Indian bride and groom during golden-hour floral mandapam ceremony',
      aspect: 'landscape',
      caption: 'Golden light filtering through floral garlands',
    },
    {
      id: 'gal-2',
      title: 'Bridal Radiance',
      category: 'Couple Portraits',
      galleryFilter: 'Bridal & Groom',
      src: '/assets/photos/bridal-portrait.jpg',
      alt: 'Editorial South Indian bridal portrait with temple jewellery and jasmine',
      aspect: 'tall',
      caption: 'Soft window light on Kanjeevaram silk and temple gold',
    },
    {
      id: 'gal-3',
      title: 'Garland Exchange',
      category: 'Traditional Celebrations',
      galleryFilter: 'Traditional Rituals',
      src: '/assets/photos/intro-ritual.jpg',
      alt: 'Traditional Tamil wedding garland exchange moment',
      aspect: 'portrait',
      caption: 'Maalai Maatral framed in quiet elegance',
    },
    {
      id: 'gal-4',
      title: 'Poise in Ivory',
      category: 'Couple Portraits',
      galleryFilter: 'Bridal & Groom',
      src: '/assets/photos/groom-portrait.jpg',
      alt: 'South Indian groom editorial portrait beside carved teakwood pillars',
      aspect: 'portrait',
      caption: 'Tailored ivory silk amidst heritage timber',
    },
    {
      id: 'gal-5',
      title: 'In Silence, Forever',
      category: 'Couple Portraits',
      galleryFilter: 'Monochrome',
      src: '/assets/photos/monochrome-emotion.jpg',
      alt: 'Black and white fine-art wedding portrait of Indian bride and groom in quiet embrace',
      aspect: 'tall',
      caption: 'Timeless silver-toned monochrome emotion',
    },
    {
      id: 'gal-6',
      title: 'Blessings of Elders',
      category: 'Candid Moments',
      galleryFilter: 'Candid & Family',
      src: '/assets/photos/family-celebration.jpg',
      alt: 'Parents and family elders showering flower petals and blessings over the newlywed couple',
      aspect: 'landscape',
      caption: 'Generations united in warmth and celebration',
    },
    {
      id: 'gal-7',
      title: 'Temple Gold & Jasmine',
      category: 'Traditional Celebrations',
      galleryFilter: 'Details & Celebrations',
      src: '/assets/photos/jewellery-details.jpg',
      alt: 'South Indian bridal jewellery, silk zari, and brass lamp still life',
      aspect: 'portrait',
      caption: 'The tactile poetry of wedding heirlooms',
    },
    {
      id: 'gal-8',
      title: 'Horizon of Gold',
      category: 'Pre-Wedding',
      galleryFilter: 'Couple Stories',
      src: '/assets/photos/sunset-couple.jpg',
      alt: 'Indian couple on a stone heritage colonnade overlooking misty hills at sunset',
      aspect: 'landscape',
      caption: 'Golden hour silhouettes overlooking misty valleys',
    },
    {
      id: 'gal-9',
      title: 'Sacred Agni',
      category: 'Traditional Celebrations',
      galleryFilter: 'Traditional Rituals',
      src: '/assets/photos/tamil-ritual.jpg',
      alt: 'Tamil wedding ceremony around sacred Vedic fire',
      aspect: 'landscape',
      caption: 'Ancestral hymns and warm firelight',
    },
    {
      id: 'gal-10',
      title: 'Evening Grandeur',
      category: 'Wedding Stories',
      galleryFilter: 'Details & Celebrations',
      src: '/assets/photos/reception-evening.jpg',
      alt: 'Indian couple entering a candlelit reception hall beneath chandeliers and white orchids',
      aspect: 'landscape',
      caption: 'Candlelit celebration beneath crystal and orchids',
    },
    {
      id: 'gal-11',
      title: 'Morning Laughter',
      category: 'Candid Moments',
      galleryFilter: 'Candid & Family',
      src: '/assets/photos/candid-laughter.jpg',
      alt: 'Indian bride laughing joyfully with family during morning preparations',
      aspect: 'landscape',
      caption: 'Unscripted joy before the ceremony begins',
    },
    {
      id: 'gal-12',
      title: 'Coastal Twilight',
      category: 'Pre-Wedding',
      galleryFilter: 'Couple Stories',
      src: '/assets/photos/prewedding-outdoor.jpg',
      alt: 'Indian couple walking along misty coastal rocks at twilight',
      aspect: 'tall',
      caption: 'Serene pre-wedding frames at dusk',
    },
    {
      id: 'gal-13',
      title: 'Promise in the Pavilion',
      category: 'Engagement Stories',
      galleryFilter: 'Couple Stories',
      src: '/assets/photos/engagement-story.jpg',
      alt: 'Indian couple exchanging engagement rings in an outdoor sunlit pavilion',
      aspect: 'portrait',
      caption: 'Delicate promises in warm afternoon sun',
    },
    {
      id: 'gal-14',
      title: 'Courtyard Radiance',
      category: 'Wedding Stories',
      galleryFilter: 'Details & Celebrations',
      src: '/assets/photos/cinematic-motion.jpg',
      alt: 'Bride and groom walking through a heritage courtyard glowing with brass lamps',
      aspect: 'landscape',
      caption: 'Silk in motion amidst evening lamp glow',
    },
  ] as GalleryItem[],
  services: [
    {
      number: '01',
      id: 'wedding-photography',
      title: 'Wedding Photography',
      subtitle: 'Proposed Offering • Full Celebration Coverage',
      description:
        'Thoughtful, unobtrusive storytelling across every ceremony — balancing ceremonial rituals, family warmth, and timeless portraits.',
      image: '/assets/photos/hero-wedding.jpg',
      imageAlt: 'South Indian wedding couple during ceremony under golden light',
      eventOption: 'Wedding Photography',
    },
    {
      number: '02',
      id: 'wedding-films',
      title: 'Wedding Films',
      subtitle: 'Proposed Offering • Cinematic Motion',
      description:
        'Narrative-driven wedding films woven with natural soundscapes, ambient music, and emotional pacing crafted to age gracefully.',
      image: '/assets/photos/cinematic-motion.jpg',
      imageAlt: 'Indian wedding couple walking in golden courtyard light',
      eventOption: 'Wedding Films',
    },
    {
      number: '03',
      id: 'pre-wedding-photography',
      title: 'Pre-Wedding Photography',
      subtitle: 'Proposed Offering • Location Storytelling',
      description:
        'Unhurried outdoor and heritage-location sessions tailored around your natural chemistry, light, and personal aesthetic.',
      image: '/assets/photos/sunset-couple.jpg',
      imageAlt: 'Couple pre-wedding portrait on stone colonnade at sunset',
      eventOption: 'Pre-Wedding Photography',
    },
    {
      number: '04',
      id: 'candid-photography',
      title: 'Candid Photography',
      subtitle: 'Proposed Offering • Unscripted Emotion',
      description:
        'Fleeting glances, tears of joy, and spontaneous laughter captured authentically without interrupting the flow of your celebration.',
      image: '/assets/photos/candid-laughter.jpg',
      imageAlt: 'Bride laughing candidly with family during wedding morning',
      eventOption: 'Candid Photography',
    },
    {
      number: '05',
      id: 'engagement-photography',
      title: 'Engagement Photography',
      subtitle: 'Proposed Offering • Intimate Beginnings',
      description:
        'Refined coverage for ring ceremonies and intimate family gatherings, honoring the first formal chapter of your journey.',
      image: '/assets/photos/engagement-story.jpg',
      imageAlt: 'Couple exchanging rings during engagement ceremony',
      eventOption: 'Engagement Photography',
    },
    {
      number: '06',
      id: 'event-photography',
      title: 'Event Photography',
      subtitle: 'Proposed Offering • Receptions & Celebrations',
      description:
        'Polished editorial documentation of evening receptions, sangeet nights, and milestone gatherings with atmospheric lighting mastery.',
      image: '/assets/photos/reception-evening.jpg',
      imageAlt: 'Couple entering candlelit evening reception',
      eventOption: 'Event Photography',
    },
    {
      number: '07',
      id: 'couple-portraits',
      title: 'Couple Portraits',
      subtitle: 'Proposed Offering • Fine-Art Portraiture',
      description:
        'Art-directed couple and bridal portraits composed with classic elegance, sculptural light, and painterly tonal depth.',
      image: '/assets/photos/monochrome-emotion.jpg',
      imageAlt: 'Monochrome fine-art portrait of bride and groom',
      eventOption: 'Couple Portraits',
    },
    {
      number: '08',
      id: 'traditional-photography',
      title: 'Traditional Photography',
      subtitle: 'Proposed Offering • Cultural & Family Archives',
      description:
        'Respectful, comprehensive preservation of ancestral customs, sacred mantras, and treasured portraits with every loved one.',
      image: '/assets/photos/tamil-ritual.jpg',
      imageAlt: 'Traditional Tamil wedding ceremony around sacred Agni',
      eventOption: 'Traditional Photography',
    },
  ] as ServiceItem[],
  whyChooseUs: [
    {
      number: 'I',
      title: 'Attention to Detail',
      description:
        'From heirloom temple gold and handwoven silk zari to the quiet arrangement of ceremonial lamps, every nuanced element is observed with care.',
    },
    {
      number: 'II',
      title: 'Emotional Storytelling',
      description:
        'We look beyond poses to preserve genuine human connection — a parent’s quiet pride, an unguarded laugh, and the stillness between vows.',
    },
    {
      number: 'III',
      title: 'Artistic Photography',
      description:
        'Guided by natural light, deliberate composition, and cinema-inspired colour grading so each frame feels refined rather than fleeting.',
    },
    {
      number: 'IV',
      title: 'Thoughtful Presentation',
      description:
        'Every gallery is sequenced like a visual narrative, honoring the emotional arc of your celebration from the first ritual to the final farewell.',
    },
  ] as PillarItem[],
  instagramPreviews: [
    {
      id: 'ig-1',
      src: '/assets/photos/bridal-portrait.jpg',
      alt: 'Bridal portrait editorial preview',
      label: 'Bridal Editorial',
    },
    {
      id: 'ig-2',
      src: '/assets/photos/intro-ritual.jpg',
      alt: 'Traditional garland exchange preview',
      label: 'Sacred Rituals',
    },
    {
      id: 'ig-3',
      src: '/assets/photos/jewellery-details.jpg',
      alt: 'Heirloom wedding jewellery preview',
      label: 'Heirloom Details',
    },
    {
      id: 'ig-4',
      src: '/assets/photos/groom-portrait.jpg',
      alt: 'Groom portrait preview',
      label: 'Groom Portraiture',
    },
    {
      id: 'ig-5',
      src: '/assets/photos/family-celebration.jpg',
      alt: 'Family wedding blessing preview',
      label: 'Family Warmth',
    },
    {
      id: 'ig-6',
      src: '/assets/photos/prewedding-outdoor.jpg',
      alt: 'Outdoor pre-wedding twilight preview',
      label: 'Twilight Stories',
    },
  ] as InstagramPreviewItem[],
} as const;
