# frozen_string_literal: true

class CreateAuthTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :auth_tokens do |t|
      t.references :user, null: false, foreign_key: { to_table: :users, primary_key: :sub }, type: :string
      t.text :token, null: false

      t.timestamps
    end
    add_index :auth_tokens, :token, unique: true
  end
end
