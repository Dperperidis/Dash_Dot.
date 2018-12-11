using Microsoft.EntityFrameworkCore.Migrations;

namespace DashnDotApp.Migrations
{
    public partial class orderSeq : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "orders");

            migrationBuilder.CreateSequence<int>(
                name: "MySequence",
                schema: "orders",
                startValue: 1000L);

            migrationBuilder.AlterColumn<int>(
                name: "OrderNo",
                table: "Orders",
                nullable: false,
                defaultValueSql: "NEXT VALUE FOR orders.MySequence",
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "MySequence",
                schema: "orders");

            migrationBuilder.AlterColumn<string>(
                name: "OrderNo",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int),
                oldDefaultValueSql: "NEXT VALUE FOR orders.MySequence");
        }
    }
}
