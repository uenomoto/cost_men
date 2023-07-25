# frozen_string_literal: true

class SellingPrice < ApplicationRecord
  belongs_to :recipe

  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :changed_date, presence: true

  before_validation :set_changed_date

  # SellingPriceオブジェクト保存または編集更新(販売価格保存と更新)があるたびにこのメソッドが呼ばれる
  def set_changed_date
    self.changed_date = Time.zone.today
  end
end
