# frozen_string_literal: true

class Supplier < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }, length: { maximum: 50 }
  validates :contact_info, length: { maximum: 100 }

  scope :leatest, -> { order(created_at: :desc) }
end
