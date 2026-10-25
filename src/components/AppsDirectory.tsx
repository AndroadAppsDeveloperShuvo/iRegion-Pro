import React, { useState } from 'react';
import { 
  Flame, 
  Video, 
  Sparkles, 
  Gamepad2, 
  Shield, 
  Crosshair, 
  Trophy, 
  Target, 
  ArrowRight, 
  Search,
  Check
} from 'lucide-react';
import { APPS_DIRECTORY } from '../data/countries';
import { AppStoreItem, SupportedCountryCode } from '../types';

interface AppsDirectoryProps {
  lang: 'bn' | 'en';
  onSelectAppRegion: (countryCode: SupportedCountryCode) => void;
}

export const AppsDirectory: React.FC<AppsDirectoryProps> = ({
  lang,
  onSelectAppRegion
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedAppId, setCopiedAppId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4 text-amber-500" />;
      case 'Video': return <Video className="w-4 h-4 text-pink-500" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#0066FF]" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4 text-purple-500" />;
      case 'Shield': return <Shield className="w-4 h-4 text-emerald-500" />;
      case 'Crosshair': return <Crosshair className="w-4 h-4 text-rose-500" />;
      case 'Trophy': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'Target': return <Target className="w-4 h-4 text-cyan-500" />;
      default: return <Gamepad2 className="w-4 h-4 text-[#0066FF]" />;
    }
  };

  const filteredApps = APPS_DIRECTORY.filter(app => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'games' && (app.category.includes('Action') || app.category.includes('Strategy') || app.category.includes('Sports') || app.category.includes('Battle'))) ||
      (selectedCategory === 'apps' && (app.category.includes('Social') || app.category.includes('AI') || app.category.includes('Productivity')));

    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.descriptionBn.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCopySearch = (app: AppStoreItem) => {
    navigator.clipboard.writeText(app.appStoreSearchTerm);
    setCopiedAppId(app.id);
    setTimeout(() => setCopiedAppId(null), 1800);
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            {lang === 'bn' 
              ? 'জনপ্রিয় জিও-রেস্ট্রিক্টেড অ্যাপস ও গেমস' 
              : 'Popular Geo-Restricted iOS Apps & Games'}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'আইফোনের অ্যাপ স্টোরে যেসব অ্যাপ পাওয়া যায় না সেগুলোর জন্য কান্ট্রি সিলেক্ট করুন।'
              : 'Find which region to switch to download games like Free Fire MAX, TikTok, etc.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'অ্যাপ বা গেম খুঁজুন...' : 'Search apps & games...'}
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0066FF]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-white text-slate-900 font-semibold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? 'সকল' : 'All'}
        </button>
        <button
          onClick={() => setSelectedCategory('games')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            selectedCategory === 'games'
              ? 'bg-white text-slate-900 font-semibold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? 'গেমস' : 'Games'}
        </button>
        <button
          onClick={() => setSelectedCategory('apps')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            selectedCategory === 'apps'
              ? 'bg-white text-slate-900 font-semibold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'bn' ? 'অ্যাপস' : 'Apps'}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredApps.map((app) => {
          const isCopied = copiedAppId === app.id;
          return (
            <div
              key={app.id}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(app.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{app.name}</h3>
                    <span className="text-[11px] text-slate-500 block">{app.category}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {lang === 'bn' ? app.descriptionBn : app.descriptionEn}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#0066FF]">
                  {app.recommendedRegion === 'US' ? '🇺🇸 USA' : (app.recommendedRegion === 'JP' ? '🇯🇵 Japan' : '🇬🇧 UK')}
                </span>

                <button
                  onClick={() => onSelectAppRegion(app.recommendedRegion)}
                  className="px-2.5 py-1 rounded bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{lang === 'bn' ? 'এড্রেস লোড' : 'Get Address'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
