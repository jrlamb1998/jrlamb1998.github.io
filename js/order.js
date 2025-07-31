
const WEBAPP = "https://script.google.com/macros/s/AKfycbypnJmGJMFvlbVR_0mQ72g0sv9FbI9KSN8LFWLtkxL7r4a_aCseyVVv/exec";

const scriptURL = 'https://script.google.com/macros/s/AKfycbwaTC764aHGKCBZDk6t5uBJrwhk5NWyMT4IINLz4QO5ro-jnS5kvg6u79lAwXUrb_QE/exec';

document.addEventListener("DOMContentLoaded", () => {
  if (window.shoppingCart && shoppingCart.totalCount() === 0) {
    const checkoutContent = document.getElementById("form-container");
    if (checkoutContent) checkoutContent.remove();
  }
});

const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault();
  
  document.getElementById('status-message').style.display = 'block';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('success').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  
  const cartItems = getCartItems();  
  const timestamp = new Date().toLocaleString();
  const totalCost = shoppingCart.totalCart().toFixed(2);

  document.getElementById('timestamp-field').value = timestamp;
  document.getElementById('items-field').value = cartItems;
  document.getElementById('total-cost-field').value = totalCost;
  
  const formData = new FormData(form);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    // Show success briefly, then redirect
    document.getElementById('loading').style.display = 'none';
    document.getElementById('success').style.display = 'block';
    
    form.reset();
    shoppingCart.clearCart();
    
    window.location.href = '/successcart/';

  })
  
  .catch(error => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    console.error('Error!', error.message);
  });    
  
});


function getCartItems() {
  const cartArray = shoppingCart.listCart();
  const formattedItems = cartArray.map(item => {
    // Prepare parts and coerce to strings safely
    const parts = [
      item.count,
      item.size || '',   // fallback to empty string if undefined or null
      item.color || '',
      item.flavor || '',
      item.name || ''
    ];
    
    // Filter out empty or whitespace-only strings
    const filteredParts = parts.map(part => part.toString().trim()).filter(part => part !== '');    
    return filteredParts.join(' ');
  });
  
  // Join all items with comma + space
  return formattedItems.join(', ');
}


