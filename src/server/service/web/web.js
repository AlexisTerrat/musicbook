
module.exports = function(services) {
  var webserver;

  webserver.listen({ port: config.web.port });
  return webserver;
};

/**
 * the web service only handles the orchestration of middlewares & http stuff (including static part),
 * logic will be in the api service
 *
 * middleware flow:
 * logger (churchill)
 * authenticator (passport + cookies)
 * authorizer
 *
 * routes separated as following
 * public:
 * 	static routes
 * 	login/signup
 * private:
 * 	everything else => authorizer checks if user/:id is correct
 */
