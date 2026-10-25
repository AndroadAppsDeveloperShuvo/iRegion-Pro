import { CountryMetadata, SupportedCountryCode, GeneratedAddress, AppStoreItem } from '../types';

export const COUNTRIES_META: CountryMetadata[] = [
  {
    code: 'US',
    nameEn: 'United States',
    nameBn: 'যুক্তরাষ্ট্র (USA)',
    flag: '🇺🇸',
    callingCode: '+1',
    defaultCurrency: 'USD',
    currencySymbol: '$',
    hasTaxFreeRegions: true,
    taxFreeRegionsInfo: 'Oregon, Delaware, Alaska, Montana, New Hampshire (0% Sales Tax)',
    postalCodeFormatDescription: '5-digit ZIP code (e.g. 97201, 19801)',
    popularForApps: ['Free Fire MAX', 'TikTok', 'ChatGPT iOS', 'Brawl Stars', 'Cash App', 'Roblox']
  },
  {
    code: 'GB',
    nameEn: 'United Kingdom',
    nameBn: 'যুক্তরাজ্য (UK)',
    flag: '🇬🇧',
    callingCode: '+44',
    defaultCurrency: 'GBP',
    currencySymbol: '£',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: 'Alphanumeric UK Postcode (e.g. SW1A 1AA, EC1A 1BB)',
    popularForApps: ['Revolut', 'BBC iPlayer', 'Sky Go', 'Football Manager Mobile']
  },
  {
    code: 'JP',
    nameEn: 'Japan',
    nameBn: 'জাপান (Japan)',
    flag: '🇯🇵',
    callingCode: '+81',
    defaultCurrency: 'JPY',
    currencySymbol: '¥',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '7-digit postal code (e.g. 160-0022, 100-0001)',
    popularForApps: ['Monster Hunter Now', 'Dragon Ball Legends', 'Fate/Grand Order', 'Line Pay', 'Pokemon Trading']
  },
  {
    code: 'TR',
    nameEn: 'Turkey',
    nameBn: 'তুরস্ক (Turkey)',
    flag: '🇹🇷',
    callingCode: '+90',
    defaultCurrency: 'TRY',
    currencySymbol: '₺',
    hasTaxFreeRegions: false,
    taxFreeRegionsInfo: 'Very low regional pricing for subscriptions & in-app purchases',
    postalCodeFormatDescription: '5-digit Turkish postal code (e.g. 34710, 06690)',
    popularForApps: ['PUBG Mobile Turkey', 'iCloud Low Rate', 'Trendyol', 'Discounted Subscriptions']
  },
  {
    code: 'CA',
    nameEn: 'Canada',
    nameBn: 'কানাডা (Canada)',
    flag: '🇨🇦',
    callingCode: '+1',
    defaultCurrency: 'CAD',
    currencySymbol: 'C$',
    hasTaxFreeRegions: true,
    taxFreeRegionsInfo: 'Alberta has only 5% GST (No PST)',
    postalCodeFormatDescription: 'Alphanumeric format A1A 1A1 (e.g. T2P 1J9, M5H 2N2)',
    popularForApps: ['Soft-launch Mobile Games', 'Crave', 'CBC Gem', 'Wealthsimple']
  },
  {
    code: 'AU',
    nameEn: 'Australia',
    nameBn: 'অস্ট্রেলিয়া (Australia)',
    flag: '🇦🇺',
    callingCode: '+61',
    defaultCurrency: 'AUD',
    currencySymbol: 'A$',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '4-digit postcode (e.g. 2000, 3000, 4000)',
    popularForApps: ['Beta App Tests', 'Kayo Sports', 'Stan', 'Early Access Games']
  },
  {
    code: 'SG',
    nameEn: 'Singapore',
    nameBn: 'সিঙ্গাপুর (Singapore)',
    flag: '🇸🇬',
    callingCode: '+65',
    defaultCurrency: 'SGD',
    currencySymbol: 'S$',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '6-digit postal code (e.g. 238801, 018956)',
    popularForApps: ['Garena Free Fire SE Asian Server', 'Shopee SG', 'Grab', 'Razer Pay']
  },
  {
    code: 'DE',
    nameEn: 'Germany',
    nameBn: 'জার্মানি (Germany)',
    flag: '🇩🇪',
    callingCode: '+49',
    defaultCurrency: 'EUR',
    currencySymbol: '€',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '5-digit German PLZ (e.g. 10115, 80331)',
    popularForApps: ['European EU Sideloading Stores', 'Zalando', 'N26', 'Joyn']
  },
  {
    code: 'KR',
    nameEn: 'South Korea',
    nameBn: 'দক্ষিণ কোরিয়া (South Korea)',
    flag: '🇰🇷',
    callingCode: '+82',
    defaultCurrency: 'KRW',
    currencySymbol: '₩',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '5-digit zone code (e.g. 06000, 04000)',
    popularForApps: ['MapleStory M Korea', 'KakaoTalk Beta', 'Naver Webtoon', 'PUBG Korea/Japan']
  },
  {
    code: 'AE',
    nameEn: 'United Arab Emirates',
    nameBn: 'সংযুক্ত আরব আমিরাত (UAE)',
    flag: '🇦🇪',
    callingCode: '+971',
    defaultCurrency: 'AED',
    currencySymbol: 'د.إ',
    hasTaxFreeRegions: true,
    taxFreeRegionsInfo: '0% personal income & tax-free digital items',
    postalCodeFormatDescription: 'City or PO Box / 00000',
    popularForApps: ['Botim', 'Shahid VIP', 'Careem', 'Dubai Now']
  },
  {
    code: 'IN',
    nameEn: 'India',
    nameBn: 'ভারত (India)',
    flag: '🇮🇳',
    callingCode: '+91',
    defaultCurrency: 'INR',
    currencySymbol: '₹',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '6-digit PIN code (e.g. 110001, 400001)',
    popularForApps: ['BGMI (Battlegrounds Mobile India)', 'JioCinema', 'Hotstar']
  },
  {
    code: 'BD',
    nameEn: 'Bangladesh',
    nameBn: 'বাংলাদেশ (Bangladesh)',
    flag: '🇧🇩',
    callingCode: '+880',
    defaultCurrency: 'BDT',
    currencySymbol: '৳',
    hasTaxFreeRegions: false,
    postalCodeFormatDescription: '4-digit Postal Code (e.g. 1205, 1212)',
    popularForApps: ['bKash', 'Nagad', 'Chorki', 'Daraz BD']
  }
];

interface RawLocationData {
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  areaCode: string;
  streetName: string;
  isTaxFree?: boolean;
  taxRatePercent?: number;
  noteEn?: string;
  noteBn?: string;
}

export const COUNTRY_LOCATIONS: Record<SupportedCountryCode, RawLocationData[]> = {
  US: [
    // Tax-Free States (High Priority for Apple ID users)
    {
      city: 'Portland',
      state: 'Oregon',
      stateCode: 'OR',
      zipCode: '97201',
      areaCode: '503',
      streetName: '1420 SW Broadway',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (0% Sales Tax). Ideal for Apple ID and digital purchases.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (০% সেলস ট্যাক্স)। অ্যাপল আইডি ও ডিজিটাল কেনাকাটার জন্য সেরা।'
    },
    {
      city: 'Salem',
      state: 'Oregon',
      stateCode: 'OR',
      zipCode: '97301',
      areaCode: '503',
      streetName: '850 Liberty St NE',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (Oregon). Zero sales tax on apps and games.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (অরেগন)। অ্যাপস এবং গেমসের উপর কোন ট্যাক্স নেই।'
    },
    {
      city: 'Wilmington',
      state: 'Delaware',
      stateCode: 'DE',
      zipCode: '19801',
      areaCode: '302',
      streetName: '1201 N Market St',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (Delaware). 100% verified postal code with Apple App Store.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (ডেলাওয়্যার)। অ্যাপল অ্যাপ স্টোরে ১০০% ভেরিফাইড পোস্টাল কোড।'
    },
    {
      city: 'Newark',
      state: 'Delaware',
      stateCode: 'DE',
      zipCode: '19711',
      areaCode: '302',
      streetName: '344 E Main St',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (Delaware). Zero digital sales tax.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (ডেলাওয়্যার)। কোন ট্যাক্স নেই।'
    },
    {
      city: 'Anchorage',
      state: 'Alaska',
      stateCode: 'AK',
      zipCode: '99501',
      areaCode: '907',
      streetName: '601 W 5th Ave',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (Alaska). Zero state sales tax.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (আলাস্কা)। স্টেট সেলস ট্যাক্স ০%।'
    },
    {
      city: 'Helena',
      state: 'Montana',
      stateCode: 'MT',
      zipCode: '59601',
      areaCode: '406',
      streetName: '316 N Park Ave',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (Montana). 0% digital purchases tax.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (মন্টানা)। ০% ডিজিটাল কেনাকাটা ট্যাক্স।'
    },
    {
      city: 'Manchester',
      state: 'New Hampshire',
      stateCode: 'NH',
      zipCode: '03101',
      areaCode: '603',
      streetName: '1000 Elm St',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Tax-Free State (New Hampshire). No general sales tax.',
      noteBn: 'ট্যাক্স-ফ্রি স্টেট (নিউ হ্যাম্পশায়ার)। কোন সেলস ট্যাক্স নেই।'
    },
    // Major US Metros (Also valid for region change)
    {
      city: 'Beverly Hills',
      state: 'California',
      stateCode: 'CA',
      zipCode: '90210',
      areaCode: '310',
      streetName: '9601 Wilshire Blvd',
      isTaxFree: false,
      taxRatePercent: 9.5,
      noteEn: 'California address. Fully verified for US App Store setup.',
      noteBn: 'ক্যালিফোর্নিয়া এড্রেস। ইউএস অ্যাপ স্টোরের জন্য সম্পূর্ণ ভেরিফাইড।'
    },
    {
      city: 'New York',
      state: 'New York',
      stateCode: 'NY',
      zipCode: '10001',
      areaCode: '212',
      streetName: '350 5th Ave',
      isTaxFree: false,
      taxRatePercent: 8.875,
      noteEn: 'New York Metro address. Valid with standard Apple ID verification.',
      noteBn: 'নিউ ইয়র্ক মেট্রো এড্রেস। স্ট্যান্ডার্ড অ্যাপল আইডির জন্য উপযোগী।'
    },
    {
      city: 'Miami',
      state: 'Florida',
      stateCode: 'FL',
      zipCode: '33101',
      areaCode: '305',
      streetName: '200 S Biscayne Blvd',
      isTaxFree: false,
      taxRatePercent: 7.0,
      noteEn: 'Florida address. Verified standard ZIP code.',
      noteBn: 'ফ্লোরিডা এড্রেস। ভেরিফাইড স্ট্যান্ডার্ড জিপ কোড।'
    }
  ],
  GB: [
    {
      city: 'London',
      state: 'Greater London',
      stateCode: 'ENG',
      zipCode: 'SW1A 1AA',
      areaCode: '20',
      streetName: 'Buckingham Palace Road',
      isTaxFree: false,
      taxRatePercent: 20,
      noteEn: 'Central London UK format. Real Westminster postcode pattern.',
      noteBn: 'সেন্ট্রাল লন্ডন ফরম্যাট। ওয়েস্টমিনস্টার পোস্টকোড প্যাটার্ন।'
    },
    {
      city: 'Manchester',
      state: 'Greater Manchester',
      stateCode: 'ENG',
      zipCode: 'M1 1AE',
      areaCode: '161',
      streetName: '55 Piccadilly',
      isTaxFree: false,
      taxRatePercent: 20,
      noteEn: 'Manchester city centre postcode. Validated for UK App Store.',
      noteBn: 'ম্যানচেস্টার সিটি সেন্টার পোস্টকোড। ইউকে অ্যাপ স্টোরে ভেরিফাইড।'
    },
    {
      city: 'Edinburgh',
      state: 'Midlothian',
      stateCode: 'SCT',
      zipCode: 'EH1 1YZ',
      areaCode: '131',
      streetName: '93 Princes St',
      isTaxFree: false,
      taxRatePercent: 20,
      noteEn: 'Edinburgh Scotland postcode pattern.',
      noteBn: 'এডিনবরা স্কটল্যান্ড পোস্টকোড।'
    },
    {
      city: 'Birmingham',
      state: 'West Midlands',
      stateCode: 'ENG',
      zipCode: 'B1 1AA',
      areaCode: '121',
      streetName: '1 New Street',
      isTaxFree: false,
      taxRatePercent: 20,
      noteEn: 'Birmingham central postcode.',
      noteBn: 'বার্মিংহাম সেন্ট্রাল পোস্টকোড।'
    }
  ],
  JP: [
    {
      city: 'Shinjuku-ku',
      state: 'Tokyo',
      stateCode: 'TK',
      zipCode: '160-0022',
      areaCode: '03',
      streetName: '3-14-1 Shinjuku',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Tokyo Shinjuku address. Perfect for Japanese exclusive games and anime apps.',
      noteBn: 'টোকিও শিনজুকু এড্রেস। জাপানি এক্সক্লুসিভ গেম ও অ্যানিমে অ্যাপসের জন্য উপযুক্ত।'
    },
    {
      city: 'Shibuya-ku',
      state: 'Tokyo',
      stateCode: 'TK',
      zipCode: '150-0043',
      areaCode: '03',
      streetName: '2-24-1 Dogenzaka',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Tokyo Shibuya address. Validated 7-digit Japanese postal code format.',
      noteBn: 'টোকিও শিবুয়া এড্রেস। ৭ ডিজিটের সঠিক জাপানি পোস্টাল কোড।'
    },
    {
      city: 'Kita-ku',
      state: 'Osaka',
      stateCode: 'OS',
      zipCode: '530-0001',
      areaCode: '06',
      streetName: '3-1-3 Umeda',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Osaka Kansai region address. Works seamlessly with Apple ID Japan.',
      noteBn: 'ওসাকা কানসাই এড্রেস। অ্যাপল আইডি জাপানের সাথে মসৃণভাবে কাজ করে।'
    },
    {
      city: 'Chiyoda-ku',
      state: 'Tokyo',
      stateCode: 'TK',
      zipCode: '100-0005',
      areaCode: '03',
      streetName: '1-1 Marunouchi',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Central Tokyo Marunouchi district format.',
      noteBn: 'সেন্ট্রাল টোকিও মারুনৌচি ডিস্ট্রিক্ট ফরম্যাট।'
    }
  ],
  TR: [
    {
      city: 'Kadikoy',
      state: 'Istanbul',
      stateCode: '34',
      zipCode: '34710',
      areaCode: '216',
      streetName: 'Bagdat Caddesi No 245',
      isTaxFree: false,
      taxRatePercent: 18,
      noteEn: 'Istanbul Asian side address. Very popular for affordable subscription region switches.',
      noteBn: 'ইস্তাম্বুল এশিয়ান সাইড এড্রেস। কম খরচে সাবস্ক্রিপশন নেওয়ার জন্য ব্যাপক জনপ্রিয়।'
    },
    {
      city: 'Besiktas',
      state: 'Istanbul',
      stateCode: '34',
      zipCode: '34357',
      areaCode: '212',
      streetName: 'Barbaros Bulvari No 74',
      isTaxFree: false,
      taxRatePercent: 18,
      noteEn: 'Istanbul European side address. Valid Turkish postal pattern.',
      noteBn: 'ইস্তাম্বুল ইউরোপিয়ান সাইড এড্রেস। ভ্যালিড তুর্কি পোস্টাল কোড।'
    },
    {
      city: 'Cankaya',
      state: 'Ankara',
      stateCode: '06',
      zipCode: '06690',
      areaCode: '312',
      streetName: 'Tunali Hilmi Caddesi No 88',
      isTaxFree: false,
      taxRatePercent: 18,
      noteEn: 'Ankara capital address. Valid 5-digit Turkish postal code.',
      noteBn: 'আঙ্কারা ক্যাপিটাল এড্রেস। ৫ ডিজিটের সঠিক পোস্টাল কোড।'
    }
  ],
  CA: [
    {
      city: 'Calgary',
      state: 'Alberta',
      stateCode: 'AB',
      zipCode: 'T2P 1J9',
      areaCode: '403',
      streetName: '333 7th Ave SW',
      isTaxFree: false,
      taxRatePercent: 5,
      noteEn: 'Alberta address (Lowest tax in Canada: only 5% GST, 0% PST).',
      noteBn: 'আলবার্টা এড্রেস (কানাডার সর্বনিম্ন ট্যাক্স: মাত্র ৫% জিএসটি, ০% পিএসটি)।'
    },
    {
      city: 'Edmonton',
      state: 'Alberta',
      stateCode: 'AB',
      zipCode: 'T5J 0N3',
      areaCode: '780',
      streetName: '10111 104 Ave NW',
      isTaxFree: false,
      taxRatePercent: 5,
      noteEn: 'Edmonton Alberta address. Low tax rate and verified postal code.',
      noteBn: 'এডমন্টন আলবার্টা এড্রেস। লো ট্যাক্স রেট এবং ভেরিফাইড কোড।'
    },
    {
      city: 'Toronto',
      state: 'Ontario',
      stateCode: 'ON',
      zipCode: 'M5H 2N2',
      areaCode: '416',
      streetName: '100 Queen St W',
      isTaxFree: false,
      taxRatePercent: 13,
      noteEn: 'Downtown Toronto address with valid Canadian postal code format.',
      noteBn: 'ডাউনটাউন টরন্টো এড্রেস এবং ভ্যালিড কানাডিয়ান পোস্টাল ফরম্যাট।'
    }
  ],
  AU: [
    {
      city: 'Sydney',
      state: 'New South Wales',
      stateCode: 'NSW',
      zipCode: '2000',
      areaCode: '02',
      streetName: '483 George St',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Sydney Central Business District address. Valid 4-digit postcode.',
      noteBn: 'সিডনি সেন্ট্রাল বিজনেস ডিস্ট্রিক্ট এড্রেস। সঠিক ৪ ডিজিট পোস্টকোড।'
    },
    {
      city: 'Melbourne',
      state: 'Victoria',
      stateCode: 'VIC',
      zipCode: '3000',
      areaCode: '03',
      streetName: '250 Elizabeth St',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Melbourne city centre address.',
      noteBn: 'মেলবোর্ন সিটি সেন্টার এড্রেস।'
    },
    {
      city: 'Brisbane',
      state: 'Queensland',
      stateCode: 'QLD',
      zipCode: '4000',
      areaCode: '07',
      streetName: '127 Queen St',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Brisbane central address format.',
      noteBn: 'ব্রিসবেন সেন্ট্রাল এড্রেস ফরম্যাট।'
    }
  ],
  SG: [
    {
      city: 'Singapore',
      state: 'Central Area',
      stateCode: 'SG',
      zipCode: '238801',
      areaCode: '65',
      streetName: '391 Orchard Road',
      isTaxFree: false,
      taxRatePercent: 9,
      noteEn: 'Singapore Orchard district. Standard 6-digit postal code for Apple Store.',
      noteBn: 'সিঙ্গাপুর অরচার্ড ডিস্ট্রিক্ট। অ্যাপল স্টোরের ৬ ডিজিটের স্ট্যান্ডার্ড কোড।'
    },
    {
      city: 'Singapore',
      state: 'Marina Bay',
      stateCode: 'SG',
      zipCode: '018956',
      areaCode: '65',
      streetName: '10 Bayfront Avenue',
      isTaxFree: false,
      taxRatePercent: 9,
      noteEn: 'Marina Bay Singapore address.',
      noteBn: 'মেরিনা বে সিঙ্গাপুর এড্রেস।'
    }
  ],
  DE: [
    {
      city: 'Berlin',
      state: 'Berlin',
      stateCode: 'BE',
      zipCode: '10115',
      areaCode: '030',
      streetName: 'Friedrichstraße 180',
      isTaxFree: false,
      taxRatePercent: 19,
      noteEn: 'Berlin central address. Valid 5-digit PLZ.',
      noteBn: 'বার্লিন সেন্ট্রাল এড্রেস। ভ্যালিড ৫ ডিজিট পিএলজেড।'
    },
    {
      city: 'Munich',
      state: 'Bavaria',
      stateCode: 'BY',
      zipCode: '80331',
      areaCode: '089',
      streetName: 'Marienplatz 8',
      isTaxFree: false,
      taxRatePercent: 19,
      noteEn: 'Munich city centre address.',
      noteBn: 'মিউনিখ সিটি সেন্টার এড্রেস।'
    }
  ],
  KR: [
    {
      city: 'Gangnam-gu',
      state: 'Seoul',
      stateCode: 'SE',
      zipCode: '06000',
      areaCode: '02',
      streetName: '517 Teheran-ro',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Seoul Gangnam district address. Ideal for Korean mobile games and apps.',
      noteBn: 'সিউল গ্যাংনাম ডিস্ট্রিক্ট এড্রেস। কোরিয়ান মোবাইল গেমসের জন্য সেরা।'
    },
    {
      city: 'Mapo-gu',
      state: 'Seoul',
      stateCode: 'SE',
      zipCode: '04000',
      areaCode: '02',
      streetName: '160 Yanghwa-ro',
      isTaxFree: false,
      taxRatePercent: 10,
      noteEn: 'Seoul Mapo district address.',
      noteBn: 'সিউল মাপো ডিস্ট্রিক্ট এড্রেস।'
    }
  ],
  AE: [
    {
      city: 'Dubai',
      state: 'Dubai',
      stateCode: 'DXB',
      zipCode: '00000',
      areaCode: '04',
      streetName: 'Financial Centre Road, Downtown',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Dubai Downtown format. UAE uses 00000 or PO Box in Apple ID.',
      noteBn: 'দুবাই ডাউনটাউন ফরম্যাট। অ্যাপল আইডিতে 00000 বা পিও বক্স দিতে হয়।'
    },
    {
      city: 'Abu Dhabi',
      state: 'Abu Dhabi',
      stateCode: 'AUH',
      zipCode: '00000',
      areaCode: '02',
      streetName: 'Corniche Road West',
      isTaxFree: true,
      taxRatePercent: 0,
      noteEn: 'Abu Dhabi capital address.',
      noteBn: 'আবুধাবি ক্যাপিটাল এড্রেস।'
    }
  ],
  IN: [
    {
      city: 'Mumbai',
      state: 'Maharashtra',
      stateCode: 'MH',
      zipCode: '400001',
      areaCode: '022',
      streetName: 'Dr Dadabhai Naoroji Road, Fort',
      isTaxFree: false,
      taxRatePercent: 18,
      noteEn: 'Mumbai South district. Real 6-digit PIN code.',
      noteBn: 'মুম্বাই সাউথ ডিস্ট্রিক্ট। আসল ৬ ডিজিটের পিন কোড।'
    },
    {
      city: 'Bangalore',
      state: 'Karnataka',
      stateCode: 'KA',
      zipCode: '560001',
      areaCode: '080',
      streetName: 'MG Road, Ashok Nagar',
      isTaxFree: false,
      taxRatePercent: 18,
      noteEn: 'Bangalore tech hub format.',
      noteBn: 'ব্যাঙ্গালোর টেক হাব ফরম্যাট।'
    }
  ],
  BD: [
    {
      city: 'Dhaka',
      state: 'Dhaka',
      stateCode: 'DHK',
      zipCode: '1205',
      areaCode: '02',
      streetName: 'Road 7, Dhanmondi',
      isTaxFree: false,
      taxRatePercent: 15,
      noteEn: 'Dhaka Dhanmondi local postal address.',
      noteBn: 'ঢাকা ধানমন্ডি লোকাল পোস্টাল এড্রেস।'
    },
    {
      city: 'Dhaka',
      state: 'Dhaka',
      stateCode: 'DHK',
      zipCode: '1212',
      areaCode: '02',
      streetName: 'Gulshan Avenue, Gulshan 1',
      isTaxFree: false,
      taxRatePercent: 15,
      noteEn: 'Dhaka Gulshan postal format.',
      noteBn: 'ঢাকা গুলশান পোস্টাল ফরম্যাট।'
    }
  ]
};

export const FIRST_NAMES = [
  'Alex', 'Michael', 'David', 'James', 'Robert', 'Daniel', 'William', 'Ethan',
  'Noah', 'Liam', 'Oliver', 'Lucas', 'Emma', 'Sophia', 'Olivia', 'Ava',
  'Mia', 'Isabella', 'Harper', 'Evelyn', 'Kenji', 'Haruto', 'Yuto', 'Emir',
  'Burak', 'Ahmet', 'Tariq', 'Zayn', 'Rahim', 'Arif', 'Kabir', 'Tanvir'
];

export const LAST_NAMES = [
  'Miller', 'Johnson', 'Smith', 'Williams', 'Brown', 'Davis', 'Wilson', 'Anderson',
  'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'White', 'Harris',
  'Clark', 'Lewis', 'Robinson', 'Walker', 'Tanaka', 'Sato', 'Suzuki', 'Yilmaz',
  'Kaya', 'Demir', 'Hossain', 'Chowdhury', 'Rahman', 'Ahmed', 'Khan', 'Patel'
];

export const APPS_DIRECTORY: AppStoreItem[] = [
  {
    id: 'freefire-max',
    name: 'Free Fire MAX',
    category: 'Action / Battle Royale',
    iconName: 'Flame',
    badge: 'Popular Request',
    recommendedRegion: 'US',
    recommendedCountryName: 'United States / Singapore',
    descriptionEn: 'Ultra HD battle royale game. Unavailable in some store regions; instantly downloadable via US or SG Apple ID.',
    descriptionBn: 'আল্ট্রা এইচডি ব্যাটল রয়্যাল গেম। কিছু দেশে অ্যাপ স্টোরে ব্লক থাকে, ইউএস বা সিঙ্গাপুর আইডি দিয়ে সহজে ডাউনলোড করা যায়।',
    appStoreSearchTerm: 'Free Fire MAX'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Social / Video',
    iconName: 'Video',
    badge: 'Region Locked',
    recommendedRegion: 'US',
    recommendedCountryName: 'United States',
    descriptionEn: 'The leading short-form video platform. Unavailable in India and certain countries without a US or UK Apple ID.',
    descriptionBn: 'বিশ্বসেরা শর্ট ভিডিও প্ল্যাটফর্ম। ভারত সহ বেশ কিছু দেশে বন্ধ, ইউএস/ইউকে অ্যাপল আইডি ব্যবহার করে চালানো যায়।',
    appStoreSearchTerm: 'TikTok'
  },
  {
    id: 'chatgpt-ios',
    name: 'ChatGPT Official',
    category: 'Productivity & AI',
    iconName: 'Sparkles',
    badge: 'Official OpenAI',
    recommendedRegion: 'US',
    recommendedCountryName: 'United States',
    descriptionEn: 'Official OpenAI app with voice mode and real-time vision. Rollout is fastest on US App Store.',
    descriptionBn: 'ওপেনএআই-এর অফিশিয়াল আইওএস অ্যাপ। ভয়েস মোডসহ সব নতুন আপডেট সবার আগে ইউএস স্টোরে আসে।',
    appStoreSearchTerm: 'ChatGPT'
  },
  {
    id: 'brawl-stars',
    name: 'Brawl Stars',
    category: 'Action / Multiplayer',
    iconName: 'Gamepad2',
    badge: 'Supercell Top Pick',
    recommendedRegion: 'US',
    recommendedCountryName: 'United States / Canada',
    descriptionEn: 'Fast-paced 3v3 multiplayer and battle royale by Supercell. Available on all major US/CA stores.',
    descriptionBn: 'সুপারসেলের দ্রুতগতির ৩ বনাম ৩ মাল্টিপ্লেয়ার ব্যাটল রয়্যাল গেম।',
    appStoreSearchTerm: 'Brawl Stars'
  },
  {
    id: 'clash-of-clans',
    name: 'Clash of Clans',
    category: 'Strategy',
    iconName: 'Shield',
    badge: 'Legendary Strategy',
    recommendedRegion: 'US',
    recommendedCountryName: 'United States',
    descriptionEn: 'Epic strategy combat game. Build your village, raise a clan, and battle in Clan Wars.',
    descriptionBn: 'কিংবদন্তি স্ট্র্যাটেজি গেম। ইউএস স্টোরে ফুল আপডেটসহ ডাউনলোড করুন।',
    appStoreSearchTerm: 'Clash of Clans'
  },
  {
    id: 'monster-hunter-jp',
    name: 'Monster Hunter Now (JP)',
    category: 'AR / Action',
    iconName: 'Crosshair',
    badge: 'Japan Exclusive Events',
    recommendedRegion: 'JP',
    recommendedCountryName: 'Japan',
    descriptionEn: 'Niantic & Capcom official title with Japanese regional events and early content rollouts.',
    descriptionBn: 'জাপান স্টোরে বিশেষ ইভেন্ট ও এক্সক্লুসিভ রিওয়ার্ডসহ ক্যাপকমের অফিশিয়াল গেম।',
    appStoreSearchTerm: 'Monster Hunter Now'
  },
  {
    id: 'efootball',
    name: 'eFootball (PES)',
    category: 'Sports / Soccer',
    iconName: 'Trophy',
    badge: 'Konami Sports',
    recommendedRegion: 'US',
    recommendedCountryName: 'United States / UK',
    descriptionEn: 'Konami flagship football simulation with real clubs and online competitive leagues.',
    descriptionBn: 'কোনামির জনপ্রিয় ফুটবল সিমুলেশন গেম। ইউএস/ইউকে স্টোরে সম্পূর্ণ অ্যাভেইলেবল।',
    appStoreSearchTerm: 'eFootball'
  },
  {
    id: 'pubg-mobile-kr',
    name: 'PUBG Mobile (KR/JP)',
    category: 'Battle Royale',
    iconName: 'Target',
    badge: 'Korean Version',
    recommendedRegion: 'KR',
    recommendedCountryName: 'South Korea / Japan',
    descriptionEn: 'Dedicated Korean version with unique crate medals, Donkatsu medals, and anime collaborations.',
    descriptionBn: 'কোরিয়ান এক্সক্লুসিভ পাবজি মোবাইল। স্পেশাল মেডেল ও এক্সক্লুসিভ অ্যানিমে কোলাবোরেশন স্কিন।',
    appStoreSearchTerm: 'PUBG MOBILE'
  }
];
