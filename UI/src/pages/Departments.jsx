import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService';
import { Plus, Search, Filter, Edit2, Trash2, Building2, BookOpen } from 'lucide-react';
import DepartmentModal from '../components/DepartmentModal';
import CourseListModal from '../components/CourseListModal';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [selectedDeptCourses, setSelectedDeptCourses] = useState({ name: '', courses: [] });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAllDepartments();
            setDepartments(data);
        } catch (error) {
            console.error("Failed to fetch departments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data) => {
        try {
            await createDepartment(data);
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Failed to create department:", error);
            alert("Failed to create department: " + (error.message || "Unknown error"));
        }
    };

    const handleUpdate = async (data) => {
        if (!currentDepartment) return;
        try {
            const updatedData = { ...data, departmentID: currentDepartment.departmentID };
            await updateDepartment(currentDepartment.departmentID, updatedData);
            setIsModalOpen(false);
            setCurrentDepartment(null);
            fetchData();
        } catch (error) {
            console.error("Failed to update department:", error);
            alert("Failed to update department: " + (error.message || "Unknown error"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await deleteDepartment(id);
                fetchData();
            } catch (error) {
                console.error("Failed to delete department:", error);
                alert("Failed to delete department");
            }
        }
    };

    const openCreateModal = () => {
        setCurrentDepartment(null);
        setIsModalOpen(true);
    };

    const openEditModal = (department) => {
        setCurrentDepartment(department);
        setIsModalOpen(true);
    };

    const openCourseModal = (dept) => {
        setSelectedDeptCourses({
            name: `${dept.departmentName} (${dept.department_Code})`,
            courses: dept.courses || []
        });
        setIsCourseModalOpen(true);
    };

    const filteredDepartments = departments.filter(dept =>
        dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.department_Code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Departments</h1>
                    <p className="text-slate-400">Manage academic departments and codes.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Department
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search departments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-8">Loading departments...</div>
                ) : filteredDepartments.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">No departments found.</div>
                ) : (
                    filteredDepartments.map((dept) => (
                        <div key={dept.departmentID} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 font-bold text-lg border border-purple-500/10">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{dept.departmentName}</h3>
                                        <p className="text-xs text-slate-400">ID: #{dept.departmentID}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-lg text-sm font-mono border border-white/10">
                                    {dept.department_Code}
                                </span>
                            </div>

                            <div className="flex gap-3 pt-3 border-t border-white/5">
                                <button
                                    onClick={() => openCourseModal(dept)}
                                    className="flex-1 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <BookOpen className="w-4 h-4" /> Courses
                                </button>
                                <button
                                    onClick={() => openEditModal(dept)}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(dept.departmentID)}
                                    className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Department Name</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Code</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-400">Loading departments...</td>
                                </tr>
                            ) : filteredDepartments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-400">No departments found.</td>
                                </tr>
                            ) : (
                                filteredDepartments.map((dept) => (
                                    <tr key={dept.departmentID} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 border border-purple-500/10">
                                                    <Building2 className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-white text-lg">{dept.departmentName}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-lg text-sm font-mono border border-white/10">
                                                {dept.department_Code}
                                            </span>
                                        </td>
                                        <td className="p-6 text-slate-400">
                                            #{dept.departmentID}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openCourseModal(dept)}
                                                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transform hover:scale-110" title="View Courses">
                                                    <BookOpen className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(dept)}
                                                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transform hover:scale-110" title="Edit">
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dept.departmentID)}
                                                    className="p-3 hover:bg-red-500/20 rounded-xl text-slate-400 hover:text-red-400 transition-all transform hover:scale-110" title="Delete">
                                                    <Trash2 className="w-5 h-5" />
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

            <DepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={currentDepartment ? handleUpdate : handleCreate}
                initialData={currentDepartment}
            />

            <CourseListModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                title="Department Courses"
                subtitle={selectedDeptCourses.name}
                courses={selectedDeptCourses.courses}
            />
        </DashboardLayout>
    );
};

export default Departments;
