using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addingcoursestothedatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Student_Teachers");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    courseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseID);
                });

            migrationBuilder.CreateTable(
                name: "Student_Courses",
                columns: table => new
                {
                    Student_CourseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    CourseID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student_Courses", x => x.Student_CourseID);
                    table.ForeignKey(
                        name: "FK_Student_Courses_Courses_CourseID",
                        column: x => x.CourseID,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Student_Courses_Students_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Students",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Teacher_Courses",
                columns: table => new
                {
                    Teacher_CourseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeacherID = table.Column<int>(type: "int", nullable: false),
                    CourseID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher_Courses", x => x.Teacher_CourseID);
                    table.ForeignKey(
                        name: "FK_Teacher_Courses_Courses_CourseID",
                        column: x => x.CourseID,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Teacher_Courses_Teachers_TeacherID",
                        column: x => x.TeacherID,
                        principalTable: "Teachers",
                        principalColumn: "TeacherID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "CourseID", "CourseCode", "courseName" },
                values: new object[,]
                {
                    { 1, "CS101", "Introduction to Programming" },
                    { 2, "CS102", "Data Structures" },
                    { 3, "CS201", "Algorithms" },
                    { 4, "IT101", "Networking Basics" },
                    { 5, "IT102", "Database Systems" },
                    { 6, "IT201", "Web Development" },
                    { 7, "SE101", "Software Requirements" },
                    { 8, "SE102", "Software Design Patterns" },
                    { 9, "SE201", "Agile Methodologies" },
                    { 10, "EE101", "Circuit Analysis" },
                    { 11, "EE102", "Electromagnetics" },
                    { 12, "EE201", "Digital Systems" },
                    { 13, "ME101", "Thermodynamics" },
                    { 14, "ME102", "Fluid Mechanics" },
                    { 15, "ME201", "Machine Design" },
                    { 16, "CE101", "Structural Analysis" },
                    { 17, "CE102", "Construction Materials" },
                    { 18, "CE201", "Transportation Engineering" },
                    { 19, "BA101", "Principles of Management" },
                    { 20, "BA102", "Marketing Fundamentals" },
                    { 21, "BA201", "Financial Accounting" },
                    { 22, "EC101", "Microeconomics" },
                    { 23, "EC102", "Macroeconomics" },
                    { 24, "EC201", "Econometrics" },
                    { 25, "MA101", "Calculus I" },
                    { 26, "MA102", "Linear Algebra" },
                    { 27, "MA201", "Discrete Mathematics" },
                    { 28, "PH101", "Classical Mechanics" },
                    { 29, "PH102", "Electromagnetism" },
                    { 30, "PH201", "Quantum Physics" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Student_Courses_CourseID",
                table: "Student_Courses",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Student_Courses_StudentID",
                table: "Student_Courses",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Teacher_Courses_CourseID",
                table: "Teacher_Courses",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Teacher_Courses_TeacherID",
                table: "Teacher_Courses",
                column: "TeacherID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Student_Courses");

            migrationBuilder.DropTable(
                name: "Teacher_Courses");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.CreateTable(
                name: "Student_Teachers",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    TeacherID = table.Column<int>(type: "int", nullable: false),
                    Student_TeacherID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student_Teachers", x => new { x.StudentID, x.TeacherID });
                    table.ForeignKey(
                        name: "FK_Student_Teachers_Students_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Students",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Student_Teachers_Teachers_TeacherID",
                        column: x => x.TeacherID,
                        principalTable: "Teachers",
                        principalColumn: "TeacherID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Student_Teachers_TeacherID",
                table: "Student_Teachers",
                column: "TeacherID");
        }
    }
}
