import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import * as studentService from '../services/studentService';
import * as courseService from '../services/courseService';

const GradeModal = ({ isOpen, onClose, onSave, grade, defaultStudentId }) => {
    const [formData, setFormData] = useState({
        studentID: '',
        courseID: '',
        gradeType: 'Exam', // Default
        score: ''
    });
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchDependencies();
            if (grade) {
                setFormData({
                    studentID: grade.studentID,
                    courseID: grade.courseID,
                    gradeType: grade.gradeType,
                    score: grade.score
                });
            } else {
                setFormData({
                    studentID: defaultStudentId || '',
                    courseID: '',
                    gradeType: 'Exam',
                    score: ''
                });
            }
        }
    }, [isOpen, grade, defaultStudentId]);

    const fetchDependencies = async () => {
        try {
            const [studentsData, coursesData] = await Promise.all([
                studentService.getAllStudents(),
                courseService.getAllCourses()
            ]);
            setStudents(studentsData);
            setCourses(coursesData);
        } catch (err) {
            console.error("Failed to fetch dependencies", err);
            setError("Failed to load students or courses.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation
        if (!formData.studentID || !formData.courseID || !formData.score) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            // Ensure score is a number, studentID and courseID are integers
            const payload = {
                ...formData,
                studentID: parseInt(formData.studentID),
                courseID: parseInt(formData.courseID),
                score: parseFloat(formData.score)
            };
            await onSave(payload);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while saving.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {grade ? 'Edit Grade' : 'Add New Grade'}
                    </h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                        <AlertCircle size={20} />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Student Selection */}
                    <div>
                        <label className="block text-slate-400 text-sm font-medium mb-1">Student</label>
                        <select
                            name="studentID"
                            value={formData.studentID}
                            onChange={handleChange}
                            disabled={!!grade || !!defaultStudentId} // Often can't change student on edit, or if default is provided
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">Select Student</option>
                            {students.map(s => (
                                <option key={s.studentID} value={s.studentID}>
                                    {s.firstName} {s.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Course Selection */}
                    <div>
                        <label className="block text-slate-400 text-sm font-medium mb-1">Course</label>
                        <select
                            name="courseID"
                            value={formData.courseID}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">Select Course</option>
                            {courses.map(c => (
                                <option key={c.courseID} value={c.courseID}>
                                    {c.courseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Grade Type */}
                    <div>
                        <label className="block text-slate-400 text-sm font-medium mb-1">Grade Type</label>
                        <select
                            name="gradeType"
                            value={formData.gradeType}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="Exam">Exam</option>
                            <option value="Assignment">Assignment</option>
                            <option value="Quiz">Quiz</option>
                            <option value="Project">Project</option>
                        </select>
                    </div>

                    {/* Score */}
                    <div>
                        <label className="block text-slate-400 text-sm font-medium mb-1">Score (0-100)</label>
                        <input
                            type="number"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="95.5"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>{grade ? 'Update Grade' : 'Save Grade'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GradeModal;
