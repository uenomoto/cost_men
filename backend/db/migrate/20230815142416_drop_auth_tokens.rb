class DropAuthTokens < ActiveRecord::Migration[7.0]
  def up
    drop_table :auth_tokens
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
