using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class code : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Messages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Messages",
                nullable: false,
                defaultValue: 0);
        }
    }
}
