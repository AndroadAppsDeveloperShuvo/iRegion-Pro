import { COUNTRY_LOCATIONS, COUNTRIES_META, FIRST_NAMES, LAST_NAMES } from '../data/countries';
import { GeneratedAddress, SupportedCountryCode } from '../types';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateAppleAddress(options: {
  countryCode: SupportedCountryCode;
  taxFreeOnly?: boolean;
}): GeneratedAddress {
  const meta = COUNTRIES_META.find(c => c.code === options.countryCode) || COUNTRIES_META[0];
  let locations = COUNTRY_LOCATIONS[options.countryCode] || COUNTRY_LOCATIONS['US'];

  if (options.taxFreeOnly && options.countryCode === 'US') {
    const taxFreeLocations = locations.filter(loc => loc.isTaxFree);
    if (taxFreeLocations.length > 0) {
      locations = taxFreeLocations;
    }
  }

  const loc = pickRandom(locations);
  const firstName = pickRandom(FIRST_NAMES);
  const lastName = pickRandom(LAST_NAMES);

  // Generate building number variation
  const buildingNum = generateRandomNumber(100, 9999);
  // Extract street base or compose with building number
  let street = loc.streetName;
  if (!street.match(/^\d+/)) {
    street = `${buildingNum} ${street}`;
  } else {
    // slight tweak to number for realism
    street = street.replace(/^\d+/, buildingNum.toString());
  }

  // Optional secondary street (Apt / Suite / Floor)
  const hasSecondary = Math.random() > 0.5;
  const secondaryUnits = ['Apt 4B', 'Suite 200', 'Floor 3', 'Unit 12', 'Apt 101', 'Suite 450'];
  const street2 = hasSecondary ? pickRandom(secondaryUnits) : undefined;

  // Generate phone number matching the area code
  let phoneNumber = '';
  let fullPhoneNumber = '';
  const areaCode = loc.areaCode;

  if (options.countryCode === 'US' || options.countryCode === 'CA') {
    const mid3 = generateRandomNumber(200, 999);
    const last4 = generateRandomNumber(1000, 9999);
    phoneNumber = `${mid3}-${last4}`;
    fullPhoneNumber = `(${areaCode}) ${phoneNumber}`;
  } else if (options.countryCode === 'GB') {
    const digits7 = generateRandomNumber(1000000, 9999999);
    phoneNumber = digits7.toString();
    fullPhoneNumber = `+44 ${areaCode} ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
  } else if (options.countryCode === 'JP') {
    const mid4 = generateRandomNumber(1000, 9999);
    const last4 = generateRandomNumber(1000, 9999);
    phoneNumber = `${mid4}-${last4}`;
    fullPhoneNumber = `${areaCode}-${phoneNumber}`;
  } else if (options.countryCode === 'TR') {
    const digits7 = generateRandomNumber(1000000, 9999999);
    phoneNumber = digits7.toString();
    fullPhoneNumber = `+90 ${areaCode} ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  } else {
    const mid = generateRandomNumber(1000, 9999);
    const last = generateRandomNumber(1000, 9999);
    phoneNumber = `${mid} ${last}`;
    fullPhoneNumber = `${meta.callingCode} ${areaCode} ${phoneNumber}`;
  }

  const id = `addr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id,
    countryCode: meta.code,
    countryNameEn: meta.nameEn,
    countryNameBn: meta.nameBn,
    flag: meta.flag,
    firstName,
    lastName,
    street,
    street2,
    city: loc.city,
    state: loc.state,
    stateCode: loc.stateCode,
    zipCode: loc.zipCode,
    countryCallingCode: meta.callingCode,
    areaCode,
    phoneNumber,
    fullPhoneNumber,
    taxRatePercent: loc.taxRatePercent ?? (loc.isTaxFree ? 0 : 8),
    isTaxFree: !!loc.isTaxFree,
    notesEn: loc.noteEn || `Standard verified address for ${meta.nameEn} Apple Store.`,
    notesBn: loc.noteBn || `${meta.nameBn} অ্যাপ স্টোরের জন্য ভেরিফাইড এড্রেস।`,
    createdAt: new Date().toISOString()
  };
}
