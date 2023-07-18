class CreateSellingPrices < ActiveRecord::Migration[7.0]
  def change
    create_table :selling_prices do |t|
      t.references :recipe, null: false, foreign_key: true
      t.integer :price, null: false
      t.date :changed_date, null: false

      t.timestamps
    end
  end
end
