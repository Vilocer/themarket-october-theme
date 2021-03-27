// Function to fast show mini cart dropdown
function showMiniCart() {
    const minicartLink = document.getElementById('cartDropdownMenuLink');
    const minicartDropdown = new mdb.Dropdown(minicartLink);
    minicartDropdown.show();
}

// Add ProductOffer to cart via ajax
$(document).on('click','.add-to-cart-btn' , function(e) {
    e.preventDefault();

    let addProductId = $(this).data('product-id')
        quantity = 1;

    let cart = $.request('Cart::onGetData').done( function() {
        for (key in cart.responseJSON.position) {
            let product_id = cart.responseJSON.position[key].item_id
                product_quantity = cart.responseJSON.position[key].quantity;

            if (product_id == addProductId) {
                quantity = product_quantity + 1;
            }
        }

        let data = {
            'cart': [
            {'offer_id': addProductId, 'quantity': quantity}
            ]
        };
        
        $.request('Cart::onAdd', {
            'data': data,
            'update': {'mini-cart/mini-cart': '.mini-cart-wrapper', 'cart/cart': '.cart-wrapper'}
        }).done(function() {
            showMiniCart();
        });

    });
});

// Remove ProductOffer from cart via ajax
$(document).on('click','.remove-from-cart-btn' , function(e) {
    e.preventDefault();

    let data = {
        'cart': [$(this).data('product-id')],
    }

    $.request('Cart::onRemove', {
        'data': data,
        'update': {'mini-cart/mini-cart': '.mini-cart-wrapper', 'cart/cart': '.cart-wrapper'}
    }).done(function() {
        showMiniCart();
    });
});


// Remove ProductOffer from cart page via ajax
$(document).on('click','.remove-from-cart-page-btn' , function(e) {
    e.preventDefault();

    let data = {
        'cart': [$(this).data('product-id')],
    }

    $.request('Cart::onRemove', {
        'data': data,
        'update': {'mini-cart/mini-cart': '.mini-cart-wrapper', 'cart/cart': '.cart-wrapper'}
    });
});


// Change Productoffer quantity via ajax
function changeCartPositionQuantity(quantity, inputElemet) {
    let $this = $(inputElemet)
        data = {'cart': [
                {'offer_id': $this.parent().children('.change-quantity-input').data('product-id'), 'quantity': quantity}
            ]
        };
    
    let response = $.request('Cart::onUpdate', {
        'data': data,
        'update': {'mini-cart/mini-cart': '.mini-cart-wrapper', 'cart/cart': '.cart-wrapper'}
    }); 
}




// Clear Cart via ajax
$(document).on('click','.clear-cart-btn' , function(e) {
    e.preventDefault();

    $.request('Cart::onClear', {
        'update': {'mini-cart/mini-cart': '.mini-cart-wrapper', 'cart/cart': '.cart-wrapper'}
    });
});