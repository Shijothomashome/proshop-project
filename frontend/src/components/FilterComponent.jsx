
import React from "react";
import { Form,Button } from "react-bootstrap";

const FilterComponent = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  selectedRating,
  onCategoryChange,
  onBrandChange,
  onRatingChange,
  onClearFilters
}) => {
  return (
    <div>
      <h2>Filters</h2>
      <Form.Group controlId="categoryFilter">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={onCategoryChange}
          className="bg-light rounded-0"
          style={ {borderColor: "#ddd"}}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="brandFilter">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          as="select"
          value={selectedBrand}
          onChange={onBrandChange}
          className="bg-light rounded-0"
          style={ {borderColor: "#ddd"}}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="ratingFilter">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="select"
          value={selectedRating}
          onChange={onRatingChange}
          className="bg-light rounded-0"
          style={ {borderColor: "#ddd"}}
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button className="mt-3 border-0 rounded-0" variant="secondary" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterComponent;
