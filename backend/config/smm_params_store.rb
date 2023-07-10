# frozen_string_literal: true

require 'aws-sdk-ssm'

ssm = Aws::SSM::Client.new(region: 'ap-northeast-1')

# master_key取得
resp = ssm.get_parameter(name: '/myapp/database/key', with_decryption: true)
ENV['RAILS_MASTER_KEY'] = resp.parameter.value

# 　DB情報取得
%w[host username password name].each do |key|
  resp = ssm.get_parameter(name: "/myapp/database/#{key}", with_decryption: true)
  ENV["DATABASE_#{key.upcase}"] = resp.parameter.value
end

# これでデバック
puts "key: #{ENV['RAILS_MASTER_KEY']}"
puts "DB:#{ENV['DATABASE_HOST']}"
puts "DB:#{ENV['DATABASE_NAME']}"
puts "DB:#{ENV['DATABASE_PASSWORD']}"
puts "DB:#{ENV['DATABASE_USERNAME']}"