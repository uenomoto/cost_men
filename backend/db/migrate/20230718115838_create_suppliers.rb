class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.references :user, null: false, foreign_key: { to_table: :users, primary_key: :sub }, type: :string
      t.string :name, null: false
      t.string :contact_info

      t.timestamps
    end
    add_index :suppliers, [:user_id, :name], unique: true
  end
end
