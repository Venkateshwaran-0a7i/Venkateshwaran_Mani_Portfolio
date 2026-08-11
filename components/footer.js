class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #1F2937;
                    color: #F9FAFB;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .social-links a {
                    transition: all 0.3s ease;
                }
                
                .social-links a:hover {
                    transform: translateY(-3px);
                }
                
                .footer-links a {
                    position: relative;
                }
                
                .footer-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background-color: #3B82F6;
                    transition: width 0.3s ease;
                }
                
                .footer-links a:hover::after {
                    width: 100%;
                }
            </style>
            <footer class="py-12">
                <div class="footer-content px-4 mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="md:col-span-2">
                            <h3 class="text-2xl font-bold mb-4 gradient-text">Venkateshwaran Mani</h3>
                            <p class="text-gray-400 mb-6">Data Scientist | Data Engineer | AI & ML Enthusiast</p>
                            <div class="flex space-x-4 social-links">
                                <a href="https://linkedin.com/in/venkateshwaran-mani-9973322a7" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-blue-400" aria-label="Visit Venkateshwaran Mani's LinkedIn profile">
                                    <i data-feather="linkedin" class="w-5 h-5" aria-hidden="true"></i>
                                </a>
                                <a href="https://github.com/Venkateshwaran-0a7i" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-300" aria-label="Visit Venkateshwaran Mani's GitHub profile">
                                    <i data-feather="github" class="w-5 h-5" aria-hidden="true"></i>
                                </a>
                                <a href="mailto:venkateshwaran0720@gmail.com" class="text-gray-400 hover:text-red-400" aria-label="Send email to Venkateshwaran Mani">
                                    <i data-feather="mail" class="w-5 h-5" aria-hidden="true"></i>
                                </a>
                                <a href="tel:+919655724769" class="text-gray-400 hover:text-green-400" aria-label="Call Venkateshwaran Mani">
                                    <i data-feather="phone" class="w-5 h-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                            <div class="space-y-2 footer-links">
                                <a href="#about" class="block text-gray-400 hover:text-white transition">About</a>
                                <a href="#experience" class="block text-gray-400 hover:text-white transition">Experience</a>
                                <a href="#skills" class="block text-gray-400 hover:text-white transition">Skills</a>
                                <a href="#projects" class="block text-gray-400 hover:text-white transition">Projects</a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Contact</h4>
                            <div class="space-y-2">
                                <p class="text-gray-400">Madurai, Tamil Nadu, India</p>
                                <p class="text-gray-400">venkateshwaran0720@gmail.com</p>
                                <p class="text-gray-400">+91 96557 24769</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                        <p>&copy; ${new Date().getFullYear()} Venkateshwaran Mani. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);