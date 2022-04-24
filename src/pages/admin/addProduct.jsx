const AddProduct = () => { 
    return (
        <div>
            <h1>Add Product</h1>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control">
                        <option>Shirts</option>
                        <option>Jeans</option>
                        <option>Jackets</option>
                        <option>Sweaters</option>
                        <option>Accessories</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;