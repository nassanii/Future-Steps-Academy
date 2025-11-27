using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class adddatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartmentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Department_Code = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentID);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DepartmentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentID);
                    table.ForeignKey(
                        name: "FK_Students_Departments_DepartmentID",
                        column: x => x.DepartmentID,
                        principalTable: "Departments",
                        principalColumn: "DepartmentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    TeacherID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HireDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Salary = table.Column<float>(type: "real", nullable: false),
                    DepartmentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => x.TeacherID);
                    table.ForeignKey(
                        name: "FK_Teachers_Departments_DepartmentID",
                        column: x => x.DepartmentID,
                        principalTable: "Departments",
                        principalColumn: "DepartmentID",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentID", "DepartmentName", "Department_Code" },
                values: new object[,]
                {
                    { 1, "Computer Science", "CS01" },
                    { 2, "Information Technology", "IT02" },
                    { 3, "Software Engineering", "SE03" },
                    { 4, "Electrical Engineering", "EE04" },
                    { 5, "Mechanical Engineering", "ME05" },
                    { 6, "Civil Engineering", "CE06" },
                    { 7, "Business Administration", "BA07" },
                    { 8, "Economics", "EC08" },
                    { 9, "Mathematics", "MA09" },
                    { 10, "Physics", "PH10" }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentID", "Address", "DepartmentID", "FirstName", "LastName", "Phone", "Year" },
                values: new object[,]
                {
                    { 1, "Gaziantep/Turkey", 1, "Abdurrahman", "Nassani", "+905538866317", "FrishMan" },
                    { 2, "Istanbul/Turkey", 2, "Omar", "Hassan", "+905311112233", "Sophomore" },
                    { 3, "Gaziantep/Turkey", 3, "Lina", "Khaled", "+905322223344", "Junior" },
                    { 4, "Ankara/Turkey", 4, "Ahmad", "Mahmoud", "+905333334455", "Senior" },
                    { 5, "Gaziantep/Turkey", 5, "Sara", "Youssef", "+905344445566", "Freshman" },
                    { 6, "Izmir/Turkey", 6, "Khaled", "Othman", "+905355556677", "Sophomore" },
                    { 7, "Gaziantep/Turkey", 7, "Mariam", "Salem", "+905366667788", "Junior" },
                    { 8, "Antalya/Turkey", 8, "Tariq", "Ali", "+905377778899", "Senior" },
                    { 9, "Gaziantep/Turkey", 9, "Noor", "Rahman", "+905388889900", "Freshman" },
                    { 10, "Mersin/Turkey", 10, "Hadi", "Fouad", "+905399991122", "Sophomore" },
                    { 11, "Gaziantep/Turkey", 2, "Aya", "Samir", "+905300002233", "Junior" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Student_Teachers_TeacherID",
                table: "Student_Teachers",
                column: "TeacherID");

            migrationBuilder.CreateIndex(
                name: "IX_Students_DepartmentID",
                table: "Students",
                column: "DepartmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_DepartmentID",
                table: "Teachers",
                column: "DepartmentID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Student_Teachers");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Teachers");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}
