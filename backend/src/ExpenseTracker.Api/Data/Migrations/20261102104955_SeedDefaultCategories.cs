using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExpenseTracker.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "CreatedAt", "Name", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, "#F97316", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Food", "Expense", null },
                    { 2, "#3B82F6", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Transport", "Expense", null },
                    { 3, "#EF4444", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Bills", "Expense", null },
                    { 4, "#EC4899", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Shopping", "Expense", null },
                    { 5, "#10B981", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Health", "Expense", null },
                    { 6, "#8B5CF6", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Entertainment", "Expense", null },
                    { 7, "#06B6D4", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Education", "Expense", null },
                    { 8, "#64748B", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Other", "Expense", null },
                    { 9, "#22C55E", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Salary", "Income", null },
                    { 10, "#14B8A6", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Freelance", "Income", null },
                    { 11, "#F59E0B", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Gift", "Income", null },
                    { 12, "#64748B", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Other", "Income", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 12);
        }
    }
}
