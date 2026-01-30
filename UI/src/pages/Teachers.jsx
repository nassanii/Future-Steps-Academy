import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllTeachers, createTeacher, updateTeacher, deleteTeacher } from '../services/teacherService';
import { getAllDepartments } from '../services/departmentService';
import { Plus, Search, Filter, Edit2, Trash2, BookOpen } from 'lucide-react';
import TeacherModal from '../components/TeacherModal';
import CourseListModal from '../components/CourseListModal';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const [selectedTeacherCourses, setSelectedTeacherCourses] = useState({ name: '', courses: [], address: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [teachersData, departmentsData] = await Promise.all([
                getAllTeachers(),
                getAllDepartments()
            ]);
            console.log("Fetched Teachers:", teachersData); // Debugging Log
            setTeachers(teachersData);
            setDepartments(departmentsData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data) => {
        try {
            await createTeacher(data);
            setIsModalOpen(false);
            fetchData(); // Refresh list
        } catch (error) {
            console.error("Failed to create teacher:", error);
            alert("Failed to create teacher: " + (error.message || "Unknown error"));
        }
    };

    const handleUpdate = async (data) => {
        if (!currentTeacher) return;
        try {
            const updatedData = { ...data, teacherID: currentTeacher.teacherID };
            await updateTeacher(currentTeacher.teacherID, updatedData);
            setIsModalOpen(false);
            setCurrentTeacher(null);
            fetchData();
        } catch (error) {
            console.error("Failed to update teacher:", error);
            alert("Failed to update teacher: " + (error.message || "Unknown error"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this teacher?")) {
            try {
                await deleteTeacher(id);
                fetchData();
            } catch (error) {
                console.error("Failed to delete teacher:", error);
                alert("Failed to delete teacher");
            }
        }
    };

    const openCreateModal = () => {
        setCurrentTeacher(null);
        setIsModalOpen(true);
    };

    const openEditModal = (teacher) => {
        setCurrentTeacher(teacher);
        setIsModalOpen(true);
    };

    const openCourseModal = (teacher) => {
        // Ensure we are capturing the address correctly, defaulting to empty string if missing
        const teacherAddress = teacher.address || teacher.Address || '';
        console.log("Opening course modal for:", teacher.firstName, "Address:", teacherAddress);
        console.log("Teacher courses:", teacher.courses); // Debug log

        setSelectedTeacherCourses({
            name: `${teacher.firstName} ${teacher.lastName}`,
            courses: teacher.courses || [],
            address: teacherAddress
        });
        setIsCourseModalOpen(true);
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.email && teacher.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Teachers</h1>
                    <p className="text-slate-400">Manage your faculty and course assignments.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Teacher
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search teachers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-all">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-8">Loading teachers...</div>
                ) : filteredTeachers.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">No teachers found.</div>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <div key={teacher.teacherID} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {teacher.firstName[0]}{teacher.lastName[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{teacher.firstName} {teacher.lastName}</h3>
                                        <p className="text-xs text-slate-400">ID: #{teacher.teacherID}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-medium border border-purple-500/20">
                                    {teacher.departmentName || 'General'}
                                </span>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Email</span>
                                    <span className="text-slate-300">{teacher.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Phone</span>
                                    <span className="text-slate-300">{teacher.phone}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Salary</span>
                                    <span className="text-emerald-400 font-medium">${teacher.salary?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Hire Date</span>
                                    <span className="text-slate-300">{new Date(teacher.hireDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => openCourseModal(teacher)}
                                    className="flex-1 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <BookOpen className="w-4 h-4" /> Courses
                                </button>
                                <button
                                    onClick={() => openEditModal(teacher)}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(teacher.teacherID)}
                                    className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
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
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Teacher</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Salary</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Hire Date</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-400">Loading teachers...</td>
                                </tr>
                            ) : filteredTeachers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-400">No teachers found.</td>
                                </tr>
                            ) : (
                                filteredTeachers.map((teacher) => (
                                    <tr key={teacher.teacherID} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {teacher.firstName[0]}{teacher.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg text-white">{teacher.firstName} {teacher.lastName}</p>
                                                    <p className="text-sm text-slate-400">ID: #{teacher.teacherID}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-base text-slate-300">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-white">{teacher.email || 'No Email'}</span>
                                                <span className="text-slate-500">{teacher.phone}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                                                {teacher.departmentName || 'General'}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-emerald-400 font-medium">${teacher.salary?.toLocaleString()}</span>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-slate-300 whitespace-nowrap">{new Date(teacher.hireDate).toLocaleDateString()}</span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openCourseModal(teacher)}
                                                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transform hover:scale-110" title="View Courses">
                                                    <BookOpen className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(teacher)}
                                                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transform hover:scale-110" title="Edit">
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(teacher.teacherID)}
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

            <TeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={currentTeacher ? handleUpdate : handleCreate}
                initialData={currentTeacher}
                departments={departments}
            />

            <CourseListModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                title="Teacher Details"
                subtitle={selectedTeacherCourses.name}
                courses={selectedTeacherCourses.courses}
                address={selectedTeacherCourses.address}
            />
        </DashboardLayout>
    );
};

export default Teachers;
