import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, Search, Edit2, Trash2, Award, ClipboardList } from 'lucide-react';
import gradesService from '../services/gradesService';
import GradeModal from '../components/GradeModal';

import { useToast } from '../context/ToastContext';

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const toast = useToast();

    useEffect(() => {
        loadGrades();
    }, []);

    const loadGrades = async () => {
        try {
            setLoading(true);
            const data = await gradesService.getAllGrades();
            setGrades(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading grades:', error);
            toast.error("Failed to load grades");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (gradeData) => {
        try {
            if (selectedGrade) {
                await gradesService.updateGrade(selectedGrade.gradeID, gradeData);
                toast.success("Grade updated successfully!");
            } else {
                await gradesService.createGrade(gradeData);
                toast.success("Grade created successfully!");
            }
            loadGrades();
            setIsModalOpen(false);
            setSelectedGrade(null);
        } catch (error) {
            console.error('Error saving grade:', error);
            toast.error("Failed to save grade");
            throw error; // Let modal handle specific error display
        }
    };

    const handleDelete = async (id) => {
        toast.confirm("Are you sure you want to delete this grade?", async () => {
            try {
                await gradesService.deleteGrade(id);
                toast.success("Grade deleted successfully!");
                loadGrades();
            } catch (error) {
                console.error('Error deleting grade:', error);
                toast.error("Failed to delete grade");
            }
        });
    };

    const openModal = (grade = null) => {
        setSelectedGrade(grade);
        setIsModalOpen(true);
    };

    // Extract unique courses
    const courses = ['All Courses', ...new Set((grades || []).map(g => g?.courseName || 'Unknown Course'))];

    const filteredGrades = grades.filter(grade => {
        const matchesSearch = grade.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grade.courseName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = selectedCourse === 'All Courses' || grade.courseName === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Award className="text-blue-500" /> Grades
                    </h1>
                    <p className="text-slate-400">Manage student grades and performance records.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus size={20} />
                    <span>Add Grade</span>
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by student..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Course Dropdown */}
                <div className="w-full md:w-64">
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                    >
                        {courses.map(course => (
                            <option key={course} value={course} className="bg-slate-800 text-white">
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grades Table */}
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Student</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Course</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Score</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Grade</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex justify-center items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            Loading grades...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredGrades.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <ClipboardList size={48} className="text-slate-600" />
                                            <p>No grades found for your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredGrades.map((grade) => (
                                    <tr key={grade.gradeID} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 text-slate-400 text-sm">#{grade.gradeID}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">{grade.studentName}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">{grade.courseName}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {grade.gradeType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-white font-bold">{grade.score}</td>
                                        <td className="px-6 py-4">
                                            {/* Simple logic for Letter Grade display, could be moved to helper */}
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                ${grade.score >= 90 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    grade.score >= 80 ? 'bg-lime-500/10 text-lime-400 border border-lime-500/20' :
                                                        grade.score >= 70 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                            grade.score >= 60 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                                                'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                {grade.score >= 90 ? 'A' :
                                                    grade.score >= 80 ? 'B' :
                                                        grade.score >= 70 ? 'C' :
                                                            grade.score >= 60 ? 'D' : 'F'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openModal(grade)}
                                                    className="p-2 text-blue-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(grade.gradeID)}
                                                    className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <GradeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                grade={selectedGrade}
            />
        </DashboardLayout>
    );
};

export default Grades;
