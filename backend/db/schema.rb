# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_18_120755) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "auth_tokens", force: :cascade do |t|
    t.string "user_id", null: false
    t.text "token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_auth_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_auth_tokens_on_user_id"
  end

  create_table "recipe_procedures", force: :cascade do |t|
    t.bigint "recipe_id", null: false
    t.text "procedure", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_recipe_procedures_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "user_id", null: false
    t.string "name", null: false
    t.decimal "total_cost", precision: 8, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "suppliers", force: :cascade do |t|
    t.string "user_id", null: false
    t.string "name", null: false
    t.string "contact_info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "name"], name: "index_suppliers_on_user_id_and_name", unique: true
    t.index ["user_id"], name: "index_suppliers_on_user_id"
  end

  create_table "users", primary_key: "sub", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.text "picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sub"], name: "index_users_on_sub", unique: true
  end

  add_foreign_key "auth_tokens", "users", primary_key: "sub"
  add_foreign_key "recipe_procedures", "recipes"
  add_foreign_key "recipes", "users", primary_key: "sub"
  add_foreign_key "suppliers", "users", primary_key: "sub"
end
