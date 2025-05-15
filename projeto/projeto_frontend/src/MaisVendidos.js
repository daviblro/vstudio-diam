function MaisVendidos() {
    return (
        <>
            <div>
                <h1 style={{ color: '#000000' }}>Mais Vendidos</h1>
                <div className="grid">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" alt="Produto 1" />
                        <p className="card-price">10.00€</p>
                        <h1 className="card-title">Produto 1</h1>
                        <div className="add-button">
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://via.placeholder.com/150" alt="Produto 2" />
                        <p className="card-price">20.00€</p>
                        <h1 className="card-title">Produto 2</h1>
                        <div className="add-button">
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MaisVendidos;