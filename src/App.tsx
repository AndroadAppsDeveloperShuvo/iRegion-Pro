import React from 'react';
import { Navbar } from './components/Navbar';
import { AddressGenerator } from './components/AddressGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
      {/* Clean Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-3 sm:px-4 py-5 md:py-6">
        <AddressGenerator />
      </main>

      {/* Clean Light Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-400 mt-8">
        <p>© {new Date().getFullYear()} iRegion Pro · Apple ID Billing Address Generator</p>
      </footer>
    </div>
  );
}
