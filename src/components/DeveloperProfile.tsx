import React, { useState } from 'react';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  Smartphone, 
  Laptop, 
  Layers
} from 'lucide-react';
import { DeveloperProfileData } from '../types';
import { 
  generateDeveloperProfile, 
  generateMobileConfigFile, 
  downloadMobileConfig,
  generateRandomAlphanumeric,
  generateRandomHex
} from '../utils/developerProfileGenerator';

interface DeveloperProfileProps {
  lang: 'bn' | 'en';
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ lang }) => {
  const [profile, setProfile] = useState<DeveloperProfileData>(() => generateDeveloperProfile());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [showXmlPreview, setShowXmlPreview] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'persona' | 'mobileconfig' | 'devmode' | 'sideload'>('persona');

  const handleRegenerate = () => {
    setProfile(generateDeveloperProfile({
      developerName: profile.developerName,
      companyName: profile.companyName
    }));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyXml = () => {
    const xml = generateMobileConfigFile(profile);
    navigator.clipboard.writeText(xml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleDownloadProfile = () => {
    downloadMobileConfig(profile);
  };

  const handleRegenerateTeamId = () => {
    const newTeamId = generateRandomAlphanumeric(10);
    setProfile(prev => ({
      ...prev,
      teamId: newTeamId,
      appPrefix: newTeamId
    }));
  };

  const handleRegenerateUdid = () => {
    const newUdid = `${generateRandomHex(8).toUpperCase()}-${generateRandomHex(16).toUpperCase()}`;
    setProfile(prev => ({
      ...prev,
      udid: newUdid
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#0066FF]" />
            <span>
              {lang === 'bn' 
                ? 'অ্যাপল ডেভেলপার প্রোফাইল স্যুইট' 
                : 'Apple Developer Profile Suite'}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'আইওএস অ্যাপ টেস্ট, সাইডলোডিং ও .mobileconfig প্রোভিশনিং প্রোফাইলের জন্য ডেভেলপার ক্রেডেনশিয়ালস।'
              : 'Generate Apple Developer Team ID, Bundle ID, and exportable .mobileconfig configuration profiles.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white font-medium text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নতুন জেনারেট' : 'Regenerate'}</span>
          </button>
          <button
            onClick={handleDownloadProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bn' ? '.mobileconfig ডাউনলোড' : 'Download Profile'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
        <button
          onClick={() => setActiveTab('persona')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'persona'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? 'ডেভেলপার তথ্য' : 'Identity'}
        </button>
        <button
          onClick={() => setActiveTab('mobileconfig')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'mobileconfig'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? '.mobileconfig XML' : 'Profile XML'}
        </button>
        <button
          onClick={() => setActiveTab('devmode')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'devmode'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? 'Developer Mode আনলক' : 'Developer Mode'}
        </button>
        <button
          onClick={() => setActiveTab('sideload')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'sideload'
              ? 'bg-white text-slate-900 shadow-2xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? 'সাইডলোডিং গাইড' : 'Sideloading'}
        </button>
      </div>

      {/* Tab 1: Persona */}
      {activeTab === 'persona' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
              {lang === 'bn' ? 'ডেভেলপার অ্যাকাউন্ট সেটিংস' : 'Developer Account Credentials'}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Developer Legal Name</label>
                <input
                  type="text"
                  value={profile.developerName}
                  onChange={(e) => setProfile(prev => ({ ...prev, developerName: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1 font-medium">Company / Studio Entity</label>
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => {
                    const val = e.target.value;
                    const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '');
                    setProfile(prev => ({
                      ...prev,
                      companyName: val,
                      bundleId: `com.${slug || 'developer'}.testapp`
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Apple Team ID (10 Chars)</span>
                  <span className="text-sm font-bold font-mono text-[#0066FF]">
                    {profile.teamId}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleRegenerateTeamId}
                    className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Generate new Team ID"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(profile.teamId, 'teamId')}
                    className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Copy Team ID"
                  >
                    {copiedKey === 'teamId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Bundle Identifier (App ID)</span>
                  <span className="text-xs font-bold font-mono text-slate-800">
                    {profile.bundleId}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(profile.bundleId, 'bundleId')}
                  className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Copy Bundle ID"
                >
                  {copiedKey === 'bundleId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Simulated Device UDID</span>
                  <span className="text-xs font-mono text-slate-800">
                    {profile.udid}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleRegenerateUdid}
                    className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Generate new UDID"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(profile.udid, 'udid')}
                    className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Copy UDID"
                  >
                    {copiedKey === 'udid' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Preview */}
          <div className="space-y-4">
            <div className="bg-[#ebf3ff] p-5 rounded-xl border border-[#cfe2ff] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#cfe2ff]">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#0066FF]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Apple Developer Preview
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600">Active</span>
              </div>

              <div className="space-y-2 text-sm text-slate-800">
                <p><span className="text-slate-600 font-normal">Entity: </span><span className="font-semibold">{profile.companyName}</span></p>
                <p><span className="text-slate-600 font-normal">Agent: </span><span className="font-semibold">{profile.developerName}</span></p>
                <p><span className="text-slate-600 font-normal">Team ID: </span><span className="font-semibold font-mono text-[#0066FF]">{profile.teamId}</span></p>
                <p><span className="text-slate-600 font-normal">Bundle: </span><span className="font-mono text-xs">{profile.bundleId}</span></p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={handleDownloadProfile}
                  className="w-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? '.mobileconfig ডাউনলোড' : 'Download .mobileconfig'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">💡 Tips:</span>
              <p>
                {lang === 'bn'
                  ? 'এই টিম আইডি ও বান্ডেল আইডি ব্যবহার করে Xcode বা AltStore দিয়ে পার্সোনাল আইওএস অ্যাপ সাইন করা যায়।'
                  : 'Use this Team ID and Bundle ID to sign iOS test builds via Xcode or AltStore.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: .mobileconfig */}
      {activeTab === 'mobileconfig' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Apple Configuration Profile (.mobileconfig) Payload
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
              >
                {copiedXml ? '✓ Copied' : 'Copy XML'}
              </button>
              <button
                onClick={handleDownloadProfile}
                className="px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-medium cursor-pointer"
              >
                Download File
              </button>
            </div>
          </div>

          <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto max-h-80">
            {generateMobileConfigFile(profile)}
          </pre>
        </div>
      )}

      {/* Tab 3: Dev Mode */}
      {activeTab === 'devmode' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            {lang === 'bn' ? 'আইফোনে Developer Mode চালু করার ৪টি সহজ ধাপ (iOS 16+)' : 'How to Enable Developer Mode on iPhone (iOS 16+)'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0066FF] block text-sm">01</span>
              <span className="font-semibold text-slate-800 block">Settings</span>
              <p className="text-slate-600">আইফোনের Settings এ গিয়ে Privacy & Security তে স্ক্রল করুন।</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0066FF] block text-sm">02</span>
              <span className="font-semibold text-slate-800 block">Developer Mode</span>
              <p className="text-slate-600">একদম নিচে Developer Mode অপশনে ট্যাপ করুন।</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0066FF] block text-sm">03</span>
              <span className="font-semibold text-slate-800 block">Restart</span>
              <p className="text-slate-600">টগল অন করে আইফোন Restart দিন।</p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#0066FF] block text-sm">04</span>
              <span className="font-semibold text-slate-800 block">Confirm</span>
              <p className="text-slate-600">রিবুট হলে স্ক্রিন আনলক করে "Turn On" কনফার্ম করুন।</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Sideloading */}
      {activeTab === 'sideload' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            {lang === 'bn' ? 'আইওএস অ্যাপ সাইডলোডিং টুলস' : 'iOS Sideloading Frameworks'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-800 text-sm block">AltStore / SideStore</span>
              <p className="text-slate-600 leading-relaxed">
                ফ্রি অ্যাপল আইডি দিয়ে ওয়াইফাইয়ের মাধ্যমে অ্যাপ সেলফ-সাইন করে চালানো যায়। নো জেলব্রেক।
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-800 text-sm block">Sideloadly</span>
              <p className="text-slate-600 leading-relaxed">
                উইন্ডোজ বা ম্যাক কম্পিউটার থেকে ইউএসবি কেবল দিয়ে সরাসরি আইফোনে .ipa গেম ও অ্যাপস ইনস্টল করার সহজ টুল।
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-800 text-sm block">TestFlight</span>
              <p className="text-slate-600 leading-relaxed">
                অ্যাপলের অফিসিয়াল বিটা টেস্টিং সিস্টেম। পাবলিক ইনভাইট লিংক দিয়ে সরাসরি গেমের আর্লি এক্সেস নেওয়া যায়।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
