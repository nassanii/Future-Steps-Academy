using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addingExpenseandExpenseCategorycalsses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_invoices_InvoiceId",
                table: "Payments");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_invoices_InvoiceId",
                table: "Payments",
                column: "InvoiceId",
                principalTable: "invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_invoices_InvoiceId",
                table: "Payments");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_invoices_InvoiceId",
                table: "Payments",
                column: "InvoiceId",
                principalTable: "invoices",
                principalColumn: "Id");
        }
    }
}
