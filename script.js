document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content');
    
    // Content for different sections
    const sections = {
        'home': {
            title: 'Welcome to our website!',
            content: 'This is the home page. Explore our site using the navigation links above.'
        },
        'about': {
            title: 'About Us',
            content: 'We are a company dedicated to creating amazing web experiences.'
        },
        'services': {
            title: 'Our Services',
            content: 'We offer a wide range of services to meet your needs.'
        },
        'contact': {
            title: 'Contact Us',
            content: 'Get in touch with us for more information.'
        }
    };

    // Function to update content
    function updateContent(section) {
        const sectionData = sections[section];
        if (sectionData) {
            contentArea.innerHTML = `
                <h2>${sectionData.title}</h2>
                <p>${sectionData.content}</p>
            `;
        }
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-ga').replace('-link', '');
            
            // Update URL hash
            window.location.hash = section;
            
            // Update content
            updateContent(section);
            
            // Send event to Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'navigation_click', {
                    'event_category': 'engagement',
                    'event_label': section,
                    'value': 1
                });
            }
        });
    });

    // Handle initial page load
    function handleInitialLoad() {
        const hash = window.location.hash.replace('#', '') || 'home';
        updateContent(hash);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleInitialLoad);
    
    // Initialize the page
    handleInitialLoad();
});
