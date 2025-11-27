using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FutureStepsAcademy.API.Migrations
{
    /// <inheritdoc />
    public partial class Addingprofitrepotcalsses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "profitReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneratedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalIncome = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalExpenses = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProfitOrLoss = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profitReports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "profitReportExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfitReportId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profitReportExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_profitReportExpenses_profitReports_ProfitReportId",
                        column: x => x.ProfitReportId,
                        principalTable: "profitReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_profitReportExpenses_ProfitReportId",
                table: "profitReportExpenses",
                column: "ProfitReportId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "profitReportExpenses");

            migrationBuilder.DropTable(
                name: "profitReports");
        }
    }
}
