// Smooth scrolling and page transitions
document.addEventListener('DOMContentLoaded', function() {
    initializePageTransitions();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeFormHandler();
});

// Initialize page transitions
function initializePageTransitions() {
    // Set first page as active
    const firstPage = document.querySelector('.page');
    if (firstPage) {
        firstPage.classList.add('active');
    }
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remove active class from all pages
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active class to target page after scroll
                setTimeout(() => {
                    targetElement.classList.add('active');
                }, 300);
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    let ticking = false;
    
    function updateOnScroll() {
        const sections = document.querySelectorAll('.page');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
                
                // Add active class to section in viewport
                if (!section.classList.contains('active')) {
                    section.classList.add('active');
                }
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);
    
    // Initial check
    updateOnScroll();
}

// Initialize form handler
function initializeFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Harap isi semua field!', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Pesan berhasil dikirim!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#4CAF50';
    } else if (type === 'error') {
        notification.style.background = '#f44336';
    } else {
        notification.style.background = 'var(--primary-dark)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Generate new page function
function generateNewPage(pageNumber, title, content) {
    const mainContent = document.querySelector('.main-content');
    const newPage = document.createElement('section');
    newPage.id = `page-${pageNumber}`;
    newPage.className = 'page';
    newPage.innerHTML = `
        <h2 class="page-title">${title}</h2>
        <p>${content}</p>
    `;
    
    mainContent.appendChild(newPage);
    
    // Add to navigation
    const navMenu = document.querySelector('.nav-menu');
    const newNavItem = document.createElement('li');
    newNavItem.className = 'nav-item';
    newNavItem.innerHTML = `<a href="#page-${pageNumber}" class="nav-link">${title}</a>`;
    navMenu.appendChild(newNavItem);
    
    // Reinitialize event listeners for new nav link
    initializeSmoothScrolling();
    
    return newPage;
}
// Add to existing script.js
function initializeGalleryZoom() {
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imgSrc = this.closest('.gallery-image').querySelector('.gallery-img').src;
            const imgAlt = this.closest('.gallery-image').querySelector('.gallery-img').alt;
            
            showImageModal(imgSrc, imgAlt);
        });
    });
}

function showImageModal(imgSrc, imgAlt) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <img src="${imgSrc}" alt="${imgAlt}" class="modal-image">
            <div class="modal-caption">${imgAlt}</div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}
// Location Page Functions
function openGoogleMaps() {
    const address = "Desa+Suwawal+RT.002/RW.003,+Kecamatan+Mlonggo,+Kabupaten+Jepara,+Jawa+Tengah,+Indonesia+59452";
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
}

function openWhatsApp() {
    const phone = "6281234567890"; // Ganti dengan nomor WhatsApp perusahaan
    const message = "Halo, saya ingin mendapatkan informasi lebih lanjut tentang PT Chakra Naga Furniture dan menjadwalkan kunjungan.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function openEmail() {
    const email = "info@chakranagafurniture.co.id";
    const subject = "Informasi dan Kunjungan Perusahaan";
    const body = "Dear PT Chakra Naga Furniture,\n\nSaya tertarik untuk mendapatkan informasi lebih lanjut tentang perusahaan dan mungkin menjadwalkan kunjungan.\n\nTerima kasih.";
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
}

// Initialize location page
function initializeLocationPage() {
    // Additional initialization if needed
}
// Blueprint & Certificate Page Functions - Fixed Version
function initializeBlueprintPage() {
    console.log('Blueprint page initialized');
}

// Simple tab switching function
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active class from all tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected tab
    const selectedBtn = document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`);
    const selectedPane = document.getElementById(tabName);
    
    if (selectedBtn && selectedPane) {
        selectedBtn.classList.add('active');
        selectedPane.classList.add('active');
    }
}

function showBlueprintModal(imageType) {
    const imageData = {
        'denah-keseluruhan': {
            src: 'img/blueprint/denah-keseluruhan.jpg',
            title: 'Denah Keseluruhan PT Chakra Naga Furniture',
            description: 'Layout lengkap fasilitas produksi dan pendukung'
        },
        'sertifikat-1': {
            src: 'img/certificates/sertifikat-1.jpg',
            title: 'Sertifikat Hak Guna Bangunan',
            description: 'Dokumen legal untuk bangunan pabrik dan fasilitas produksi'
        },
        'sertifikat-2': {
            src: 'img/certificates/sertifikat-2.jpg',
            title: 'Sertifikat IMB - Gedung Kantor',
            description: 'Izin Mendirikan Bangunan untuk fasilitas administrasi'
        },
        'sertifikat-3': {
            src: 'img/certificates/sertifikat-3.jpg',
            title: 'Sertifikat SLF - Sarana Lingkungan',
            description: 'Dokumen prasarana dan sarana lingkungan kawasan industri'
        }
    };
    
    const data = imageData[imageType];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blueprint-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 15px;
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            overflow: auto;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: #ff4757;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            <div class="modal-header" style="
                padding: 30px 30px 0 30px;
                text-align: center;
            ">
                <h3 style="
                    color: var(--accent);
                    margin-bottom: 10px;
                    font-family: 'Playfair Display', serif;
                ">${data.title}</h3>
                <p style="
                    color: var(--text-light);
                    margin-bottom: 20px;
                ">${data.description}</p>
            </div>
            <div class="modal-body" style="padding: 20px 30px 30px 30px;">
                <img src="${data.src}" alt="${data.title}" style="
                    width: 100%;
                    height: auto;
                    max-height: 70vh;
                    object-fit: contain;
                    border-radius: 10px;
                ">
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeBlueprintPage();
});
// Material Page Functions
function initializeMaterialPage() {
    console.log('Material page initialized');
}

function switchMaterialCategory(category) {
    console.log('Switching to category:', category);
    
    // Remove active class from all category buttons and panes
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryPanes = document.querySelectorAll('.category-pane');
    
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    categoryPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected category
    const selectedBtn = document.querySelector(`.category-btn[onclick="switchMaterialCategory('${category}')"]`);
    const selectedPane = document.getElementById(category);
    
    if (selectedBtn && selectedPane) {
        selectedBtn.classList.add('active');
        selectedPane.classList.add('active');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMaterialPage();
});
// Products Page Functions
function initializeProductsPage() {
    console.log('Products page initialized');
}

function switchProductCategory(category) {
    console.log('Switching to category:', category);
    
    // Remove active class from all category buttons and panes
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryPanes = document.querySelectorAll('.category-pane');
    
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    categoryPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected category
    const selectedBtn = document.querySelector(`.category-btn[onclick="switchProductCategory('${category}')"]`);
    const selectedPane = document.getElementById(category);
    
    if (selectedBtn && selectedPane) {
        selectedBtn.classList.add('active');
        selectedPane.classList.add('active');
    }
}

function showProductModal(productId) {
    const productData = {
        'dining-set': {
            name: 'Dining Set Minimalis',
            price: 'Rp 12.500.000',
            description: 'Set meja makan 6 kursi dengan desain minimalis modern. Terbuat dari kayu jati solid dengan finishing natural oil yang mempercantik serat kayu alami.',
            specs: [
                'Material: Kayu Jati Solid Grade A',
                'Dimensi Meja: 180x90x75 cm',
                'Dimensi Kursi: 45x45x85 cm',
                'Finishing: Natural Oil Finish',
                'Berat: 85 kg',
                'Style: Minimalis Modern'
            ],
            features: [
                'Kayu jati pilihan dengan serat indah',
                'Konstruksi solid dan kokoh',
                'Finishing natural ramah lingkungan',
                'Mudah dibersihkan dan dirawat',
                'Cocok untuk interior modern'
            ]
        },
        'sectional-sofa': {
            name: 'Sectional Sofa L-Shape',
            price: 'Rp 18.500.000',
            description: 'Sofa sectional modern dengan konfigurasi L-shape yang fleksibel. Dilengkapi bantal busa high density dan frame kayu jati solid.',
            specs: [
                'Material: Premium Fabric Import',
                'Dimensi: 280x180x85 cm',
                'Frame: Kayu Jati Solid',
                'Busa: High Density Foam',
                'Kapasitas: 5-6 Orang',
                'Warna: Grey, Beige, Navy'
            ],
            features: [
                'Desain modular fleksibel',
                'Busa high density tahan lama',
                'Fabric anti noda dan mudah dibersihkan',
                'Frame kayu solid yang kuat',
                'Ergonomis dan nyaman'
            ]
        }
        // Add more product data as needed
    };
    
    const data = productData[productId];
    if (!data) {
        alert('Product details coming soon!');
        return;
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 20px;
            max-width: 800px;
            max-height: 90vh;
            position: relative;
            overflow: auto;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: #ff4757;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <div style="padding: 40px;">
                <h2 style="
                    color: var(--accent);
                    margin-bottom: 10px;
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                ">${data.name}</h2>
                
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 30px;
                ">
                    <div style="
                        font-size: 1.8rem;
                        font-weight: bold;
                        color: var(--primary-dark);
                        font-family: 'Playfair Display', serif;
                    ">${data.price}</div>
                    <div style="
                        background: #27ae60;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        font-weight: 600;
                    ">✅ Ready Stock</div>
                </div>
                
                <p style="
                    color: var(--text-light);
                    line-height: 1.6;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                ">${data.description}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                    <div>
                        <h3 style="color: var(--accent); margin-bottom: 15px;">Spesifikasi</h3>
                        <ul style="color: var(--text-light); line-height: 1.8;">
                            ${data.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h3 style="color: var(--accent); margin-bottom: 15px;">Fitur</h3>
                        <ul style="color: var(--text-light); line-height: 1.8;">
                            ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div style="text-align: center; padding-top: 20px; border-top: 2px solid var(--primary-light);">
                    <button onclick="inquireAboutProduct('${productId}')" style="
                        background: var(--primary-dark);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-weight: 600;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: var(--transition);
                    ">📞 Inquire About This Product</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function inquireAboutProduct(productId) {
    const phone = "6281234567890";
    const message = `Halo, saya tertarik dengan produk ${productId}. Bisa minta informasi lebih detail?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});
// IT Inventory & Customs Reports Functions
function initializeITInventoryPage() {
    console.log('IT Inventory page initialized');
}

function initializeCustomsReportsPage() {
    console.log('Customs Reports page initialized');
}

function openScreenshotModal(screenshotId) {
    const screenshotData = {
        'dashboard': {
            title: 'Dashboard Inventory System',
            description: 'Overview real-time data stok, produksi, dan pengiriman',
            features: ['Real-time Monitoring', 'Performance Analytics', 'Alert System']
        },
        'stock-management': {
            title: 'Stock Management Module',
            description: 'Manajemen persediaan bahan baku dan produk jadi',
            features: ['BOM Management', 'Auto Reorder', 'Stock Tracking']
        },
        'production-tracking': {
            title: 'Production Tracking System',
            description: 'Monitoring progress produksi dari awal hingga akhir',
            features: ['Production Flow', 'Time Tracking', 'Performance Metrics']
        },
        'qc-module': {
            title: 'Quality Control Module',
            description: 'Sistem inspeksi kualitas dengan digital checklist',
            features: ['Digital Checklist', 'QC Analytics', 'Defect Tracking']
        },
        'shipping-module': {
            title: 'Shipping & Logistics Module',
            description: 'Manajemen pengiriman dan dokumentasi ekspor',
            features: ['Packing Management', 'Shipping Tracking', 'Export Docs']
        },
        'reporting-dashboard': {
            title: 'Reporting & Analytics Dashboard',
            description: 'Comprehensive reporting untuk decision making',
            features: ['Custom Reports', 'Data Analytics', 'Export Function']
        }
    };
    
    const data = screenshotData[screenshotId];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'screenshot-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 20px;
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            overflow: auto;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: #ff4757;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <div style="padding: 40px;">
                <h2 style="
                    color: var(--accent);
                    margin-bottom: 10px;
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    text-align: center;
                ">${data.title}</h2>
                
                <p style="
                    color: var(--text-light);
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                ">${data.description}</p>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="img/it-inventory/${screenshotId}.jpg" alt="${data.title}" style="
                        max-width: 100%;
                        max-height: 60vh;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    ">
                </div>
                
                <div style="background: var(--primary-light); padding: 25px; border-radius: 15px;">
                    <h3 style="color: var(--accent); margin-bottom: 15px; text-align: center;">Fitur Utama</h3>
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        ${data.features.map(feature => `
                            <span style="
                                background: white;
                                color: var(--text-dark);
                                padding: 8px 15px;
                                border-radius: 20px;
                                font-size: 0.9rem;
                                font-weight: 500;
                            ">${feature}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function downloadReport(reportId) {
    // Simulate download process
    console.log(`Downloading report: ${reportId}`);
    
    // Show download notification
    showDownloadNotification(reportId);
    
    // In real implementation, this would trigger actual file download
    // For demo purposes, we'll simulate the download
    setTimeout(() => {
        // Create a temporary link for download
        const link = document.createElement('a');
        link.href = `#`; // In real implementation, this would be the actual file URL
        link.download = `${reportId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1000);
}

function showDownloadNotification(reportId) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 1.2rem;">📥</div>
        <div>
            <div style="font-weight: 600;">Download Started</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">${reportId}.pdf</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize when pages load
document.addEventListener('DOMContentLoaded', function() {
    initializeITInventoryPage();
    initializeCustomsReportsPage();
});
// CCTV Page Functions
function initializeCCTVPage() {
    console.log('CCTV page initialized');
}

function showCCTVModal(cameraId) {
    const cameraData = {
        'cctv-map': {
            title: 'Denah Posisi CCTV',
            description: 'Distribusi strategis semua kamera keamanan di area perusahaan'
        },
        'entrance-camera': {
            title: 'CCTV Pintu Utama - Live View',
            description: 'Monitoring real-time akses masuk dan keluar'
        },
        'production-camera': {
            title: 'CCTV Area Produksi - Live View',
            description: 'Pengawasan proses manufacturing dan aktivitas operator'
        },
        'warehouse-camera': {
            title: 'CCTV Gudang - Live View',
            description: 'Monitoring inventory dan pergerakan material'
        },
        'office-camera': {
            title: 'CCTV Area Kantor - Live View',
            description: 'Keamanan ruang kerja dan administrasi'
        },
        'parking-camera': {
            title: 'CCTV Area Parkir - Live View',
            description: 'Pengawasan kendaraan dan area parkir'
        },
        'perimeter-camera': {
            title: 'CCTV Perimeter - Live View',
            description: 'Monitoring batas area dengan thermal detection'
        },
        'control-room': {
            title: 'Ruangan Monitoring CCTV',
            description: 'Pusat kendali keamanan dengan display wall'
        }
    };
    
    const data = cameraData[cameraId];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'cctv-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 20px;
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            overflow: auto;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: #ff4757;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <div style="padding: 40px;">
                <h2 style="
                    color: var(--accent);
                    margin-bottom: 10px;
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    text-align: center;
                ">${data.title}</h2>
                
                <p style="
                    color: var(--text-light);
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                ">${data.description}</p>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="img/cctv/${cameraId}.jpg" alt="${data.title}" style="
                        max-width: 100%;
                        max-height: 70vh;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    ">
                </div>
                
                ${cameraId.includes('camera') ? `
                <div style="background: var(--primary-light); padding: 20px; border-radius: 15px; text-align: center;">
                    <div style="display: inline-flex; align-items: center; gap: 10px; background: #27ae60; color: white; padding: 10px 20px; border-radius: 25px;">
                        <div style="font-size: 1.2rem;">🟢</div>
                        <span style="font-weight: 600;">LIVE - Camera Active</span>
                    </div>
                    <p style="margin-top: 15px; color: var(--text-light);">Real-time monitoring • Motion detection active • Recording in progress</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCCTVPage();
});
// Closing Page Functions
function initializeClosingPage() {
    console.log('Closing page initialized');
    // Add any specific initialization for closing page
}

function scheduleMeeting() {
    const phone = "6281234567890";
    const message = "Halo, saya ingin menjadwalkan meeting untuk membahas kerjasama dengan PT Chakra Naga Furniture.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function requestCatalog() {
    const email = "marketing@chakranagafurniture.co.id";
    const subject = "Request Catalog Produk PT Chakra Naga Furniture";
    const body = "Dear PT Chakra Naga Furniture,\n\nSaya tertarik dengan produk furniture yang diproduksi dan ingin meminta catalog produk terbaru.\n\nTerima kasih.";
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
}

function contactUs() {
    const phone = "6281234567890";
    const message = "Halo, saya ingin mendapatkan informasi lebih lanjut tentang PT Chakra Naga Furniture.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Add confetti effect for closing
function showConfetti() {
    // Simple confetti effect
    const confettiCount = 100;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() + 0.5};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            document.body.removeChild(confetti);
        };
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeClosingPage();
    
    // Show confetti when reaching the closing page
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'page-20') {
                showConfetti();
            }
        });
    }, { threshold: 0.5 });
    
    const closingPage = document.getElementById('page-20');
    if (closingPage) {
        observer.observe(closingPage);
    }
});
function showDocument(imageUrl, title) {
    // Cek apakah gambar tersedia
    const img = new Image();
    img.onload = function() {
        // Gambar tersedia, tampilkan dengan SweetAlert
        Swal.fire({
            title: title,
            html: `<div style="text-align: center;">
                     <img src="${imageUrl}" alt="${title}" style="max-width: 100%; max-height: 60vh; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                   </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            width: '80%',
            padding: '20px',
            background: '#fff',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title'
            }
        });
    };
    
    img.onerror = function() {
        // Gambar tidak tersedia, tampilkan pesan error
        Swal.fire({
            icon: 'error',
            title: 'Dokumen Tidak Tersedia',
            text: 'Dokumen sedang dalam proses update',
            confirmButtonText: 'Tutup',
            confirmButtonColor: '#2c5530'
        });
    };
    
    img.src = imageUrl;
}

// Optional: Tambahkan style custom untuk SweetAlert
const style = document.createElement('style');
style.textContent = `
    .custom-swal-popup {
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .custom-swal-title {
        color: #2c5530;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .swal2-close {
        color: #666;
        font-size: 24px;
    }
    .swal2-close:hover {
        color: #2c5530;
    }
`;
document.head.appendChild(style);