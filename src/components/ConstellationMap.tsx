import React, { useState } from 'react';
import { ConstellationNode } from '../data/romanticContent.ts';
import { romanticAudio } from '../utils/audioEngine.ts';
import { Sparkles, ChevronRight, ChevronLeft, Star } from 'lucide-react';

interface ConstellationMapProps {
  nodes: ConstellationNode[];
  recipientName: string;
}

export const ConstellationMap: React.FC<ConstellationMapProps> = ({ nodes, recipientName }) => {
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0]?.id || '');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set([nodes[0]?.id || '']));

  const activeIndex = nodes.findIndex(n => n.id === activeNodeId);
  const activeNode = nodes[activeIndex] || nodes[0];

  const handleSelectStar = (node: ConstellationNode, index: number) => {
    setActiveNodeId(node.id);
    setRevealedIds(prev => new Set([...prev, node.id]));
    romanticAudio.playStarChime(index);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % nodes.length;
    handleSelectStar(nodes[nextIdx], nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + nodes.length) % nodes.length;
    handleSelectStar(nodes[prevIdx], prevIdx);
  };

  return (
    <section id="constellation" className="relative py-24 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-3">
            <span>Interactive Celestial Map</span>
            <span aria-hidden="true">·</span>
            <span>Gunjan's Thoughts</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-4">
            The Constellation of You
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
            Every star in this cluster holds a little thing I've discovered about you, {recipientName}. Click each glowing node to connect the map.
          </p>
        </div>

        {/* Interactive Sky Canvas Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Constellation Viewer Canvas */}
          <div className="lg:col-span-7 relative min-h-[360px] md:min-h-[460px] rounded-3xl bg-slate-950/60 border border-white/[0.1] backdrop-blur-md overflow-hidden p-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {/* Background nebula shimmer */}
            <div className="absolute inset-0 bg-radial from-violet-900/20 via-transparent to-transparent pointer-events-none" />

            {/* SVG Connecting Lines between stars */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map((node, i) => {
                if (i === nodes.length - 1) return null;
                const next = nodes[i + 1];
                const isLineActive = revealedIds.has(node.id) && revealedIds.has(next.id);
                return (
                  <line
                    key={`line-${node.id}-${next.id}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke={isLineActive ? 'rgba(251, 191, 36, 0.65)' : 'rgba(255, 255, 255, 0.12)'}
                    strokeWidth={isLineActive ? '2' : '1'}
                    strokeDasharray={isLineActive ? 'none' : '4 4'}
                    className="transition-all duration-700"
                  />
                );
              })}
            </svg>

            {/* Constellation Star Nodes */}
            <div className="absolute inset-0">
              {nodes.map((node, index) => {
                const isActive = node.id === activeNodeId;
                const isRevealed = revealedIds.has(node.id);

                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelectStar(node, index)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2 group cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    title={node.title}
                  >
                    {/* Pulsing halo for active node */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
                    )}

                    {/* Star body */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-amber-300 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.9)] scale-110'
                          : isRevealed
                          ? 'bg-amber-100/80 text-slate-900 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                          : 'bg-white/20 text-white/70 hover:bg-white/40'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isActive ? 'fill-slate-950' : isRevealed ? 'fill-slate-900' : ''}`} />
                    </div>

                    {/* Node floating title tooltip on hover */}
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide text-amber-200/90 bg-slate-900/90 px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {node.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Sky Guide */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-white/[0.06]">
              <span>Discovered {revealedIds.size} of {nodes.length} stars</span>
              <span className="text-amber-200/80">Click any star to illuminate</span>
            </div>
          </div>

          {/* Starlight Card Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-slate-900/40 border border-white/[0.08] backdrop-blur-md">
            <div>
              {/* Star Index metadata */}
              <div className="flex items-center justify-between text-xs text-amber-200/80 font-medium mb-4">
                <span>Star 0{activeIndex + 1} of 0{nodes.length}</span>
                <span>{activeNode.subtitle}</span>
              </div>

              {/* Star Title */}
              <h3 className="text-2xl sm:text-3xl font-serif-dreamy font-normal text-white mb-4">
                {activeNode.title}
              </h3>

              {/* Gunjan's personal thought */}
              <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
                <p className="text-slate-200 font-light text-base md:text-lg leading-relaxed italic font-serif-dreamy">
                  "{activeNode.thought}"
                </p>
                <div className="mt-4 text-xs text-amber-200/70 font-medium">
                  — Gunjan's reflection on {recipientName}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Star</span>
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-950 bg-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Star</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
