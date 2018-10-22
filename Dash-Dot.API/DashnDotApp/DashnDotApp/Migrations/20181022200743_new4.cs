using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class new4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ProductsSizeColors_ColorId",
                table: "ProductsSizeColors",
                column: "ColorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsSizeColors_Colors_ColorId",
                table: "ProductsSizeColors",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductsSizeColors_Colors_ColorId",
                table: "ProductsSizeColors");

            migrationBuilder.DropIndex(
                name: "IX_ProductsSizeColors_ColorId",
                table: "ProductsSizeColors");
        }
    }
}
