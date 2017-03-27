defmodule V2.Api.WebhookVerificationController do
	use V2.Web, :controller

	@facebook_verify_token "nhdf3h34NO09JQnJ2u1o8986789YHibrf73hH"

	def verify_subscription(conn, params) do
		case params do
			%{"hub.verify_token" => @facebook_verify_token} ->
				send_success_response(conn, params)
			_ ->
				send_failure_response(conn, params)
		end

	end

	def send_success_response(conn, params) do
		conn |> send_resp(200, params["hub.challenge"])
	end

	def send_failure_response(conn, params) do
		conn |> send_resp(500, "Invalid verify token -" <> params["hub.verify_token"])
	end
end