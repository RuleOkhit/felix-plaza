// ---------------------------------------------------------------------------
// STORE COPY
//
// One entry per store, keyed by the slug in store-directory.ts.
//
//   tagline      Short line shown under the description. Where a brand has a
//                well known line of its own it is used; otherwise it is a
//                plain descriptor written for Felix Plaza.
//   description  Two or three sentences. Written to be read by a shopper
//                deciding whether to walk over, so it says what is actually
//                in the store rather than restating the category.
//
// House style: plain words, no em dashes, no marketing filler.
// ---------------------------------------------------------------------------

export type StoreCopy = { tagline: string; description: string };

export const STORE_COPY: Record<string, StoreCopy> = {
  /* ---------------------------------------------------------- APPAREL */
  arrow: {
    tagline: "An American Original Since 1851",
    description:
      "Arrow has been making dress shirts since 1851 and still builds its collection around them. Expect crisp formals, structured blazers and knitwear that works under a jacket, with slim and tailored fits alongside the regular cut. A sensible first stop when you need something sharp for Monday morning.",
  },
  blackberrys: {
    tagline: "Tailoring, Sharpened",
    description:
      "Blackberrys builds Indian menswear around fit, so the suits, blazers and trousers here are cut closer than most. The store carries formal and semi formal ranges together, which makes it easy to put a whole look together in one visit. Staff will handle basic alterations for you.",
  },
  "bonkers-corner": {
    tagline: "Oversized, Loud, Unbothered",
    description:
      "Bonkers Corner does graphic streetwear with a sense of humour, heavy on oversized tees, hoodies and co ord sets. Prints change often and drops move quickly, so the rack rarely looks the same twice. Popular with anyone shopping for something their parents would question.",
  },
  "calvin-klein": {
    tagline: "Modern Minimal Since 1968",
    description:
      "Calvin Klein keeps its lines clean and its palette narrow, which is exactly why people come back to it. The store carries denim, underwear and everyday essentials alongside the logo pieces the brand is known for. Good for building a wardrobe that does not shout.",
  },
  "go-colors": {
    tagline: "Bottoms, In Every Colour",
    description:
      "Go Colors does one thing properly, which is womens bottom wear, and carries it in a colour range no one else bothers with. Leggings, palazzos, jeggings and churidars come in regular and plus sizes across the same shades. Handy when you need a specific colour to match something you already own.",
  },
  "h-and-m": {
    tagline: "Fashion And Quality At The Best Price",
    description:
      "H&M covers womens, mens, kids and home in a single run of the floor. Collections turn over constantly, so it rewards a quick walk through even when you are not shopping for anything in particular. The basics section is where most people end up.",
  },
  "jack-and-jones": {
    tagline: "Danish Denim Since 1990",
    description:
      "Jack & Jones is built on jeans, and the wall of fits here is the reason to visit. Beyond denim there are shirts, jackets and knitwear cut for a younger, slimmer silhouette. Ask about the fit names if you are unsure, they are more useful than the size label.",
  },
  levis: {
    tagline: "Quality Never Goes Out Of Style",
    description:
      "Levi's has been making jeans since 1873 and the store still organises itself around fit rather than trend. Trucker jackets, tees and the full denim range are all here, with staff who can tell which fit you actually want before you have finished describing it. Worth it for a pair that lasts years.",
  },
  lifestyle: {
    tagline: "Your Style, Your Store",
    description:
      "Lifestyle works as a department store, so clothing, footwear, beauty and accessories are all covered without leaving the shop. Own labels sit next to national brands at most price points. The largest single store at Felix Plaza and a good place to start if you are not sure what you want.",
  },
  "louis-philippe": {
    tagline: "The Upper Crest",
    description:
      "Louis Philippe sits at the formal end of Indian menswear, with suits, blazers and shirts finished more carefully than the price suggests. The permanent press shirts are the quiet favourite here. Come for a wedding outfit or an interview and you will leave sorted.",
  },
  madame: {
    tagline: "Dressed For The Moment",
    description:
      "Madame does womens fashion that leans occasion ready, with dresses, co ords and going out tops making up most of the floor. Styles move with the season rather than sitting as permanent stock. Easy place to find something for an evening you did not plan for.",
  },
  "marks-and-spencer": {
    tagline: "Quality Worth Every Penny",
    description:
      "Marks & Spencer is the place people go for things they intend to keep, which mostly means shirts, knitwear, lingerie and school wear. Sizing runs true and the fabric quality is consistent across seasons. The lingerie fitting service is genuinely worth using.",
  },
  max: {
    tagline: "Look Good, Feel Good",
    description:
      "Max covers the whole family at prices that let you buy more than one thing. Womens, mens and kids sit together on one floor, with a large kids section at the back. Reliable for wardrobe filling rather than statement pieces.",
  },
  only: {
    tagline: "Danish Design, Worn Every Day",
    description:
      "Only is denim first womenswear from the same Danish house as Jack & Jones. Jeans in a wide fit range sit alongside tops, dresses and outerwear that are meant to be worn with them. Sizing is European, so try before you commit.",
  },
  "pepe-jeans": {
    tagline: "London Since 1973",
    description:
      "Pepe Jeans came out of Portobello Road and still carries that slightly scruffy London feel. Denim leads, with tees, shirts and jackets built around it for both men and women. Fits run younger and closer than most Indian denim brands.",
  },
  "r-and-b": {
    tagline: "Love It. Wear It.",
    description:
      "R&B is a family fashion store, so womens, mens, kids and accessories all share the floor. Prices sit low enough that it works for a full seasonal refresh rather than a single buy. The accessories wall near the till is better stocked than most.",
  },
  "rare-rabbit": {
    tagline: "Considered Menswear",
    description:
      "Rare Rabbit puts more thought into fabric and construction than the price point usually allows, which is why it has built a following. Shirts, overshirts and relaxed trousers make up the core. Come here if you have outgrown fast fashion but are not ready for a suit.",
  },
  rareism: {
    tagline: "Rare Rabbit, For Her",
    description:
      "Rareism is the womenswear line from the same house as Rare Rabbit and carries the same attention to cut and cloth. Expect relaxed silhouettes, muted colour and separates designed to be worn together. Quiet, wearable, not especially trend led.",
  },
  snitch: {
    tagline: "New Drops Every Week",
    description:
      "Snitch built its name online with a fast release cycle and brings the same rhythm to the store. Mens shirts, tees and trousers land in small runs and rarely return once they sell through. Check back often if you like something and want a second one.",
  },
  "style-union": {
    tagline: "Everyday Fashion, Every Day",
    description:
      "Style Union covers casual everyday wear for men and women without much ceremony. Tees, denim, shirts and layering pieces sit at approachable prices. Straightforward stop on the Concourse when you need a top for tonight.",
  },
  "sweet-dreams": {
    tagline: "Loungewear Made For Lounging",
    description:
      "Sweet Dreams does nightwear and loungewear properly, in cotton that survives washing. Pyjama sets, shorts and robes come for men, women and kids. The kind of shop you visit once and then keep returning to for gifting.",
  },
  "the-bear-house": {
    tagline: "Menswear With A Point Of View",
    description:
      "The Bear House makes mens shirts and casualwear with a bit more character than the high street, often in prints and textures you will not see elsewhere. Fits are slim and modern. Good for a shirt that reads as deliberate rather than default.",
  },
  "tommy-hilfiger": {
    tagline: "Classic American Cool",
    description:
      "Tommy Hilfiger has been doing preppy American sportswear since 1985 and the red, white and blue flag still runs through everything. Polos, chinos, oxford shirts and outerwear for men and women fill the floor. Dependable for pieces that will still look right years from now.",
  },
  "us-polo-assn": {
    tagline: "The Official Brand Of The USPA",
    description:
      "U.S. Polo Assn. is the licensed brand of the United States Polo Association, and the sport shows up honestly in the cut of the polos and knits. Mens, womens and kids ranges all sit here. Solid smart casual without formal stiffness.",
  },
  "van-heusen": {
    tagline: "Dressed For Business",
    description:
      "Van Heusen focuses on workwear, with shirts, trousers and blazers built for people who wear them all week. Wrinkle resistant and stretch fabrics feature heavily. The womens formal range is stronger here than at most menswear led brands.",
  },
  "vero-moda": {
    tagline: "Danish Design, Made Simple",
    description:
      "Vero Moda does contemporary womenswear with a Scandinavian eye, so silhouettes stay clean and colour stays restrained. Dresses, denim and outerwear form the backbone. Sizing is European and runs slightly small.",
  },
  westside: {
    tagline: "Fashion, With A Tata Name",
    description:
      "Westside runs on its own labels, which means you will not find the same pieces in the next store along. Clothing, footwear, beauty and home all sit under one roof, with a strong womenswear floor. The home section is genuinely worth a look.",
  },
  zudio: {
    tagline: "Fashion At Prices You Will Not Believe",
    description:
      "Zudio keeps almost everything under a few hundred rupees and moves stock fast to do it. Womens, mens and kids all share the floor, along with beauty and small accessories. Come early in the week if you want size options.",
  },

  /* ------------------------------------------------------ ETHNIC WEAR */
  "barara-ethnic": {
    tagline: "Made For The Occasion",
    description:
      "Barara Ethnic deals in occasion wear, which means lehengas, sherwanis and heavily worked suits rather than daily kurtas. Pieces are built for weddings and family functions where photographs matter. Allow time, this is not a quick in and out shop.",
  },
  biba: {
    tagline: "Indian Wear, Every Day",
    description:
      "Biba made everyday Indian wear a category and still does it better than most. Kurtas, suit sets and palazzos come in prints that work for office as easily as for a festival. Sizing is consistent, so once you know yours you can buy quickly.",
  },
  devo: {
    tagline: "Made Of India",
    description:
      "Devo works with Indian textiles and craft traditions across its menswear and ethnic ranges. Kurtas, bandhgalas and jackets sit alongside more relaxed fusion pieces. A good middle ground if full traditional feels like too much.",
  },
  libas: {
    tagline: "Effortless Ethnic",
    description:
      "Libas does Indian wear that you can put on without planning around it, mostly cotton and rayon kurtas, sets and dupattas. Prints refresh regularly and prices stay reasonable. The everyday half of your ethnic wardrobe lives here.",
  },
  "meena-bazaar": {
    tagline: "For Weddings And The Years After",
    description:
      "Meena Bazaar has been dressing families for weddings for decades and the store reflects that, with heavy lehengas and sarees alongside lighter suit sets. Embroidery and fabric quality are the reason people come back generation after generation. Staff know how to work to a budget.",
  },
  sabhyata: {
    tagline: "Kurtas With A Classical Soul",
    description:
      "Sabhyata leans traditional, with kurtas and suit sets that borrow from classical Indian silhouettes rather than fusion trends. Fabrics run to chanderi, silk blends and cotton. Understated enough for work, dressy enough for a family evening.",
  },
  tasva: {
    tagline: "Tarun Tahiliani, For Every Man",
    description:
      "Tasva is Tarun Tahiliani working with Aditya Birla Fashion to bring designer sensibility to accessible mens ethnic wear. Kurta sets, bandhgalas and sherwanis are cut with real attention to drape. Made to measure options are available if you are shopping for a wedding.",
  },

  /* --------------------------------------------------------- FOOTWEAR */
  aldo: {
    tagline: "Love The Shoes You Are In",
    description:
      "Aldo does going out footwear for men and women, heavy on heels, boots and dress shoes with a bit of shine. Bags and small accessories share the floor. Where you go when the outfit is sorted and the shoes are not.",
  },
  birkenstock: {
    tagline: "Footbeds Since 1774",
    description:
      "Birkenstock has been building its cork footbed since 1774 and the shape is the entire point, moulding to your foot over the first few weeks. Arizona, Boston and Gizeh anchor the range in leather, suede and EVA. Buy the size the staff measure you for, not the one you expect.",
  },
  crocs: {
    tagline: "Come As You Are",
    description:
      "Crocs are comfortable, washable and impossible to argue about, which is why the store is always busy. Classic clogs and sandals come in the full colour range, plus the Jibbitz charms wall for personalising them. Kids sizes are well stocked.",
  },
  inc5: {
    tagline: "Shoes. Bags. Accessories. Attitude.",
    description:
      "INC.5 does womens footwear across the whole range, from office block heels to party stilettos to everyday flats. Bags and belts sit alongside so you can match without a second stop. Comfort linings are better than the heel height suggests.",
  },
  mochi: {
    tagline: "Shoes And Accessories",
    description:
      "Mochi carries footwear for men and women across formal, casual and occasion, with a wide range of styles for the space. Leather formals and loafers are the strong suit. Staff are quick with sizing and will bring options without being asked twice.",
  },

  /* ------------------------------------------------------- SPORTSWEAR */
  adidas: {
    tagline: "Impossible Is Nothing",
    description:
      "Adidas covers running, training and everyday wear in one store, with footwear along one wall and apparel through the rest. Ultraboost and Adizero sit on the performance side, Originals classics like Samba and Superstar on the other. Staff will talk you through cushioning and drop if you are buying for a distance you have not run before.",
  },
  asics: {
    tagline: "Sound Mind, Sound Body",
    description:
      "ASICS is a runners shop first, and the wall of Gel cushioned models is the reason to come. Gel Nimbus, Kayano and Novablast cover neutral through support, with staff who understand the difference. Also worth a look for court shoes if you play badminton or tennis.",
  },
  puma: {
    tagline: "Forever Faster",
    description:
      "Puma sits between sport and street, so training gear shares the floor with lifestyle sneakers and football kit. Suede and RS silhouettes are the long running favourites. Cricket and football fans will find team merchandise here through the season.",
  },
  skechers: {
    tagline: "Comfort, Engineered",
    description:
      "Skechers built its name on cushioning, and the memory foam and Arch Fit ranges are what most people walk out with. Walking shoes, slip ins and work footwear cover the range for men and women. A sensible option if you are on your feet all day.",
  },

  /* -------------------------------------------------------- JEWELLERY */
  bluestone: {
    tagline: "Designed Online, Tried On Here",
    description:
      "BlueStone started online and the store lets you handle the pieces before deciding, which matters with jewellery. Rings, pendants and everyday gold sit alongside solitaires. Custom design and resizing are handled in store.",
  },
  caratlane: {
    tagline: "A Tanishq Partnership",
    description:
      "CaratLane makes gold and diamond jewellery light enough to wear on a normal day rather than save for occasions. Everyday chains, studs and stackable rings form the bulk of the range. The Tanishq partnership means certification and buyback are straightforward.",
  },
  ethera: {
    tagline: "Fine Jewellery, Everyday Ease",
    description:
      "Ethera works in fine jewellery designed for regular wear, with clean settings and restrained stone work. Pieces are made to layer rather than dominate. Worth browsing if you want something quieter than traditional bridal gold.",
  },
  giva: {
    tagline: "Silver, Worn Every Day",
    description:
      "GIVA does sterling silver and lab grown diamond jewellery at prices that make it easy to own several pieces. Anti tarnish coating means they survive daily wear. A dependable stop for gifting when you do not want to commit to gold.",
  },
  limelight: {
    tagline: "Lab Grown CVD Diamonds",
    description:
      "Limelight sells lab grown CVD diamonds, chemically identical to mined stones at a fraction of the price. Solitaires, studs and bridal sets come with certification. Staff are happy to explain the difference properly rather than glossing over it.",
  },
  palmonas: {
    tagline: "Demi Fine, Anti Tarnish",
    description:
      "Palmonas sits in the demi fine space, gold plated over sterling silver with anti tarnish finishing. Layering chains, hoops and rings dominate the range. Priced for buying a handful at once rather than agonising over one.",
  },

  /* ---------------------------------------------------------- WATCHES */
  helios: {
    tagline: "Many Brands, One Counter",
    description:
      "Helios is a multi brand watch store, so you can compare across houses without walking the mall. International and Indian names sit together across price bands. The place to start if you know your budget but not your brand.",
  },
  tissot: {
    tagline: "Innovators By Tradition",
    description:
      "Tissot has been making Swiss watches in Le Locle since 1853 and still prices them within reach. The PRX, Seastar and T Touch lines cover dress, dive and connected. Servicing and strap changes are handled in store.",
  },
  "tissot-mbo": {
    tagline: "The Full Tissot Collection",
    description:
      "The Tissot mono brand outlet carries the collection in more depth than a multi brand counter allows, including references that are hard to find elsewhere in the city. Staff know the movements properly. Worth the visit if you have a specific model in mind.",
  },

  /* ---------------------------------------------------------- EYEWEAR */
  runway: {
    tagline: "House Of Titan",
    description:
      "Runway is the multi brand eyewear format from Titan, stocking international and Indian frames side by side. Prescription lenses, sunglasses and contact lenses are all handled here. On site eye testing means you can sort the whole thing in one visit.",
  },

  /* --------------------------------------------------- BEAUTY & SKIN */
  "bath-and-body-works": {
    tagline: "Fragrance For Hands And Home",
    description:
      "Bath & Body Works is built around scent, with candles, body care and hand soaps rotating through seasonal collections. The candles are the reason most people walk in and the reason they leave with a bag. Testers are out, so smell before you buy.",
  },
  "forest-essentials": {
    tagline: "Luxurious Ayurveda",
    description:
      "Forest Essentials makes ayurvedic skincare with the finish and packaging of a luxury house. Facial ubtans, oils and the Mashobra honey range are long standing favourites. Staff will build a routine for your skin if you ask.",
  },
  "new-u": {
    tagline: "Beauty, All Under One Roof",
    description:
      "New U is Dabur's multi brand beauty format, carrying skincare, haircare, fragrance and makeup from a wide spread of names. Useful when you want to compare brands side by side. Sits on the Concourse, so easy to reach on the way in.",
  },
  "nykaa-luxe": {
    tagline: "Luxury Beauty, In Person",
    description:
      "Nykaa Luxe carries the premium end of the Nykaa range, which means international makeup and skincare houses you would otherwise buy blind online. Testers are available across most counters. Come here to shade match properly.",
  },
  skinbae: {
    tagline: "Skin Before Anything Else",
    description:
      "SkinBae focuses on actives and ingredient led skincare rather than heavy makeup. Serums, sunscreens and barrier repair products make up most of the shelf. Staff will steer you away from stacking things that should not go together.",
  },

  /* ------------------------------------------------------------ SALON */
  "geetanjali-salon": {
    tagline: "Hair, Skin, And An Afternoon To Yourself",
    description:
      "Geetanjali Salon covers hair, skin, nails and bridal across a full service floor. Appointments are advisable at weekends, though walk ins are usually managed. Bridal packages are booked well in advance, so plan ahead.",
  },

  /* ------------------------------------------------------------- KIDS */
  babyshop: {
    tagline: "Everything For The Under Tens",
    description:
      "Babyshop covers newborn through early childhood in one place, clothing, nursery, feeding and toys included. Sizing runs by age and is reliable. The gifting section near the front saves time when you are invited to a first birthday.",
  },
  aretto: {
    tagline: "Shoes That Grow",
    description:
      "Aretto makes childrens shoes that expand as feet grow, which solves the problem of outgrowing a pair mid season. Designs are light and school appropriate. Bring the child, the fitting matters more than usual here.",
  },

  /* -------------------------------------------------- HOME & LIFESTYLE */
  frido: {
    tagline: "Sit Better, Feel Better",
    description:
      "Frido makes ergonomic cushions, insoles and support products for people who sit or stand too long. Wedge cushions and back supports are the best sellers. Try them in store, the difference is obvious within a minute.",
  },
  happynest: {
    tagline: "Home Essentials, Sorted",
    description:
      "HappyNest covers everyday home goods, from kitchen and storage to soft furnishing and decor. Prices are set for stocking up rather than splurging. Convenient Concourse stop when you are already carrying bags.",
  },
  market99: {
    tagline: "Everything You Forgot You Needed",
    description:
      "Market99 is a value store for household items, kitchenware, organisers and small decor, most of it priced to be bought without thinking. Stock changes constantly, so treat it as a browse rather than a list. On the third floor next to the food court.",
  },
  miniso: {
    tagline: "Life Is For Fun",
    description:
      "Miniso does Japanese inspired lifestyle goods, stationery, small electronics, soft toys and beauty accessories at low prices. Licensed character collections rotate through the year and sell out fast. Reliably good for last minute gifts.",
  },
  "mr-diy": {
    tagline: "Always Low Prices",
    description:
      "MR.D.I.Y. stocks household and hardware goods across just about every category, from tools and electricals to stationery and party supplies. If something in the house has broken, it is probably fixable with a trip here. Concourse level, near the entrance.",
  },
  "the-sleep-company": {
    tagline: "Sleep On SmartGRID",
    description:
      "The Sleep Company builds mattresses around its SmartGRID technology, which adapts to your body without the sink of memory foam. Mattresses, pillows and ergonomic chairs are all on the floor to try. Lie down properly for a while, the staff expect it.",
  },
  wakefit: {
    tagline: "Sleep, Solved",
    description:
      "Wakefit sells mattresses, pillows and bedroom furniture direct, which keeps prices honest. Orthopaedic and dual comfort mattresses are the core range. Delivery and trial terms are explained clearly in store.",
  },

  /* -------------------------------------------------------------- BAGS */
  "american-tourister": {
    tagline: "Travel Light, Travel Loud",
    description:
      "American Tourister does colourful, hard wearing luggage at prices that do not hurt when a trolley gets scuffed. Cabin, check in and backpack ranges cover most trips. Warranty is handled through the store.",
  },
  hidesign: {
    tagline: "Leather, Made By Hand",
    description:
      "Hidesign works in vegetable tanned leather, hand finished, with hardware built to outlast the bag. Work totes, satchels and wallets make up the range for men and women. The leather darkens with use, which is the point.",
  },
  safari: {
    tagline: "Built To Take It",
    description:
      "Safari makes luggage designed to survive Indian travel, with polycarbonate hard cases and reinforced trolleys. Cabin sizes meet domestic airline limits. Good value when you need something that will last more than a couple of trips.",
  },
  samsonite: {
    tagline: "Engineered For The Journey",
    description:
      "Samsonite sits at the premium end of luggage and it shows in the wheels, zips and shell construction. Cabin, check in and business ranges are all stocked. Worth the difference if you fly often.",
  },

  /* --------------------------------------------- MOBILE & ELECTRONICS */
  samsung: {
    tagline: "Do What You Can't",
    description:
      "The Samsung store covers the full ecosystem, Galaxy phones, tablets, watches and audio, with everything set up to try. Staff will transfer data from an old handset before you leave. Exchange and finance options are handled in store.",
  },
  vivo: {
    tagline: "Camera And Music",
    description:
      "vivo builds its phones around camera performance, and the store is set up so you can shoot and compare before deciding. The full current lineup is on display with accessories alongside. Service queries are handled at the counter.",
  },

  /* ------------------------------------------------ BOOKS & STATIONERY */
  "om-book-shop": {
    tagline: "Where Words Create Worlds",
    description:
      "Om Book Shop carries fiction, non fiction, childrens books and stationery across a properly browsable floor. The childrens section is large enough to lose half an hour in. Staff will order titles they do not have on the shelf.",
  },

  /* ---------------------------------------------------------- LINGERIE */
  "nykd-by-nykaa": {
    tagline: "Comfort, Designed In",
    description:
      "Nykd by Nykaa makes lingerie and everyday intimates with comfort as the starting point rather than an afterthought. Wire free bras, cotton briefs and loungewear form the core. Fitting help is available and worth taking.",
  },

  /* -------------------------------------------------------- FOOD COURT */
  "amritsari-express": {
    tagline: "Amritsar, On A Plate",
    description:
      "Amritsari Express does Punjabi food the way it is eaten in Amritsar, kulchas, chole and lassi included. Portions are generous and the kulchas come out hot. Third floor food court, worth the queue at lunch.",
  },
  "burger-king": {
    tagline: "Have It Your Way",
    description:
      "Burger King flame grills its patties, which is the whole argument for choosing it. The Whopper anchors the menu alongside chicken, veg and paneer options. Third floor, with a good run of vegetarian choices for a burger chain.",
  },
  "cafe-chennai": {
    tagline: "Dosa, Filter Coffee, Repeat",
    description:
      "Café Chennai serves South Indian staples through the day, dosas, idlis, vadas and proper filter coffee. Breakfast items stay on the menu until closing, which is the correct approach. Quick service even when the food court is full.",
  },
  "giani-ice-cream": {
    tagline: "Since 1956",
    description:
      "Giani has been making ice cream in Delhi since 1956 and still leads with the thick, dense scoops it built its name on. Sundaes, shakes and falooda round out the menu. The rabri based flavours are the ones regulars order.",
  },
  haldirams: {
    tagline: "Sweets And Snacks Since 1937",
    description:
      "Haldiram's covers chaat, thalis, South Indian and a full sweets counter in one outlet. The namkeen and mithai boxes make it a standard stop before visiting anyone. Busy at every hour, though the counter moves quickly.",
  },
  "house-of-candy": {
    tagline: "Pick And Mix, By The Scoop",
    description:
      "House of Candy is a self serve confectionery wall, gummies, chocolates and sours sold by weight. Children treat it as the main attraction of the third floor. Bags are priced by what you fill, so pace yourself.",
  },
  keventers: {
    tagline: "Milkshakes Since 1925",
    description:
      "Keventers has been making thick milkshakes since 1925 and still serves them in the glass bottle. Classic flavours sit alongside seasonal ones. The bottle is yours to keep, which explains a lot of kitchen shelves in Delhi.",
  },
  kfc: {
    tagline: "It's Finger Lickin' Good",
    description:
      "KFC does its Original Recipe chicken alongside burgers, wraps and rice bowls. Buckets are sized for sharing, which is how most tables here order. Third floor, with vegetarian options on the same menu.",
  },
  "taco-bell": {
    tagline: "Live Más",
    description:
      "Taco Bell serves Tex Mex built around tacos, burritos and quesadillas, with a strong vegetarian side of the menu. Build your own options let you set the spice level. Third floor, quick even at peak.",
  },
  "the-indian-stories": {
    tagline: "Regional Plates, One Counter",
    description:
      "The Indian Stories moves across regional Indian cooking rather than sticking to one state, so the menu covers more ground than most food court counters. Thalis and rice plates are the easiest way in. Good option when the table cannot agree.",
  },
  toniq: {
    tagline: "Dry Bar And Kitchen",
    description:
      "Toniq is a dry bar and kitchen, so the drinks list of mocktails and coolers gets as much attention as the food. Small plates and quick meals fill out the menu. A calmer place to sit than the main food court run.",
  },
  "wow-china": {
    tagline: "Desi Chinese, Done Right",
    description:
      "Wow! China serves Indian Chinese without apology, chilli paneer, hakka noodles and manchurian included. Portions are built for sharing and the spice is real. Third floor food court.",
  },
  "wow-kulfi": {
    tagline: "Kulfi, The Way It Should Be",
    description:
      "Wow! Kulfi keeps to traditional kulfi, dense and slow set rather than whipped. Malai, kesar pista and seasonal fruit flavours lead. A better end to a food court meal than the obvious options.",
  },
  "wow-momo": {
    tagline: "Momos, Every Which Way",
    description:
      "Wow! Momo does steamed, fried, tandoori and pan tossed momos across veg and chicken. The momo burger is exactly what it sounds like and has its defenders. Fast moving counter on the third floor.",
  },

  /* -------------------------------------------------------- RESTAURANT */
  "punjab-grill": {
    tagline: "Punjab, Plated With Care",
    description:
      "Punjab Grill is a proper sit down restaurant serving North Indian food with the finish of a fine dining kitchen. Kebabs, dal and breads from the tandoor are the reason to book. Second floor, and the only full service restaurant at Felix Plaza.",
  },

  /* -------------------------------------------------------------- CAFÉ */
  "blue-tokai": {
    tagline: "Roasted In India",
    description:
      "Blue Tokai roasts single estate Indian coffee and lists the farm on the bag. Espresso, pour over and cold brew are all made properly, with beans to take home. Ground floor, and the quietest place to sit with a laptop.",
  },
  chaayos: {
    tagline: "Meri Wali Chai",
    description:
      "Chaayos lets you specify your chai down to the strength, sweetness and add ins, which is the whole idea. Snacks, sandwiches and maggi round out the menu. First floor, and a reliable meeting point.",
  },
  "third-wave-coffee": {
    tagline: "Coffee, Taken Seriously",
    description:
      "Third Wave Coffee roasts its own beans and trains its baristas to match, so the flat whites and cold brews hold up. Bakes and sandwiches are made fresh through the day. First floor, with enough seating to actually stay a while.",
  },

  /* ----------------------------------------------------- ENTERTAINMENT */
  cinepolis: {
    tagline: "The Movies, Properly",
    description:
      "Cinépolis brings its full screen experience to the third floor, with recliner seating and a sound setup worth the ticket. New releases run across languages, and the in seat service means you do not miss a scene queueing. Book ahead for opening weekends.",
  },
  "fun-block": {
    tagline: "Play, Build, Repeat",
    description:
      "Fun Block is a soft play and activity zone built for younger children, with climbing, building and role play areas. Supervision is on hand and parents can sit within sight. Second floor, and a sensible way to buy yourself an hour.",
  },
  funcity: {
    tagline: "A Day Out For The Whole Family",
    description:
      "FunCity packs rides, soft play and arcade games into one floor, covering toddlers through teenagers. Prepaid cards work across the machines and can be topped up as you go. Third floor, and busiest at weekends.",
  },
  "game-x": {
    tagline: "Press Start",
    description:
      "Game X is the arcade proper, with racing rigs, shooters and multiplayer cabinets alongside redemption games. It runs later than most of the mall, so it works as an after dinner stop. Second floor, next to the cinema run.",
  },
};
