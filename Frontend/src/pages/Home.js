import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  );
}

export default Home;
