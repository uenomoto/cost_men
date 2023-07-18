class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.references :supplier, null: false, foreign_key: true
      t.decimal :buy_cost, null: false, precision: 8, scale: 2
      t.decimal :buy_quantity, null: false, precision: 8, scale: 2
      t.string :unit, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
