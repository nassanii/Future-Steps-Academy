import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../services/courseService';
import { getAllTeachers } from '../services/teacherService';
import { getAllDepartments } from '../services/departmentService';
import { Plus, Search, Filter, Edit2, Trash2, BookOpen, Building2 } from 'lucide-react';
import CourseModal from '../components/CourseModal';
import DepartmentListModal from '../components/DepartmentListModal';

import { useToast } from '../context/ToastContext';
import StudentListModal from '../components/StudentListModal';
import { Users } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [selectedCourseDepartments, setSelectedCourseDepartments] = useState({ name: '', departments: [] });
    const [selectedCourseStudents, setSelectedCourseStudents] = useState({ name: '', students: [] });
    const toast = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [coursesData, teachersData, departmentsData] = await Promise.all([
                getAllCourses(),
                getAllTeachers(),
                getAllDepartments()
            ]);
            setCourses(coursesData);
            setTeachers(teachersData);
            setDepartments(departmentsData);
            console.log("Courses fetched:", coursesData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            toast.error("Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data) => {
        try {
            console.log("Creating course with data:", data);
            await createCourse(data);
            toast.success("Course created successfully!");
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Failed to create course:", error);
            console.error("Error details:", error.response?.data);
            toast.error("Failed to create course: " + (error.response?.data?.message || error.message || "Unknown error"));
        }
    };

    const handleUpdate = async (data) => {
        if (!currentCourse) return;
        try {
            const updatedData = { ...data, courseID: currentCourse.courseID };
            console.log("Updating course with data:", updatedData);
            await updateCourse(currentCourse.courseID, updatedData);
            toast.success("Course updated successfully!");
            setIsModalOpen(false);
            setCurrentCourse(null);
            fetchData();
        } catch (error) {
            console.error("Failed to update course:", error);
            console.error("Error details:", error.response?.data);
            toast.error("Failed to update course: " + (error.response?.data?.message || error.message || "Unknown error"));
        }
    };

    const handleDelete = async (id) => {
        toast.confirm("Are you sure you want to delete this course?", async () => {
            try {
                await deleteCourse(id);
                toast.success("Course deleted successfully!");
                fetchData();
            } catch (error) {
                console.error("Failed to delete course:", error);
                toast.error("Failed to delete course");
            }
        });
    };

    const openCreateModal = () => {
        setCurrentCourse(null);
        setIsModalOpen(true);
    };

    const openEditModal = (course) => {
        setCurrentCourse(course);
        setIsModalOpen(true);
    };

    const openDepartmentModal = (course) => {
        setSelectedCourseDepartments({
            name: `${course.courseName} (${course.courseCode})`,
            departments: course.departmenters || []
        });
        setIsDepartmentModalOpen(true);
    };

    const openStudentModal = (course) => {
        setSelectedCourseStudents({
            name: `${course.courseName} (${course.courseCode})`,
            students: course.students || []
        });
        setIsStudentModalOpen(true);
    };

    const filteredCourses = courses.filter(course =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Courses</h1>
                    <p className="text-slate-400">Manage academic courses and assignments.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Course
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-8">Loading courses...</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">No courses found.</div>
                ) : (
                    filteredCourses.map((course) => (
                        <div key={course.courseID} className="bg-slate-800/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 font-bold text-lg border border-blue-500/10">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{course.courseName}</h3>
                                        <p className="text-xs text-slate-400">Code: {course.courseCode}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-lg text-sm font-mono border border-white/10">
                                    ID: #{course.courseID}
                                </span>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-slate-500">Departments</span>
                                    {course.departmenters && course.departmenters.length > 0 ? (
                                        <button
                                            onClick={() => openDepartmentModal(course)}
                                            className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 hover:text-purple-300 font-medium text-xs transition-colors"
                                        >
                                            <Building2 className="w-3 h-3" />
                                            {course.departmenters.length}
                                        </button>
                                    ) : (
                                        <span className="text-slate-300">None</span>
                                    )}
                                </div>
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-slate-500">Students</span>
                                    {course.students && course.students.length > 0 ? (
                                        <button
                                            onClick={() => openStudentModal(course)}
                                            className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors"
                                        >
                                            <Users className="w-3 h-3" />
                                            {course.students.length}
                                        </button>
                                    ) : (
                                        <span className="text-slate-300">None</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button
                                    onClick={() => openEditModal(course)}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(course.courseID)}
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
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Course Name</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Code</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Departments</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Students</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Teachers</th>
                                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-400">Loading courses...</td>
                                </tr>
                            ) : filteredCourses.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-400">No courses found.</td>
                                </tr>
                            ) : (
                                filteredCourses.map((course) => (
                                    <tr key={course.courseID} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 border border-blue-500/10">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-white text-lg">{course.courseName}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-white/5 text-slate-300 rounded-lg text-sm font-mono border border-white/10">
                                                {course.courseCode}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {course.departmenters && course.departmenters.length > 0 ? (
                                                <button
                                                    onClick={() => openDepartmentModal(course)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
                                                >
                                                    <Building2 className="w-4 h-4" />
                                                    {course.departmenters.length} Department{course.departmenters.length > 1 ? 's' : ''}
                                                </button>
                                            ) : (
                                                <span className="text-slate-500">-</span>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            {course.students && course.students.length > 0 ? (
                                                <button
                                                    onClick={() => openStudentModal(course)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                                                >
                                                    <Users className="w-4 h-4" />
                                                    {course.students.length} Student{course.students.length > 1 ? 's' : ''}
                                                </button>
                                            ) : (
                                                <span className="text-slate-500 text-sm">No Students</span>
                                            )}
                                        </td>
                                        <td className="p-6 text-slate-300">
                                            {course.teachers?.map(t => `${t.firstName} ${t.lastName}`).join(', ') || '-'}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(course)}
                                                    className="p-3 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transform hover:scale-110" title="Edit">
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course.courseID)}
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

            <CourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={currentCourse ? handleUpdate : handleCreate}
                initialData={currentCourse}
                teachers={teachers}
                departments={departments}
            />

            <DepartmentListModal
                isOpen={isDepartmentModalOpen}
                onClose={() => setIsDepartmentModalOpen(false)}
                title="Course Departments"
                subtitle={selectedCourseDepartments.name}
                departments={selectedCourseDepartments.departments}
            />

            <StudentListModal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                title="Enrolled Students"
                subtitle={selectedCourseStudents.name}
                students={selectedCourseStudents.students}
            />
        </DashboardLayout>
    );
};

export default Courses;
