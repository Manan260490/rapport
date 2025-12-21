const express = require("express");
const PORT = 8000;
const shortid = require("shortid");
const request = require("request");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fs = require("fs");
const Razorpay = require("razorpay");
const OrderData = require("./models/orderData");
const Callback = require("./models/callback");
const FavourateServices = require("./models/favouriteServices");
const ClientReviews = require("./models/clientReviews");
const ClietnIcons = require("./models/clientIcons");
const EmailSubs = require("./models/emailSubscriptions");
const HomepageSeo = require("./models/homePageSeo");
//mail and message related
const mailer = require("./utils/mailer");
const questionInMindTemplate = require("./utils/questionInMindTemplate");
const callbackFormTemplate = require("./utils/callbackFormTemplate");
const orderConfirmationTemplate = require("./utils/orderConfirmationTemplate");
const messagingAdmin = require("./utils/messagingAdmin");
const messagingClient = require("./utils/messagingClient");
const otpEmailTemplate = require("./utils/otpEmailTemplate");

//auth
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const PasswordReset = require("./models/passwordReset");
//auth finished
const Blog = require("./models/blog");
const app = express();
const servicePage = require("./models/servicePage");
const CustomerResponse = require("./models/customerResponse");
const QuestionInMind = require("./models/questionInMind");
//middlewares
//file uploads
let multer = require("multer");
const dailyWages = require("./models/dailyWages");
const lawUpdates = require("./models/lawUpdates");
const { text, json } = require("body-parser");
const { Logger, Timestamp } = require("mongodb");
const clientIcons = require("./models/clientIcons");
const AnalyticsCodes = require("./models/analyticsCodes");
const lawUpdatesSeo = require("./models/lawUpdatesSeo");
const dailyWaigesSeo = require("./models/dailyWaigesSeo");
const MenuMaster = require("./models/menuMaster");
 
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//mongo db
// const mongoURI =
  // "mongodb+srv://admin-Abhinav:admin-Abhinav@cluster0-fz1t0.mongodb.net/rapport";
const mongoURI="mongodb+srv://narender:Password123@cluster0.6vjzcga.mongodb.net/RepoNew"
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database has been connected");
  });
mongoose.set("useCreateIndex", true);
//========================== User Schema start ==========================//
//user schema
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  access: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
  },
  contact_number: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  type: String,
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//============== end user Schema ====================== //
//=================== razor pay integration ==========//
let instance = new Razorpay({
  key_id: "rzp_live_AE6fUCVCZwKpZ8",
  key_secret: "usOX7BN9AOi14V7Q8RtJhC0R",
});
//============ done =======================//
const serviceSort = async () => {
  let services = await servicePage.find();
  console.log(services)
  let startAbusiness = [];
  let licenses = [];
  let labour = [];
  let HR = [];
  services.forEach(function (d) {
    if (d.category.replace(/\s/g, "").toLowerCase() === "startabusiness") {
      startAbusiness.push(d);
    } else if (
      d.category.replace(/\s/g, "").toLowerCase() === "licenses/registration"
    ) {
      licenses.push(d);
    } else if (
      d.category.replace(/\s/g, "").toLowerCase() === "labourlawcompliances"
    ) {
      labour.push(d);
    } else {
      HR.push(d);
    }
  });
  return [startAbusiness, licenses, labour, HR];
};
/* improved code */
// const serviceSort = async () => {
//   const services = await servicePage.find();

//   return services.reduce((acc, item) => {
//     const cat = item.category?.trim().toLowerCase() || "others";
//     const sub = item.subCategory?.trim().toLowerCase() || "general";

//     if (!acc[cat]) acc[cat] = {};
//     if (!acc[cat][sub]) acc[cat][sub] = [];

//     acc[cat][sub].push(item);
//     return acc;
//   }, {});
// };

app.get("/", async (req, res) => {
  req.session.returnTo = req.originalUrl;
  try {
    let [startAbusiness, licenses, labour, HR] = await serviceSort();
    let allFavourate = await FavourateServices.find();
    let clientRating = await ClientReviews.find();
    let clientIcons = await ClietnIcons.find();
    let latestFavourat = allFavourate[allFavourate.length - 1];
    let seoData = await HomepageSeo.find();
    res.render("index", {
      seoData: seoData[seoData.length - 1],
      clientRating,
      startAbusiness,
      licenses,
      labour,
      HR,
      clientIcons,
      user: req.user,
      latestFavourat,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/error");
  }
});

// app.get("/", async (req, res) => {
//   req.session.returnTo = req.originalUrl;

//   try {
//     const services = await serviceSort(); // FULL dynamic structure

//     const allFavourate = await FavourateServices.find();
//     const clientRating = await ClientReviews.find();
//     const clientIcons = await ClietnIcons.find();
//     const latestFavourat = allFavourate[allFavourate.length - 1];
//     const seoData = await HomepageSeo.find();

//     res.render("index", {
//       seoData: seoData[seoData.length - 1],
//       services,           // 👈 only this is needed — fully dynamic
//       clientRating,
//       clientIcons,
//       user: req.user,
//       latestFavourat,
//     });

//   } catch (error) {
//     console.error(error);
//     res.redirect("/error");
//   }
// });

let newOrder = {};
app.get("/refundPolicy", function (req, res) {
  res.render("CompanyPolicies/refundPolicy");
});
app.get("/termsOfService", function (req, res) {
  res.render("CompanyPolicies/termsOfService");
});
app.get("/privacyPolicy", function (req, res) {
  res.render("CompanyPolicies/privacyPolicy");
});
app.get("/customer/dashboard", async function (req, res) {
  let auth = req.isAuthenticated();
  req.session.returnTo = req.originalUrl;
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  if (auth) {
    let passedMessage = "";
    let orders = await CustomerResponse.find({ user: req.user.id });
    let details = await OrderData.find({ customer: req.user.id });
    let [startAbusiness, licenses, labour, HR] = await serviceSort();
    console.log("orders: " + orders);
    console.log("details: " + details);
    res.render("dashboard", {
      details,
      orders,
      passedMessage,
      startAbusiness,
      licenses,
      labour,
      HR,
      user: req.user,
      latestFavourat,
    });
  } else {
    res.redirect("/login/customer");
  }
});
//payment confirmation with razorpay
app.post("/customer/dashboard", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    try {
      request(
        `https://rzp_live_AE6fUCVCZwKpZ8:usOX7BN9AOi14V7Q8RtJhC0R@api.razorpay.com/v1/payments/${req.body.razorpay_payment_id}`,
        async function (error, response, body) {
          let amount = JSON.parse(body).amount / 100;
          let newresponse = new CustomerResponse({
            user: req.user.id,
            ...newOrder,
            timeStamp: new Date(),
            paymentStatus: "paid",
            amountPaid: amount,
          });
          let newPayment = new OrderData({
            customer: req.user.id,
            orderData: body,
            responseId: newresponse.id,
          });

          newOrder = {};
          await newPayment.save();
          await newresponse.save();

          let passedMessage = "Order Successfull";
          let [startAbusiness, licenses, labour, HR] = await serviceSort();
          let orders = await CustomerResponse.find({
            user: req.user.id,
          });
          let allFavourate = await FavourateServices.find();
          let latestFavourat = allFavourate[allFavourate.length - 1];
          let details = await OrderData.find({
            customer: req.user.id,
          });
          //============== sending the mail and the sms ======================== //
          //gettin data from the customer response object
          const {
            name,
            company_name,
            email,
            contact_number,
            nameOfService,
            billingAddress,
            state,
            city,
            serviceType,
          } = newresponse;

          //messaging them
          const template_id_client = "1207161476354771650";
          const template_id_admin = "1207161476362013856";
          let clientMessage = `Dear ${name},
            Your service order for ${nameOfService} has been received by us.  A dedicated compliance manager will get in touch with you soon to ensure a seamless experience and quality service.`;
          let adminMessage = `Service Order Received
            Customer Name: ${name}
            Mobile Number: ${contact_number}
            Service / Package Name: ${nameOfService} / ${serviceType}
            Amount Paid: ${amount}`;
          messagingAdmin(adminMessage, template_id_admin);
          messagingClient(contact_number, clientMessage, template_id_client);

          //mailing them
          const mailBody = orderConfirmationTemplate(
            nameOfService,
            name,
            company_name,
            billingAddress,
            state,
            city,
            serviceType,
            amount
          );
          await mailer(
            mailBody,
            email,
            "Service Purchase Successful!",
            "Order Confirmation"
          );

          // ================ rendering the dashboard page ================= //
          res.render("dashboard", {
            details,
            latestFavourat,
            startAbusiness,
            licenses,
            labour,
            HR,
            user: req.user,
            passedMessage,
            orders,
          });
        }
      );
    } catch (error) {
      res.redirect("/customer/dashboard");
    }
  } else {
    res.redirect("/login/customer");
  }
});

//paylater confirmation and then dashboard redirection
app.get("/customer/dashboard_paylater", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    try {
      let newresponse = new CustomerResponse({
        user: req.user.id,
        ...newOrder,
        timeStamp: new Date(),
        paymentStatus: "pending",
      });

      newOrder = {};
      await newresponse.save();

      let passedMessage = "Order Successfull";
      let [startAbusiness, licenses, labour, HR] = await serviceSort();
      let orders = await CustomerResponse.find({
        user: req.user.id,
      });
      let allFavourate = await FavourateServices.find();
      let latestFavourat = allFavourate[allFavourate.length - 1];
      let details = await OrderData.find({
        customer: req.user.id,
      });
      //============== sending the mail and the sms ======================== //
      //gettin data from the customer response object
      const {
        name,
        company_name,
        email,
        contact_number,
        nameOfService,
        billingAddress,
        state,
        city,
        serviceType,
      } = newresponse;
      let amount = 0;

      //messaging them
      const template_id_client = "1207161476354771650";
      const template_id_admin = "1207161476362013856";
      let clientMessage = `Dear ${name},
            Your service order for ${nameOfService} has been received by us.  A dedicated compliance manager will get in touch with you soon to ensure a seamless experience and quality service.`;
      let adminMessage = `Service Order Received
            Customer Name: ${name}
            Mobile Number: ${contact_number}
            Service / Package Name: ${nameOfService} / ${serviceType}
            Amount Paid: ${amount}`;
      messagingAdmin(adminMessage, template_id_admin);
      messagingClient(contact_number, clientMessage, template_id_client);

      //mailing them
      const mailBody = orderConfirmationTemplate(
        nameOfService,
        name,
        company_name,
        billingAddress,
        state,
        city,
        serviceType,
        amount
      );
      await mailer(
        mailBody,
        email,
        "Service Purchase Successful!",
        "Order Confirmation"
      );

      // ================ rendering the dashboard page ================= //
      res.render("dashboard", {
        details,
        latestFavourat,
        startAbusiness,
        licenses,
        labour,
        HR,
        user: req.user,
        passedMessage,
        orders,
      });
    } catch (error) {
      res.redirect("/customer/dashboard");
    }
  } else {
    res.redirect("/login/customer");
  }
});
//paying from dashboard with specific response id
app.get(
  "/CustomOrderForm/:cResponseId/:idOfService/:serviceType/:customerName/:address/:email/:contact_number/:state",
  async (req, res) => {
    let auth = req.isAuthenticated();
    if (auth) {
      try {
        try {
          let allPricing = await servicePage
            .findById(req.params.idOfService)
            .select({ pricingCards: 1, name: 1 });
          let pricing = allPricing.pricingCards[req.params.serviceType][0];
          const options = {
            amount: Number(pricing) * 100,
            currency: "INR",
            receipt: shortid.generate(), //any unique id
          };
          const response = await instance.orders.create(options);

          res.render("orderConfirmationPayLater", {
            nameOfService: allPricing.name,
            response,
            cResponseId: req.params.cResponseId,
            customer_data: {
              name: req.params.customerName,
              billingAddress: req.params.address,
              email: req.params.email,
              contact_number: req.params.contact_number,
              state: req.params.state,
            },
          });
          newOrder = {};
          newOrder = req.body;
        } catch (error) {
          console.error(error);
          res.redirect("/error");
        }
      } catch (error) {
        console.error(error);
        res.redirect("/error");
      }
    } else {
      res.redirect("/login/customer");
    }
  }
);
//paylater payment confirmation razorpay
app.post("/customer/PaylaterDashboard/:cResponseId", async (req, res) => {
  let auth = req.isAuthenticated();
  if (auth) {
    try {
      request(
        `https://rzp_live_AE6fUCVCZwKpZ8:usOX7BN9AOi14V7Q8RtJhC0R@api.razorpay.com/v1/payments/${req.body.razorpay_payment_id}`,
        async function (error, response, body) {
          let amount = JSON.parse(body).amount / 100;

          let customerResponse = await CustomerResponse.findById(
            req.params.cResponseId
          );

          customerResponse.paymentStatus = "paid";
          customerResponse.amountPaid = amount;
          let newPayment = new OrderData({
            customer: req.user.id,
            orderData: body,
            responseId: customerResponse.id,
          });

          await newPayment.save();
          await customerResponse.save();

          let passedMessage = "Order Successfull";
          let [startAbusiness, licenses, labour, HR] = await serviceSort();
          let orders = await CustomerResponse.find({
            user: req.user.id,
          });
          let allFavourate = await FavourateServices.find();
          let latestFavourat = allFavourate[allFavourate.length - 1];
          let details = await OrderData.find({
            customer: req.user.id,
          });
          //============== sending the mail and the sms ======================== //
          //gettin data from the customer response object
          const {
            name,
            company_name,
            email,
            contact_number,
            nameOfService,
            billingAddress,
            state,
            city,
            serviceType,
          } = customerResponse;

          //messaging them
          let clientMessage = `Dear ${name},
            Your service order for ${nameOfService} has been received by us.  A dedicated compliance manager will get in touch with you soon to ensure a seamless experience and quality service.`;
          let adminMessage = `Service Order Received
            Customer Name: ${name}
            Mobile Number: ${contact_number}
            Service / Package Name: ${nameOfService} / ${serviceType}
            Amount Paid: ${amount}`;
          messagingAdmin(adminMessage);
          messagingClient(contact_number, clientMessage);

          //mailing them
          const mailBody = orderConfirmationTemplate(
            nameOfService,
            name,
            company_name,
            billingAddress,
            state,
            city,
            serviceType,
            amount
          );
          await mailer(
            mailBody,
            email,
            "Service Purchase Successful!",
            "Order Confirmation"
          );

          // ================ rendering the dashboard page ================= //
          res.render("dashboard", {
            details,
            latestFavourat,
            startAbusiness,
            licenses,
            labour,
            HR,
            user: req.user,
            passedMessage,
            orders,
          });
        }
      );
    } catch (error) {
      res.redirect("/customer/dashboard");
    }
  } else {
    res.redirect("/login/customer");
  }
});
app.get("/blog", async (req, res) => {
  req.session.returnTo = req.originalUrl;
  let allBlogs = await Blog.find().sort({ timeStamp: -1 });
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  res.render("blog-grid", {
    startAbusiness,
    user: req.user,
    licenses,
    labour,
    HR,
    allBlogs,
    latestFavourat,
  });
});
app.get("/blogSingle/:slug", async (req, res) => {
  req.session.returnTo = req.originalUrl;
  let singleBlog = await Blog.findOne({
    slug: req.params.slug,
  });
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  res.render("post", {
    startAbusiness,
    user: req.user,
    licenses,
    labour,
    HR,
    singleBlog,
    latestFavourat,
  });
});
app.get("/services/:slug", async (req, res) => {
  req.session.returnTo = req.originalUrl;
  let pageData = await servicePage.findOne({ slug: req.params.slug });
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  let existingData = await AnalyticsCodes.find();
  let codes = existingData[existingData.length - 1];
  // console.log(pageData);
  if (pageData) {
    res.render("servicePage", {
      startAbusiness,
      licenses,
      labour,
      HR,
      ...pageData._doc,
      user: req.user,
      latestFavourat,
      codes,
    });
  } else {
    res.redirect("/error");
  }
});
app.get("/lawUpdates", async function (req, res) {
  req.session.returnTo = req.originalUrl;
  let updates = await lawUpdates.find();
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  let seoData = await lawUpdatesSeo.find();
  res.render("lawUpdates", {
    seoData: seoData[seoData.length - 1],
    startAbusiness,
    licenses,
    labour,
    HR,
    user: req.user,
    updates,
    latestFavourat,
  });
});
app.get("/minimumWages/:state", async function (req, res) {
  req.session.returnTo = req.originalUrl;
  let wages = await dailyWages.findOne({ state: req.params.state });
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  res.render("minimumWages", {
    startAbusiness,
    licenses,
    labour,
    HR,
    user: req.user,
    wages,
    latestFavourat,
  });
});
app.get("/minimumWagesSelector", async function (req, res) {
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  req.session.returnTo = req.originalUrl;
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let seoData = await dailyWaigesSeo.find();
  res.render("minimumWagesSelector", {
    seoData: seoData[seoData.length - 1],
    startAbusiness,
    licenses,
    labour,
    HR,
    user: req.user,
    latestFavourat,
  });
});
app.post("/servicesSearch", async function (req, res) {
  try {
    let searchedService = await servicePage.findOne({
      name: req.body.serviceSearch,
    });
    res.redirect(`/services/${searchedService.slug}`);
  } catch (error) {
    res.redirect(`/notFound`);
  }
});
app.post("/allServices", async function (req, res) {
  let allServices = await servicePage.find().select("name -_id");
  let json = JSON.stringify(allServices);
  res.end(json);
});
app.get("/orderForm/:id/:type", async function (req, res) {
  req.session.returnTo = req.originalUrl;
  let auth = req.isAuthenticated();
  if (auth) {
    try {
      let allFavourate = await FavourateServices.find();
      let latestFavourat = allFavourate[allFavourate.length - 1];
      let serviceId = req.params.id;
      let serviceType = req.params.type;
      let [startAbusiness, licenses, labour, HR] = await serviceSort();
      let allPricing = await servicePage
        .findById(serviceId)
        .select({ pricingCards: 1, name: 1 });
      let pricing = allPricing.pricingCards[serviceType][0];
      let passedMessage = req.query.message;
      res.render("orderForm", {
        startAbusiness,
        licenses,
        labour,
        HR,
        user: req.user,
        pricing,
        passedMessage,
        nameOfService: allPricing.name,
        idOfService: allPricing.id,
        serviceType,
        latestFavourat,
      });
    } catch (error) {
      console.error(error);
      res.redirect("/error");
    }
  } else {
    res.redirect("/register/customer");
  }
});
//payment route with razorpay
app.post("/orderForm", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    try {
      try {
        let allPricing = await servicePage
          .findById(req.body.idOfService)
          .select({ pricingCards: 1, name: 1 });
        let pricing = allPricing.pricingCards[req.body.serviceType][0];
        const options = {
          amount: Number(pricing) * 100,
          currency: "INR",
          receipt: shortid.generate(), //any unique id
        };
        const response = await instance.orders.create(options);
        res.render("orderConfermation", {
          nameOfService: allPricing.name,
          response,
          customer_data: req.body,
        });
        newOrder = {};
        newOrder = req.body;
      } catch (error) {
        console.error(error);
        res.redirect("/error");
      }
    } catch (error) {
      console.error(error);
      res.redirect("/error");
    }
  } else {
    res.redirect("/login/customer");
  }
});
app.post("/callback", async function (req, res) {
  try {
    let data = req.body;
    let newCall = new Callback({ ...data, timeStamp: new Date() });
    const { full_name, email, mobile } = data;
    //======================= start mailing and messaging ========================== //
    //messaging them
    let template_id_admin = "1207161476332074890";
    let template_id_client = "1207161476325994555";
    let clientMessage =
      "Thank you for reaching out to us. Our representative will contact you shortly .";
    let adminMessage = `Call back request received:
      Customer Name: ${full_name}
      Email Address: ${email}
      Mobile Number: ${mobile}`;
    messagingClient(mobile, clientMessage, template_id_client);
    messagingAdmin(adminMessage, template_id_admin);

    //mailing them
    const text = `Hello ${full_name}, Thanks for your inquiry. Our Advisory manager will get in touch with you shortly.`;
    const mailBody = callbackFormTemplate(full_name);
    await mailer(mailBody, email, text, "Callback request received.");
    //======================= end mailing ============================= //
    await newCall.save();
    res.end("Callback Request SuccessFull");
  } catch (error) {
    console.error(error);
    res.end("Unsuccessfull, please fill all the fields!");
  }
});
app.post("/questionForm", async function (req, res) {
  try {
    let newQues = new QuestionInMind({
      ...JSON.parse(req.body.data),
      timeStamp: new Date(),
    });
    await newQues.save();
    const { name, email, comapnyName, customerNumber, timeStamp, enquiryFor } =
      newQues;
    //================ sending the mail amd message=================== //
    //sending messages
    const template_id_customer = "1207161476305377591";
    const template_id_admin = "1207161476316256869";
    let clientMessage = `Thanks for your interest in "${enquiryFor}". A dedicated compliance manager will get in touch with you soon to ensure a seamless experience and quality service.`;
    let nowDate = new Date();
    let adminMessage = `"New Enquiry:
      date: ${nowDate} 
      Customer Name: ${name}
      Email Address: ${email}
      Mobile Number: ${customerNumber}
      Company Name: ${comapnyName}
      Enquiry for: ${enquiryFor}"
      `;
    //sending message to customer
    messagingClient(customerNumber, clientMessage, template_id_customer);
    //sending message to admin
    messagingAdmin(adminMessage, template_id_admin);

    //mailing them
    let mailBody = questionInMindTemplate(
      name,
      customerNumber,
      email,
      timeStamp,
      enquiryFor
    );

    await mailer(
      mailBody,
      email,
      "'Question in mind?' form submitted.",
      "'Question in mind?' form submitted."
    );
    //done sending the mail

    res.end("Done Sending the request!");
  } catch (error) {
    console.error(error);
    res.end("Please fill all the required fields!");
  }
});
app.get("/aboutUs", async function (req, res) {
  let allFavourate = await FavourateServices.find();
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  res.render("aboutUs", {
    latestFavourat,
    user: req.user,
    startAbusiness,
    licenses,
    labour,
    HR,
  });
});
app.post("/emailSubs", async function (req, res) {
  let email = req.body.email;
  let newemailSubs = new EmailSubs({
    email,
  });
  await newemailSubs.save();
  res.end("success");
});
app.get("/contactUs", async function (req, res) {
  let passedMessage = req.query.message;
  let allFavourate = await FavourateServices.find();
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  res.render("contactUs", {
    passedMessage,
    user: req.user,
    latestFavourat,
    startAbusiness,
    licenses,
    labour,
    HR,
  });
});
//custom payment function
app.get("/customPay", async function (req, res) {
  res.render("customPay");
});
app.post("/customPay", async function (req, res) {
  const options = {
    amount: Number(req.body.amount) * 100,
    currency: "INR",
    receipt: shortid.generate(), //any unique id
  };
  const response = await instance.orders.create(options);
  res.end(JSON.stringify(response));
});
app.post("/customPaymentCallback", function (req, res) {
  res.render("customPay", { passedMessage: "done" });
});

// ========================= Authentication start =================== //

//GET requset for login
app.get("/login/:type", async function (req, res) {
  let type = req.params.type;
  let passedMessage = req.query.message;
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  if (type === "customer") {
    res.render("login", {
      startAbusiness,
      licenses,
      labour,
      HR,
      user: req.user,
      passedMessage,
      latestFavourat,
    });
  } else if (type === "admin" || type === "employee") {
    res.render("adminPanel/authentication/login", {
      passedMessage,
      user: req.user,
      type,
    });
  }
});

//GET request for regsiter
app.get("/register/:type", async function (req, res) {
  let passedMessage = req.query.message;
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  if (req.params.type === "customer") {
    res.render("register", {
      startAbusiness,
      licenses,
      labour,
      HR,
      user: req.user,
      passedMessage,
      latestFavourat,
    });
  } else {
    res.render("adminPanel/authentication/register", {
      passedMessage,
      type: req.params.type,
    });
  }
});

// POST for the registration of the user
app.post("/register/:type", async function (req, res) {
  let auth = req.user;
  if (req.params.type === "employee") {
    if (auth && req.user.type === "admin") {
      const {
        first_name,
        last_name,
        username,
        password,
        contact_number,
        repassword,
      } = req.body;

      if (password === repassword) {
        User.register({ username: username }, password, function (err, user) {
          if (err) {
            console.log(err);
            var message = encodeURIComponent("Email Already Exists");
            res.redirect("/register/customer?message=" + message);
          } else {
            //================= messaging them ===================== //
            const template_id_customer = "1207161476342079165";
            const template_id_admin = "1207161476347860676";
            let clientMessage = `"Dear ${first_name},
                You have successfully registered with Rapport HR Solutions. Your registration details are: User ID: ${username} , password ${password}.
                URL: https://rapporthr.in/login/customer"
                `;
            let adminMessage = `New Customer Registered
                Customer Name: ${first_name} ${last_name}
                Email Address: ${username}
                Mobile Number: ${contact_number}
                
                `;
            messagingClient(
              contact_number,
              clientMessage,
              template_id_customer
            );
            messagingAdmin(adminMessage, template_id_admin);
            //=============== authenticating ====================== //
            passport.authenticate("local")(req, res, async function () {
              user.type = req.params.type;
              (user.contact_number = contact_number),
                (user.first_name = first_name),
                (user.last_name = last_name);
              await user.save();
              res.redirect("/adminPanel");
              res.redirect(req.session.returnTo || "/");
              delete req.session.returnTo;
            });
          }
        });
      } else {
        var message = encodeURIComponent("Passwords do not match!");
        res.redirect("/register/" + req.params.type + "?message=" + message);
      }
    } else {
      var message = encodeURIComponent("Not Enough Authority!");
      res.redirect("/register/" + req.params.type + "?message=" + message);
    }
  } else {
    const {
      first_name,
      last_name,
      username,
      password,
      contact_number,
      repassword,
    } = req.body;

    if (password === repassword) {
      User.register({ username: username }, password, function (err, user) {
        if (err) {
          console.log(err);
          var message = encodeURIComponent("Email Already Exists");
          res.redirect("/register/customer?message=" + message);
        } else {
          passport.authenticate("local")(req, res, async function () {
            user.type = req.params.type;
            user.contact_number = contact_number;
            user.first_name = first_name;
            user.last_name = last_name;
            await user.save();
            if (req.params.type === "admin") res.redirect("/adminPanel");
            res.redirect(req.session.returnTo || "/");
            delete req.session.returnTo;
          });
        }
      });
    } else {
      var message = encodeURIComponent("Passwords do not match!");
      res.redirect("/register/" + req.params.type + "?message=" + message);
    }
  }
});

// POST for the login of the user
app.post("/login/:type", async function (req, res) {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    if (user.type === req.params.type) {
      if (user.access) {
        const user = new User({
          username: req.body.username,
          password: req.body.password,
        });

        req.login(user, function (err) {
          if (err) {
            console.log(err);
          } else {
            passport.authenticate("local", function (err, user, info) {
              if (user) {
                if (
                  req.params.type === "admin" ||
                  req.params.type === "employee"
                ) {
                  res.redirect("/adminPanel");
                } else {
                  res.redirect(req.session.returnTo || "/");
                  delete req.session.returnTo;
                }
              } else {
                let message = encodeURIComponent(
                  "UserName Or Password is incorrect !"
                );
                req.logOut();
                res.redirect(
                  "/login/" + req.params.type + "?message=" + message
                );
              }
            })(req, res, function () {});
          }
        });
      } else {
        let message = encodeURIComponent(
          "Your access is blocked by the admin!"
        );
        res.redirect("/login/customer?message=" + message);
      }
    } else {
      let message = encodeURIComponent("you are supposed to login here!");
      res.redirect(`/login/${user.type}?message=` + message);
    }
  } else {
    let message = encodeURIComponent("Username or password is incorrect!");
    res.redirect("/login/" + req.params.type + "?message=" + message);
  }
});

app.get("/logout", function (req, res) {
  req.logOut();
  res.redirect(req.session.returnTo || "/");
});

//============= password reset ==============//
//getting the email page
app.get("/password-reset-email", async (req, res) => {
  let passedMessage = req.query.message;
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  res.render("passwordReset/PREnterEmail", {
    startAbusiness,
    licenses,
    labour,
    HR,
    user: req.user,
    passedMessage,
    latestFavourat,
  });
});
//getting the email data and generating a otp and sending the mail
app.post("/password-reset-email", async (req, res) => {
  let passedMessage = req.query.message;
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];

  const { email } = req.body;
  let user = await User.findOne({ username: email });
  if (user) {
    //generating a 5 digit random number
    let generatedOtp = Math.floor(Math.random() * 90000) + 10000;
    const newPasswordReset = new PasswordReset({
      user: user.id,
      otp: generatedOtp,
      startTime: new Date(),
    });
    await newPasswordReset.save();

    //sending the otp via email
    let mailBody = otpEmailTemplate(generatedOtp);
    await mailer(
      mailBody,
      email,
      "Password reset Rapport HR Solution",
      "Password reset Rapport HR Solution"
    );

    res.render("passwordReset/PREnterOtp", {
      startAbusiness,
      licenses,
      labour,
      HR,
      user: req.user,
      passwordResetId: newPasswordReset.id,
      passedMessage,
      latestFavourat,
    });
  } else {
    let message = encodeURIComponent(
      "we cannot find your account. If you are a customer please contact us."
    );
    res.redirect("/password-reset-email?message=" + message);
  }
});

//checking the otp and procedding
app.post("/otp-check", async (req, res) => {
  //boiler plate code
  let passedMessage = req.query.message;
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  //finished

  const { resetId, otp } = req.body;
  let requiredData = await PasswordReset.findById(resetId);
  let timeDifference = (new Date() - requiredData.startTime) / (1000 * 60);
  if (timeDifference > 5) {
    let message = encodeURIComponent("Otp Expired please try again!");
    res.redirect("/password-reset-email?message=" + message);
  } else {
    if (otp === requiredData.otp) {
      res.render("passwordReset/PRReenterPassword", {
        startAbusiness,
        licenses,
        labour,
        HR,
        user: req.user,
        passwordResetId: resetId,
        passedMessage: passedMessage,
        latestFavourat,
      });
    } else {
      let message = "Wrong OTP try again!";
      res.render("passwordReset/PREnterOtp", {
        startAbusiness,
        licenses,
        labour,
        HR,
        user: req.user,
        passwordResetId: resetId,
        passedMessage: message,
        latestFavourat,
      });
    }
  }
});

//reseting the password
app.post("/reset-password", async (req, res) => {
  //boiler plate code
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  //finished

  const { password, rePassword, resetId } = req.body;
  if (password !== rePassword) {
    let passedMessage = "Passwords do not match!";
    res.render("passwordReset/PRReenterPassword", {
      startAbusiness,
      licenses,
      labour,
      HR,
      user: req.user,
      passwordResetId: resetId,
      passedMessage,
      latestFavourat,
    });
  } else {
    let requiredResetData = await PasswordReset.findById(resetId);
    let requiredUser = await User.findById(requiredResetData.user);
    //changing th epassword
    let newPUser = await requiredUser.setPassword(password);
    await newPUser.save();
    //sending message and redirecting
    let message = encodeURIComponent(
      "password reset successful! Please login."
    );
    if (newPUser.type === "customer") {
      res.redirect("/login/customer?message=" + message);
    } else if (newPUser.type === "employee") {
      res.redirect("/login/employee?message=" + message);
    } else {
      res.redirect("/login/admin?message=" + message);
    }
  }
});

//======================= authentication end ======================= //
//========================== Admin panel ======================//
//====multer config=========//

//multer config for blog and service page
const pathForFiles = __dirname + "/public/uploads/";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathName = req.route.path.substring(1);
    if (pathName === "admin/seoFilesUpload") {
      cb(null, __dirname);
    } else {
      cb(null, __dirname + "/public/uploads");
    }
  },
  filename: function (req, file, cb) {
    let pathName = req.route.path.substring(1);
    if (pathName === "blogsGenerator") {
      cb(null, file.originalname.replace(/\s/g, ""));
    } else if (pathName === "admin/dailyWages") {
      cb(null, file.originalname.replace(/\s/g, ""));
    } else if (pathName === "admin/clientIcons") {
      cb(null, file.originalname.replace(/\s/g, ""));
    } else {
      cb(null, file.originalname.replace(/\s/g, ""));
    }
  },
});

let upload = multer({ storage });

//multer config related seo file upload
// let pathForSeoStorage = __dirname;
// let storageSeo = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file);

//     cb(null, __dirname);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname.replace(/\s/g, ""));
//   },
// });
// let uploadSeo = multer({ storageSeo });

//=====multer config end ======//
app.get("/adminPanel", async (req, res) => {
  let auth = req.isAuthenticated();
  let passedMessage = req.query.message;
  req.session.returnTo = req.originalUrl;
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let customers = await User.find({ type: "customer" });
      let employees = await User.find({ type: "employee" });
      let orders = await CustomerResponse.find();
      res.render("adminPanel/dashboard", {
        data: null,
        passedMessage,
        user: req.user,
        customers,
        employees,
        orders,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
// service page
app.get("/admin/servicePage", (req, res) => {
  let auth = req.isAuthenticated();
  let singleService;
  req.session.returnTo = req.originalUrl;
  if (auth && req.user.type === "admin") {
    res.render("adminPanel/serviceForm", {
      data: null,
      user: req.user,
      singleService: null,
    });
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/serviceEditor", async function (req, res) {
  let auth = req.isAuthenticated();
  let passedMessage = req.query.message;
  req.session.returnTo = req.originalUrl;
  if (auth) {
    try {
      let services = await servicePage.find();
      res.render("adminPanel/serviceEditor", {
        services,
        user: req.user,
        passedMessage,
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleServiceEditor/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let singleService = await servicePage.findById(req.params.id);
    res.render("adminPanel/serviceForm", {
      data: null,
      user: req.user,
      singleService,
    });
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleServiceDelete/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    await servicePage.deleteOne({ _id: req.params.id });
    let message = encodeURIComponent("Service Page Deleted Successfully!");
    res.redirect("/adminPanel?message=" + message);
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/websiteData", upload.array("image"), async (req, res) => {
  const {
    descriptionOfService,
    categoryOfService,
    submit_button_above,
    nameOfService,
    serviceurl,
    serviceTitleTag,
    serviceDescriptionTag,
    procedureImageAltTag,
    rapportStart,
    rapportSelect,
    rapportSuper,
    about_service,
    procedureName,
    procedureDescription,
    documents_required,
    eligibility,
    advantages,
    faqQuestion,
    faqAnswer,
    stepsName,
    stepsDescription,
  } = req.body;
  const servicePageObject = {
    category: categoryOfService,
    name: nameOfService,
    slug: serviceurl.replace(/\s/g, ""),
    descriptionOfService,
    titleMeta: serviceTitleTag,
    descriptionMeta: serviceDescriptionTag,
    pricingCards: { rapportStart, rapportSelect, rapportSuper },
    aboutService: about_service,
    procedure: { procedureName, procedureDescription, procedureImageAltTag },
    documentsRequired: documents_required,
    eligibility,
    advantages,
    steps: { stepsName, stepsDescription },
    faq: { faqQuestion, faqAnswer },
    filename: req.files.length !== 0 && req.files,
  };
  let service = await servicePage.findById(submit_button_above);
  if (service) {
    let toPush = { ...servicePageObject };

    if (req.files.length === 0) {
      delete toPush.filename;
    }
    await servicePage.findOneAndUpdate(
      { _id: service.id },
      { $set: toPush },
      { new: true }
    );
    let message = encodeURIComponent("Service Page updated Successfully!");
    res.redirect("/adminPanel?message=" + message);
  } else {
    let toPush = { ...servicePageObject };
    if (req.files.length === 0) {
      delete toPush.filename;
    }
    const newServicePage = new servicePage(servicePageObject);
    await newServicePage.save();
    let message = encodeURIComponent("Service Page Created Successfully!");
    res.redirect("/adminPanel?message=" + message);
  }
});

//seo file upload
app.get("/admin/seoFilesUpload", async (req, res) => {
  let auth = req.isAuthenticated();
  let passedMessage = req.query.message;
  if (auth) {
    res.render("adminPanel/seoUpload", {
      user: req.user,
      passedMessage,
    });
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/seoFilesUpload",
  upload.array("seoFiles"),
  async (req, res) => {
    let auth = req.isAuthenticated();
    if (auth) {
      let message = encodeURIComponent("file uploaded successfully");
      res.redirect("/admin/seoFilesUpload?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  }
);
//analytics links upload
app.get("/admin/analyticsUpload", async (req, res) => {
  let auth = req.isAuthenticated();
  let passedMessage = req.query.message;
  if (auth) {
    let existingData = await AnalyticsCodes.find();
    let codes = existingData[existingData.length - 1];
    res.render("adminPanel/analyticsCodesForm", {
      user: req.user,
      passedMessage,
      codes,
    });
  } else {
    res.redirect("/login/admin");
  }
});

app.post("/admin/analyticsUpload", async (req, res) => {
  let auth = req.isAuthenticated();
  if (auth) {
    const { googleTag, googleAnalytics, facebookPixel, googleWebmaster } =
      req.body;
    let requiredData = {};
    if (googleTag) requiredData.googleTag = googleTag;
    if (googleAnalytics) requiredData.googleAnalytics = googleAnalytics;
    if (facebookPixel) requiredData.facebookPixel = facebookPixel;
    if (googleWebmaster) requiredData.googleWebmaster = googleWebmaster;
    let newAnalytics = new AnalyticsCodes(requiredData);
    await newAnalytics.save();
    let message = encodeURIComponent("done uploading the code!");
    res.redirect("/admin/analyticsUpload?message=" + message);
  } else {
    res.redirect("/login/admin");
  }
});
//blog
app.get("/blogsGenerator", function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      res.render("adminPanel/blogForm", {
        user: req.user,
        passedMessage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/blogsGenerator", upload.array("image"), async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth && req.user.type === "admin") {
    let newBlog = new Blog({
      user: req.user.id,
      title: req.body.nameOfBlog,
      titleTag: req.body.titleTag,
      metaDescription: req.body.metaDescription,
      altImage: req.body.altImage,
      slug: req.body.nameOfBlog
        .replace(/\s/g, "-")
        .replace(/[^a-zA-Z^0-9\-]/g, ""),
      description: req.body.blog_description,
      timeStamp: new Date(),
      filename:
        req.files.length !== 0 && req.files[0].originalname.replace(/\s/g, ""),
    });
    await newBlog.save();
    let message = encodeURIComponent("Blog Successfully created!");
    res.redirect("/blogsGenerator?message=" + message);
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/deleteBlogs", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let blogs = await Blog.find().sort({ timeStamp: -1 });
      res.render("adminPanel/deleteBlogs", {
        user: req.user,
        passedMessage,
        blogs,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleBlogDelete/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      await Blog.deleteOne({ _id: req.params.id });
      let message = encodeURIComponent("Blog Deleted Successfully!");
      res.redirect("/admin/deleteBlogs?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleBlogEdit/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let singleBlog = await Blog.findById(req.params.id);
      let passedMessage = req.query.message;
      res.render("adminPanel/blogForm", {
        user: req.user,
        passedMessage,
        singleBlog,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/singleBlogEdit",
  upload.array("image"),
  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth && req.user.type === "admin") {
      let blogData = {
        user: req.user.id,
        title: req.body.nameOfBlog,
        titleTag: req.body.titleTag,
        metaDescription: req.body.metaDescription,
        altImage: req.body.altImage,
        slug: req.body.nameOfBlog
          .replace(/\s/g, "-")
          .replace(/[^a-zA-Z^0-9\-]/g, ""),
        description: req.body.blog_description,
        timeStamp: new Date(),
        filename:
          req.files.length !== 0 &&
          req.files[0].originalname.replace(/\s/g, ""),
      };

      if (req.files.length !== 0) delete blogData.filename;
      await Blog.findOneAndUpdate(
        { _id: req.body.blogId },
        { $set: blogData },
        { new: true }
      );
      let message = encodeURIComponent("Blog Updated Successfully!");
      res.redirect(
        `/admin/singleBlogEdit/${req.body.blogId}?message=` + message
      );
    } else {
      res.redirect("/login/admin");
    }
  }
);
//Task distributions
app.get("/admin/taskDistribution", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth && req.user.type === "admin") {
    let employees = await User.find({ type: "employee" });

    let customerResponses = await CustomerResponse.find().populate(
      "employeeAssigned"
    );

    res.render("adminPanel/taskDistribution", {
      user: req.user,
      employees,
      customerResponses,
    });
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/admin/taskDistribution", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth && req.user.type === "admin") {
    const { employeeId, responseId } = req.body;
    console.log(employeeId, responseId);
    let customerResponse = await CustomerResponse.findOne({
      _id: responseId,
    });
    customerResponse.employeeAssigned = employeeId;
    await customerResponse.save();
    res.end("done");
  }
});
app.get("/admin/customersAssigned", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let customersAssigned = await CustomerResponse.find({
        employeeAssigned: req.user.id,
      });
      let passedMessage = req.query.message;
      res.render("adminPanel/customersAssigned", {
        customersAssigned,
        user: req.user,
        passedMessage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/customerResponseInfo/:id", async function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let response = await CustomerResponse.findById(req.params.id);
      let passedMessage = req.query.message;
      res.render("adminPanel/customerResponseInfo", {
        user: req.user,
        response,
        passedMessage,
      });
    } else {
      res.redirect("/login/employee");
    }
  } else {
    res.redirect("/login/employee");
  }
});
app.post("/admin/paymentStatusUpdate", async function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let existingResponse = await CustomerResponse.findById(
        req.body.submitButton
      );
      existingResponse.paymentStatus = req.body.paymentStatus;
      existingResponse.save();
      // //====================== messaging them =================== //
      // let SMSmessage = `Dear ${existingResponse.name},
      //   Progress Status of your service ${existingResponse.nameOfService} has been updated as "${req.body.statusOfWork}".
      //   Please login to your account for more infomation.`;
      // messagingAdmin(SMSmessage);
      // messagingClient(existingResponse.contact_number, SMSmessage);
      // //====================== end =========================== //
      let message = encodeURIComponent("Status Updated Successfully!");
      res.redirect(
        `/admin/customerResponseInfo/${req.body.submitButton}?message=${message}`
      );
    } else {
      res.redirect("/login/employee");
    }
  } else {
    res.redirect("/login/employee");
  }
});
app.post("/admin/statusUpdate", async function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let existingResponse = await CustomerResponse.findById(
        req.body.submitButton
      );
      existingResponse.statusOfWork = req.body.statusOfWork;
      existingResponse.save();
      //====================== messaging them =================== //
      let SMSmessage = `Dear ${existingResponse.name},
        Progress Status of your service ${existingResponse.nameOfService} has been updated as "${req.body.statusOfWork}".
        Please login to your account for more infomation.`;
      messagingAdmin(SMSmessage);
      messagingClient(existingResponse.contact_number, SMSmessage);
      //====================== end =========================== //
      let message = encodeURIComponent("Status Updated Successfully!");
      res.redirect(
        `/admin/customerResponseInfo/${req.body.submitButton}?message=${message}`
      );
    } else {
      res.redirect("/login/employee");
    }
  } else {
    res.redirect("/login/employee");
  }
});

//Daily wages
app.get("/admin/dailyWages", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      res.render("adminPanel/dailyWagesForm", {
        user: req.user,
        passedMessage,
        singleWage: null,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/dailyWagesUpdate", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let wages = await dailyWages.find();
      res.render("adminPanel/dailyWagesEdit", {
        user: req.user,
        passedMessage,
        wages,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singWageEditor/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let singleWage = await dailyWages.findById(req.params.id);
      let passedMessage = req.query.message;
      res.render("adminPanel/dailyWagesForm", {
        user: req.user,
        passedMessage,
        singleWage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleWageDelete/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      await dailyWages.deleteOne({ _id: req.params.id });
      let message = encodeURIComponent("Wage Deleted Successfully!");
      res.redirect("/admin/dailyWagesUpdate?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/dailyWages",
  upload.array("ratesPdf"),
  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        const {
          effectiveDate,
          state_select,
          schedule,
          category,
          ratesPerMonth,
          ratesPerDay,
        } = req.body;
        //reducing the state string
        let stateReduced = state_select.toLowerCase().replace(/\s/g, "-");
        //collecting the data of the wages
        let wagesData = {
          schedule,
          category,
          effectiveDate,
          minimumRates: {
            ratesPerDay,
            ratesPerMonth,
          },
          filename:
            req.files.length !== 0 &&
            req.files[0].originalname.replace(/\s/g, ""),
        };
        let dailyWageObject = {
          state: stateReduced,
          user: req.user.id,
          allWages: [wagesData],
        };

        const existingWage = await dailyWages.findOne({ state: stateReduced });

        if (!existingWage) {
          let newWage = new dailyWages(dailyWageObject);
          await newWage.save();
          let message = encodeURIComponent("wage added successfully!");
          res.redirect("/admin/dailyWages?message=" + message);
        } else {
          existingWage.allWages.unshift(wagesData);
          existingWage.save();
          let message = encodeURIComponent("wage added successfully!");
          res.redirect("/admin/dailyWages?message=" + message);
        }
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  }
);
app.get("/admin/dailyWagesSeoForm", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let seoData = await dailyWaigesSeo.find();
      res.render("adminPanel/dailyWagesSeoForm", {
        seoData: seoData[seoData.length - 1],
        user: req.user,
        passedMessage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/dailyWagesSeoForm",

  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        const { titleTag, descriptionTag } = req.body;
        const newDailyWageSeo = new dailyWaigesSeo({
          titleTag,
          descriptionTag,
        });
        await newDailyWageSeo.save();
        let message = encodeURIComponent("Done");
        res.redirect("/admin/dailyWagesSeoForm?message=" + message);
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  }
);
//Law updates
app.get("/admin/lawUpdatesForm", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let SingleLawUpdate = null;
      res.render("adminPanel/lawUpdatesForm", {
        user: req.user,
        passedMessage,
        SingleLawUpdate,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/lawUpdatesFormUpdate", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let updates = await lawUpdates.find();
      res.render("adminPanel/lawUpdatesEditor", {
        user: req.user,
        passedMessage,
        updates,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleLawEditor/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let SingleLawUpdate = await lawUpdates.findById(req.params.id);
      let passedMessage = req.query.message;
      res.render("adminPanel/lawUpdatesForm", {
        user: req.user,
        passedMessage,
        SingleLawUpdate,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/singleLawDelete/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      await lawUpdates.deleteOne({ _id: req.params.id });
      let message = encodeURIComponent("Law Update  Deleted Successfully!");
      res.redirect("/adminPanel?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/lawUpdatesForm",
  upload.array("lawUpdatesPDF"),
  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        const { submit_button, department, authority, subject } = req.body;
        const newLawUpdate = new lawUpdates({
          user: req.user.id,
          department,
          authority,
          subject,
          filename:
            req.files.length !== 0 &&
            req.files[0].originalname.replace(/\s/g, ""),
        });

        let update = await lawUpdates.findById(submit_button);
        if (update) {
          let test = await servicePage.findOneAndUpdate(
            { _id: update.id },
            { $set: newLawUpdate },
            { new: true }
          );
          let message = encodeURIComponent("Done editing the update!");
          res.redirect("/adminpanel?message=" + message);
        } else {
          await newLawUpdate.save();
          let message = encodeURIComponent("Done Posting the update!");
          res.redirect("/admin/lawUpdatesForm?message=" + message);
        }
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  }
);
app.get("/admin/lawUpdatesSeoForm", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let seoData = await lawUpdatesSeo.find();
      res.render("adminPanel/lawUpdatesSeoForm", {
        seoData: seoData[seoData.length - 1],
        user: req.user,
        passedMessage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/lawUpdatesSeoForm",

  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        const { titleTag, descriptionTag } = req.body;
        const newLawUpdateSeo = new lawUpdatesSeo({
          titleTag,
          descriptionTag,
        });
        await newLawUpdateSeo.save();
        let message = encodeURIComponent("Done");
        res.redirect("/admin/lawUpdatesSeoForm?message=" + message);
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  }
);
//Home page seo
app.get("/admin/homepageSeoForm", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let seoData = await HomepageSeo.find();
      res.render("adminPanel/homepageSeoForm", {
        seoData: seoData[seoData.length - 1],
        user: req.user,
        passedMessage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/homepageSeoForm",

  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        const { titleTag, descriptionTag, h1tag } = req.body;
        const newLawUpdateSeo = new HomepageSeo({
          titleTag,
          descriptionTag,
          h1tag,
        });
        await newLawUpdateSeo.save();
        let message = encodeURIComponent("Done");
        res.redirect("/admin/homepageSeoForm?message=" + message);
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  }
);

//callback
app.get("/admin/callback", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let passedMessage = req.query.message;
      let callData = await Callback.find();

      res.render("adminPanel/callback", {
        user: req.user,
        passedMessage,
        callData,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/admin/callback", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let foundCall = await Callback.findById(req.body.CallDoneButton);
      foundCall.status = "Done";
      foundCall.save();
      let message = encodeURIComponent("Call update done!");
      res.redirect("/admin/callback?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/callbackDelete/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let foundCall = await Callback.findOneAndDelete({ _id: req.params.id });

      let message = encodeURIComponent("CallBack delete successfull.");
      res.redirect("/admin/callback?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});

//question in mind  form
app.get("/admin/haveAquestion", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let question = await QuestionInMind.find().sort({ timeStamp: -1 });
      let passedMessage = req.query.message;
      res.render("adminPanel/questionInMindForm", {
        user: req.user,
        question,
        passedMessage,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/questionInMindDelete/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let foundCall = await QuestionInMind.findOneAndDelete({
        _id: req.params.id,
      });

      let message = encodeURIComponent("CallBack delete successfull.");
      res.redirect("/admin/haveAquestion?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/admin/questionInMind", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let foundCall = await QuestionInMind.findById(req.body.CallDoneButton);
      foundCall.status = "Done";
      foundCall.save();
      let message = encodeURIComponent("Call update done!");
      res.redirect("/admin/haveAquestion?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
//favourite services
app.get("/admin/favouriteServices", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let passedMessage = req.query.message;
    if (req.user.type === "admin" || req.user.type === "employee") {
      let favourates = await FavourateServices.find();
      res.render("adminPanel/favouriteServices", {
        user: req.user,
        passedMessage,
        favourate: favourates[favourates.length - 1],
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/admin/favouriteServices", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let passedMessage = req.query.message;
    if (req.user.type === "admin" || req.user.type === "employee") {
      let newFavourate = new FavourateServices({
        user: req.user,
        favourates: req.body,
      });
      await newFavourate.save();
      let message = decodeURIComponent("Updated Successfully!");
      res.redirect("/admin/favouriteServices?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
//Customer reviews
app.get("/admin/clientReviews", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let passedMessage = req.query.message;
    if (req.user.type === "admin" || req.user.type === "employee") {
      res.render("adminPanel/clientReviews", {
        passedMessage,
        user: req.user,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post("/admin/clientReviews", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    if (req.user.type === "admin" || req.user.type === "employee") {
      let newReview = new ClientReviews({
        user: req.user.id,
        ...req.body,
      });
      await newReview.save();
      let message = encodeURIComponent("Review Added successfully!!");
      res.redirect("/admin/clientReviews?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/editClientReviewsForm", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let allReviews = await ClientReviews.find();
    let passedMessage = req.query.message;
    if (req.user.type === "admin" || req.user.type === "employee") {
      res.render("adminPanel/editClientReviews", {
        allReviews,
        passedMessage,
        user: req.user,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.get("/admin/editClientReviews/:id", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let message = encodeURIComponent("Successfully Deleted!");
    if (req.user.type === "admin" || req.user.type === "employee") {
      await ClientReviews.deleteOne({ _id: req.params.id });
      res.redirect("/admin/editClientReviewsForm?message=" + message);
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});

//clientIcons
app.get("/admin/clientIcons", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let passedMessage = req.query.message;
    if (req.user.type === "admin" || req.user.type === "employee") {
      res.render("adminPanel/clientIconsForm", {
        passedMessage,
        user: req.user,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
app.post(
  "/admin/clientIcons",
  upload.array("clientImage"),
  async function (req, res) {
    let auth = req.isAuthenticated();
    if (auth) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        let clientImageObject = new ClietnIcons({
          user: req.user.id,
          filename: req.files[0].originalname.replace(/\s/g, ""),
        });
        await clientImageObject.save();
        let message = encodeURIComponent("successfully uploaded the image!");
        res.redirect("/admin/clientIcons?message=" + message);
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  }
);
app.get("/admin/editClientIcons", async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      if (req.user.type === "admin" || req.user.type === "employee") {
        let passedMessage = req.query.message;
        let images = await clientIcons.find();
        res.render("adminPanel/editClientImages", {
          passedMessage,
          images,
          user: req.user,
        });
      } else {
        res.redirect("/login/admin");
      }
    } else {
      res.redirect("/login/admin");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/admin/error");
  }
});
app.get("/admin/deleteClientIcons/:id", async function (req, res) {
  try {
    let id = req.params.id;
    let files = await clientIcons.findById(id);
    fs.unlinkSync(pathForFiles + files.filename);
    await clientIcons.findByIdAndRemove(id);
    let message = encodeURIComponent("successfuly deleted");
    res.redirect("/admin/editClientIcons?message=" + message);
  } catch (error) {
    console.error(error);
    res.redirect("/admin/error");
  }
});

//email subs..
app.get("/admin/emailSubscriptions", async function (req, res) {
  let auth = req.isAuthenticated();
  if (auth) {
    let passedMessage = req.query.message;
    if (req.user.type === "admin" || req.user.type === "employee") {
      let emails = await EmailSubs.find();
      res.render("adminPanel/emailSubscriptions", {
        emails,
        passedMessage,
        user: req.user,
      });
    } else {
      res.redirect("/login/admin");
    }
  } else {
    res.redirect("/login/admin");
  }
});
  app.get("/admin/getMenuList", async (req, res) => {
    if (req.isAuthenticated() && (req.user.type === "admin" || req.user.type === "employee")) {
      const allMenus = await MenuMaster.find().lean();

      // Build nested structure for display
      const buildMenuTree = (menus, parent = null) => {
        return menus
          .filter(m => String(m.parent || '') === String(parent || ''))
          .map(m => ({
            ...m,
            children: buildMenuTree(menus, m._id)
          }));
      };

      const menuTree = buildMenuTree(allMenus);

      res.render("adminPanel/getMenuList", {
        menus: menuTree,
        allMenus,
        passedMessage: req.query.message,
        user: req.user
      });
    } else {
      res.redirect("/login/admin");
    }
  });


// Helper function to recursively build the tree
function buildMenuTree(menus, parentId = null) {
  return menus
    .filter(m => (m.parent ? m.parent.toString() === (parentId ? parentId.toString() : '') : parentId === null))
    .map(m => ({
      ...m,
      children: buildMenuTree(menus, m._id),
    }));
}


app.post("/admin/editMenu/:id", async (req, res) => {
  const { title, link, parent } = req.body;
  if (!title || !link) return res.status(400).send("Missing fields");

  await MenuMaster.findByIdAndUpdate(req.params.id, {
    title,
    link,
    parent: parent || null
  });

  res.status(200).send("Updated");
});

app.post("/admin/addMenu", async (req, res) => {
  try {
    const { title, link, parent } = req.body;

    const newMenu = new MenuMaster({
      title,
      link,
      parent: parent || null,
      isDisabled: false
    });

    await newMenu.save();
    res.redirect("/admin/getMenuList?message=Menu added successfully");
  } catch (err) {
    console.error("Error adding menu:", err);
    res.redirect("/admin/getMenuList?message=Error adding menu");
  }
});


app.post("/admin/deleteMenu/:id", async (req, res) => {
  const menu = await MenuMaster.findById(req.params.id);
  if (menu.parent) {
    await MenuMaster.findByIdAndUpdate(menu.parent, { $pull: { children: menu._id } });
  }
  await MenuMaster.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted");
});

app.post("/admin/toggleMenu/:id", async (req, res) => {
  const menu = await MenuMaster.findById(req.params.id);
  menu.isDisabled = !menu.isDisabled;
  await menu.save();
  res.status(200).send("Toggled");
});


app.get("/admin/addMenu", async (req, res) => {
  if (req.isAuthenticated() && (req.user.type === "admin" || req.user.type === "employee")) {
    const rootMenus = await MenuMaster.find({ parent: null }).populate({
      path: "children",
      populate: { path: "children" },
    });

    res.render("adminPanel/addMenu", { rootMenus, user: req.user });
  } else {
    res.redirect("/login/admin");
  }
});

app.post("/admin/addMenu", async (req, res) => {
  try {
    const { title, link, parent } = req.body;

    const newMenu = new MenuMaster({
      title,
      link,
      parent: parent || null,
    });

    await newMenu.save();

    if (parent) {
      await MenuMaster.findByIdAndUpdate(parent, {
        $push: { children: newMenu._id },
      });
    }

    res.status(200).send("Menu added");
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).send("Error");
  }
});



//404 routes
app.get("/admin/*", function (req, res) {
  res.render("adminPanel/404", { user: req.user });
});
// ================= admin panel finished ==================== //

app.get("*/sitemap.xml", function (req, res) {
  res.sendFile(__dirname + "/sitemap.xml");
});
app.get("*/robots.txt", function (req, res) {
  res.sendFile(__dirname + "/robots.txt");
});

app.get("*", async function (req, res) {
  let allFavourate = await FavourateServices.find();
  let latestFavourat = allFavourate[allFavourate.length - 1];
  let [startAbusiness, licenses, labour, HR] = await serviceSort();
  res.render("404", {
    startAbusiness,
    licenses,
    labour,
    HR,
    user: req.user,
    latestFavourat,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
