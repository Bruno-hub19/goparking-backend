import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTablesAndInsertRelationship1596547302745
  implements MigrationInterface {
  name = 'CreateTablesAndInsertRelationship1596547302745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "license_plate" character varying NOT NULL, "owner_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dc88e4ca12a5edd665e112bdd01" UNIQUE ("license_plate"), CONSTRAINT "PK_05e30f903c0920796ca4c4e5521" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_vehicles" ADD CONSTRAINT "FK_9106c57b756e8d9d199ecb07b63" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_vehicles" DROP CONSTRAINT "FK_9106c57b756e8d9d199ecb07b63"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "users_vehicles"`);
  }
}
