class CreateRecipeProcedures < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_procedures do |t|
      t.references :recipe, null: false, foreign_key: true
      t.text :procedure, null: false

      t.timestamps
    end
  end
end
