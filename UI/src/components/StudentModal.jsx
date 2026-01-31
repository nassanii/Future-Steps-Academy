import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const StudentModal = ({ isOpen, onClose, onSave, initialData, departments, courses }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        year: '',
        departmentID: '',
        courseIDs: []
    });

    useEffect(() => {
        if (initialData) {
            // Check for student_Courses (from detailed view) or courseIDs if mapped
            const existingCourses = initialData.student_Courses
                ? initialData.student_Courses.map(sc => sc.courseID)
                : (initialData.courseIDs || []);

            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                phone: initialData.phone || '',
                address: initialData.address || '',
                year: initialData.year || '',
                departmentID: initialData.departmentID || initialData.departmentName || '',
                courseIDs: existingCourses
            });

            // Attempt to map department name to ID if only name is provided in initialData
            if (initialData.departmentName && !initialData.departmentID && departments) {
                const dept = departments.find(d => d.departmentName === initialData.departmentName);
                if (dept) {
                    setFormData(prev => ({ ...prev, departmentID: dept.departmentID }));
                }
            }

        } else {
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                year: '',
                departmentID: '',
                courseIDs: []
            });
        }
    }, [initialData, departments]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Student' : 'Add New Student'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="John"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email / Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                            placeholder="+1 234 567 890"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                            placeholder="123 Education Lane"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Year</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="2024"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Department</label>
                            <select
                                name="departmentID"
                                value={formData.departmentID}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                            >
                                <option value="" className="bg-zinc-900">Select Dept</option>
                                {departments && departments.map(dept => (
                                    <option key={dept.departmentID} value={dept.departmentID} className="bg-zinc-900">
                                        {dept.departmentName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Course Selection */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            {formData.departmentID ? 'Department Courses' : 'Select a Department to view Courses'}
                        </label>
                        <div className="w-full bg-black/20 border border-white/10 rounded-xl p-4 max-h-40 overflow-y-auto">
                            {(() => {
                                const filteredCourses = formData.departmentID
                                    ? courses.filter(course =>
                                        course.departmenters && course.departmenters.some(d => d.departmentID === Number(formData.departmentID))
                                    )
                                    : []; // Empty if no department selected

                                return filteredCourses.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {filteredCourses.map(course => (
                                            <label key={course.courseID} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.courseIDs.includes(course.courseID)}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setFormData(prev => {
                                                            const currentIDs = prev.courseIDs || [];
                                                            if (checked) {
                                                                return { ...prev, courseIDs: [...currentIDs, course.courseID] };
                                                            } else {
                                                                return { ...prev, courseIDs: currentIDs.filter(id => id !== course.courseID) };
                                                            }
                                                        });
                                                    }}
                                                    className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 bg-white/5 transition-colors"
                                                />
                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                                    {course.courseName}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        {formData.departmentID ? 'No courses available for this department.' : 'Please select a department first.'}
                                    </p>
                                );
                            })()}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentModal;
