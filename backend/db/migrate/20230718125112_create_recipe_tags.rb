# frozen_string_literal: true

class CreateRecipeTags < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_tags do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
    add_index :recipe_tags, %i[recipe_id tag_id], unique: true
  end
end
