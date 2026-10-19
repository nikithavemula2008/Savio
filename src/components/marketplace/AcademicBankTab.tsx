import React, { useState } from 'react';
import {
  Search,
  Filter,
  FileText,
  ThumbsUp,
  Bookmark,
  Download,
  Share2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';

export const AcademicBankTab: React.FC = () => {
  const { resources, toggleResourceUpvote, toggleResourceBookmark } = useAppData();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');

  const categories = ['All', 'Lecture Notes', 'Previous Exam', 'Cheat Sheet', 'Lab Manual'];
  const semesters = ['All', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'];

  const filteredResources = resources.filter(res => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.contributor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSemester = selectedSemester === 'All' || res.semester === selectedSemester;

    return matchesSearch && matchesCategory && matchesSemester;
  });

  const handleDownload = (title: string) => {
    showToast(`Downloading "${title.substring(0, 30)}..."`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by course code (e.g. CS304), topic, or contributor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46F5]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#4F46F5] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Semester Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Term:</span>
            <select
              value={selectedSemester}
              onChange={e => setSelectedSemester(e.target.value)}
              className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            No study materials found
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your course code or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map(res => (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Course Code & Category Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5] dark:text-indigo-300 font-mono border border-indigo-200/60 dark:border-indigo-800/60">
                      {res.courseCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {res.semester}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {res.category}
                  </span>
                </div>

                {/* Resource Title */}
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug mb-1.5 hover:text-[#4F46F5] transition-colors">
                  {res.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {res.description}
                </p>

                {/* Contributor Card */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-4 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={res.contributorAvatar}
                      alt={res.contributor}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white leading-tight">
                        {res.contributor}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {res.contributorYear}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400">
                    <span>{res.fileType} • {res.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  {/* Upvote Button */}
                  <button
                    type="button"
                    onClick={() => toggleResourceUpvote(res.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      res.isUpvoted
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5] dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${res.isUpvoted ? 'fill-current' : ''}`} />
                    <span>{res.upvotes}</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={() => toggleResourceBookmark(res.id)}
                    className={`p-2 rounded-xl text-xs transition-colors ${
                      res.isBookmarked
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                    title={res.isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${res.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Download CTA */}
                <button
                  type="button"
                  onClick={() => handleDownload(res.title)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
