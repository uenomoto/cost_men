# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


json_data = '
{
    "tags": [
        {
            "id": 1,
            "user_id": "yzkGEqm30FrLInzbZfLDpIs8ftXSgIEa@clients",
            "name": "ラーメン",
            "created_at": "2023-07-23T10:23:12.761+09:00",
            "updated_at": "2023-07-23T10:23:12.761+09:00"
        }
    ]
}
'

parsed_data = JSON.parse(json_data)

parsed_data["tags"].each do |tag_data|
  tag_data.delete("id")
  Tag.create!(tag_data)
end

json_data = '
{
    "suppliers": [
        {
            "id": 1,
            "user_id": "yzkGEqm30FrLInzbZfLDpIs8ftXSgIEa@clients",
            "name": "上野商店",
            "contact_info": "01234567890",
            "created_at": "2023-07-23T10:25:05.181+09:00",
            "updated_at": "2023-07-23T10:25:05.181+09:00"
        }
    ]
}
'

parsed_data = JSON.parse(json_data)

parsed_data["suppliers"].each do |supplier_data|
  supplier_data.delete("id")
  Supplier.create!(supplier_data)
end

json_data = '
{
    "ingredients": [
        {
            "id": 1,
            "supplier_id": 1,
            "buy_cost": "1000.0",
            "buy_quantity": "500.0",
            "unit": "g",
            "name": "サンプル材料",
            "created_at": "2023-07-23T10:27:36.529+09:00",
            "updated_at": "2023-07-23T10:27:36.529+09:00"
        }
    ]
}
'

parsed_data = JSON.parse(json_data)

parsed_data["ingredients"].each do |ingredient_data|
  ingredient_data.delete("id")
  Ingredient.create!(ingredient_data)
end
