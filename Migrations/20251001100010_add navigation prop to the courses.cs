using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addnavigationproptothecourses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Course_Department",
                columns: table => new
                {
                    Course_DepartmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseID = table.Column<int>(type: "int", nullable: false),
                    DepartmentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Department", x => x.Course_DepartmentID);
                    table.ForeignKey(
                        name: "FK_Course_Department_Courses_CourseID",
                        column: x => x.CourseID,
                        principalTable: "Courses",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Course_Department_Departments_DepartmentID",
                        column: x => x.DepartmentID,
                        principalTable: "Departments",
                        principalColumn: "DepartmentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Course_Department_CourseID",
                table: "Course_Department",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Course_Department_DepartmentID",
                table: "Course_Department",
                column: "DepartmentID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Course_Department");
        }
    }
}
