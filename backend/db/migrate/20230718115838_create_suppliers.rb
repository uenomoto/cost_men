# frozen_string_literal: true

class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.references :user, null: false, foreign_key: { to_table: :users, primary_key: :sub }, type: :string
      t.string :name, null: false
      t.string :contact_info

      t.timestamps
    end
    add_index :suppliers, %i[user_id name], unique: true
  end
end
