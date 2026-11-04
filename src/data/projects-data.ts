export interface ProjectData {
  slug: string;
  number: string;
  serviceCategory: string;
  surveyServiceName: string;
  tag: string;
  title: string;
  client: string;
  year: string;
  accentColor: string;
  layoutType: "five-card" | "two-card";
  summary: string;
  challenge: string;
  solution: string;
  metrics: string;
  videoUrl: string;
  assets: {
    heroWide: string;
    heroWideAlt: string;
    workflowRight?: string;
    workflowRightAlt?: string;
    monitorImage?: string;
    monitorTitle?: string;
    specModal?: {
      title: string;
      subtitle: string;
      buttonText: string;
      items: { label: string; value: string }[];
    };
    serverImage?: string;
    laptopImage?: string;
    towerImage?: string;
  };
  cameraOptics: string;
  postPipeline: string;
  aiEngine: string;
  guildCredits: string;
  deliverables: string[];
  techStack: string[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    slug: "chronos-led",
    number: "01",
    serviceCategory: "Movie & Video Making",
    surveyServiceName: "Movie & Video Making (Narrative & Documentary Cinema)",
    tag: "On-Location Cinema & Documentary",
    title: "Film Lab // Raw Athletic Cinema",
    client: "Film Lab & Clarkson Athletics",
    year: "2026",
    accentColor: "#18181b",
    layoutType: "five-card",
    summary:
      "An intimate on-location sports documentary captured between dusk training grounds and twilight urban courts, exploring raw athletic grit through kinetic handheld cinematography and 35mm monochrome texture.",
    challenge:
      "Directing a visceral athletic film that bypasses synthetic commercial polish. The directorate required unvarnished realism: capturing authentic exhaustion, dusk natural light, and the raw acoustic pulse of basketball courts and endurance hill sprints.",
    solution:
      "We shot on location with an ultra-compact ARRI cinema rig paired with vintage high-speed prime lenses. Working entirely with available evening light and practical street lamps, we graded the film with a custom high-contrast monochrome and bleach-bypass film stock profile with tactile grain.",
    metrics: "49s Theatrical Master • Zero Artificial Lighting • 100% Practical On-Location Capture",
    videoUrl: "/video/movie&video.mp4",
    assets: {
      heroWide: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=90",
      heroWideAlt: "Film Lab Raw Athletic Cinema production",
      workflowRight: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=90",
      workflowRightAlt: "High-speed prime lens cinema setup",
      monitorImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=90",
      monitorTitle: "Real-time on-location dailies and 35mm grain pass",
      specModal: {
        title: "Film Lab Production Specifications",
        subtitle: "Documentary Cinema Standard",
        buttonText: "Review Production",
        items: [
          { label: "Capture Format", value: "1080p 24fps DCI Master" },
          { label: "Optics Package", value: "Zeiss Super Speed T1.3" },
          { label: "Camera Rig", value: "ARRI ALEXA Mini LF Handheld" },
          { label: "Color Science", value: "Custom 35mm Monochromatic Print" },
        ],
      },
    },
    cameraOptics: "ARRI ALEXA Mini LF + Zeiss Super Speed T1.3 Primes (28mm, 50mm, 85mm)",
    postPipeline: "Custom 35mm Photochemical Emulation • Location Stereo & Binaural Sound Design",
    aiEngine: "Optical Flow Motion Stabilization & Real-Time Grain Synthesis",
    guildCredits: "Director: Film Lab Collective • Cinematographer: Marcus Clarkson • Sound Design: Julian Cross",
    deliverables: [
      "1080p & 4K DCI Theatrical Master (24fps 16:9)",
      "Original Location Sound Design & Athletic Audio Stems",
      "Custom 35mm Black & White Film Grain Profile",
      "Social & Broadcast Cutdowns (9:16 & 1:1 Deliverables)",
    ],
    techStack: ["ARRI ALEXA Mini LF", "Zeiss Super Speed T1.3", "DaVinci Resolve Studio", "Pro Tools HD", "35mm Grain Profile"],
  },
  {
    slug: "apex-telecine",
    number: "02",
    serviceCategory: "Video Editing & Processing",
    surveyServiceName: "Video Editing & Processing (8K Telecine)",
    tag: "Editorial & Film Finish",
    title: "Apex // 8K Neural Telecine & Editorial",
    client: "HBO Max & Warner Bros.",
    year: "2026",
    accentColor: "#1b1928",
    layoutType: "two-card",
    summary:
      "A high-velocity editorial cut balancing 80 hours of raw racing rushes into an unrelenting widescreen broadcast master with rich 35mm film tonality.",
    challenge:
      "Managing 24 concurrent camera angles across changing track weather conditions, harsh midday sun glare, and deep pit-lane shadows under an uncompromising broadcast deadline.",
    solution:
      "Our editorial team unified the multi-cam timeline in DaVinci Resolve Studio, isolating dialogue stems from track noise, reconstructing high-speed 120fps slow-motion moments, and grading in Dolby Vision HDR10+.",
    metrics: "4.8x Faster Delivery • 99.4% Dialogue Clarity • Dolby Vision Theatrical Master",
    videoUrl: "/video/real-reel.webm.webm",
    assets: {
      heroWide: "",
      heroWideAlt: "Apex 8K Color Suite & Master Console",
    },
    cameraOptics: "Sony Venice 2 + Angénieux Optimo 28-76mm & 15-40mm Cine Zooms",
    postPipeline: "DaVinci Resolve 19 Studio • ProRes 4444 XQ • Dolby Vision HDR10+",
    aiEngine: "Neural Dialogue Stem Isolation & 120fps Optical Flow Interpolation",
    guildCredits: "Supervising Editor: Sarah Jenkins • Senior Colorist: Damien Cruz",
    deliverables: [
      "4K HDR Dolby Vision Cinema & Broadcast Master",
      "Automated Multi-Track Dialogue Stem Cleanups",
      "120fps High-Speed Slow-Motion Cuts",
      "Archival 35mm Kodak Film Grain Print",
    ],
    techStack: ["DaVinci Resolve Studio", "ProRes 4444 XQ", "Dolby Vision", "ACES 2065-1", "Avid Media Composer"],
  },
  {
    slug: "maison-ombre",
    number: "03",
    serviceCategory: "Model & Fashion Photography",
    surveyServiceName: "Model & Fashion Photography (Digital Runways)",
    tag: "High Fashion Editorial",
    title: "Maison de L'Ombre // Digital Runway",
    client: "Maison Margiela & Milan Fashion Week",
    year: "2026",
    accentColor: "#2a1725",
    layoutType: "five-card",
    summary:
      "A virtual haute couture collection conceived for Milan Fashion Week, pairing digital double casting with photorealistic silk cloth physics.",
    challenge:
      "Producing an international seasonal lookbook under tight scheduling constraints, where physical couture sample fabrication and worldwide model travel would have delayed the seasonal premiere.",
    solution:
      "We scanned original textile swatches at microscopic fiber resolution, simulated natural cloth drape and movement in Marvelous Designer, and rendered 14 bespoke virtual looks with Hasselblad medium-format virtual lighting.",
    metrics: "14 Runway Looks in 72 Hours • Zero-Waste Prototyping • Vogue Print Spread",
    videoUrl: "https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4",
    assets: {
      heroWide: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90",
      heroWideAlt: "Maison de L'Ombre Virtual Runway Look",
      workflowRight: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90",
      workflowRightAlt: "Haute Couture Editorial Lookbook Layout",
      monitorImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=90",
      monitorTitle: "Iridescent silk fabric physics simulation",
      specModal: {
        title: "Couture Digital Double Plan",
        subtitle: "Milan Fashion Week Digital Suite",
        buttonText: "Review Casting",
        items: [
          { label: "Collection Scope", value: "14 Virtual Looks" },
          { label: "Cloth Physics", value: "32-bit Floating-Point Float" },
          { label: "Color Space", value: "ISO Coated v2 CMYK & RGB" },
          { label: "Resolution", value: "100MP Hasselblad Native" },
        ],
      },
      serverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90",
    },
    cameraOptics: "Simulated Hasselblad H6D-100c + HC 100mm f/2.2 Studio Flash",
    postPipeline: "32-bit Floating-Point Lookbook Masters • CMYK Pre-Press Proofs",
    aiEngine: "Custom Brand LoRA Model Checkpoints & Marvelous Designer Cloth Dynamics",
    guildCredits: "Creative Director: Sylvie Laurent • Lead Stylist: Kenzo Tanaka • 3D Artist: Aris Thorne",
    deliverables: [
      "14 Ultra-High-Resolution 100MP Print Stills",
      "Interactive 360° Digital Runway Video Loops",
      "300 DPI CMYK Vogue Editorial Layouts",
      "Custom Brand Model Checkpoints",
    ],
    techStack: ["Hasselblad 100MP", "Marvelous Designer", "CLO3D", "Octane Render", "Photoshop"],
  },
  {
    slug: "aetheria-latent",
    number: "04",
    serviceCategory: "AI Image Generation & Processing",
    surveyServiceName: "AI Image Generation & Processing (Key Art)",
    tag: "Creative Direction & Key Art",
    title: "Aetheria // Enterprise Key Art Suite",
    client: "LVMH & Parfums Christian Dior",
    year: "2026",
    accentColor: "#2b2513",
    layoutType: "two-card",
    summary:
      "A global key-art campaign capturing physical perfume bottle refractions, liquid caustics, and delicate atomization across 200 regional advertising variations.",
    challenge:
      "A luxury fragrance house requiring bespoke billboard creative adapted to local cultural palettes, lighting conditions, and aspect ratios from Tokyo to Paris without multi-million dollar reshoots.",
    solution:
      "We trained private brand models on physical glass geometry and fluid dynamics, generating 16K print-ready key art with absolute Pantone spot-color fidelity and guaranteed commercial copyright protection.",
    metrics: "16K Gigapixel Print Ready • 85% Turnaround Reduction • 100% Commercial Indemnity",
    videoUrl: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    assets: {
      heroWide: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=90",
      heroWideAlt: "Aetheria Luxury Perfume Glass Caustics Key Art",
      laptopImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=90",
      towerImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=90",
    },
    cameraOptics: "Phase One IQ4 150MP Trichromatic Rig • Schneider Kreuznach 80mm Blue Ring",
    postPipeline: "16-bit Uncompressed TIFF Masters • Pantone Spot Color Vector Separations",
    aiEngine: "Private Brand Model Weights with Physical Caustics Guidance",
    guildCredits: "Art Director: Julian Thorne • Prompt Architect: Maya Lin • Retoucher: Chloe Vance",
    deliverables: [
      "200 Regional Omnichannel Key Visual Masters",
      "16K Print-Ready Billboard Layered Files",
      "Private Enterprise Brand Checkpoint Weights",
      "Full Commercial Copyright Indemnity Dossier",
    ],
    techStack: ["Phase One 150MP", "ComfyUI", "Topaz Gigapixel", "Photoshop", "Illustrator"],
  },
  {
    slug: "horizon-guild",
    number: "05",
    serviceCategory: "Professional Photographers, Videographers & Artists",
    surveyServiceName: "Professional Photographers, Videographers & Artists (Guild)",
    tag: "Worldwide Camera Units",
    title: "Horizon Guild // Global Camera Directorate",
    client: "National Geographic & Red Bull",
    year: "2026",
    accentColor: "#0f2038",
    layoutType: "five-card",
    summary:
      "Coordinated deployment of Cannes-winning cinematographers and extreme-environment camera operators across 6 continents with live cloud proxy review.",
    challenge:
      "Capturing extreme mountain and ocean documentary sequences in remote corners of Patagonia, Iceland, and the Alps without weeks of shipping physical hard drives back to central edit suites.",
    solution:
      "We dispatched four veteran camera packages equipped with Sony Venice 2 cameras and bonded 5G transmitters, streaming 1080p proxy footage directly into the London edit suite within seconds of camera cut.",
    metrics: "28 Global Hubs • 48-Hour Rapid Dispatch • 15-Second Cloud Proxy Stream",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    assets: {
      heroWide: "",
      heroWideAlt: "Horizon Guild Camera Operators in Extreme Alpine Environment",
    },
    cameraOptics: "Sony Venice 2 + Sony FX9 + Angénieux Optimo 28-76mm & 15-40mm Cine Zooms",
    postPipeline: "Camera-to-Cloud Live Proxy Stream • S-Gamut3.Cine / S-Log3",
    aiEngine: "Real-time AI Frame Metadata Tagging & Speech Transcription",
    guildCredits: "Head of Guild: Captain Eric Moreau • Aerial FPV Lead: Sven Lindqvist • Sound: Sarah O'Connor",
    deliverables: [
      "Turnkey Production Units Deployed in 48h Worldwide",
      "Camera-to-Cloud Real-Time Rushes Stream",
      "Calibrated Dual-Operator Cinema Packages",
      "Full ATA Carnet Customs & SAG Guild Coverage",
    ],
    techStack: ["Sony Venice 2", "Sony FX9", "Angénieux Optimo", "Frame.io C2C", "Teradek Bolt 4K"],
  },
];
