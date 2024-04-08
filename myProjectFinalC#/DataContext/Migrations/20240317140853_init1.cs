using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataContext.Migrations
{
    public partial class init1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Appeals",
                newName: "Question");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "Appeals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "Appeals");

            migrationBuilder.RenameColumn(
                name: "Question",
                table: "Appeals",
                newName: "Description");
        }
    }
}
