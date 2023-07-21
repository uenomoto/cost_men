# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.references :user, null: false, foreign_key: { to_table: :users, primary_key: :sub }, type: :string
      t.string :name, null: false

      t.timestamps
    end
    add_index :tags, %i[user_id name], unique: true
  end
end
