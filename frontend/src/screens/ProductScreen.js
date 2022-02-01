import './ProductScreen.css'

const ProductScreen = () => {
  return (
    <div className="productscreen">
      <div className="productscreen__left">
        <div className="left__image">
          <img
            src=" https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1463&q=80"
            alt="product name"
          />
        </div>

        <div className="left__info">
          <p className="left__name">Product 1</p>
          <p>Price:rs500</p>
          <p>
            Description :Amet officia fugiat amet consequat irure do Lorem et
            veniam. Cillum consequat sit excepteur irure dolor occaecat qui. In
            adipisicing labore proident exercitation irure nisi exercitation
            incididunt Lorem anim reprehenderit do. Quis non sint amet quis elit
            fugiat officia. Nisi et aliqua sint ad dolore sunt elit aliquip est
            consectetur consectetur dolor. Dolor sint ipsum mollit consectetur
            pariatur ea laboris pariatur proident proident sint excepteur
            excepteur.
          </p>
        </div>
      </div>

      <div className="productscreen__right">
        <div className="right__info">
          <p>
            Price : <span> Rs 500</span>
          </p>
          <p>
            status: <span>In stock</span>
          </p>
          <p>
            Qty
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </p>
          <p>
            <button type="button">Add to cart</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
