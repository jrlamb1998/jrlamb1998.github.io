// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, flavor, color, size, count) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.flavor = flavor;
    this.size = size;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, flavor, color, size, count) {
    for(var item in cart) {
      if(cart[item].name === name && cart[item].color === color && cart[item].size === size && cart[item].flavor === flavor) {
        cart[item].count += count;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, flavor, color, size, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, price, flavor, color, size, count) {
    for(var i in cart) {
      if (cart[item].name === name && cart[item].color === color && cart[item].size === size && cart[item].flavor === flavor) {
        cart[i].count = count;
        break;
      } 
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name, color, flavor, size) {
      for(var item in cart) {
        if(cart[item].name === name && cart[item].flavor === flavor && cart[item].size === size && cart[item].color === color) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name, color, flavor, size) {
    for(var item in cart) {
      if(cart[item].name === name && cart[item].flavor === flavor && cart[item].size === size && cart[item].color === color) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 

var addToCartButtons = document.getElementsByClassName('add-to-cart-btn')
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i]
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    
    var name = shopItem.getElementsByClassName('item_name')[0].innerText
    var price = shopItem.getElementsByClassName('item_price')[0].innerText
    price = parseFloat(price);
    var flavor = shopItem.getElementsByClassName('item_flavor')
    var color = "";
    if (flavor.length > 0) {
      flavor = flavor[0].value
    } else {
      flavor = "";
    }
    var size = shopItem.getElementsByClassName('item_size')
    if (size.length > 0) {
      size = size[0].value
    } else {
      size = "";
    }
    var count = shopItem.getElementsByClassName('item_quantity')[0].value
    count = parseInt(count);
    shoppingCart.addItemToCart(name, price, flavor, color, size, count)
    displayCart()
}

function displayCart() {
  $('.total-count').html(shoppingCart.totalCount());
  if (shoppingCart.totalCount() === 0) {
    $('.cart-items').html(`<div class="initial-content">Looks like your cart is empty</div>`);
  } else {
    var cartArray = shoppingCart.listCart();
    var output = `
    <table>
    <tr>
    <th>Name</th>
    <th>Details</th>
    <th>Price</th>
    <th>Quantity</th>
    <th></th>
    </tr>`;
    for(var i in cartArray) {
      output += "<tr class='cart-row'>"
      + "<td class='item-nam'>" + cartArray[i].name + "</td>" 
      + "<td class='item-details'>" + cartArray[i].color + "  " + cartArray[i].size 
      + "  " + cartArray[i].flavor + "</td>" 
      + "<td class='item-pri'>" + "$" + cartArray[i].price + "</td>"
      + "<td class='item-quant'>" + cartArray[i].count + "</td>"
      + `<td><button class="btn remove-item-btn">REMOVE</button></td>`
      + "</tr>";
      /*
      + `<div class="cart-quantity cart-column">`
      + `<input class="cart-quantity-input" type="number">`
      + `<button class="btn btn-danger" type="button">REMOVE</button>`
      + `</div>`
      
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" */
  }
  var buttonbar = "<button class='clear-cart-btn'> Clear Cart </button>";
  var total = 'Total price: $<span class="total-price"></span>'
  $('.cart-items').html(output);
  $('.cart-buttons').html(buttonbar);
  $('.cart-total').html(total);
  $('.total-price').html(shoppingCart.totalCart());
}
}

displayCart();

$('.clear-cart-btn').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


var removeItemButtons = document.getElementsByClassName('remove-item-btn')
for (var i = 0; i < removeItemButtons.length; i++) {
  var button = removeItemButtons[i];
  button.addEventListener('click', function(event) {
  var buttonClicked = event.target;
  var cartRow = buttonClicked.parentElement.parentElement;
  var name = cartRow.getElementsByClassName('item-nam')[0].innerText;
  var details = cartRow.getElementsByClassName('item-details')[0].innerText.split("\\s{2}");
  if (details.length == 1) {
    flavor = details[0]; color = ""; size = "";
  } else if (details.length == 2) {
    flavor = ""; color = details[0]; size = details[1];
  } else {
    color = ""; size = ""; flavor = "";
  }
  console.log(name, color, flavor, size)
  shoppingCart.removeItemFromCart(name, color, flavor, size);
  cartRow.remove();
  updateCartTotal();
})
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('item-pri')[0];
        var quantityElement = cartRow.getElementsByClassName('item-quant')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = total;
}




/*
function addItemToCart(name, price, flavor, color, size, count) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

/* 

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, price, flavor, color, size, count);
  displayCart();
});

displayCart();
*/
