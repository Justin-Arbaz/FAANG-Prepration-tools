import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Search, Filter, MapPin, DollarSign, Clock, Building, ExternalLink, Bookmark, BookmarkCheck, Send, CheckCircle } from 'lucide-react';

const JobMatcher: React.FC = () => {
  const { jobs, skills, updateJobStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSaveJob = (jobId: string) => {
    updateJobStatus(jobId, 'saved');
  };

  const handleApplyJob = (jobId: string) => {
    updateJobStatus(jobId, 'applied');
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'saved') return matchesSearch && job.status === 'saved';
    if (filterStatus === 'applied') return matchesSearch && job.status === 'applied';
    return matchesSearch;
  });

  const getMatchScore = (job: any) => {
    // Simple matching algorithm based on user skills and job requirements
    const userSkills = skills;
    let score = 0;
    
    // Base score from user's overall skill levels (using actual skill names from context)
    const dsaSkill = userSkills['Arrays & Strings'] || 0;
    const systemDesignSkill = userSkills['System Design'] || 0;
    const projectsSkill = userSkills['React'] || 0;
    
    score += (dsaSkill + systemDesignSkill + projectsSkill) / 3;
    
    // Bonus for specific job requirements
    if (job.requirements.includes('React') && projectsSkill > 70) score += 10;
    if (job.requirements.includes('System Design') && systemDesignSkill > 60) score += 15;
    if (job.requirements.includes('Algorithms') && dsaSkill > 70) score += 20;
    
    return Math.min(Math.round(score), 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const appliedJobs = jobs.filter(job => job.status === 'applied').length;
  const savedJobs = jobs.filter(job => job.status === 'saved').length;
  const interviewsScheduled = jobs.filter(job => job.status === 'interview').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Applied Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{appliedJobs}</p>
            </div>
            <Send className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{savedJobs}</p>
            </div>
            <Bookmark className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interviews</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{interviewsScheduled}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {appliedJobs > 0 ? Math.round((interviewsScheduled / appliedJobs) * 100) : 0}%
              </p>
            </div>
            <Building className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Jobs</option>
              <option value="saved">Saved Jobs</option>
              <option value="applied">Applied Jobs</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const matchScore = getMatchScore(job);
            return (
              <div key={job.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(matchScore)}`}>
                        {matchScore}% Match
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.map((req, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      job.status === 'applied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      job.status === 'interview' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      job.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Posted {job.postedDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className={`p-2 transition-colors ${
                        job.status === 'saved'
                          ? 'text-yellow-600 dark:text-yellow-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                      }`}
                    >
                      {job.status === 'saved' ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={() => handleApplyJob(job.id)}
                      disabled={job.status === 'applied'}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        job.status === 'applied'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                      }`}
                    >
                      {job.status === 'applied' ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;