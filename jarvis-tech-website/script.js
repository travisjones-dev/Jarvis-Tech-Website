// ===== PROMOTIONAL BANNER =====

// TEMPORARY FIX: Clear the cookie on every page load for testing
document.cookie = 'promoBannerClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

function closePromoBanner() {
    console.log('closePromoBanner called'); // Debug log
    const banner = document.getElementById('promoBanner');
    console.log('Banner element:', banner); // Debug log
    if (banner) {
        console.log('Adding hidden class'); // Debug log
        banner.classList.add('hidden');
        // Remember user closed the banner (expires in 7 days)
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        document.cookie = `promoBannerClosed=true; expires=${expiry.toUTCString()}; path=/`;
        console.log('Banner closed successfully'); // Debug log
    } else {
        console.error('Banner element not found!'); // Debug log
    }
}

// Make function accessible globally for onclick
window.closePromoBanner = closePromoBanner;

// Check if banner was previously closed
function checkPromoBanner() {
    const banner = document.getElementById('promoBanner');
    if (!banner) {
        console.log('Banner element not found in checkPromoBanner');
        return;
    }

    const cookies = document.cookie.split(';');
    console.log('All cookies:', cookies); // Debug
    const bannerClosed = cookies.some(cookie => cookie.trim().startsWith('promoBannerClosed='));
    console.log('Banner was previously closed:', bannerClosed); // Debug

    if (bannerClosed) {
        console.log('Hiding banner because cookie exists');
        banner.classList.add('hidden');
    } else {
        console.log('Banner should be visible');
        // Make sure banner is visible if no cookie
        banner.classList.remove('hidden');
    }
}

// Initialize banner on page load
window.addEventListener('DOMContentLoaded', checkPromoBanner);

// Close banner when clicking "Start Building" button or X button
document.addEventListener('DOMContentLoaded', function() {
    const promoBtn = document.querySelector('.promo-btn');
    if (promoBtn) {
        promoBtn.addEventListener('click', function() {
            closePromoBanner();
        });
    }

    // Also add event listener to close button as backup
    const closeBtn = document.querySelector('.promo-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closePromoBanner();
        });
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ===== FORM HANDLING WITH WEB3FORMS =====
const buildForm = document.getElementById('buildForm');

if (buildForm) {
    buildForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(buildForm);

        // Add custom formatting to message
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const serviceType = formData.get('serviceType');
        const message = formData.get('message');

        // Format the message nicely
        const formattedMessage = `
NEW SERVICE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━

Customer Information:
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}

Service Requested:
• ${serviceType}

Customer Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via Jarvis Technologies website contact form
        `.trim();

        // Replace the message in formData
        formData.set('message', formattedMessage);

        // Disable submit button
        const submitButton = buildForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                showNotification('Thank you! Your inquiry has been received. We\'ll get back to you within 24 hours.', 'success');

                // Reset form
                buildForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            showNotification('Oops! Something went wrong. Please try again or email us directly at info@jarvistechnologiesinc.com', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg class="notification-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            max-width: 400px;
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        }

        .notification-success {
            border-left: 4px solid var(--primary);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-primary);
        }

        .notification-icon {
            width: 24px;
            height: 24px;
            color: var(--primary);
            flex-shrink: 0;
        }

        .notification-close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }

        .notification-close:hover {
            color: var(--text-primary);
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;

    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.pricing-card, .build-card, .about-feature');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== FORM VALIDATION ENHANCEMENT =====
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Add focus/blur effects
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');

        // Simple validation feedback
        if (input.hasAttribute('required') && !input.value) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });

    // Real-time validation
    input.addEventListener('input', () => {
        if (input.hasAttribute('required')) {
            if (input.value) {
                input.style.borderColor = 'var(--primary)';
            } else {
                input.style.borderColor = '';
            }
        }
    });
});

// ===== EMAIL VALIDATION =====
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Create progress bar if it doesn't exist
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            z-index: 10001;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
    }

    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== DYNAMIC YEAR IN FOOTER =====
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log('%cJarvis Technologies Inc', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cWebsite built with HTML, CSS, and JavaScript', 'color: #6366f1; font-size: 14px;');
console.log('%cInterested in a custom PC build? Contact us today!', 'color: #9ca3af; font-size: 12px;');

// ===== IMAGE LIGHTBOX =====
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const clickableImages = document.querySelectorAll('.clickable-image');

// Open lightbox when clicking on an image
clickableImages.forEach(imageContainer => {
    imageContainer.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-image');
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close lightbox when clicking the X button
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Function to close the lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
    setTimeout(() => {
        lightboxImg.src = ''; // Clear image after animation
    }, 300);
}

// ===== PC BUILDER FUNCTIONALITY =====
const pcBuilderForm = document.getElementById('pcBuilderForm');

if (pcBuilderForm) {
    const buildState = {
        components: {},
        total: 0,
        cpuTDP: 0,
        gpuTDP: 0,
        includedFans: 0,
        additionalFans: 0,
        maxFans: 0
    };

    // Get all component selects
    const componentSelects = pcBuilderForm.querySelectorAll('select[data-category]');

    // Update build summary when any component changes
    componentSelects.forEach(select => {
        select.addEventListener('change', () => {
            updateBuildState();
            updateSummary();
            updateRecommendations();
        });
    });

    function updateBuildState() {
        buildState.components = {};
        buildState.total = 0;
        buildState.cpuTDP = 0;
        buildState.gpuTDP = 0;
        buildState.includedFans = 0;
        buildState.additionalFans = 0;
        buildState.maxFans = 0;

        componentSelects.forEach(select => {
            if (select.value) {
                const parts = select.value.split('|');
                const componentName = parts[0];
                const priceStr = parts[1];
                const price = parseFloat(priceStr.replace('$', ''));

                const category = select.getAttribute('data-category');

                buildState.components[select.id] = {
                    name: componentName,
                    price: price,
                    category: category,
                    fullValue: select.value
                };

                buildState.total += price;

                // Track TDP for power calculations
                if (category === 'cpu' && parts[2]) {
                    buildState.cpuTDP = parseInt(parts[2].replace('W', ''));
                }
                if (category === 'gpu' && parts[2]) {
                    buildState.gpuTDP = parseInt(parts[2].replace('W', ''));
                }

                // Track case fans
                if (category === 'case' && parts[2] && parts[3]) {
                    buildState.includedFans = parseInt(parts[2]);
                    buildState.maxFans = parseInt(parts[3]);
                }

                // Track additional fans
                if (category === 'fans' && componentName.includes('x')) {
                    const fanCount = parseInt(componentName.split('x')[0]);
                    buildState.additionalFans = fanCount;
                }
            }
        });
    }

    function updateSummary() {
        const summaryList = document.getElementById('summaryList');
        const partsTotal = document.getElementById('partsTotal');

        // Clear summary
        summaryList.innerHTML = '';

        if (Object.keys(buildState.components).length === 0) {
            summaryList.innerHTML = '<p class="summary-empty">Select components to see your build summary</p>';
            partsTotal.textContent = '$0';
            return;
        }

        // Add each component to summary
        const categoryNames = {
            'cpu': 'CPU',
            'cooler': 'Cooler',
            'motherboard': 'Motherboard',
            'ram': 'RAM',
            'gpu': 'Graphics Card',
            'storage': 'Storage',
            'case': 'Case',
            'fans': 'Additional Fans',
            'psu': 'Power Supply',
            'os': 'Operating System'
        };

        Object.entries(buildState.components).forEach(([id, component]) => {
            const item = document.createElement('div');
            item.className = 'summary-item';
            item.innerHTML = `
                <div class="summary-item-name">
                    ${categoryNames[component.category] || component.category}:
                    <span class="summary-item-part">${component.name}</span>
                </div>
                <div class="summary-item-price">$${component.price}</div>
            `;
            summaryList.appendChild(item);
        });

        // Update totals
        partsTotal.textContent = `$${buildState.total.toFixed(0)}`;
    }

    function updateRecommendations() {
        updateCoolingRecommendation();
        updatePowerRecommendation();
        updateFanCount();
    }

    function updateCoolingRecommendation() {
        const coolingAlert = document.getElementById('coolingRecommendation');
        const coolingMessage = document.getElementById('coolingMessage');
        const selectedCooler = buildState.components.cooler;
        const cpuTDP = buildState.cpuTDP;

        if (!selectedCooler || cpuTDP === 0) {
            coolingAlert.style.display = 'none';
            return;
        }

        const coolerType = selectedCooler.fullValue.split('|')[2];
        let recommendation = '';
        let shouldShow = false;

        // High TDP CPUs need better cooling
        if (cpuTDP >= 125) {
            if (coolerType === 'Stock' || coolerType === 'Air' && selectedCooler.name.includes('Hyper 212')) {
                recommendation = `Your CPU has a ${cpuTDP}W TDP. We recommend a high-end air cooler or 280mm+ AIO for optimal performance and quieter operation.`;
                shouldShow = true;
            }
        } else if (cpuTDP >= 105) {
            if (coolerType === 'Stock') {
                recommendation = `Your CPU has a ${cpuTDP}W TDP. We recommend upgrading from the stock cooler to a quality aftermarket cooler for better thermals and lower noise.`;
                shouldShow = true;
            }
        }

        if (shouldShow) {
            coolingMessage.textContent = recommendation;
            coolingAlert.style.display = 'flex';
        } else {
            coolingAlert.style.display = 'none';
        }
    }

    function updatePowerRecommendation() {
        const powerAlert = document.getElementById('powerRecommendation');
        const powerMessage = document.getElementById('powerMessage');
        const selectedPSU = buildState.components.psu;

        if (!selectedPSU) {
            powerAlert.style.display = 'none';
            return;
        }

        const psuWattage = parseInt(selectedPSU.fullValue.split('|')[2].replace('W', ''));
        const estimatedLoad = buildState.cpuTDP + buildState.gpuTDP + 100; // +100W for other components
        const recommendedPSU = Math.ceil((estimatedLoad * 1.5) / 100) * 100; // 50% headroom, rounded up

        let recommendation = '';
        let shouldShow = false;

        if (psuWattage < estimatedLoad * 1.2) {
            recommendation = `Your components will draw approximately ${estimatedLoad}W under load. We recommend at least a ${recommendedPSU}W PSU for safe operation with headroom for future upgrades.`;
            shouldShow = true;
        } else if (psuWattage >= estimatedLoad * 2) {
            recommendation = `Your ${psuWattage}W PSU is more than sufficient for this build (estimated load: ${estimatedLoad}W). You could save money with a lower wattage unit.`;
            shouldShow = true;
        }

        if (shouldShow) {
            powerMessage.textContent = recommendation;
            powerAlert.style.display = 'flex';
        } else {
            powerAlert.style.display = 'none';
        }
    }

    function updateFanCount() {
        const fanCountDiv = document.getElementById('fanCount');
        const fanMessage = document.getElementById('fanMessage');

        if (buildState.includedFans === 0 && buildState.additionalFans === 0) {
            fanCountDiv.style.display = 'none';
            return;
        }

        const totalFans = buildState.includedFans + buildState.additionalFans;
        const totalPossible = buildState.includedFans + buildState.maxFans;

        let message = `${totalFans} fans total (${buildState.includedFans} included with case`;
        if (buildState.additionalFans > 0) {
            message += ` + ${buildState.additionalFans} additional`;
        }
        message += `). `;

        // Recommendations based on GPU TDP
        if (buildState.gpuTDP === 0) {
            message += 'Adequate for integrated graphics builds.';
        } else if (buildState.gpuTDP <= 165) {
            if (totalFans >= 3) {
                message += 'Good airflow for this GPU.';
            } else {
                message += `Consider adding more fans for better GPU cooling (case supports ${totalPossible} total).`;
            }
        } else if (buildState.gpuTDP <= 285) {
            if (totalFans >= 5) {
                message += 'Excellent airflow for this high-performance GPU.';
            } else if (totalFans >= 3) {
                message += 'Adequate cooling, but more fans would improve thermals.';
            } else {
                message += `We recommend at least 5 total fans for this GPU (case supports ${totalPossible} total).`;
            }
        } else if (buildState.gpuTDP <= 450) {
            // High-end GPUs (RTX 4080, 4090, RTX 5080, etc.)
            if (totalFans >= 7) {
                message += 'Excellent airflow for this flagship GPU.';
            } else if (totalFans >= 5) {
                message += 'Good cooling, but more fans recommended for optimal thermals.';
            } else {
                message += `For optimal cooling of this high-end GPU, we recommend at least 7+ fans (case supports ${totalPossible} total).`;
            }
        } else {
            // Ultra high-end GPUs (RTX 5090, 575W+)
            if (totalFans >= 9) {
                message += 'Excellent airflow for this ultra high-end GPU.';
            } else if (totalFans >= 7) {
                message += 'Good cooling, but consider maxing out case fans for best thermals.';
            } else {
                message += `This GPU requires exceptional cooling. We strongly recommend 9+ fans for optimal performance (case supports ${totalPossible} total).`;
            }
        }

        fanMessage.textContent = message;
        fanCountDiv.style.display = 'flex';
    }

    // Form submission
    pcBuilderForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Build the parts list
        let partsList = `BUILD CONFIGURATION REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━

Build Name: ${document.getElementById('buildName').value}

SELECTED COMPONENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        const categoryNames = {
            'cpu': 'Processor (CPU)',
            'cooler': 'CPU Cooler',
            'motherboard': 'Motherboard',
            'ram': 'Memory (RAM)',
            'gpu': 'Graphics Card (GPU)',
            'storage': 'Storage',
            'case': 'Case',
            'fans': 'Additional Fans',
            'psu': 'Power Supply',
            'os': 'Operating System'
        };

        Object.entries(buildState.components).forEach(([id, component]) => {
            partsList += `${categoryNames[component.category]}: ${component.name} (~$${component.price})\n`;
        });

        partsList += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTIMATED PRICING:
━━━━━━━━━━━━━━━━━━━━━━━━━━

Parts Total: $${buildState.total}

* Prices are estimates based on current market averages
* Assembly service pricing to be quoted separately

━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM SPECIFICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━

Estimated Power Draw: ${buildState.cpuTDP + buildState.gpuTDP + 100}W
Total Case Fans: ${buildState.includedFans + buildState.additionalFans}

━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${document.getElementById('builderName').value}
Email: ${document.getElementById('builderEmail').value}
Phone: ${document.getElementById('builderPhone').value || 'Not provided'}

Additional Notes:
${document.getElementById('builderNotes').value || 'None'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via Jarvis Technologies PC Builder`;

        // Create FormData for Web3Forms
        const formData = new FormData();
        formData.append('access_key', '043ac337-8dd4-46eb-bd55-8cac2244394c');
        formData.append('subject', 'New PC Build Quote Request - ' + document.getElementById('buildName').value);
        formData.append('from_name', 'Jarvis Technologies PC Builder');
        formData.append('name', document.getElementById('builderName').value);
        formData.append('email', document.getElementById('builderEmail').value);
        formData.append('message', partsList);

        // Disable submit button
        const submitButton = pcBuilderForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending Quote Request...';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showNotification('Quote request sent! We\'ll review your build and send you a detailed quote within 24 hours.', 'success');
                pcBuilderForm.reset();
                updateBuildState();
                updateSummary();
                updateRecommendations();

                // Scroll to top of builder
                document.getElementById('pc-builder').scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showNotification('Oops! Something went wrong. Please try again or contact us directly at info@jarvistechnologiesinc.com', 'error');
            console.error('PC Builder submission error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
