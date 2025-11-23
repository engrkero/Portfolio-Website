
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { XIcon, PlusIcon, CodeIcon, BriefcaseIcon } from './icons';

// Simple Icons for Admin
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);

const AdminPanel: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Initial Form State
    const emptyProject: Project = {
        id: '',
        title: '',
        category: 'UI/UX Design',
        description: '',
        imageUrl: '',
        tags: [],
        liveUrl: '',
        repoUrl: '',
        longDescription: '',
        detailImages: []
    };
    const [formData, setFormData] = useState<Project>(emptyProject);
    const [tagInput, setTagInput] = useState('');
    const [detailImagesInput, setDetailImagesInput] = useState('');

    useEffect(() => {
        // Load projects
        const stored = localStorage.getItem('kgsc_projects');
        if (stored) {
            setProjects(JSON.parse(stored));
        } else {
            setProjects(PROJECTS);
            localStorage.setItem('kgsc_projects', JSON.stringify(PROJECTS));
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Access Denied: Invalid Credentials');
        }
    };

    const handleSave = () => {
        const updatedProjects = [...projects];
        
        // Process tags and images
        const processedTags = tagInput.split(',').map(t => t.trim()).filter(t => t !== '');
        // Allow user to use current formData tags if they didn't touch the input, else use input
        const finalTags = processedTags.length > 0 ? processedTags : formData.tags;

        const processedImages = detailImagesInput.split(',').map(i => i.trim()).filter(i => i !== '');
        const finalImages = processedImages.length > 0 ? processedImages : (formData.detailImages || []);

        const projectToSave: Project = {
            ...formData,
            id: formData.id || `proj_${Date.now()}`,
            tags: finalTags,
            detailImages: finalImages
        };

        if (editingProject) {
            // Edit mode
            const index = updatedProjects.findIndex(p => p.id === editingProject.id);
            if (index !== -1) {
                updatedProjects[index] = projectToSave;
            }
        } else {
            // Add mode
            updatedProjects.unshift(projectToSave);
        }

        setProjects(updatedProjects);
        localStorage.setItem('kgsc_projects', JSON.stringify(updatedProjects));
        closeForm();
        alert('Project successfully integrated into database.');
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to purge this project node?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            setProjects(updatedProjects);
            localStorage.setItem('kgsc_projects', JSON.stringify(updatedProjects));
        }
    };

    const openEdit = (project: Project) => {
        setEditingProject(project);
        setFormData(project);
        setTagInput(project.tags.join(', '));
        setDetailImagesInput(project.detailImages?.join(', ') || '');
        setIsFormOpen(true);
    };

    const openAdd = () => {
        setEditingProject(null);
        setFormData(emptyProject);
        setTagInput('');
        setDetailImagesInput('');
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingProject(null);
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
                    <h2 className="text-2xl font-bold text-white mb-2">KGSC Admin Node</h2>
                    <p className="text-gray-300 mb-6 text-sm">Secure Entry Point</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Passkey"
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
                        <h1 className="text-xl font-bold tracking-tight">KGSC <span className="text-[#F8B462]">Command Center</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-green-400 font-mono hidden sm:inline-block">● SYSTEM ONLINE</span>
                        <a href="/" className="text-sm text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded hover:border-white transition-all">
                            View Site
                        </a>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#2A324B]">Project Repository</h2>
                    <button 
                        onClick={openAdd}
                        className="flex items-center gap-2 bg-[#F0544F] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#d64642] shadow-lg shadow-red-200 hover:scale-105 transition-all"
                    >
                        <PlusIcon /> New Project
                    </button>
                </div>

                {/* Project List */}
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center transition-all hover:shadow-md">
                            <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="font-bold text-lg text-[#2A324B]">{project.title}</h3>
                                <p className="text-sm text-gray-500">{project.category}</p>
                                <div className="text-xs text-gray-400 mt-1 line-clamp-1">{project.description}</div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => openEdit(project)}
                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <EditIcon />
                                </button>
                                <button 
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Edit/Add Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
                            <h3 className="text-xl font-bold text-[#2A324B]">
                                {editingProject ? 'Edit Node' : 'Initialize New Node'}
                            </h3>
                            <button onClick={closeForm} className="text-gray-400 hover:text-red-500 p-1">
                                <XIcon />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Project Title</label>
                                    <input 
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F] focus:border-transparent" 
                                        value={formData.title} 
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                        value={formData.category} 
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                    >
                                        <option>UI/UX Design</option>
                                        <option>Frontend Development</option>
                                        <option>Graphic Design</option>
                                        <option>Web Development</option>
                                        <option>Branding</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Short Description</label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                    rows={2}
                                    value={formData.description} 
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Long Description (For Modal)</label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                    rows={4}
                                    value={formData.longDescription || ''} 
                                    onChange={e => setFormData({...formData, longDescription: e.target.value})}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Main Image URL</label>
                                <input 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                    placeholder="https://..."
                                    value={formData.imageUrl} 
                                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Live URL</label>
                                    <input 
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                        value={formData.liveUrl || ''} 
                                        onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Repo URL</label>
                                    <input 
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                        value={formData.repoUrl || ''} 
                                        onChange={e => setFormData({...formData, repoUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Tags (comma separated)</label>
                                <input 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                    placeholder="React, Design, Figma"
                                    value={tagInput} 
                                    onChange={e => setTagInput(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Gallery Images URLs (comma separated)</label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#F0544F]" 
                                    rows={2}
                                    placeholder="https://img1.com, https://img2.com"
                                    value={detailImagesInput} 
                                    onChange={e => setDetailImagesInput(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                            <button 
                                onClick={closeForm}
                                className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-[#2A324B] text-white font-bold rounded-lg hover:bg-black transition-colors"
                            >
                                <SaveIcon /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
