document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const heroButtons = document.querySelectorAll('.hero-button');
    let buttonsVisible = false;

    function toggleButtons(show) {
        heroButtons.forEach((button, index) => {
            setTimeout(() => {
                if (show) {
                    button.classList.add('visible');
                    button.style.pointerEvents = 'auto';
                } else {
                    button.classList.remove('visible');
                    button.style.pointerEvents = 'none';
                }
            }, index * 100);
        });
        buttonsVisible = show;
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const heroSection = document.getElementById('hero');
        const heroHeight = heroSection.offsetHeight;
        const scrollThreshold = heroHeight / 30;

        if (scrollPosition > scrollThreshold && !buttonsVisible) {
            toggleButtons(true);
        } else if (scrollPosition <= scrollThreshold && buttonsVisible) {
            toggleButtons(false);
        }
    }

    window.addEventListener('scroll', handleScroll);

    function handlePageTransitions() {
        const sections = ['about', 'projects', 'downloads', 'services', 'contact'];
        
        sections.forEach(section => {
            const button = document.querySelector(`.hero-button[data-type="${section}"]`);
            const backButton = document.getElementById(section)?.querySelector('.back-button');

            if (button) {
                button.addEventListener('click', () => {
                    document.body.style.overflow = 'hidden';
                    showSection(section);
                });
            } else {
                console.warn(`Button for section "${section}" not found`);
            }

            if (backButton) {
                backButton.addEventListener('click', () => {
                    document.body.style.overflow = 'auto';
                    showSection('home');
                });
            }
        });
    }

    handlePageTransitions();

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        updateModeToggleIcon();
    }

    function updateModeToggleIcon() {
        const icon = modeToggle.querySelector('.mode-toggle__icon');
        icon.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌓';
    }

    modeToggle.addEventListener('click', toggleDarkMode);
    updateModeToggleIcon();

    // Add your existing code for dark mode toggle and other functionalities here

    function handleButtonHover() {
        const buttons = document.querySelectorAll('.hero-button');
    }

    function handleNavLinkHover() {
        const navLinks = document.querySelectorAll('.main-nav a, .hero-button, .back-button');
        
        navLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                link.style.setProperty('--mouse-x', `${x}px`);
                link.style.setProperty('--mouse-y', `${y}px`);
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.removeProperty('--mouse-x');
                link.style.removeProperty('--mouse-y');
            });
        });
    }

    handleNavLinkHover();

    const backgroundImage = document.querySelector('.background-image');
    const contentOverlay = document.querySelector('.content-overlay');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('nav a');

    function showSection(sectionId) {
        const heroSection = document.getElementById('hero');
        const pageSections = document.querySelectorAll('.page-section');
        const heroButtons = document.querySelectorAll('.hero-button');
        const downloadsSection = document.getElementById('downloads');

        if (sectionId === 'home') {
            document.body.style.overflow = 'auto';

            pageSections.forEach(section => {
                section.classList.remove('visible');
                section.style.zIndex = '-1';
            });

            heroSection.style.display = 'flex';
            heroSection.style.opacity = '1';

            heroButtons.forEach(button => {
                button.classList.add('visible');
                button.style.pointerEvents = 'auto';
            });

            // Reset scroll position
            window.scrollTo(0, 0);

            // Trigger the handleScroll function to update button visibility
            handleScroll();
        } else {
            const targetSection = document.getElementById(sectionId);
            if (!targetSection) {
                console.error(`Section with id "${sectionId}" not found`);
                return;
            }

            heroSection.style.display = 'none';
            pageSections.forEach(section => {
                section.classList.remove('visible');
                section.style.zIndex = '-1';
            });
            targetSection.classList.add('visible');
            targetSection.style.zIndex = '2000';

            // Show the downloads section if it's the target
            if (sectionId === 'downloads' && downloadsSection) {
                downloadsSection.style.display = 'block';
            }
        }

        // Apply blur effect to background when showing a section
        const backgroundImage = document.querySelector('.background-image');
        if (sectionId !== 'home') {
            backgroundImage.classList.add('background-blur');
        } else {
            backgroundImage.classList.remove('background-blur');
        }
    }

    function handleHeroButtonClick() {
        document.body.style.overflow = 'hidden';
        showSection(this.getAttribute('data-type'));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Handle back button
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showSection('home');
        });
    });

    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.createElement('button');
    musicToggle.id = 'music-toggle';
    musicToggle.innerHTML = '🎵';
    musicToggle.setAttribute('aria-label', 'Toggle background music');
    document.body.appendChild(musicToggle);

    let isMusicPlaying = false;

    function toggleMusic() {
        console.log('Toggle music clicked. Current state:', isMusicPlaying);
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '🎵';
            isMusicPlaying = false;
        } else {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Music started playing');
                    musicToggle.innerHTML = '🔇';
                    isMusicPlaying = true;
                }).catch(error => {
                    console.error('Error playing music:', error);
                    musicToggle.innerHTML = '🎵';
                    isMusicPlaying = false;
                });
            }
        }
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Add this line to ensure autoplay is disabled
    backgroundMusic.autoplay = false;

    // Add these lines after the toggleMusic function
    backgroundMusic.addEventListener('play', () => {
        musicToggle.innerHTML = '🔇';
        isMusicPlaying = true;
    });

    backgroundMusic.addEventListener('pause', () => {
        musicToggle.innerHTML = '🎵';
        isMusicPlaying = false;
    });

    // Preload the audio
    backgroundMusic.load();

    // Ensure the audio is ready before allowing interaction
    backgroundMusic.addEventListener('canplaythrough', () => {
        musicToggle.disabled = false;
    }, { once: true });

    // Initially disable the button until the audio is ready
    musicToggle.disabled = true;

    // Add an error event listener to catch and log any loading errors
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Error loading audio file:', e);
    });

    const floatingDotsContainer = document.getElementById('floating-dots');
    const numberOfDots = 50;

    function createDots() {
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.width = `${Math.random() * 5 + 2}px`;
            dot.style.height = dot.style.width;
            dot.style.left = `${Math.random() * 100}vw`;
            dot.style.top = `${Math.random() * 100}vh`;
            dot.style.backgroundColor = 'var(--dot-color)';
            floatingDotsContainer.appendChild(dot);
        }
    }

    function animateDots() {
        const dots = document.querySelectorAll('.dot');
        const mouse = { x: Infinity, y: Infinity };
        const repelDistance = 50; // Adjusted repel distance
        const repelStrength = 0.1;

        dots.forEach(dot => {
            const speedX = (Math.random() - 0.5) * 0.02;
            const speedY = (Math.random() - 0.5) * 0.02;
            let posX = parseFloat(dot.style.left);
            let posY = parseFloat(dot.style.top);

            function move() {
                const dx = mouse.x - posX;
                const dy = mouse.y - posY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < repelDistance) {
                    const angle = Math.atan2(dy, dx);
                    posX -= Math.cos(angle) * repelStrength * (repelDistance - distance) / repelDistance;
                    posY -= Math.sin(angle) * repelStrength * (repelDistance - distance) / repelDistance;
                }

                posX += speedX;
                posY += speedY;

                // Wrap around the screen
                if (posX > 100) posX = 0;
                if (posX < 0) posX = 100;
                if (posY > 100) posY = 0;
                if (posY < 0) posY = 100;

                dot.style.left = `${posX}vw`;
                dot.style.top = `${posY}vh`;
                requestAnimationFrame(move);
            }

            move();
        });

        function handleMouseMove(e) {
            mouse.x = (e.clientX / window.innerWidth) * 100;
            mouse.y = (e.clientY / window.innerHeight) * 100;
        }

        document.addEventListener('mousemove', handleMouseMove);
    }

    createDots();
    animateDots();

    // Update dot color when switching between light and dark mode
    function updateDotColor() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.style.backgroundColor = 'var(--dot-color)';
        });
    }

    // Modify the existing toggleDarkMode function
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        updateModeToggleIcon();
        updateDotColor();
    }

    // Mouse parallax effect for background image
    const backgroundContainer = document.querySelector('.background-container');
    const parallaxImage = document.querySelector('.background-image');

    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    function updateParallax() {
        const maxMove = 50; // Maximum pixels to move
        const moveX = Math.max(-maxMove, Math.min(maxMove, (mouseX / windowWidth) * 60 - 30));
        const moveY = Math.max(-maxMove, Math.min(maxMove, (mouseY / windowHeight) * 60 - 30));

        parallaxImage.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        requestAnimationFrame(updateParallax);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    updateParallax();

    // Add this code near the beginning of the file, after the DOMContentLoaded event listener
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Close the menu when a link is clicked
    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mainNav.classList.remove('show');
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
            mainNav.classList.remove('show');
        }
    });

    const projectsSection = document.getElementById('projects');
    const projectsList = projectsSection.querySelector('ul');

    async function fetchGitHubProjects() {
        try {
            const response = await fetch('https://api.github.com/users/Mitchell12345MB/repos');
            const repos = await response.json();

            repos.forEach(repo => {
                const projectItem = document.createElement('li');
                projectItem.classList.add('project-item');

                projectItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;

                projectsList.appendChild(projectItem);
            });
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
        }
    }

    fetchGitHubProjects();

    async function fetchGitHubReleases() {
        const repoOwner = 'Mitchell12345MB';
        const repoNames = 'Super-Saiyan-Transformations, SSJProject, XBox360App, Windows-Modifications'.split(',').map(name => name.trim());
    
        const allReleases = [];
    
        for (const repoName of repoNames) {
            const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;
    
            try {
                const response = await fetch(apiUrl);
                const releases = await response.json();
    
                if (Array.isArray(releases) && releases.length > 0) {
                    const latestRelease = releases.reduce((latest, release) => {
                        return new Date(release.published_at) > new Date(latest.published_at) ? release : latest;
                    }, releases[0]);
    
                    allReleases.push(latestRelease);
                } else {
                    console.warn(`No releases found for ${repoName}`);
                }
            } catch (error) {
                console.error(`Error fetching releases for ${repoName}:`, error);
            }
        }
    
        displayReleases(allReleases.filter(release => release !== undefined));
    }

    function showDownloads(type) {
        const githubDownloads = document.querySelector('.github-downloads');
        const websiteDownloads = document.querySelector('.website-downloads');
        const loadingAnimation = document.querySelector('.loading-animation');
        const downloadButtons = document.querySelectorAll('.download-button');
        const downloadsContent = document.querySelector('#downloads .section-content');

        githubDownloads.classList.remove('active');
        websiteDownloads.classList.remove('active');
        
        // Hide download buttons and lists while loading
        downloadButtons.forEach(button => button.style.display = 'none');
        githubDownloads.style.display = 'none';
        websiteDownloads.style.display = 'none';
        
        loadingAnimation.style.display = 'block';
        
        // Insert loading animation after the download buttons
        downloadsContent.insertBefore(loadingAnimation, githubDownloads);

        if (type === 'github') {
            fetchGitHubReleases().then(() => {
                loadingAnimation.style.display = 'none';
                githubDownloads.classList.add('active');
                githubDownloads.style.display = 'block';
                downloadButtons.forEach(button => button.style.display = 'inline-block');
            });
        } else {
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
                websiteDownloads.classList.add('active');
                websiteDownloads.style.display = 'block';
                downloadButtons.forEach(button => button.style.display = 'inline-block');
            }, 500); // Simulating a short delay for website downloads
        }
    }

    // Function to display releases in the downloads section
    function displayReleases(releases) {
        const downloadsList = document.querySelector('.downloads-list');
        downloadsList.innerHTML = ''; // Clear existing content

        releases.forEach(release => {
            const releaseItem = document.createElement('li');
            releaseItem.classList.add('download-item');
            releaseItem.innerHTML = `
                <h3>${release.name}</h3>
                <p>${release.published_at}</p>
                <p>${release.body}</p>
                <a href="${release.html_url}" target="_blank">View Release</a>
            `;
            downloadsList.appendChild(releaseItem);
        });
    }

    // Call the function to fetch and display the latest releases when needed
    // For example, you can call it when the downloads section is shown
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            showDownloads(button.getAttribute('data-type'));
        });
    });

    function handleServiceDetails() {
        const serviceButtons = document.querySelectorAll('.website-services .service-button');

        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const serviceOption = button.parentElement;
                const serviceDetails = serviceOption.querySelector('.service-details');

                // Toggle the active class to trigger the animation
                serviceDetails.classList.toggle('active');

                // Optionally collapse other details
                document.querySelectorAll('.service-details').forEach(details => {
                    if (details !== serviceDetails) {
                        details.classList.remove('active');
                    }
                });
            });
        });
    }

    handleServiceDetails();

    function handleServiceButtonClick() {
        const serviceButtons = document.querySelectorAll('.service-buttons .service-button');
        const serviceLists = document.querySelectorAll('.services-list');

        serviceButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const type = button.getAttribute('data-type');

                // Toggle active class on buttons
                serviceButtons.forEach(btn => {
                    if (btn === button) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                // Show the corresponding service list
                serviceLists.forEach(list => {
                    if (list.classList.contains(`${type}-services`)) {
                        list.classList.add('active');
                    } else {
                        list.classList.remove('active');
                    }
                });
            });
        });
    }

    // Call the function to initialize the event listeners
    handleServiceButtonClick();
});
