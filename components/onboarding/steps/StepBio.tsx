"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

type StepBioProps = {
  data: { title: string; bio: string; timezone: string; website: string };
  onUpdate: (data: Partial<StepBioProps["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepBio({ data, onUpdate, onNext, onBack }: StepBioProps) {
  const [currentField, setCurrentField] = useState<'title' | 'bio' | 'timezone' | 'website'>('title');
  const [title, setTitle] = useState(data.title);
  const [bio, setBio] = useState(data.bio);
  const [timezone, setTimezone] = useState(data.timezone);
  const [website, setWebsite] = useState(data.website);
  const [metadata, setMetadata] = useState<{
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
  } | null>(null);
  const [loadingMetadata, setLoadingMetadata] = useState(false);

  // Fetch Open Graph metadata when website changes
  useEffect(() => {
    if (website && isValidUrl(website)) {
      setLoadingMetadata(true);
      const url = website.startsWith('http') ? website : `https://${website}`;
      
      // Use our own API route to fetch metadata
      fetch(`/api/og-metadata?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setMetadata(null);
          } else {
            setMetadata({
              title: data.title || undefined,
              description: data.description || undefined,
              image: data.image || undefined,
              favicon: data.favicon || undefined,
            });
          }
        })
        .catch(() => {
          setMetadata(null);
        })
        .finally(() => {
          setLoadingMetadata(false);
        });
    } else {
      setMetadata(null);
    }
  }, [website]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (currentField === 'title' && title.length >= 3) {
          setCurrentField('bio');
        } else if (currentField === 'bio' && bio.length >= 20) {
          setCurrentField('timezone');
        } else if (currentField === 'timezone') {
          setCurrentField('website');
        } else if (currentField === 'website') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentField, title, bio, timezone]);

  const handleNext = () => {
    onUpdate({ title, bio, timezone, website });
    onNext();
  };

  const canContinue = title.length >= 3 && bio.length >= 20;

  // Simple URL validation
  const isValidUrl = (url: string) => {
    if (!url) return true; // Optional field
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-12 max-w-3xl">
      {/* Question Number */}
      <div className="flex items-center gap-3 text-slate-400">
        <span className="text-2xl font-bold">2</span>
        <ArrowRight size={20} />
        <span className="text-lg">Tell us about yourself</span>
      </div>

      {/* Title Field */}
      {currentField === 'title' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              What's your professional title?
            </span>
            <Input
              placeholder="e.g., Senior React Architect"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-16 text-2xl font-medium border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent placeholder:text-slate-400 placeholder:font-normal transition-colors duration-200 focus:placeholder:text-slate-500"
              autoFocus
            />
          </label>
          
          {title.length >= 3 && (
            <div className="flex gap-3 animate-in fade-in duration-200">
              <Button
                onClick={() => setCurrentField('bio')}
                className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
              >
                OK <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="text-sm text-slate-400 flex items-center">
                press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs mx-1">Enter ↵</kbd>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bio Field */}
      {currentField === 'bio' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              Tell us about your background
            </span>
            <Textarea
              placeholder="Share your experience, expertise, and what makes you unique..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-32 text-xl font-normal leading-relaxed border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent placeholder:text-slate-400 placeholder:font-normal resize-none transition-colors duration-200 focus:placeholder:text-slate-500"
              autoFocus
            />
            <p className="text-sm text-slate-400 mt-2">{bio.length} / 20 characters minimum</p>
          </label>
          
          {bio.length >= 20 && (
            <div className="flex gap-3 animate-in fade-in duration-200">
              <Button
                onClick={() => setCurrentField('timezone')}
                className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
              >
                OK <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="text-sm text-slate-400 flex items-center">
                press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs mx-1">Enter ↵</kbd>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Timezone Field */}
      {currentField === 'timezone' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-6">
              What's your timezone?
            </span>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full h-16 text-2xl font-medium border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent cursor-pointer transition-colors duration-200"
              autoFocus
            >
              <option value="America/New_York">Eastern Time (US)</option>
              <option value="America/Los_Angeles">Pacific Time (US)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Kathmandu">Kathmandu (NPT)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </label>
          
          <div className="flex gap-3 animate-in fade-in duration-200">
            <Button
              onClick={() => setCurrentField('website')}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
            <p className="text-sm text-slate-400 flex items-center">
              press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs mx-1">Enter ↵</kbd>
            </p>
          </div>
        </div>
      )}

      {/* Website Field (Optional) */}
      {currentField === 'website' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <label className="block">
            <span className="text-5xl font-bold text-slate-900 block mb-2">
              Your website or portfolio
            </span>
            <p className="text-lg text-slate-500 mb-6">Optional - Share your online presence</p>
            <Input
              type="url"
              placeholder="https://yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="h-16 text-2xl font-medium border-0 border-b-[3px] border-slate-300 rounded-none focus:border-slate-900 focus:ring-0 focus-visible:ring-0 outline-none focus-visible:outline-none px-0 bg-transparent placeholder:text-slate-400 placeholder:font-normal transition-colors duration-200 focus:placeholder:text-slate-500"
              autoFocus
            />
            {website && !isValidUrl(website) && (
              <p className="text-sm text-red-500 mt-2">Please enter a valid URL</p>
            )}
          </label>

          {/* Website Preview - Instagram/Discord Style with OG Metadata */}
          {website && isValidUrl(website) && (
            <div className="animate-in fade-in duration-300 space-y-4">
              <p className="text-sm font-semibold text-slate-700 mb-3">Preview:</p>
              
              {/* Rich Link Preview Card */}
              <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
                {/* Loading State */}
                {loadingMetadata && (
                  <div className="h-48 bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-3 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                      <p className="text-sm text-slate-500">Loading preview...</p>
                    </div>
                  </div>
                )}

                {/* Metadata Preview */}
                {!loadingMetadata && metadata && (
                  <>
                    {/* Preview Image */}
                    {metadata.image && (
                      <div className="relative w-full h-64 bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden">
                        <img
                          src={metadata.image}
                          alt={metadata.title || 'Website preview'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Hide image if it fails to load
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.style.display = 'none';
                            }
                          }}
                        />
                      </div>
                    )}

                    {/* Website Info */}
                    <div className="p-5 space-y-3">
                      {/* Domain & Favicon */}
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                          {metadata.favicon ? (
                            <img 
                              src={metadata.favicon} 
                              alt="" 
                              className="w-6 h-6 object-contain" 
                              onError={(e) => {
                                // Replace with globe icon if favicon fails
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  e.currentTarget.style.display = 'none';
                                  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                  svg.setAttribute('class', 'w-6 h-6 text-white');
                                  svg.setAttribute('fill', 'none');
                                  svg.setAttribute('stroke', 'currentColor');
                                  svg.setAttribute('viewBox', '0 0 24 24');
                                  svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />';
                                  parent.appendChild(svg);
                                }
                              }} 
                            />
                          ) : (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                            {metadata.title || website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </h3>
                          <p className="text-sm text-slate-500 truncate">
                            {website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </p>
                          {metadata.description && (
                            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                              {metadata.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <a 
                          href={website.startsWith('http') ? website : `https://${website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit Website
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(website);
                          }}
                          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                          title="Copy URL"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Fallback when no metadata */}
                {!loadingMetadata && !metadata && (
                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 truncate">
                          {website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          {website}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <a 
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Website
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(website);
                        }}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex gap-3 animate-in fade-in duration-200">
            <Button
              onClick={handleNext}
              disabled={!canContinue || (!!website && !isValidUrl(website))}
              className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg disabled:opacity-50"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button
              onClick={() => {
                setWebsite('');
                handleNext();
              }}
              variant="ghost"
              disabled={false}
              className="h-12 px-6"
            >
              Skip
            </Button>
            <p className="text-sm text-slate-400 flex items-center">
              press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs mx-1">Enter ↵</kbd>
            </p>
          </div>
        </div>
      )}

      {/* Navigation Hints */}
      <div className="flex items-center gap-4 text-sm text-slate-400 pt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        {currentField !== 'title' && (
          <button
            onClick={() => {
              if (currentField === 'bio') setCurrentField('title');
              else if (currentField === 'timezone') setCurrentField('bio');
              else if (currentField === 'website') setCurrentField('timezone');
            }}
            className="flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <span>↑ Previous question</span>
          </button>
        )}
      </div>
    </div>
  );
}
