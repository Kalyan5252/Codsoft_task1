const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./../../models/productModel");
// const Review = require('./../../models/reviewModel');
// const User = require('./../../models/userModel');

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// console.log(db);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("Established a DB Connection....");
  })
  .catch((err) => console.log("Error: ", err));

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Product.create(products);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
