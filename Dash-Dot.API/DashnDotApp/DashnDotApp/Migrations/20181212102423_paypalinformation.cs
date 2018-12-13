using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class paypalinformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "PaypalInformation");

            migrationBuilder.AddColumn<string>(
                name: "PayerAddress",
                table: "PaypalInformation",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PayerCity",
                table: "PaypalInformation",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "PaypalInformation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayerAddress",
                table: "PaypalInformation");

            migrationBuilder.DropColumn(
                name: "PayerCity",
                table: "PaypalInformation");

            migrationBuilder.DropColumn(
                name: "State",
                table: "PaypalInformation");

            migrationBuilder.AddColumn<string>(
                name: "Amount",
                table: "PaypalInformation",
                nullable: false,
                defaultValue: "");
        }
    }
}
