using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class add4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Products_ProductId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Products_ProductId",
                table: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Product");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Colors",
                columns: table => new
                {
                    ColorsId = table.Column<string>(nullable: false),
                    Color = table.Column<string>(nullable: true),
                    ColorOfColorId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colors", x => x.ColorsId);
                    table.ForeignKey(
                        name: "FK_Colors_Product_ColorOfColorId",
                        column: x => x.ColorOfColorId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Colors_ColorOfColorId",
                table: "Colors",
                column: "ColorOfColorId",
                unique: true,
                filter: "[ColorOfColorId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Product_ProductId",
                table: "Items",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Product_ProductId",
                table: "Photos",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Product_ProductId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Product_ProductId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Products",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Products_ProductId",
                table: "Items",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Products_ProductId",
                table: "Photos",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
