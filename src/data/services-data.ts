export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface ServiceShowcasePlate {
  kicker: string;
  title: string;
  description: string;
  deliverables: string[];
  tags: string[];
  plateType: "video" | "cv-vision" | "dashboard" | "audio-spatial" | "telemetry";
  mediaUrl?: string;
  mediaAlt: string;
  stats?: { label: string; value: string }[];
}

export interface ServiceDetailItem {
  id: string;
  slug: string;
  aliases?: string[];
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  headline: string;
  heroImage: string;
  heroImageAlt: string;
  summary: string;
  challenge: string;
  solution: string;
  showcasePlates: ServiceShowcasePlate[];
  workflow: {
    phase: string;
    title: string;
    desc: string;
  }[];
  specs: ServiceSpec[];
  deliverables: ServiceDeliverable[];
  caseStudy: {
    slug: string;
    title: string;
    client: string;
    metrics: string;
    image: string;
    videoUrl?: string;
  };
  metrics: {
    kpi1: { value: string; label: string };
    kpi2: { value: string; label: string };
    kpi3: { value: string; label: string };
    kpi4: { value: string; label: string };
    kpi5: { value: string; label: string };
  };
  pricingTier: string;
  typicalTimeline: string;
  nextSlug: string;
  nextTitle: string;
}

export const SERVICES_CATALOG_DETAILED: ServiceDetailItem[] = [
  {
    id: "serv-1",
    slug: "movie-video-making",
    number: "01",
    tag: "Cinema Direction & Virtual Production",
    title: "Movie & Video Making",
    subtitle: "ARRI ALEXA 35, Unreal Engine 5.5 ICVFX & Anamorphic Handheld Cinema",
    headline: "Visceral on-location narrative direction, virtual LED volume ICVFX, and 35mm photochemical texture.",
    heroImage: "/video/movie&video.mp4",
    heroImageAlt: "Film Lab Raw Athletic Cinema production",
    summary:
      "From high-impact commercial cinema to virtual studio feature productions, our film unit unites physical optical glass with real-time digital volume stages. We combine ARRI ALEXA 35 Super 35 capture with Unreal Engine 5.5 in-camera visual effects (ICVFX), delivering photorealistic parallax and genuine atmospheric lighting in-camera.",
    challenge:
      "Modern cinematic productions face exorbitant on-location travel costs, unpredictable weather windows, and post-production green screen green-spill artifacts that deaden actors' natural skin tones and lighting continuity.",
    solution:
      "We orchestrate real-time ICVFX LED volumes powered by Unreal Engine 5.5 and multi-GPU nDisplay clusters. ARRI Hi-5 lens encoders feed live focal telemetry into the engine, matching real camera parallax with virtual environments at 24fps with zero latency.",
    showcasePlates: [
      {
        kicker: "01 // PRINCIPAL CINEMATOGRAPHY",
        title: "High-Speed Kinetic Motion & Dusk Twilight Capture",
        description: "Capturing authentic athletic movement and human emotion using lightweight ARRI cinema systems, vintage high-speed prime optics, and organic 35mm film stock photochemical emulation.",
        deliverables: [
          "ARRI ALEXA 35 LogC4 REVEAL Color Science pipeline",
          "Zeiss Super Speed T1.3 high-speed prime packages",
          "Real-world atmospheric twilight & binaural location sound",
          "Custom 35mm monochrome & high-contrast film grain curves",
        ],
        tags: ["Cinema", "35mm Photochemical", "DCI 4K"],
        plateType: "video",
        mediaUrl: "/video/movie&video.mp4",
        mediaAlt: "Kinetic Cinema Principal Photography Reel",
        stats: [
          { label: "Color Gamut", value: "LogC4 Wide" },
          { label: "Capture Standard", value: "4K DCI 24p" },
        ],
      },
      {
        kicker: "02 // VIRTUAL PRODUCTION VOLUME",
        title: "Unreal Engine 5.5 nDisplay In-Camera VFX (ICVFX)",
        description: "Curved LED stage environments rendered in real time. Nanite virtualized geometry and Lumen real-time global illumination project natural light bounces directly onto the actors' skin and physical sets.",
        deliverables: [
          "Unreal Engine 5.5 nDisplay multi-GPU cluster deployment",
          "PTP / Tri-Level genlock camera shutter synchronization",
          "Color Correction Windows (CCWs) for live on-set wall balancing",
          "Sub-millimeter camera optical tracking via FreeD protocols",
        ],
        tags: ["Unreal Engine 5.5", "ICVFX", "nDisplay"],
        plateType: "cv-vision",
        mediaAlt: "Unreal Engine 5.5 Virtual Production LED Stage Telemetry",
        stats: [
          { label: "Latent Sync", value: "<1 Frame" },
          { label: "Resolution", value: "16K LED Frustum" },
        ],
      },
    ],
    workflow: [
      {
        phase: "Phase 01",
        title: "Virtual Art Department (VAD) & Worldbuilding",
        desc: "High-fidelity environment photogrammetry and real-time optimization in Unreal Engine 5.5 for high-frame-rate LED volume playback.",
      },
      {
        phase: "Phase 02",
        title: "ARRI ALEXA 35 & LogC4 OCIO Calibration",
        desc: "Color profiling using OpenColorIO to ensure LED wall spectral output precisely matches ARRI REVEAL Color Science sensors.",
      },
      {
        phase: "Phase 03",
        title: "Principal Photography & Genlock Execution",
        desc: "Shooting on stage with real-time camera tracking and live gaffer DMX lighting integration with virtual light cards.",
      },
      {
        phase: "Phase 04",
        title: "DCI Theatrical & 4K Master Finishing",
        desc: "Scene-by-scene photochemical grading, Dolby Vision HDR mastering, and uncompressed ProRes 4444 XQ delivery.",
      },
    ],
    specs: [
      { label: "Camera Package", value: "ARRI ALEXA 35 / ALEXA Mini LF" },
      { label: "Optics Standard", value: "Zeiss Super Speed T1.3 / Cooke Anamorphic" },
      { label: "Virtual Engine", value: "Unreal Engine 5.5 nDisplay Multi-GPU" },
      { label: "Color Pipeline", value: "ARRI LogC4 / ACES 2065-1 OCIO" },
      { label: "Sync Protocol", value: "Precision PTP Master Genlock Clock" },
      { label: "Theatrical Output", value: "4K DCI 24fps / ProRes 4444 XQ" },
    ],
    deliverables: [
      {
        title: "4K DCI & 1080p Theatrical Master (24fps 16:9)",
        description: "Finished high-definition theatrical and broadcast delivery in uncompressed ProRes 4444 XQ master formats.",
      },
      {
        title: "Live nDisplay Unreal 5.5 Frustum Capture Archives",
        description: "Complete raw take recordings with synchronized 3D camera tracking metadata for seamless VFX handoffs.",
      },
      {
        title: "On-Location Sound & Binaural Field Stems",
        description: "Visceral binaural audio recordings capturing natural acoustics, impact dynamics, and spatial presence.",
      },
      {
        title: "Custom 35mm Photochemical Film Grain Profile",
        description: "Tactile film emulation with organic halation and authentic optical gate weave calibrated for 4K theatrical release.",
      },
    ],
    caseStudy: {
      slug: "chronos-led",
      title: "Film Lab // Raw Athletic Cinema",
      client: "Clarkson Athletics & Global Cinema",
      metrics: "On-location dusk capture • 49s theatrical master • 100% practical film aesthetic",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=90",
      videoUrl: "/video/movie&video.mp4",
    },
    metrics: {
      kpi1: { value: "+5x", label: "Speed to Screen" },
      kpi2: { value: "24M", label: "Global Impressions" },
      kpi3: { value: "99%", label: "In-Camera Final Pixels" },
      kpi4: { value: "110M", label: "Theatrical Views" },
      kpi5: { value: "42%", label: "Budget Efficiency" },
    },
    pricingTier: "$35,000 – $150,000+",
    typicalTimeline: "2 – 6 Weeks",
    nextSlug: "video-editing-processing",
    nextTitle: "Video Editing & Processing",
  },
  {
    id: "serv-2",
    slug: "video-editing-processing",
    number: "02",
    tag: "Post-Production & Finishing",
    title: "Video Editing & Processing",
    subtitle: "DaVinci Resolve 19 Neural Telecine, 120fps Optical Flow & ACES Grading",
    headline: "Precision montage editing, neural telecine rotoscoping, and master Dolby Vision HDR grading.",
    heroImage: "/video/real-reel.webm.webm",
    heroImageAlt: "Apex Neural Post-Production & Video Editing Suite",
    summary:
      "From narrative feature cuts to 60-second broadcast spots, our edit suites marry classic rhythmic montage with modern neural optical flow. We harness proprietary DaVinci Resolve 19 neural engines for instant semantic rotoscoping, clean-plate reconstruction, and zero-loss dynamic range expansion.",
    challenge:
      "Multi-camera rushes and concert documentaries often suffer from ambient acoustic noise, missed focus pulls, and jittery camera pans that traditional manual post-production cannot reconcile within compressed broadcast deadlines.",
    solution:
      "We engineered an automated AI telecine and neural audio workflow on DaVinci Resolve Studio and PyTorch models. The pipeline isolates dialogue stems with 99.4% perceptual transparency, reconstructs 120fps slow-motion frames via optical flow tensors, and applies custom 35mm film grain emulations.",
    showcasePlates: [
      {
        kicker: "01 // NEURAL TELECINE & MONTAGE",
        title: "Semantic Object Rotoscoping & Optical Flow Synthesis",
        description: "Deploying DaVinci Resolve 19 Studio Neural Engine to generate automatic depth maps, remove unwanted production rigs, and synthesize high-frame-rate 120fps slow motion with zero artifact tearing.",
        deliverables: [
          "DaVinci Resolve 19 Studio multi-GPU telecine suite",
          "120fps AI optical flow tensor frame synthesis",
          "Automated neural depth-map generation & relighting",
          "Clean-plate object and wire removal in high-res ACES",
        ],
        tags: ["DaVinci Resolve 19", "Optical Flow", "Telecine"],
        plateType: "video",
        mediaUrl: "/video/real-reel.webm.webm",
        mediaAlt: "Apex Neural Editorial & Telecine Suite Video",
        stats: [
          { label: "Interpolation", value: "120fps AI" },
          { label: "Speech Clarity", value: "99.4%" },
        ],
      },
      {
        kicker: "02 // COLOR MASTERING",
        title: "Dolby Vision HDR10+ & ACES 2065-1 Master Conforming",
        description: "Scene-by-scene color grading calibrated on Sony 4K HDR reference monitors. Ensures precise luminance roll-off and black shadow integrity across theatrical projection, consumer OLEDs, and mobile screens.",
        deliverables: [
          "ACES 2065-1 color space with DCI-P3 D65 white point",
          "Dolby Vision dynamic metadata XML mastering",
          "EBU R128 and Netflix quality control certifications",
          "Custom film stock halation and gate-weave emulation",
        ],
        tags: ["Dolby Vision", "ACES 2065-1", "HDR10+"],
        plateType: "dashboard",
        mediaAlt: "DaVinci Resolve Studio Color Grading Telemetry",
        stats: [
          { label: "Dynamic Range", value: "1,000 Nits" },
          { label: "Compliance", value: "Netflix 4K" },
        ],
      },
    ],
    workflow: [
      {
        phase: "Phase 01",
        title: "Ingestion, Checksum QC & Proxy Pipeline",
        desc: "Triple-redundant offload, checksum verification, and automated 1080p ProRes editorial proxy creation with Frame.io cloud telemetry.",
      },
      {
        phase: "Phase 02",
        title: "Collaborative Assembly & Director Cut",
        desc: "Rhythmic pacing and montage editorial in DaVinci Resolve Studio and Premiere Pro with instant director review cycles.",
      },
      {
        phase: "Phase 03",
        title: "Neural Audio & Optical Flow Interpolation",
        desc: "Dialogue isolation, room-tone harmonic synthesis, and 120fps vector optical-flow frame generation.",
      },
      {
        phase: "Phase 04",
        title: "Dolby Vision HDR10+ Theatrical Grade",
        desc: "Scene-by-scene master grading in ACES 2065-1 conforming to commercial theatrical and global streaming specifications.",
      },
    ],
    specs: [
      { label: "Grading Suite", value: "DaVinci Resolve 19 Studio Dual RTX" },
      { label: "Color Gamut", value: "ACES 2065-1 / DCI-P3 D65" },
      { label: "Speech Purity", value: "99.4% Perceptual Transparency" },
      { label: "Slow-Motion", value: "120fps AI Optical Flow Synthesis" },
      { label: "HDR Standards", value: "Dolby Vision HDR10+ Dynamic" },
      { label: "Turnaround SLA", value: "4.8x Accelerated Post Cycle" },
    ],
    deliverables: [
      {
        title: "Full Timeline Assembly in DaVinci Studio & Premiere",
        description: "Master project archives with clean track structure, XML interchange, and uncompressed ProRes 4444 XQ rushes.",
      },
      {
        title: "Dolby Vision HDR10+ Dynamic Metadata Masters",
        description: "Scene-by-scene color grading optimized across theatrical OLED, consumer HDR, and SDR screens.",
      },
      {
        title: "Neural Audio Stem Cleaning & Voice Resynthesis",
        description: "Dialogue tracks scrubbed of ambient artifacting, accompanied by automated multi-language localization.",
      },
      {
        title: "VFX Clean Plates & Wire Removal Rushes",
        description: "AI-reconstructed background plates with matched natural 35mm film grain structure.",
      },
    ],
    caseStudy: {
      slug: "apex-telecine",
      title: "Apex Neural Telecine & Optical Flow",
      client: "Warner Bros. Discovery & HBO",
      metrics: "4.8x faster post turnarounds • 99.4% speech isolation • 120fps optical flow",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=90",
    },
    metrics: {
      kpi1: { value: "+4.8x", label: "Post Velocity" },
      kpi2: { value: "32M", label: "Streamed Hours" },
      kpi3: { value: "99.4%", label: "Dialogue Clarity" },
      kpi4: { value: "85M", label: "Global Reach" },
      kpi5: { value: "35%", label: "Post Cost Reduction" },
    },
    pricingTier: "$15,000 – $60,000+",
    typicalTimeline: "1 – 3 Weeks",
    nextSlug: "model-fashion-photography",
    nextTitle: "Model & Fashion Photography",
  },
  {
    id: "serv-3",
    slug: "model-fashion-photography",
    aliases: ["sound-fx-mixing"],
    number: "03",
    tag: "Haute Couture & Runway Direction",
    title: "Model & Fashion Photography",
    subtitle: "Hasselblad H6D-100c Medium Format, 32-Bit HDR Lighting & Digital Double Casting",
    headline: "High-fashion lookbooks, Metahuman digital double casting, and hyper-textured 100MP medium-format editorial photography.",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90",
    heroImageAlt: "Haute Couture Editorial Model & Fashion Photography",
    summary:
      "Bridging physical runway haute couture with real-time digital double technology. We pair Hasselblad 100MP medium-format sensors with Profoto optical shaping and CLO 3D cloth physics, delivering hyper-textured editorial campaigns for Milan, Paris, and New York Fashion Weeks.",
    challenge:
      "High-fashion houses struggle with extreme talent scheduling constraints, prohibitive international location permits, and the impossibility of capturing complex iridescent garment textures across fast-turnaround print and digital lookbooks.",
    solution:
      "We deploy a hybrid physical-and-virtual editorial pipeline. Microscopic photogrammetry captures model likenesses and fabric drape at thread density, while strobe arrays calibrated with Broncolor Para reflectors guarantee faithful Pantone and textile tone accuracy across both print and digital lookbooks.",
    showcasePlates: [
      {
        kicker: "01 // EDITORIAL MEDIUM FORMAT",
        title: "100-Megapixel Hasselblad Sensor & Tactile Textile Density",
        description: "Capturing extreme dynamic range and microscopic fabric thread weave using Hasselblad 100c medium format sensors and Broncolor Para parabolic reflectors. Every sequin, silk reflection, and micro-crease is rendered in 16-bit color depth.",
        deliverables: [
          "100MP 16-bit 3FR raw master captures",
          "Broncolor Para 220 FB continuous & strobe lighting",
          "Pantone spot-matched color profiles for textile accuracy",
          "16K uncompressed editorial print retouching passes",
        ],
        tags: ["Hasselblad 100MP", "Haute Couture", "Broncolor"],
        plateType: "video",
        mediaUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90",
        mediaAlt: "Haute Couture Model Editorial Runway Shoot",
        stats: [
          { label: "Sensor Resolution", value: "11,600 x 8,700 px" },
          { label: "Color Depth", value: "16-Bit RAW" },
        ],
      },
      {
        kicker: "02 // DIGITAL DOUBLE & CLOTH SIMULATION",
        title: "Real-Time CLO 3D Cloth Physics & Metahuman Runway Avatars",
        description: "Rigging digital doubles with millimeter-accurate kinematic drape, simulating silk, velvet, and metallic lamé under dynamic studio strobe and wind conditions with zero uncanny distortion.",
        deliverables: [
          "Photogrammetry 3D model likeness scans (Metahuman compatible)",
          "CLO 3D / Marvelous Designer dynamic cloth physics rigs",
          "Real-time virtual runway walk sequences at 60fps",
          "Multi-angle lookbook generation with zero model fatigue",
        ],
        tags: ["CLO 3D", "Digital Double", "Metahuman"],
        plateType: "cv-vision",
        mediaAlt: "CLO 3D Cloth Mesh Simulation & Metahuman Bounding Boxes",
        stats: [
          { label: "Mesh Density", value: "2.4M Polys" },
          { label: "Drape Accuracy", value: "Sub-Millimeter" },
        ],
      },
    ],
    workflow: [
      {
        phase: "Phase 01",
        title: "Casting, Lookbook Direction & Moodboard Curations",
        desc: "Haute couture styling curation, moodboard alignment, and optical lighting blueprint design tailored to brand identity.",
      },
      {
        phase: "Phase 02",
        title: "Medium Format Studio Session & Textile Telemetry",
        desc: "Physical shooting on Hasselblad 100MP with tethered Phase One Capture One Pro live client review and Pantone calibration.",
      },
      {
        phase: "Phase 03",
        title: "CLO 3D Cloth Physics & Digital Double Compositing",
        desc: "Simulating dynamic garment drape and hybrid digital double extensions for virtual runway and social lookbooks.",
      },
      {
        phase: "Phase 04",
        title: "Vogue-Standard High-End Retouching & Pre-Press",
        desc: "16-bit non-destructive frequency separation, ISO Coated v2 CMYK prep, and master lookbook packaging.",
      },
    ],
    specs: [
      { label: "Camera Sensor", value: "Hasselblad H6D-100c / Phase One IQ4 150MP" },
      { label: "Lighting Standard", value: "Broncolor Para 220 / Profoto Pro-11 2400 Air" },
      { label: "Virtual Cloth Engine", value: "CLO 3D Enterprise / Marvelous Designer" },
      { label: "Color Profiling", value: "Capture One Pro 16-bit / Pantone X-Rite Pro" },
      { label: "Output Resolution", value: "100MP RAW / 16K Master Print Files" },
      { label: "Editorial SLA", value: "48h Global Lookbook Turnaround" },
    ],
    deliverables: [
      {
        title: "100MP Master Editorial Lookbook Deliverables (Print & Digital)",
        description: "High-definition publication-ready master stills in both uncompressed TIFF and web-optimized sRGB formats.",
      },
      {
        title: "Real-Time Digital Double Runway Metahuman Assets",
        description: "Fully rigged 3D avatar assets capable of infinite digital re-shoots across virtual fashion shows and metaverse spaces.",
      },
      {
        title: "16-Bit Master Retouched Campaign Stills (Layered PSD)",
        description: "Non-destructive Photoshop files with isolated skin frequency separation, dodge/burn passes, and garment reflection keys.",
      },
      {
        title: "Social-First 9:16 Kinetic Fashion Video Snippets",
        description: "Synchronized slow-motion 120fps motion vignettes designed for Instagram Reels, TikTok Fashion, and digital billboards.",
      },
    ],
    caseStudy: {
      slug: "haute-runway",
      title: "Maison V // Digital Double Haute Runway",
      client: "Maison Valmont & Paris Fashion Week",
      metrics: "100MP Medium Format • 42 Lookbook Stills • 100% Textile Color Accuracy",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90",
    },
    metrics: {
      kpi1: { value: "100MP", label: "Medium Format Resolution" },
      kpi2: { value: "48h", label: "Lookbook Turnaround" },
      kpi3: { value: "99.8%", label: "Textile Color Match" },
      kpi4: { value: "3.2M", label: "Editorial Reach" },
      kpi5: { value: "55%", label: "Studio Cost Efficiency" },
    },
    pricingTier: "$20,000 – $80,000+",
    typicalTimeline: "1 – 3 Weeks",
    nextSlug: "ai-image-generation",
    nextTitle: "AI Image Generation & Processing",
  },
  {
    id: "serv-4",
    slug: "ai-image-generation",
    number: "04",
    tag: "Generative Synthesis & Art Direction",
    title: "AI Image Generation & Processing",
    subtitle: "Enterprise FLUX.1 Pro Checkpoints, ControlNet Guidance & 16K CMYK Print Masters",
    headline: "Enterprise latent space synthesis for key visuals, commercial advertising, and gigapixel packaging.",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=90",
    heroImageAlt: "Aetheria Enterprise FLUX.1 Latent Synthesis Canvas",
    summary:
      "We build private, custom-trained generative checkpoints fine-tuned on bespoke brand intellectual property. By combining multi-pass latent synthesis via ComfyUI with ControlNet depth and normal map guidance, our pipeline delivers repeatable character fidelity, photorealistic glass caustics, and gigapixel resolution without uncanny distortion.",
    challenge:
      "Global luxury brands require hundreds of high-resolution regional ad variations matching local aesthetics, seasonal lighting, and extreme print resolutions (from giant Tokyo billboards to packaging boxes), incurring prohibitive physical studio costs.",
    solution:
      "We trained private low-rank adaptation (LoRA) weights on top of enterprise FLUX.1 Pro architectures. Coupled with physical caustics raytracing and Topaz Gigapixel AI upscaling, our team produces 16K print-ready assets with guaranteed Pantone spot-color integrity and zero commercial copyright ambiguity.",
    showcasePlates: [
      {
        kicker: "01 // LATENT DIFFUSION",
        title: "ControlNet Depth Guidance & Character Continuity",
        description: "Controlling latent generation with sub-pixel precision using OpenPose skeletal wireframes, depth maps, and segmentation passes. Ensures model likeness, garment folds, and product geometries stay consistent across hundreds of shots.",
        deliverables: [
          "Enterprise FLUX.1 Pro checkpoint fine-tuning",
          "ControlNet Depth, Normal, and OpenPose composition locks",
          "Private LoRA weights trained under strict NDA isolation",
          "Deterministic seed telemetry eliminating random model drift",
        ],
        tags: ["FLUX.1 Pro", "ControlNet", "ComfyUI"],
        plateType: "cv-vision",
        mediaAlt: "Computer Vision Bounding Boxes & Semantic Inpainting Segmentation",
        stats: [
          { label: "Drift Margin", value: "<0.2% Variance" },
          { label: "Inference Speed", value: "4.2s per 4K Pass" },
        ],
      },
      {
        kicker: "02 // PRE-PRESS MASTERING",
        title: "16K Gigapixel CMYK & Pantone Spot-Color Separation",
        description: "Scaling synthetic imagery up to 16,384 x 16,384 pixels for luxury billboard campaigns, packaging cartons, and point-of-sale displays with matched ISO Coated v2 CMYK color profiles.",
        deliverables: [
          "Topaz Gigapixel AI multi-pass optical upscaling",
          "16-bit multi-layered PSD masters with isolated reflection passes",
          "Pantone Metallic and spot-color ink channel separations",
          "100% Commercial Release & IP Provenance compliance audits",
        ],
        tags: ["16K Gigapixel", "CMYK Pantone", "Pre-Press"],
        plateType: "dashboard",
        mediaAlt: "16K Gigapixel Color Separation Pre-Press Dashboard",
        stats: [
          { label: "Max Output", value: "16,384 x 16,384 px" },
          { label: "Print Quality", value: "300 DPI Offset" },
        ],
      },
    ],
    workflow: [
      {
        phase: "Phase 01",
        title: "Brand IP Photogrammetry & Tokenization",
        desc: "Ingesting physical product samples and lighting profiles under controlled studio studio strobe conditions to build clean training datasets.",
      },
      {
        phase: "Phase 02",
        title: "Private LoRA Weights Training on GPUs",
        desc: "Training custom low-rank adaptation weights on dedicated private H100 clusters, guaranteeing zero public model contamination.",
      },
      {
        phase: "Phase 03",
        title: "Multi-Pass Latent Compositing in ComfyUI",
        desc: "Executing precision ControlNet guidance passes with custom depth maps, realistic shadow occlusion, and caustics lighting integration.",
      },
      {
        phase: "Phase 04",
        title: "16K Ultra-Res Upscaling & CMYK Packaging",
        desc: "Gigapixel optical reconstruction, spot-color separation, and pre-press packaging conforming to high-end industrial print specifications.",
      },
    ],
    specs: [
      { label: "Diffusion Backbone", value: "Enterprise FLUX.1 Pro Checkpoints" },
      { label: "Max Resolution", value: "16K Gigapixel (16,384 x 16,384 px)" },
      { label: "Guidance Modules", value: "ControlNet Depth + Normal + Canny" },
      { label: "Security Standard", value: "Zero Public Data Leakage SLA" },
      { label: "Print Calibrations", value: "ISO Coated v2 CMYK & Pantone" },
      { label: "Commercial Rights", value: "100% Enterprise Release Certified" },
    ],
    deliverables: [
      {
        title: "Master Key Visuals in 16K Ultra-Res Layered PSD",
        description: "Multi-layered Photoshop documents with segregated background, subject, reflection, and shadow passes.",
      },
      {
        title: "Private Enterprise FLUX.1 LoRA Model Weights",
        description: "Secure model weights trained on brand products, ready for client internal creative tooling.",
      },
      {
        title: "Omnichannel Asset Adaptation Batch (9:16, 16:9, 1:1)",
        description: "Coordinated aspect ratios rendered with dynamic composition re-framing for global social, digital, and print.",
      },
      {
        title: "Pantone Metallic & CMYK Spot-Color Separations",
        description: "Pre-press separations ready for industrial packaging, luxury boxes, and large-format printing.",
      },
    ],
    caseStudy: {
      slug: "ai-image-generation",
      title: "Aetheria Enterprise FLUX.1 Latent Art",
      client: "LVMH Fragrance & Luxury Goods",
      metrics: "16K Print Ready • 85% faster prototyping • 200+ Regional Master Stills",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=90",
    },
    metrics: {
      kpi1: { value: "16K", label: "Gigapixel Resolution" },
      kpi2: { value: "85%", label: "Faster Prototyping" },
      kpi3: { value: "100%", label: "Character Continuity" },
      kpi4: { value: "120M", label: "Regional Impressions" },
      kpi5: { value: "60%", label: "Production Savings" },
    },
    pricingTier: "$12,000 – $45,000+",
    typicalTimeline: "1 – 2 Weeks",
    nextSlug: "pro-photographers-artists",
    nextTitle: "Professional Photographers, Videographers & Artists",
  },
  {
    id: "serv-5",
    slug: "pro-photographers-artists",
    number: "05",
    tag: "Production Guild & Field Network",
    title: "Professional Photographers, Videographers & Artists",
    subtitle: "Global 48-Hour Crew Dispatch, Frame.io Camera-to-Cloud Telemetry & Cannes DPs",
    headline: "Elite on-demand cinema directors, fashion photographers, and prompt architects deployed worldwide.",
    heroImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=90",
    heroImageAlt: "Horizon Guild Global Cinematography Roster & Telemetry",
    summary:
      "Direct access to an invite-only guild of vetted cinematographers, fashion photographers, and generative prompt architects across 28 global production hubs. Coordinated through Frame.io Camera-to-Cloud (C2C) hardware transmitters, raw takes stream straight to our central post suites within 15 seconds of camera cut.",
    challenge:
      "Staging international documentary shoots across extreme environments requires instant logistical mobilization, uniform optical color matching, and resilient field telemetry without weeks of equipment freight delays.",
    solution:
      "Our guild deploys turnkey camera units equipped with Sony Venice 2 and ARRI ALEXA packages. Bonded 5G and Starlink transmitters upload 1080p ProRes editorial proxies instantaneously, enabling directors to review and cut scenes while the camera is still rolling.",
    showcasePlates: [
      {
        kicker: "01 // FIELD GUILD",
        title: "Turnkey Camera Crews & Remote Location Units",
        description: "Deploying certified Directors of Photography, 1st ACs, sound recordists, and licensed drone pilots worldwide with standardized optical cinema kits and full carnets.",
        deliverables: [
          "48-hour global crew dispatch across 28 major metros",
          "Sony Venice 2, FX9, and ARRI ALEXA camera packages",
          "End-to-end ATA carnet customs clearances and film permits",
          "Comprehensive SAG-AFTRA and international liability insurance",
        ],
        tags: ["48h Dispatch", "Sony Venice 2", "Cannes DPs"],
        plateType: "telemetry",
        mediaAlt: "Global Camera Guild Field Dispatch Telemetry",
        stats: [
          { label: "Dispatch SLA", value: "48 Hours" },
          { label: "Hubs", value: "28 Cities" },
        ],
      },
      {
        kicker: "02 // CLOUD TELEMETRY",
        title: "Frame.io Camera-to-Cloud (C2C) 15-Second Proxy Ingest",
        description: "Live proxy transmission over bonded 5G and satellite links. Allows creative directors and brand stakeholders in New York, London, or Tokyo to view playback takes within seconds of camera stop.",
        deliverables: [
          "Frame.io C2C hardware transmitters on all cinema packages",
          "Real-time 1080p ProRes proxy upload over bonded cellular",
          "Triple-redundant checksum-verified on-site NVMe SSD drives",
          "Automated editorial timeline syncing in DaVinci Studio",
        ],
        tags: ["Frame.io C2C", "Starlink 5G", "15s Ingest"],
        plateType: "dashboard",
        mediaAlt: "Frame.io Camera to Cloud Satellite Telemetry",
        stats: [
          { label: "Upload Latency", value: "<15 Seconds" },
          { label: "Redundancy", value: "Triple MD5" },
        ],
      },
    ],
    workflow: [
      {
        phase: "Phase 01",
        title: "Brief & Guild Matchmaking",
        desc: "Automated dispatch of vetted Cannes-winning DPs and certified drone operators in 28 global cities within 48h.",
      },
      {
        phase: "Phase 02",
        title: "Carnets & Permit Logistics",
        desc: "End-to-end ATA carnet customs clearances, local film permits, and equipment insurance managed by local fixers.",
      },
      {
        phase: "Phase 03",
        title: "Camera-to-Cloud Telemetry",
        desc: "Live 1080p proxy transmission over bonded 5G and Starlink satellites directly to client review monitors.",
      },
      {
        phase: "Phase 04",
        title: "Triple-Redundant Archival & Wrap",
        desc: "On-site MD5/xxHash checksum verified dual NVMe SSD drives and LTO-9 tape archives for permanent safety.",
      },
    ],
    specs: [
      { label: "Dispatch SLA", value: "48-Hour Worldwide Rapid Deployment" },
      { label: "Live Telemetry", value: "Frame.io C2C 5G / Starlink Bonding" },
      { label: "Camera Packages", value: "Sony Venice 2 / FX9 / ARRI 35" },
      { label: "Global Hubs", value: "28 Cities Across 6 Continents" },
      { label: "Insurance", value: "Full Carnet & SAG-AFTRA Insured" },
      { label: "DIT Protocol", value: "Triple-Redundant Checksum Verified" },
    ],
    deliverables: [
      {
        title: "Fully Crewed Production Teams Deployed in 48h",
        description: "Turnkey field units including DP, 1st AC, sound recordist, and certified drone pilots.",
      },
      {
        title: "Camera-to-Cloud Real-Time Daily Proxy Stream",
        description: "Instant access to 1080p ProRes proxies uploaded live for real-time editorial director review.",
      },
      {
        title: "Complete RAW Media Ingestion & Multi-Drive Archival",
        description: "Triple-redundant checksum-verified on-site backup drives with LTO-9 tape archival options.",
      },
      {
        title: "Bilingual Production Fixers & Drone Flight Permits",
        description: "Local permit acquisition, customs clearances, and location scouting handled end-to-end.",
      },
    ],
    caseStudy: {
      slug: "pro-photographers-artists",
      title: "Horizon Guild Global Production Unit",
      client: "Red Bull Media House & National Geographic",
      metrics: "14 Countries • 48-Hour Rapid Dispatch • 15-Second Cloud Proxy Stream",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=90",
    },
    metrics: {
      kpi1: { value: "48h", label: "Global Dispatch" },
      kpi2: { value: "14", label: "Countries Covered" },
      kpi3: { value: "15s", label: "Cloud Ingest Latency" },
      kpi4: { value: "28", label: "Metro Guild Hubs" },
      kpi5: { value: "100%", label: "Safety & Carnet QC" },
    },
    pricingTier: "$18,000 – $95,000+",
    typicalTimeline: "48h Dispatch • 1 – 4 Weeks",
    nextSlug: "movie-video-making",
    nextTitle: "Movie & Video Making",
  },
];
