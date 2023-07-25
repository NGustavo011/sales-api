import { TableColumn, type MigrationInterface, type QueryRunner, TableForeignKey } from 'typeorm'

export class AddOrderIdToOrdersProducts1690301904585 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'order_id',
        type: 'integer',
        isNullable: true
      }))
    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersProductsOrder',
        columnNames: ['order_id'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder')
    await queryRunner.dropColumn('orders_products', 'order_id')
  }
}
