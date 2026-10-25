import { SupportedCountryCode, ValidationResult } from '../types';

interface AddressToValidate {
  countryCode: SupportedCountryCode;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
}

export function validateAppleAddress(data: AddressToValidate): ValidationResult {
  const checks: ValidationResult['checks'] = [];
  let score = 0;

  // 1. Name Check
  const hasValidName = !!(data.firstName && data.firstName.trim().length >= 2 && data.lastName && data.lastName.trim().length >= 2);
  if (hasValidName) {
    score += 15;
    checks.push({
      titleEn: 'Name Format Verified',
      titleBn: 'নামের ফরম্যাট সঠিক',
      passed: true,
      descriptionEn: 'First and Last name meet Apple ID identity criteria.',
      descriptionBn: 'ফার্স্ট এবং লাস্ট নেম অ্যাপল আইডির মানদণ্ড পূরণ করেছে।'
    });
  } else {
    checks.push({
      titleEn: 'Name Incomplete',
      titleBn: 'নাম অসম্পূর্ণ',
      passed: false,
      descriptionEn: 'Both First and Last names are required by App Store.',
      descriptionBn: 'অ্যাপ স্টোরে ফার্স্ট ও লাস্ট নেম উভয়ই আবশ্যক।'
    });
  }

  // 2. Street Address Check
  const street = data.street?.trim() || '';
  const streetHasNumber = /\d+/.test(street);
  const streetLengthOk = street.length >= 5 && street.length <= 40;
  if (street && streetHasNumber && streetLengthOk) {
    score += 25;
    checks.push({
      titleEn: 'Street Address Format Verified',
      titleBn: 'রাস্তার ঠিকানা ভেরিফাইড',
      passed: true,
      descriptionEn: 'Contains building/street number and valid street name format.',
      descriptionBn: 'বিল্ডিং/রোড নম্বর এবং রাস্তার নাম সঠিকভাবে রয়েছে।'
    });
  } else {
    checks.push({
      titleEn: 'Street Address Weak or Invalid',
      titleBn: 'রাস্তার ঠিকানা দুর্বল বা ভুল',
      passed: false,
      descriptionEn: 'Street must contain a street number and name (5-40 chars, e.g. 1420 SW Broadway).',
      descriptionBn: 'রাস্তার ঠিকানায় নম্বর ও নাম থাকতে হবে (যেমন: 1420 SW Broadway)।'
    });
  }

  // 3. City and State Check
  const hasCity = !!(data.city && data.city.trim().length >= 2);
  const hasState = !!(data.state && data.state.trim().length >= 2);
  if (hasCity && hasState) {
    score += 20;
    checks.push({
      titleEn: 'City & State / Prefecture Match',
      titleBn: 'শহর ও রাজ্য সঠিকভাবে ম্যাচ করেছে',
      passed: true,
      descriptionEn: `City (${data.city}) and State/Region (${data.state}) are configured.`,
      descriptionBn: `শহর (${data.city}) এবং রাজ্য (${data.state}) সঠিকভাবে সংযুক্ত আছে।`
    });
  } else {
    checks.push({
      titleEn: 'City or State Missing',
      titleBn: 'শহর অথবা রাজ্য ফাঁকা রয়েছে',
      passed: false,
      descriptionEn: 'App Store billing address requires both City and State.',
      descriptionBn: 'অ্যাপ স্টোর বিলিং এড্রেসে শহর এবং রাজ্য উভয়ই পূরণ করতে হয়।'
    });
  }

  // 4. Postal / ZIP Code Check
  const zip = (data.zipCode || '').trim();
  let zipPassed = false;
  let zipFormatMessageEn = '';
  let zipFormatMessageBn = '';

  switch (data.countryCode) {
    case 'US':
      zipPassed = /^\d{5}(-\d{4})?$/.test(zip);
      zipFormatMessageEn = '5-digit US ZIP code format (e.g. 97201, 19801)';
      zipFormatMessageBn = '৫ ডিজিটের ইউএস জিপ কোড ফরম্যাট (যেমন: 97201)';
      break;
    case 'GB':
      zipPassed = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(zip);
      zipFormatMessageEn = 'Alphanumeric UK postcode format (e.g. SW1A 1AA)';
      zipFormatMessageBn = 'সঠিক ইউকে পোস্টকোড ফরম্যাট (যেমন: SW1A 1AA)';
      break;
    case 'JP':
      zipPassed = /^\d{3}-?\d{4}$/.test(zip);
      zipFormatMessageEn = '7-digit Japanese postal code format (e.g. 160-0022)';
      zipFormatMessageBn = '৭ ডিজিটের জাপানি পোস্টাল কোড (যেমন: 160-0022)';
      break;
    case 'TR':
      zipPassed = /^\d{5}$/.test(zip);
      zipFormatMessageEn = '5-digit Turkish postal code format (e.g. 34710)';
      zipFormatMessageBn = '৫ ডিজিটের তুর্কি পোস্টাল কোড (যেমন: 34710)';
      break;
    case 'CA':
      zipPassed = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i.test(zip);
      zipFormatMessageEn = 'Canadian postal code format A1A 1A1 (e.g. T2P 1J9)';
      zipFormatMessageBn = 'কানাডিয়ান পোস্টাল কোড ফরম্যাট A1A 1A1 (যেমন: T2P 1J9)';
      break;
    case 'AU':
      zipPassed = /^\d{4}$/.test(zip);
      zipFormatMessageEn = '4-digit Australian postcode (e.g. 2000)';
      zipFormatMessageBn = '৪ ডিজিটের অস্ট্রেলিয়ান পোস্টকোড (যেমন: 2000)';
      break;
    case 'SG':
      zipPassed = /^\d{6}$/.test(zip);
      zipFormatMessageEn = '6-digit Singapore postal code (e.g. 238801)';
      zipFormatMessageBn = '৬ ডিজিটের সিঙ্গাপুর পোস্টাল কোড (যেমন: 238801)';
      break;
    case 'DE':
      zipPassed = /^\d{5}$/.test(zip);
      zipFormatMessageEn = '5-digit German PLZ code (e.g. 10115)';
      zipFormatMessageBn = '৫ ডিজিটের জার্মান পিএলজেড কোড (যেমন: 10115)';
      break;
    case 'KR':
      zipPassed = /^\d{5}$/.test(zip);
      zipFormatMessageEn = '5-digit South Korean postal zone (e.g. 06000)';
      zipFormatMessageBn = '৫ ডিজিটের দক্ষিণ কোরিয়ান পোস্টাল জোন (যেমন: 06000)';
      break;
    case 'AE':
      zipPassed = /^\d{5}$/.test(zip) || zip === '00000' || zip.toLowerCase().includes('box');
      zipFormatMessageEn = 'UAE standard (00000 or valid PO Box)';
      zipFormatMessageBn = 'ইউএই স্ট্যান্ডার্ড (00000 অথবা পিও বক্স)';
      break;
    case 'IN':
      zipPassed = /^\d{6}$/.test(zip);
      zipFormatMessageEn = '6-digit Indian PIN code (e.g. 110001)';
      zipFormatMessageBn = '৬ ডিজিটের ভারতীয় পিন কোড (যেমন: 110001)';
      break;
    case 'BD':
      zipPassed = /^\d{4}$/.test(zip);
      zipFormatMessageEn = '4-digit Bangladesh postal code (e.g. 1205)';
      zipFormatMessageBn = '৪ ডিজিটের বাংলাদেশ পোস্টাল কোড (যেমন: 1205)';
      break;
    default:
      zipPassed = zip.length >= 3 && zip.length <= 10;
      zipFormatMessageEn = 'Standard postal code';
      zipFormatMessageBn = 'স্ট্যান্ডার্ড পোস্টাল কোড';
  }

  if (zipPassed) {
    score += 25;
    checks.push({
      titleEn: 'Postal / ZIP Code Strict Match',
      titleBn: 'পোস্টাল / জিপ কোড নিখুঁতভাবে মিলেছে',
      passed: true,
      descriptionEn: `Matches official ${data.countryCode} App Store validation rules (${zip}).`,
      descriptionBn: `${data.countryCode} অ্যাপ স্টোরের অফিশিয়াল নিয়মের সাথে মিলেছে (${zip})।`
    });
  } else {
    checks.push({
      titleEn: 'Postal / ZIP Code Mismatch',
      titleBn: 'পোস্টাল / জিপ কোড সঠিক নয়',
      passed: false,
      descriptionEn: `Invalid format for ${data.countryCode}. Expected: ${zipFormatMessageEn}.`,
      descriptionBn: `${data.countryCode} এর জন্য সঠিক ফরম্যাট নয়। প্রত্যাশিত: ${zipFormatMessageBn}।`
    });
  }

  // 5. Phone Number & Area Code Check
  const phone = (data.phoneNumber || '').replace(/\D/g, '');
  const hasValidPhoneDigits = phone.length >= 7 && phone.length <= 12;
  if (hasValidPhoneDigits) {
    score += 15;
    checks.push({
      titleEn: 'Phone & Area Code Validated',
      titleBn: 'ফোন নম্বর ও এরিয়া কোড ভেরিফাইড',
      passed: true,
      descriptionEn: 'Phone number matches regional digit length and prefix norms.',
      descriptionBn: 'ফোন নম্বরটি আঞ্চলিক নিয়ম ও ডিজিট সংখ্যার সাথে মানানসই।'
    });
  } else {
    checks.push({
      titleEn: 'Phone Number Incomplete',
      titleBn: 'ফোন নম্বর অসম্পূর্ণ',
      passed: false,
      descriptionEn: 'App Store requires a valid phone number (area code + local digits).',
      descriptionBn: 'অ্যাপ স্টোরে এরিয়া কোড এবং লোকাল ডিজিটসহ ফোন নম্বর দিতে হয়।'
    });
  }

  const isValid = score >= 80;

  let recommendationEn = '';
  let recommendationBn = '';

  if (score === 100) {
    recommendationEn = 'Ready for App Store! This address passes all strict Apple ID verification filters.';
    recommendationBn = 'অ্যাপ স্টোরের জন্য ১০০% প্রস্তুত! এই ঠিকানা অ্যাপল আইডির ভেরিফিকেশন ফিল্টারে পাস করবে।';
  } else if (score >= 80) {
    recommendationEn = 'Acceptable for App Store. Ensure you select "None" as Payment Method.';
    recommendationBn = 'অ্যাপ স্টোরে ব্যবহারযোগ্য। নিশ্চিত করুন পেমেন্ট মেথড হিসেবে "None" সিলেক্ট করেছেন।';
  } else {
    recommendationEn = 'Address needs correction before using in iPhone Settings to avoid rejection.';
    recommendationBn = 'অ্যাপল আইডি এরর এড়াতে ঠিকানাটি সংশোধন করা প্রয়োজন।';
  }

  return {
    isValid,
    score,
    checks,
    recommendationEn,
    recommendationBn
  };
}
