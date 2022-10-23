const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");
const homeController = require("../app/http/controllers/homeController");
const statusController = require("../app/http/controllers/admin/statusController");

//middlewares

const guest = require("../app/http/middleware/guest");
const Auth = require("../app/http/middleware/Auth");
const admin = require("../app/http/middleware/admin");

function initRoutes(app) {
  app.get("/", homeController().index);
  // (req,res)=>{
  //     res.render('home')

  // }
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);

  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index); //userid
  app.post("/update-cart", cartController().update);

  //Customers routes
  app.post("/orders", Auth, orderController().store);

  app.get("/customer/orders", Auth, orderController().index);

  // Admin Routes

  app.get("/admin/orders", admin, AdminOrderController().index);

  app.post("/admin/order/status", admin, statusController().update);
  //
}

// for export

module.exports = initRoutes;
