class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    background-color: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                nav.scrolled {
                    background-color: rgba(255, 255, 255, 0.98);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .nav-links a {
                    position: relative;
                    padding-bottom: 0.25rem;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #3B82F6, #EF4444);
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .mobile-menu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                }
                
                .mobile-menu.open {
                    max-height: 500px;
                }
                
                @media (min-width: 768px) {
                    .mobile-menu-button {
                        display: none;
                    }
                    
                    .mobile-menu {
                        display: none;
                    }
                    
                    .desktop-menu {
                        display: flex;
                    }
                }
                
                @media (max-width: 767px) {
                    .desktop-menu {
                        display: none;
                    }
                    
                    .mobile-menu-button {
                        display: block;
                    }
                }
            </style>
            <nav id="navbar">
                <div class="nav-container mx-auto px-4 py-4 md:py-3">
                    <div class="flex items-center justify-between">
                        <a href="#" class="text-2xl font-bold text-gray-900 flex items-center">
                            <span class="gradient-text">VM</span>
                        </a>
                        
                        <div class="hidden md:flex items-center space-x-8 desktop-menu">
                            <div class="nav-links flex space-x-8">
                                <a href="#about" class="text-gray-700 hover:text-primary transition">About</a>
                                <a href="#experience" class="text-gray-700 hover:text-primary transition">Experience</a>
                                <a href="#skills" class="text-gray-700 hover:text-primary transition">Skills</a>
                                <a href="#projects" class="text-gray-700 hover:text-primary transition">Projects</a>
                                <a href="#contact" class="text-gray-700 hover:text-primary transition">Contact</a>
                            </div>
                            <a href="https://drive.google.com/drive/folders/1kGo1FKZS8fGdWUMDjQ-srTUMqev7HuD5?usp=sharing" target="_blank" class="ml-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2 btn-hover-effect">
                                <i data-feather="download" class="w-4 h-4"></i> Resume
                            </a>
                        </div>
                        
                        <button class="mobile-menu-button md:hidden text-gray-700 focus:outline-none">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                    
                    <div class="mobile-menu md:hidden mt-4">
                        <div class="flex flex-col space-y-4 pb-4">
                            <a href="#about" class="text-gray-700 hover:text-primary transition">About</a>
                            <a href="#experience" class="text-gray-700 hover:text-primary transition">Experience</a>
                            <a href="#skills" class="text-gray-700 hover:text-primary transition">Skills</a>
                            <a href="#projects" class="text-gray-700 hover:text-primary transition">Projects</a>
                            <a href="#contact" class="text-gray-700 hover:text-primary transition">Contact</a>
                            <a href="https://drive.google.com/drive/folders/1kGo1FKZS8fGdWUMDjQ-srTUMqev7HuD5?usp=sharing" target="_blank" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 btn-hover-effect">
                                <i data-feather="download" class="w-4 h-4"></i> Resume
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        // Mobile menu toggle
        const mobileMenuButton = this.shadowRoot.querySelector('.mobile-menu-button');
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            // Use global feather if available
            if (typeof feather !== 'undefined') {
                feather.replace(icon);
            }
        });
        
        // Navbar scroll effect
        const navbar = this.shadowRoot.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Close mobile menu when clicking a link
        this.shadowRoot.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const icon = mobileMenuButton.querySelector('i');
                icon.setAttribute('data-feather', 'menu');
                if (typeof feather !== 'undefined') {
                    feather.replace(icon);
                }
            });
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);