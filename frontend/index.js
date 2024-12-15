// Get all links in the navbar
const navLinks = document.querySelectorAll('.navbar-links ul li a');
// Get the current URL
const currentUrl = window.location.href;
// Loop through the links and add 'active' class to the one that matches the current URL
navLinks.forEach(link => {
    if (link.href === currentUrl) {
        link.classList.add('active');
    }
    else{
        link.classList.remove('active');
    }
});

