using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class AddGradeClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Department_Courses_CourseID",
                table: "Course_Department");

            migrationBuilder.DropForeignKey(
                name: "FK_Course_Department_Departments_DepartmentID",
                table: "Course_Department");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Course_Department",
                table: "Course_Department");

            migrationBuilder.RenameTable(
                name: "Course_Department",
                newName: "Course_Departments");

            migrationBuilder.RenameIndex(
                name: "IX_Course_Department_DepartmentID",
                table: "Course_Departments",
                newName: "IX_Course_Departments_DepartmentID");

            migrationBuilder.RenameIndex(
                name: "IX_Course_Department_CourseID",
                table: "Course_Departments",
                newName: "IX_Course_Departments_CourseID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Course_Departments",
                table: "Course_Departments",
                column: "Course_DepartmentID");

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    GradeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GradeType = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DateRecorded = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CourseID = table.Column<int>(type: "int", nullable: false),
                    StudentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.GradeID);
                    table.ForeignKey(
                        name: "FK_Grades_Courses_CourseID",
                        column: x => x.CourseID,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Grades_Students_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Students",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Grades_CourseID",
                table: "Grades",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Grades_StudentID",
                table: "Grades",
                column: "StudentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Departments_Courses_CourseID",
                table: "Course_Departments",
                column: "CourseID",
                principalTable: "Courses",
                principalColumn: "CourseID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Departments_Departments_DepartmentID",
                table: "Course_Departments",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DepartmentID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Departments_Courses_CourseID",
                table: "Course_Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Course_Departments_Departments_DepartmentID",
                table: "Course_Departments");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Course_Departments",
                table: "Course_Departments");

            migrationBuilder.RenameTable(
                name: "Course_Departments",
                newName: "Course_Department");

            migrationBuilder.RenameIndex(
                name: "IX_Course_Departments_DepartmentID",
                table: "Course_Department",
                newName: "IX_Course_Department_DepartmentID");

            migrationBuilder.RenameIndex(
                name: "IX_Course_Departments_CourseID",
                table: "Course_Department",
                newName: "IX_Course_Department_CourseID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Course_Department",
                table: "Course_Department",
                column: "Course_DepartmentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Department_Courses_CourseID",
                table: "Course_Department",
                column: "CourseID",
                principalTable: "Courses",
                principalColumn: "CourseID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Department_Departments_DepartmentID",
                table: "Course_Department",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DepartmentID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
