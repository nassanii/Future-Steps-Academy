import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';
import { getAllDepartments } from '../services/departmentService';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Users } from 'lucide-react';
import StudentModal from '../components/StudentModal';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [studentsData, departmentsData] = await Promise.all([
                getAllStudents(),
                getAllDepartments()
            ]);
            setStudents(studentsData);
            setDepartments(departmentsData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data) => {
        try {
            await createStudent(data);
            setIsModalOpen(false);
            fetchData(); // Refresh list
        } catch (error) {
            console.error("Failed to create student:", error);
            alert("Failed to create student: " + (error.message || "Unknown error"));
        }
    };

    const handleUpdate = async (data) => {
        if (!currentStudent) return;
        try {
            const updatedData = { ...data, studentID: currentStudent.studentID }; // Ensure ID is present
            await updateStudent(currentStudent.studentID, updatedData);
            setIsModalOpen(false);
            setCurrentStudent(null);
            fetchData();
        } catch (error) {
            console.error("Failed to update student:", error);
            alert("Failed to update student: " + (error.message || "Unknown error"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await deleteStudent(id);
                fetchData();
            } catch (error) {
                console.error("Failed to delete student:", error);
                alert("Failed to delete student");
            }
        }
    };

    const openCreateModal = () => {
        setCurrentStudent(null);
        setIsModalOpen(true);
    };

    const openEditModal = (student) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const filteredStudents = students.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Students</h1>
                    <p className="text-slate-400">Manage your student directory and enrollments.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Student
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
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

            {/* Table */}
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-8">Loading students...</div>
                ) : filteredStudents.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">No students found.</div>
                ) : (
                    filteredStudents.map((student) => (
                        <div key={student.studentID} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {student.firstName[0]}{student.lastName[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{student.firstName} {student.lastName}</h3>
                                        <p className="text-xs text-slate-400">ID: #{student.studentID}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                                    {student.departmentName || 'General'}
                                </span>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Year</span>
                                    <span className="text-slate-300 font-medium">{student.year}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Phone</span>
                                    <span className="text-slate-300">{student.phone}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Email</span>
                                    <span className="text-slate-300">{student.email || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => openEditModal(student)}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(student.studentID)}
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
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Student</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Year</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-400">Loading students...</td>
                                </tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-400">No students found.</td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.studentID} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {student.firstName[0]}{student.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg text-white">{student.firstName} {student.lastName}</p>
                                                    <p className="text-sm text-slate-400">ID: #{student.studentID}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-base text-slate-300">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-white">{student.email || 'No Email'}</span>
                                                <span className="text-slate-500">{student.phone}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                                                {student.departmentName || 'General'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-base text-slate-300 font-medium">{student.year}</td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(student)}
                                                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transform hover:scale-110" title="Edit">
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.studentID)}
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

            <StudentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={currentStudent ? handleUpdate : handleCreate}
                initialData={currentStudent}
                departments={departments}
            />
        </DashboardLayout>
    );
};

export default Students;
