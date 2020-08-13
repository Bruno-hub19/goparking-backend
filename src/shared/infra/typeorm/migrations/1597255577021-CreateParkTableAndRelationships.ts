import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateParkTableAndRelationships1597255577021
  implements MigrationInterface {
  name = 'CreateParkTableAndRelationships1597255577021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "park" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "vehicle_id" uuid NOT NULL, "parking_id" uuid NOT NULL, "payment_method" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_653802406812552d8de5f9a4047" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ADD CONSTRAINT "FK_f942ec95089f67f417beb11dc5e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ADD CONSTRAINT "FK_e6972921fc7463b0db420f72389" FOREIGN KEY ("vehicle_id") REFERENCES "users_vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" ADD CONSTRAINT "FK_5aa69bfb22c6e21bc5da2a489cd" FOREIGN KEY ("parking_id") REFERENCES "parking_lot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "park" DROP CONSTRAINT "FK_5aa69bfb22c6e21bc5da2a489cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" DROP CONSTRAINT "FK_e6972921fc7463b0db420f72389"`,
    );
    await queryRunner.query(
      `ALTER TABLE "park" DROP CONSTRAINT "FK_f942ec95089f67f417beb11dc5e"`,
    );
    await queryRunner.query(`DROP TABLE "park"`);
  }
}
