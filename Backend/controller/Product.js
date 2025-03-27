const { Product } = require("../model/Product");

//crud operations here
exports.createProduct = async (req, res) => {
  //this product we get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter={"category":["smartphones","laptops"]}
  // sort={_sort:"price",_order:"desc"}
  //pagination={_page:1,_limit=10}

  let condition = {};
  if (!req.query.admin) condition.deleted = { $ne: true };

  //deleted not equal to true
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  //using query so that each sort done on previously sorted query
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  //sorting price in asc or desc order
  if (req.query._sort && req.query._order)
    query = query.sort({ [req.query._sort]: req.query._order });

  const totalDocs = await totalProductsQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;

    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, //returns new modified doc and not original old one
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
