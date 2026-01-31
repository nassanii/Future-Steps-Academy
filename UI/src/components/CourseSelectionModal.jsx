import React, { useState, useEffect } from 'react';
import { X, Search, Check, BookOpen } from 'lucide-react';
import { getAllCourses } from '../services/courseService';

const CourseSelectionModal = ({ isOpen, onClose, onAssign, currentDepartmentId, existingCourseIds = [] }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchCourses();
            setSelectedCourseIds([]);
            setSearchTerm('');
        }
    }, [isOpen]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await getAllCourses();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelection = (id) => {
        setSelectedCourseIds(prev =>
            prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
        );
    };

    const handleAssign = async () => {
        if (selectedCourseIds.length === 0) return;
        setSubmitting(true);
        try {
            await onAssign(selectedCourseIds);
            onClose();
        } catch (error) {
            console.error("Failed to assign courses", error);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        // Filter by search
        const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.courseCode?.toLowerCase().includes(searchTerm.toLowerCase());

        // Exclude already assigned courses
        // existingCourseIds might be ints or strings, ensure comparison is safe
        const isAlreadyAssigned = existingCourseIds.some(id => String(id) === String(course.courseID));

        return matchesSearch && !isAlreadyAssigned;
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Select Courses</h2>
                        <p className="text-slate-400 text-xs mt-1">Add existing courses to this department</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-white/5 bg-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Loading courses...</div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            {searchTerm ? 'No matching courses found.' : 'All available courses are already assigned.'}
                        </div>
                    ) : (
                        filteredCourses.map(course => (
                            <div
                                key={course.courseID}
                                onClick={() => toggleSelection(course.courseID)}
                                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedCourseIds.includes(course.courseID)
                                        ? 'bg-blue-600/20 border-blue-600/50'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${selectedCourseIds.includes(course.courseID) ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-400'
                                        }`}>
                                        <BookOpen size={16} />
                                    </div>
                                    <div>
                                        <h4 className={`font-medium text-sm ${selectedCourseIds.includes(course.courseID) ? 'text-white' : 'text-slate-200'}`}>
                                            {course.courseName}
                                        </h4>
                                        <span className="text-xs text-slate-500">{course.courseCode}</span>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedCourseIds.includes(course.courseID)
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-slate-600'
                                    }`}>
                                    {selectedCourseIds.includes(course.courseID) && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-zinc-900 rounded-b-2xl flex justify-end gap-3 checkbox-selection">
                    <button onClick={onClose} className="px-4 py-2 text-slate-300 hover:text-white">Cancel</button>
                    <button
                        onClick={handleAssign}
                        disabled={selectedCourseIds.length === 0 || submitting}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {submitting ? 'Assigning...' : `Assign ${selectedCourseIds.length} Course${selectedCourseIds.length !== 1 ? 's' : ''}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseSelectionModal;
