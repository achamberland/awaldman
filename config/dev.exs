use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :v2, V2.Endpoint,
#  http: [port: 4000],
  http: [port: 4000],
  https: [port: 4443,
          otp_app: :v2,
          keyfile: "/etc/letsencrypt/live/aaronwaldman.com/privkey.pem",
          certfile: "/etc/letsencrypt/live/aaronwaldman.com/cert.pem" #,
          # cacertfile: System.get_env("AARONWALDMAN_SSL_INTERMEDIATE_CERT") # OPTIONAL Key for intermediate certificates
          ],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [node: ["node_modules/brunch/bin/brunch", "watch", "--stdin",
                    cd: Path.expand("../", __DIR__)]]


# Watch static and templates for browser reloading.
config :v2, V2.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

