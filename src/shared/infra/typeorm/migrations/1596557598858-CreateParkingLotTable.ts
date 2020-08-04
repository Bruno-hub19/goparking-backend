import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateParkingLotTable1596557598858
  implements MigrationInterface {
  name = 'CreateParkingLotTable1596557598858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parking_lot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "five_minuts_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fbd2ef5205aed868d6fbb0d8c80" UNIQUE ("name"), CONSTRAINT "UQ_fc792cc59ab75066a67aba6b437" UNIQUE ("email"), CONSTRAINT "UQ_07d3ea80d0e452d516f0b9a442b" UNIQUE ("phone"), CONSTRAINT "PK_b229703f7e14d1e22981fb35623" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "parking_lot"`);
  }
}
