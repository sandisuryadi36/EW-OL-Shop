const AddCartButton = (props) => { 

    const addCartHandler = () => { 
        console.log("addCartHandler: ", props.product)
    }

    return (
        <div className="add-cart-button">
            <button onClick={addCartHandler} className="btn btn-sm btn-outline-success mt-2 pt-1 pb-1">
                <i className="bi bi-cart-plus me-1"></i>
                Add to Cart
            </button>
        </div>
    );
}

export default AddCartButton;