using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addinginvocies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "Payments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Method",
                table: "Payments",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "invoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    InvoiceNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IssueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_invoices_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "invoiceItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invoiceItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_invoiceItems_invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_InvoiceId",
                table: "Payments",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_invoiceItems_InvoiceId",
                table: "invoiceItems",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_invoices_StudentId",
                table: "invoices",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_invoices_InvoiceId",
                table: "Payments",
                column: "InvoiceId",
                principalTable: "invoices",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_invoices_InvoiceId",
                table: "Payments");

            migrationBuilder.DropTable(
                name: "invoiceItems");

            migrationBuilder.DropTable(
                name: "invoices");

            migrationBuilder.DropIndex(
                name: "IX_Payments_InvoiceId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Method",
                table: "Payments");

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
    }
}
