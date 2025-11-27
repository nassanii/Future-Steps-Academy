using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedingGrades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Grades",
                columns: new[] { "GradeID", "CourseID", "DateRecorded", "GradeType", "Score", "StudentID" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 85m, 1 },
                    { 2, 1, new DateTime(2024, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 90m, 1 },
                    { 3, 1, new DateTime(2024, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 88m, 1 },
                    { 4, 2, new DateTime(2024, 10, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 78m, 1 },
                    { 5, 2, new DateTime(2024, 12, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 82m, 1 },
                    { 6, 4, new DateTime(2024, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 92m, 2 },
                    { 7, 4, new DateTime(2024, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 95m, 2 },
                    { 8, 5, new DateTime(2024, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 89m, 2 },
                    { 9, 5, new DateTime(2024, 12, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 91m, 2 },
                    { 10, 7, new DateTime(2024, 10, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 87m, 3 },
                    { 11, 7, new DateTime(2024, 12, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 93m, 3 },
                    { 12, 8, new DateTime(2024, 11, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 95m, 3 },
                    { 13, 8, new DateTime(2024, 12, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 90m, 3 },
                    { 14, 10, new DateTime(2024, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 75m, 4 },
                    { 15, 10, new DateTime(2024, 12, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 80m, 4 },
                    { 16, 11, new DateTime(2024, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 72m, 4 },
                    { 17, 11, new DateTime(2024, 12, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 78m, 4 },
                    { 18, 13, new DateTime(2024, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 88m, 5 },
                    { 19, 13, new DateTime(2024, 12, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 92m, 5 },
                    { 20, 14, new DateTime(2024, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 85m, 5 },
                    { 21, 16, new DateTime(2024, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 90m, 6 },
                    { 22, 16, new DateTime(2024, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 94m, 6 },
                    { 23, 17, new DateTime(2024, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 86m, 6 },
                    { 24, 19, new DateTime(2024, 10, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 91m, 7 },
                    { 25, 19, new DateTime(2024, 12, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 96m, 7 },
                    { 26, 20, new DateTime(2024, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, 100m, 7 },
                    { 27, 22, new DateTime(2024, 10, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 83m, 8 },
                    { 28, 22, new DateTime(2024, 12, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 87m, 8 },
                    { 29, 23, new DateTime(2024, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 80m, 8 },
                    { 30, 25, new DateTime(2024, 10, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 95m, 9 },
                    { 31, 25, new DateTime(2024, 12, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 98m, 9 },
                    { 32, 26, new DateTime(2024, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 92m, 9 },
                    { 33, 28, new DateTime(2024, 10, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 84m, 10 },
                    { 34, 28, new DateTime(2024, 12, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 88m, 10 },
                    { 35, 29, new DateTime(2024, 11, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 90m, 10 },
                    { 36, 4, new DateTime(2024, 10, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 89m, 11 },
                    { 37, 4, new DateTime(2024, 12, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 93m, 11 },
                    { 38, 5, new DateTime(2024, 11, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 87m, 11 },
                    { 39, 6, new DateTime(2024, 9, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 91m, 11 },
                    { 40, 6, new DateTime(2024, 12, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 94m, 11 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Grades",
                keyColumn: "GradeID",
                keyValue: 40);
        }
    }
}
