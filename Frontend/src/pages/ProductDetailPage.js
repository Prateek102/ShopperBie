import Navbar from "../features/navbar/Navbar";
import ProductOverView from "../features/product-list/components/ProductOverView";

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductOverView />
      </Navbar>
    </div>
  );
}

export default ProductDetailPage;
