const COUNTRIES = [
  { code:"AF", name:"Afghanistan", flag:"🇦🇫", region:"Asia" },
  { code:"AL", name:"Albania", flag:"🇦🇱", region:"Europe" },
  { code:"DZ", name:"Algeria", flag:"🇩🇿", region:"Africa" },
  { code:"AR", name:"Argentina", flag:"🇦🇷", region:"Americas" },
  { code:"AM", name:"Armenia", flag:"🇦🇲", region:"Asia" },
  { code:"AU", name:"Australia", flag:"🇦🇺", region:"Oceania" },
  { code:"AT", name:"Austria", flag:"🇦🇹", region:"Europe" },
  { code:"AZ", name:"Azerbaijan", flag:"🇦🇿", region:"Asia" },
  { code:"BH", name:"Bahrain", flag:"🇧🇭", region:"Asia" },
  { code:"BD", name:"Bangladesh", flag:"🇧🇩", region:"Asia" },
  { code:"BY", name:"Belarus", flag:"🇧🇾", region:"Europe" },
  { code:"BE", name:"Belgium", flag:"🇧🇪", region:"Europe" },
  { code:"BZ", name:"Belize", flag:"🇧🇿", region:"Americas" },
  { code:"BO", name:"Bolivia", flag:"🇧🇴", region:"Americas" },
  { code:"BA", name:"Bosnia", flag:"🇧🇦", region:"Europe" },
  { code:"BR", name:"Brazil", flag:"🇧🇷", region:"Americas" },
  { code:"BN", name:"Brunei", flag:"🇧🇳", region:"Asia" },
  { code:"BG", name:"Bulgaria", flag:"🇧🇬", region:"Europe" },
  { code:"KH", name:"Cambodia", flag:"🇰🇭", region:"Asia" },
  { code:"CM", name:"Cameroon", flag:"🇨🇲", region:"Africa" },
  { code:"CA", name:"Canada", flag:"🇨🇦", region:"Americas" },
  { code:"CL", name:"Chile", flag:"🇨🇱", region:"Americas" },
  { code:"CN", name:"China", flag:"🇨🇳", region:"Asia" },
  { code:"CO", name:"Colombia", flag:"🇨🇴", region:"Americas" },
  { code:"CR", name:"Costa Rica", flag:"🇨🇷", region:"Americas" },
  { code:"HR", name:"Croatia", flag:"🇭🇷", region:"Europe" },
  { code:"CU", name:"Cuba", flag:"🇨🇺", region:"Americas" },
  { code:"CY", name:"Cyprus", flag:"🇨🇾", region:"Europe" },
  { code:"CZ", name:"Czech Republic", flag:"🇨🇿", region:"Europe" },
  { code:"DK", name:"Denmark", flag:"🇩🇰", region:"Europe" },
  { code:"DO", name:"Dominican Republic", flag:"🇩🇴", region:"Americas" },
  { code:"EC", name:"Ecuador", flag:"🇪🇨", region:"Americas" },
  { code:"EG", name:"Egypt", flag:"🇪🇬", region:"Africa" },
  { code:"SV", name:"El Salvador", flag:"🇸🇻", region:"Americas" },
  { code:"EE", name:"Estonia", flag:"🇪🇪", region:"Europe" },
  { code:"ET", name:"Ethiopia", flag:"🇪🇹", region:"Africa" },
  { code:"FI", name:"Finland", flag:"🇫🇮", region:"Europe" },
  { code:"FR", name:"France", flag:"🇫🇷", region:"Europe" },
  { code:"GE", name:"Georgia", flag:"🇬🇪", region:"Asia" },
  { code:"DE", name:"Germany", flag:"🇩🇪", region:"Europe" },
  { code:"GH", name:"Ghana", flag:"🇬🇭", region:"Africa" },
  { code:"GR", name:"Greece", flag:"🇬🇷", region:"Europe" },
  { code:"GT", name:"Guatemala", flag:"🇬🇹", region:"Americas" },
  { code:"HN", name:"Honduras", flag:"🇭🇳", region:"Americas" },
  { code:"HK", name:"Hong Kong", flag:"🇭🇰", region:"Asia" },
  { code:"HU", name:"Hungary", flag:"🇭🇺", region:"Europe" },
  { code:"IS", name:"Iceland", flag:"🇮🇸", region:"Europe" },
  { code:"IN", name:"India", flag:"🇮🇳", region:"Asia" },
  { code:"ID", name:"Indonesia", flag:"🇮🇩", region:"Asia" },
  { code:"IR", name:"Iran", flag:"🇮🇷", region:"Asia" },
  { code:"IQ", name:"Iraq", flag:"🇮🇶", region:"Asia" },
  { code:"IE", name:"Ireland", flag:"🇮🇪", region:"Europe" },
  { code:"IL", name:"Israel", flag:"🇮🇱", region:"Asia" },
  { code:"IT", name:"Italy", flag:"🇮🇹", region:"Europe" },
  { code:"JM", name:"Jamaica", flag:"🇯🇲", region:"Americas" },
  { code:"JP", name:"Japan", flag:"🇯🇵", region:"Asia" },
  { code:"JO", name:"Jordan", flag:"🇯🇴", region:"Asia" },
  { code:"KZ", name:"Kazakhstan", flag:"🇰🇿", region:"Asia" },
  { code:"KE", name:"Kenya", flag:"🇰🇪", region:"Africa" },
  { code:"KW", name:"Kuwait", flag:"🇰🇼", region:"Asia" },
  { code:"KG", name:"Kyrgyzstan", flag:"🇰🇬", region:"Asia" },
  { code:"LA", name:"Laos", flag:"🇱🇦", region:"Asia" },
  { code:"LV", name:"Latvia", flag:"🇱🇻", region:"Europe" },
  { code:"LB", name:"Lebanon", flag:"🇱🇧", region:"Asia" },
  { code:"LY", name:"Libya", flag:"🇱🇾", region:"Africa" },
  { code:"LI", name:"Liechtenstein", flag:"🇱🇮", region:"Europe" },
  { code:"LT", name:"Lithuania", flag:"🇱🇹", region:"Europe" },
  { code:"LU", name:"Luxembourg", flag:"🇱🇺", region:"Europe" },
  { code:"MO", name:"Macau", flag:"🇲🇴", region:"Asia" },
  { code:"MK", name:"North Macedonia", flag:"🇲🇰", region:"Europe" },
  { code:"MG", name:"Madagascar", flag:"🇲🇬", region:"Africa" },
  { code:"MY", name:"Malaysia", flag:"🇲🇾", region:"Asia" },
  { code:"MV", name:"Maldives", flag:"🇲🇻", region:"Asia" },
  { code:"ML", name:"Mali", flag:"🇲🇱", region:"Africa" },
  { code:"MT", name:"Malta", flag:"🇲🇹", region:"Europe" },
  { code:"MX", name:"Mexico", flag:"🇲🇽", region:"Americas" },
  { code:"MD", name:"Moldova", flag:"🇲🇩", region:"Europe" },
  { code:"MC", name:"Monaco", flag:"🇲🇨", region:"Europe" },
  { code:"MN", name:"Mongolia", flag:"🇲🇳", region:"Asia" },
  { code:"ME", name:"Montenegro", flag:"🇲🇪", region:"Europe" },
  { code:"MA", name:"Morocco", flag:"🇲🇦", region:"Africa" },
  { code:"MZ", name:"Mozambique", flag:"🇲🇿", region:"Africa" },
  { code:"MM", name:"Myanmar", flag:"🇲🇲", region:"Asia" },
  { code:"NP", name:"Nepal", flag:"🇳🇵", region:"Asia" },
  { code:"NL", name:"Netherlands", flag:"🇳🇱", region:"Europe" },
  { code:"NZ", name:"New Zealand", flag:"🇳🇿", region:"Oceania" },
  { code:"NI", name:"Nicaragua", flag:"🇳🇮", region:"Americas" },
  { code:"NG", name:"Nigeria", flag:"🇳🇬", region:"Africa" },
  { code:"NO", name:"Norway", flag:"🇳🇴", region:"Europe" },
  { code:"OM", name:"Oman", flag:"🇴🇲", region:"Asia" },
  { code:"PK", name:"Pakistan", flag:"🇵🇰", region:"Asia" },
  { code:"PA", name:"Panama", flag:"🇵🇦", region:"Americas" },
  { code:"PY", name:"Paraguay", flag:"🇵🇾", region:"Americas" },
  { code:"PE", name:"Peru", flag:"🇵🇪", region:"Americas" },
  { code:"PH", name:"Philippines", flag:"🇵🇭", region:"Asia" },
  { code:"PL", name:"Poland", flag:"🇵🇱", region:"Europe" },
  { code:"PT", name:"Portugal", flag:"🇵🇹", region:"Europe" },
  { code:"PR", name:"Puerto Rico", flag:"🇵🇷", region:"Americas" },
  { code:"QA", name:"Qatar", flag:"🇶🇦", region:"Asia" },
  { code:"RO", name:"Romania", flag:"🇷🇴", region:"Europe" },
  { code:"RU", name:"Russia", flag:"🇷🇺", region:"Europe" },
  { code:"RW", name:"Rwanda", flag:"🇷🇼", region:"Africa" },
  { code:"SA", name:"Saudi Arabia", flag:"🇸🇦", region:"Asia" },
  { code:"SN", name:"Senegal", flag:"🇸🇳", region:"Africa" },
  { code:"RS", name:"Serbia", flag:"🇷🇸", region:"Europe" },
  { code:"SG", name:"Singapore", flag:"🇸🇬", region:"Asia" },
  { code:"SK", name:"Slovakia", flag:"🇸🇰", region:"Europe" },
  { code:"SI", name:"Slovenia", flag:"🇸🇮", region:"Europe" },
  { code:"ZA", name:"South Africa", flag:"🇿🇦", region:"Africa" },
  { code:"KR", name:"South Korea", flag:"🇰🇷", region:"Asia" },
  { code:"ES", name:"Spain", flag:"🇪🇸", region:"Europe" },
  { code:"LK", name:"Sri Lanka", flag:"🇱🇰", region:"Asia" },
  { code:"SE", name:"Sweden", flag:"🇸🇪", region:"Europe" },
  { code:"CH", name:"Switzerland", flag:"🇨🇭", region:"Europe" },
  { code:"TW", name:"Taiwan", flag:"🇹🇼", region:"Asia" },
  { code:"TZ", name:"Tanzania", flag:"🇹🇿", region:"Africa" },
  { code:"TH", name:"Thailand", flag:"🇹🇭", region:"Asia" },
  { code:"TN", name:"Tunisia", flag:"🇹🇳", region:"Africa" },
  { code:"TR", name:"Turkey", flag:"🇹🇷", region:"Asia" },
  { code:"UG", name:"Uganda", flag:"🇺🇬", region:"Africa" },
  { code:"UA", name:"Ukraine", flag:"🇺🇦", region:"Europe" },
  { code:"AE", name:"United Arab Emirates", flag:"🇦🇪", region:"Asia" },
  { code:"GB", name:"United Kingdom", flag:"🇬🇧", region:"Europe" },
  { code:"US", name:"United States", flag:"🇺🇸", region:"Americas" },
  { code:"UY", name:"Uruguay", flag:"🇺🇾", region:"Americas" },
  { code:"UZ", name:"Uzbekistan", flag:"🇺🇿", region:"Asia" },
  { code:"VE", name:"Venezuela", flag:"🇻🇪", region:"Americas" },
  { code:"VN", name:"Vietnam", flag:"🇻🇳", region:"Asia" },
  { code:"YE", name:"Yemen", flag:"🇾🇪", region:"Asia" },
  { code:"ZM", name:"Zambia", flag:"🇿🇲", region:"Africa" },
  { code:"ZW", name:"Zimbabwe", flag:"🇿🇼", region:"Africa" }
];

const COUNTRY_DATA = {
  AU: { cost:{rent:1800,food:400,transport:120,utilities:150,dining:250}, visaDifficulty:"Medium", visaType:"Skilled Migration / Working Holiday / Family / Student", visaTime:"3–18 months", language:"English", climate:"Varied (tropical to temperate)", qualityOfLife:8.8, healthcare:"Universal (Medicare)", currency:"AUD", tips:["Apply for a Tax File Number (TFN) within weeks of arrival","Register with Medicare as soon as eligible","Get private health insurance to avoid Medicare Levy Surcharge","Opening a bank account remotely before arrival is possible with major banks","International driving license valid for 3 months; then convert locally"] },
  CA: { cost:{rent:1600,food:350,transport:100,utilities:130,dining:200}, visaDifficulty:"Medium", visaType:"Express Entry / Provincial Nominee / Family / Study", visaTime:"6–24 months", language:"English / French", climate:"Varies widely; cold winters", qualityOfLife:9.0, healthcare:"Universal (Provincial)", currency:"CAD", tips:["Apply for SIN (Social Insurance Number) on arrival","Provincial healthcare has 3-month waiting period in some provinces","Get a Canadian credit card immediately to build credit history","Winter driving experience recommended","French is essential in Quebec"] },
  DE: { cost:{rent:1200,food:300,transport:80,utilities:200,dining:180}, visaDifficulty:"Medium", visaType:"Job Seeker Visa / EU Blue Card / Student / Family", visaTime:"2–6 months", language:"German", climate:"Temperate; cold winters", qualityOfLife:8.7, healthcare:"Universal (statutory)", currency:"EUR", tips:["Register at your local Einwohnermeldeamt within 2 weeks","Learn basic German — most admin processes require it","Statutory health insurance (gesetzliche Krankenversicherung) is mandatory","Open a German bank account early (N26 or Deutsche Bank are expat-friendly)","Separate recycling bins are mandatory — check local rules"] },
  GB: { cost:{rent:1500,food:320,transport:150,utilities:180,dining:220}, visaDifficulty:"Hard", visaType:"Skilled Worker / Family / Student / BNO", visaTime:"3–8 weeks", language:"English", climate:"Temperate; rainy", qualityOfLife:8.3, healthcare:"Universal (NHS)", currency:"GBP", tips:["Apply for National Insurance number soon after arrival","Register with a GP (doctor) immediately","Council Tax is your responsibility as a tenant","Get an Oyster card for London transport","UK driving licence can be obtained by converting foreign licence"] },
  US: { cost:{rent:1700,food:380,transport:150,utilities:160,dining:280}, visaDifficulty:"Hard", visaType:"Green Card / H-1B / L-1 / O-1 / EB-5 / Family / Student", visaTime:"6 months – 10 years", language:"English", climate:"Varies by state", qualityOfLife:8.0, healthcare:"Private (expensive)", currency:"USD", tips:["Healthcare is private — get insurance on day one","Build a US credit score immediately (Secured card, Credit Builder loans)","File taxes even if you owe nothing — it's legally required","Get a US driving licence within 60–90 days (state dependent)","Social Security Number (SSN) is needed for almost everything"] },
  JP: { cost:{rent:900,food:280,transport:100,utilities:120,dining:200}, visaDifficulty:"Medium", visaType:"Highly Skilled / Specified Skilled Worker / Spouse / Student", visaTime:"1–6 months", language:"Japanese", climate:"Temperate with 4 seasons", qualityOfLife:8.9, healthcare:"Universal (NHIS)", currency:"JPY", tips:["Register at city hall (役所) within 14 days for residence card","Join National Health Insurance immediately","Japanese proficiency is essential outside major cities","Hanko (personal seal) is required for many official documents","Cash is still king in many places — keep yen on you"] },
  PT: { cost:{rent:1100,food:250,transport:50,utilities:100,dining:160}, visaDifficulty:"Easy", visaType:"D7 Passive Income / Digital Nomad / NHR / Golden Visa / Student", visaTime:"2–6 months", language:"Portuguese", climate:"Mediterranean; mild winters", qualityOfLife:8.5, healthcare:"Universal (SNS)", currency:"EUR", tips:["NHR tax regime offers 10% flat tax for 10 years — apply in your first year","Register at your local Junta de Freguesia for proof of address","Portuguese bureaucracy is slow — use SEF (now AIMA) appointment apps","Learn basic Portuguese; English is widely spoken in Lisbon/Porto","NIF (tax number) is essential — get it before you arrive via a representative"] },
  SG: { cost:{rent:2200,food:350,transport:80,utilities:100,dining:180}, visaDifficulty:"Medium", visaType:"EP (Employment Pass) / S Pass / Dependant Pass / Student", visaTime:"3–8 weeks", language:"English / Mandarin / Malay", climate:"Tropical; hot year-round", qualityOfLife:9.1, healthcare:"Mixed public/private (Medishield Life)", currency:"SGD", tips:["Employment Pass requires S$5,000+ monthly salary for most sectors","Register for SingPass immediately for all government services","CPF (Central Provident Fund) mandatory for PRs","Housing is expensive — budget carefully; HDB flats only for PRs","Singapore is extremely safe but strict — no chewing gum, jaywalking fines"] },
  AE: { cost:{rent:1800,food:300,transport:120,utilities:180,dining:250}, visaDifficulty:"Easy", visaType:"Employment / Investor / Remote Work / Retirement / Golden Visa / Student", visaTime:"2–8 weeks", language:"Arabic / English", climate:"Hot desert; mild winters", qualityOfLife:8.6, healthcare:"Mandatory private insurance (employer often provides)", currency:"AED", tips:["No income tax — but VAT (5%) applies to most goods","Employer must provide health insurance by law","Driving licence from many countries can be converted directly","Ramadan affects business hours; be respectful of customs","Liquor licence required to buy alcohol (Abu Dhabi); freely sold in licensed Dubai venues"] },
  TH: { cost:{rent:600,food:200,transport:50,utilities:80,dining:120}, visaDifficulty:"Easy", visaType:"LTR (Long-Term Resident) / SMART Visa / Retirement / Elite Visa / Student", visaTime:"2–8 weeks", language:"Thai", climate:"Tropical; hot and humid", qualityOfLife:7.8, healthcare:"Mixed; good private hospitals", currency:"THB", tips:["The Thailand Elite visa gives 5–20 years hassle-free stay","Private hospitals (Bumrungrad, Bangkok Hospital) are world-class and affordable","Driving in Thailand is left-hand; international licence accepted","Learn a few Thai phrases — locals deeply appreciate it","No capital gains tax; low property taxes"] },
  NL: { cost:{rent:1400,food:300,transport:90,utilities:160,dining:200}, visaDifficulty:"Medium", visaType:"Highly Skilled Migrant / EU Blue Card / Startup / Orientation / Student", visaTime:"2–4 weeks (HSM)", language:"Dutch / English", climate:"Temperate; rainy", qualityOfLife:9.0, healthcare:"Mandatory private insurance (~€130/mo)", currency:"EUR", tips:["Highly Skilled Migrant visa has a fast 2-week processing time","Register at your municipality (gemeente) within 5 days","30% ruling gives tax break for expats — apply within 4 months","Cycling is the primary transport — buy a bike on day one","DigiD digital ID takes 5 days to activate; apply immediately"] },
  ES: { cost:{rent:900,food:260,transport:60,utilities:110,dining:160}, visaDifficulty:"Medium", visaType:"Non-Lucrative / Digital Nomad / Golden Visa / Work Permit / Student", visaTime:"1–4 months", language:"Spanish", climate:"Mediterranean / varied", qualityOfLife:8.4, healthcare:"Universal (Sistema Nacional de Salud)", currency:"EUR", tips:["Apply for TIE (Foreigner Identity Card) and NIE immediately","Spanish bureaucracy requires an appointment (cita previa) for everything","Private healthcare used by many expats alongside public","Learn Spanish — English is less widespread outside tourist areas","Regional languages (Catalan, Basque) matter in those autonomous communities"] },
  FR: { cost:{rent:1100,food:300,transport:80,utilities:130,dining:200}, visaDifficulty:"Medium", visaType:"Talent Passport / Family / Long-stay Visitor / Working Holiday / Student", visaTime:"2–6 months", language:"French", climate:"Varied; Mediterranean in south", qualityOfLife:8.5, healthcare:"Universal (Sécurité Sociale)", currency:"EUR", tips:["French is essential — even basic effort is very well-received","CAF housing allowance can reduce rent significantly — apply immediately","Open a French bank account (BoursoBank, Hello bank! are expat-friendly)","Carte Vitale health card takes months — keep receipts for reimbursements","French bureaucracy is extensive — start paperwork early"] },
  MX: { cost:{rent:500,food:180,transport:40,utilities:60,dining:100}, visaDifficulty:"Easy", visaType:"Temporary Resident / Permanent Resident / Digital Nomad (de-facto) / Student", visaTime:"2–8 weeks", language:"Spanish", climate:"Tropical to desert; varies by region", qualityOfLife:7.2, healthcare:"IMSS (public) / ISSSTE / private", currency:"MXN", tips:["Temporary Resident visa allows 1–4 years, renewable","IMSS (public healthcare) is affordable; private hospitals also very cheap","US dollars widely accepted in tourist areas","CURP and RFC tax numbers needed for formal employment","Security varies heavily by state — research your destination city carefully"] },
  BR: { cost:{rent:500,food:200,transport:50,utilities:80,dining:120}, visaDifficulty:"Easy", visaType:"VITEM / Permanent / Digital Nomad / Work / Student", visaTime:"1–4 months", language:"Portuguese", climate:"Tropical to subtropical", qualityOfLife:7.0, healthcare:"SUS (public) / private plans", currency:"BRL", tips:["CPF (tax number) is needed for almost everything — get before arrival","Portuguese is essential; very little English spoken outside tourist areas","Brazil has a complex tax system — hire a local accountant","SUS is free but strained; private health plans (planos de saúde) are recommended","Crime rates vary massively — research specific neighbourhoods carefully"] },
  ID: { cost:{rent:450,food:150,transport:30,utilities:60,dining:90}, visaDifficulty:"Easy", visaType:"B211A / Second Home / ITAS / Nomad / Student", visaTime:"2–6 weeks", language:"Indonesian", climate:"Tropical", qualityOfLife:7.1, healthcare:"BPJS (public) / Private (recommended)", currency:"IDR", tips:["The B211A visa is the standard for long-term remote workers","Scooter rental is essential for Bali transport","Local warungs offer incredibly cheap and delicious food","Use Gojek or Grab for all transport and delivery","Tipping is not expected but appreciated"] },
  VN: { cost:{rent:400,food:150,transport:20,utilities:50,dining:80}, visaDifficulty:"Medium", visaType:"E-Visa / Business / Temporary Residence / Student", visaTime:"1–3 weeks", language:"Vietnamese", climate:"Tropical monsoon", qualityOfLife:7.0, healthcare:"Private (very affordable)", currency:"VND", tips:["E-Visas can be extended but involve border runs","Grab is the best app for cheap transport and food","Motorbikes are the primary transport; rent or buy cheaply","Learn basic numbers and greetings in Vietnamese","Street food is incredible and safe if busy"] },
  ZA: { cost:{rent:600,food:200,transport:60,utilities:70,dining:120}, visaDifficulty:"Medium", visaType:"Retirement / Critical Skills / General Work / Student", visaTime:"3–6 months", language:"English / Afrikaans / Zulu", climate:"Subtropical / Mediterranean", qualityOfLife:7.4, healthcare:"Private (excellent but necessary)", currency:"ZAR", tips:["Private health insurance (medical aid) is mandatory for expats","Loadshedding (power cuts) means you need a backup inverter","Cape Town is very popular but housing is getting expensive","Uber is the safest way to get around cities","Beautiful nature but be aware of security in specific areas"] },
  TR: { cost:{rent:550,food:180,transport:40,utilities:50,dining:100}, visaDifficulty:"Easy", visaType:"Short-Term Residence / Turquoise Card / Student", visaTime:"4–8 weeks", language:"Turkish", climate:"Varied / Mediterranean", qualityOfLife:7.3, healthcare:"SGK (public) / High-quality private", currency:"TRY", tips:["Ikamet (residence permit) rules change frequently; stay updated","Private healthcare is world-class and surprisingly cheap","Public transport in Istanbul is excellent (Metro, Ferries)","Inflation is high; earning in foreign currency is a huge advantage","Learn Turkish; English is limited outside tourist zones"] },
  PH: { cost:{rent:450,food:160,transport:30,utilities:70,dining:100}, visaDifficulty:"Easy", visaType:"Tourist Visa Extension / SRRV (Retirement) / 9(g) / Student", visaTime:"1–4 weeks", language:"English / Filipino", climate:"Tropical", qualityOfLife:6.9, healthcare:"PhilHealth / Private", currency:"PHP", tips:["Tourist visas can be extended for up to 3 years without leaving","English is an official language and widely spoken","Internet speeds have improved but vary by island","SRRV retirement visa is one of the world's most accessible","Grab is standard for transport in major cities"] },
  KR: { cost:{rent:800,food:300,transport:80,utilities:120,dining:200}, visaDifficulty:"Medium", visaType:"E-series Work / F-series Resident / Student", visaTime:"1–3 months", language:"Korean", climate:"Temperate (4 distinct seasons)", qualityOfLife:8.4, healthcare:"Universal (NHIS - world class)", currency:"KRW", tips:["ARC (Alien Registration Card) is needed for literally everything","NHIS healthcare is mandatory, cheap, and arguably the world's best","Public transport (subways/KTX) is pristine and cheap","KakaoTalk and KakaoMap are essential (Google Maps doesn't work well)","Very safe country; cafe culture is massive"] },
  CL: { cost:{rent:600,food:220,transport:50,utilities:80,dining:130}, visaDifficulty:"Medium", visaType:"Temporary Resident / Work / Student", visaTime:"2–6 months", language:"Spanish", climate:"Varied (desert to alpine)", qualityOfLife:7.6, healthcare:"Mixed (FONASA/ISAPRE)", currency:"CLP", tips:["RUT (national ID) is required for everything, including grocery discounts","Chilean Spanish is very fast and uses lots of slang","Earthquakes are common — buildings are highly resistant","Private health insurance (ISAPRE) is recommended for expats","Santiago suffers from smog in winter"] },
  CO: { cost:{rent:450,food:150,transport:35,utilities:60,dining:100}, visaDifficulty:"Easy", visaType:"Digital Nomad (V Visa) / Migrant / Student", visaTime:"2–6 weeks", language:"Spanish", climate:"Varied by altitude", qualityOfLife:6.8, healthcare:"EPS (public) / Prepaid private", currency:"COP", tips:["Digital Nomad Visa is easy to obtain for remote workers","Medellín's 'eternal spring' climate is extremely popular","Learn Spanish — English is not widely spoken","Safety has improved but street smarts ('no dar papaya') are essential","Healthcare is excellent in major cities"] },
  AR: { cost:{rent:400,food:140,transport:20,utilities:40,dining:90}, visaDifficulty:"Easy", visaType:"Rentista / Digital Nomad / Student", visaTime:"1–3 months", language:"Spanish", climate:"Varied", qualityOfLife:7.1, healthcare:"Public / High-quality Private", currency:"ARS", tips:["Inflation is extreme — manage money using Western Union or crypto","The 'Blue Dollar' unofficial exchange rate effectively doubles purchasing power","Buenos Aires has world-class culture and nightlife","Rentista visa is popular for remote workers with passive income","Meat and wine are incredibly cheap and high quality"] },
  CR: { cost:{rent:700,food:250,transport:60,utilities:80,dining:140}, visaDifficulty:"Easy", visaType:"Digital Nomad / Rentista / Pensionado / Student", visaTime:"1–4 months", language:"Spanish / English", climate:"Tropical", qualityOfLife:8.1, healthcare:"CCSS (Caja) / Private", currency:"CRC", tips:["'Pura Vida' is a way of life — things move slowly","Digital nomad visa has straightforward income requirements","Very safe with no standing army, but petty theft happens","Importing goods or cars is extremely expensive due to taxes","Tap water is safe to drink in most of the country"] },
  CN: { cost:{rent:900,food:250,transport:40,utilities:70,dining:150}, visaDifficulty:"Hard", visaType:"Z Visa (Work) / X Visa (Student)", visaTime:"1–3 months", language:"Mandarin", climate:"Varied", qualityOfLife:7.5, healthcare:"Public / Premium Private", currency:"CNY", tips:["WeChat and Alipay are mandatory for literally everything (cash is rarely used)","VPN is absolutely essential for accessing foreign websites","High-speed rail network is world-class and cheap","Tier 1 cities (Shanghai, Beijing) are extremely modern but expensive","Learn basic Mandarin — English is limited outside expat bubbles"] },
  IN: { cost:{rent:400,food:120,transport:20,utilities:40,dining:80}, visaDifficulty:"Medium", visaType:"Employment Visa / E-Visa / Business / Student", visaTime:"1–4 weeks", language:"Hindi / English / Regional", climate:"Tropical / Varied", qualityOfLife:6.2, healthcare:"Private (highly recommended)", currency:"INR", tips:["Private healthcare in top hospitals is excellent and affordable","Traffic in major cities is notoriously heavy — use the Metro","UPI (digital payments) is everywhere; setup requires a local bank account","English is widely spoken in business and tech hubs","Air quality can be severe in winter (especially Delhi)"] },
  EG: { cost:{rent:350,food:100,transport:15,utilities:30,dining:70}, visaDifficulty:"Easy", visaType:"E-Visa / Tourist / Work / Student", visaTime:"1–2 weeks", language:"Arabic", climate:"Desert", qualityOfLife:6.0, healthcare:"Private", currency:"EGP", tips:["Cost of living is incredibly low for foreigners with foreign currency","Cairo is massive and chaotic; Uber is the best way to get around","Private health insurance is essential","Weekends are Friday and Saturday","Respect local customs and dress modestly"] },
  KE: { cost:{rent:500,food:180,transport:30,utilities:50,dining:100}, visaDifficulty:"Easy", visaType:"E-Visa / Work Permit / Student", visaTime:"2–6 weeks", language:"Swahili / English", climate:"Tropical / Highland", qualityOfLife:6.5, healthcare:"Private", currency:"KES", tips:["M-Pesa (mobile money) is used for everything from groceries to rent","Nairobi is a major tech hub ('Silicon Savannah')","English is an official language and spoken everywhere","Security varies; use Uber rather than walking at night in some areas","Incredible access to nature and safaris"] },
  NG: { cost:{rent:600,food:150,transport:40,utilities:80,dining:110}, visaDifficulty:"Medium", visaType:"STR (Subject to Regularization) / TWP / Student", visaTime:"1–2 months", language:"English", climate:"Tropical", qualityOfLife:5.5, healthcare:"Private", currency:"NGN", tips:["Lagos is the economic powerhouse with a massive startup scene","Power outages are common; ensure your housing has a good generator","Traffic ('go-slow') in Lagos is legendary","Vibrant culture, music, and food scene","Cash and local bank transfers are king"] },
  MA: { cost:{rent:450,food:140,transport:25,utilities:45,dining:90}, visaDifficulty:"Easy", visaType:"Visa-Free (Tourist) / Carte de Séjour / Student", visaTime:"1–2 months", language:"Arabic / French", climate:"Mediterranean", qualityOfLife:6.8, healthcare:"Private", currency:"MAD", tips:["French is widely used in business and government","High-speed rail (Al Boraq) connects Tangier to Casablanca","Cash is still widely used in medinas and markets","Friday is the holy day, affecting some business hours","Excellent blend of European and African culture"] }
};

const TRENDING = [
  { code:"PT", tagline:"Digital nomad paradise", trend:"↑ 34% this year" },
  { code:"DE", tagline:"Europe's economic engine", trend:"↑ 22% this year" },
  { code:"CA", tagline:"World-class quality of life", trend:"↑ 18% this year" },
  { code:"AU", tagline:"Sunny, safe, and thriving", trend:"↑ 15% this year" },
  { code:"AE", tagline:"Tax-free with global connectivity", trend:"↑ 28% this year" },
  { code:"TH", tagline:"Affordable tropical living", trend:"↑ 41% this year" },
  { code:"NL", tagline:"Innovation hub of Europe", trend:"↑ 12% this year" },
  { code:"SG", tagline:"Asia's premier expat city", trend:"↑ 19% this year" },
];

const COMPARE_COUNTRIES = ["US","GB","DE","PT","TH","SG","AU","MX"];

const CHECKLIST_PHASES = [
  { title:"6–12 Months Before", icon:"📅", items:[
    "Research visa requirements for your destination",
    "Begin saving an emergency fund (3–6 months expenses)",
    "Check if your employer supports remote/transfer work",
    "Research cost of living and create a relocation budget",
    "Consult a tax advisor about international tax implications",
    "Begin learning the local language basics",
    "Research international schools if moving with children",
    "Check reciprocal healthcare agreements between countries"
  ]},
  { title:"3–6 Months Before", icon:"📦", items:[
    "Apply for your visa or residency permit",
    "Get a certified translation of key documents",
    "Apostille important documents (birth cert, marriage cert, degree)",
    "Research international shipping companies for belongings",
    "Book temporary accommodation for first 1–3 months",
    "Research international health insurance options",
    "Notify your bank and check international banking options",
    "Research international moving insurance"
  ]},
  { title:"1–3 Months Before", icon:"✈️", items:[
    "Book flights and organise travel insurance",
    "Open an international bank account (Wise, Revolut, Charles Schwab)",
    "Forward mail or notify important contacts of address change",
    "Transfer or close local accounts you won't need",
    "Gather original documents: passport, diplomas, medical records",
    "Visit your doctor and dentist for check-ups",
    "Get 3–6 months supply of any prescription medications",
    "Sell, store or ship furniture and belongings"
  ]},
  { title:"Arrival — First Week", icon:"🏠", items:[
    "Register at local government office (residency registration)",
    "Open a local bank account",
    "Get a local SIM card",
    "Set up temporary internet access",
    "Locate nearest hospital and pharmacy",
    "Learn local emergency numbers",
    "Explore your neighbourhood",
    "Set up mail forwarding"
  ]},
  { title:"First Month", icon:"🔑", items:[
    "Apply for local tax identification number",
    "Register for national health insurance / get private cover",
    "Apply for social security / national ID equivalents",
    "Find and sign lease for permanent accommodation",
    "Set up utility accounts (electricity, water, internet)",
    "Convert your driving licence if needed",
    "Register children at local schools",
    "Join expat community groups to meet people"
  ]}
];

const CITY_DATA = {
  US: [
    { name:"New York, NY", cost:{rent:3400,food:550,transport:130,utilities:180,dining:450} },
    { name:"San Francisco, CA", cost:{rent:3200,food:500,transport:120,utilities:150,dining:400} },
    { name:"Los Angeles, CA", cost:{rent:2900,food:480,transport:90,utilities:130,dining:380} },
    { name:"Chicago, IL", cost:{rent:2000,food:390,transport:105,utilities:140,dining:290} },
    { name:"Austin, TX", cost:{rent:1850,food:360,transport:75,utilities:145,dining:260} },
    { name:"Miami, FL", cost:{rent:2500,food:430,transport:85,utilities:170,dining:310} },
    { name:"Seattle, WA", cost:{rent:2400,food:430,transport:95,utilities:135,dining:330} },
    { name:"Denver, CO", cost:{rent:1950,food:375,transport:80,utilities:115,dining:275} },
    { name:"Nashville, TN", cost:{rent:1700,food:340,transport:70,utilities:120,dining:240} },
    { name:"Phoenix, AZ", cost:{rent:1600,food:330,transport:70,utilities:180,dining:220} },
    { name:"Boston, MA", cost:{rent:3100,food:500,transport:110,utilities:160,dining:400} },
  ],
  GB: [
    { name:"London", cost:{rent:2400,food:380,transport:200,utilities:200,dining:300} },
    { name:"Manchester", cost:{rent:1300,food:280,transport:100,utilities:160,dining:200} },
    { name:"Edinburgh", cost:{rent:1400,food:290,transport:90,utilities:155,dining:210} },
    { name:"Bristol", cost:{rent:1350,food:275,transport:85,utilities:155,dining:195} },
    { name:"Birmingham", cost:{rent:1100,food:260,transport:90,utilities:150,dining:185} },
    { name:"Leeds", cost:{rent:1050,food:250,transport:80,utilities:145,dining:175} },
  ],
  DE: [
    { name:"Berlin", cost:{rent:1300,food:300,transport:90,utilities:200,dining:190} },
    { name:"Munich", cost:{rent:1900,food:340,transport:90,utilities:210,dining:230} },
    { name:"Hamburg", cost:{rent:1500,food:310,transport:90,utilities:195,dining:200} },
    { name:"Frankfurt", cost:{rent:1600,food:315,transport:85,utilities:200,dining:205} },
    { name:"Cologne", cost:{rent:1250,food:295,transport:85,utilities:190,dining:185} },
    { name:"Stuttgart", cost:{rent:1450,food:305,transport:80,utilities:195,dining:195} },
  ],
  CA: [
    { name:"Toronto, ON", cost:{rent:2200,food:400,transport:120,utilities:140,dining:260} },
    { name:"Vancouver, BC", cost:{rent:2500,food:420,transport:110,utilities:135,dining:270} },
    { name:"Montreal, QC", cost:{rent:1500,food:350,transport:90,utilities:120,dining:210} },
    { name:"Calgary, AB", cost:{rent:1700,food:370,transport:100,utilities:155,dining:230} },
    { name:"Ottawa, ON", cost:{rent:1800,food:360,transport:105,utilities:135,dining:220} },
    { name:"Edmonton, AB", cost:{rent:1400,food:345,transport:90,utilities:145,dining:205} },
  ],
  AU: [
    { name:"Sydney, NSW", cost:{rent:2400,food:440,transport:140,utilities:160,dining:290}, climate:"Temperate (warm summers, mild winters)", qualityOfLife:9.1 },
    { name:"Melbourne, VIC", cost:{rent:1900,food:400,transport:130,utilities:150,dining:270}, climate:"Temperate (highly changeable weather)", qualityOfLife:9.0 },
    { name:"Brisbane, QLD", cost:{rent:1700,food:390,transport:115,utilities:145,dining:250}, climate:"Humid subtropical (hot summers, mild winters)", qualityOfLife:8.9 },
    { name:"Perth, WA", cost:{rent:1600,food:375,transport:110,utilities:155,dining:240}, climate:"Mediterranean (hot, dry summers; mild, wet winters)", qualityOfLife:9.2 },
    { name:"Adelaide, SA", cost:{rent:1400,food:360,transport:100,utilities:140,dining:220}, climate:"Mediterranean (hot summers, mild winters)", qualityOfLife:9.1 },
    { name:"Gold Coast, QLD", cost:{rent:1500,food:370,transport:105,utilities:140,dining:235}, climate:"Subtropical (warm/hot summers, mild/warm winters)", qualityOfLife:8.8 },
  ],
  FR: [
    { name:"Paris", cost:{rent:1800,food:360,transport:90,utilities:140,dining:260} },
    { name:"Lyon", cost:{rent:1100,food:280,transport:65,utilities:120,dining:190} },
    { name:"Marseille", cost:{rent:900,food:265,transport:60,utilities:115,dining:175} },
    { name:"Bordeaux", cost:{rent:950,food:270,transport:55,utilities:115,dining:175} },
    { name:"Nice", cost:{rent:1200,food:290,transport:60,utilities:125,dining:200} },
    { name:"Toulouse", cost:{rent:900,food:260,transport:55,utilities:110,dining:170} },
  ],
  ES: [
    { name:"Madrid", cost:{rent:1200,food:280,transport:70,utilities:120,dining:180} },
    { name:"Barcelona", cost:{rent:1300,food:285,transport:65,utilities:115,dining:185} },
    { name:"Valencia", cost:{rent:850,food:250,transport:55,utilities:105,dining:155} },
    { name:"Seville", cost:{rent:800,food:240,transport:50,utilities:100,dining:150} },
    { name:"Bilbao", cost:{rent:950,food:260,transport:55,utilities:110,dining:165} },
    { name:"Malaga", cost:{rent:900,food:245,transport:50,utilities:105,dining:155} },
  ],
  PT: [
    { name:"Lisbon", cost:{rent:1400,food:280,transport:55,utilities:110,dining:185} },
    { name:"Porto", cost:{rent:1050,food:240,transport:45,utilities:100,dining:160} },
    { name:"Algarve", cost:{rent:1200,food:250,transport:60,utilities:105,dining:165} },
    { name:"Braga", cost:{rent:750,food:210,transport:40,utilities:90,dining:135} },
    { name:"Setúbal", cost:{rent:800,food:215,transport:45,utilities:92,dining:140} },
  ],
  NL: [
    { name:"Amsterdam", cost:{rent:1900,food:330,transport:100,utilities:175,dining:230} },
    { name:"Rotterdam", cost:{rent:1400,food:295,transport:85,utilities:160,dining:195} },
    { name:"The Hague", cost:{rent:1500,food:300,transport:85,utilities:165,dining:200} },
    { name:"Utrecht", cost:{rent:1600,food:305,transport:85,utilities:165,dining:205} },
    { name:"Eindhoven", cost:{rent:1200,food:280,transport:75,utilities:155,dining:185} },
  ],
  JP: [
    { name:"Tokyo", cost:{rent:1200,food:310,transport:110,utilities:130,dining:230} },
    { name:"Osaka", cost:{rent:850,food:270,transport:95,utilities:115,dining:195} },
    { name:"Kyoto", cost:{rent:800,food:260,transport:85,utilities:110,dining:185} },
    { name:"Fukuoka", cost:{rent:650,food:245,transport:75,utilities:105,dining:170} },
    { name:"Yokohama", cost:{rent:1000,food:285,transport:100,utilities:120,dining:210} },
  ],
  AE: [
    { name:"Dubai", cost:{rent:2200,food:320,transport:130,utilities:195,dining:280} },
    { name:"Abu Dhabi", cost:{rent:1800,food:295,transport:120,utilities:185,dining:255} },
    { name:"Sharjah", cost:{rent:1100,food:265,transport:110,utilities:160,dining:210} },
  ],
  TH: [
    { name:"Bangkok", cost:{rent:700,food:210,transport:55,utilities:85,dining:130} },
    { name:"Chiang Mai", cost:{rent:450,food:175,transport:40,utilities:70,dining:100} },
    { name:"Phuket", cost:{rent:600,food:195,transport:50,utilities:80,dining:120} },
    { name:"Pattaya", cost:{rent:500,food:180,transport:45,utilities:75,dining:110} },
    { name:"Hua Hin", cost:{rent:500,food:180,transport:45,utilities:73,dining:108} },
  ],
  MX: [
    { name:"Mexico City (CDMX)", cost:{rent:700,food:200,transport:45,utilities:65,dining:115} },
    { name:"Guadalajara", cost:{rent:550,food:175,transport:38,utilities:58,dining:95} },
    { name:"Monterrey", cost:{rent:600,food:185,transport:40,utilities:62,dining:100} },
    { name:"Playa del Carmen", cost:{rent:750,food:195,transport:40,utilities:68,dining:120} },
    { name:"Mérida", cost:{rent:480,food:165,transport:35,utilities:80,dining:85} },
    { name:"Oaxaca", cost:{rent:420,food:155,transport:32,utilities:55,dining:80} },
  ],
  BR: [
    { name:"São Paulo", cost:{rent:700,food:220,transport:55,utilities:90,dining:140} },
    { name:"Rio de Janeiro", cost:{rent:650,food:210,transport:50,utilities:85,dining:135} },
    { name:"Florianópolis", cost:{rent:600,food:200,transport:45,utilities:80,dining:125} },
    { name:"Curitiba", cost:{rent:520,food:185,transport:42,utilities:75,dining:112} },
    { name:"Belo Horizonte", cost:{rent:500,food:180,transport:40,utilities:72,dining:108} },
  ],
  ID: [
    { name:"Bali", cost:{rent:600,food:200,transport:40,utilities:80,dining:150} },
    { name:"Jakarta", cost:{rent:700,food:220,transport:50,utilities:90,dining:180} },
    { name:"Yogyakarta", cost:{rent:300,food:120,transport:20,utilities:50,dining:80} }
  ],
  VN: [
    { name:"Ho Chi Minh City", cost:{rent:500,food:180,transport:30,utilities:60,dining:120} },
    { name:"Hanoi", cost:{rent:450,food:160,transport:25,utilities:55,dining:110} },
    { name:"Da Nang", cost:{rent:350,food:140,transport:20,utilities:50,dining:90} }
  ],
  ZA: [
    { name:"Cape Town", cost:{rent:800,food:250,transport:80,utilities:100,dining:180} },
    { name:"Johannesburg", cost:{rent:600,food:220,transport:70,utilities:90,dining:150} },
    { name:"Durban", cost:{rent:500,food:200,transport:60,utilities:80,dining:130} }
  ],
  TR: [
    { name:"Istanbul", cost:{rent:700,food:220,transport:50,utilities:70,dining:150} },
    { name:"Antalya", cost:{rent:550,food:190,transport:40,utilities:60,dining:120} },
    { name:"Izmir", cost:{rent:500,food:180,transport:35,utilities:55,dining:110} }
  ],
  PH: [
    { name:"Manila", cost:{rent:600,food:200,transport:40,utilities:90,dining:140} },
    { name:"Cebu", cost:{rent:400,food:160,transport:30,utilities:70,dining:100} },
    { name:"Siargao", cost:{rent:450,food:180,transport:25,utilities:60,dining:120} }
  ],
  KR: [
    { name:"Seoul", cost:{rent:1000,food:350,transport:90,utilities:140,dining:250} },
    { name:"Busan", cost:{rent:700,food:280,transport:80,utilities:120,dining:200} },
    { name:"Jeju", cost:{rent:650,food:300,transport:70,utilities:110,dining:180} }
  ],
  CL: [
    { name:"Santiago", cost:{rent:650,food:240,transport:60,utilities:90,dining:150} },
    { name:"Valparaíso", cost:{rent:500,food:200,transport:50,utilities:70,dining:120} },
    { name:"Viña del Mar", cost:{rent:550,food:210,transport:50,utilities:75,dining:130} }
  ],
  CO: [
    { name:"Bogotá", cost:{rent:500,food:160,transport:40,utilities:65,dining:110} },
    { name:"Medellín", cost:{rent:600,food:170,transport:35,utilities:60,dining:120} },
    { name:"Cartagena", cost:{rent:550,food:180,transport:30,utilities:70,dining:130} }
  ],
  AR: [
    { name:"Buenos Aires", cost:{rent:450,food:150,transport:20,utilities:45,dining:100} },
    { name:"Córdoba", cost:{rent:350,food:130,transport:15,utilities:35,dining:80} },
    { name:"Mendoza", cost:{rent:400,food:140,transport:20,utilities:40,dining:90} }
  ],
  CR: [
    { name:"San José", cost:{rent:650,food:240,transport:55,utilities:70,dining:130} },
    { name:"Tamarindo", cost:{rent:900,food:300,transport:40,utilities:80,dining:180} },
    { name:"Puerto Viejo", cost:{rent:700,food:260,transport:40,utilities:75,dining:150} }
  ],
  CN: [
    { name:"Shanghai", cost:{rent:1200,food:350,transport:50,utilities:80,dining:200} },
    { name:"Beijing", cost:{rent:1100,food:300,transport:45,utilities:75,dining:180} },
    { name:"Shenzhen", cost:{rent:1000,food:280,transport:45,utilities:70,dining:160} }
  ],
  IN: [
    { name:"Mumbai", cost:{rent:600,food:150,transport:30,utilities:50,dining:100}, climate:"Tropical wet and dry (monsoon, hot & humid)", qualityOfLife:6.4 },
    { name:"Bengaluru", cost:{rent:450,food:130,transport:25,utilities:40,dining:90}, climate:"Tropical savanna (moderate/pleasant year-round)", qualityOfLife:7.2 },
    { name:"New Delhi", cost:{rent:400,food:120,transport:20,utilities:45,dining:80}, climate:"Hot semi-arid (monsoon, extreme summer/winter)", qualityOfLife:5.5 },
    { name:"Kolkata", cost:{rent:300,food:100,transport:15,utilities:35,dining:70}, climate:"Tropical wet and dry (hot, humid & monsoon)", qualityOfLife:6.0 },
    { name:"Chennai", cost:{rent:350,food:110,transport:20,utilities:40,dining:75}, climate:"Tropical wet and dry (hot & humid year-round)", qualityOfLife:6.2 },
    { name:"Hyderabad", cost:{rent:380,food:120,transport:20,utilities:40,dining:80}, climate:"Tropical wet and dry (hot summers, pleasant winters)", qualityOfLife:6.8 },
    { name:"Pune", cost:{rent:350,food:120,transport:20,utilities:40,dining:80}, climate:"Hot semi-arid (moderate, pleasant winters)", qualityOfLife:7.0 },
    { name:"Ahmedabad", cost:{rent:320,food:100,transport:15,utilities:35,dining:70}, climate:"Hot semi-arid (very hot summers, mild winters)", qualityOfLife:6.3 }
  ],
  EG: [
    { name:"Cairo", cost:{rent:350,food:100,transport:15,utilities:30,dining:70} },
    { name:"Alexandria", cost:{rent:300,food:90,transport:10,utilities:25,dining:60} },
    { name:"Dahab", cost:{rent:250,food:110,transport:10,utilities:20,dining:80} }
  ],
  KE: [
    { name:"Nairobi", cost:{rent:550,food:180,transport:35,utilities:60,dining:120} },
    { name:"Mombasa", cost:{rent:400,food:150,transport:25,utilities:45,dining:90} },
    { name:"Nakuru", cost:{rent:300,food:130,transport:20,utilities:40,dining:80} }
  ],
  NG: [
    { name:"Lagos", cost:{rent:700,food:180,transport:45,utilities:90,dining:130} },
    { name:"Abuja", cost:{rent:600,food:160,transport:40,utilities:85,dining:110} },
    { name:"Port Harcourt", cost:{rent:500,food:150,transport:35,utilities:75,dining:100} }
  ],
  MA: [
    { name:"Casablanca", cost:{rent:500,food:160,transport:30,utilities:50,dining:110} },
    { name:"Marrakech", cost:{rent:450,food:140,transport:25,utilities:45,dining:100} },
    { name:"Rabat", cost:{rent:550,food:150,transport:25,utilities:45,dining:100} }
  ]
};

const GOV_LINKS = {
  US: [
    { icon:"🛂", label:"USCIS — Immigration & Visas", url:"https://www.uscis.gov", cat:"Immigration" },
    { icon:"💼", label:"Travel.State.Gov — Visa Applications", url:"https://travel.state.gov/content/travel/en/us-visas.html", cat:"Immigration" },
    { icon:"💰", label:"IRS — Taxes for New Arrivals", url:"https://www.irs.gov/individuals/international-taxpayers", cat:"Tax" },
    { icon:"🏥", label:"HealthCare.gov — Health Insurance", url:"https://www.healthcare.gov", cat:"Healthcare" },
    { icon:"🪪", label:"SSA — Social Security Number", url:"https://www.ssa.gov/ssnumber", cat:"ID & Registration" },
    { icon:"🚗", label:"USA.gov — Driving for Non-Citizens", url:"https://www.usa.gov/non-citizen-driving", cat:"Driving" },
  ],
  GB: [
    { icon:"🛂", label:"UKVI — UK Visas & Immigration", url:"https://www.gov.uk/browse/visas-immigration", cat:"Immigration" },
    { icon:"💰", label:"HMRC — Tax for New Residents", url:"https://www.gov.uk/topic/personal-tax/income-tax", cat:"Tax" },
    { icon:"🏥", label:"NHS — Register with a GP", url:"https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery", cat:"Healthcare" },
    { icon:"🪪", label:"DWP — National Insurance Number", url:"https://www.gov.uk/apply-national-insurance-number", cat:"ID & Registration" },
    { icon:"🚗", label:"DVLA — Exchange Foreign Licence", url:"https://www.gov.uk/exchange-foreign-driving-licence", cat:"Driving" },
    { icon:"🏦", label:"Gov.uk — Benefits & Support", url:"https://www.gov.uk/browse/benefits", cat:"Benefits" },
  ],
  DE: [
    { icon:"🛂", label:"BAMF — Federal Migration Office", url:"https://www.bamf.de/EN", cat:"Immigration" },
    { icon:"🏛️", label:"Make it in Germany — Official Portal", url:"https://www.make-it-in-germany.com/en", cat:"Immigration" },
    { icon:"💰", label:"Bundeszentralamt für Steuern — Tax ID", url:"https://www.bzst.de/EN", cat:"Tax" },
    { icon:"🏥", label:"GKV Spitzenverband — Health Insurance", url:"https://www.gkv-spitzenverband.de", cat:"Healthcare" },
    { icon:"🪪", label:"Bundesregierung — Arrival & Integration", url:"https://www.bundesregierung.de/breg-en", cat:"ID & Registration" },
  ],
  CA: [
    { icon:"🛂", label:"IRCC — Immigration, Refugees & Citizenship", url:"https://www.canada.ca/en/immigration-refugees-citizenship.html", cat:"Immigration" },
    { icon:"💰", label:"CRA — Canada Revenue Agency", url:"https://www.canada.ca/en/revenue-agency.html", cat:"Tax" },
    { icon:"🏥", label:"Canada.ca — Provincial Health Coverage", url:"https://www.canada.ca/en/health-canada/services/health-care-system/provincial-territorial-health-coverage.html", cat:"Healthcare" },
    { icon:"🪪", label:"Service Canada — SIN Application", url:"https://www.canada.ca/en/employment-social-development/services/sin.html", cat:"ID & Registration" },
  ],
  AU: [
    { icon:"🛂", label:"Home Affairs — Australian Immigration", url:"https://immi.homeaffairs.gov.au", cat:"Immigration" },
    { icon:"💰", label:"ATO — Australian Taxation Office", url:"https://www.ato.gov.au/individuals", cat:"Tax" },
    { icon:"🏥", label:"Services Australia — Medicare", url:"https://www.servicesaustralia.gov.au/medicare", cat:"Healthcare" },
    { icon:"🪪", label:"ATO — Tax File Number", url:"https://www.ato.gov.au/individuals-and-families/tax-file-number", cat:"ID & Registration" },
    { icon:"🚗", label:"Austroads — Overseas Licence Recognition", url:"https://austroads.com.au/drivers-vehicles/overseas-licences", cat:"Driving" },
  ],
  PT: [
    { icon:"🛂", label:"AIMA — Immigration & Asylum", url:"https://www.aima.gov.pt", cat:"Immigration" },
    { icon:"💼", label:"Portugal Visas — Official Visa Portal", url:"https://vistos.mne.gov.pt/en", cat:"Immigration" },
    { icon:"💰", label:"Portal das Finanças — Tax (NIF)", url:"https://www.portaldasfinancas.gov.pt", cat:"Tax" },
    { icon:"🏥", label:"SNS — National Health Service", url:"https://www.sns.gov.pt", cat:"Healthcare" },
  ],
  DE_extra: [],
  NL: [
    { icon:"🛂", label:"IND — Immigration & Naturalisation", url:"https://ind.nl/en", cat:"Immigration" },
    { icon:"💰", label:"Belastingdienst — Dutch Tax Authority", url:"https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/individuals", cat:"Tax" },
    { icon:"🏥", label:"Zorgwijzer — Health Insurance Guide", url:"https://www.zorgwijzer.nl/", cat:"Healthcare" },
    { icon:"🪪", label:"Government.nl — BSN Registration", url:"https://www.government.nl/themes/government-and-democracy/personal-data/citizen-service-number-bsn", cat:"ID & Registration" },
  ],
  ES: [
    { icon:"🛂", label:"Spanish Embassy Australia — Visa Info", url:"https://www.exteriores.gob.es/Embajadas/canberra/en/ServiciosConsulares/Paginas/index.aspx", cat:"Immigration" },
    { icon:"💼", label:"Ministerio de Inclusion — Immigration", url:"https://www.inclusion.gob.es/", cat:"Immigration" },
    { icon:"💰", label:"Agencia Tributaria — Tax Authority", url:"https://sede.agenciatributaria.gob.es", cat:"Tax" },
    { icon:"🏥", label:"Ministerio de Sanidad — Healthcare", url:"https://www.sanidad.gob.es/en/home.htm", cat:"Healthcare" },
    { icon:"🪪", label:"Interior Ministry — Foreigner ID (NIE/TIE)", url:"https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/extranjeria/", cat:"ID & Registration" },
  ],
  FR: [
    { icon:"🛂", label:"France-Visas — Official Visa Portal", url:"https://france-visas.gouv.fr/", cat:"Immigration" },
    { icon:"💰", label:"Impôts.gouv — French Tax Authority", url:"https://www.impots.gouv.fr/accueil", cat:"Tax" },
    { icon:"🏥", label:"Ameli.fr — French Healthcare (CPAM)", url:"https://www.ameli.fr", cat:"Healthcare" },
    { icon:"🪪", label:"CAF — Housing Allowance", url:"https://www.caf.fr", cat:"Benefits" },
  ],
  JP: [
    { icon:"🛂", label:"ISA — Japan Immigration Services", url:"https://www.moj.go.jp/isa/index.html", cat:"Immigration" },
    { icon:"💼", label:"Japan External Trade Organization", url:"https://www.jetro.go.jp/en/invest/setting_up", cat:"Business" },
    { icon:"💰", label:"NTA — Japan National Tax Agency", url:"https://www.nta.go.jp/english/index.htm", cat:"Tax" },
    { icon:"🏥", label:"MHLW — Health Insurance Guide", url:"https://www.mhlw.go.jp/english/", cat:"Healthcare" },
  ],
  SG: [
    { icon:"🛂", label:"MOM — Ministry of Manpower (Passes)", url:"https://www.mom.gov.sg/passes-and-permits", cat:"Immigration" },
    { icon:"🪪", label:"ICA — Immigration & Checkpoints Authority", url:"https://www.ica.gov.sg", cat:"Immigration" },
    { icon:"💰", label:"IRAS — Inland Revenue Authority", url:"https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax", cat:"Tax" },
    { icon:"🏥", label:"MOH — Singapore Health Ministry", url:"https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/", cat:"Healthcare" },
  ],
  AE: [
    { icon:"🛂", label:"GDRFA — Dubai Residency Authority", url:"https://gdrfad.gov.ae", cat:"Immigration" },
    { icon:"💼", label:"Federal Authority for Identity — ICA", url:"https://icp.gov.ae", cat:"ID & Registration" },
    { icon:"💰", label:"Federal Tax Authority — UAE VAT", url:"https://tax.gov.ae", cat:"Tax" },
    { icon:"🏥", label:"DHA — Dubai Health Authority", url:"https://www.dha.gov.ae", cat:"Healthcare" },
  ],
  TH: [
    { icon:"🛂", label:"Thai Immigration Bureau", url:"https://www.immigration.go.th", cat:"Immigration" },
    { icon:"💼", label:"BOI — Thailand Board of Investment", url:"https://www.boi.go.th/en/index", cat:"Business / SMART Visa" },
    { icon:"💰", label:"Revenue Department — Thai Taxes", url:"https://www.rd.go.th/english", cat:"Tax" },
    { icon:"🏥", label:"NHSO — National Health Security Office", url:"https://www.nhso.go.th", cat:"Healthcare" },
  ],
  MX: [
    { icon:"🛂", label:"INM — Instituto Nacional de Migración", url:"https://www.gob.mx/inm", cat:"Immigration" },
    { icon:"💰", label:"SAT — Mexican Tax Authority", url:"https://www.sat.gob.mx", cat:"Tax" },
    { icon:"🏥", label:"IMSS — Social Security & Health", url:"http://www.imss.gob.mx", cat:"Healthcare" },
    { icon:"🪪", label:"RENAPO — CURP Registration", url:"https://www.gob.mx/curp", cat:"ID & Registration" },
  ],
  BR: [
    { icon:"🛂", label:"Polícia Federal — Immigration Brazil", url:"https://www.gov.br/pf/pt-br/assuntos/imigracao", cat:"Immigration" },
    { icon:"💰", label:"Receita Federal — CPF & Taxes", url:"https://www.gov.br/receitafederal/pt-br", cat:"Tax" },
    { icon:"🏥", label:"Ministério da Saúde — SUS Healthcare", url:"https://www.gov.br/saude/pt-br", cat:"Healthcare" },
    { icon:"🪪", label:"Governo.br — CPF for Foreigners", url:"https://www.gov.br/pt-br/servicos/inscrever-no-cpf", cat:"ID & Registration" },
  ],
  IN: [
    { icon:"🛂", label:"Indian Visa Online — Official E-Visa Portal", url:"https://indianvisaonline.gov.in/evisa/tvoa.html", cat:"Immigration" },
    { icon:"💼", label:"e-FRRO — Foreigners Registration Office", url:"https://indianfrro.gov.in", cat:"Immigration" },
    { icon:"💰", label:"Income Tax Department — e-Filing", url:"https://www.incometax.gov.in", cat:"Tax" },
    { icon:"🏥", label:"Ministry of Health & Family Welfare", url:"https://mohfw.gov.in", cat:"Healthcare" },
    { icon:"🪪", label:"UIDAI — Aadhaar Resident ID", url:"https://uidai.gov.in", cat:"ID & Registration" },
  ],
  ID: [
    { icon:"🛂", label:"Ditjen Imigrasi — Indonesian Immigration", url:"https://www.imigrasi.go.id", cat:"Immigration" },
    { icon:"💼", label:"BKPM — Investment Coordinating Board (KITAS)", url:"https://www.bkpm.go.id/en", cat:"Business / KITAS" },
    { icon:"💰", label:"DJP — Indonesian Tax Authority", url:"https://www.pajak.go.id", cat:"Tax" },
    { icon:"🏥", label:"BPJS Kesehatan — National Health Insurance", url:"https://www.bpjs-kesehatan.go.id", cat:"Healthcare" },
  ],
  NZ: [
    { icon:"🛂", label:"Immigration New Zealand — Visas", url:"https://www.immigration.govt.nz", cat:"Immigration" },
    { icon:"💰", label:"IRD — Inland Revenue Department", url:"https://www.ird.govt.nz", cat:"Tax" },
    { icon:"🏥", label:"Ministry of Health New Zealand", url:"https://www.health.govt.nz", cat:"Healthcare" },
    { icon:"🪪", label:"RealMe — IRD Number Application", url:"https://www.realme.govt.nz", cat:"ID & Registration" },
  ],
  ZA: [
    { icon:"🛂", label:"DHA — Dept of Home Affairs", url:"https://www.dha.gov.za", cat:"Immigration" },
    { icon:"💰", label:"SARS — South African Revenue Service", url:"https://www.sars.gov.za", cat:"Tax" },
    { icon:"🏥", label:"Dept of Health South Africa", url:"https://www.health.gov.za", cat:"Healthcare" },
  ],
};

const DEEP_DIVE = {
  visa: {
    US: { heading:"US Immigration — The Full Picture", body:"The US has no single immigration pathway — the right visa depends on your nationality, skills, employer, family ties, or investment level. The H-1B lottery opens annually in March. Green Card processing via EB categories can take 1–20+ years depending on your nationality. Consider consulting an AILA-member immigration attorney.", links:[{label:"AILA — Find an Immigration Lawyer",url:"https://www.ailalawyer.com/"},{label:"USA.gov — Living in the US",url:"https://www.usa.gov/non-immigrant-visas"}] },
    GB: { heading:"UK Skilled Worker Visa — Deep Dive", body:"You need a job offer from a licensed sponsor paying at least £38,700/year (or the going rate for the role). Points are awarded for salary, qualifications, and English. Your employer must be on the UKVI sponsor register. The Certificate of Sponsorship (CoS) must be obtained before you apply.", links:[{label:"UKVI Sponsor Register",url:"https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers"},{label:"Skilled Worker Visa Guide",url:"https://www.gov.uk/skilled-worker-visa"}] },
    DE: { heading:"Germany EU Blue Card & Job Seeker", body:"The EU Blue Card is the fastest route for skilled non-EU workers — you need a recognised degree and a job offer paying €45,300+/year (€56,400 for shortage occupations). The Job Seeker Visa allows 6 months to find employment in Germany before converting to a work visa.", links:[{label:"EU Blue Card Germany",url:"https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card"},{label:"Recognition of Foreign Qualifications",url:"https://www.anerkennung-in-deutschland.de/en"}] },
    IN: { heading:"Indian Visa & FRRO Registration", body:"For foreigners relocating to India, the main visa pathways are the Employment Visa (requires an employer contract paying at least $25,000 USD/year) and the Business Visa. All foreigners staying longer than 180 days must register with the local FRRO (Foreigners Regional Registration Office) within 14 days of arrival. PIO and OCI cardholders enjoy visa-free entry and residency rights.", links:[{label:"Ministry of Home Affairs — Visa Guidelines",url:"https://www.mha.gov.in/en/divisionofmha/foreigners-division"},{label:"e-FRRO Registration Instructions",url:"https://indianfrro.gov.in/frro/menu/instructionsfrro.html"}] },
    AU: { heading:"Australian Visa Pathways", body:"Australia uses a points-based skilled migration system (Subclass 189, 190, 491). Employer-sponsored visas (482, 186) are the most common route. Working holiday visas (417, 462) are available for under-35s from eligible countries. Use the Home Affairs visa finder to identify the right stream.", links:[{label:"Home Affairs — Find a Visa",url:"https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder"},{label:"SkillSelect Points Calculator",url:"https://immi.homeaffairs.gov.au/help-support/tools/points-calculator"}] },
    CA: { heading:"Canadian Immigration Pathways", body:"Canada's Express Entry system manages skilled worker applications (Federal Skilled Worker, CEC, Federal Skilled Trades). Provincial Nominee Programs (PNPs) offer additional pathways. Draw scores (CRS) fluctuate — check the IRCC website for the latest invitation rounds.", links:[{label:"IRCC — Express Entry",url:"https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"},{label:"IRCC — Provincial Nominee Programs",url:"https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html"}] },
    PT: { heading:"Portugal Visa Pathways", body:"Portugal offers the D7 Passive Income Visa (for remote workers and retirees), the Tech Visa, and the startup visa. EU Blue Card applies for skilled workers with employer sponsorship. After 5 years of legal residency, permanent residency and citizenship are available.", links:[{label:"Portugal Visas — Official Portal",url:"https://vistos.mne.gov.pt/en"},{label:"AIMA — Immigration & Asylum Authority",url:"https://www.aima.gov.pt"}] },
    NL: { heading:"Netherlands Visa Pathways", body:"The Highly Skilled Migrant visa (Kennismigrant) is the main route for skilled non-EU workers — your employer must be an IND-recognised sponsor. The Orientation Year visa lets recent graduates job-hunt for 12 months. The Netherlands also offers a startup visa and entrepreneur visa.", links:[{label:"IND — Dutch Immigration Service",url:"https://ind.nl/en"},{label:"IND — Recognised Sponsors List",url:"https://ind.nl/en/public-register-recognised-sponsors"}] },
    ES: { heading:"Spain Visa Pathways", body:"Spain's Digital Nomad Visa allows remote workers earning mostly from outside Spain to live and work legally. The Non-Lucrative Visa suits retirees and passive income earners. Highly qualified professionals can apply for an EU Blue Card. After 5 years, long-term residency is available.", links:[{label:"Ministerio de Inclusion — Immigration",url:"https://www.inclusion.gob.es/"},{label:"Spain Digital Nomad Visa Info",url:"https://www.exteriores.gob.es/Embajadas/canberra/en/ServiciosConsulares/Paginas/index.aspx"}] },
    FR: { heading:"France Visa Pathways", body:"France requires a long-stay visa (VLS-TS) for stays over 90 days. Options include the Talent Passport (for skilled professionals, researchers, investors), the employee visa (sponsored by an employer), and the passive income visa. After arrival, validate your visa with OFII within 3 months.", links:[{label:"France-Visas — Official Portal",url:"https://france-visas.gouv.fr/"},{label:"OFII — Validate Your Visa on Arrival",url:"https://www.ofii.fr"}] },
    JP: { heading:"Japan Visa Pathways", body:"Japan's main work visa categories include Engineer/Specialist in Humanities/International Services, Skilled Labour, and Intracompany Transferee. The Highly Skilled Professional visa (HSP) offers fast-track permanent residency (as little as 1–3 years). Japan introduced a Digital Nomad visa in 2024 for 6-month stays.", links:[{label:"Japan Immigration Services Agency",url:"https://www.moj.go.jp/isa/index.html"},{label:"Japan Highly Skilled Professional Visa",url:"https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri70_00003.html"}] },
    SG: { heading:"Singapore Work Pass System", body:"Singapore's work pass system is employer-driven. The Employment Pass (EP) targets professionals earning S$5,000+/month. The S Pass covers mid-skilled workers. EntrePass is for entrepreneurs. The ONE Pass is for top global talent earning S$30,000+/month. All passes require employer sponsorship via MOM.", links:[{label:"MOM — Employment Pass",url:"https://www.mom.gov.sg/passes-and-permits/employment-pass"},{label:"MOM — Work Pass Eligibility Check",url:"https://www.mom.gov.sg/eservices/services/wp-eligibility-online"}] },
    AE: { heading:"UAE Residency & Visa Pathways", body:"The UAE offers employer-sponsored work visas, the 5-year or 10-year Golden Visa (for investors, entrepreneurs, and specialists), and a Freelancer/Remote Work Visa. Free zone company setup provides a business residency pathway. There is no personal income tax in the UAE.", links:[{label:"GDRFA — Dubai Residency Authority",url:"https://gdrfad.gov.ae"},{label:"UAE Golden Visa — Official Info",url:"https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visa/golden-visa"}] },
    TH: { heading:"Thailand Visa Pathways", body:"For long-term stays, Thailand offers the Long-Term Resident (LTR) Visa (10 years, for wealthy individuals, retirees, skilled workers, and remote workers), the Thailand Elite Visa (paid membership, 5–20 years), and the SMART Visa for investors and specialists. The Non-Immigrant B visa requires employer sponsorship and a work permit.", links:[{label:"Thai Immigration Bureau",url:"https://www.immigration.go.th"},{label:"BOI — LTR Visa & SMART Visa",url:"https://www.boi.go.th/en/index"}] },
    MX: { heading:"Mexico Visa Pathways", body:"Citizens of most Western countries can enter Mexico visa-free for up to 180 days as tourists. For longer stays, the Temporary Resident Visa requires proof of income (approx. $2,600 USD/month or $43,000 USD in savings). After 4 years of temporary residency, permanent residency is available.", links:[{label:"INM — Instituto Nacional de Migración",url:"https://www.gob.mx/inm"},{label:"Mexico Temporary Resident Visa Guide",url:"https://embamex.sre.gob.mx/australia/index.php/en/"}] },
    BR: { heading:"Brazil Visa Pathways", body:"Brazil offers a Digital Nomad Visa for remote workers (VITEM XIV) — requires proof of income of at least R$18,000/month (~$3,600 USD) or R$216,000 in savings. Standard work visas are employer-sponsored. Citizens of many countries can enter Brazil visa-free for 90 days. Permanent residency is available after 4 years.", links:[{label:"Polícia Federal — Brazil Immigration",url:"https://www.gov.br/pf/pt-br/assuntos/imigracao"},{label:"Brazil Digital Nomad Visa (VITEM XIV)",url:"https://www.gov.br/mre/pt-br/canais_atendimento/portal-consular/vitem-xiv"}] },
    ID: { heading:"Indonesia Visa Pathways", body:"Indonesia offers a Social Visa (B211A) for stays up to 60 days, extendable up to 6 months — popular with digital nomads in Bali. The Limited Stay Visa (VITAS/ITAS) covers work, investment, and retirement. The Second Home Visa allows wealthy foreigners a 5 or 10-year stay. Work permits (IMTA) must be sponsored by an Indonesian employer or PT PMA company.", links:[{label:"Ditjen Imigrasi — Indonesian Immigration",url:"https://www.imigrasi.go.id"},{label:"BKPM — Investment & KITAS Sponsorship",url:"https://www.bkpm.go.id/en"}] },
    NZ: { heading:"New Zealand Visa Pathways", body:"New Zealand's Skilled Migrant Category (SMC) is points-based. The Accredited Employer Work Visa (AEWV) is the main employer-sponsored route. Working Holiday visas are available for under-35s from eligible countries. After 5 years of residence, you can apply for permanent residency.", links:[{label:"Immigration NZ — Skilled Migrant",url:"https://www.immigration.govt.nz/new-zealand-visas/preparing-a-visa-application/working-in-nz"},{label:"Immigration NZ — All Visas",url:"https://www.immigration.govt.nz/new-zealand-visas"}] },
    DEFAULT: { heading:"Research Official Sources", body:"Immigration requirements vary significantly based on your nationality and circumstances. Always verify current requirements via the official embassy or consulate of your destination country. Requirements change frequently.", links:[{label:"IATA Timatic — Visa Check Tool",url:"https://www.iata.org/en/services/compliance/timatic"},{label:"Expatica — Expat Guides by Country",url:"https://www.expatica.com/moving"}] }
  },
  costs: {
    DEFAULT: { heading:"Tools to Research Costs Further", links:[{label:"Numbeo — Real Cost of Living Data",url:"https://www.numbeo.com/cost-of-living"},{label:"Expatistan — Cost Comparisons",url:"https://www.expatistan.com/cost-of-living"},{label:"Nomad List — Quality of Life & Cost Comparison",url:"https://nomadlist.com"}] }
  },
  tips: {
    DEFAULT: { heading:"Expat Community Resources", links:[{label:"Internations — Global Expat Network",url:"https://www.internations.org"},{label:"Expat.com — Country Forums",url:"https://www.expat.com"},{label:"Reddit r/expats",url:"https://www.reddit.com/r/expats"},{label:"Wise — International Money Transfers",url:"https://wise.com"},{label:"Revolut — Multi-Currency Banking",url:"https://www.revolut.com"}] }
  }
};

const SAFETY_WARNINGS = {
  AF:{level:4,msg:"Do Not Travel — active armed conflict, terrorism, and kidnapping."},
  UA:{level:3,msg:"Reconsider Travel — ongoing war with Russia. High risk across the entire country."},
  RU:{level:4,msg:"Do Not Travel — ongoing war, arbitrary detention of foreigners."},
  SY:{level:4,msg:"Do Not Travel — civil war, terrorism, and chemical weapons use."},
  YE:{level:4,msg:"Do Not Travel — armed conflict and terrorism."},
  LY:{level:4,msg:"Do Not Travel — armed conflict and terrorism."},
  IQ:{level:4,msg:"Do Not Travel — terrorism and armed conflict."},
  MM:{level:4,msg:"Do Not Travel — military coup, civil war, and civil unrest since 2021."},
  BY:{level:3,msg:"Reconsider Travel — authoritarian government; arbitrary detention of foreigners reported."},
  SD:{level:4,msg:"Do Not Travel — active civil war since 2023."},
  VE:{level:4,msg:"Do Not Travel — crime, civil unrest, and inadequate healthcare."},
  IR:{level:4,msg:"Do Not Travel — arbitrary arrest and detention of foreigners by government."},
  ML:{level:3,msg:"Reconsider Travel — terrorism and armed conflict in northern regions."},
  HT:{level:4,msg:"Do Not Travel — widespread gang violence and kidnapping."},
  SO:{level:4,msg:"Do Not Travel — terrorism, armed conflict, and piracy."},
};

const VISA_SPECIALS = {
  "AU→US":{
    badge:"🦘 E-3 Visa — Australians Only",
    info:"Australian citizens have exclusive access to the E-3 visa: 10,500 spots/year, 2-year renewable work visa. Requires a US job offer and specialty occupation degree. Far easier than the H-1B lottery. Your spouse gets E-3D status with full work authorisation.",
    links:[
      {label:"USCIS — E-3 Visa for Australians",url:"https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-3-specialty-occupation-workers-from-australia"},
      {label:"State Dept — E-3 Visa Information",url:"https://travel.state.gov/content/travel/en/us-visas/employment/temporary-worker-visas.html"},
    ]
  },
  "NZ→AU":{
    badge:"🥝 Special Category Visa (SCV)",
    info:"New Zealand citizens automatically receive a Special Category Visa on arrival in Australia — no application needed. You can live, work, and study in Australia indefinitely, though permanent residency must be formally applied for.",
    links:[{label:"Home Affairs — NZ Citizens in Australia",url:"https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/special-category-visa-subclass-444"}]
  },
  "GB→CA":{
    badge:"🇬🇧 IEC Working Holiday — UK Citizens",
    info:"UK citizens aged 18–35 can apply for the International Experience Canada (IEC) Working Holiday — up to 2 years to live and work freely across Canada.",
    links:[{label:"IRCC — IEC Working Holiday",url:"https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec/about.html"}]
  },
  "IE→AU":{
    badge:"🇮🇪 Working Holiday Visa — Irish Citizens",
    info:"Irish citizens aged 18–35 can apply for a Working Holiday visa for Australia — 1 year, extendable to 3 years with regional work. One of Australia's most popular Working Holiday nationalities.",
    links:[{label:"Home Affairs — Working Holiday Visa (417)",url:"https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"}]
  },
  "IN→AU":{
    badge:"🇮🇳 MATES & Skilled Visas",
    info:"Indian citizens can migrate to Australia via the points-based General Skilled Migration (Subclass 189/190/491). Additionally, the new MATES scheme offers a fast-track temporary work pathway (up to 2 years) for early-career Indian professionals in STEM and tech sectors.",
    links:[
      {label:"Home Affairs — MATES Scheme",url:"https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-work-403/mates"},
      {label:"SkillSelect Points Calculator",url:"https://immi.homeaffairs.gov.au/help-support/tools/points-calculator"}
    ]
  },
  "AU→IN":{
    badge:"🇦🇺 OCI & Indian Visas",
    info:"Australians of Indian origin can apply for an OCI (Overseas Citizenship of India) card for lifelong residency and work rights. For other Australians, an Employment Visa (sponsored by a local entity with a minimum salary) or Business Visa is required. E-visas are available for short tourist/business trips.",
    links:[
      {label:"VFS Global — Indian Visa Services Australia",url:"https://services.vfsglobal.com/aus/en/ind"},
      {label:"Indian E-Visa Portal",url:"https://indianvisaonline.gov.in/evisa/tvoa.html"}
    ]
  },
};

const AFFILIATE_LINKS = {
  wise: "https://wise.com/invite/dic/albertc552", // User's personal Wise affiliate link
  safetywing: "https://safetywing.com/?referenceID=26540784&utm_source=26540784&utm_medium=Ambassador", // User's personal SafetyWing affiliate link
  airalo: "https://airalo.com", // EDIT THIS with your Airalo affiliate link
  worldnomads: "https://www.worldnomads.com", // EDIT THIS with your World Nomads affiliate link
  cigna: "https://www.cignaglobal.com/", // EDIT THIS with your Cigna affiliate link
};

const CHECKLIST_LINKS = {
  "Research visa requirements for your destination":"https://www.iata.org/en/services/compliance/timatic",
  "Apply for your visa or residency permit":"https://www.iata.org/en/services/compliance/timatic",
  "Get a certified translation of key documents":"https://www.atanet.org/find-a-language-professional/",
  "Apostille important documents (birth cert, marriage cert, degree)":"https://www.hcch.net/en/instruments/conventions/authorities1/?cid=41",
  "Open an international bank account (Wise, Revolut, Charles Schwab)": AFFILIATE_LINKS.wise,
  "Book flights and organise travel insurance": AFFILIATE_LINKS.worldnomads,
  "Research international shipping companies for belongings":"https://www.sirelo.com",
  "Research international health insurance options": AFFILIATE_LINKS.cigna,
  "Consult a tax advisor about international tax implications":"https://www.taxesforexpats.com",
  "Research international schools if moving with children":"https://www.internationalschoolsdb.com",
  "Begin learning the local language basics":"https://www.duolingo.com",
  "Register at local government office (residency registration)":"https://www.expat.com/en/guide/",
  "Open a local bank account": AFFILIATE_LINKS.wise,
  "Apply for local tax identification number":"https://www.taxesforexpats.com",
  "Convert your driving licence if needed":"https://www.theaa.com/driving-advice/driving-abroad",
};

const QUIZ_QUESTIONS = [
  {id:"budget",question:"What's your monthly budget for living costs?",icon:"💰",
   options:[{label:"Under $1,000/mo",value:900},{label:"$1,000 – $2,000/mo",value:1600},{label:"$2,000 – $3,500/mo",value:2800},{label:"Over $3,500/mo",value:5000}]},
  {id:"climate",question:"What climate do you prefer?",icon:"🌤",
   options:[{label:"🌴 Tropical / Hot year-round",value:"tropical"},{label:"☀️ Mediterranean / Warm summers",value:"mediterranean"},{label:"🌧 Temperate / Four seasons",value:"temperate"},{label:"❄️ Cold / Nordic",value:"cold"},{label:"🌍 No preference",value:"any"}]},
  {id:"language",question:"How important is English being widely spoken?",icon:"🗣",
   options:[{label:"Essential — I only speak English",value:"english_only"},{label:"Preferred but I can learn",value:"english_preferred"},{label:"Not important — I love immersion",value:"any"}]},
  {id:"situation",question:"What's your work situation?",icon:"💼",
   options:[{label:"🏢 Job offer / employer transfer",value:"employed"},{label:"💻 Remote worker / freelancer",value:"remote"},{label:"🏖 Retired or passive income",value:"retired"},{label:"🎓 Student",value:"student"},{label:"🔍 Still figuring it out",value:"undecided"}]},
  {id:"priority",question:"What's your top priority in a new country?",icon:"⭐",
   options:[{label:"💸 Low cost of living",value:"cost"},{label:"🛡 Safety & stability",value:"safety"},{label:"🚀 Career opportunities",value:"career"},{label:"🏖 Lifestyle & quality of life",value:"lifestyle"},{label:"🏥 World-class healthcare",value:"healthcare"}]},
  {id:"family",question:"Who is moving with you?",icon:"👨‍👩‍👧",
   options:[{label:"🧍 Just me",value:"solo"},{label:"💑 Me and my partner",value:"couple"},{label:"👨‍👩‍👧 Family with children",value:"family"}]},
  {id:"visa",question:"How quickly do you want to move?",icon:"✈️",
   options:[{label:"ASAP (Need an easy/fast visa)",value:"easy"},{label:"In 1-2 Years (Willing to wait)",value:"wait"},{label:"I already have dual citizenship",value:"citizen"}]},
  {id:"vibe",question:"What kind of vibe are you looking for?",icon:"🏙",
   options:[{label:"Fast-paced & ambitious",value:"fast"},{label:"Relaxed & laid back",value:"relaxed"},{label:"A balanced mix of both",value:"mixed"}]},
  {id:"healthcare_pref",question:"What is your healthcare preference?",icon:"🩺",
   options:[{label:"Universal public healthcare",value:"public"},{label:"Private & fast (I'll buy insurance)",value:"private"},{label:"No preference",value:"any"}]},
  {id:"transit",question:"How do you want to get around?",icon:"🚇",
   options:[{label:"Excellent public transit",value:"transit"},{label:"I plan to own a car",value:"drive"},{label:"Walkable & cycling-friendly",value:"walk"}]}
];

const COUNTRY_PROFILES = {
  AU:{climates:["tropical","mediterranean","temperate"],english:true,visaEase:2,costScore:2500,safetyScore:9,careerScore:8,lifestyleScore:9,healthcareScore:8,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  CA:{climates:["cold","temperate"],english:true,visaEase:2,costScore:2100,safetyScore:9,careerScore:9,lifestyleScore:9,healthcareScore:9,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  DE:{climates:["temperate","cold"],english:false,visaEase:2,costScore:1800,safetyScore:9,careerScore:9,lifestyleScore:8,healthcareScore:9,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  GB:{climates:["temperate"],english:true,visaEase:1,costScore:2200,safetyScore:8,careerScore:9,lifestyleScore:8,healthcareScore:8,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  US:{climates:["tropical","mediterranean","temperate","cold"],english:true,visaEase:1,costScore:2400,safetyScore:7,careerScore:10,lifestyleScore:8,healthcareScore:6,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  JP:{climates:["temperate"],english:false,visaEase:2,costScore:1400,safetyScore:10,careerScore:7,lifestyleScore:9,healthcareScore:9,remoteOk:false,retiredOk:false,studentOk:true,familyOk:true},
  PT:{climates:["mediterranean"],english:false,visaEase:3,costScore:1500,safetyScore:9,careerScore:7,lifestyleScore:9,healthcareScore:8,remoteOk:true,retiredOk:true,studentOk:true,familyOk:true},
  SG:{climates:["tropical"],english:true,visaEase:2,costScore:2700,safetyScore:10,careerScore:9,lifestyleScore:8,healthcareScore:9,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  AE:{climates:["tropical"],english:true,visaEase:3,costScore:2300,safetyScore:9,careerScore:8,lifestyleScore:8,healthcareScore:8,remoteOk:true,retiredOk:true,studentOk:false,familyOk:true},
  TH:{climates:["tropical"],english:false,visaEase:3,costScore:900,safetyScore:7,careerScore:5,lifestyleScore:9,healthcareScore:7,remoteOk:true,retiredOk:true,studentOk:false,familyOk:true},
  NL:{climates:["temperate"],english:true,visaEase:2,costScore:2000,safetyScore:9,careerScore:9,lifestyleScore:9,healthcareScore:9,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  ES:{climates:["mediterranean"],english:false,visaEase:2,costScore:1300,safetyScore:8,careerScore:7,lifestyleScore:9,healthcareScore:8,remoteOk:true,retiredOk:true,studentOk:true,familyOk:true},
  FR:{climates:["temperate","mediterranean"],english:false,visaEase:2,costScore:1600,safetyScore:8,careerScore:8,lifestyleScore:9,healthcareScore:9,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
  MX:{climates:["tropical","mediterranean"],english:false,visaEase:3,costScore:850,safetyScore:5,careerScore:6,lifestyleScore:8,healthcareScore:6,remoteOk:true,retiredOk:true,studentOk:false,familyOk:false},
  BR:{climates:["tropical","temperate"],english:false,visaEase:3,costScore:850,safetyScore:5,careerScore:6,lifestyleScore:8,healthcareScore:6,remoteOk:true,retiredOk:false,studentOk:false,familyOk:false},
  NZ:{climates:["temperate","mediterranean"],english:true,visaEase:2,costScore:2000,safetyScore:9,careerScore:7,lifestyleScore:10,healthcareScore:8,remoteOk:true,retiredOk:true,studentOk:true,familyOk:true},
  IN:{climates:["tropical","temperate"],english:true,visaEase:2,costScore:700,safetyScore:6,careerScore:7,lifestyleScore:7,healthcareScore:7,remoteOk:true,retiredOk:false,studentOk:true,familyOk:true},
};

// Additional country data for missing countries
const EXTRA_COUNTRY_DATA = {
  AT: { cost:{rent:1200,food:320,transport:100,utilities:190,dining:190}, visaDifficulty:"Medium", visaType:"EU Blue Card / Work Permit / Family / Student", visaTime:"2–6 months", language:"German", climate:"Temperate; cold winters", qualityOfLife:8.9, healthcare:"Universal (e-card)", currency:"EUR", tips:["Register at your local Meldezettel office within 3 days of arrival","Sozialversicherung (social insurance) covers health, pension, and unemployment","Public transport (Wiener Linien in Vienna) is world-class and affordable","German is essential for everyday life outside tourist areas","Austria has strict tenancy laws — read your Mietvertrag carefully"] },
  IT: { cost:{rent:1000,food:290,transport:70,utilities:160,dining:180}, visaDifficulty:"Medium", visaType:"Work Permit / EU Blue Card / Digital Nomad / Elective Residency / Student", visaTime:"2–6 months", language:"Italian", climate:"Mediterranean / varied", qualityOfLife:8.3, healthcare:"Universal (SSN)", currency:"EUR", tips:["Codice Fiscale (tax code) is needed for almost everything","Register at your local Comune within 20 days","Healthcare via SSN is free but can be slow; many expats use private top-ups","Permesso di Soggiorno (residence permit) required within 8 days of arrival","Italian bureaucracy is notoriously slow — start everything early"] },
  GR: { cost:{rent:700,food:250,transport:60,utilities:140,dining:160}, visaDifficulty:"Easy", visaType:"Digital Nomad / Golden Visa / Work Permit / Student", visaTime:"1–4 months", language:"Greek", climate:"Mediterranean; hot summers", qualityOfLife:7.8, healthcare:"Universal (ESY)", currency:"EUR", tips:["AMKA (social security number) and AFM (tax number) are essential first steps","Golden Visa requires €250,000+ property investment","Digital Nomad visa (50% income tax reduction for 7 years) is very attractive","Public healthcare is free but strained; private is affordable","English widely spoken in tourist areas, less so in rural regions"] },
  PL: { cost:{rent:700,food:220,transport:50,utilities:130,dining:140}, visaDifficulty:"Medium", visaType:"Work Permit / EU Blue Card / Temporary Residence / Student", visaTime:"1–4 months", language:"Polish", climate:"Temperate; cold winters", qualityOfLife:7.9, healthcare:"Universal (NFZ)", currency:"PLN", tips:["PESEL number (national ID) needed for most admin tasks","Register your address within 30 days at local Urząd","Polish is not widely spoken in English outside major cities","Cost of living is one of Europe's lowest for a developed country","Warsaw and Krakow have booming tech scenes"] },
  CZ: { cost:{rent:800,food:240,transport:50,utilities:130,dining:150}, visaDifficulty:"Medium", visaType:"Employee Card / Blue Card / Long-Stay Visa / Student", visaTime:"2–5 months", language:"Czech", climate:"Temperate; cold winters", qualityOfLife:8.1, healthcare:"Universal (VZP)", currency:"CZK", tips:["Czech Koruna (CZK) — not EUR despite being in EU","Register at Foreign Police within 3 days of arrival","Prague has a large expat community; English widely spoken","Public transport in Prague is excellent and very cheap","Tax returns required even if employer handles payroll"] },
  SE: { cost:{rent:1200,food:350,transport:80,utilities:100,dining:200}, visaDifficulty:"Medium", visaType:"Work Permit / EU Blue Card / Sambo Visa / Student", visaTime:"3–12 months", language:"Swedish / English", climate:"Cold; dark winters", qualityOfLife:9.2, healthcare:"Universal (Landsting)", currency:"SEK", tips:["Personnummer (personal number) is essential — apply at Skatteverket","Swedish work permits tied to employer — changing jobs requires new permit","English is spoken at near-native level across Sweden","High taxes but exceptional public services, parental leave, and quality of life","Winters are dark and cold — prepare mentally for the lack of daylight"] },
  NO: { cost:{rent:1500,food:500,transport:90,utilities:120,dining:250}, visaDifficulty:"Medium", visaType:"Skilled Worker / EEA / Self-Employed / Student", visaTime:"1–4 months", language:"Norwegian / English", climate:"Cold; extreme in north", qualityOfLife:9.4, healthcare:"Universal (Helfo)", currency:"NOK", tips:["D-number then Personnummer — apply at Tax Office on arrival","Norway is not in the EU but in the Schengen Area and EEA","Salary levels are very high but so are costs — especially housing and food","Friluftsliv (outdoor life) culture is central — embrace it","Norwegian proficiency speeds up integration significantly"] },
  DK: { cost:{rent:1300,food:420,transport:70,utilities:120,dining:220}, visaDifficulty:"Medium", visaType:"Work Permit / Green Card / Fast-track / Student", visaTime:"1–3 months", language:"Danish / English", climate:"Temperate; wet and windy", qualityOfLife:9.3, healthcare:"Universal (sygesikring)", currency:"DKK", tips:["CPR number (civil registration) is the key to everything in Denmark","Danes speak near-perfect English — but learning Danish helps integration","Cycling is the primary transport in Copenhagen","High taxes fund world-class public services","Denmark consistently ranks #1 in happiness surveys"] },
  IE: { cost:{rent:1800,food:350,transport:100,utilities:180,dining:230}, visaDifficulty:"Medium", visaType:"Critical Skills / Stamp 1G / Working Holiday / Family / Student", visaTime:"4–8 weeks", language:"English", climate:"Temperate; very rainy", qualityOfLife:8.4, healthcare:"Mixed (HSE public + private)", currency:"EUR", tips:["PPS number (tax) is the first thing to apply for","Register with a GP immediately; public hospital waits can be long","Housing in Dublin is extremely competitive — start your search early","Irish culture is warm and social — pubs are central to community life","Remote work is widely accepted; Ireland has a large tech sector"] },
  NZ: { cost:{rent:1600,food:380,transport:90,utilities:130,dining:230}, visaDifficulty:"Medium", visaType:"Skilled Migrant / Working Holiday / Accredited Employer Work / Student", visaTime:"3–12 months", language:"English", climate:"Temperate / Mediterranean", qualityOfLife:9.0, healthcare:"Universal (ACC + DHB)", currency:"NZD", tips:["IRD number (tax) must be obtained in first weeks","Register with a GP as soon as possible — shortage of doctors","ACC (Accident Compensation) covers injuries — unique to NZ","Driving is on the left; roads can be challenging outside cities","NZ is far from most countries — factor in isolation and travel costs"] },
  CH: { cost:{rent:2200,food:500,transport:120,utilities:180,dining:350}, visaDifficulty:"Hard", visaType:"Work Permit L/B/C / EU preferential / Family / Student", visaTime:"2–6 months", language:"German / French / Italian / Romansh", climate:"Temperate / Alpine", qualityOfLife:9.5, healthcare:"Mandatory private insurance (~CHF 350+/mo)", currency:"CHF", tips:["Health insurance is mandatory and expensive — budget carefully","Language varies by canton: German (Zurich), French (Geneva), Italian (Lugano)","Switzerland is NOT in the EU — different rules apply for non-EU citizens","Salary levels are the highest in Europe, offsetting very high costs","Krankenkasse (health insurance) must be in place within 3 months of arrival"] },
  BE: { cost:{rent:1000,food:290,transport:80,utilities:160,dining:190}, visaDifficulty:"Medium", visaType:"Work Permit B / EU Blue Card / Single Permit / Student", visaTime:"3–6 months", language:"French / Dutch / German", climate:"Temperate; rainy", qualityOfLife:8.3, healthcare:"Universal (INAMI/RIZIV)", currency:"EUR", tips:["Register at Commune/Gemeente within 8 days of arrival","Language depends heavily on region: French in Wallonia, Dutch in Flanders","Carte de séjour (residence card) issued after commune registration","Belgium has one of the highest tax rates in the world — check your net salary","Brussels is home to EU institutions — huge expat community"] },
};

// Merge extra data into COUNTRY_DATA
Object.assign(COUNTRY_DATA, EXTRA_COUNTRY_DATA);

const TRENDING_BY_ORIGIN = {
  ALL: [
    {code:"PT",tagline:"Digital nomad paradise",trend:"↑ 34% this year"},
    {code:"DE",tagline:"Europe's economic engine",trend:"↑ 22% this year"},
    {code:"CA",tagline:"World-class quality of life",trend:"↑ 18% this year"},
    {code:"AU",tagline:"Sunny, safe, and thriving",trend:"↑ 15% this year"},
    {code:"AE",tagline:"Tax-free with global connectivity",trend:"↑ 28% this year"},
    {code:"TH",tagline:"Affordable tropical living",trend:"↑ 41% this year"},
    {code:"NL",tagline:"Innovation hub of Europe",trend:"↑ 12% this year"},
    {code:"SG",tagline:"Asia's premier expat city",trend:"↑ 19% this year"},
  ],
  GB: [
    {code:"AU",tagline:"Sun, sport & English culture",trend:"↑ 28% this year"},
    {code:"AE",tagline:"Tax-free salaries, warm winters",trend:"↑ 31% this year"},
    {code:"CA",tagline:"Commonwealth & great outdoors",trend:"↑ 22% this year"},
    {code:"ES",tagline:"Sunshine & cheap cost of living",trend:"↑ 19% this year"},
    {code:"PT",tagline:"EU rights & NHR tax benefits",trend:"↑ 25% this year"},
    {code:"NZ",tagline:"Adventure & quality of life",trend:"↑ 18% this year"},
    {code:"DE",tagline:"Strong economy, EU base",trend:"↑ 15% this year"},
    {code:"US",tagline:"Career & earning potential",trend:"↑ 12% this year"},
  ],
  US: [
    {code:"CA",tagline:"Universal healthcare & safety",trend:"↑ 45% this year"},
    {code:"PT",tagline:"NHR tax & Mediterranean life",trend:"↑ 62% this year"},
    {code:"MX",tagline:"Affordable & close to home",trend:"↑ 38% this year"},
    {code:"ES",tagline:"Mediterranean lifestyle",trend:"↑ 29% this year"},
    {code:"DE",tagline:"European stability & career",trend:"↑ 22% this year"},
    {code:"TH",tagline:"Top digital nomad destination",trend:"↑ 41% this year"},
    {code:"AU",tagline:"English-speaking & safe",trend:"↑ 18% this year"},
    {code:"NL",tagline:"Expat-friendly & central EU",trend:"↑ 17% this year"},
  ],
  AU: [
    {code:"GB",tagline:"The classic working holiday",trend:"↑ 15% this year"},
    {code:"US",tagline:"E-3 visa opportunity",trend:"↑ 22% this year"},
    {code:"PT",tagline:"NHR tax & EU base",trend:"↑ 35% this year"},
    {code:"AE",tagline:"Tax-free & year-round sun",trend:"↑ 28% this year"},
    {code:"DE",tagline:"EU's tech & engineering hub",trend:"↑ 20% this year"},
    {code:"NZ",tagline:"Across the Tasman Sea",trend:"↑ 12% this year"},
    {code:"JP",tagline:"Culture & safety",trend:"↑ 18% this year"},
    {code:"CA",tagline:"Commonwealth & big skies",trend:"↑ 16% this year"},
    {code:"IN",tagline:"Tech hub & MATES scheme",trend:"↑ 38% this year"},
  ],
  CA: [
    {code:"PT",tagline:"NHR & European lifestyle",trend:"↑ 44% this year"},
    {code:"MX",tagline:"Warmth & affordability",trend:"↑ 32% this year"},
    {code:"DE",tagline:"EU opportunities",trend:"↑ 19% this year"},
    {code:"AU",tagline:"Sun & Commonwealth ties",trend:"↑ 17% this year"},
    {code:"GB",tagline:"History, culture & opportunity",trend:"↑ 14% this year"},
    {code:"ES",tagline:"Sun, sea & sangria",trend:"↑ 23% this year"},
    {code:"TH",tagline:"Retirement & nomad hotspot",trend:"↑ 38% this year"},
    {code:"AE",tagline:"Tax-free living & expat hub",trend:"↑ 26% this year"},
  ],
  IN: [
    {code:"CA",tagline:"Large Indian diaspora & PR pathway",trend:"↑ 52% this year"},
    {code:"AU",tagline:"PR pathway & tech demand",trend:"↑ 38% this year"},
    {code:"DE",tagline:"EU Blue Card & engineering jobs",trend:"↑ 44% this year"},
    {code:"GB",tagline:"Historical ties & Skilled Worker",trend:"↑ 29% this year"},
    {code:"AE",tagline:"Large Indian community, no tax",trend:"↑ 41% this year"},
    {code:"SG",tagline:"Regional hub & EP pathway",trend:"↑ 33% this year"},
    {code:"US",tagline:"H-1B & tech career ceiling",trend:"↑ 25% this year"},
    {code:"NL",tagline:"HSM fast-track & EU base",trend:"↑ 31% this year"},
  ],
  DE: [
    {code:"CH",tagline:"Higher salaries, German-speaking",trend:"↑ 22% this year"},
    {code:"AU",tagline:"Sun & work-life balance",trend:"↑ 18% this year"},
    {code:"CA",tagline:"PR pathway & outdoors",trend:"↑ 16% this year"},
    {code:"PT",tagline:"Warm & affordable EU living",trend:"↑ 29% this year"},
    {code:"US",tagline:"Tech & startup opportunities",trend:"↑ 14% this year"},
    {code:"NL",tagline:"English-friendly & nearby",trend:"↑ 17% this year"},
    {code:"AE",tagline:"Tax-free & warm winters",trend:"↑ 23% this year"},
    {code:"NZ",tagline:"Nature & quality of life",trend:"↑ 12% this year"},
  ],
  ZA: [
    {code:"AU",tagline:"Large SA community & sunny",trend:"↑ 48% this year"},
    {code:"GB",tagline:"Ancestral visa & work rights",trend:"↑ 35% this year"},
    {code:"CA",tagline:"PR pathway & safety",trend:"↑ 29% this year"},
    {code:"NZ",tagline:"Nature & quality of life",trend:"↑ 26% this year"},
    {code:"AE",tagline:"Tax-free & expat community",trend:"↑ 32% this year"},
    {code:"PT",tagline:"EU base & affordability",trend:"↑ 38% this year"},
    {code:"DE",tagline:"EU Blue Card & engineering",trend:"↑ 21% this year"},
    {code:"NL",tagline:"English-friendly & EU hub",trend:"↑ 19% this year"},
  ],
  NG: [
    {code:"CA",tagline:"Large Nigerian community & PR",trend:"↑ 55% this year"},
    {code:"GB",tagline:"Historical ties & opportunity",trend:"↑ 42% this year"},
    {code:"US",tagline:"Diversity visa & scholarships",trend:"↑ 38% this year"},
    {code:"DE",tagline:"EU Blue Card & tech demand",trend:"↑ 36% this year"},
    {code:"AE",tagline:"Tax-free & proximity to home",trend:"↑ 29% this year"},
    {code:"IE",tagline:"EU access & English language",trend:"↑ 31% this year"},
    {code:"AU",tagline:"Growing pathway & opportunity",trend:"↑ 22% this year"},
    {code:"NL",tagline:"HSM visa & EU base",trend:"↑ 27% this year"},
  ],
  PH: [
    {code:"CA",tagline:"Large Filipino community & PR",trend:"↑ 44% this year"},
    {code:"AU",tagline:"Growing demand & PR pathway",trend:"↑ 38% this year"},
    {code:"AE",tagline:"Large OFW community, tax-free",trend:"↑ 51% this year"},
    {code:"US",tagline:"Family ties & H-1B",trend:"↑ 29% this year"},
    {code:"SG",tagline:"Proximity & EP pathway",trend:"↑ 35% this year"},
    {code:"GB",tagline:"Skilled Worker visa & NHS",trend:"↑ 32% this year"},
    {code:"NZ",tagline:"Quality of life & PR",trend:"↑ 22% this year"},
    {code:"DE",tagline:"EU Blue Card opportunities",trend:"↑ 24% this year"},
  ],
};

// Top origin countries to show as quick filters
const ORIGIN_FILTERS = [
  {code:"ALL",flag:"🌍",label:"All"},
  {code:"GB", flag:"🇬🇧",label:"UK"},
  {code:"US", flag:"🇺🇸",label:"USA"},
  {code:"AU", flag:"🇦🇺",label:"Australia"},
  {code:"CA", flag:"🇨🇦",label:"Canada"},
  {code:"IN", flag:"🇮🇳",label:"India"},
  {code:"DE", flag:"🇩🇪",label:"Germany"},
  {code:"ZA", flag:"🇿🇦",label:"South Africa"},
  {code:"NG", flag:"🇳🇬",label:"Nigeria"},
  {code:"PH", flag:"🇵🇭",label:"Philippines"},
];

// Diaspora/community data. Sizes are approximate from census & immigration stats.
// Structure: DIASPORA_DATA[destinationCode] = { national:{originCode:{size,desc}}, cities:{cityName:{originCode:{size,desc}}} }
const DIASPORA_DATA = {
  AU: {
    national: {
      GB:{size:1210000,desc:"Largest expat group in Australia"},IN:{size:720000,desc:"Fastest-growing; major tech & healthcare presence"},CN:{size:650000,desc:"Large established communities in Sydney & Melbourne"},NZ:{size:600000,desc:"Trans-Tasman free movement"},PH:{size:310000,desc:"Large nursing & care workforce"},IT:{size:250000,desc:"Deep historical roots since 1950s"},VN:{size:240000,desc:"Strong communities in Melbourne & Sydney"},GR:{size:140000,desc:"Established since post-WWII migration"},ZA:{size:135000,desc:"Concentrated in Perth & Sydney"},BR:{size:82000,desc:"Growing; active communities in major cities"},DE:{size:120000,desc:"Skilled workers & academics"},KR:{size:105000,desc:"Concentrated in Sydney & Melbourne"},IE:{size:100000,desc:"Strong pub & sporting communities"},
    },
    cities: {
      "Sydney, NSW":{GB:{size:300000,desc:"Largest UK expat city worldwide; Bondi & Manly"},IN:{size:200000,desc:"Parramatta is the heart of Sydney's Indian community"},CN:{size:250000,desc:"Haymarket Chinatown & Hurstville"},BR:{size:22000,desc:"Active community; Braza FC soccer club & cultural events"},ZA:{size:28000,desc:""},PH:{size:85000,desc:""}},
      "Melbourne, VIC":{GB:{size:260000,desc:"South Yarra & St Kilda expat hubs"},IN:{size:220000,desc:"Dandenong & Sunshine; largest in Aus"},CN:{size:200000,desc:"Box Hill & Richmond Chinatown"},GR:{size:90000,desc:"Melbourne has the 3rd largest Greek population outside Greece"},IT:{size:130000,desc:"Carlton 'Little Italy' is iconic"},BR:{size:18000,desc:"Growing community; regular churrascos & football"},VN:{size:90000,desc:"Footscray & Richmond"},ZA:{size:20000,desc:""}},
      "Perth, WA":{GB:{size:150000,desc:"Highest concentration of British expats in Aus; Fremantle hub"},ZA:{size:45000,desc:"One of the largest SA communities outside South Africa; Cottesloe & Subiaco"},IN:{size:60000,desc:""},NZ:{size:40000,desc:""},BR:{size:8000,desc:"Small but active community; growing since 2010s"},PH:{size:35000,desc:"Mining sector & healthcare"},IE:{size:18000,desc:""},DE:{size:15000,desc:""}},
      "Brisbane, QLD":{GB:{size:120000,desc:"Sunshine Coast British community is massive"},NZ:{size:80000,desc:""},ZA:{size:22000,desc:""},IN:{size:55000,desc:""},BR:{size:7000,desc:""},PH:{size:30000,desc:""}},
      "Adelaide, SA":{GB:{size:90000,desc:""},GR:{size:20000,desc:""},IT:{size:60000,desc:""},IN:{size:30000,desc:""},PH:{size:20000,desc:""},VN:{size:15000,desc:""}},
    }
  },
  US: {
    national: {
      MX:{size:11600000,desc:"Largest immigrant group in the US"},IN:{size:2700000,desc:"Fastest-growing; dominates tech sector"},CN:{size:2400000,desc:"Large historic communities in major cities"},PH:{size:2000000,desc:""},VN:{size:1400000,desc:""},GB:{size:750000,desc:"Concentrated in NYC, LA & SF"},KR:{size:1000000,desc:""},DE:{size:400000,desc:""},BR:{size:530000,desc:"Massachusetts, Florida & NYC"},AU:{size:90000,desc:""},CA:{size:800000,desc:"Border communities"},FR:{size:180000,desc:"NYC & San Francisco"},ZA:{size:80000,desc:"Growing; tech & finance"},IE:{size:135000,desc:"NYC, Boston & Chicago"},IL:{size:130000,desc:"Chicago; large Israeli community"},
    },
    cities: {
      "New York, NY":{GB:{size:120000,desc:"Finance & media; Chelsea & Brooklyn"},IN:{size:200000,desc:"Jackson Heights 'Little India' in Queens"},CN:{size:150000,desc:"Manhattan & Flushing Chinatowns"},BR:{size:65000,desc:"Little Brazil on W46th St; Massachusetts to NYC pipeline"},IR:{size:40000,desc:""},GR:{size:30000,desc:"Astoria, Queens"},FR:{size:40000,desc:"Upper East Side cluster"},IL:{size:35000,desc:""},AU:{size:25000,desc:"Finance & media workers"}},
      "Los Angeles, CA":{MX:{size:1800000,desc:"East LA & South LA; 35% of city population"},KR:{size:110000,desc:"Koreatown — most dense Korean community outside Korea"},CN:{size:200000,desc:"San Gabriel Valley"},PH:{size:150000,desc:"Large Filipino community"},BR:{size:60000,desc:""},AU:{size:20000,desc:"Entertainment industry"},GB:{size:40000,desc:"Entertainment & tech"},},
      "San Francisco, CA":{CN:{size:170000,desc:"Oldest Chinatown in US; Sunset District"},IN:{size:180000,desc:"Silicon Valley dominates tech workforce"},VN:{size:50000,desc:"Tenderloin 'Little Saigon'"},PH:{size:40000,desc:""},GB:{size:25000,desc:"Tech sector"},AU:{size:15000,desc:"Tech & finance"},BR:{size:12000,desc:""},},
      "Miami, FL":{BR:{size:45000,desc:"Brickell & Aventura; strong business & lifestyle draw"},CO:{size:100000,desc:""},VE:{size:110000,desc:"Doral 'Doralzuela'"},CU:{size:450000,desc:"Little Havana"},AR:{size:60000,desc:""},GB:{size:15000,desc:""}},
      "Boston, MA":{IE:{size:40000,desc:"South Boston 'Southie' Irish heritage"},BR:{size:80000,desc:"One of the largest Brazilian communities in the US; Framingham suburb"},CN:{size:50000,desc:"Chinatown"},IN:{size:60000,desc:"Tech & academic"},GB:{size:20000,desc:"Academic & finance"},},
    }
  },
  GB: {
    national: {
      IN:{size:1900000,desc:"Largest minority group; Leicester, Birmingham, Southall"},PK:{size:1200000,desc:"Bradford, Birmingham, Manchester"},PL:{size:900000,desc:"Post-EU accession; throughout UK"},IE:{size:500000,desc:"Historical; major cities"},NG:{size:215000,desc:"London concentrated"},ZA:{size:200000,desc:"London & Home Counties"},AU:{size:150000,desc:"Young professionals in London"},US:{size:180000,desc:"Finance & tech in London"},CN:{size:120000,desc:""},FR:{size:180000,desc:"Pre-Brexit; concentrated in London"},
    },
    cities: {
      "London":{IN:{size:600000,desc:"Southall, Wembley, Harrow — 'Little India'"},NG:{size:150000,desc:"Peckham, Brixton"},PL:{size:200000,desc:"Ealing 'Little Warsaw'"},AU:{size:80000,desc:"Clapham, Earls Court — 'Kangaroo Valley'"},ZA:{size:120000,desc:"Wimbledon, Richmond — large expat cluster"},FR:{size:120000,desc:"South Kensington 'Froggie' hub"},US:{size:90000,desc:"Finance workers in Canary Wharf & City"},BR:{size:50000,desc:"East London & Stockwell; large Brazilian church community"},IR:{size:30000,desc:""},CN:{size:80000,desc:"Soho Chinatown & Golders Green"}},
      "Manchester":{IN:{size:80000,desc:"Rusholme 'Curry Mile'"},PK:{size:90000,desc:"Longsight & Levenshulme"},IE:{size:40000,desc:"Fallowfield"},PL:{size:60000,desc:""},AU:{size:12000,desc:"Northern Quarter"},ZA:{size:8000,desc:""}},
      "Edinburgh":{IN:{size:25000,desc:""},PL:{size:30000,desc:""},AU:{size:10000,desc:"Tech & finance"},CN:{size:12000,desc:""},ZA:{size:6000,desc:""}},
    }
  },
  CA: {
    national: {
      IN:{size:1800000,desc:"Fastest-growing; Brampton 'Bramladesh'"},CN:{size:1700000,desc:"Vancouver & Toronto Chinatowns"},PH:{size:960000,desc:"Nursing & care workforce"},GB:{size:600000,desc:""},US:{size:300000,desc:""},KR:{size:240000,desc:""},PK:{size:220000,desc:""},IR:{size:210000,desc:""},NG:{size:150000,desc:""},AU:{size:60000,desc:""},BR:{size:45000,desc:""},ZA:{size:55000,desc:""},
    },
    cities: {
      "Toronto, ON":{IN:{size:600000,desc:"Brampton & Mississauga; largest Indian hub in Canada"},CN:{size:400000,desc:"Markham & Scarborough; Dundas Chinatown"},PH:{size:200000,desc:""},GB:{size:100000,desc:""},IT:{size:120000,desc:"Little Italy on College St"},NG:{size:60000,desc:""},BR:{size:15000,desc:""},ZA:{size:20000,desc:""},US:{size:50000,desc:"Finance & media"}},
      "Vancouver, BC":{CN:{size:450000,desc:"Richmond is effectively a Chinese city; 50% Chinese-Canadian"},IN:{size:150000,desc:"Surrey 'Little Punjab'"},KR:{size:40000,desc:""},PH:{size:80000,desc:""},GB:{size:80000,desc:""},AU:{size:25000,desc:"Tech & outdoors"},BR:{size:8000,desc:""},ZA:{size:15000,desc:""}},
      "Calgary, AB":{IN:{size:90000,desc:""},PH:{size:60000,desc:""},GB:{size:50000,desc:"Oil & gas sector"},ZA:{size:18000,desc:"Energy sector"},US:{size:30000,desc:"Oil & gas"},AU:{size:12000,desc:"Energy & outdoors"},},
    }
  },
  DE: {
    national: {
      TR:{size:2800000,desc:"Largest immigrant group; Berlin, Cologne, Frankfurt"},PL:{size:860000,desc:""},RU:{size:1100000,desc:""},KZ:{size:900000,desc:""},RO:{size:740000,desc:""},IT:{size:660000,desc:""},SY:{size:700000,desc:"Post-2015 refugee wave"},GR:{size:360000,desc:"Post-crisis migration"},IN:{size:190000,desc:"IT sector boom"},CN:{size:180000,desc:""},US:{size:100000,desc:"Finance & tech"},GB:{size:120000,desc:"Pre-Brexit & post-Brexit"},
    },
    cities: {
      "Berlin":{TR:{size:200000,desc:"Kreuzberg & Neukölln — 'Little Istanbul'"},VN:{size:20000,desc:"Dong Xuan Center"},US:{size:35000,desc:"Start-up & arts scene"},GB:{size:25000,desc:"Creative industries"},SY:{size:40000,desc:"Post-2015 wave"},IN:{size:30000,desc:"Tech & academic"},FR:{size:20000,desc:""},AU:{size:8000,desc:""}},
      "Munich":{TR:{size:50000,desc:""},IT:{size:60000,desc:""},US:{size:20000,desc:"Finance & tech"},GB:{size:18000,desc:""},IN:{size:25000,desc:"BMW & tech sector"},GR:{size:25000,desc:""}},
      "Frankfurt":{TR:{size:60000,desc:""},IT:{size:30000,desc:""},US:{size:25000,desc:"Banking sector"},GB:{size:22000,desc:"Finance post-Brexit"},IN:{size:20000,desc:"IT & banking"},KR:{size:8000,desc:""}},
      "Hamburg":{TR:{size:75000,desc:"St Pauli & Altona neighbourhoods"},PL:{size:35000,desc:""},IN:{size:15000,desc:""},GB:{size:12000,desc:""},FR:{size:8000,desc:""}},
    }
  },
  PT: {
    national: {
      BR:{size:490000,desc:"Largest foreign community by far; shared language"},FR:{size:260000,desc:""},GB:{size:200000,desc:"Retirees & NHR tax seekers"},US:{size:80000,desc:"Digital nomads & NHR"},DE:{size:110000,desc:""},CN:{size:25000,desc:"Golden Visa investors"},IN:{size:15000,desc:""},ZA:{size:12000,desc:""},CA:{size:15000,desc:""},AU:{size:10000,desc:""},
    },
    cities: {
      "Lisbon":{BR:{size:130000,desc:"Mouraria & Martim Moniz; huge Brazilian cultural presence"},GB:{size:35000,desc:"Chiado & Príncipe Real expat hub"},FR:{size:45000,desc:""},US:{size:25000,desc:"NHR digital nomads"},DE:{size:20000,desc:""},CN:{size:8000,desc:""},AU:{size:5000,desc:""},ZA:{size:4000,desc:""}},
      "Porto":{BR:{size:50000,desc:""},GB:{size:20000,desc:""},FR:{size:18000,desc:""},DE:{size:12000,desc:""},US:{size:10000,desc:""}},
      "Algarve":{GB:{size:60000,desc:"Largest British expat community in Portugal; Luz & Tavira hubs"},DE:{size:15000,desc:""},NL:{size:12000,desc:""},IE:{size:8000,desc:""},ZA:{size:3000,desc:""}},
    }
  },
  AE: {
    national: {
      IN:{size:3300000,desc:"Largest group at ~30% of population"},PK:{size:1200000,desc:""},BD:{size:700000,desc:""},PH:{size:700000,desc:"Domestic & hospitality"},EG:{size:450000,desc:""},GB:{size:240000,desc:"Finance & tech in DIFC"},US:{size:80000,desc:"Finance & military"},AU:{size:35000,desc:""},ZA:{size:30000,desc:""},CA:{size:40000,desc:""},FR:{size:30000,desc:""},DE:{size:28000,desc:""},
    },
    cities: {
      "Dubai":{IN:{size:2200000,desc:"Bur Dubai & Meena Bazaar — 'Little India'"},PK:{size:600000,desc:""},GB:{size:180000,desc:"DIFC, JBR & Downtown"},US:{size:60000,desc:"DIFC finance cluster"},AU:{size:25000,desc:"JBR & Dubai Marina"},PH:{size:400000,desc:""},ZA:{size:22000,desc:"JBR & Springs"},FR:{size:20000,desc:""},DE:{size:18000,desc:""},CN:{size:30000,desc:""}},
      "Abu Dhabi":{IN:{size:800000,desc:""},PK:{size:350000,desc:""},EG:{size:200000,desc:""},GB:{size:55000,desc:"Oil & finance sector"},US:{size:25000,desc:""},PH:{size:180000,desc:""}},
    }
  },
  SG: {
    national: {
      CN:{size:2800000,desc:"Chinese Singaporeans are 74% of the population"},MY:{size:200000,desc:"Cross-border workers & immigrants"},IN:{size:350000,desc:"Little India & Tekka Market"},PH:{size:200000,desc:"Domestic workers & professionals"},IN:{size:350000,desc:"Tech, finance, and Little India"},GB:{size:60000,desc:"Finance & corporate"},AU:{size:40000,desc:"Finance & tech"},US:{size:30000,desc:"Tech & finance"},IN:{size:350000,desc:""},ID:{size:150000,desc:""},
    },
    cities: {
      "Singapore":{IN:{size:350000,desc:"Little India in Tekka; Serangoon Road hub"},PH:{size:200000,desc:"Lucky Plaza — the heart of Filipino Singapore"},GB:{size:60000,desc:"Holland Village & Dempsey Hill expat hubs"},AU:{size:40000,desc:""},US:{size:30000,desc:"Tech & finance in Raffles Place"},MY:{size:200000,desc:""},FR:{size:15000,desc:""},DE:{size:12000,desc:""}},
    }
  },
  NL: {
    national: {
      TR:{size:420000,desc:"Largest non-Western group"},MA:{size:390000,desc:""},IN:{size:30000,desc:"Tech & ASML workers"},US:{size:50000,desc:"Expats in Amsterdam & The Hague"},GB:{size:50000,desc:"Post-Brexit; Amsterdam finance hub"},DE:{size:180000,desc:""},BE:{size:90000,desc:""},SY:{size:100000,desc:""},
    },
    cities: {
      "Amsterdam":{US:{size:22000,desc:"Jordan & De Pijp; finance & tech"},GB:{size:20000,desc:"Post-Brexit financial relocations"},IN:{size:10000,desc:"ASML & tech corridor"},DE:{size:60000,desc:""},FR:{size:15000,desc:""},AU:{size:5000,desc:""},CN:{size:8000,desc:""}},
    }
  },
  JP: {
    national: {
      CN:{size:800000,desc:"Largest foreign group"},KR:{size:420000,desc:"Zainichi Korean community; historic"},VN:{size:490000,desc:"Dekasegi workers; fast growing"},BR:{size:210000,desc:"Nikkei Brazilian community; Hamamatsu hub"},PH:{size:310000,desc:""},US:{size:55000,desc:"English teachers & corporate"},AU:{size:12000,desc:"WHV & corporate"},GB:{size:20000,desc:""},IN:{size:45000,desc:"IT sector"},
    },
    cities: {
      "Tokyo":{CN:{size:230000,desc:"Shinjuku Kabukicho & Ikebukuro Chinatowns"},KR:{size:120000,desc:"Shin-Okubo Koreatown"},IN:{size:20000,desc:""},US:{size:28000,desc:"Minato-ku corporate hub"},BR:{size:25000,desc:"Liberdade district; historic Japanese-Brazilian ties"},AU:{size:5000,desc:""},GB:{size:8000,desc:""},VN:{size:40000,desc:""}},
      "Osaka":{CN:{size:100000,desc:"Osaka Chinatown (Nankinmachi)"},KR:{size:90000,desc:"Tsuruhashi Koreatown"},VN:{size:30000,desc:""},BR:{size:10000,desc:""},US:{size:8000,desc:""}},
    }
  },
  TH: {
    national: {
      US:{size:40000,desc:"Retirees & digital nomads"},GB:{size:55000,desc:"Retirees; Pattaya & Phuket hubs"},AU:{size:30000,desc:""},DE:{size:18000,desc:""},CN:{size:120000,desc:"Investment & business"},KR:{size:20000,desc:""},NL:{size:8000,desc:""},SG:{size:15000,desc:""},IN:{size:15000,desc:""},CA:{size:15000,desc:""},
    },
    cities: {
      "Bangkok":{US:{size:15000,desc:"Sukhumvit & Silom — expat heartland"},GB:{size:20000,desc:"Sukhumvit Soi 11 & Thong Lo"},AU:{size:10000,desc:""},DE:{size:6000,desc:""},CN:{size:80000,desc:"Yaowarat Chinatown — one of the oldest"},KR:{size:10000,desc:""},IN:{size:8000,desc:"Pahurat 'Little India'"}},
      "Chiang Mai":{US:{size:8000,desc:"Digital nomad capital of Asia; Nimman Road hub"},GB:{size:6000,desc:""},AU:{size:4000,desc:""},DE:{size:3000,desc:""},CN:{size:5000,desc:""}},
      "Phuket":{GB:{size:12000,desc:"Rawai & Kata — retirees & long-stayers"},AU:{size:5000,desc:""},DE:{size:3000,desc:""},RU:{size:25000,desc:"Patong — large Russian community"},CN:{size:15000,desc:""},US:{size:3000,desc:""}},
    }
  },
  ES: {
    national: {
      MA:{size:900000,desc:"Largest group"},RO:{size:630000,desc:""},CO:{size:300000,desc:""},VE:{size:210000,desc:""},IT:{size:280000,desc:""},GB:{size:320000,desc:"Retirees on Costa del Sol & Alicante"},DE:{size:190000,desc:""},FR:{size:250000,desc:""},MX:{size:80000,desc:""},AR:{size:250000,desc:""},US:{size:45000,desc:""},
    },
    cities: {
      "Barcelona":{IT:{size:70000,desc:"Largest Italian community in Spain"},FR:{size:60000,desc:""},GB:{size:25000,desc:""},DE:{size:20000,desc:""},US:{size:15000,desc:"Tech & digital nomads"},CO:{size:40000,desc:""},AR:{size:35000,desc:"Gràcia neighbourhood hub"}},
      "Madrid":{MA:{size:90000,desc:"Lavapiés — multicultural hub"},CO:{size:100000,desc:""},VE:{size:80000,desc:"Salamanca district"},IT:{size:50000,desc:""},GB:{size:20000,desc:"Finance & corporate"},RO:{size:70000,desc:""},US:{size:12000,desc:""}},
      "Málaga / Costa del Sol":{GB:{size:120000,desc:"Largest British expat community in Spain; Marbella hub"},DE:{size:25000,desc:""},NL:{size:18000,desc:""},SE:{size:12000,desc:""},NO:{size:10000,desc:""},BE:{size:8000,desc:""}},
    }
  },
  FR: {
    national: {
      DZ:{size:1700000,desc:"Largest immigrant group"},MA:{size:1200000,desc:""},PT:{size:600000,desc:"Historical migration"},TN:{size:450000,desc:""},IT:{size:320000,desc:""},TR:{size:320000,desc:""},SN:{size:110000,desc:""},GB:{size:150000,desc:""},US:{size:100000,desc:""},BE:{size:200000,desc:""},ES:{size:180000,desc:""},
    },
    cities: {
      "Paris":{US:{size:40000,desc:"Marais & Saint-Germain expat hubs"},GB:{size:50000,desc:""},PT:{size:80000,desc:""},DZ:{size:200000,desc:""},IT:{size:60000,desc:""},CN:{size:30000,desc:"Belleville Chinatown"},AU:{size:8000,desc:""}},
    }
  },
  IN: {
    national: {
      AU:{size:10000,desc:"Concentrated in Mumbai, New Delhi & Bengaluru; corporate & embassy"},
      GB:{size:35000,desc:"Large community of corporate professionals & retirees"},
      US:{size:60000,desc:"Corporate, tech, & NGO workers; major hub in Bengaluru & Mumbai"},
    },
    cities: {
      "Mumbai":{AU:{size:3000,desc:"Embassy & financial services"},GB:{size:12000,desc:""},US:{size:15000,desc:"Consulate & multinational HQs"}},
      "Bengaluru":{AU:{size:2500,desc:"Tech leaders & startup collaborators"},GB:{size:8000,desc:""},US:{size:18000,desc:"Silicon Valley of India; tech expats"}},
      "New Delhi":{AU:{size:3500,desc:"High Commission & diplomatic corps"},GB:{size:10000,desc:""},US:{size:12000,desc:"Diplomatic and NGO hub"}},
    }
  },
};

// Meta data for comparison cards
const COUNTRY_META = {
  US: { religion: "Christianity (65%)", industries: "Tech, Finance, Healthcare", retirementAge: "67" },
  GB: { religion: "Christianity (46%)", industries: "Finance, Tech, Services", retirementAge: "66" },
  DE: { religion: "Christianity (54%)", industries: "Auto, Engineering, Chem", retirementAge: "65-67" },
  PT: { religion: "Catholicism (80%)", industries: "Tourism, Tech, Textiles", retirementAge: "66.3" },
  TH: { religion: "Buddhism (93%)", industries: "Tourism, Manufacturing, Ag", retirementAge: "60" },
  SG: { religion: "Buddhism (31%)", industries: "Finance, Tech, Shipping", retirementAge: "63" },
  AU: { religion: "Christianity (44%)", industries: "Mining, Healthcare, Finance", retirementAge: "67" },
  MX: { religion: "Catholicism (78%)", industries: "Manufacturing, Auto", retirementAge: "65" },
  CA: { religion: "Christianity (53%)", industries: "Real Estate, Manufacturing", retirementAge: "65" },
  JP: { religion: "Shintoism/Buddhism", industries: "Automotive, Electronics", retirementAge: "65" },
  AE: { religion: "Islam (76%)", industries: "Oil/Gas, Tourism, Trade", retirementAge: "65" },
  NL: { religion: "Non-religious (54%)", industries: "Agri-food, Tech, Logistics", retirementAge: "67" },
  ES: { religion: "Catholicism (58%)", industries: "Tourism, Auto, Pharma", retirementAge: "66.3" },
  FR: { religion: "Christianity (47%)", industries: "Aerospace, Tourism, Luxury", retirementAge: "64" },
  AT: { religion: "Catholicism (55%)", industries: "Tourism, Machinery, Chem", retirementAge: "65" },
  IE: { religion: "Catholicism (69%)", industries: "Tech, Pharma, Finance", retirementAge: "66" },
  IN: { religion: "Hinduism (79%)", industries: "IT, Services, Agriculture, Pharma", retirementAge: "60" }
};
