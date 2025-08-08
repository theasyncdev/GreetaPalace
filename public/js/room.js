// Enhanced Room Page JavaScript
class RoomPage {
    constructor() {
        this.initializeEventListeners();
        this.setupDateValidation();
        this.initializeAnimations();
    }

    initializeEventListeners() {
        // Book button event listeners
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleBookRoom(e));
        });

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.searchRooms());
        }

        // Modal close functionality
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('roomModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupDateValidation() {
        const checkInInput = document.getElementById('checkInDate');
        const checkOutInput = document.getElementById('checkOutDate');

        if (checkInInput && checkOutInput) {
            // Set minimum dates
            const today = new Date().toISOString().split('T')[0];
            checkInInput.min = today;
            checkOutInput.min = today;

            // Update check-out minimum when check-in changes
            checkInInput.addEventListener('change', () => {
                checkOutInput.min = checkInInput.value;
                if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
                    checkOutInput.value = '';
                }
            });

            // Real-time validation
            [checkInInput, checkOutInput].forEach(input => {
                input.addEventListener('change', () => this.validateDates());
            });
        }
    }

    validateDates() {
        const checkIn = document.getElementById('checkInDate').value;
        const checkOut = document.getElementById('checkOutDate').value;
        
        if (!checkIn || !checkOut) {
            return false;
        }
        
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkInDate < today) {
            this.showNotification('Check-in date cannot be in the past.', 'error');
            return false;
        }
        
        if (checkOutDate <= checkInDate) {
            this.showNotification('Check-out date must be after check-in date.', 'error');
            return false;
        }
        
        return true;
    }

    searchRooms() {
        if (!this.validateDates()) return;
        
        this.showLoading();
        
        // Simulate search delay for better UX
        setTimeout(() => {
            this.hideLoading();
            this.scrollToRooms();
        }, 1500);
    }

    handleBookRoom(e) {
        e.preventDefault();
        
        if (!this.validateDates()) return;
        
        const roomId = e.currentTarget.dataset.roomId;
        const checkInDate = document.getElementById('checkInDate').value;
        const checkOutDate = document.getElementById('checkOutDate').value;
        
        if (!checkInDate || !checkOutDate) {
            this.showNotification('Please select your check-in and check-out dates first.', 'error');
            return;
        }
        
        // Show confirmation
        this.showNotification('Redirecting to booking page...', 'info');
        
        setTimeout(() => {
            const url = `/user/bookroom/${roomId}?checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkOutDate)}`;
            window.location.href = url;
        }, 1000);
    }

    showRoomDetails(roomId) {
        const modal = document.getElementById('roomModal');
        const modalContent = document.getElementById('modalContent');
        
        // Enhanced room details
        modalContent.innerHTML = `
            <div class="room-details">
                <h3><i class="fas fa-bed"></i> Room Details</h3>
                <p>Experience luxury and comfort in our carefully designed rooms. Each room is equipped with modern amenities to ensure your stay is memorable.</p>
                
                <div class="amenities">
                    <h4><i class="fas fa-star"></i> Amenities</h4>
                    <div class="amenities-grid">
                        <div class="amenity-item">
                            <i class="fas fa-wifi"></i>
                            <span>Free High-Speed WiFi</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-tv"></i>
                            <span>Flat-screen TV</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-snowflake"></i>
                            <span>Air Conditioning</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-coffee"></i>
                            <span>Coffee Maker</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-shower"></i>
                            <span>Private Bathroom</span>
                        </div>
                        <div class="amenity-item">
                            <i class="fas fa-phone"></i>
                            <span>Room Service</span>
                        </div>
                    </div>
                </div>
                
                <div class="room-policies">
                    <h4><i class="fas fa-info-circle"></i> Policies</h4>
                    <ul>
                        <li>Check-in: 2:00 PM</li>
                        <li>Check-out: 11:00 AM</li>
                        <li>No smoking</li>
                        <li>Pet-friendly (additional fee)</li>
                    </ul>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        this.addModalStyles();
    }

    addModalStyles() {
        // Add additional styles for enhanced modal
        const style = document.createElement('style');
        style.textContent = `
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            
            .amenity-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            
            .amenity-item:hover {
                background: #e9ecef;
                transform: translateX(5px);
            }
            
            .amenity-item i {
                color: #667eea;
                width: 16px;
            }
            
            .room-policies {
                margin-top: 30px;
            }
            
            .room-policies h4 {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 15px;
                color: #333;
            }
            
            .room-policies ul {
                list-style: none;
                padding: 0;
            }
            
            .room-policies li {
                padding: 8px 0;
                color: #666;
                border-bottom: 1px solid #eee;
            }
            
            .room-policies li:last-child {
                border-bottom: none;
            }
        `;
        document.head.appendChild(style);
    }

    closeModal() {
        const modal = document.getElementById('roomModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'flex';
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    scrollToRooms() {
        const roomsSection = document.querySelector('.rooms-section');
        if (roomsSection) {
            roomsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    initializeAnimations() {
        // Intersection Observer for room cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe room cards
        document.querySelectorAll('.room-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-section');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Utility functions
    contactUs() {
        this.showNotification('Contact feature coming soon! Please call us at +1-234-567-8900', 'info');
    }

    // Public methods for global access
    static showRoomDetails(roomId) {
        if (window.roomPageInstance) {
            window.roomPageInstance.showRoomDetails(roomId);
        }
    }

    static contactUs() {
        if (window.roomPageInstance) {
            window.roomPageInstance.contactUs();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.roomPageInstance = new RoomPage();
});

// Global functions for EJS template
window.showRoomDetails = RoomPage.showRoomDetails;
window.contactUs = RoomPage.contactUs;
