using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class seedingpaymentsdaata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Payments",
                columns: new[] { "Id", "Amount", "Description", "PaymentDate", "PaymentType", "Status", "StudentId", "TeacherId" },
                values: new object[,]
                {
                    { 1, 1500.00m, "Tuition Fee for Spring 2024", new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tuition", "Completed", 1, 1 },
                    { 2, 200.00m, "Lab Fee for Biology 101", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lab Fee", "Pending", 2, 2 },
                    { 3, 300.00m, "Library Fine for Overdue Books", new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fine", "Completed", 3, 3 },
                    { 4, 500.00m, "Sports Facility Fee", new DateTime(2024, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Facility Fee", "Pending", 4, 4 },
                    { 5, 1200.00m, "Tuition Fee for Fall 2024", new DateTime(2024, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tuition", "Completed", 5, 5 },
                    { 6, 250.00m, "Lab Fee for Chemistry 101", new DateTime(2024, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lab Fee", "Pending", 6, 6 },
                    { 7, 150.00m, "Library Fine for Lost Book", new DateTime(2024, 7, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fine", "Completed", 7, 7 },
                    { 8, 400.00m, "Gym Membership Fee", new DateTime(2024, 8, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Membership Fee", "Pending", 8, 8 },
                    { 9, 1300.00m, "Tuition Fee for Spring 2024", new DateTime(2024, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tuition", "Completed", 9, 9 },
                    { 10, 300.00m, "Lab Fee for Physics 101", new DateTime(2024, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lab Fee", "Pending", 10, 10 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Payments",
                keyColumn: "Id",
                keyValue: 10);
        }
    }
}
