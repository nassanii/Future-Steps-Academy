using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addingitems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "invoiceItems",
                columns: new[] { "Id", "Amount", "Description", "InvoiceId" },
                values: new object[,]
                {
                    { 1, 1200.00m, "Tuition Fee - First Semester", 1 },
                    { 2, 200.00m, "Laboratory Fee", 1 },
                    { 3, 100.00m, "Library Access Fee", 1 },
                    { 4, 1600.00m, "Tuition Fee - First Semester", 2 },
                    { 5, 250.00m, "Sports Activities Fee", 2 },
                    { 6, 150.00m, "Transportation Fee", 2 },
                    { 7, 1400.00m, "Tuition Fee - First Semester", 3 },
                    { 8, 300.00m, "Laboratory Fee", 3 },
                    { 9, 100.00m, "Textbooks Fee", 3 },
                    { 10, 1800.00m, "Tuition Fee - Second Semester", 4 },
                    { 11, 300.00m, "Advanced Laboratory Fee", 4 },
                    { 12, 100.00m, "Extracurricular Activities Fee", 4 },
                    { 13, 1300.00m, "Tuition Fee - Second Semester", 5 },
                    { 14, 200.00m, "Library Access Fee", 5 },
                    { 15, 100.00m, "Examination Fee", 5 },
                    { 16, 1500.00m, "Tuition Fee - Second Semester", 6 },
                    { 17, 250.00m, "Cultural Activities Fee", 6 },
                    { 18, 150.00m, "Transportation Fee", 6 },
                    { 19, 1700.00m, "Tuition Fee - Second Semester", 7 },
                    { 20, 250.00m, "Laboratory Fee", 7 },
                    { 21, 150.00m, "Textbooks Fee", 7 },
                    { 22, 1400.00m, "Tuition Fee - Second Semester", 8 },
                    { 23, 200.00m, "Library Access Fee", 8 },
                    { 24, 100.00m, "Activity Fee", 8 },
                    { 25, 1900.00m, "Tuition Fee - Second Semester", 9 },
                    { 26, 300.00m, "Advanced Laboratory Fee", 9 },
                    { 27, 100.00m, "Transportation Fee", 9 },
                    { 28, 2000.00m, "Tuition Fee - Third Semester", 10 },
                    { 29, 250.00m, "Sports Activities Fee", 10 },
                    { 30, 150.00m, "Laboratory Fee", 10 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "invoiceItems",
                keyColumn: "Id",
                keyValue: 30);
        }
    }
}
