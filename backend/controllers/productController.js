import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT); // number of products per page

  const { keyword, category, brand, rating } = req.query; // Get the filter parameters from the query string as well as the pageNumber and keyword
  const page = Number(req.query.page) || 1
  
  let aggregationPipeline = [];

  // Match stage to filter products based on keyword
  if (keyword) {
    //  eg Output: keyword = "phone pro"
    const searchTerms = keyword.split(" "); // eg Output: searchTerms = [ 'phone', 'pro' ]
    const regexPatterns = searchTerms.map((term) => new RegExp(term, "i")); // eg Output: regexPatterns = [ /phone/i, /pro/i ]
    aggregationPipeline.push({
      $match: { name: { $in: regexPatterns } }, // { $match: { name: { $in: [ /phone/i, /pro/i ] } } }
    });
  }

  // Match stage to filter products based on category, brand, and rating
  if (category) {
    aggregationPipeline.push({
      $match: { category },
    });
  }
  if (brand) {
    aggregationPipeline.push({
      $match: { brand },
    });
  }
  if (rating) {
    aggregationPipeline.push({
      $match: { rating: { $gte: Number(rating) } },
    });
  }

  // Count documents matching the criteria (for pagination)
  aggregationPipeline.push({
    $count: "total",
  });
  //=>eg output -- this is an example of how aggregation pipeline looks like
  //        [
  //           { $match: { name: { $in: [ /phone/i, /pro/i ] } } }
  //           { '$match': { category: 'Electronics' } },
  //           { '$match': { brand: 'Sony' } },
  //           { '$match': { rating: [Object] } },
  //           { '$count': 'total' }
  //        ]

  const countResult = await Product.aggregate(aggregationPipeline);
  //=> eg output:- assume if there is 13 documents found for the matching filter then => [ { total: 13 } ] or if no documents found for the matching query  => [] empty array
  // Calculate total number of documents
  const count = countResult.length > 0 ? countResult[0].total : 0;
  //Eg:  [ { total: 13 } ]
  const pages = Math.ceil(count / pageSize); // total number of pages based on number of documents per page

  aggregationPipeline.pop(); // Remove $count stage
  aggregationPipeline.push({
    $skip: (page - 1) * pageSize,
  });
  aggregationPipeline.push({
    $limit: pageSize,
  });
 
 


  const products = await Product.aggregate(aggregationPipeline);

  const categories = await Product.distinct("category");
  const brands = await Product.distinct("brand");
  res.json({ products, page, pages, categories, brands, count });
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find((review) => {
      return review.user.toString() === req.user._id.toString();
    });
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    // overall rating
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Get top rated products - for carousel
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3); // sorts the documents based on the rating field in descending order (-1), meaning that the documents with the highest rating will appear first in the result.
  res.status(200).json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
