# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: false do |t|
      t.string :sub, null: false, primary_key: true
      t.string :name, null: false
      t.text :picture

      t.timestamps
    end
    add_index :users, :sub, unique: true
  end
end
