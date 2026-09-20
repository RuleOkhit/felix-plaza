// ---------------------------------------------------------------------------
// STORE COPY
//
// One entry per store, keyed by the slug in store-directory.ts.
//
//   tagline      The brand's own line where it has a well known one (adidas,
//                "Impossible Is Nothing"). Otherwise a short, plain
//                description of the store. Never an invented slogan.
//   description  One or two short sentences: what the brand is and what you
//                will find. Plain words, no insider detail, and nothing that
//                would need checking with the store.
//
// House style: plain words, no em dashes, no marketing filler.
// ---------------------------------------------------------------------------

export type StoreCopy = { tagline: string; description: string };

export const STORE_COPY: Record<string, StoreCopy> = {
  /* --------------------------------------------------------- APPAREL */
  arrow: {
    tagline: "American Menswear Since 1851",
    description:
      "Arrow is an American menswear brand known for its shirts. The store carries formal shirts, suits, trousers and smart casual wear.",
  },
  blackberrys: {
    tagline: "Menswear For Work And Weekends",
    description:
      "Blackberrys is an Indian menswear brand with formal, casual and occasion wear, from shirts and trousers to suits and blazers.",
  },
  "bonkers-corner": {
    tagline: "Everyday Streetwear",
    description:
      "Bonkers Corner is a streetwear brand known for its oversized tees, with hoodies, joggers and casual wear for men and women.",
  },
  "calvin-klein": {
    tagline: "Modern American Fashion Since 1968",
    description:
      "Calvin Klein is the New York label known for clean, modern design, with clothing, denim, underwear and accessories for men and women.",
  },
  "go-colors": {
    tagline: "Women's Bottom Wear",
    description:
      "Go Colors specialises in women's bottom wear, with leggings, pants, jeggings and palazzos in a wide range of colours and fits.",
  },
  "h-and-m": {
    tagline: "Fashion And Quality At The Best Price",
    description:
      "H&M offers affordable fashion for women, men and kids, with new styles arriving through the season.",
  },
  "jack-and-jones": {
    tagline: "Danish Denim Since 1990",
    description:
      "Jack & Jones is a Danish menswear brand known for its denim, with jeans, shirts, tees and jackets for everyday wear.",
  },
  levis: {
    tagline: "Quality Never Goes Out Of Style",
    description:
      "Levi's has been making jeans since 1873. Find denim in every fit, along with shirts, tees and jackets for men and women.",
  },
  lifestyle: {
    tagline: "Fashion Department Store",
    description:
      "Lifestyle is a department store with clothing, footwear, beauty and accessories for the whole family, from its own labels and well known brands.",
  },
  "louis-philippe": {
    tagline: "The Upper Crest",
    description:
      "Louis Philippe offers premium menswear, from formal shirts and suits to smart casual wear and accessories.",
  },
  madame: {
    tagline: "Women's Western Wear",
    description:
      "Madame is an Indian fashion brand for women, with dresses, tops, co ord sets and jackets for work and evenings out.",
  },
  "marks-and-spencer": {
    tagline: "British Retailer Since 1884",
    description:
      "Marks & Spencer is the British retailer known for quality clothing, lingerie and everyday essentials for women, men and kids.",
  },
  max: {
    tagline: "Fashion For The Whole Family",
    description:
      "Max offers affordable fashion for women, men and kids, from everyday basics to festive wear, along with footwear and accessories.",
  },
  only: {
    tagline: "Danish Womenswear",
    description:
      "ONLY is a Danish fashion brand for women, known for its denim, along with tops, dresses and jackets.",
  },
  "pepe-jeans": {
    tagline: "London Denim Since 1973",
    description:
      "Pepe Jeans is a denim brand from London, with jeans, shirts, tees and jackets for men and women.",
  },
  "r-and-b": {
    tagline: "Fashion For The Family",
    description:
      "R&B offers affordable, on trend fashion for women, men and kids.",
  },
  "rare-rabbit": {
    tagline: "Premium Menswear",
    description:
      "Rare Rabbit is a premium Indian menswear brand known for its shirts, with trousers, knitwear and smart casual wear.",
  },
  rareism: {
    tagline: "Womenswear From Rare Rabbit",
    description:
      "Rareism is the womenswear label from Rare Rabbit, with dresses, tops, co ord sets and trousers.",
  },
  snitch: {
    tagline: "Fashion For Men",
    description:
      "Snitch is an Indian menswear brand with shirts, tees, denim and casual wear that follows the latest trends.",
  },
  "style-union": {
    tagline: "Everyday Fashion",
    description:
      "Style Union offers casual everyday wear for men and women, including tees, shirts and denim, at easy prices.",
  },
  "sweet-dreams": {
    tagline: "Nightwear And Loungewear",
    description:
      "Sweet Dreams makes comfortable nightwear and loungewear, with pyjama sets, shorts and tees for relaxing at home.",
  },
  "the-bear-house": {
    tagline: "Smart Casual Menswear",
    description:
      "The Bear House is an Indian menswear brand with shirts, polos, knitwear and trousers for smart casual dressing.",
  },
  "tommy-hilfiger": {
    tagline: "Classic American Cool",
    description:
      "Tommy Hilfiger brings classic American style for men and women, from polos and shirts to denim and outerwear.",
  },
  "us-polo-assn": {
    tagline: "Official Brand Of The U.S. Polo Association",
    description:
      "U.S. Polo Assn. offers casual clothing, footwear and accessories for men, women and kids, inspired by the sport of polo.",
  },
  "van-heusen": {
    tagline: "Power Dressing",
    description:
      "Van Heusen offers workwear and smart casual clothing for men and women, from shirts and trousers to blazers.",
  },
  "vero-moda": {
    tagline: "Danish Womenswear",
    description:
      "Vero Moda is a Danish fashion brand for women, with dresses, tops, trousers and outerwear for every day.",
  },
  westside: {
    tagline: "Fashion From The Tata Group",
    description:
      "Westside is Tata's fashion store, with its own labels for women, men and kids, along with footwear, beauty and home.",
  },
  zudio: {
    tagline: "Fashion At Easy Prices",
    description:
      "Zudio, from the Tata group, offers the latest fashion for women, men and kids at low prices, along with footwear and beauty.",
  },

  /* ----------------------------------------------------- ETHNIC WEAR */
  aurelia: {
    tagline: "Everyday Ethnic Wear",
    description:
      "Aurelia offers easy, affordable ethnic wear for women, with kurtas, suit sets, bottoms and dupattas.",
  },
  "barara-ethnic": {
    tagline: "Festive And Wedding Wear",
    description:
      "Barara Ethnic offers Indian ethnic wear for weddings, festivals and special occasions.",
  },
  biba: {
    tagline: "Indian Wear For Women",
    description:
      "Biba is one of India's best known ethnic wear brands, with kurtas, suit sets, dresses and more for women and girls.",
  },
  devo: {
    tagline: "Ethnic Wear",
    description:
      "Devo offers Indian ethnic wear for festive days and special occasions.",
  },
  libas: {
    tagline: "Ethnic Wear For Women",
    description:
      "Libas offers everyday and festive ethnic wear for women, with kurtas, suit sets and dupattas.",
  },
  "meena-bazaar": {
    tagline: "Bridal And Festive Wear",
    description:
      "Meena Bazaar is known for sarees, lehengas and suits for weddings, festivals and special occasions.",
  },
  sabhyata: {
    tagline: "Ethnic Wear",
    description:
      "Sabhyata offers Indian ethnic wear, with kurtas, suit sets and festive pieces inspired by traditional designs.",
  },
  tasva: {
    tagline: "Menswear By Tarun Tahiliani",
    description:
      "Tasva is Tarun Tahiliani's menswear label with Aditya Birla Fashion, offering kurtas, bandhgalas and sherwanis for festivals and weddings.",
  },
  w: {
    tagline: "Contemporary Indian Wear",
    description:
      "W offers contemporary Indian wear for women, with kurtas, tunics and dresses for work and special occasions.",
  },

  /* -------------------------------------------------------- FOOTWEAR */
  aldo: {
    tagline: "Shoes And Accessories",
    description:
      "ALDO offers fashion footwear, bags and accessories for men and women, from heels and sneakers to formal shoes.",
  },
  birkenstock: {
    tagline: "Footwear Since 1774",
    description:
      "Birkenstock is the German footwear brand famous for its contoured footbed, with sandals, clogs and shoes for men and women.",
  },
  crocs: {
    tagline: "Come As You Are",
    description:
      "Crocs are known for their light, comfortable clogs. Find clogs, sandals and slides for men, women and kids, plus Jibbitz charms to personalise them.",
  },
  inc5: {
    tagline: "Women's Footwear",
    description:
      "Inc.5 offers stylish footwear for women, from heels and flats to sneakers, along with bags.",
  },
  mochi: {
    tagline: "Footwear For Men And Women",
    description:
      "Mochi offers footwear for men and women, from formal and casual shoes to sandals and heels, along with bags and accessories.",
  },

  /* ------------------------------------------------------ SPORTSWEAR */
  adidas: {
    tagline: "Impossible Is Nothing",
    description:
      "Adidas sportswear and footwear for running, training and everyday wear, for men, women and kids.",
  },
  asics: {
    tagline: "Sound Mind, Sound Body",
    description:
      "ASICS is a Japanese sports brand best known for its running shoes, with footwear and apparel for running and training.",
  },
  puma: {
    tagline: "Forever Faster",
    description:
      "Puma offers sports shoes, clothing and accessories for training, running and everyday wear.",
  },
  skechers: {
    tagline: "The Comfort Technology Company",
    description:
      "Skechers makes comfortable footwear for walking, running and everyday wear, for men, women and kids.",
  },

  /* ------------------------------------------------------- JEWELLERY */
  bluestone: {
    tagline: "Fine Jewellery",
    description:
      "BlueStone offers gold, diamond and platinum jewellery, from everyday pieces to engagement rings.",
  },
  caratlane: {
    tagline: "A Tanishq Partnership",
    description:
      "CaratLane offers gold and diamond jewellery in modern designs, for everyday wear and special occasions.",
  },
  ethera: {
    tagline: "Fine Jewellery",
    description:
      "Ethera offers fine jewellery designed for everyday wear.",
  },
  giva: {
    tagline: "Silver Jewellery",
    description:
      "GIVA offers silver and gold jewellery for everyday wear and gifting, from rings and earrings to pendants.",
  },
  limelight: {
    tagline: "Lab Grown Diamond Jewellery",
    description:
      "Limelight offers jewellery made with lab grown diamonds, from rings and earrings to necklaces.",
  },
  palmonas: {
    tagline: "Demi Fine Jewellery",
    description:
      "Palmonas offers gold plated demi fine jewellery made for everyday wear.",
  },

  /* --------------------------------------------------------- WATCHES */
  helios: {
    tagline: "Watches From Leading Brands",
    description:
      "Helios is Titan's multi brand watch store, with watches from Indian and international brands under one roof.",
  },
  seiko: {
    tagline: "Moving Ahead. Touching Hearts.",
    description:
      "Seiko has been making watches in Japan since 1881, with automatic, solar and quartz watches for men and women.",
  },
  tissot: {
    tagline: "Innovators By Tradition",
    description:
      "Tissot has been making Swiss watches since 1853, with classic, sports and smart watches for men and women.",
  },
  "tissot-mbo": {
    tagline: "Innovators By Tradition",
    description:
      "Swiss watches from Tissot, with classic, sports and smart models for men and women.",
  },

  /* --------------------------------------------------------- EYEWEAR */
  runway: {
    tagline: "House Of Titan",
    description:
      "Runway is Titan's multi brand eyewear store, with frames, sunglasses and lenses from Indian and international brands.",
  },
  "titan-eye-plus": {
    tagline: "Eyewear And Eye Tests",
    description:
      "Titan Eye+ offers eye tests, prescription glasses, sunglasses and contact lenses, with frames from Titan, Fastrack and more.",
  },

  /* --------------------------------------------------- BEAUTY & SKIN */
  "bath-and-body-works": {
    tagline: "Fragrance For Body And Home",
    description:
      "Bath & Body Works offers fragrant body care, hand soaps and home fragrance, including its well known candles.",
  },
  "forest-essentials": {
    tagline: "Luxurious Ayurveda",
    description:
      "Forest Essentials offers luxury Ayurvedic skincare, haircare and body care, made with natural ingredients.",
  },
  "new-u": {
    tagline: "Beauty And Personal Care",
    description:
      "New U is a beauty store with skincare, haircare, makeup and fragrance from a wide range of brands.",
  },
  "nykaa-luxe": {
    tagline: "Luxury Beauty",
    description:
      "Nykaa Luxe brings luxury makeup, skincare and fragrance from international brands.",
  },
  skinbae: {
    tagline: "Skincare",
    description:
      "SkinBae offers skincare products for everyday routines.",
  },

  /* ----------------------------------------------------------- SALON */
  "geetanjali-salon": {
    tagline: "Hair, Skin And Beauty",
    description:
      "Geetanjali Salon offers hair, skin, nail and bridal services for men and women.",
  },

  /* ------------------------------------------------------------ KIDS */
  babyshop: {
    tagline: "Kidswear And Baby Essentials",
    description:
      "Babyshop offers clothing, footwear and essentials for babies and kids.",
  },
  aretto: {
    tagline: "Kids' Footwear",
    description:
      "Aretto makes shoes for kids, designed to adjust as little feet grow.",
  },

  /* ------------------------------------------------ HOME & LIFESTYLE */
  frido: {
    tagline: "Everyday Comfort",
    description:
      "Frido offers comfort products like cushions, insoles and supports, designed to ease everyday aches.",
  },
  happynest: {
    tagline: "Home Essentials",
    description:
      "HappyNest offers everyday home products, from kitchen and storage to decor.",
  },
  market99: {
    tagline: "Home And Lifestyle Essentials",
    description:
      "Market99 offers affordable home and lifestyle products, from kitchenware and storage to decor and gifts.",
  },
  miniso: {
    tagline: "Life Is For Fun",
    description:
      "MINISO is a lifestyle store with affordable home goods, beauty products, stationery, toys and gifts.",
  },
  "mr-diy": {
    tagline: "Always Low Prices",
    description:
      "MR. D.I.Y. offers home improvement and household products at low prices, from tools and hardware to kitchen and cleaning supplies.",
  },
  "the-sleep-company": {
    tagline: "Mattresses And Sleep Essentials",
    description:
      "The Sleep Company offers mattresses, pillows and ergonomic chairs made with its SmartGRID comfort technology.",
  },
  wakefit: {
    tagline: "Mattresses And Furniture",
    description:
      "Wakefit offers mattresses, pillows and furniture for the bedroom, living room and home office.",
  },

  /* ------------------------------------------------------------ BAGS */
  "american-tourister": {
    tagline: "Travel Luggage",
    description:
      "American Tourister offers colourful, durable luggage, backpacks and travel accessories.",
  },
  hidesign: {
    tagline: "Leather Bags And Accessories",
    description:
      "Hidesign offers leather bags, wallets, belts and accessories for men and women.",
  },
  safari: {
    tagline: "Luggage And Backpacks",
    description:
      "Safari offers luggage, backpacks and travel accessories for trips of every length.",
  },
  samsonite: {
    tagline: "Luggage Since 1910",
    description:
      "Samsonite offers luggage, business bags and travel accessories built to last.",
  },

  /* -------------------------------------------- MOBILE & ELECTRONICS */
  samsung: {
    tagline: "Do What You Can't",
    description:
      "Samsung brings its smartphones, tablets, watches and earbuds, with the latest Galaxy devices to try in store.",
  },
  vivo: {
    tagline: "Camera And Music",
    description:
      "vivo offers smartphones and accessories, with the latest models to try in store.",
  },

  /* ---------------------------------------------- BOOKS & STATIONERY */
  "om-book-shop": {
    tagline: "Books And Stationery",
    description:
      "Om Book Shop offers books for all ages, from bestsellers and fiction to children's books, along with stationery and gifts.",
  },

  /* -------------------------------------------------------- LINGERIE */
  "nykd-by-nykaa": {
    tagline: "Lingerie And Loungewear",
    description:
      "Nykd by Nykaa offers lingerie, sleepwear and loungewear designed for everyday comfort.",
  },

  /* ------------------------------------------------------ FOOD COURT */
  "amritsari-express": {
    tagline: "Amritsari Food",
    description:
      "Amritsari Express serves Punjabi favourites from Amritsar, including kulchas, chole and lassi.",
  },
  "burger-king": {
    tagline: "Have It Your Way",
    description:
      "Burger King serves flame grilled burgers, including the Whopper, along with fries, wraps and shakes.",
  },
  "cafe-chennai": {
    tagline: "South Indian Food",
    description:
      "Café Chennai serves South Indian favourites like dosas, idlis and vadas, with filter coffee.",
  },
  "giani-ice-cream": {
    tagline: "Since 1956",
    description:
      "Giani's has been making ice cream since 1956, with scoops, sundaes and shakes.",
  },
  haldirams: {
    tagline: "Sweets And Snacks Since 1937",
    description:
      "Haldiram's serves Indian sweets, snacks and meals, from chaat to thalis.",
  },
  "house-of-candy": {
    tagline: "Candy And Confectionery",
    description:
      "House of Candy offers gummies, chocolates and sweets, with pick and mix sold by weight.",
  },
  keventers: {
    tagline: "Milkshakes Since 1925",
    description:
      "Keventers has been serving milkshakes since 1925 and is known for its classic glass bottles.",
  },
  kfc: {
    tagline: "It's Finger Lickin' Good",
    description:
      "KFC serves its signature fried chicken, along with burgers, wings and sides.",
  },
  "taco-bell": {
    tagline: "Live Más",
    description:
      "Taco Bell serves Mexican inspired food, including tacos, burritos, quesadillas and nachos.",
  },
  "the-indian-stories": {
    tagline: "Indian Food",
    description:
      "The Indian Stories serves food from different regions of India, with thalis, rice bowls and more.",
  },
  toniq: {
    tagline: "Food And Drinks",
    description:
      "Toniq serves mocktails, coolers and quick bites.",
  },
  "wow-china": {
    tagline: "Indo Chinese Food",
    description:
      "Wow! China serves Indo Chinese favourites, from noodles and fried rice to Manchurian.",
  },
  "wow-kulfi": {
    tagline: "Kulfi And Desserts",
    description:
      "Wow! Kulfi serves traditional kulfi in a range of flavours.",
  },
  "wow-momo": {
    tagline: "Momos And More",
    description:
      "Wow! Momo serves steamed, fried and pan fried momos, in veg and non veg options.",
  },

  /* ------------------------------------------------------ RESTAURANT */
  nandos: {
    tagline: "Flame Grilled PERi-PERi Chicken",
    description:
      "Nando's serves flame grilled PERi-PERi chicken, with spice levels from mild to extra hot, along with wraps, burgers and sides.",
  },
  "punjab-grill": {
    tagline: "North Indian Dining",
    description:
      "Punjab Grill is a sit down restaurant serving North Indian food, with kebabs, curries and breads from the tandoor.",
  },
  "rajwada-bhog": {
    tagline: "Kathiawadi Thali Delight",
    description:
      "Rajwada Bhog serves traditional Kathiawadi thalis from Gujarat.",
  },

  /* ------------------------------------------------------------ CAFÉ */
  "blue-tokai": {
    tagline: "Coffee Roasters",
    description:
      "Blue Tokai is an Indian specialty coffee roaster, serving coffee made from beans grown on Indian farms.",
  },
  chaayos: {
    tagline: "Meri Wali Chai",
    description:
      "Chaayos serves freshly made chai, customised the way you like it, along with snacks.",
  },
  "third-wave-coffee": {
    tagline: "Specialty Coffee",
    description:
      "Third Wave Coffee serves specialty coffee, along with bakes and light meals.",
  },

  /* --------------------------------------------------- ENTERTAINMENT */
  cinepolis: {
    tagline: "Movies On The Big Screen",
    description:
      "Cinépolis shows the latest films on the big screen.",
  },
  "fun-block": {
    tagline: "Soft Play For Kids",
    description:
      "Fun Block is a soft play area for younger children, with climbing and play zones.",
  },
  funcity: {
    tagline: "Family Entertainment",
    description:
      "FunCity is a family entertainment centre with rides and arcade games for kids and teens.",
  },
  "game-x": {
    tagline: "Arcade Gaming",
    description:
      "Game X is an arcade with racing, shooting and multiplayer games.",
  },
};
