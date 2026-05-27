import React, { useState, useEffect } from 'react';
import { 
  getSiteSettings, 
  saveSiteSettings, 
  getGraphicsJobs, 
  addGraphicsJob, 
  deleteGraphicsJob,
  getSkills,
  addSkill,
  deleteSkill
} from '../firebaseDb';
import type { SiteSettings, GraphicsJob, Skill } from '../types';
import { XIcon, PlusIcon, CodeIcon, BriefcaseIcon } from './icons';

// Simple Icons for Admin
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);

const AdminPanel: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'gallery' | 'settings' | 'skills'>('gallery');
    
    // Site settings state
    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        ceoName: 'Keren Godwin Onen',
        ceoBio: '',
        ceoImage: '',
        logo: '',
        favicon: ''
    });

    // Gallery / Graphics jobs state
    const [jobs, setJobs] = useState<GraphicsJob[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<GraphicsJob, 'id'>>({
        title: '',
        category: 'Flyer Design',
        imageUrl: '',
        description: '',
        createdAt: ''
    });

    const [loadingJobs, setLoadingJobs] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(false);
    const [savingSettings, setSavingSettings] = useState(false);
    const [savingJob, setSavingJob] = useState(false);

    // Dynamic Tech Stack Skills state
    const [skillsList, setSkillsList] = useState<Skill[]>([]);
    const [loadingSkills, setLoadingSkills] = useState(false);
    const [savingSkill, setSavingSkill] = useState(false);
    const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
    const [skillFormData, setSkillFormData] = useState<{ name: string; iconName: string; imageUrl: string }>({
        name: '',
        iconName: 'CodeIcon',
        imageUrl: ''
    });

    useEffect(() => {
        // Load settings, graphics jobs, and tech stack skills on authentication
        if (isAuthenticated) {
            fetchSettings();
            fetchJobs();
            fetchSkills();
        }
    }, [isAuthenticated]);

    const fetchSettings = async () => {
        setLoadingSettings(true);
        try {
            const data = await getSiteSettings();
            setSiteSettings(data);
        } catch (err) {
            console.error("Error loading settings", err);
        } finally {
            setLoadingSettings(false);
        }
    };

    const fetchJobs = async () => {
        setLoadingJobs(true);
        try {
            const list = await getGraphicsJobs();
            setJobs(list);
        } catch (err) {
            console.error("Error loading graphics jobs", err);
        } finally {
            setLoadingJobs(false);
        }
    };

    const fetchSkills = async () => {
        setLoadingSkills(true);
        try {
            const list = await getSkills();
            setSkillsList(list);
        } catch (err) {
            console.error("Error loading tech stack skills", err);
        } finally {
            setLoadingSkills(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Plaintext entry key block
        if (password === 'K5e3r7e3n6@') {
            setIsAuthenticated(true);
        } else {
            alert('Access Denied: Invalid Credentials');
        }
    };

    // Helper to read file and convert to base64 string automatically
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'favicon' | 'logo' | 'ceoImage' | 'imageUrl' | 'skillUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Constraint check on larger files (Limit ~1.5mb for Firestore string payloads safely)
        if (file.size > 1500000) {
            alert("File is too large! Please select an optimized web graphics file under 1.5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            if (field === 'imageUrl') {
                setFormData(prev => ({ ...prev, imageUrl: base64String }));
            } else if (field === 'skillUrl') {
                setSkillFormData(prev => ({ ...prev, imageUrl: base64String }));
            } else {
                setSiteSettings(prev => ({ ...prev, [field]: base64String }));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!skillFormData.name) {
            alert("Skill name is mandatory!");
            return;
        }

        setSavingSkill(true);
        try {
            await addSkill(skillFormData);
            alert("Tech Stack skill successfully updated!");
            setSkillFormData({
                name: '',
                iconName: 'CodeIcon',
                imageUrl: ''
            });
            setIsSkillFormOpen(false);
            fetchSkills();
        } catch (err) {
            alert("Error adding skill option: " + JSON.stringify(err));
        } finally {
            setSavingSkill(false);
        }
    };

    const handlePurgeSkill = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to completely purge "${name}" from your dynamic Tech Stack?`)) {
            try {
                if (id) {
                    await deleteSkill(id);
                    alert("Skill removed from Tech Stack database registry!");
                    fetchSkills();
                }
            } catch (err) {
                alert("Error deleting skill node: " + JSON.stringify(err));
            }
        }
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSettings(true);
        try {
            await saveSiteSettings(siteSettings);
            alert("Site Assets database successfully updated!");
            
            // Instantly apply favicon to page context for verification
            if (siteSettings.favicon) {
                const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
                if (link) {
                    link.href = siteSettings.favicon;
                }
            }
        } catch (err) {
            alert("Error saving settings database: " + JSON.stringify(err));
        } finally {
            setSavingSettings(false);
        }
    };

    const handleSaveJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.imageUrl) {
            alert("Title and Image upload are mandatory!");
            return;
        }

        setSavingJob(true);
        try {
            await addGraphicsJob(formData);
            alert("Graphics Design job successfully recorded in Firebase Firestore!");
            setFormData({
                title: '',
                category: 'Flyer Design',
                imageUrl: '',
                description: '',
                createdAt: ''
            });
            setIsFormOpen(false);
            fetchJobs(); // reload lists
        } catch (err) {
            alert("Error adding graphics node to database: " + JSON.stringify(err));
        } finally {
            setSavingJob(false);
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (confirm("Are you sure you want to purge this Graphics Design resource from the active database?")) {
            try {
                await deleteGraphicsJob(id);
                alert("Graphics node deleted.");
                fetchJobs();
            } catch (err) {
                alert("Error deleting job: " + JSON.stringify(err));
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2A324B]">
                <div className="glass-panel p-8 rounded-2xl w-full max-w-md text-center">
                    <div className="mb-6 flex justify-center">
                         <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                            <BriefcaseIcon />
                         </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">KGSC Command Center</h2>
                    <p className="text-gray-300 mb-6 text-sm">Establish Secure Console Entry</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Console Key"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#F0544F] focus:ring-1 focus:ring-[#F0544F]"
                        />
                        <button 
                            type="submit"
                            className="w-full py-3 bg-[#F0544F] text-white font-bold rounded-lg hover:bg-[#d64642] transition-colors shadow-lg shadow-red-900/20"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
            {/* Admin Header */}
            <header className="bg-[#2A324B] text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F0544F] rounded-lg flex items-center justify-center">
                            <CodeIcon />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">KGSC <span className="text-[#F8B462]">Database Portal</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-green-400 font-mono">● FIREBASE LIVE</span>
                        <a href="/" className="text-sm text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded hover:border-white transition-all">
                            View Website
                        </a>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Operations Tabs */}
                <div className="flex border-b border-gray-200 mb-8 gap-4 overflow-x-auto whitespace-nowrap">
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`flex items-center gap-2 pb-4 px-2 font-bold text-sm border-b-2 transition-all ${
                            activeTab === 'gallery'
                                ? 'border-[#F0544F] text-[#F0544F]'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        🎨 Manage Graphics Gallery
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`flex items-center gap-2 pb-4 px-2 font-bold text-sm border-b-2 transition-all ${
                            activeTab === 'skills'
                                ? 'border-[#F0544F] text-[#F0544F]'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        🛠️ Manage Tech Stack
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center gap-2 pb-4 px-2 font-bold text-sm border-b-2 transition-all ${
                            activeTab === 'settings'
                                ? 'border-[#F0544F] text-[#F0544F]'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        ⚙️ Global Assets & CEO config
                    </button>
                </div>

                {/* TAB 1: GRAPHICS GALLERY */}
                {activeTab === 'gallery' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-[#2A324B]">Graphics Design Gallery Jobs</h2>
                                <p className="text-xs text-gray-500">Add, view, and wipe graphic design showcases stored in your cloud database.</p>
                            </div>
                            <button 
                                onClick={() => setIsFormOpen(true)}
                                className="flex items-center gap-2 bg-[#F0544F] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#d64642] shadow-lg shadow-red-200 transition-all"
                            >
                                <PlusIcon /> New Gallery Item
                            </button>
                        </div>

                        {loadingJobs ? (
                            <div className="py-20 text-center text-gray-400 font-mono text-xs">RETRIVING GRAPHICS CATALOG...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobs.map((job) => (
                                    <div key={job.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between">
                                        <div className="relative aspect-video w-full bg-gray-50">
                                            <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover" />
                                            <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase bg-white/90 text-[#2a324b] rounded">
                                                {job.category}
                                            </span>
                                        </div>
                                        <div className="p-5 flex-grow">
                                            <h3 className="font-bold text-lg text-[#2A324B] mb-1 leading-snug">{job.title}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-8">{job.description || 'No description supplied.'}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center rounded-b-2xl">
                                            <span className="text-[10px] text-gray-400 font-mono">
                                                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Active'}
                                            </span>
                                            <button 
                                                onClick={() => handleDeleteJob(job.id)}
                                                className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                                                title="Delete Job"
                                            >
                                                <TrashIcon /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: GLOBAL ASSETS & CEO SETTINGS */}
                {activeTab === 'settings' && (
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm max-w-3xl">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#2A324B]">Static Assets & CEO Node Setup</h2>
                            <p className="text-xs text-gray-500">Upload your Favicon, Studio Logo, CEO Profile Image, and manage biographical tags dynamically.</p>
                        </div>

                        {loadingSettings ? (
                            <div className="py-12 text-center text-gray-400 font-mono text-xs">SYNCING GLOBAL ASSETS CODES...</div>
                        ) : (
                            <form onSubmit={handleSaveSettings} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Favicon Section */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase block">Favicon (Select File)</label>
                                        <input 
                                            type="file" 
                                            accept="image/png, image/x-icon, image/jpeg"
                                            onChange={(e) => handleFileChange(e, 'favicon')}
                                            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0544F]/10 file:text-[#F0544F] hover:file:bg-[#F0544F]/20"
                                        />
                                        {siteSettings.favicon && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <img src={siteSettings.favicon} alt="favicon preview" className="w-8 h-8 object-contain rounded border border-gray-100" />
                                                <span className="text-[10px] text-green-500 font-mono">Favicon Uploaded</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logo Section */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase block">Studio Corporate Logo</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'logo')}
                                            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0544F]/10 file:text-[#F0544F] hover:file:bg-[#F0544F]/20"
                                        />
                                        {siteSettings.logo && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <img src={siteSettings.logo} alt="logo preview" className="h-8 object-contain rounded border border-gray-100" />
                                                <span className="text-[10px] text-green-500 font-mono">Logo Loaded</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                <div className="space-y-4">
                                    <h3 className="font-bold text-[#2A324B] text-base">CEO Profile Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase block">CEO Full Name</label>
                                            <input 
                                                type="text"
                                                value={siteSettings.ceoName}
                                                onChange={(e) => setSiteSettings(prev => ({...prev, ceoName: e.target.value}))}
                                                className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase block">CEO Headshot Image</label>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, 'ceoImage')}
                                                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0544F]/10 file:text-[#F0544F] hover:file:bg-[#F0544F]/20"
                                            />
                                            {siteSettings.ceoImage && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <img src={siteSettings.ceoImage} alt="CEO headshot preview" className="w-10 h-10 object-cover rounded-full border border-gray-100" />
                                                    <span className="text-[10px] text-green-500 font-mono">Headshot Uploaded</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase block">CEO Biographical Summary</label>
                                        <textarea 
                                            rows={4}
                                            value={siteSettings.ceoBio}
                                            onChange={(e) => setSiteSettings(prev => ({...prev, ceoBio: e.target.value}))}
                                            className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={savingSettings}
                                        className="flex items-center gap-2 bg-[#2A324B] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-50"
                                    >
                                        <SaveIcon /> {savingSettings ? "Writing Registry..." : "Save Site Configuration"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {/* TAB 3: MANAGE TECH STACK SKILLS */}
                {activeTab === 'skills' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[#2A324B]">My Tech Stack Skills</h2>
                                <p className="text-xs text-gray-500">Add custom dev/design skills and upload their official company logos manually using image files.</p>
                            </div>
                            <button 
                                onClick={() => setIsSkillFormOpen(true)}
                                className="flex items-center gap-2 bg-[#F0544F] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#d64642] shadow-lg shadow-red-200 transition-all text-sm"
                            >
                                <PlusIcon /> New Tech Stack item / Logo
                            </button>
                        </div>

                        {loadingSkills ? (
                            <div className="py-20 text-center text-gray-400 font-mono text-xs">RETRIEVING TECH STACK...</div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {skillsList.map((skill) => (
                                    <div key={skill.id || skill.name} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-between gap-4 text-center group hover:border-[#F0544F]/30 hover:shadow-md transition-all">
                                        
                                        {/* Skill Logo Icon */}
                                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner group-hover:bg-white transition-all overflow-hidden p-2 border border-gray-100">
                                            {skill.imageUrl ? (
                                                <img src={skill.imageUrl} alt={skill.name} className="w-full h-full object-contain rounded-md" />
                                            ) : (
                                                <div className="text-[#F0544F] text-sm font-mono font-bold uppercase">{skill.name.substring(0, 2)}</div>
                                            )}
                                        </div>

                                        {/* Name & Details */}
                                        <div className="flex-grow flex flex-col justify-center">
                                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{skill.name}</h4>
                                            <p className="text-[10px] text-gray-400 font-mono mt-1">
                                                {skill.imageUrl ? 'Custom Uploaded' : 'Vector Icon'}
                                            </p>
                                        </div>

                                        {/* Purge Button */}
                                        <button 
                                            type="button"
                                            onClick={() => handlePurgeSkill(skill.id || '', skill.name)}
                                            className="w-full py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
                                        >
                                            <TrashIcon /> Purge Item
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Form Drawer / Modal for adding dynamic Skill */}
            {isSkillFormOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-in">
                        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#2A324B]">Add Tech Stack Item / Logo</h3>
                            <button onClick={() => setIsSkillFormOpen(false)} className="text-gray-400 hover:text-black">
                                <XIcon />
                            </button>
                        </div>
                        <form onSubmit={handleSaveSkill} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Skill / Tech Name</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. Photoshop, Flutter, Next.js"
                                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                    value={skillFormData.name}
                                    onChange={e => setSkillFormData(prev => ({...prev, name: e.target.value}))}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Default Vector Icon Theme (Optional)</label>
                                <select 
                                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                    value={skillFormData.iconName}
                                    onChange={e => setSkillFormData(prev => ({...prev, iconName: e.target.value}))}
                                >
                                    <option value="CodeIcon">Developer Code Icon</option>
                                    <option value="UiUxIcon">UI/UX Design Eye</option>
                                    <option value="GraphicDesignIcon">Graphic Design Pen</option>
                                    <option value="ReactIcon">React Atom Wheel</option>
                                    <option value="TypescriptIcon">TypeScript Shield</option>
                                    <option value="TailwindCssIcon">Tailwind CSS Wind</option>
                                    <option value="FigmaIcon">Figma Grid Logo</option>
                                    <option value="AdobeSuiteIcon">Adobe Suite Box</option>
                                    <option value="BrainIcon">Problem Solving Brain</option>
                                    <option value="UsersIcon">Communication Team</option>
                                    <option value="ClockIcon">Time Management Clock</option>
                                    <option value="HeartIcon">Emotional Intelligence Heart</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase block">Upload Tech Logo Image (Base64 file - Limit 1.5MB)</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'skillUrl')}
                                    required
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0544F]/10 file:text-[#F0544F] hover:file:bg-[#F0544F]/20"
                                />
                                {skillFormData.imageUrl ? (
                                    <div className="relative aspect-square w-24 h-24 rounded-2xl overflow-hidden border mt-2 flex items-center justify-center bg-gray-50 p-2 border-dashed border-gray-300">
                                        <img src={skillFormData.imageUrl} alt="upload preview" className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="p-4 border border-dashed text-center text-xs text-gray-400 rounded-2xl">
                                        No logo image uploaded yet.
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setSkillFormData({ name: '', iconName: 'CodeIcon', imageUrl: '' });
                                        setIsSkillFormOpen(false);
                                    }}
                                    className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={savingSkill}
                                    className="px-6 py-2.5 bg-[#2A324B] text-white font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50"
                                >
                                    {savingSkill ? "Saving Skill..." : "Add to Tech Stack"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Form Drawer / Modal for adding gallery item */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-in">
                        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#2A324B]">Add Graphics Work Node</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-black">
                                <XIcon />
                            </button>
                        </div>
                        <form onSubmit={handleSaveJob} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Project Title</label>
                                <input 
                                    type="text"
                                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                    value={formData.title}
                                    onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                <select 
                                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                    value={formData.category}
                                    onChange={e => setFormData(prev => ({...prev, category: e.target.value}))}
                                >
                                    <option>Flyer Design</option>
                                    <option>Logo</option>
                                    <option>Branding</option>
                                    <option>Banner Design</option>
                                    <option>Poster</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Overview / Description</label>
                                <textarea 
                                    rows={3}
                                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F0544F]"
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase block">Select Graphics File (Limit 1.5MB)</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'imageUrl')}
                                    required
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0544F]/10 file:text-[#F0544F] hover:file:bg-[#F0544F]/20"
                                />
                                {formData.imageUrl && (
                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border mt-2">
                                        <img src={formData.imageUrl} alt="upload preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={savingJob}
                                    className="px-6 py-2.5 bg-[#2A324B] text-white font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50"
                                >
                                    {savingJob ? "Uploading..." : "Publish Job"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
