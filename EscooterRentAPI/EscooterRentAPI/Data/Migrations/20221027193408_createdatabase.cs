using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EscooterRentAPI.Data.Migrations
{
    public partial class createdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RentPoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Adress = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentPoints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ElectricScooters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaxDistance = table.Column<int>(type: "int", nullable: false),
                    PricePerDay = table.Column<double>(type: "float", nullable: false),
                    MaxSpeed = table.Column<int>(type: "int", nullable: false),
                    RentPointId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElectricScooters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElectricScooters_RentPoints_RentPointId",
                        column: x => x.RentPointId,
                        principalTable: "RentPoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkTimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartHours = table.Column<int>(type: "int", nullable: false),
                    StartMinutes = table.Column<int>(type: "int", nullable: false),
                    EndHours = table.Column<int>(type: "int", nullable: false),
                    EndMinutes = table.Column<int>(type: "int", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    RentPointId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkTimes_RentPoints_RentPointId",
                        column: x => x.RentPointId,
                        principalTable: "RentPoints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ElectricScooters_RentPointId",
                table: "ElectricScooters",
                column: "RentPointId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkTimes_RentPointId",
                table: "WorkTimes",
                column: "RentPointId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ElectricScooters");

            migrationBuilder.DropTable(
                name: "WorkTimes");

            migrationBuilder.DropTable(
                name: "RentPoints");
        }
    }
}
