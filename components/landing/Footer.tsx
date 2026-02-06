"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-xl">ExpertLink</span>
            </Link>
            <p className="text-slate-500 mb-6">
              Connect with world-class experts for 1:1 video consultations. Master any skill, anytime.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="#experts" className="text-slate-600 hover:text-blue-600">Browse Experts</Link></li>
              <li><Link href="#how-it-works" className="text-slate-600 hover:text-blue-600">How it Works</Link></li>
              <li><Link href="#pricing" className="text-slate-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">For Teams</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Blog</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Case Studies</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Help Center</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Cookie Policy</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-blue-600">Safety</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ExpertLink Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span>Made with <span className="text-red-500">♥</span> globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
