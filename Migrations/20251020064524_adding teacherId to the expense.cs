using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class addingteacherIdtotheexpense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expense_Expenses_Category_CategoryId",
                table: "Expense");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Expense",
                table: "Expense");

            migrationBuilder.RenameTable(
                name: "Expense",
                newName: "expenses");

            migrationBuilder.RenameIndex(
                name: "IX_Expense_CategoryId",
                table: "expenses",
                newName: "IX_expenses_CategoryId");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "expenses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "TeacherId",
                table: "expenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_expenses",
                table: "expenses",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_expenses_TeacherId",
                table: "expenses",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_expenses_Expenses_Category_CategoryId",
                table: "expenses",
                column: "CategoryId",
                principalTable: "Expenses_Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_expenses_Teachers_TeacherId",
                table: "expenses",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_expenses_Expenses_Category_CategoryId",
                table: "expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_expenses_Teachers_TeacherId",
                table: "expenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_expenses",
                table: "expenses");

            migrationBuilder.DropIndex(
                name: "IX_expenses_TeacherId",
                table: "expenses");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "expenses");

            migrationBuilder.RenameTable(
                name: "expenses",
                newName: "Expense");

            migrationBuilder.RenameIndex(
                name: "IX_expenses_CategoryId",
                table: "Expense",
                newName: "IX_Expense_CategoryId");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Expense",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Expense",
                table: "Expense",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Expense_Expenses_Category_CategoryId",
                table: "Expense",
                column: "CategoryId",
                principalTable: "Expenses_Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
