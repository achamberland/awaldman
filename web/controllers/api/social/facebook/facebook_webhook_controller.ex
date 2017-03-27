defmodule V2.Api.FacebookWebhookController do
	use V2.Web, :controller

	def index(conn, params) do
		authenticate

		case params do
			%{"hub.mode" => "subscribe"} -> V2.Api.WebhookVerificationController.verify_subscription(conn, params)
		end	
	end

	def create(conn, params) do
		case params do
			%{"object" => "page"} -> handle_page_hook(conn)
			%{"object" => "user"} -> handle_user_hook
			%{"object" => "permissions"} -> handle_permissions_hook
			_ -> conn |> send_resp(204, "No action set for object " <> params[:object])
		end
	end

	# TODO: check X-Hub-Signature in the header
	def authenticate do
		true
	end

	# Handle Pages data
	# The "right" way to do this would be to use a database and update based on changes.
	# This just requests the json file and then saves it.
	def handle_page_hook(conn) do
		# Todo: check that shows have actually been updated before requesting
		V2.Api.FacebookRequestController.update_shows(conn)
	end

	# Handle User Feed data
	def handle_user_hook() do

	end

	# Handle Permissions data
	def handle_permissions_hook() do

	end
end
