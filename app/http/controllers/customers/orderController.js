const Order = require("../../../models/order");

const moment = require("moment");

function orderController() {
  return {
    store(req, res) {
      //validate request

      const { phone, address } = req.body;

      if (!phone || !address) {
        req.flash("error", "All Fields are Required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order
        .save()
        .then((result) => {
          Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
            req.flash("success", "Order placed Successfully");
            delete req.session.cart;

            //Emit here ;_ server.js ko bhejo

            const eventEmitter = req.app.get("eventEmitter");

            eventEmitter.emit("orderPlaced", placedOrder);

            return res.redirect("/customer/orders");
          });
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment });
      //   console.log(orders);
    },

    async show(req, res) {
      const order = await Order.findById(req.params.id);
      //user authorised or not check here re => only see own order ...
      if (req.user._id.toString() === order.customerId.toString()) {
        //check log in user id ,,in mongo db id is object so we don't compare id directly...convert it into string first
        return res.render("customers/singleOrder", { order });
      }

      return res.redirect("/");
    },
  };
}

module.exports = orderController;
