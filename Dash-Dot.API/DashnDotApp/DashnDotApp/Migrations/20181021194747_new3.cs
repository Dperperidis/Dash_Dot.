using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class new3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colors_ProductSizes_ProductSizeId",
                table: "Colors");

            migrationBuilder.DropIndex(
                name: "IX_Colors_ProductSizeId",
                table: "Colors");

            migrationBuilder.DropColumn(
                name: "ProductSizeId",
                table: "Colors");

            migrationBuilder.CreateIndex(
                name: "IX_ProductsSizeColors_ProductSizeId",
                table: "ProductsSizeColors",
                column: "ProductSizeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsSizeColors_ProductSizes_ProductSizeId",
                table: "ProductsSizeColors",
                column: "ProductSizeId",
                principalTable: "ProductSizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductsSizeColors_ProductSizes_ProductSizeId",
                table: "ProductsSizeColors");

            migrationBuilder.DropIndex(
                name: "IX_ProductsSizeColors_ProductSizeId",
                table: "ProductsSizeColors");

            migrationBuilder.AddColumn<int>(
                name: "ProductSizeId",
                table: "Colors",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Colors_ProductSizeId",
                table: "Colors",
                column: "ProductSizeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Colors_ProductSizes_ProductSizeId",
                table: "Colors",
                column: "ProductSizeId",
                principalTable: "ProductSizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
