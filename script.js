document.addEventListener("DOMContentLoaded", () => {

    const cart = [];
    const cartBtn = document.getElementById("cartBtn");
    const cartModal = document.getElementById("cartModal");
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const toast = document.getElementById("toast");

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", e => {
        const product = e.target.closest(".product-card");
        const name = product.dataset.name;
        const price = Number(product.dataset.price);

        cart.push({ name, price });
        updateCart();
        showToast(`${name} added to cart`);
    });
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


    cartBtn.addEventListener("click", () => {
        cartModal.style.display = "flex";
    });

    cartModal.addEventListener("click", e => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    const cartClose = document.getElementById("cartClose");

    cartClose.addEventListener("click", () => {
        cartModal.style.display = "none";
    });
    
    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            cartItems.innerHTML += `
                <li>
                    <span>${item.name}</span>
                    <span>R ${item.price}</span>
                </li>
            `;
        });

        cartTotal.textContent = total;
    }
    const detailsModal = document.getElementById("detailsModal");
    const detailsTitle = document.getElementById("detailsTitle");
    const detailsDescription = document.getElementById("detailsDescription");
    const detailsPrice = document.getElementById("detailsPrice");
    const detailsAddToCart = document.getElementById("detailsAddToCart");
    const detailsClose = document.getElementById("detailsClose");
    
    let selectedProduct = null;
    
    document.querySelectorAll(".view-details").forEach(btn => {
        btn.addEventListener("click", e => {
            const product = e.target.closest(".product-card");
    
            selectedProduct = {
                name: product.dataset.name,
                price: Number(product.dataset.price),
                description: product.dataset.description
            };
    
            detailsTitle.textContent = selectedProduct.name;
            detailsDescription.textContent = selectedProduct.description;
            detailsPrice.textContent = selectedProduct.price;
    
            detailsModal.style.display = "flex";
        });
    });
    
    detailsAddToCart.addEventListener("click", () => {
        if (selectedProduct) {
            cart.push(selectedProduct);
            updateCart();
            showToast(`${selectedProduct.name} added to cart`);
            detailsModal.style.display = "none";
        }
    });
    
    detailsClose.addEventListener("click", () => {
        detailsModal.style.display = "none";
    });
    
    detailsModal.addEventListener("click", e => {
        if (e.target === detailsModal) {
            detailsModal.style.display = "none";
        }
    });
    
    /* Reveal animation */
    const cards = document.querySelectorAll(".product-card");
    const reveal = () => {
        const trigger = window.innerHeight * 0.85;
        cards.forEach(card => {
            if (card.getBoundingClientRect().top < trigger) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener("scroll", reveal);
    reveal();
});
