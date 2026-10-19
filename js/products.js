/* ============================================================
   HIRANYA — Product Catalog
   Centralized product data. Every page (shop, product details,
   home "featured" rails, search, wishlist, cart) reads from this
   single array instead of hardcoding products in HTML.

   NOTE: image URLs below are the original Google Stitch /
   placeholder image sources kept isolated in one place so they
   can be swapped for local files in /assets/images/products/
   later without touching any other file.
   ============================================================ */

const HIRANYA_PRODUCTS = [
  {
    id: "aura-heritage-necklace",
    name: "Aura Heritage Necklace",
    category: "Necklaces",
    collection: "Heritage",
    gender: "Women",
    price: 145000,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviewCount: 32,
    description: "An ethereal synthesis of classical Indian opulence and contemporary European minimalism. Crafted with 18k solid gold and brilliant-cut diamonds, suspended in timeless harmony.",
    metal: "24k Yellow Gold",
    stones: ["Diamond"],
    purity: "VVS Diamonds (2.4ct)",
    sizes: ["16\"", "18\"", "20\""],
    images: [
      "assets/products/Necklace/Necklace design 1.png",
      "assets/products/Necklace/Necklace design 1(1).png",
      "assets/products/Necklace/Necklace design 1(2).png",
      "assets/products/Necklace/Necklace design 1(3).png",
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 6,
    tags: ["necklace", "heritage", "diamond", "gold", "bridal"]
  },
  {
    id: "twisted gold bangle",
    name: "Twisted Gold Bangle",
    category: "Bangles",
    collection: "Everyday",
    gender: "Women",
    price: 80000,
    originalPrice: 100000,
    discount: 0,
    rating: 4.5,
    reviewCount: 7,
    description: "A stack of three hand-finished gold bangles, each with a subtly different profile so they nest together in quiet asymmetry.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "24k Gold",
    sizes: ["2.4\"", "2.6\""],
    images: [
      "assets/products/Bangles/bangle design 3.png",
      
    ],
    featured: false, newArrival: false, bestSeller: true, stock: 15,
    tags: ["bangle", "Kada", "gold", "Everyday"]
  },
  {
    id: "eternity-emerald-ring",
    name: "Eternity Emerald Ring",
    category: "Rings",
    collection: "Heritage",
    gender: "Women",
    price: 1450000 / 100 * 100, // placeholder normalized below
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    reviewCount: 21,
    description: "A flawless emerald-cut diamond set in warm 18k yellow gold, framed by a hand-finished band that catches the light with quiet confidence.",
    metal: "18k Yellow Gold",
    stones: ["Diamond"],
    purity: "2.5ct Emerald",
    sizes: ["5", "6", "7", "8"],
    images: [
      "assets/products/Rings/Ring design 1.png",
      "assets/products/Rings/Ring design 1(1).png"
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 4,
    tags: ["ring", "emerald-cut", "diamond", "gold"]
  },
  {
    id: "diamond edge bangle",
    name: "Diamond Edge Bangle",
    category: "Bangles",
    collection: "Minimal",
    gender: "Women",
    price: 180000,
    originalPrice: 200000,
    discount: 0,
    rating: 4.5,
    reviewCount: 7,
    description: "A stack of three hand-finished gold bangles, each with a subtly different profile so they nest together in quiet asymmetry.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "24k Gold",
    sizes: ["2.4\"", "2.6\""],
    images: [
      "assets/products/Bangles/bangle design 4.png",
      "assets/products/Bangles/bangle design 4(1).png",
      
    ],
    featured: false, newArrival: false, bestSeller: true, stock: 15,
    tags: ["bangle", "Kada", "gold", "Everyday"]
  },
  {
    id: "azure-cascade-necklace",
    name: "Azure Cascade Necklace",
    category: "Necklaces",
    collection: "Contemporary",
    gender: "Women",
    price: 300000,
    originalPrice: 340000,
    discount: 8,
    rating: 4.7,
    reviewCount: 14,
    
    description: "Platinum drips down the collarbone in a cascade of pavé diamonds anchored by a single luminous sapphire — an asymmetrical, editorial silhouette.",
    metal: "Platinum",
    stones: ["Sapphire", "Diamond"],
    purity: "Sapphire & Diamonds",
    sizes: ["16\"", "18\""],
    images: [
      "assets/products/Necklace/Necklace design 2.png"
    ],
    featured: true, newArrival: true, bestSeller: false, stock: 3,
    tags: ["necklace", "platinum", "sapphire", "contemporary"]
  },
  {
    id: "lotus bangle",
    name: "Lotus Bangle (Kada)",
    category: "Bangles",
    collection: "Everyday",
    gender: "Women",
    price: 80000,
    originalPrice: 100000,
    discount: 0,
    rating: 4.5,
    reviewCount: 7,
    description: "A stack of three hand-finished gold bangles, each with a subtly different profile so they nest together in quiet asymmetry.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "24k Gold",
    sizes: ["2.4\"", "2.6\""],
    images: [
      "assets/products/Bangles/bangle design 2.png",
      "assets/products/Bangles/bangle design 2(1).png"
    ],
    featured: false, newArrival: false, bestSeller: true, stock: 15,
    tags: ["bangle", "Kada", "gold", "Everyday"]
  },
  {
    id: "crimson-geo-earrings",
    name: "Crimson Geo Earrings",
    category: "Earrings",
    collection: "Contemporary",
    gender: "Women",
    price: 439000,
    originalPrice: 500000,
    discount: 0,
    rating: 4.6,
    reviewCount: 9,
    description: "Architectural rose-gold facets set with geometric-cut rubies — sharp, modern lines softened by the warmth of rose gold.",
    metal: "18k Rose Gold",
    stones: ["Ruby"],
    purity: "1.8ct Ruby",
    sizes: ["One Size"],
    images: [
      "assets/products/Earrings/earring design 1.png",
      "assets/products/Earrings/earring design 1(1).png",
    ],
    featured: false, newArrival: true, bestSeller: false, stock: 8,
    tags: ["earrings", "rose gold", "ruby", "contemporary"]
  },
  {
    id: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    category: "Bracelets",
    collection: "Contemporary",
    gender: "Women",
    price: 151260,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviewCount: 27,
    description: "A continuous line of flawless white-gold set diamonds — the quiet-luxury bracelet meant to be worn every single day.",
    metal: "18k White Gold",
    stones: ["Diamond"],
    purity: "5ct Diamonds",
    sizes: ["6.5\"", "7\"", "7.5\""],
    images: [
      "assets/products/Bracelets/bracelet design 1.png",
      "assets/products/Bracelets/bracelet design 1(1).png",
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 5,
    tags: ["bracelet", "white gold", "diamond", "tennis"]
  },
  {
    id: "polki-heritage-choker",
    name: "Polki Heritage Choker",
    category: "Necklaces",
    collection: "Bridal",
    gender: "Women",
    price: 312500,
    originalPrice: 345000,
    discount: 9,
    rating: 5.0,
    reviewCount: 18,
    description: "Uncut Polki diamonds set in traditional gold kundan work, reimagined with a cleaner, more architectural silhouette for the modern bride.",
    metal: "24k Yellow Gold",
    stones: ["Polki Diamond"],
    purity: "Uncut Polki, 12ct total",
    sizes: ["Adjustable"],
    images: [
      "assets/products/Necklace/Necklace design 3.png",
      "assets/products/Necklace/Necklace design 3(1).png"
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 2,
    tags: ["necklace", "bridal", "polki", "heritage", "gold"]
  },
  {
    id: "jhumka-silk-earrings",
    name: "Jhumka Silk Earrings",
    category: "Earrings",
    collection: "Heritage",
    gender: "Women",
    price: 486000,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviewCount: 12,
    description: "Traditional Jhumka silhouette rendered in restrained modern proportions, finished with hand-set pearls along the edge.",
    metal: "22k Yellow Gold",
    stones: ["Pearl"],
    purity: "Freshwater Pearl",
    sizes: ["One Size"],
    images: [
      "assets/products/Earrings/earring design 2.png",
    ],
    featured: false, newArrival: true, bestSeller: false, stock: 10,
    tags: ["earrings", "jhumka", "heritage", "pearl"]
  },
  {
    id: "marble-bangle-stack",
    name: "Marble Bangle Stack",
    category: "Bangles",
    collection: "Heritage",
    gender: "Women",
    price: 612000,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviewCount: 7,
    description: "A stack of three hand-finished gold bangles, each with a subtly different profile so they nest together in quiet asymmetry.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "22k Gold Plated",
    sizes: ["2.4\"", "2.6\""],
    images: [
      "assets/products/Bangles/bangle design 1.png",
      "assets/products/Bangles/bangle design 1(1).png"
    ],
    featured: false, newArrival: false, bestSeller: true, stock: 15,
    tags: ["bangle", "stack", "gold", "heritage"]
  },
  {
    id: "emerald link bracelet",
    name: "Emerald Link Bracelet",
    category: "Bracelets",
    collection: "Contemporary",
    gender: "Women",
    price: 250000,
    originalPrice: 275000,
    discount: 13,
    rating: 4.9,
    reviewCount: 27,
    description: "A refined 18K yellow-gold bracelet featuring alternating emerald-green gemstones and brilliant diamonds in elegant articulated links. Its graceful silhouette combines rich colour with subtle sparkle for a sophisticated everyday and festive look.",
    metal: "18K Yellow Gold",
    stones: ["Natural Emeralds & Diamonds"],
    purity: "5ct Diamonds",
    sizes: ["6.5\"", "7\"", "7.5\""],
    images: [
      "assets/products/Bracelets/bracelet design 2.png",
      
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 5,
    tags: ["bracelet", "yellow gold", "diamond", "tennis", "emerald"]
  },
  {
    id: "solitaire-promise-ring",
    name: "Solitaire Promise Ring",
    category: "Rings",
    collection: "Contemporary",
    gender: "Women",
    price: 985000,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    reviewCount: 41,
    description: "A single round-brilliant diamond on a knife-edge platinum band — the quintessential solitaire, engineered for everyday wear.",
    metal: "Platinum",
    stones: ["Diamond"],
    purity: "1.2ct Diamond",
    sizes: ["5", "6", "7", "8", "9"],
    images: [
      "assets/products/Rings/Ringg design 2.png",
      "assets/products/Rings/Ring desing 2(1).png"
    ],
    featured: false, newArrival: true, bestSeller: true, stock: 9,
    tags: ["ring", "solitaire", "platinum", "diamond", "bridal"]
  },
  {
    id: "royal-kundan-set",
    name: "Royal Kundan Bridal Set",
    category: "Bridal",
    collection: "Bridal",
    gender: "Women",
    price: 685000,
    originalPrice: 725000,
    discount: 8,
    rating: 5.0,
    reviewCount: 6,
    description: "A complete kundan bridal set — necklace, earrings and maang tikka — hand-crafted in Jaipur using traditional meenakari on the reverse.",
    metal: "22k Yellow Gold",
    stones: ["Kundan", "Ruby", "Emerald"],
    purity: "Kundan & Meenakari",
    sizes: ["Adjustable"],
    images: [
      "assets/products/Bridal/bridal design 1.png",
      "assets/products/Bridal/bridal design 1(1).png",
    ],
    featured: true, newArrival: false, bestSeller: false, stock: 1,
    tags: ["bridal", "kundan", "set", "heritage"]
  },
  
  {
    id: "ruby-heritage-bridal-set",
    name: "Ruby Heritage Bridal Set",
    category: "Bridal",
    collection: "Bridal",
    gender: "Women",
    price: 685000,
    originalPrice: 725000,
    discount: 8,
    rating: 5.0,
    reviewCount: 6,
    description: "A regal 22K gold bridal set featuring deep ruby-red gemstones, delicate diamond detailing and elegant pearl accents. Inspired by Maharani jewellery, the coordinated necklace, earrings and maang tikka create a timeless statement for the modern Indian bride.",
    metal: "22k Yellow Gold",
    stones: ["Natural Rubies, Diamonds"],
    includes: ["Necklace", "Earrings", "Maang Tikka"],
    purity: "Freshwater Pearls",
    sizes: ["Adjustable"],
    images: [
      "assets/products/Bridal/bridal design 2.png",
      "assets/products/Bridal/bridal design 2(1).png",
      "assets/products/Bridal/bridal design 2(2).png",
    ],
    featured: true, newArrival: false, bestSeller: false, stock: 1,
    tags: ["bridal", "kundan", "set", "heritage"]
  },
    {
    id: "aurelia gold chain bracelet",
    name: "Aurelia Gold Chain Bracelet",
    category: "Bracelets",
    collection: "Bracelets",
    gender: "Women",
    price: 175000,
    originalPrice: 275000,
    discount: 13,
    rating: 4.9,
    reviewCount: 27,
    description: "A delicate 18K yellow-gold chain bracelet designed with refined interlocking links and a subtle central gold detail. Lightweight and effortlessly elegant, Aurelia is made for everyday wear and easy layering.",
    metal: "18K Yellow Gold",
    stones: ["None"],
    purity: "5ct Diamonds",
    sizes: ["6.5\"", "7\"", "7.5\""],
    images: [
      "assets/products/Bracelets/bracelet design 3.png",
      
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 5,
    tags: ["bracelet", "yellow gold", "diamond"],
    badge: "Everyday Essential"
  },
  {
    id: "vanya leaf ring",
    name: "Vanya Leaf Ring",
    category: "Rings",
    collection: "Rings",
    gender: "Women",
    price: 142000,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviewCount: 8,
    description: "A weighted signet ring in matte yellow gold, left uncarved so it can be engraved with your own crest or initials.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "Engravable",
    sizes: ["8", "9", "10", "11"],
    images: [
      "assets/products/Rings/Ring design 3.png",
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 12,
    tags: ["men", "ring", "signet", "gold"]
  },
  {
    id: "diamond-choker-bridal-set",
    name: "Diamond Choker Bridal Set",
    category: "Bridal",
    collection: "Bridal",
    gender: "Women",
    price: 985000,
    originalPrice: 1012000,
    discount: 8,
    rating: 5.0,
    reviewCount: 6,
    description: "A sophisticated diamond bridal set featuring a brilliant-cut diamond choker, matching drop earrings and a graceful maang tikka. Crafted in polished 18K white gold, its refined silhouette brings modern elegance to the timeless Indian bridal look.",
    metal: "18K White Gold",
    stones: ["Natural Diamonds"],
    occasion: "Wedding, Bridal, Reception",
    includes: ["Necklace", "Earrings", "Maang Tikka"],
    purity: "2.5ct Diamonds",
    sizes: ["Adjustable"],
    images: [
      "assets/products/Bridal/bridal design 3.png",
      "assets/products/Bridal/bridal design 3(1).png",
      
    ],
    featured: true, newArrival: false, bestSeller: false, stock: 9,
    tags: ["bridal", "kundan", "set", "heritage"]
  },
  {
    id: "opal-drift-pendant",
    name: "Opal Drift Pendant",
    category: "Pendants",
    collection: "Contemporary",
    gender: "Women",
    price: 250000,
    originalPrice: 260000,
    discount: 0,
    rating: 4.4,
    reviewCount: 5,
    description: "A single Australian opal set in a fluid, hand-carved rose-gold frame — organic movement caught in metal.",
    metal: "18k Rose Gold",
    stones: ["Opal"],
    purity: "Natural Opal",
    sizes: ["18\" chain included"],
    images: [
      "assets/products/Pendant/pendant design 1.png",
      "assets/products/Pendant/pendant desig 1(1).png",
    ],
    featured: false, newArrival: true, bestSeller: false, stock: 7,
    tags: ["pendant", "opal", "rose gold", "contemporary"]
  },
  {
    id: "verena emerald tennis bracelet",
    name: "Verena Emerald Tennis Bracelet",
    category: "Bracelets",
    collection: "Contemporary",
    gender: "Women",
    price: 89000,
    originalPrice: 120000,
    discount: 5,
    rating: 4.9,
    reviewCount: 27,
    description: "A refined 18K yellow-gold bracelet featuring a graceful row of oval emeralds set in polished gold links. Its elegant silhouette and rich green tones create a sophisticated statement for both everyday and occasion wear.",
    metal: "24K Yellow Gold",
    stones: ["Natural Emeralds"],
    purity: "5ct Diamonds",
    sizes: ["6.5\"", "7\"", "7.5\""],
    images: [
      "assets/products/Bracelets/bracelet design 4.png",
      "assets/products/Bracelets/bracelete design 4(1).png"
      
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 5,
    tags: ["bracelet", "yellow gold", "diamond"],
    badge: "Everyday Essential"
  },
  {
    id: "vintage-halo-earrings",
    name: "Vintage Halo Earrings",
    category: "Earrings",
    collection: "Heritage",
    gender: "Women",
    price: 892000,
    originalPrice: 965000,
    discount: 7,
    rating: 4.8,
    reviewCount: 16,
    description: "A central diamond ringed by a halo of smaller stones, drawing on Edwardian jewellery-making with a lighter modern setting.",
    metal: "18k White Gold",
    stones: ["Diamond"],
    purity: "1.6ct total",
    sizes: ["One Size"],
    images: [
      "assets/products/Earrings/eraring design 3.png",
      "assets/products/Earrings/earring design 3(1).png",
    ],
    featured: false, newArrival: false, bestSeller: true, stock: 6,
    tags: ["earrings", "halo", "diamond", "heritage"]
  },
  {
    id: "azure teardrop pendant",
    name: "Azure Teardrop Pendant",
    category: "Pendants",
    collection: "Contemporary",
    gender: "Women",
    price: 250000,
    originalPrice: 260000,
    discount: 0,
    rating: 4.4,
    reviewCount: 5,
    description: "A graceful teardrop pendant featuring a deep blue sapphire framed by a delicate halo of brilliant diamonds. Set in warm 18K yellow gold, Azure Teardrop brings together refined sparkle and timeless contemporary elegance.",
    metal: "18k Yellow Gold",
    stones: ["Blue Sapphire & Natural Diamonds"],
    purity: "Blue Sapphire",
    sizes: ["18\" chain included"],
    images: [
      "assets/products/Pendant/pendant design 2.png",
      "assets/products/Pendant/pendant design 2(1).png",
    ],
    featured: false, newArrival: true, bestSeller: false, stock: 7,
    tags: ["pendant", "opal", "rose gold", "contemporary"]
  },
  {
    id: "signet crest ring",
    name: "Signet Crest Ring",
    category: "Rings",
    collection: "Rings",
    gender: "Women",
    price: 42000,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviewCount: 8,
    description: "A weighted signet ring in matte yellow gold, left uncarved so it can be engraved with your own crest or initials.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "Engravable",
    sizes: ["8", "9", "10", "11"],
    images: [
      "assets/products/Rings/Ring design 4.png",
      "assets/products/Rings/Ring design 4(1).png"
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 12,
    tags: ["men", "ring", "signet", "gold"]
  },
  {
    id: "Kyravon Diamond Necklace",
    name: "Kyravon Diamond Necklace",
    category: "Necklaces",
    collection: "Minimal",
    gender: "Women",
    price: 1685000,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviewCount: 13,
    description: "Kyravon is a timeless diamond necklace featuring graduated round-cut diamonds set in polished platinum. Its delicate V-shaped silhouette creates a refined sparkle, perfect for elegant everyday wear or special occasions.",
    metal: "18ct diamond necklace set in platinum",
    stones: ["Ruby"],
    purity: "Temple Work",
    sizes: ["16\"", "18\""],
    images: [
      "assets/products/Necklace/Necklace design 5.png"
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 4,
    tags: ["necklace", "diamond", "minimal", "platinum", "ruby"]
  },
    {
    id: "lotus diamond pendant",
    name: "Lotus Diamond Pendant",
    category: "Pendants",
    collection: "Contemporary",
    gender: "Women",
    price: 189000,
    originalPrice: 260000,
    discount: 0,
    rating: 4.4,
    reviewCount: 5,
    description: "A graceful lotus-inspired pendant crafted in 18K yellow gold, featuring sculpted petals surrounding a brilliant diamond at the center. Symbolizing purity and elegance, its delicate silhouette makes it a timeless addition to everyday and festive looks.",
    metal: "24k Yellow Gold",
    stones: ["Natural Diamonds"],
    purity: "Natural Diamond",
    sizes: ["18\" chain included"],
    images: [
      "assets/products/Pendant/pendant design 3.png",
      "assets/products/Pendant/pendant design 3(1).png",
    ],
    featured: false, newArrival: true, bestSeller: false, stock: 7,
    tags: ["pendant", "opal", "rose gold", "contemporary"]
  },
  {
    id: "infinity diamond bracelet",
    name: "Infinity Diamond Bracelet",
    category: "Bracelets",
    collection: "Contemporary",
    gender: "Women",
    price: 300000,
    originalPrice: 450000,
    discount: 5,
    rating: 4.9,
    reviewCount: 27,
    description: "A timeless bracelet featuring interconnected infinity motifs delicately set with brilliant-cut diamonds. Crafted in polished 18K white gold, its graceful silhouette represents endless elegance and effortless sophistication.",
    metal: "18K White Gold",
    stones: ["Natural Diamonds"],
    purity: "5ct Diamonds",
    sizes: ["6.5\"", "7\"", "7.5\""],
    images: [
      "assets/products/Bracelets/bracelet design 5.png",
      "assets/products/Bracelets/bracelet design 5(1).png"
      
    ],
    featured: true, newArrival: false, bestSeller: true, stock: 5,
    tags: ["bracelet", "yellow gold", "diamond"],
    badge: "Everyday Essential"
  },
    {
    id: "bronze curse ring",
    name: "Bronze Curse Ring",
    category: "Rings",
    collection: "Rings",
    gender: "Women",
    price: 195000,
    originalPrice: 215000,
    discount: 0,
    rating: 4.7,
    reviewCount: 8,
    description: "A weighted signet ring in matte yellow gold, left uncarved so it can be engraved with your own crest or initials.",
    metal: "24k Yellow Gold",
    stones: [],
    purity: "Engravable",
    sizes: ["8", "9", "10", "11"],
    images: [
      "assets/products/Rings/Ring design 5.png",
      "assets/products/Rings/Ring design 5(1).png"
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 12,
    tags: ["men", "ring", "signet", "gold"]
  },
    {
    id: "emilys Butterfly Necklace",
    name: "Emily's Butterfly Necklace",
    category: "Necklaces",
    collection: "Beauty",
    gender: "Women",
    price: 168500,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviewCount: 13,
    description: "A beautiful butterfly-inspired necklace crafted butterfy & diamonds in gold with a lighter, everyday weight — deities and lotus work rendered in fine detail.",
    metal: "24k Yellow Gold",
    stones: ["Diamond"],
    purity: "Lab Grown Diamonds",
    sizes: ["16\"", "18\""],
    images: [
      "assets/products/Necklace/Necklace design 6.png"
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 4,
    tags: ["necklace", "diamond", "beauty", "gold", "butterfly"]
  },
  {
    id: "celestial diamond pendant",
    name: "Celestial Diamond Pendant",
    category: "Pendants",
    collection: "Celestial",
    gender: "Women",
    price: 195000,
    originalPrice: 215000,
    discount: 0,
    rating: 4.7,
    reviewCount: 8,
    description: "A delicate crescent moon pendant crafted in polished 18K white gold and accented with brilliant-cut diamonds. Inspired by the night sky, its graceful silhouette adds a subtle touch of celestial elegance to everyday and occasion wear.",
    metal: "24k Weight Gold",
    stones: [],
    purity: "Engravable",
    sizes: ["18\" chain included"],
    images: [
      "assets/products/Pendant/pendant desogn 4.png",
      
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 12,
    tags: ["men", "ring", "signet", "gold"]
  },
  {
    id: "festive-temple-necklace",
    name: "Festive Temple Necklace",
    category: "Necklaces",
    collection: "Festive",
    gender: "Women",
    price: 168500,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviewCount: 13,
    description: "Temple-jewellery motifs cast in gold with a lighter, everyday weight — deities and lotus work rendered in fine detail.",
    metal: "22k Yellow Gold",
    stones: ["Ruby"],
    purity: "Temple Work",
    sizes: ["16\"", "18\""],
    images: [
      "assets/products/Necklace/Necklace design 4.png"
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 4,
    tags: ["necklace", "temple", "festive", "gold", "ruby"]
  },
  {
    id: "everyday-huggie-hoops",
    name: "Everyday Huggie Hoops",
    category: "Earrings",
    collection: "Everyday",
    gender: "Women",
    price: 128000,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviewCount: 24,
    description: "Small, pavé-set huggie hoops designed to be worn daily and layered with other pieces — the entry point into fine gold jewellery.",
    metal: "24k Yellow Gold",
    stones: ["Diamond"],
    purity: "0.3ct total",
    sizes: ["One Size"],
    images: [
      "assets/products/Earrings/earring design 4.png",
      "assets/products/Earrings/earring design 4(1).png",
    ],
    featured: false, newArrival: true, bestSeller: true, stock: 30,
    tags: ["earrings", "hoops", "everyday", "gold"]
  },
  {
  id: "lime rock ring",
  name: "Lime Rock Ring",
  category: "rings",
  gender: "Men",
  price: 18999,
  originalPrice: 21999,
  discount: 14,
  rating: 4.7,
  reviewCount: 56,
  sizes: ["12", "14", "16", "18", "20"],
  defaultSize: "16",
  images: [
    "assets/products/RINGS/Ring design 7.png",
  ],
  description:
    "A sculpted 24K yellow-gold ring inspired by flowing leaves and natural forms. Its polished organic design creates a graceful silhouette that blends timeless Indian craftsmanship with modern elegance.",
  metal: "24K Yellow Gold",
  stones: ["Emerald"],
  occasion: [
    "Everyday",
    "Festive",
    "Casual"
  ],
  style: "Contemporary",
  stock: 32,
  badge: "New Arrival"
},
  {
    id: "Old Fairy Necklace",
    name: "Old Fairy Necklace",
    category: "Necklaces",
    collection: "Traditional",
    gender: "Women",
    price: 368500,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviewCount: 13,
    description: "A beautiful butterfly-inspired necklace crafted in gold with a lighter, everyday weight — deities and lotus work rendered in fine detail.",
    metal: "24k Yellow Gold",
    stones: ["gold"],
    purity: "",
    sizes: ["16\"", "18\""],
    images: [
      "assets/products/Necklace/Necklace design 7.png",
      "assets/products/Necklace/Necklace design 7(1).png"
    ],
    featured: false, newArrival: false, bestSeller: false, stock: 4,
    tags: ["necklace", "gold", "beauty", "butterfly"]
  },
  {
    id: "elara floral drops",
    name: "Elara Floral Drops",
    category: "Earrings",
    collection: "Everyday",
    gender: "Women",
    price: 190000,
    originalPrice: 210000,
    discount: 0,
    rating: 4.5,
    reviewCount: 24,
    description: "Elegant floral-inspired drop earrings featuring a delicate oval hoop, sculpted gold petals and subtle diamond accents. Designed with graceful movement and a lightweight silhouette, Elara Floral Drops bring a refined touch of modern luxury to festive and evening looks",
    metal: "24k Bronze Gold",
    stones: ["Diamond"],
    purity: "0.3ct total",
    sizes: ["One Size"],
    images: [
      "assets/products/Earrings/earring design 5.png",
      "assets/products/Earrings/earring design 5(1).png",
    ],
    featured: false, newArrival: true, bestSeller: true, stock: 30,
    tags: ["earrings", "hoops", "everyday", "gold"]
  },
  {
    id: "aarya emerald chandeliers",
    name: "Aarya Emerald Chandeliers",
    category: "Earrings",
    collection: "Events",
    gender: "Women",
    price: 315000,
    originalPrice: 375000,
    discount: 0,
    rating: 4.5,
    reviewCount: 63,
    description: "A regal pair of 22K gold chandelier earrings featuring emeralds, brilliant diamonds and delicate freshwater pearls. Inspired by Mughal-era artistry, their cascading silhouette adds timeless grandeur to bridal and festive occasions.",
    metal: "24k Yellow Gold",
    stones: ["Emeraldd"],
    purity: "Emerald 0.3ct total",
    sizes: ["One Size"],
    images: [
      "assets/products/Earrings/earring design 6.png",
      
    ],
    featured: false, newArrival: true, bestSeller: true, stock: 30,
    tags: ["earrings", "hoops", "everyday", "gold"]
  },
  
];

// Normalize any placeholder arithmetic left in price fields (keeps data authoring simple/readable).
HIRANYA_PRODUCTS.forEach(p => { p.price = Math.round(p.price); });

/* ============================================================
   Per-size pricing & availability
   ------------------------------------------------------------
   Real jewellery pricing varies by size: a longer chain uses
   more gold, a larger stone-set bracelet needs more diamonds,
   and popular ring sizes sell out faster than the extremes.
   Rather than hand-author every size's price/stock, each
   product's flat `sizes` list of labels is expanded here into
   `sizeOptions`: [{ label, price, stock }], using rules based on
   what kind of size the product has:

   - "length" sizes (e.g. 16" / 18" / 20" necklaces, bracelets):
     price increases ~4% per step up in length; stock is weighted
     toward the shorter/more common lengths.
   - "ring" sizes (numeric, e.g. 5 / 6 / 7 / 8): price stays the
     same across sizes (resizing doesn't change gold/stone
     content meaningfully at this scale), but stock is weighted
     toward the middle sizes, which sell fastest.
   - everything else (One Size / Adjustable / Engravable / a
     single chain length): one size option at the base price
     and full stock.
   ============================================================ */

function classifySizeType(labels) {
  if (labels.length <= 1) return "single";
  if (labels.every(s => /^\d+(\.\d+)?$/.test(s))) return "ring";
  if (labels.every(s => /"/.test(s))) return "length";
  return "single";
}

HIRANYA_PRODUCTS.forEach(product => {
  const labels = product.sizes && product.sizes.length ? product.sizes : ["One Size"];
  const baseStock = product.stock || 0;
  const type = classifySizeType(labels);

  let sizeOptions;

  if (type === "length") {
    const weights = labels.map((_, i) => (i === 0 ? 0.45 : i === 1 ? 0.35 : 0.20));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    sizeOptions = labels.map((label, i) => ({
      label,
      price: Math.round((product.price * (1 + i * 0.04)) / 100) * 100,
      stock: Math.max(0, Math.round((baseStock * weights[i]) / totalWeight))
    }));
  } else if (type === "ring") {
    const n = labels.length;
    const mid = (n - 1) / 2;
    const weights = labels.map((_, i) => 1 - Math.abs(i - mid) / (mid + 1));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    sizeOptions = labels.map((label, i) => ({
      label,
      price: product.price,
      stock: Math.max(0, Math.round((baseStock * weights[i]) / totalWeight))
    }));
  } else {
    sizeOptions = labels.map(label => ({ label, price: product.price, stock: baseStock }));
  }

  product.sizeOptions = sizeOptions;
  product.minPrice = Math.min(...sizeOptions.map(s => s.price));
  product.maxPrice = Math.max(...sizeOptions.map(s => s.price));
  product.totalStock = sizeOptions.reduce((sum, s) => sum + s.stock, 0);
});

/** Look up the { label, price, stock } entry for a given size label (falls back to the first size option). */
function getSizeOption(product, sizeLabel) {
  if (!product || !product.sizeOptions || !product.sizeOptions.length) return null;
  return product.sizeOptions.find(s => s.label === sizeLabel) || product.sizeOptions[0];
}

/* ---------- Helpers shared across pages ---------- */

/** Format a number as Indian Rupees, e.g. 145000 -> "₹1,45,000" */
function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function getProductById(id) {
  return HIRANYA_PRODUCTS.find(p => p.id === id) || null;
}

function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return HIRANYA_PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, limit);
}

/**
 * Shared product card markup used by home rails, shop grid,
 * wishlist grid and search results — one template, styled by
 * .product-card in components.css.
 */
function productCardHTML(p) {
  const wished = (typeof isWishlisted === "function") && isWishlisted(p.id);
  const hasRange = p.maxPrice > p.minPrice;
  const pricePrefix = hasRange ? "From " : "";
  const priceMarkup = p.originalPrice
    ? `<span class="product-price">${pricePrefix}${formatINR(p.minPrice)}</span> <span class="text-decoration-line-through text-on-surface-var ms-2" style="font-size:14px;">${formatINR(p.originalPrice)}</span>`
    : `<span class="product-price">${pricePrefix}${formatINR(p.minPrice)}</span>`;
  const soldOut = p.totalStock === 0;

  return `
    <div class="col-6 col-lg-4">
      <div class="product-card reveal in-view" data-product-id="${p.id}" onclick="if(!event.target.closest('[data-wishlist-btn]')) window.location.href='product-details.html?id=${p.id}'">
        <div class="product-media">
          <img src="${p.images[0]}" alt="${p.name} — ${p.metal}${p.stones.length ? ', ' + p.stones.join(', ') : ''}" loading="lazy">
          ${soldOut ? `<span class="sold-out-ribbon label-caps">Sold Out</span>` : ""}
          <button class="wishlist-toggle ${wished ? 'active' : ''}" data-wishlist-btn data-product-id="${p.id}" aria-pressed="${wished}" aria-label="Toggle wishlist for ${p.name}">
            <span class="material-symbols-outlined">${wished ? 'favorite' : 'favorite_border'}</span>
          </button>
          <div class="quick-view">
            <span class="label-caps" style="letter-spacing:0.2em;color:var(--hiranya-primary);border-bottom:1px solid var(--hiranya-primary);padding-bottom:2px;">Quick View</span>
          </div>
        </div>
        <div class="text-center pt-3">
          <h4 class="product-name">${p.name}</h4>
          <p class="product-meta mb-0">${p.metal}${p.stones.length ? ', ' + p.purity : ''}</p>
          <p class="mb-0">${priceMarkup}</p>
        </div>
      </div>
    </div>`;
}

function searchProducts(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return HIRANYA_PRODUCTS.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.metal.toLowerCase().includes(q) ||
      p.stones.join(" ").toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q)
    );
  });
}
