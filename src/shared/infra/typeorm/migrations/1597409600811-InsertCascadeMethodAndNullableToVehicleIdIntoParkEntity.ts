import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertCascadeMethodAndNullableToVehicleIdIntoParkEntity1597409600811
  implements MigrationInterface {
  name = 'InsertCascadeMethodAndNullableToVehicleIdIntoParkEntity1597409600811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "park" DROP CONSTRAINT "FK_e6972921fc7463b0db420f72389"`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ALTER COLUMN "vehicle_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ADD CONSTRAINT "FK_e6972921fc7463b0db420f72389" FOREIGN KEY ("vehicle_id") REFERENCES "users_vehicles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "park" DROP CONSTRAINT "FK_e6972921fc7463b0db420f72389"`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ALTER COLUMN "vehicle_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ADD CONSTRAINT "FK_e6972921fc7463b0db420f72389" FOREIGN KEY ("vehicle_id") REFERENCES "users_vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
