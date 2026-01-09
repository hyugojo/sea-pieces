
import React, { useState } from 'react';
import { Project, SocialLink, UserProfile } from './types';
import { INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_SOCIALS, ICONS } from './constants';
import { generateProjectDetails, improveBio } from './services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [socials] = useState<SocialLink[]>(INITIAL_SOCIALS);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizingBio, setIsOptimizingBio] = useState(false);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    setIsGenerating(true);
    const aiDetails = await generateProjectDetails(newTitle);
    
    const newProject: Project = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      description: aiDetails?.description || "A mysterious artifact found at sea.",
      category: aiDetails?.category || "Uncharted",
      icon: aiDetails?.icon || "⚓"
    };

    setProjects(prev => [newProject, ...prev]);
    setNewTitle('');
    setNewUrl('');
    setIsAdding(false);
    setIsGenerating(false);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleOptimizeBio = async () => {
    setIsOptimizingBio(true);
    const betterBio = await improveBio(profile.bio);
    if (betterBio) {
      setProfile(prev => ({ ...prev, bio: betterBio.trim() }));
    }
    setIsOptimizingBio(false);
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-0">
      <header className="max-w-2xl mx-auto pt-16 text-center">
        <div className="relative inline-block group">
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-24 h-24 rounded-full mx-auto border-4 border-amber-900 shadow-2xl transition-transform hover:rotate-6 duration-300"
          />
          <div className="absolute -bottom-1 -right-1 bg-amber-600 rounded-full p-2 border-2 border-black">
            <ICONS.Anchor />
          </div>
        </div>
        
        <h1 className="mt-6 text-5xl font-bold pirate-title tracking-widest text-amber-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {profile.name}
        </h1>
        
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-amber-100/70 text-sm max-w-sm mx-auto leading-relaxed italic">
            "{profile.bio}"
          </p>
          <button 
            onClick={handleOptimizeBio}
            disabled={isOptimizingBio}
            className="text-[10px] bg-amber-900/40 hover:bg-amber-800 text-amber-400 py-1.5 px-4 rounded-full border border-amber-500/20 flex items-center gap-1.5 transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {isOptimizingBio ? 'Consulting the Tides...' : <><ICONS.Magic /> Sharpen the Tongue</>}
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {socials.map(social => (
            <a 
              key={social.id} 
              href={social.url} 
              target="_blank" 
              className="w-10 h-10 glass-dark rounded-full flex items-center justify-center text-xl hover:scale-110 hover:text-amber-400 transition-all border border-amber-900"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </header>

      <main className="max-w-xl mx-auto mt-12 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl pirate-title text-amber-600 gold-glow">The Captain's Treasure</h2>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="text-xs bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 transition-all shadow-xl uppercase tracking-tighter"
          >
            <ICONS.Plus /> {isAdding ? 'Retreat' : 'Stash New Booty'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddProject} className="glass-dark rounded-2xl p-6 mb-8 border-amber-500/30 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-4">
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Name of your discovery..."
                className="w-full bg-black/40 border border-amber-900/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all text-amber-100"
                required
              />
              <input 
                type="url" 
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Where does the map lead? (URL)"
                className="w-full bg-black/40 border border-amber-900/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all text-amber-100"
                required
              />
              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-widest"
              >
                {isGenerating ? 'Navigating the Fog...' : 'Log Discovery'}
              </button>
            </div>
          </form>
        )}

        {projects.map(project => (
          <div 
            key={project.id}
            className="group relative parchment rounded-xl p-4 flex items-center gap-4 hover:-rotate-1 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              {project.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg truncate uppercase tracking-tighter">{project.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/10 border border-black/10 font-bold uppercase">
                  {project.category}
                </span>
              </div>
              <p className="text-xs text-black/60 truncate mt-1 italic leading-tight">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleRemoveProject(project.id)}
                className="p-2 hover:bg-red-500/20 text-red-900 rounded-lg transition-colors"
                title="Throw Overboard"
              >
                <ICONS.Trash />
              </button>
            </div>
            
            <a 
              href={project.url} 
              target="_blank" 
              className="absolute inset-0 z-0 sm:hidden"
            />
            <div className="hidden sm:block">
               <a 
                href={project.url} 
                target="_blank" 
                className="p-2 bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 rounded-lg transition-colors"
              >
                <ICONS.Compass />
              </a>
            </div>
          </div>
        ))}
      </main>

      <footer className="mt-20 text-center pb-12 opacity-40">
        <p className="text-[10px] uppercase tracking-[0.4em] text-amber-100">
          Anchored by <span className="font-black">SEA PIECE ENGINE</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
