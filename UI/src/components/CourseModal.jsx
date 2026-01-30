import React, { useState, useEffect } from 'react';
import { X, BookOpen, Save, Check } from 'lucide-react';

const CourseModal = ({ isOpen, onClose, onSave, initialData, departments = [], teachers = [] }) => {
    const [formData, setFormData] = useState({
        courseName: '',
        CourseCode: '',
        departmentIDs: [],
        TeachersIDs: []
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                courseName: initialData.courseName || '',
                CourseCode: initialData.courseCode || initialData.CourseCode || '',
                // Map existing relationships if available, otherwise empty
                departmentIDs: initialData.departmenters?.map(d => d.departmentID) || [],
                TeachersIDs: initialData.teachers?.map(t => t.teacherID) || []
            });
        } else {
            setFormData({
                courseName: '',
                CourseCode: '',
                departmentIDs: [],
                TeachersIDs: []
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const toggleDepartment = (id) => {
        setFormData(prev => {
            const currentIds = prev.departmentIDs;
            if (currentIds.includes(id)) {
                return { ...prev, departmentIDs: currentIds.filter(dId => dId !== id) };
            } else {
                return { ...prev, departmentIDs: [...currentIds, id] };
            }
        });
    };

    const toggleTeacher = (id) => {
        setFormData(prev => {
            const currentIds = prev.TeachersIDs;
            if (currentIds.includes(id)) {
                return { ...prev, TeachersIDs: currentIds.filter(tId => tId !== id) };
            } else {
                return { ...prev, TeachersIDs: [...currentIds, id] };
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {initialData ? 'Edit Course' : 'Add New Course'}
                            </h2>
                            <p className="text-slate-400 text-xs">
                                {initialData ? 'Update course details' : 'Create a new course'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form - Scrollable */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Course Name</label>
                            <input
                                type="text"
                                required
                                value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="e.g. Introduction to Programming"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Course Code</label>
                            <input
                                type="text"
                                required
                                value={formData.CourseCode}
                                onChange={(e) => setFormData({ ...formData, CourseCode: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="e.g. CS101"
                            />
                        </div>

                        {/* Departments Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Departments</label>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl max-h-32 overflow-y-auto space-y-1">
                                {departments.length === 0 ? (
                                    <p className="text-xs text-slate-500 text-center py-2">No departments available</p>
                                ) : (
                                    departments.map(dept => (
                                        <div
                                            key={dept.departmentID}
                                            onClick={() => toggleDepartment(dept.departmentID)}
                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${formData.departmentIDs.includes(dept.departmentID) ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'}`}
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.departmentIDs.includes(dept.departmentID) ? 'bg-blue-500 border-blue-500' : 'border-slate-500'}`}>
                                                {formData.departmentIDs.includes(dept.departmentID) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-sm ${formData.departmentIDs.includes(dept.departmentID) ? 'text-white font-medium' : 'text-slate-400'}`}>
                                                {dept.departmentName}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Teachers Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Assign Teachers</label>
                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl max-h-32 overflow-y-auto space-y-1">
                                {teachers.length === 0 ? (
                                    <p className="text-xs text-slate-500 text-center py-2">No teachers available</p>
                                ) : (
                                    teachers.map(teacher => (
                                        <div
                                            key={teacher.teacherID}
                                            onClick={() => toggleTeacher(teacher.teacherID)}
                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${formData.TeachersIDs.includes(teacher.teacherID) ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-white/5 border border-transparent'}`}
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.TeachersIDs.includes(teacher.teacherID) ? 'bg-purple-500 border-purple-500' : 'border-slate-500'}`}>
                                                {formData.TeachersIDs.includes(teacher.teacherID) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-sm ${formData.TeachersIDs.includes(teacher.teacherID) ? 'text-white font-medium' : 'text-slate-400'}`}>
                                                {teacher.firstName} {teacher.lastName}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 pt-4 flex gap-3 bg-zinc-900 rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white font-medium transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {initialData ? 'Save Changes' : 'Create Course'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;
