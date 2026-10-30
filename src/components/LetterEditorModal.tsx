import React, { useState } from 'react';
import { RomanticData } from '../data/romanticContent.ts';
import { X, Save, RotateCcw, Share2, Download, Upload, Check, Sparkles } from 'lucide-react';

interface LetterEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RomanticData;
  onSave: (newData: RomanticData) => void;
  onReset: () => void;
  getShareableLink: () => string;
}

export const LetterEditorModal: React.FC<LetterEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
  getShareableLink,
}) => {
  const [formData, setFormData] = useState<RomanticData>(data);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleCopyLink = () => {
    const link = getShareableLink();
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gunjan_dikshit_romantic_notes.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.letter) {
          setFormData(parsed);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f1221] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/50">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-wider text-amber-200/90 font-mono truncate">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">Personalize Notes for {formData.recipientName}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif-dreamy text-white truncate">
              Edit Letters, Messages & Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 text-sm text-slate-300">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Sender Name (You)
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Recipient Name (Him)
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>
          </div>

          {/* Hero Headline & Subtitle */}
          <div>
            <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
              Hero Headline
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
              Hero Subtitle
            </label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm resize-none"
            />
          </div>

          {/* Handwritten Letter Section */}
          <div className="pt-4 border-t border-white/[0.08] space-y-4">
            <h4 className="text-base font-serif-dreamy text-white flex items-center justify-between">
              <span>The Main Handwritten Letter</span>
              <span className="text-xs text-amber-200/60 font-sans">
                Rendered on parchment
              </span>
            </h4>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Salutation
              </label>
              <input
                type="text"
                value={formData.letter.salutation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, salutation: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Letter Paragraph 1
              </label>
              <textarea
                rows={3}
                value={formData.letter.paragraph1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, paragraph1: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Letter Paragraph 2
              </label>
              <textarea
                rows={3}
                value={formData.letter.paragraph2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, paragraph2: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Letter Paragraph 3
              </label>
              <textarea
                rows={3}
                value={formData.letter.paragraph3}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, paragraph3: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-300/90 mb-1.5">
                Secret Folded Note (Tucked Whisper)
              </label>
              <textarea
                rows={3}
                value={formData.letter.secretFoldedNote}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, secretFoldedNote: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-rose-500/20 text-rose-100 focus:outline-none focus:border-rose-400 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                Bold Line from the Reel
              </label>
              <input
                type="text"
                value={formData.letter.tuckedWhisperReelText || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, tuckedWhisperReelText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-amber-300/30 text-amber-100 focus:outline-none focus:border-amber-300 text-sm font-semibold"
              />
            </div>
          </div>

          {/* Birthday Moon Phases Section */}
          <div className="pt-4 border-t border-white/[0.08] space-y-4">
            <h4 className="text-base font-serif-dreamy text-white flex items-center justify-between">
              <span>The Moons (13 Nov 2005 & 27 Aug 2007)</span>
              <span className="text-xs text-amber-200/60 font-sans">
                Celestial resonance
              </span>
            </h4>

            <div>
              <label className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Gunjan's Moon Resonance Message
              </label>
              <textarea
                rows={3}
                value={formData.moonPhases?.resonanceMessage || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    moonPhases: {
                      ...formData.moonPhases,
                      resonanceMessage: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-300/50 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-white/[0.08] bg-slate-900/60 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px]"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px]"
              title="Download backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup</span>
            </button>

            <label className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px]">
              <Upload className="w-3.5 h-3.5" />
              <span>Restore</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            <button
              onClick={onReset}
              className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400/80 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer min-h-[38px]"
              title="Reset to Gunjan's initial words"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-300 to-rose-300 text-slate-950 hover:from-amber-200 hover:to-rose-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer min-h-[40px]"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-900" />
                <span>Saved to World!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
