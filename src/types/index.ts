export type SupportedCountryCode = 
  | 'US' 
  | 'GB' 
  | 'JP' 
  | 'TR' 
  | 'CA' 
  | 'AU' 
  | 'DE' 
  | 'SG' 
  | 'KR' 
  | 'AE' 
  | 'IN' 
  | 'BD';

export interface GeneratedAddress {
  id: string;
  countryCode: SupportedCountryCode;
  countryNameEn: string;
  countryNameBn: string;
  flag: string;
  firstName: string;
  lastName: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  countryCallingCode: string;
  areaCode: string;
  phoneNumber: string;
  fullPhoneNumber: string;
  taxRatePercent: number;
  isTaxFree: boolean;
  notesEn: string;
  notesBn: string;
  createdAt: string;
  source?: string;
  sourceUrl?: string;
  sourceName?: string;
  isLive?: boolean;
}

export interface CountryMetadata {
  code: SupportedCountryCode;
  nameEn: string;
  nameBn: string;
  flag: string;
  callingCode: string;
  defaultCurrency: string;
  currencySymbol: string;
  hasTaxFreeRegions: boolean;
  taxFreeRegionsInfo?: string;
  postalCodeFormatDescription: string;
  popularForApps: string[];
}

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0 to 100
  checks: {
    titleEn: string;
    titleBn: string;
    passed: boolean;
    descriptionEn: string;
    descriptionBn: string;
  }[];
  recommendationEn: string;
  recommendationBn: string;
}

export interface DeveloperProfileData {
  developerName: string;
  companyName: string;
  teamId: string;
  bundleId: string;
  entityType: 'individual' | 'company' | 'enterprise';
  accountType: 'Apple Developer Program' | 'Apple Developer Enterprise' | 'TestFlight External Beta';
  udid: string;
  appPrefix: string;
  provisioningProfileType: 'development' | 'distribution' | 'adhoc';
  iosVersionTarget: string;
}

export interface AppStoreItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  badge: string;
  recommendedRegion: SupportedCountryCode;
  recommendedCountryName: string;
  descriptionEn: string;
  descriptionBn: string;
  appStoreSearchTerm: string;
}
