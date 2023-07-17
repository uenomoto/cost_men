# frozen_string_literal: true

# テスト終わったら削除
module Api
  module V1
    class PostsController < SecuredController
      # ブログ作成とさくじょは認証必要 ブログの一覧と詳細は認証不要という意味
      skip_before_action :authorize_request, only: %i[index show]

      def index
        posts = Post.all
        render json: posts
      end

      def show
        post = Post.find(params[:id])
        render json: post
      end

      def create
        # ユーザー認証
        post = @current_user.posts.build(post_params)

        if post.save
          render json: post
        else
          render json: post.errors, status: :unprocessable_entity
        end
      end

      def destroy
        post = Post.find(params[:id])
        post.delete
      end

      private

      def post_params
        params.permit(:title, :caption)
      end
    end
  end
end
