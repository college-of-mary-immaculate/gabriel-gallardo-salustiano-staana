// backend/src/controllers/v1/homeController.js
class HomeController {
  constructor() {
    this.__controllerName = "Home";
  }

  indexAction(request, response) {
    response.status(200).json({
      message: "VotePH API is Running!",
      controller: this.__controllerName,
    });
    response.end();
  }
}

export default HomeController;
