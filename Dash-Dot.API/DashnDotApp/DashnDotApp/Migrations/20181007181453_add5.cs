using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class add5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colors_Product_ColorOfColorId",
                table: "Colors");

            migrationBuilder.DropIndex(
                name: "IX_Colors_ColorOfColorId",
                table: "Colors");

            migrationBuilder.DropColumn(
                name: "ColorOfColorId",
                table: "Colors");

            migrationBuilder.AddColumn<string>(
                name: "ColorOfColorId",
                table: "Product",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_ColorOfColorId",
                table: "Product",
                column: "ColorOfColorId",
                unique: true,
                filter: "[ColorOfColorId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Colors_ColorOfColorId",
                table: "Product",
                column: "ColorOfColorId",
                principalTable: "Colors",
                principalColumn: "ColorsId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Colors_ColorOfColorId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_ColorOfColorId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ColorOfColorId",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "ColorOfColorId",
                table: "Colors",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Colors_ColorOfColorId",
                table: "Colors",
                column: "ColorOfColorId",
                unique: true,
                filter: "[ColorOfColorId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Colors_Product_ColorOfColorId",
                table: "Colors",
                column: "ColorOfColorId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
