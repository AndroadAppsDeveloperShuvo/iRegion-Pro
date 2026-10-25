import React, { useState, useEffect } from 'react';
import { 
  Check, 
  RotateCw, 
  ChevronDown
} from 'lucide-react';
import { COUNTRIES_META } from '../data/countries';
import { GeneratedAddress, SupportedCountryCode } from '../types';
import { 
  getUSStates, 
  getAddresses, 
  getRandomSingleAddress, 
  generateAddressesLocally, 
  USStateOption 
} from '../services/addressService';

export const AddressGenerator: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<SupportedCountryCode>('US');
  // Initialize with instant local addresses so screen is NEVER empty or stuck at 0
  const [addresses, setAddresses] = useState<GeneratedAddress[]>(() => generateAddressesLocally('US'));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [reshufflingId, setReshufflingId] = useState<string | null>(null);
  const [isRefreshingAll, setIsRefreshingAll] = useState<boolean>(false);
  const [selectedUSState, setSelectedUSState] = useState<string>('ALL');
  const [availableUSStates, setAvailableUSStates] = useState<USStateOption[]>([]);
  const [showOtherCountries, setShowOtherCountries] = useState<boolean>(false);

  // Load US states (works on Vercel, offline, or backend)
  useEffect(() => {
    getUSStates()
      .then(states => {
        if (Array.isArray(states) && states.length > 0) {
          setAvailableUSStates(states);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch address list (at least 10-35 addresses)
  const fetchAddressList = async (country: SupportedCountryCode, stateCode: string = 'ALL') => {
    setIsRefreshingAll(true);
    try {
      const list = await getAddresses(country, stateCode);
      if (Array.isArray(list) && list.length > 0) {
        setAddresses(list);
      } else {
        // Guarantee fallback
        setAddresses(generateAddressesLocally(country, stateCode));
      }
    } catch (err) {
      console.warn('Fallback to local addresses:', err);
      setAddresses(generateAddressesLocally(country, stateCode));
    } finally {
      setIsRefreshingAll(false);
    }
  };

  useEffect(() => {
    fetchAddressList(selectedCountry, selectedUSState);
  }, [selectedCountry, selectedUSState]);

  // Reshuffle single card
  const handleReshuffleSingle = async (cardIndex: number) => {
    const target = addresses[cardIndex];
    if (!target) return;

    setReshufflingId(target.id);
    try {
      const newAddr = await getRandomSingleAddress(selectedCountry, selectedUSState);
      if (newAddr) {
        setAddresses(prev => {
          const next = [...prev];
          next[cardIndex] = newAddr;
          return next;
        });
      }
    } catch (err) {
      console.warn('Reshuffle error:', err);
    } finally {
      setReshufflingId(null);
    }
  };

  const handleCopyFullAddress = (addr: GeneratedAddress) => {
    const countryLabel = addr.countryCode === 'US' ? 'USA' : (addr.countryCode === 'GB' ? 'United Kingdom' : addr.countryNameEn);
    const fullText = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${countryLabel}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(addr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyField = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const selectedCountryObj = COUNTRIES_META.find(c => c.code === selectedCountry) || COUNTRIES_META[0];

  return (
    <div className="space-y-4">
      {/* Top Country Selector Controls */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        {/* Primary Country Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setSelectedCountry('US');
              setSelectedUSState('ALL');
            }}
            className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              selectedCountry === 'US'
                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🇺🇸</span>
            <span>USA (যুক্তরাষ্ট্র)</span>
          </button>

          <button
            onClick={() => {
              setSelectedCountry('GB');
              setSelectedUSState('ALL');
            }}
            className={`py-2.5 px-4 rounded-lg font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              selectedCountry === 'GB'
                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🇬🇧</span>
            <span>United Kingdom (ইউকে)</span>
          </button>
        </div>

        {/* State Dropdown for USA */}
        {selectedCountry === 'US' && availableUSStates.length > 0 && (
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              স্টেট নির্বাচন:
            </span>
            <select
              value={selectedUSState}
              onChange={(e) => setSelectedUSState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-[#0066FF]"
            >
              <option value="ALL">Random State (যেকোনো স্টেট)</option>
              <optgroup label="Tax-Free States (০% ডিজিটাল সেলস ট্যাক্স)">
                <option value="AK">Alaska (AK) - 0% Tax</option>
                <option value="OR">Oregon (OR) - 0% Tax</option>
                <option value="DE">Delaware (DE) - 0% Tax</option>
                <option value="MT">Montana (MT) - 0% Tax</option>
                <option value="NH">New Hampshire (NH) - 0% Tax</option>
              </optgroup>
              <optgroup label="সকল অন্যান্য স্টেট">
                {availableUSStates
                  .filter(s => !['AK', 'OR', 'DE', 'MT', 'NH'].includes(s.code))
                  .map(s => (
                    <option key={s.code} value={s.code}>
                      {s.name} ({s.code}) - {s.count} addresses
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
        )}

        {/* Toggle for other countries */}
        <div className="pt-1 text-center">
          <button
            onClick={() => setShowOtherCountries(!showOtherCountries)}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>
              {showOtherCountries 
                ? 'অন্যান্য দেশ লুকান' 
                : 'অন্যান্য দেশ দেখুন (Japan, Turkey, Canada, Australia...)'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showOtherCountries ? 'rotate-180' : ''}`} />
          </button>

          {showOtherCountries && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-2.5 border-t border-slate-100 mt-2 text-left">
              {COUNTRIES_META.filter(c => c.code !== 'US' && c.code !== 'GB').map(c => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelectedCountry(c.code);
                    setShowOtherCountries(false);
                  }}
                  className={`px-2.5 py-1.5 text-xs rounded-md border cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedCountry === c.code
                      ? 'bg-[#0066FF] text-white border-[#0066FF] font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm">{c.flag}</span>
                  <span className="truncate">{c.nameBn.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Counter Header */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
        <span>
          {selectedCountryObj.nameBn} - মোট {addresses.length} টি ভেরিফাইড এড্রেস
        </span>
        <button
          onClick={() => fetchAddressList(selectedCountry, selectedUSState)}
          disabled={isRefreshingAll}
          className="text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCw className={`w-3 h-3 ${isRefreshingAll ? 'animate-spin' : ''}`} />
          <span>সবগুলো রিশাফেল করুন</span>
        </button>
      </div>

      {/* Address Cards List - Matching the exact visual style in the user's screenshot */}
      <div className="space-y-4">
        {addresses.map((addr, idx) => {
          const isCopied = copiedId === addr.id;
          const isReshuffling = reshufflingId === addr.id;
          const countryDisplay = addr.countryCode === 'US' ? 'USA' : (addr.countryCode === 'GB' ? 'United Kingdom' : addr.countryNameEn);
          const fullAddressString = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${countryDisplay}`;

          return (
            <div
              key={addr.id || idx}
              className="rounded-xl border border-[#cfe2ff] p-4 sm:p-5 transition-shadow hover:shadow-xs"
              style={{ backgroundColor: '#ebf3ff' }}
            >
              {/* Phone number & Copy button header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-base text-slate-800 leading-snug">
                  <span className="text-slate-700 font-normal">Phone number: </span>
                  <span
                    onClick={() => handleCopyField(addr.phoneNumber || addr.fullPhoneNumber, `phone_${addr.id}`)}
                    className="font-semibold underline cursor-pointer hover:text-[#0066FF] transition-colors"
                    title="Click to copy phone number"
                  >
                    {addr.fullPhoneNumber || addr.phoneNumber}
                  </span>
                  {copiedField === `phone_${addr.id}` && (
                    <span className="ml-2 text-xs font-semibold text-emerald-600">
                      ✓ Copied
                    </span>
                  )}
                </p>

                <button
                  onClick={() => handleCopyFullAddress(addr)}
                  className="px-3 py-1 rounded bg-white text-[#0d6efd] border border-[#0d6efd] text-xs font-medium hover:bg-blue-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  title="Copy complete address"
                >
                  {isCopied ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </span>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>

              {/* Street */}
              <p className="text-base text-slate-800 mb-2 leading-snug">
                <span className="text-slate-700 font-normal">Street: </span>
                <span 
                  onClick={() => handleCopyField(addr.street, `street_${addr.id}`)}
                  className="font-semibold cursor-pointer hover:underline"
                  title="Click to copy street"
                >
                  {addr.street}
                </span>
                {copiedField === `street_${addr.id}` && (
                  <span className="ml-2 text-xs font-semibold text-emerald-600">✓ Copied</span>
                )}
              </p>

              {/* City */}
              <p className="text-base text-slate-800 mb-2 leading-snug">
                <span className="text-slate-700 font-normal">City: </span>
                <span 
                  onClick={() => handleCopyField(addr.city, `city_${addr.id}`)}
                  className="font-semibold cursor-pointer hover:underline"
                  title="Click to copy city"
                >
                  {addr.city}
                </span>
                {copiedField === `city_${addr.id}` && (
                  <span className="ml-2 text-xs font-semibold text-emerald-600">✓ Copied</span>
                )}
              </p>

              {/* State */}
              <p className="text-base text-slate-800 mb-2 leading-snug">
                <span className="text-slate-700 font-normal">State: </span>
                <span 
                  onClick={() => handleCopyField(addr.state, `state_${addr.id}`)}
                  className="font-semibold cursor-pointer hover:underline"
                  title="Click to copy state"
                >
                  {addr.stateCode ? `${addr.state} (${addr.stateCode})` : addr.state}
                </span>
                {copiedField === `state_${addr.id}` && (
                  <span className="ml-2 text-xs font-semibold text-emerald-600">✓ Copied</span>
                )}
              </p>

              {/* Zipcode */}
              <p className="text-base text-slate-800 mb-2 leading-snug">
                <span className="text-slate-700 font-normal">Zipcode: </span>
                <span 
                  onClick={() => handleCopyField(addr.zipCode, `zip_${addr.id}`)}
                  className="font-semibold cursor-pointer hover:underline font-mono"
                  title="Click to copy zipcode"
                >
                  {addr.zipCode}
                </span>
                {copiedField === `zip_${addr.id}` && (
                  <span className="ml-2 text-xs font-semibold text-emerald-600">✓ Copied</span>
                )}
              </p>

              {/* Country */}
              <p className="text-base text-slate-800 mb-2 leading-snug">
                <span className="text-slate-700 font-normal">Country: </span>
                <span className="font-semibold">{countryDisplay}</span>
              </p>

              {/* Full Address */}
              <p className="text-base text-slate-800 mb-3.5 leading-snug break-words">
                <span className="text-slate-700 font-normal">Address: </span>
                <span 
                  onClick={() => handleCopyFullAddress(addr)}
                  className="font-semibold cursor-pointer hover:underline"
                  title="Click to copy full address"
                >
                  {fullAddressString}
                </span>
              </p>

              {/* Reshuffle Button */}
              <button
                onClick={() => handleReshuffleSingle(idx)}
                disabled={isReshuffling}
                className="w-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white py-2.5 rounded-lg font-medium text-base text-center transition-colors shadow-2xs active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                {isReshuffling && <RotateCw className="w-4 h-4 animate-spin" />}
                <span>{isReshuffling ? 'Loading...' : 'Reshuffle'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {addresses.length > 0 && (
        <div className="text-center pt-2 pb-4">
          <button
            onClick={() => fetchAddressList(selectedCountry, selectedUSState)}
            disabled={isRefreshingAll}
            className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-2"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshingAll ? 'animate-spin' : ''}`} />
            <span>সবগুলো এড্রেস রিশাফেল করুন (Reshuffle All)</span>
          </button>
        </div>
      )}
    </div>
  );
};
