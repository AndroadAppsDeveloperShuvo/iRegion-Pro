import { GeneratedAddress, SupportedCountryCode } from '../types';
import { COUNTRIES_META, FIRST_NAMES, LAST_NAMES } from '../data/countries';

export interface USStateOption {
  name: string;
  code: string;
  count: number;
  isTaxFree: boolean;
}

// -----------------------------------------------------------------
// Authentic fallback datasets for US, UK, and all 12 supported countries
// -----------------------------------------------------------------

export const US_STATES_DATA: { name: string; code: string; isTaxFree: boolean; addresses: { street: string; city: string; state: string; code: string; zipcode: string; phone_number: string }[] }[] = [
  {
    name: "Oregon",
    code: "OR",
    isTaxFree: true,
    addresses: [
      { phone_number: "(503) 372-6302", street: "1420 SW Broadway", city: "Portland", code: "OR", state: "Oregon", zipcode: "97201" },
      { phone_number: "(503) 589-6728", street: "850 Liberty St NE", city: "Salem", code: "OR", state: "Oregon", zipcode: "97301" },
      { phone_number: "(541) 682-5010", street: "777 Pearl St", city: "Eugene", code: "OR", state: "Oregon", zipcode: "97401" },
      { phone_number: "(503) 644-8111", street: "4755 SW Griffith Dr", city: "Beaverton", code: "OR", state: "Oregon", zipcode: "97005" },
      { phone_number: "(541) 388-5505", street: "710 NW Wall St", city: "Bend", code: "OR", state: "Oregon", zipcode: "97701" },
      { phone_number: "(503) 635-0260", street: "380 A Ave", city: "Lake Oswego", code: "OR", state: "Oregon", zipcode: "97034" },
      { phone_number: "(541) 774-2000", street: "411 W 8th St", city: "Medford", code: "OR", state: "Oregon", zipcode: "97501" }
    ]
  },
  {
    name: "Delaware",
    code: "DE",
    isTaxFree: true,
    addresses: [
      { phone_number: "(302) 201-1432", street: "1201 N Market St", city: "Wilmington", code: "DE", state: "Delaware", zipcode: "19801" },
      { phone_number: "(302) 201-1566", street: "344 E Main St", city: "Newark", code: "DE", state: "Delaware", zipcode: "19711" },
      { phone_number: "(302) 739-4111", street: "411 Federal St", city: "Dover", code: "DE", state: "Delaware", zipcode: "19901" },
      { phone_number: "(302) 856-5400", street: "2 The Circle", city: "Georgetown", code: "DE", state: "Delaware", zipcode: "19947" },
      { phone_number: "(302) 227-6181", street: "229 Rehoboth Ave", city: "Rehoboth Beach", code: "DE", state: "Delaware", zipcode: "19971" },
      { phone_number: "(302) 322-9801", street: "220 Delaware St", city: "New Castle", code: "DE", state: "Delaware", zipcode: "19720" }
    ]
  },
  {
    name: "Alaska",
    code: "AK",
    isTaxFree: true,
    addresses: [
      { phone_number: "(907) 789-7623", street: "9153 Jerry Dr", city: "Juneau", code: "AK", state: "Alaska", zipcode: "99801" },
      { phone_number: "(907) 225-4540", street: "916 Water St", city: "Ketchikan", code: "AK", state: "Alaska", zipcode: "99901" },
      { phone_number: "(907) 225-4144", street: "16 Rr 2", city: "Ketchikan", code: "AK", state: "Alaska", zipcode: "99901" },
      { phone_number: "(907) 201-4111", street: "601 W 5th Ave", city: "Anchorage", code: "AK", state: "Alaska", zipcode: "99501" },
      { phone_number: "(907) 459-6793", street: "800 Cushman St", city: "Fairbanks", code: "AK", state: "Alaska", zipcode: "99701" },
      { phone_number: "(907) 745-3271", street: "231 W Evergreen Ave", city: "Palmer", code: "AK", state: "Alaska", zipcode: "99645" }
    ]
  },
  {
    name: "Montana",
    code: "MT",
    isTaxFree: true,
    addresses: [
      { phone_number: "(406) 201-4245", street: "316 N Park Ave", city: "Helena", code: "MT", state: "Montana", zipcode: "59601" },
      { phone_number: "(406) 657-8200", street: "210 N 27th St", city: "Billings", code: "MT", state: "Montana", zipcode: "59101" },
      { phone_number: "(406) 556-2300", street: "121 N Rouse Ave", city: "Bozeman", code: "MT", state: "Montana", zipcode: "59715" },
      { phone_number: "(406) 552-6000", street: "435 Ryman St", city: "Missoula", code: "MT", state: "Montana", zipcode: "59802" },
      { phone_number: "(406) 455-8450", street: "2 Park Dr S", city: "Great Falls", code: "MT", state: "Montana", zipcode: "59401" }
    ]
  },
  {
    name: "New Hampshire",
    code: "NH",
    isTaxFree: true,
    addresses: [
      { phone_number: "(603) 719-2465", street: "1000 Elm St", city: "Manchester", code: "NH", state: "New Hampshire", zipcode: "03101" },
      { phone_number: "(603) 225-8500", street: "41 Green St", city: "Concord", code: "NH", state: "New Hampshire", zipcode: "03301" },
      { phone_number: "(603) 589-3000", street: "229 Main St", city: "Nashua", code: "NH", state: "New Hampshire", zipcode: "03060" },
      { phone_number: "(603) 431-2000", street: "1 Junkins Ave", city: "Portsmouth", code: "NH", state: "New Hampshire", zipcode: "03801" },
      { phone_number: "(603) 516-6000", street: "288 Central Ave", city: "Dover", code: "NH", state: "New Hampshire", zipcode: "03820" }
    ]
  },
  {
    name: "California",
    code: "CA",
    isTaxFree: false,
    addresses: [
      { phone_number: "(310) 555-0199", street: "9601 Wilshire Blvd", city: "Beverly Hills", code: "CA", state: "California", zipcode: "90210" },
      { phone_number: "(415) 555-0142", street: "1 Market St", city: "San Francisco", code: "CA", state: "California", zipcode: "94105" },
      { phone_number: "(213) 555-0188", street: "333 S Hope St", city: "Los Angeles", code: "CA", state: "California", zipcode: "90071" },
      { phone_number: "(408) 555-0123", street: "1 Infinite Loop", city: "Cupertino", code: "CA", state: "California", zipcode: "95014" },
      { phone_number: "(619) 555-0177", street: "501 W Broadway", city: "San Diego", code: "CA", state: "California", zipcode: "92101" }
    ]
  },
  {
    name: "New York",
    code: "NY",
    isTaxFree: false,
    addresses: [
      { phone_number: "(212) 555-0144", street: "350 5th Ave", city: "New York", code: "NY", state: "New York", zipcode: "10118" },
      { phone_number: "(212) 555-0192", street: "767 5th Ave", city: "New York", code: "NY", state: "New York", zipcode: "10153" },
      { phone_number: "(718) 555-0165", street: "123 Flatbush Ave", city: "Brooklyn", code: "NY", state: "New York", zipcode: "11217" },
      { phone_number: "(518) 555-0133", street: "State St & Washington Ave", city: "Albany", code: "NY", state: "New York", zipcode: "12224" },
      { phone_number: "(716) 555-0155", street: "65 Niagara Sq", city: "Buffalo", code: "NY", state: "New York", zipcode: "14202" }
    ]
  },
  {
    name: "Texas",
    code: "TX",
    isTaxFree: false,
    addresses: [
      { phone_number: "(713) 555-0188", street: "1001 Texas Ave", city: "Houston", code: "TX", state: "Texas", zipcode: "77002" },
      { phone_number: "(214) 555-0144", street: "1717 Main St", city: "Dallas", code: "TX", state: "Texas", zipcode: "75201" },
      { phone_number: "(512) 555-0199", street: "100 Congress Ave", city: "Austin", code: "TX", state: "Texas", zipcode: "78701" },
      { phone_number: "(210) 555-0133", street: "300 E Travis St", city: "San Antonio", code: "TX", state: "Texas", zipcode: "78205" }
    ]
  },
  {
    name: "Florida",
    code: "FL",
    isTaxFree: false,
    addresses: [
      { phone_number: "(305) 555-0122", street: "701 Brickell Ave", city: "Miami", code: "FL", state: "Florida", zipcode: "33131" },
      { phone_number: "(407) 555-0177", street: "200 S Orange Ave", city: "Orlando", code: "FL", state: "Florida", zipcode: "32801" },
      { phone_number: "(813) 555-0144", street: "100 N Tampa St", city: "Tampa", code: "FL", state: "Florida", zipcode: "33602" }
    ]
  },
  {
    name: "Washington",
    code: "WA",
    isTaxFree: false,
    addresses: [
      { phone_number: "(206) 555-0111", street: "1201 3rd Ave", city: "Seattle", code: "WA", state: "Washington", zipcode: "98101" },
      { phone_number: "(425) 555-0188", street: "1 Microsoft Way", city: "Redmond", code: "WA", state: "Washington", zipcode: "98052" },
      { phone_number: "(509) 555-0155", street: "808 W Spokane Falls Blvd", city: "Spokane", code: "WA", state: "Washington", zipcode: "99201" }
    ]
  }
];

export const UK_ADDRESSES_DATA = [
  { name: "Arthur Pendelton", street: "55 Piccadilly", city: "Manchester", state: "Greater Manchester", zipcode: "M1 1AE", phone_number: "0161 236 8452" },
  { name: "Eleanor Wright", street: "1 New Street", city: "Birmingham", state: "West Midlands", zipcode: "B1 1AA", phone_number: "0121 643 9021" },
  { name: "Ciro Thiele", street: "Pinner Road", city: "Harrow", state: "Greater London", zipcode: "HA2 6EH", phone_number: "020 8907 6042" },
  { name: "Ifeoluwapo Fattah", street: "Montgomery Street", city: "Edinburgh", state: "Midlothian", zipcode: "EH7 5JS", phone_number: "0131 667 6081" },
  { name: "Oliver Higgins", street: "142 Briggate", city: "Leeds", state: "West Yorkshire", zipcode: "LS1 6BR", phone_number: "0113 245 8820" },
  { name: "Beatrice Morgan", street: "18 Queens Road", city: "Bristol", state: "Bristol", zipcode: "BS8 1QU", phone_number: "0117 929 1445" },
  { name: "Callum Evans", street: "74 High Street", city: "Newcastle upon Tyne", state: "Tyne and Wear", zipcode: "NE1 7RU", phone_number: "0191 232 4567" },
  { name: "Sophia Lewis", street: "22 Oxford Road", city: "Reading", state: "Berkshire", zipcode: "RG1 7NL", phone_number: "0118 958 1234" },
  { name: "Daniel Taylor", street: "10 Church Street", city: "Liverpool", state: "Merseyside", zipcode: "L1 3BG", phone_number: "0151 709 8765" },
  { name: "Hannah Davies", street: "5 The Hayes", city: "Cardiff", state: "South Glamorgan", zipcode: "CF10 1AH", phone_number: "029 2038 9012" },
  { name: "Alistair Campbell", street: "Charles Street", city: "Glasgow", state: "Glasgow City", zipcode: "G21 2QA", phone_number: "0141 552 2841" },
  { name: "Perth Road", street: "Perth Road", city: "Dundee", state: "Angus", zipcode: "DD2 1LE", phone_number: "0138 266 1400" }
];

export const INTERNATIONAL_DATA: Record<string, {
  countryCode: SupportedCountryCode;
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

// -----------------------------------------------------------------
// Core Generator Function (Pure Client-side, Zero Server Dependency)
// -----------------------------------------------------------------

export function generateAddressesLocally(country: SupportedCountryCode, stateCode: string = 'ALL', count: number = 15): GeneratedAddress[] {
  const meta = COUNTRIES_META.find(m => m.code === country) || COUNTRIES_META[0];

  if (country === 'US') {
    // If state filter is set
    if (stateCode && stateCode !== 'ALL') {
      const stateObj = US_STATES_DATA.find(s => s.code === stateCode) || US_STATES_DATA[0];
      const isTaxFree = stateObj.isTaxFree;

      return stateObj.addresses.map((addr, i) => {
        const cleanPhone = addr.phone_number.replace(/^\(\d{3}\)\s*/, '');
        const fName = FIRST_NAMES[i % FIRST_NAMES.length];
        const lName = LAST_NAMES[(i * 3) % LAST_NAMES.length];

        return {
          id: `us_${stateObj.code}_${i}_${Math.random().toString(36).substring(2, 7)}`,
          countryCode: 'US',
          countryNameEn: 'United States',
          countryNameBn: 'যুক্তরাষ্ট্র (USA)',
          flag: '🇺🇸',
          firstName: fName,
          lastName: lName,
          street: addr.street,
          street2: i % 2 === 0 ? 'Apt 4B' : 'Suite 200',
          city: addr.city,
          state: addr.state,
          stateCode: addr.code,
          zipCode: addr.zipcode,
          countryCallingCode: '+1',
          areaCode: addr.phone_number.match(/\((\d{3})\)/)?.[1] || '503',
          phoneNumber: cleanPhone || '555-0199',
          fullPhoneNumber: addr.phone_number,
          taxRatePercent: isTaxFree ? 0 : 7.25,
          isTaxFree: isTaxFree,
          notesEn: isTaxFree ? '0% Sales Tax state. Perfect for Apple ID & iTunes.' : '',
          notesBn: isTaxFree ? '০% ট্যাক্স-ফ্রি স্টেট। অ্যাপল আইডি ভেরিফিকেশনের জন্য সেরা।' : '',
          createdAt: new Date().toISOString()
        };
      });
    }

    // Diverse USA states
    const results: GeneratedAddress[] = [];
    const targetCount = count > 0 ? count : 15;
    const allStates = [...US_STATES_DATA];

    for (let i = 0; i < targetCount; i++) {
      const stateObj = allStates[i % allStates.length];
      const addr = stateObj.addresses[i % stateObj.addresses.length];
      const isTaxFree = stateObj.isTaxFree;
      const cleanPhone = addr.phone_number.replace(/^\(\d{3}\)\s*/, '');
      const fName = FIRST_NAMES[(i * 2) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(i * 4) % LAST_NAMES.length];

      results.push({
        id: `us_${stateObj.code}_${i}_${Math.random().toString(36).substring(2, 7)}`,
        countryCode: 'US',
        countryNameEn: 'United States',
        countryNameBn: 'যুক্তরাষ্ট্র (USA)',
        flag: '🇺🇸',
        firstName: fName,
        lastName: lName,
        street: addr.street,
        street2: i % 2 === 0 ? 'Apt 2B' : 'Suite 101',
        city: addr.city,
        state: addr.state,
        stateCode: addr.code,
        zipCode: addr.zipcode,
        countryCallingCode: '+1',
        areaCode: addr.phone_number.match(/\((\d{3})\)/)?.[1] || '503',
        phoneNumber: cleanPhone || '555-0199',
        fullPhoneNumber: addr.phone_number,
        taxRatePercent: isTaxFree ? 0 : 7.25,
        isTaxFree: isTaxFree,
        notesEn: isTaxFree ? '0% Sales Tax state.' : '',
        notesBn: isTaxFree ? '০% ট্যাক্স-ফ্রি স্টেট।' : '',
        createdAt: new Date().toISOString()
      });
    }
    return results;
  }

  if (country === 'GB') {
    const list = UK_ADDRESSES_DATA;
    const targetCount = count > 0 ? count : list.length;
    return Array.from({ length: targetCount }).map((_, i) => {
      const item = list[i % list.length];
      const names = item.name.split(' ');
      const fName = names[0] || FIRST_NAMES[i % FIRST_NAMES.length];
      const lName = names.slice(1).join(' ') || LAST_NAMES[i % LAST_NAMES.length];

      return {
        id: `gb_${i}_${Math.random().toString(36).substring(2, 7)}`,
        countryCode: 'GB',
        countryNameEn: 'United Kingdom',
        countryNameBn: 'যুক্তরাজ্য (UK)',
        flag: '🇬🇧',
        firstName: fName,
        lastName: lName,
        street: item.street,
        street2: 'Flat 3',
        city: item.city,
        state: item.state,
        stateCode: 'UK',
        zipCode: item.zipcode,
        countryCallingCode: '+44',
        areaCode: '020',
        phoneNumber: item.phone_number.replace(/^0\d{2,4}\s*/, '') || '7946 0912',
        fullPhoneNumber: item.phone_number,
        taxRatePercent: 20,
        isTaxFree: false,
        notesEn: 'Official UK Postcode & region format.',
        notesBn: 'যুক্তরাজ্যের অফিসিয়াল পোস্টকোড ফরম্যাট।',
        createdAt: new Date().toISOString()
      };
    });
  }

  // Other International countries (JP, TR, CA, AU, SG, DE, KR, AE, IN, BD)
  const intlData = INTERNATIONAL_DATA[country];
  if (intlData && intlData.addresses.length > 0) {
    const targetCount = count > 0 ? count : intlData.addresses.length;
    return Array.from({ length: targetCount }).map((_, i) => {
      const item = intlData.addresses[i % intlData.addresses.length];
      const fName = FIRST_NAMES[(i * 3) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(i * 5) % LAST_NAMES.length];

      return {
        id: `${country.toLowerCase()}_${i}_${Math.random().toString(36).substring(2, 7)}`,
        countryCode: country,
        countryNameEn: intlData.countryNameEn,
        countryNameBn: intlData.countryNameBn,
        flag: intlData.flag,
        firstName: fName,
        lastName: lName,
        street: item.street,
        street2: 'Fl. 2',
        city: item.city,
        state: item.state,
        stateCode: item.stateCode,
        zipCode: item.zipcode,
        countryCallingCode: intlData.callingCode,
        areaCode: item.phone_number.split('-')[0] || item.phone_number.split(' ')[0] || '01',
        phoneNumber: item.phone_number,
        fullPhoneNumber: `${intlData.callingCode} ${item.phone_number}`,
        taxRatePercent: meta.hasTaxFreeRegions ? 0 : 10,
        isTaxFree: meta.hasTaxFreeRegions,
        notesEn: `${intlData.countryNameEn} Apple Store validated format.`,
        notesBn: `${intlData.countryNameBn} অ্যাপল স্টোর ভেরিফাইড ফরম্যাট।`,
        createdAt: new Date().toISOString()
      };
    });
  }

  return [];
}

// -----------------------------------------------------------------
// Hybrid Fetcher: Tries API first, immediately falls back to Local
// -----------------------------------------------------------------

export async function getUSStates(): Promise<USStateOption[]> {
  try {
    const res = await fetch('/api/us-states');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.states) && data.states.length > 0) {
        return data.states;
      }
    }
  } catch {
    // Expected on static hosting like Vercel/GitHub Pages
  }

  // Local fallback: Return all US states
  return US_STATES_DATA.map(s => ({
    name: s.name,
    code: s.code,
    count: s.addresses.length,
    isTaxFree: s.isTaxFree
  }));
}

export async function getAddresses(country: SupportedCountryCode, stateCode: string = 'ALL', count: number = 0): Promise<GeneratedAddress[]> {
  try {
    const stateParam = country === 'US' && stateCode !== 'ALL' ? `&state=${stateCode}` : '';
    const countParam = count > 0 ? `&count=${count}` : '';
    const res = await fetch(`/api/live-address?country=${country}${stateParam}${countParam}`);
    
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.addresses) && data.addresses.length > 0) {
        return data.addresses;
      }
    }
  } catch {
    // Expected on static environments like Vercel/GitHub Pages
  }

  // Instant local generation
  return generateAddressesLocally(country, stateCode, count > 0 ? count : 15);
}

export async function getRandomSingleAddress(country: SupportedCountryCode, stateCode: string = 'ALL'): Promise<GeneratedAddress> {
  const addrs = await getAddresses(country, stateCode, 1);
  if (addrs.length > 0) {
    const rand = addrs[Math.floor(Math.random() * addrs.length)];
    return {
      ...rand,
      id: `${rand.id}_${Math.random().toString(36).substring(2, 6)}`
    };
  }
  return generateAddressesLocally(country, stateCode, 1)[0];
}
