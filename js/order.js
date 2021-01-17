
const WEBAPP = "https://script.google.com/macros/s/AKfycbypnJmGJMFvlbVR_0mQ72g0sv9FbI9KSN8LFWLtkxL7r4a_aCseyVVv/exec";

const scriptURL = 'https://script.google.com/macros/s/AKfycbypnJmGJMFvlbVR_0mQ72g0sv9FbI9KSN8LFWLtkxL7r4a_aCseyVVv/exec';
const form = document.forms['submit-to-google-sheet'];
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)}).then(response => console.log('Success!', response)).catch(error => console.error('Error!', error.message));
});