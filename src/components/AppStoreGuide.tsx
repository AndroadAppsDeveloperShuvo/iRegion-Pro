import React, { useState } from 'react';
import { 
  CheckCircle, 
  HelpCircle, 
  Smartphone, 
  Download, 
  CreditCard, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AppStoreGuideProps {
  lang: 'bn' | 'en';
  onNavigateToGenerator: () => void;
  onNavigateToApps: () => void;
}

export const AppStoreGuide: React.FC<AppStoreGuideProps> = ({
  lang,
  onNavigateToGenerator,
  onNavigateToApps
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const steps = [
    {
      num: 1,
      titleEn: 'Prepare Your Apple Account',
      titleBn: 'অ্যাপল একাউন্ট প্রস্তুত করা',
      descEn: 'Check Apple ID balance. Your account balance MUST be $0.00. Cancel active auto-renewing subscriptions, or create a brand new foreign Apple ID.',
      descBn: 'অ্যাপল আইডির ব্যালেন্স শূন্য ($০.০০) হতে হবে। কোনো রানিং সাবস্ক্রিপশন থাকলে তা বন্ধ করুন, অথবা একটি নতুন ইউএস অ্যাপল আইডি তৈরি করে নিন।',
      tipEn: 'Pro tip: Creating a dedicated second Apple ID just for US/JP store is the safest method!',
      tipBn: 'টিপস: ইউএস/জাপান স্টোরের জন্য একটি আলাদা নতুন অ্যাপল আইডি তৈরি করা সবচেয়ে সহজ ও নিরাপদ!'
    },
    {
      num: 2,
      titleEn: 'Navigate to Country/Region in iOS',
      titleBn: 'আইফোনের সেটিংসে Country/Region এ প্রবেশ করুন',
      descEn: 'Open iPhone Settings > Tap your Name at top > Media & Purchases > View Account > Country/Region > Change Country or Region.',
      descBn: 'আইফোনের Settings ওপেন করুন > উপরে আপনার নামের উপর ট্যাপ করুন > Media & Purchases > View Account > Country/Region এ গিয়ে "Change Country or Region" এ ট্যাপ করুন।',
      tipEn: 'You can also do this directly inside the App Store app by tapping your profile icon.',
      tipBn: 'অ্যাপ স্টোর অ্যাপ ওপেন করে উপরের প্রোফাইল আইকনে ট্যাপ করেও এই সেটিংসে যাওয়া যায়।'
    },
    {
      num: 3,
      titleEn: 'Choose Target Country & Agree to Terms',
      titleBn: 'কাঙ্ক্ষিত দেশ সিলেক্ট করুন ও টার্মস অ্যাগ্রি করুন',
      descEn: 'Select "United States" (or Japan/Turkey/UK) from the country list. Tap "Agree" on the top right to accept Apple Media Services Terms.',
      descBn: 'লিস্ট থেকে "United States" (অথবা Japan/Turkey) সিলেক্ট করুন। উপরে ডানে "Agree" বাটনে চাপ দিয়ে শর্তাবলি গ্রহণ করুন।',
      tipEn: 'United States has the largest app collection and fastest app releases.',
      tipBn: 'ইউনাইটেড স্টেটস (USA) স্টোরে সবচেয়ে বেশি অ্যাপ ও গেমসের এক্সেস পাওয়া যায়।'
    },
    {
      num: 4,
      titleEn: 'CRUCIAL: Select Payment Method as "None"',
      titleBn: 'সবচেয়ে জরুরি: পেমেন্ট অপশনে "None" নির্বাচন করুন',
      descEn: 'Under Payment Method, tap "None". This completely skips credit card or PayPal requirements, allowing you to download 100% free apps.',
      descBn: 'Payment Method সেকশনে "None" অপশনটি সিলেক্ট করুন। এতে কোনো আন্তর্জাতিক ক্রেডিট কার্ড বা পেপালের প্রয়োজন হবে না এবং সকল ফ্রি অ্যাপ ডাউনলোড করতে পারবেন।',
      tipEn: 'Do not enter any fake credit card numbers! Only select "None".',
      tipBn: 'কোনো ফেক ক্রেডিট কার্ড নম্বর দিবেন না! শুধুমাত্র "None" সিলেক্ট করুন।'
    },
    {
      num: 5,
      titleEn: 'Paste the Generated Billing Address',
      titleBn: 'আমাদের জেনারেট করা বিলিং এড্রেসটি পেস্ট করুন',
      descEn: 'Fill in Street, City, State (e.g. Oregon), Zip (e.g. 97201), Area Code, and Phone using our 1-click address generator.',
      descBn: 'আমাদের জেনারেটর থেকে ১-ক্লিকে কপি করে Street, City, State (যেমন Oregon), Zip Code (যেমন 97201) এবং Phone Number বসিয়ে দিন।',
      tipEn: 'Oregon, Alaska, and Delaware have 0% digital sales tax.',
      tipBn: 'অরেগন, আলাস্কা ও ডেলাওয়্যার রাজ্যে ডিজিটাল অ্যাপসের উপর ০% ট্যাক্স থাকে।'
    },
    {
      num: 6,
      titleEn: 'Save & Download Region-Locked Apps!',
      titleBn: 'সেভ করুন এবং আনঅ্যাভেইলেবল অ্যাপ ডাউনলোড করুন!',
      descEn: 'Tap "Next" or "Done" on the top right. Force-close the App Store app and reopen it. Your App Store is now switched! Search and download your games.',
      descBn: 'উপরে ডানে "Next" অথবা "Done" চাপুন। অ্যাপ স্টোরটি একবার সোয়াইপ করে কেটে আবার ওপেন করুন। এবার ফ্রি ফায়ার ম্যাক্স বা টিকটক সার্চ করে ইন্সটল করুন!',
      tipEn: 'Your downloaded apps will continue to update normally.',
      tipBn: 'ডাউনলোড করা অ্যাপগুলো পরবর্তীতে সাধারণ নিয়মে আপডেট হতে থাকবে।'
    }
  ];

  const faqs = [
    {
      qEn: 'Why is the "None" payment option not showing up on my iPhone?',
      qBn: 'আমার আইফোনে "None" পেমেন্ট অপশনটি কেন দেখাচ্ছে না?',
      aEn: 'The "None" option disappears if: 1) You have an active Apple Balance (even $0.05), 2) You have an active subscription (iCloud+, Apple Music) that auto-renews, 3) You are part of Family Sharing, or 4) You have an unpaid debt on the account. FIX: Register a new free Apple ID directly on appleid.apple.com with the country set to United States, and sign in on App Store!',
      aBn: '৩টি কারণে "None" অপশনটি নাও আসতে পারে: ১) আপনার একাউন্টে ব্যালেন্স থাকলে, ২) কোনো অটো-রিনিউ সাবস্ক্রিপশন এক্টিভ থাকলে (যেমন iCloud), ৩) ফ্যামিলি শেয়ারিং অন থাকলে। সমাধান: সবচেয়ে সেরা উপায় হলো appleid.apple.com এ গিয়ে একদম নতুন একটি ফ্রি অ্যাপল আইডি খুলে সেখানে ইউএস কান্ট্রি ও আমাদের জেনারেট করা এড্রেসটি দেওয়া।'
    },
    {
      qEn: 'Will changing my App Store country delete my installed apps or photos?',
      qBn: 'দেশ পরিবর্তন করলে কি আমার ফোনের আগের অ্যাপস বা ছবি ডিলিট হয়ে যাবে?',
      aEn: 'No! Changing App Store region does not affect your photos, contacts, WhatsApp chats, or existing installed apps. All your data stays completely safe on your iPhone.',
      aBn: 'না! দেশ পরিবর্তন করলে আপনার ফোনের ছবি, কন্টাক্ট, হোয়াটসঅ্যাপ চ্যাট বা আগের ইনস্টল করা অ্যাপসের কোনো ক্ষতি হবে না। সবকিছু অক্ষত থাকবে।'
    },
    {
      qEn: 'Can I switch back to my home country later?',
      qBn: 'আমি কি পরবর্তীতে আবার আগের দেশে ফিরে আসতে পারব?',
      aEn: 'Yes! You can switch back anytime using the same steps by choosing your home country and saving.',
      aBn: 'হ্যাঁ! যেকোনো সময় একই নিয়মে সেটিংস থেকে আপনার নিজের দেশ সিলেক্ট করে ফিরে আসতে পারবেন।'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-[#0066FF]" />
            <span>
              {lang === 'bn' 
                ? 'আইফোনে রিজিওন পরিবর্তন ও অ্যাপ ডাউনলোডের গাইড' 
                : 'iPhone Region Switch & App Download Guide'}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'কোনো ক্রেডিট কার্ড ছাড়াই পেমেন্টে "None" সিলেক্ট করে অ্যাপ স্টোর রিজিওন চেঞ্জ করার নিয়ম।'
              : 'Complete walkthrough to switch App Store country and download geo-restricted apps without payment cards.'}
          </p>
        </div>

        <button
          onClick={onNavigateToGenerator}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white font-medium text-xs transition-colors shrink-0 shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'এড্রেস দেখুন' : 'Go to Address'}</span>
        </button>
      </div>

      {/* Step Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {steps.map((st) => (
          <button
            key={st.num}
            onClick={() => setActiveStep(st.num)}
            className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
              activeStep === st.num
                ? 'bg-[#ebf3ff] border-[#0d6efd] text-[#0d6efd] font-bold shadow-2xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="text-xs block font-bold">Step {st.num}</span>
          </button>
        ))}
      </div>

      {/* Active Step Card */}
      <div className="p-5 md:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
        {(() => {
          const current = steps.find(s => s.num === activeStep) || steps[0];
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0066FF]">
                  STEP {current.num} OF 6
                </span>
                <h2 className="text-base md:text-lg font-bold text-slate-900">
                  {lang === 'bn' ? current.titleBn : current.titleEn}
                </h2>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                {lang === 'bn' ? current.descBn : current.descEn}
              </p>

              <div className="p-3.5 rounded-lg bg-[#ebf3ff] border border-[#cfe2ff] text-xs text-slate-800 space-y-0.5">
                <span className="font-semibold text-[#0066FF] block">💡 Pro Tip:</span>
                <p>{lang === 'bn' ? current.tipBn : current.tipEn}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                {activeStep > 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                  >
                    Previous
                  </button>
                ) : <div />}

                {activeStep < 6 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToGenerator}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    <span>Start with Address</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#0066FF]" />
          <span>{lang === 'bn' ? 'বহুল জিজ্ঞাসিত প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}</span>
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-xs md:text-sm font-semibold text-slate-800">
                    {lang === 'bn' ? faq.qBn : faq.qEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#0066FF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {lang === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
