defmodule V2.Api.FacebookRequestController do

	@fb_access_token "728356867267766%7CuWPPYMGHZ1jaSCy91XhfiJtupoU" # Will use env variable
	@events_url "https://graph.facebook.com/frandstheband/events" 

	@json_write_path "web/static/js/json/"

	use V2.Web, :controller

	def update_shows(conn) do
		response = HTTPotion.get!(@events_url, query: %{access_token: @fb_access_token})
		case response.status_code do
			200 -> write_shows(conn, response)
			_ -> raise "Bad HTTP response from Facebook events request"
		end
	end

	# Prob not secure
	def write_shows(conn, response) do
		File.write @json_write_path <> "events.json", response.body
		send_resp(conn, 200, "Events list updated" <> response.body)
	end
end
