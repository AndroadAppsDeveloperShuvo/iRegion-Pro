import React, { useState } from 'react';
import { 
  Smartphone, 
  MoreVertical, 
  X, 
  ExternalLink,
  CheckCircle2,
  User,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const photoUrl = "https://i.ibb.co/hxSvj93k/1361-A89-D-C62-E-40-EB-B206-C0-EE3964-E92-B.jpg";
  const bioUrl = "https://androadappsdevelopershuvo.github.io/biodata.com/";

  // Pre-formatted message requested by user
  const waMessage = "𝐻𝐼々ᗪᴇᴠʟᴏᴘᴇʀ—͟͞Sʜᴜᴠᴏ...𝐼 𝐜𝐚𝐦𝐞 𝐟𝐫𝐨𝐦 𝐘𝐨𝐮𝐫 𝘄𝗲𝗯𝘀𝗶𝘁𝗲...𝐼 𝓝ℯ𝓮𝓭࿐ꫝ  ꫝ𝙥𝗉𝗹𝗲  𝑰𝐷✓";
  const encodedWaMsg = encodeURIComponent(waMessage);

  const waLink1 = `https://wa.me/8801778526313?text=${encodedWaMsg}`;
  const waLink2 = `https://wa.me/8801921526301?text=${encodedWaMsg}`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 shadow-2xs">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {/* Left Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                iRegion Pro
              </span>
              <span className="text-[11px] text-slate-500 block leading-tight">
                অ্যাপল আইডি এড্রেস জেনারেটর
              </span>
            </div>
          </div>

          {/* Right: Three Dots / Developer Profile Button */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-700"
            title="ডেভেলপার প্রোফাইল"
            aria-label="Developer Profile"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-500/40 shrink-0 bg-blue-50 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={photoUrl}
                  alt="Developer Shuvo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <User className="w-3.5 h-3.5 text-blue-600" />
              )}
            </div>
            <MoreVertical className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </header>

      {/* Developer Profile Modal */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={() => setIsProfileOpen(false)}
        >
          <div 
            className="relative w-full max-w-[340px] sm:max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 text-center space-y-2.5 max-h-[96vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Avatar */}
            <div className="relative mx-auto w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#0066FF] to-blue-400 shadow-sm">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={photoUrl}
                    alt="Developer Shuvo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <User className="w-7 h-7 text-slate-400" />
                )}
              </div>
            </div>

            {/* Name with Blue Verified Tick */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Developer Shuvo
                </h3>
                {/* Official Blue Tick */}
                <div className="relative flex items-center justify-center text-[#0066FF]" title="Verified Developer">
                  <CheckCircle2 className="w-4.5 h-4.5 fill-[#0066FF] text-white" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                App &amp; Web Developer
              </p>
            </div>

            {/* Apple ID Solution / Professional Paid Service WhatsApp Section */}
            <div className="rounded-xl bg-gradient-to-b from-[#F0FDF4] to-[#ECFDF5] border border-emerald-300/80 p-3 text-left space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>প্রিমিয়াম Apple ID সার্ভিস</span>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs tracking-wide">
                  পেইড সার্ভিস
                </span>
              </div>

              <p className="text-[11px] text-slate-700 leading-snug font-sans">
                আপনার <strong>নিজস্ব ফোন নম্বর</strong> ও <strong>ব্যক্তিগত জিমেইল</strong> দিয়ে ১০০% সিকিউর অফিসিয়াল ভেরিফাইড অ্যাপল আইডি (USA / Global) তৈরি করে নিতে চান?
              </p>

              {/* Service Features & Payment highlights */}
              <div className="grid grid-cols-2 gap-1 bg-white/85 rounded-lg p-2 border border-emerald-200/90 text-[10px] text-slate-700">
                <div className="flex items-center gap-1 font-medium text-emerald-950">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>নিজস্ব নম্বর ও জিমেইল</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-emerald-950">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>ইনস্ট্যান্ট ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-emerald-950">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>ফুল সেটআপ সাপোর্ট</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-emerald-950">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>বিকাশ/নগদ/রকেট</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-medium text-center">
                অর্ডার করতে সরাসরি WhatsApp এ মেসেজ দিন:
              </div>

              {/* WhatsApp Buttons side by side for zero-scroll compact mobile fit */}
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                {/* WhatsApp Number 1 */}
                <a
                  href={waLink1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-[11px] transition-colors shadow-2xs cursor-pointer active:scale-[0.98]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>01778526313</span>
                </a>

                {/* WhatsApp Number 2 */}
                <a
                  href={waLink2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-[11px] transition-colors shadow-2xs cursor-pointer active:scale-[0.98]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>01921526301</span>
                </a>
              </div>
            </div>

            {/* Main Website (BioData) Link */}
            <div className="pt-0.5">
              <a
                href={bioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <span>মেন ওয়েবসাইটে যান (BioData)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
