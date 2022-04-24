import Input from "../../component/Input";

const AddProduct = () => { 
    return (
        <div>
            <h3>Add Product</h3>
            <form>
                <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" />
                <Input name="description" type="text" placeholder="Deskripsi Produk..." label="Deskripsi" />
                <Input name="category" type="select" placeholder="Kategori Produk..." label="Kategori">
                    <option value="">Pilih Kategori</option>
                    <option>Shirts</option>
                    <option>Jeans</option>
                    <option>Jackets</option>
                    <option>Sweaters</option>
                    <option>Accessories</option>
                </Input>
                <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" />
                <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" />
                <Input name="image" type="file" placeholder="Image Produk..." label="Image" />
                <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;