import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Check, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { COUNTRIES_META } from '../data/countries';
import { GeneratedAddress, SupportedCountryCode, ValidationResult } from '../types';
import { validateAppleAddress } from '../utils/addressValidator';
import { generateAppleAddress } from '../utils/addressGenerator';

interface AddressValidatorProps {
  currentAddress: GeneratedAddress;
  setCurrentAddress: (address: GeneratedAddress) => void;
  lang: 'bn' | 'en';
}

export const AddressValidator: React.FC<AddressValidatorProps> = ({
  currentAddress,
  setCurrentAddress,
  lang
}) => {
  const [selectedCountry, setSelectedCountry] = useState<SupportedCountryCode>(currentAddress.countryCode);
  const [firstName, setFirstName] = useState(currentAddress.firstName);
  const [lastName, setLastName] = useState(currentAddress.lastName);
  const [street, setStreet] = useState(currentAddress.street);
  const [city, setCity] = useState(currentAddress.city);
  const [state, setState] = useState(currentAddress.state);
  const [zipCode, setZipCode] = useState(currentAddress.zipCode);
  const [phoneNumber, setPhoneNumber] = useState(currentAddress.phoneNumber);

  const validation: ValidationResult = validateAppleAddress({
    countryCode: selectedCountry,
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode,
    phoneNumber
  });

  const handleCountryChange = (code: SupportedCountryCode) => {
    setSelectedCountry(code);
    const newSample = generateAppleAddress({ countryCode: code, taxFreeOnly: code === 'US' });
    setFirstName(newSample.firstName);
    setLastName(newSample.lastName);
    setStreet(newSample.street);
    setCity(newSample.city);
    setState(newSample.state);
    setZipCode(newSample.zipCode);
    setPhoneNumber(newSample.phoneNumber);
  };

  const handleLoadCurrentAddress = () => {
    setSelectedCountry(currentAddress.countryCode);
    setFirstName(currentAddress.firstName);
    setLastName(currentAddress.lastName);
    setStreet(currentAddress.street);
    setCity(currentAddress.city);
    setState(currentAddress.state);
    setZipCode(currentAddress.zipCode);
    setPhoneNumber(currentAddress.phoneNumber);
  };

  const handleApplyToMain = () => {
    const updated: GeneratedAddress = {
      ...currentAddress,
      countryCode: selectedCountry,
      firstName,
      lastName,
      street,
      city,
      state,
      zipCode,
      phoneNumber,
      fullPhoneNumber: phoneNumber
    };
    setCurrentAddress(updated);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 70) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="space-y-8">
      {/* Title & Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
            <span>
              {lang === 'bn' 
                ? 'আইফোন এড্রেস ভেরিফিকেশন টেস্ট বেঞ্চ' 
                : 'iPhone Address Verification Test Bench'}
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 mt-1 max-w-3xl">
            {lang === 'bn'
              ? 'আপনার এড্রেসটি অ্যাপল অ্যাপ স্টোরে গ্রহণ করবে কিনা তা ইনস্ট্যান্ট টেস্ট করুন। জিপ কোড, স্টেট এবং ফোন নম্বরের সঠিকতা পরীক্ষা করা হয়।'
              : 'Test if your billing address will be accepted by Apple ID servers. Validates postal code regex, state matching, and formatting.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleLoadCurrentAddress}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs md:text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-blue-400" />
            <span>{lang === 'bn' ? 'জেনারেটেড এড্রেস লোড করুন' : 'Load Active Address'}</span>
          </button>
        </div>
      </div>

      {/* Country Selection for Verification */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
          {lang === 'bn' ? 'ভেরিফিকেশনের জন্য দেশ নির্বাচন করুন:' : 'Target Country Verification Standard:'}
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {COUNTRIES_META.map(country => (
            <button
              key={country.code}
              onClick={() => handleCountryChange(country.code)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCountry === country.code
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white'
              }`}
            >
              <span>{country.flag}</span>
              <span>{lang === 'bn' ? country.nameBn.split(' ')[0] : country.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Editable Fields */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              {lang === 'bn' ? 'এড্রেস ইনপুট ফিল্ডস' : 'Address Input Fields'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. David"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. Miller"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                placeholder="e.g. 1420 SW Broadway"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. Portland"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. Oregon"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Postal / ZIP Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. 97201"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. 503-555-0182"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  const sample = generateAppleAddress({ countryCode: selectedCountry, taxFreeOnly: selectedCountry === 'US' });
                  setFirstName(sample.firstName);
                  setLastName(sample.lastName);
                  setStreet(sample.street);
                  setCity(sample.city);
                  setState(sample.state);
                  setZipCode(sample.zipCode);
                  setPhoneNumber(sample.phoneNumber);
                }}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ভ্যালিড টেমপ্লেট দিয়ে অটো-ফিল করুন' : 'Auto-Fill Valid Template'}</span>
              </button>

              <button
                onClick={handleApplyToMain}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                <span>{lang === 'bn' ? 'জেনারেটরে সেভ করুন' : 'Apply to Generator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Validation Report */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            {/* Score Metric Card */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${getScoreColor(validation.score)}`}>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold block text-slate-400">
                  {lang === 'bn' ? 'অ্যাপল আইডি ভেরিফিকেশন স্কোর' : 'Apple ID Readiness Score'}
                </span>
                <span className="text-3xl font-bold font-mono tabular-nums">
                  {validation.score}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/60 inline-block">
                  {validation.isValid ? (lang === 'bn' ? '✓ গ্রহণীয়' : '✓ Verified') : (lang === 'bn' ? '⚠ এরর সংশোধক' : '⚠ Action Required')}
                </span>
              </div>
            </div>

            {/* Verdict Explanation */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              {lang === 'bn' ? validation.recommendationBn : validation.recommendationEn}
            </p>

            {/* Breakdown Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {lang === 'bn' ? 'চেকলিস্টের ফলাফল:' : 'Verification Checklist:'}
              </span>

              <div className="space-y-2.5">
                {validation.checks.map((check, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                      check.passed
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                        : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                    }`}
                  >
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}

                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">
                        {lang === 'bn' ? check.titleBn : check.titleEn}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {lang === 'bn' ? check.descriptionBn : check.descriptionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apple ID Rule Tips */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'bn' ? 'ভেরিফিকেশনের ৩টি গোপন নিয়ম' : '3 Golden Apple Verification Rules'}</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside">
                <li>
                  {lang === 'bn'
                    ? 'জিপ কোড এবং স্টেট অবশ্যই একই অঞ্চলের হতে হবে (যেমন Oregon = 97201)।'
                    : 'ZIP code must strictly match the selected State (e.g., Oregon = 97201).'}
                </li>
                <li>
                  {lang === 'bn'
                    ? 'Payment Method অপশনে "None" সিলেক্ট করলে কোনো আন্তর্জাতিক কার্ডের প্রয়োজন হয় না।'
                    : 'Selecting "None" bypasses credit card CVV and billing address matching.'}
                </li>
                <li>
                  {lang === 'bn'
                    ? 'ফোন নম্বরে সঠিক এরিয়া কোড বসাতে হবে (যেমন: Portland এর জন্য 503)।'
                    : 'Phone number should start with the official area code for the city.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
