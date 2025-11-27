using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class seadingdatatothepills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "invoices",
                columns: new[] { "Id", "Balance", "DueDate", "InvoiceNo", "IssueDate", "Status", "StudentId", "TotalAmount" },
                values: new object[,]
                {
                    { 1, 1500.00m, new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-001", new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Issued", 1, 1500.00m },
                    { 2, 500.00m, new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-002", new DateTime(2024, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "PartiallyPaid", 2, 2000.00m },
                    { 3, 0.00m, new DateTime(2024, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-003", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Paid", 3, 1800.00m },
                    { 4, 2200.00m, new DateTime(2024, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-004", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Issued", 4, 2200.00m },
                    { 5, 1600.00m, new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-005", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Issued", 5, 1600.00m },
                    { 6, 1900.00m, new DateTime(2024, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-006", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Issued", 6, 1900.00m },
                    { 7, 0.00m, new DateTime(2024, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-007", new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Paid", 7, 2100.00m },
                    { 8, 1700.00m, new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-008", new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Issued", 8, 1700.00m },
                    { 9, 800.00m, new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-009", new DateTime(2024, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "PartiallyPaid", 9, 2300.00m },
                    { 10, 2400.00m, new DateTime(2024, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "INV-010", new DateTime(2024, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Issued", 10, 2400.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "invoices",
                keyColumn: "Id",
                keyValue: 10);
        }
    }
}
