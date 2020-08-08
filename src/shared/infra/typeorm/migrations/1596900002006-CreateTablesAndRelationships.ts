import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTablesAndRelationships1596900002006
  implements MigrationInterface {
  name = 'CreateTablesAndRelationships1596900002006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parking_lot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "five_minuts_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fbd2ef5205aed868d6fbb0d8c80" UNIQUE ("name"), CONSTRAINT "UQ_fc792cc59ab75066a67aba6b437" UNIQUE ("email"), CONSTRAINT "UQ_07d3ea80d0e452d516f0b9a442b" UNIQUE ("phone"), CONSTRAINT "PK_b229703f7e14d1e22981fb35623" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "license_plate" character varying NOT NULL, "owner_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dc88e4ca12a5edd665e112bdd01" UNIQUE ("license_plate"), CONSTRAINT "PK_05e30f903c0920796ca4c4e5521" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "parking_lot"`);
  }
}
