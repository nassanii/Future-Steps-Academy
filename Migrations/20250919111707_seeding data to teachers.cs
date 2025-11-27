using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class seedingdatatoteachers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Teachers",
                columns: new[] { "TeacherID", "Address", "DepartmentID", "Email", "FirstName", "HireDate", "LastName", "Phone", "Salary" },
                values: new object[,]
                {
                    { 1, "Istanbul/Turkey", 1, "ahmed.ali@example.com", "Ahmed", new DateOnly(2015, 3, 1), "Ali", "+905300000001", 4000f },
                    { 2, "Ankara/Turkey", 2, "lina.khaled@example.com", "Lina", new DateOnly(2016, 5, 15), "Khaled", "+905300000002", 4200f },
                    { 3, "Izmir/Turkey", 3, "omar.hassan@example.com", "Omar", new DateOnly(2017, 8, 10), "Hassan", "+905300000003", 4100f },
                    { 4, "Gaziantep/Turkey", 4, "sara.youssef@example.com", "Sara", new DateOnly(2018, 2, 20), "Youssef", "+905300000004", 4300f },
                    { 5, "Antalya/Turkey", 5, "khaled.othman@example.com", "Khaled", new DateOnly(2019, 7, 5), "Othman", "+905300000005", 4500f },
                    { 6, "Bursa/Turkey", 6, "mariam.salem@example.com", "Mariam", new DateOnly(2015, 11, 12), "Salem", "+905300000006", 4400f },
                    { 7, "Mersin/Turkey", 7, "tariq.ali@example.com", "Tariq", new DateOnly(2020, 1, 25), "Ali", "+905300000007", 4600f },
                    { 8, "Adana/Turkey", 8, "noor.rahman@example.com", "Noor", new DateOnly(2014, 9, 17), "Rahman", "+905300000008", 4700f },
                    { 9, "Konya/Turkey", 9, "hadi.fouad@example.com", "Hadi", new DateOnly(2016, 12, 3), "Fouad", "+905300000009", 4800f },
                    { 10, "Gaziantep/Turkey", 10, "aya.samir@example.com", "Aya", new DateOnly(2017, 4, 28), "Samir", "+905300000010", 4900f }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherID",
                keyValue: 10);
        }
    }
}
