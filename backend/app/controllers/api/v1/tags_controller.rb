# frozen_string_literal: true

module Api
  module V1
    class TagsController < SecuredController
      before_action :set_tag, only: %i[update destroy]
      before_action :authorize_request

      def index
        tags = current_user.tags.oldest
        render json: { tags: tags.map(&:as_json) }, status: :ok
      end

      def create
        tag = current_user.tags.build(tag_params)
        if tag.save
          render json: { tag: }, status: :created
        else
          render json: { errors: tag.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @tag.update(tag_params)
          render_tag
        else
          render_tag_errors
        end
      end

      def destroy
        @tag.destroy
        head :no_content
      end

      private

      def set_tag
        @tag = Tag.find(params[:id])
      end

      def tag_params
        params.require(:tag).permit(:name)
      end

      def render_tag_errors
        render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
      end

      def render_tag(status: :ok)
        render json: { tag: @tag.as_json }, status:
      end
    end
  end
end
