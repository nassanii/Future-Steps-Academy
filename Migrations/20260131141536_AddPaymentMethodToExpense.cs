using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentMethodToExpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "expenses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 1,
                column: "PaymentMethod",
                value: null);

            migrationBuilder.UpdateData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 2,
                column: "PaymentMethod",
                value: null);

            migrationBuilder.UpdateData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 3,
                column: "PaymentMethod",
                value: null);

            migrationBuilder.UpdateData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 4,
                column: "PaymentMethod",
                value: null);

            migrationBuilder.UpdateData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 5,
                column: "PaymentMethod",
                value: null);

            migrationBuilder.UpdateData(
                table: "expenses",
                keyColumn: "Id",
                keyValue: 6,
                column: "PaymentMethod",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "expenses");
        }
    }
}
