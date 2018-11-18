using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class suggested : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Suggested",
                table: "Product",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Suggested",
                table: "Product");
        }
    }
}
