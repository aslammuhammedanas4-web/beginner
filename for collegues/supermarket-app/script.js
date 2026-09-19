const products = [

    {
        id: 1,
        name: "Tomato",
        category: "Vegetables",
        price: 40,
        emoji: "🍅"
    },

    {
        id: 2,
        name: "Potato",
        category: "Vegetables",
        price: 35,
        emoji: "🥔"
    },

    {
        id: 3,
        name: "Apple",
        category: "Fruits",
        price: 120,
        emoji: "🍎"
    },

    {
        id: 4,
        name: "Banana",
        category: "Fruits",
        price: 60,
        emoji: "🍌"
    },

    {
        id: 5,
        name: "Milk",
        category: "Dairy",
        price: 60,
        emoji: "🥛"
    },

    {
        id: 6,
        name: "Bread",
        category: "Grocery",
        price: 45,
        emoji: "🍞"
    },

    {
        id: 7,
        name: "Biscuits",
        category: "Snacks",
        price: 30,
        emoji: "🍪"
    }
    function displayProducts(productList) {

    const productsContainer =
        document.querySelector(".products");

    productsContainer.innerHTML = "";

    productList.forEach(product => {

        productsContainer.innerHTML += `

            <div class="product">

                <div class="product-image">
                    ${product.emoji}
                </div>

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button
                    onclick="addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>

            </div>

        `;
    });
}
function searchProducts() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredProducts =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchText)
        );

    displayProducts(filteredProducts);
}
function filterCategory(category) {

    const filteredProducts =
        products.filter(product =>
            product.category === category
        );

    displayProducts(filteredProducts);
}

];let cart = [];

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "Total: ₹0";

        return;
    }


    let total = 0;


    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;


        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <p>₹${product.price} × ${product.quantity}</p>
            </div>

            <div>
                <button onclick="decreaseQuantity(${index})">−</button>

                <span>${product.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        `;

        cartItems.appendChild(item);
    });


    cartTotal.textContent =
        "Total: ₹" + total;
}


function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


function clearCart() {

    cart = [];

    updateCart();
    displayProducts(products);
}
