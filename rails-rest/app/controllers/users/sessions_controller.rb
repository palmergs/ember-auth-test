class Users::SessionsController < Devise::SessionsController

  respond_to :json

  def create
    Rails.logger.debug("In sessions controller create...")
    Rails.logger.debug("Request format was #{ request.format }")
    Rails.logger.debug("Request params are #{ params.inspect }")
    super do |user|

      if request.format.json?
        data = {
          token: user.authentication_token,
          email: user.email
        }
        Rails.logger.debug("render json and return.")
        render json: data, status: 201 and return
      end
    end
  end

  # before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
