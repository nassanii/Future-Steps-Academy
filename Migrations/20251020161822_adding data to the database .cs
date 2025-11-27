using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addingdatatothedatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_expenses_Teachers_TeacherId",
                table: "expenses");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "expenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "Expenses_Category",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Salary" },
                    { 2, "Rent" },
                    { 3, "Utilities" },
                    { 4, "Office Supplies" },
                    { 5, "Maintenance" },
                    { 6, "Transportation" },
                    { 7, "Marketing" },
                    { 8, "Training & Development" },
                    { 9, "Software Subscriptions" },
                    { 10, "Internet & Communication" },
                    { 11, "Cleaning Services" },
                    { 12, "Taxes & Licenses" },
                    { 13, "Equipment Purchase" },
                    { 14, "Insurance" },
                    { 15, "Miscellaneous" }
                });

            migrationBuilder.InsertData(
                table: "expenses",
                columns: new[] { "Id", "Amount", "CategoryId", "Description", "ExpenseDate", "TeacherId" },
                values: new object[,]
                {
                    { 1, 1500.00m, 1, "Monthly salary for September", new DateTime(2025, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, 1000.00m, 2, "Office rent for October", new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null },
                    { 3, 300.00m, 3, "Electricity and water bills", new DateTime(2025, 10, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), null },
                    { 4, 150.00m, 4, "Stationery and paper materials", new DateTime(2025, 10, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), null },
                    { 5, 80.00m, 6, "Teacher transportation reimbursement", new DateTime(2025, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 6, 200.00m, 9, "Monthly software subscription fees", new DateTime(2025, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_expenses_Teachers_TeacherId",
                table: "expenses",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_expenses_Teachers_TeacherId",
                table: "expenses");

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Expenses_Category",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "expenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_expenses_Teachers_TeacherId",
                table: "expenses",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
