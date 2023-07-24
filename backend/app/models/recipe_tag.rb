# frozen_string_literal: true

class RecipeTag < ApplicationRecord
  belongs_to :recipe
  belongs_to :tag

  validates :recipe_id, uniqueness: { scope: :tag_id }

  def self.add_tags!(recipe_id, tag_ids)
    tag_ids.each do |tag_id|
      # レシピに対してタグは一意であるため、既に登録されているタグは登録しない↓
      create!(recipe_id:, tag_id:) unless exists?(recipe_id:, tag_id:)
    end
  end

  def self.delete_tag!(recipe_id, tag_id)
    tag = find_by!(recipe_id:, tag_id:)
    tag.destroy
  end
end
