---
title: "Careers"
permalink: /careers/
layout: splash
excerpt: '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />'
header:
  overlay_image: /assets/images/ourteam.JPG
  overlay_filter: 0.2
  overlay_filter_color: "#000"
---

<p class="label-text">Hibble is hiring!</p> 
<p style="font-family: 'Chewy', sans-serif; text-align:center; color:red;">  We offer competitive unpaid internships with opportunities for promotion and career development. .</p>
 
 

<form class="hiring-form" id="hiring-form"
      action="https://docs.google.com/forms/u/3/d/e/1FAIpQLSd-53yf8S0ekygKGGW9rarmK7wzmwqVH0-lbYMcNwFDrfXlCQ/formResponse"
      method="POST"
      target="hidden_iframe"
      onsubmit="setTimeout(function() {
        document.getElementById('thank-you').style.display = 'block';
        document.getElementById('hiring-form').reset();
      }, 100);">

  <label for="name">Full Name</label>
  <input type="text" id="name" name="entry.885265212" placeholder="Mr. Hibble" required />

  <label for="email">Email Address</label>
  <input type="email" id="email" name="entry.1104721355" placeholder="mrhibble@hibblefoods.com" required />

  <label for="dog">Have you ever wanted to eat like a dog?</label>
  <label>
  <input type="radio" name="entry.183007061" value="Yes" required> Yes
  </label>
  <label>
    <input type="radio" name="entry.183007061" value="No"> No
  </label>


  <label for="hibbilize" style="margin-top: 1.5rem;">
    In your own words, what does it mean to Hibbilize and how do you plan to support the Hibblution?
  </label>
  <textarea id="hibbilize" name="entry.214180489" placeholder="Your answer here" required
            style="width: 100%; min-height: 150px; padding: 1rem; font-size: 1.1rem; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box;"></textarea>

  <button type="submit">Submit</button>
</form>

<p id="thank-you" class="label-text" style="display:none; color: green; margin-top: 1rem;">
  Thank you for your response! We will contact you shortly to set up an interview.
</p>

<iframe name="hidden_iframe" style="display:none;"></iframe>

