# frozen_string_literal: true

class ApplicationController < ActionController::API
  # エラーメッセージをフロント側で扱いやすい形、配列ではなくオブジェクトに変換する
  def format_errors(record)
    formatted_errors = {}
    record.errors.messages.each do |field, messages|
      formatted_errors[field] = messages
    end
    formatted_errors
  end
end
