import React, { useState } from 'react';
import { FileText, Upload, Download, CheckCircle, AlertCircle, Star, Target, Plus, Edit, X, Save } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function ResumeOptimizer() {
  const { resumeData, updateResumeData, addXP } = useApp();
  const [activeSection, setActiveSection] = useState('personal');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ];

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    updateResumeData('experience', [...resumeData.experience, newExp]);
    setEditingItem(newExp.id);
  };

  const handleUpdateExperience = (id: string, field: string, value: any) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateResumeData('experience', updated);
  };

  const handleDeleteExperience = (id: string) => {
    const updated = resumeData.experience.filter(exp => exp.id !== id);
    updateResumeData('experience', updated);
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      relevant: []
    };
    updateResumeData('education', [...resumeData.education, newEdu]);
    setEditingItem(newEdu.id);
  };

  const handleUpdateEducation = (id: string, field: string, value: any) => {
    const updated = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateResumeData('education', updated);
  };

  const handleDeleteEducation = (id: string) => {
    const updated = resumeData.education.filter(edu => edu.id !== id);
    updateResumeData('education', updated);
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      github: '',
      live: '',
      highlights: ['']
    };
    updateResumeData('projects', [...resumeData.projects, newProject]);
    setEditingItem(newProject.id);
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    const updated = resumeData.projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateResumeData('projects', updated);
  };

  const handleDeleteProject = (id: string) => {
    const updated = resumeData.projects.filter(proj => proj.id !== id);
    updateResumeData('projects', updated);
  };

  const handleExportPDF = () => {
    // Mock PDF export
    addXP(20);
    alert('Resume exported as PDF! (This is a demo - in production, this would generate a real PDF)');
  };

  const calculateCompleteness = () => {
    let score = 0;
    const weights = {
      personal: 20,
      summary: 15,
      experience: 25,
      education: 15,
      projects: 15,
      skills: 10
    };

    // Personal info
    const personalFields = Object.values(resumeData.personalInfo).filter(v => v && v.trim());
    score += (personalFields.length / 6) * weights.personal;

    // Summary
    if (resumeData.summary && resumeData.summary.trim()) {
      score += weights.summary;
    }

    // Experience
    if (resumeData.experience.length > 0) {
      score += weights.experience;
    }

    // Education
    if (resumeData.education.length > 0) {
      score += weights.education;
    }

    // Projects
    if (resumeData.projects.length > 0) {
      score += weights.projects;
    }

    // Skills
    const skillsCount = Object.values(resumeData.skills).flat().length;
    if (skillsCount > 0) {
      score += weights.skills;
    }

    return Math.round(score);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            value={resumeData.personalInfo.name}
            onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn</label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, linkedin: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub</label>
          <input
            type="url"
            value={resumeData.personalInfo.github}
            onChange={(e) => updateResumeData('personalInfo', { ...resumeData.personalInfo, github: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Summary</label>
      <textarea
        value={resumeData.summary}
        onChange={(e) => updateResumeData('summary', e.target.value)}
        placeholder="Write a compelling 2-3 sentence summary highlighting your key strengths and career objectives..."
        className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Work Experience</h3>
        <button
          onClick={handleAddExperience}
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          {editingItem === exp.id ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleUpdateExperience(exp.id, 'title', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="date"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                  />
                </div>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleUpdateExperience(exp.id, 'current', e.target.checked)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Current position</span>
              </label>
              <textarea
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description.join('\n')}
                onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value.split('\n'))}
                className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{exp.title || 'Job Title'}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company || 'Company'} • {exp.location || 'Location'}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}
                  </p>
                </div>
                <button
                  onClick={() => setEditingItem(exp.id)}
                  className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc || 'Add description...'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technical Skills</label>
          <textarea
            value={resumeData.skills.technical.join(', ')}
            onChange={(e) => updateResumeData('skills', { 
              ...resumeData.skills, 
              technical: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            })}
            placeholder="JavaScript, Python, React, Node.js..."
            className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Languages</label>
          <textarea
            value={resumeData.skills.languages.join(', ')}
            onChange={(e) => updateResumeData('skills', { 
              ...resumeData.skills, 
              languages: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            })}
            placeholder="English (Native), Spanish (Fluent)..."
            className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frameworks</label>
          <textarea
            value={resumeData.skills.frameworks.join(', ')}
            onChange={(e) => updateResumeData('skills', { 
              ...resumeData.skills, 
              frameworks: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            })}
            placeholder="React, Angular, Vue.js, Express..."
            className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tools</label>
          <textarea
            value={resumeData.skills.tools.join(', ')}
            onChange={(e) => updateResumeData('skills', { 
              ...resumeData.skills, 
              tools: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
            })}
            placeholder="Git, Docker, AWS, Jenkins..."
            className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personal': return renderPersonalInfo();
      case 'summary': return renderSummary();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'projects': return renderProjects();
      case 'skills': return renderSkills();
      case 'achievements': return renderAchievements();
      default: return renderPersonalInfo();
    }
  };

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Education</h3>
        <button
          onClick={handleAddEducation}
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {resumeData.education.map((edu) => (
        <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          {editingItem === edu.id ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={edu.location}
                  onChange={(e) => handleUpdateEducation(edu.id, 'location', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  value={edu.graduationDate}
                  onChange={(e) => handleUpdateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{edu.degree || 'Degree'}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{edu.school || 'School'} • {edu.location || 'Location'}</p>
                  <p className="text-sm text-gray-500">{edu.graduationDate || 'Graduation Date'}</p>
                </div>
                <button
                  onClick={() => setEditingItem(edu.id)}
                  className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Projects</h3>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {resumeData.projects.map((project) => (
        <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          {editingItem === project.id ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => handleUpdateProject(project.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={project.github}
                  onChange={(e) => handleUpdateProject(project.id, 'github', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="url"
                  placeholder="Live Demo URL"
                  value={project.live}
                  onChange={(e) => handleUpdateProject(project.id, 'live', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={project.technologies.join(', ')}
                onChange={(e) => handleUpdateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.name || 'Project Name'}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{project.description || 'Project description...'}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setEditingItem(project.id)}
                  className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Achievements & Awards</label>
      <textarea
        value={resumeData.achievements.join('\n')}
        onChange={(e) => updateResumeData('achievements', e.target.value.split('\n').filter(a => a.trim()))}
        placeholder="• Won first place in company hackathon&#10;• Published research paper on machine learning&#10;• Led team of 5 developers on major project"
        className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Resume Builder 📄</h1>
        <p className="text-blue-100 text-lg">
          Create a professional resume optimized for FAANG applications
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{calculateCompleteness()}% Complete</span>
          </div>
          <div className="w-32 bg-blue-200 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateCompleteness()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sections</h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="text-sm font-medium">{section.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mb-2"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={handleExportPDF}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={`${showPreview ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {sections.find(s => s.id === activeSection)?.name}
          </h2>
          {renderCurrentSection()}
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {resumeData.personalInfo.email} • {resumeData.personalInfo.phone}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {resumeData.personalInfo.location}
                </p>
              </div>

              {resumeData.summary && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h4>
                  <p className="text-gray-700 dark:text-gray-300">{resumeData.summary}</p>
                </div>
              )}

              {resumeData.experience.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experience</h4>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <p className="font-medium text-gray-900 dark:text-white">{exp.title}</p>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                    </div>
                  ))}
                </div>
              )}

              {resumeData.skills.technical.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {resumeData.skills.technical.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}