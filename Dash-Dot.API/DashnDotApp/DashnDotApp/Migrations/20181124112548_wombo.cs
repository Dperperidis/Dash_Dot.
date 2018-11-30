using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class wombo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lastname",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "ShoppingCarts",
                nullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "TotalCost",
                table: "Product",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "ShoppingCarts");

            migrationBuilder.DropColumn(
                name: "City",
                table: "ShoppingCarts");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "ShoppingCarts");

            migrationBuilder.DropColumn(
                name: "Lastname",
                table: "ShoppingCarts");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ShoppingCarts");

            migrationBuilder.DropColumn(
                name: "State",
                table: "ShoppingCarts");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "ShoppingCarts");

            migrationBuilder.AlterColumn<string>(
                name: "TotalCost",
                table: "Product",
                nullable: true,
                oldClrType: typeof(double));
        }
    }
}
