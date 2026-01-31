import React, { useEffect, useState } from 'react';
import { X, Award, AlertCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import gradesService from '../services/gradesService';
import GradeModal from './GradeModal';
import { useToast } from '../context/ToastContext';

const StudentGradesModal = ({ isOpen, onClose, student }) => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const toast = useToast();

    useEffect(() => {
        if (isOpen && student) {
            fetchGrades();
        } else {
            setGrades([]); // Clear when closed
        }
    }, [isOpen, student]);

    const fetchGrades = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await gradesService.getStudentGrades(student.studentID);
            setGrades(data);
        } catch (err) {
            console.error("Failed to fetch student grades", err);
            // If 404/Empty, it might just mean no grades, but backend usually returns empty list or we handle 404 logic
            setError("No grades found for this student.");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveGrade = async (gradeData) => {
        try {
            if (selectedGrade) {
                await gradesService.updateGrade(selectedGrade.gradeID, gradeData);
                toast.success("Grade updated successfully!");
            } else {
                await gradesService.createGrade(gradeData);
                toast.success("Grade added successfully!");
            }
            setIsGradeModalOpen(false);
            fetchGrades(); // Refresh list
        } catch (err) {
            console.error("Failed to save grade", err);
            toast.error("Failed to save grade: " + (err.message || "Unknown error"));
        }
    };

    const handleDeleteGrade = async (id) => {
        toast.confirm("Are you sure you want to delete this grade?", async () => {
            try {
                await gradesService.deleteGrade(id);
                toast.success("Grade deleted successfully!");
                fetchGrades();
            } catch (err) {
                console.error("Failed to delete grade", err);
                toast.error("Failed to delete grade");
            }
        });
    };

    const openAddModal = () => {
        setSelectedGrade(null);
        setIsGradeModalOpen(true);
    };

    const openEditModal = (grade) => {
        setSelectedGrade(grade);
        setIsGradeModalOpen(true);
    };

    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {student.firstName?.[0]}{student.lastName?.[0]}
                                </div>
                                {student.firstName} {student.lastName}'s Grades
                            </h2>
                            <p className="text-slate-400 mt-1 pl-14">Student ID: #{student.studentID}</p>
                        </div>
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg transition-colors"
                        >
                            <Plus size={18} /> Add Grade
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : error && grades.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 bg-white/5 rounded-xl border border-white/5">
                        <Award size={48} className="mx-auto mb-3 text-slate-600" />
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-white/10">
                        <table className="w-full text-left">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Course</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Type</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Score</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300">Grade</th>
                                    <th className="p-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-slate-800/30">
                                {grades.map((grade) => (
                                    <tr key={grade.gradeID} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-white font-medium">{grade.courseName}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {grade.gradeType}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white font-bold">{grade.score}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold 
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
                                        <td className="p-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => openEditModal(grade)}
                                                    className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteGrade(grade.gradeID)}
                                                    className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <GradeModal
                isOpen={isGradeModalOpen}
                onClose={() => setIsGradeModalOpen(false)}
                onSave={handleSaveGrade}
                grade={selectedGrade}
                defaultStudentId={student.studentID}
            />
        </div>
    );
};

export default StudentGradesModal;
