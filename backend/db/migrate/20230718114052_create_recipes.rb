class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.references :user, null: false, foreign_key: { to_table: :users, primary_key: :sub }, type: :string
      t.string :name, null: false
      t.decimal :total_cost, null: false, precision: 8, scale: 2

      t.timestamps
    end
  end
end
