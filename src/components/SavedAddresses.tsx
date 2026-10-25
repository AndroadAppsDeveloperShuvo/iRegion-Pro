import React, { useState } from 'react';
import { Bookmark, Copy, Trash2, Check, Download, ExternalLink } from 'lucide-react';
import { GeneratedAddress } from '../types';

interface SavedAddressesProps {
  savedList: GeneratedAddress[];
  onSelectAddress: (addr: GeneratedAddress) => void;
  onDeleteAddress: (id: string) => void;
  onClearAll: () => void;
  lang: 'bn' | 'en';
}

export const SavedAddresses: React.FC<SavedAddressesProps> = ({
  savedList,
  onSelectAddress,
  onDeleteAddress,
  onClearAll,
  lang
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySingle = (addr: GeneratedAddress) => {
    const text = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, Phone: ${addr.fullPhoneNumber}`;
    navigator.clipboard.writeText(text);
    setCopiedId(addr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'iregion_apple_addresses.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (savedList.length === 0) {
    return null;
  }

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">
            {lang === 'bn' ? `সেভ করা এড্রেস তালিকা (${savedList.length})` : `Saved Addresses (${savedList.length})`}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'JSON এক্সপোর্ট' : 'Export JSON'}</span>
          </button>
          <button
            onClick={onClearAll}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {savedList.map((addr) => {
          const isCopied = copiedId === addr.id;
          return (
            <div
              key={addr.id}
              className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-all flex flex-col justify-between space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold text-white flex items-center gap-1">
                    <span>{addr.flag}</span>
                    <span>{addr.countryNameEn}</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{addr.zipCode}</span>
                </div>
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {addr.street}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {addr.city}, {addr.state}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between">
                <button
                  onClick={() => onSelectAddress(addr)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  {lang === 'bn' ? 'ভিউ করুন' : 'View in Studio'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopySingle(addr)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    title="Copy address"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onDeleteAddress(addr.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
