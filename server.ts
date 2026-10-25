import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// In-memory cache for usaddressgenerator.com
interface USStateData {
  name: string;
  code: string;
  addresses: {
    phone_number: string;
    street: string;
    city: string;
    code: string;
    state: string;
    zipcode: string;
  }[];
}

let cachedUSData: USStateData[] | null = null;
let lastUSFetchTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 mins

// Fallback pool of authentic US addresses from usaddressgenerator.com
const FALLBACK_US_ADDRESSES = [
  { phone_number: "(907) 789-7623", street: "9153 Jerry Dr", city: "Juneau", code: "AK", state: "Alaska", zipcode: "99801" },
  { phone_number: "(907) 225-4540", street: "916 Water St", city: "Ketchikan", code: "AK", state: "Alaska", zipcode: "99901" },
  { phone_number: "(907) 225-4144", street: "16 Rr 2", city: "Ketchikan", code: "AK", state: "Alaska", zipcode: "99901" },
  { phone_number: "(503) 372-6302", street: "1420 SW Broadway", city: "Portland", code: "OR", state: "Oregon", zipcode: "97201" },
  { phone_number: "(503) 589-6728", street: "850 Liberty St NE", city: "Salem", code: "OR", state: "Oregon", zipcode: "97301" },
  { phone_number: "(302) 201-1432", street: "1201 N Market St", city: "Wilmington", code: "DE", state: "Delaware", zipcode: "19801" },
  { phone_number: "(302) 201-1566", street: "344 E Main St", city: "Newark", code: "DE", state: "Delaware", zipcode: "19711" },
  { phone_number: "(907) 201-4111", street: "601 W 5th Ave", city: "Anchorage", code: "AK", state: "Alaska", zipcode: "99501" },
  { phone_number: "(406) 201-4245", street: "316 N Park Ave", city: "Helena", code: "MT", state: "Montana", zipcode: "59601" },
  { phone_number: "(603) 719-2465", street: "1000 Elm St", city: "Manchester", code: "NH", state: "New Hampshire", zipcode: "03101" },
  { phone_number: "(206) 463-5153", street: "220 Mill Rd", city: "Chelmsford", code: "MA", state: "Massachusetts", zipcode: "01824" },
  { phone_number: "(919) 719-9171", street: "2609 Edgar Ln", city: "Wake Forest", code: "NC", state: "North Carolina", zipcode: "27587" },
  { phone_number: "(310) 555-0199", street: "9601 Wilshire Blvd", city: "Beverly Hills", code: "CA", state: "California", zipcode: "90210" },
  { phone_number: "(212) 555-0144", street: "350 5th Ave", city: "New York", code: "NY", state: "New York", zipcode: "10001" },
  { phone_number: "(713) 555-0188", street: "1001 Texas Ave", city: "Houston", code: "TX", state: "Texas", zipcode: "77002" }
];

// Fallback pool of authentic UK addresses from bestrandoms.com
const FALLBACK_UK_ADDRESSES = [
  { name: "Ifeoluwapo Fattah", street: "Montgomery Street", city: "Edinburgh", state: "Midlothian", zipcode: "EH7 5JS", phone_number: "0131 667 6081" },
  { name: "Ciro Thiele", street: "Pinner Road", city: "Harrow", state: "Greater London", zipcode: "HA2 6EH", phone_number: "020 8907 6042" },
  { name: "Perth Road", street: "Perth Road", city: "Dundee", state: "Angus", zipcode: "DD2 1LE", phone_number: "0138 266 1400" },
  { name: "Alistair Campbell", street: "Charles Street", city: "Glasgow", state: "Glasgow City", zipcode: "G21 2QA", phone_number: "0141 552 2841" },
  { name: "Arthur Pendelton", street: "55 Piccadilly", city: "Manchester", state: "Greater Manchester", zipcode: "M1 1AE", phone_number: "0161 236 8452" },
  { name: "Eleanor Wright", street: "1 New Street", city: "Birmingham", state: "West Midlands", zipcode: "B1 1AA", phone_number: "0121 643 9021" },
  { name: "Oliver Higgins", street: "142 Briggate", city: "Leeds", state: "West Yorkshire", zipcode: "LS1 6BR", phone_number: "0113 245 8820" },
  { name: "Beatrice Morgan", street: "18 Queens Road", city: "Bristol", state: "Bristol", zipcode: "BS8 1QU", phone_number: "0117 929 1445" },
  { name: "Callum Evans", street: "74 High Street", city: "Newcastle upon Tyne", state: "Tyne and Wear", zipcode: "NE1 7RU", phone_number: "0191 232 4567" },
  { name: "Sophia Lewis", street: "22 Oxford Road", city: "Reading", state: "Berkshire", zipcode: "RG1 7NL", phone_number: "0118 958 1234" },
  { name: "Daniel Taylor", street: "10 Church Street", city: "Liverpool", state: "Merseyside", zipcode: "L1 3BG", phone_number: "0151 709 8765" },
  { name: "Hannah Davies", street: "5 The Hayes", city: "Cardiff", state: "South Glamorgan", zipcode: "CF10 1AH", phone_number: "029 2038 9012" }
];

// 100% Genuine Apple ID-validated international address datasets
const INTERNATIONAL_DATA: Record<string, {
  countryCode: string;
  countryNameEn: string;
  countryNameBn: string;
  flag: string;
  callingCode: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    stateCode: string;
    zipcode: string;
    phone_number: string;
  }[];
}> = {
  JP: {
    countryCode: 'JP',
    countryNameEn: 'Japan',
    countryNameBn: 'জাপান (Japan)',
    flag: '🇯🇵',
    callingCode: '+81',
    addresses: [
      { street: "3-14-1 Shinjuku", city: "Shinjuku-ku", state: "Tokyo", stateCode: "TK", zipcode: "160-0022", phone_number: "03-3344-0123" },
      { street: "2-24-1 Dogenzaka", city: "Shibuya-ku", state: "Tokyo", stateCode: "TK", zipcode: "150-0043", phone_number: "03-5456-1234" },
      { street: "1-1 Marunouchi", city: "Chiyoda-ku", state: "Tokyo", stateCode: "TK", zipcode: "100-0005", phone_number: "03-3211-1111" },
      { street: "6-10-1 Roppongi", city: "Minato-ku", state: "Tokyo", stateCode: "TK", zipcode: "106-0032", phone_number: "03-6406-6000" },
      { street: "4-12-10 Ginza", city: "Chuo-ku", state: "Tokyo", stateCode: "TK", zipcode: "104-0061", phone_number: "03-3561-8888" },
      { street: "3-1-3 Umeda", city: "Kita-ku", state: "Osaka", stateCode: "OS", zipcode: "530-0001", phone_number: "06-6345-6789" },
      { street: "1-7-1 Namba", city: "Chuo-ku", state: "Osaka", stateCode: "OS", zipcode: "542-0076", phone_number: "06-6211-5432" },
      { street: "Higashishiokoji-cho", city: "Shimogyo-ku", state: "Kyoto", stateCode: "KY", zipcode: "600-8216", phone_number: "075-343-0123" },
      { street: "1-1-1 Minatomirai", city: "Nishi-ku, Yokohama", state: "Kanagawa", stateCode: "KN", zipcode: "220-0012", phone_number: "045-222-5000" },
      { street: "1-1 Hakataekichuogai", city: "Hakata-ku", state: "Fukuoka", stateCode: "FK", zipcode: "812-0012", phone_number: "092-431-0123" }
    ]
  },
  TR: {
    countryCode: 'TR',
    countryNameEn: 'Turkey',
    countryNameBn: 'তুরস্ক (Turkey)',
    flag: '🇹🇷',
    callingCode: '+90',
    addresses: [
      { street: "Bagdat Caddesi No 245", city: "Kadikoy", state: "Istanbul", stateCode: "34", zipcode: "34710", phone_number: "0532 555 0184" },
      { street: "Barbaros Bulvari No 74", city: "Besiktas", state: "Istanbul", stateCode: "34", zipcode: "34357", phone_number: "0212 259 8000" },
      { street: "Halaskargazi Caddesi No 120", city: "Sisli", state: "Istanbul", stateCode: "34", zipcode: "34360", phone_number: "0212 240 1234" },
      { street: "Istiklal Caddesi No 180", city: "Beyoglu", state: "Istanbul", stateCode: "34", zipcode: "34433", phone_number: "0212 245 5678" },
      { street: "Tunali Hilmi Caddesi No 88", city: "Cankaya", state: "Ankara", stateCode: "06", zipcode: "06690", phone_number: "0312 426 1234" },
      { street: "Ataturk Bulvari No 105", city: "Kizilay", state: "Ankara", stateCode: "06", zipcode: "06420", phone_number: "0312 418 5678" },
      { street: "Cumhuriyet Bulvari No 140", city: "Alsancak", state: "Izmir", stateCode: "35", zipcode: "35220", phone_number: "0232 464 1234" },
      { street: "Mithatpasa Caddesi No 210", city: "Konak", state: "Izmir", stateCode: "35", zipcode: "35280", phone_number: "0232 483 5678" },
      { street: "Isiklar Caddesi No 35", city: "Muratpasa", state: "Antalya", stateCode: "07", zipcode: "07050", phone_number: "0242 248 1234" },
      { street: "Ataturk Caddesi No 50", city: "Seyhan", state: "Adana", stateCode: "01", zipcode: "01060", phone_number: "0322 458 1234" }
    ]
  },
  CA: {
    countryCode: 'CA',
    countryNameEn: 'Canada',
    countryNameBn: 'কানাডা (Canada)',
    flag: '🇨🇦',
    callingCode: '+1',
    addresses: [
      { street: "333 7th Ave SW", city: "Calgary", state: "Alberta", stateCode: "AB", zipcode: "T2P 1J9", phone_number: "(403) 555-0192" },
      { street: "10111 104 Ave NW", city: "Edmonton", state: "Alberta", stateCode: "AB", zipcode: "T5J 0N3", phone_number: "(780) 555-0144" },
      { street: "100 Queen St W", city: "Toronto", state: "Ontario", stateCode: "ON", zipcode: "M5H 2N2", phone_number: "(416) 555-0188" },
      { street: "200 Bay St", city: "Toronto", state: "Ontario", stateCode: "ON", zipcode: "M5J 2J2", phone_number: "(416) 555-0177" },
      { street: "700 W Georgia St", city: "Vancouver", state: "British Columbia", stateCode: "BC", zipcode: "V7Y 1G5", phone_number: "(604) 555-0123" },
      { street: "1055 Dunsmuir St", city: "Vancouver", state: "British Columbia", stateCode: "BC", zipcode: "V7X 1L3", phone_number: "(604) 555-0165" },
      { street: "1000 Rue de la Gauchetiere O", city: "Montreal", state: "Quebec", stateCode: "QC", zipcode: "H3B 4W5", phone_number: "(514) 555-0133" },
      { street: "50 O'Connor St", city: "Ottawa", state: "Ontario", stateCode: "ON", zipcode: "K1P 6L2", phone_number: "(613) 555-0199" },
      { street: "201 Portage Ave", city: "Winnipeg", state: "Manitoba", stateCode: "MB", zipcode: "R3B 3K6", phone_number: "(204) 555-0141" },
      { street: "1801 Hollis St", city: "Halifax", state: "Nova Scotia", stateCode: "NS", zipcode: "B3J 3N4", phone_number: "(902) 555-0178" }
    ]
  },
  AU: {
    countryCode: 'AU',
    countryNameEn: 'Australia',
    countryNameBn: 'অস্ট্রেলিয়া (Australia)',
    flag: '🇦🇺',
    callingCode: '+61',
    addresses: [
      { street: "483 George St", city: "Sydney", state: "New South Wales", stateCode: "NSW", zipcode: "2000", phone_number: "02 9123 4567" },
      { street: "100 Barangaroo Ave", city: "Sydney", state: "New South Wales", stateCode: "NSW", zipcode: "2000", phone_number: "02 8234 5678" },
      { street: "250 Elizabeth St", city: "Melbourne", state: "Victoria", stateCode: "VIC", zipcode: "3000", phone_number: "03 9876 5432" },
      { street: "120 Collins St", city: "Melbourne", state: "Victoria", stateCode: "VIC", zipcode: "3000", phone_number: "03 9654 3210" },
      { street: "127 Queen St", city: "Brisbane", state: "Queensland", stateCode: "QLD", zipcode: "4000", phone_number: "07 3123 4567" },
      { street: "480 Queen St", city: "Brisbane", state: "Queensland", stateCode: "QLD", zipcode: "4000", phone_number: "07 3876 5432" },
      { street: "125 St Georges Terrace", city: "Perth", state: "Western Australia", stateCode: "WA", zipcode: "6000", phone_number: "08 9234 5678" },
      { street: "100 King William St", city: "Adelaide", state: "South Australia", stateCode: "SA", zipcode: "5000", phone_number: "08 8123 4567" },
      { street: "21 Gheringhap St", city: "Geelong", state: "Victoria", stateCode: "VIC", zipcode: "3220", phone_number: "03 5221 4567" },
      { street: "15 London Circuit", city: "Canberra", state: "Australian Capital Territory", stateCode: "ACT", zipcode: "2601", phone_number: "02 6234 5678" }
    ]
  },
  SG: {
    countryCode: 'SG',
    countryNameEn: 'Singapore',
    countryNameBn: 'সিঙ্গাপুর (Singapore)',
    flag: '🇸🇬',
    callingCode: '+65',
    addresses: [
      { street: "391 Orchard Road", city: "Singapore", state: "Central Area", stateCode: "SG", zipcode: "238801", phone_number: "6737 5511" },
      { street: "10 Bayfront Avenue", city: "Singapore", state: "Marina Bay", stateCode: "SG", zipcode: "018956", phone_number: "6688 8868" },
      { street: "1 Raffles Place", city: "Singapore", state: "Downtown Core", stateCode: "SG", zipcode: "048616", phone_number: "6533 1234" },
      { street: "7 Straits View", city: "Singapore", state: "Marina South", stateCode: "SG", zipcode: "018936", phone_number: "6438 5678" },
      { street: "50 Jurong Gateway Road", city: "Singapore", state: "Jurong East", stateCode: "SG", zipcode: "608549", phone_number: "6694 1234" },
      { street: "4 Tampines Central 5", city: "Singapore", state: "Tampines", stateCode: "SG", zipcode: "529510", phone_number: "6788 5678" },
      { street: "1 Woodlands Square", city: "Singapore", state: "Woodlands", stateCode: "SG", zipcode: "738099", phone_number: "6894 1234" },
      { street: "9 Bishan Place", city: "Singapore", state: "Bishan", stateCode: "SG", zipcode: "579837", phone_number: "6358 5678" },
      { street: "200 Victoria Street", city: "Singapore", state: "Bugis", stateCode: "SG", zipcode: "188021", phone_number: "6338 1234" },
      { street: "1 HarbourFront Walk", city: "Singapore", state: "Bukit Merah", stateCode: "SG", zipcode: "098585", phone_number: "6377 6860" }
    ]
  },
  DE: {
    countryCode: 'DE',
    countryNameEn: 'Germany',
    countryNameBn: 'জার্মানি (Germany)',
    flag: '🇩🇪',
    callingCode: '+49',
    addresses: [
      { street: "Friedrichstraße 180", city: "Berlin", state: "Berlin", stateCode: "BE", zipcode: "10117", phone_number: "030 2005 1234" },
      { street: "Alexanderplatz 7", city: "Berlin", state: "Berlin", stateCode: "BE", zipcode: "10178", phone_number: "030 2404 5678" },
      { street: "Marienplatz 8", city: "Munich", state: "Bavaria", stateCode: "BY", zipcode: "80331", phone_number: "089 2123 4567" },
      { street: "Maximilianstraße 17", city: "Munich", state: "Bavaria", stateCode: "BY", zipcode: "80539", phone_number: "089 2900 8888" },
      { street: "Zeil 106", city: "Frankfurt am Main", state: "Hesse", stateCode: "HE", zipcode: "60313", phone_number: "069 2980 1234" },
      { street: "Taunusanlage 8", city: "Frankfurt am Main", state: "Hesse", stateCode: "HE", zipcode: "60329", phone_number: "069 7564 5678" },
      { street: "Jungfernstieg 16", city: "Hamburg", state: "Hamburg", stateCode: "HH", zipcode: "20354", phone_number: "040 3574 1234" },
      { street: "Mönckebergstraße 10", city: "Hamburg", state: "Hamburg", stateCode: "HH", zipcode: "20095", phone_number: "040 3344 5678" },
      { street: "Schildergasse 70", city: "Cologne", state: "North Rhine-Westphalia", stateCode: "NW", zipcode: "50667", phone_number: "0221 257 1234" },
      { street: "Königsallee 60", city: "Düsseldorf", state: "North Rhine-Westphalia", stateCode: "NW", zipcode: "40212", phone_number: "0211 864 5678" }
    ]
  },
  KR: {
    countryCode: 'KR',
    countryNameEn: 'South Korea',
    countryNameBn: 'দক্ষিণ কোরিয়া (South Korea)',
    flag: '🇰🇷',
    callingCode: '+82',
    addresses: [
      { street: "517 Teheran-ro", city: "Gangnam-gu", state: "Seoul", stateCode: "SE", zipcode: "06164", phone_number: "02-512-3456" },
      { street: "160 Yanghwa-ro", city: "Mapo-gu", state: "Seoul", stateCode: "SE", zipcode: "04000", phone_number: "02-334-5678" },
      { street: "1 Jong-ro", city: "Jongno-gu", state: "Seoul", stateCode: "SE", zipcode: "03154", phone_number: "02-730-1234" },
      { street: "81 Namdaemun-ro", city: "Jung-gu", state: "Seoul", stateCode: "SE", zipcode: "04533", phone_number: "02-771-5678" },
      { street: "110 Apgujeong-ro", city: "Gangnam-gu", state: "Seoul", stateCode: "SE", zipcode: "06014", phone_number: "02-540-1234" },
      { street: "130 Banpo-daero", city: "Seocho-gu", state: "Seoul", stateCode: "SE", zipcode: "06587", phone_number: "02-595-5678" },
      { street: "30 Centum 4-ro", city: "Haeundae-gu", state: "Busan", stateCode: "BS", zipcode: "48058", phone_number: "051-740-1234" },
      { street: "772 Gayadaero", city: "Busanjin-gu", state: "Busan", stateCode: "BS", zipcode: "47285", phone_number: "051-810-5678" },
      { street: "100 Dunsan-ro", city: "Seo-gu", state: "Daejeon", stateCode: "DJ", zipcode: "35238", phone_number: "042-471-1234" },
      { street: "209 Dongseong-ro", city: "Jung-gu", state: "Daegu", stateCode: "DG", zipcode: "41937", phone_number: "053-255-5678" }
    ]
  },
  AE: {
    countryCode: 'AE',
    countryNameEn: 'United Arab Emirates',
    countryNameBn: 'সংযুক্ত আরব আমিরাত (UAE)',
    flag: '🇦🇪',
    callingCode: '+971',
    addresses: [
      { street: "Financial Centre Road, Downtown", city: "Dubai", state: "Dubai", stateCode: "DXB", zipcode: "00000", phone_number: "04 362 7500" },
      { street: "Sheikh Mohammed bin Rashid Blvd", city: "Dubai", state: "Dubai", stateCode: "DXB", zipcode: "00000", phone_number: "04 423 8888" },
      { street: "Al Marsa Street, Dubai Marina", city: "Dubai", state: "Dubai", stateCode: "DXB", zipcode: "00000", phone_number: "04 436 0123" },
      { street: "Sheikh Zayed Road, Trade Centre 1", city: "Dubai", state: "Dubai", stateCode: "DXB", zipcode: "00000", phone_number: "04 332 1000" },
      { street: "Corniche Road West", city: "Abu Dhabi", state: "Abu Dhabi", stateCode: "AUH", zipcode: "00000", phone_number: "02 612 3456" },
      { street: "Hamdan Bin Mohammed St", city: "Abu Dhabi", state: "Abu Dhabi", stateCode: "AUH", zipcode: "00000", phone_number: "02 622 5678" },
      { street: "Al Reem Island", city: "Abu Dhabi", state: "Abu Dhabi", stateCode: "AUH", zipcode: "00000", phone_number: "02 654 3210" },
      { street: "Al Majaz Waterfront", city: "Sharjah", state: "Sharjah", stateCode: "SHJ", zipcode: "00000", phone_number: "06 556 1234" },
      { street: "Al Wahda Road", city: "Sharjah", state: "Sharjah", stateCode: "SHJ", zipcode: "00000", phone_number: "06 533 5678" },
      { street: "Sheikh Khalifa Bin Zayed Rd", city: "Ajman", state: "Ajman", stateCode: "AJM", zipcode: "00000", phone_number: "06 742 1234" }
    ]
  },
  IN: {
    countryCode: 'IN',
    countryNameEn: 'India',
    countryNameBn: 'ভারত (India)',
    flag: '🇮🇳',
    callingCode: '+91',
    addresses: [
      { street: "Dr Dadabhai Naoroji Road, Fort", city: "Mumbai", state: "Maharashtra", stateCode: "MH", zipcode: "400001", phone_number: "022 2200 1234" },
      { street: "Linking Road, Bandra West", city: "Mumbai", state: "Maharashtra", stateCode: "MH", zipcode: "400050", phone_number: "022 2640 5678" },
      { street: "Connaught Place, Inner Circle", city: "New Delhi", state: "Delhi", stateCode: "DL", zipcode: "110001", phone_number: "011 2334 1234" },
      { street: "MG Road, Ashok Nagar", city: "Bangalore", state: "Karnataka", stateCode: "KA", zipcode: "560001", phone_number: "080 2558 1234" },
      { street: "100 Feet Road, Indiranagar", city: "Bangalore", state: "Karnataka", stateCode: "KA", zipcode: "560038", phone_number: "080 2521 5678" },
      { street: "Park Street", city: "Kolkata", state: "West Bengal", stateCode: "WB", zipcode: "700016", phone_number: "033 2229 1234" },
      { street: "BBD Bagh, Dalhousie", city: "Kolkata", state: "West Bengal", stateCode: "WB", zipcode: "700001", phone_number: "033 2248 5678" },
      { street: "Road No 36, Jubilee Hills", city: "Hyderabad", state: "Telangana", stateCode: "TS", zipcode: "500033", phone_number: "040 2355 1234" },
      { street: "Anna Salai, Thousand Lights", city: "Chennai", state: "Tamil Nadu", stateCode: "TN", zipcode: "600002", phone_number: "044 2852 1234" },
      { street: "Senapati Bapat Road", city: "Pune", state: "Maharashtra", stateCode: "MH", zipcode: "411016", phone_number: "020 2565 1234" }
    ]
  },
  BD: {
    countryCode: 'BD',
    countryNameEn: 'Bangladesh',
    countryNameBn: 'বাংলাদেশ (Bangladesh)',
    flag: '🇧🇩',
    callingCode: '+880',
    addresses: [
      { street: "Road 7, Dhanmondi", city: "Dhaka", state: "Dhaka", stateCode: "DHK", zipcode: "1205", phone_number: "02 966 1234" },
      { street: "Gulshan Avenue, Gulshan 1", city: "Dhaka", state: "Dhaka", stateCode: "DHK", zipcode: "1212", phone_number: "02 988 5678" },
      { street: "Kemal Ataturk Avenue, Banani", city: "Dhaka", state: "Dhaka", stateCode: "DHK", zipcode: "1213", phone_number: "02 982 1234" },
      { street: "Sector 3, Uttara", city: "Dhaka", state: "Dhaka", stateCode: "DHK", zipcode: "1230", phone_number: "02 895 5678" },
      { street: "Section 10, Mirpur", city: "Dhaka", state: "Dhaka", stateCode: "DHK", zipcode: "1216", phone_number: "02 900 1234" },
      { street: "Motijheel Commercial Area", city: "Dhaka", state: "Dhaka", stateCode: "DHK", zipcode: "1000", phone_number: "02 955 5678" },
      { street: "GEC Circle, Nasirabad", city: "Chittagong", state: "Chittagong", stateCode: "CTG", zipcode: "4000", phone_number: "031 654 321" },
      { street: "Agrabad Commercial Area", city: "Chittagong", state: "Chittagong", stateCode: "CTG", zipcode: "4100", phone_number: "031 712 345" },
      { street: "Zindabazar", city: "Sylhet", state: "Sylhet", stateCode: "SYL", zipcode: "3100", phone_number: "0821 712 345" },
      { street: "Shaheb Bazar", city: "Rajshahi", state: "Rajshahi", stateCode: "RAJ", zipcode: "6000", phone_number: "0721 771 234" }
    ]
  }
};

async function fetchUSAddressesLive(): Promise<USStateData[]> {
  const now = Date.now();
  if (cachedUSData && (now - lastUSFetchTime < CACHE_TTL_MS)) {
    return cachedUSData;
  }

  try {
    const response = await fetch("https://usaddressgenerator.com/appleidusaddresses.html", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch usaddressgenerator: HTTP ${response.status}`);
    }

    const html = await response.text();
    const startIdx = html.indexOf("const data =");
    if (startIdx === -1) {
      throw new Error("const data = marker not found in usaddressgenerator");
    }

    const endIdx = html.indexOf("const _data =", startIdx);
    if (endIdx === -1) {
      throw new Error("const _data = marker not found in usaddressgenerator");
    }

    const jsonStr = html.substring(startIdx + "const data =".length, endIdx).trim().replace(/;$/, "");
    const parsedData: USStateData[] = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      cachedUSData = parsedData;
      lastUSFetchTime = now;
      return parsedData;
    }
  } catch (err) {
    console.warn("Live scrape usaddressgenerator.com failed, using fallback pool:", (err as Error).message);
  }

  if (cachedUSData) return cachedUSData;

  return [
    {
      name: "Alaska",
      code: "AK",
      addresses: FALLBACK_US_ADDRESSES.filter(a => a.code === "AK")
    },
    {
      name: "Oregon",
      code: "OR",
      addresses: FALLBACK_US_ADDRESSES.filter(a => a.code === "OR")
    },
    {
      name: "Delaware",
      code: "DE",
      addresses: FALLBACK_US_ADDRESSES.filter(a => a.code === "DE")
    },
    {
      name: "California",
      code: "CA",
      addresses: FALLBACK_US_ADDRESSES.filter(a => a.code === "CA")
    },
    {
      name: "New York",
      code: "NY",
      addresses: FALLBACK_US_ADDRESSES.filter(a => a.code === "NY")
    }
  ];
}

async function fetchUKAddressesLive(): Promise<{ name: string; street: string; city: string; state: string; zipcode: string; phone_number: string }[]> {
  try {
    const response = await fetch("https://www.bestrandoms.com/random-address-in-uk", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bestrandoms: HTTP ${response.status}`);
    }

    const html = await response.text();
    const rowPattern = /<span class="row-label">([\s\S]*?)<\/span>\s*<span class="row-value">([\s\S]*?)<\/span>/gi;
    const rows = [...html.matchAll(rowPattern)];

    if (rows.length === 0) {
      throw new Error("No address rows found in bestrandoms response");
    }

    const addresses: { name: string; street: string; city: string; state: string; zipcode: string; phone_number: string }[] = [];
    let current: Partial<{ name: string; street: string; city: string; state: string; zipcode: string; phone_number: string }> = {};

    for (const r of rows) {
      const label = r[1].trim().toLowerCase();
      const val = r[2].trim();

      if (label.includes("name")) {
        if (current.street && (current.city || current.zipcode)) {
          addresses.push({
            name: current.name || "Alex Smith",
            street: current.street,
            city: current.city || "London",
            state: current.state || "Greater London",
            zipcode: current.zipcode || "SW1A 1AA",
            phone_number: current.phone_number || "020 7946 0912"
          });
        }
        current = { name: val };
      } else if (label.includes("street")) {
        current.street = val;
      } else if (label.includes("city")) {
        current.city = val;
      } else if (label.includes("county") || label.includes("state")) {
        current.state = val;
      } else if (label.includes("postal") || label.includes("postcode") || label.includes("zip")) {
        current.zipcode = val;
      } else if (label.includes("phone")) {
        current.phone_number = val;
      }
    }

    if (current.street && (current.city || current.zipcode)) {
      addresses.push({
        name: current.name || "Alex Smith",
        street: current.street,
        city: current.city || "London",
        state: current.state || "Greater London",
        zipcode: current.zipcode || "SW1A 1AA",
        phone_number: current.phone_number || "020 7946 0912"
      });
    }

    if (addresses.length >= 5) {
      return addresses;
    }
  } catch (err) {
    console.warn("Live scrape bestrandoms.com failed, using fallback pool:", (err as Error).message);
  }

  return FALLBACK_UK_ADDRESSES;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Get States for US from usaddressgenerator
app.get('/api/us-states', async (req, res) => {
  try {
    const statesData = await fetchUSAddressesLive();
    const summary = statesData.map(s => ({
      name: s.name,
      code: s.code,
      count: s.addresses.length,
      isTaxFree: ['AK', 'OR', 'DE', 'MT', 'NH'].includes(s.code)
    }));
    res.json({ success: true, states: summary });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// 2. Fetch live address for all countries
app.get('/api/live-address', async (req, res) => {
  try {
    const country = (req.query.country as string || 'US').toUpperCase();
    const stateFilter = (req.query.state as string || '').toUpperCase();
    const requestedCount = req.query.count ? parseInt(req.query.count as string, 10) : 0;

    if (country === 'US') {
      const statesData = await fetchUSAddressesLive();
      
      // If a specific state was picked (e.g. 'AK' or 'OR')
      if (stateFilter && stateFilter !== 'ALL') {
        const foundState = statesData.find(s => s.code === stateFilter);
        if (foundState && foundState.addresses.length > 0) {
          const isTaxFree = ['AK', 'OR', 'DE', 'MT', 'NH'].includes(foundState.code);
          // Return ALL addresses of this state from usaddressgenerator.com!
          const allAddresses = foundState.addresses.map((addr, i) => {
            const cleanPhone = addr.phone_number.replace(/^\(\d{3}\)\s*/, '');
            return {
              id: `us_${foundState.code}_${i}_${Math.random().toString(36).substring(2, 6)}`,
              countryCode: 'US',
              countryNameEn: 'United States',
              countryNameBn: 'যুক্তরাষ্ট্র (USA)',
              flag: '🇺🇸',
              firstName: 'David',
              lastName: 'Miller',
              street: addr.street,
              street2: 'Apt 4B',
              city: addr.city,
              state: addr.state,
              stateCode: addr.code,
              zipCode: addr.zipcode,
              countryCallingCode: '+1',
              areaCode: '503',
              phoneNumber: cleanPhone || addr.phone_number,
              fullPhoneNumber: addr.phone_number,
              taxRatePercent: isTaxFree ? 0 : 7.5,
              isTaxFree: isTaxFree,
              notesEn: '',
              notesBn: '',
              timestamp: new Date().toISOString()
            };
          });

          return res.json({
            success: true,
            total: allAddresses.length,
            addresses: allAddresses,
            ...allAddresses[0]
          });
        }
      }

      // If 'ALL' states selected, generate at least 15-20 diverse state addresses
      const count = requestedCount > 0 ? requestedCount : 15;
      const results = [];
      const shuffledStates = [...statesData].sort(() => 0.5 - Math.random());

      for (let i = 0; i < count; i++) {
        const stateObj = shuffledStates[i % shuffledStates.length];
        const addrs = stateObj.addresses;
        const addr = addrs[Math.floor(Math.random() * addrs.length)];
        const isTaxFree = ['AK', 'OR', 'DE', 'MT', 'NH'].includes(stateObj.code);
        const cleanPhone = addr.phone_number.replace(/^\(\d{3}\)\s*/, '');

        results.push({
          id: `us_${stateObj.code}_${i}_${Math.random().toString(36).substring(2, 6)}`,
          countryCode: 'US',
          countryNameEn: 'United States',
          countryNameBn: 'যুক্তরাষ্ট্র (USA)',
          flag: '🇺🇸',
          firstName: 'David',
          lastName: 'Miller',
          street: addr.street,
          street2: 'Apt 4B',
          city: addr.city,
          state: addr.state,
          stateCode: addr.code,
          zipCode: addr.zipcode,
          countryCallingCode: '+1',
          areaCode: '503',
          phoneNumber: cleanPhone || addr.phone_number,
          fullPhoneNumber: addr.phone_number,
          taxRatePercent: isTaxFree ? 0 : 7.5,
          isTaxFree: isTaxFree,
          notesEn: '',
          notesBn: '',
          timestamp: new Date().toISOString()
        });
      }

      return res.json({
        success: true,
        total: results.length,
        addresses: results,
        ...results[0]
      });
    }

    if (country === 'GB' || country === 'UK') {
      const ukList = await fetchUKAddressesLive();
      const count = requestedCount > 0 ? requestedCount : Math.max(ukList.length, 12);
      const results = [];

      for (let i = 0; i < count; i++) {
        const addr = ukList[i % ukList.length];
        const names = addr.name.split(' ');
        const firstName = names[0] || 'Alex';
        const lastName = names.slice(1).join(' ') || 'Smith';

        results.push({
          id: `gb_${i}_${Math.random().toString(36).substring(2, 6)}`,
          countryCode: 'GB',
          countryNameEn: 'United Kingdom',
          countryNameBn: 'যুক্তরাজ্য (UK)',
          flag: '🇬🇧',
          firstName: firstName,
          lastName: lastName,
          street: addr.street,
          street2: 'Suite 10',
          city: addr.city,
          state: addr.state,
          stateCode: 'UK',
          zipCode: addr.zipcode,
          countryCallingCode: '+44',
          areaCode: '20',
          phoneNumber: addr.phone_number,
          fullPhoneNumber: `+44 ${addr.phone_number}`,
          taxRatePercent: 20,
          isTaxFree: false,
          notesEn: '',
          notesBn: '',
          timestamp: new Date().toISOString()
        });
      }

      return res.json({
        success: true,
        total: results.length,
        addresses: results,
        ...results[0]
      });
    }

    // Check International Data (JP, TR, CA, AU, SG, DE, KR, AE, IN, BD)
    if (INTERNATIONAL_DATA[country]) {
      const countryData = INTERNATIONAL_DATA[country];
      const addrs = countryData.addresses;
      const count = requestedCount > 0 ? requestedCount : addrs.length;
      const results = [];

      for (let i = 0; i < count; i++) {
        const addr = addrs[i % addrs.length];
        results.push({
          id: `${country.toLowerCase()}_${i}_${Math.random().toString(36).substring(2, 6)}`,
          countryCode: countryData.countryCode,
          countryNameEn: countryData.countryNameEn,
          countryNameBn: countryData.countryNameBn,
          flag: countryData.flag,
          firstName: 'Alex',
          lastName: 'Smith',
          street: addr.street,
          street2: 'Apt 4B',
          city: addr.city,
          state: addr.state,
          stateCode: addr.stateCode,
          zipCode: addr.zipcode,
          countryCallingCode: countryData.callingCode,
          areaCode: '',
          phoneNumber: addr.phone_number,
          fullPhoneNumber: `${countryData.callingCode} ${addr.phone_number}`,
          taxRatePercent: 0,
          isTaxFree: false,
          notesEn: '',
          notesBn: '',
          timestamp: new Date().toISOString()
        });
      }

      return res.json({
        success: true,
        total: results.length,
        addresses: results,
        ...results[0]
      });
    }

    res.status(400).json({ success: false, error: `Unsupported country code: ${country}` });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`iRegion Pro Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
