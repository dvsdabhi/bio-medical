function changeLanguage() {
    var lang = document.getElementById('languageSelect').value;
    fetch('translations/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            // Update text content with translations
            document.getElementById('home-title').textContent = data.home.title;
            document.getElementById('home-subtitle').textContent = data.home.subtitle;
            // document.getElementById('home-content').textContent = data.home.content;

            document.getElementById('about-startup').textContent = data.about.startuptitle;
            document.getElementById('about-descriptions').textContent = data.about.descriptions;
            document.getElementById('about-title').textContent = data.about.title;
            document.getElementById('about-creation-date').textContent = data.about.creationDate;
            document.getElementById('about-founders').textContent = data.about.founders;
            document.getElementById('about-Co-founders').textContent = data.about.co_founders;
            document.getElementById('about-Evolution').textContent = data.about.evolution;
            document.getElementById('about-mission').textContent = data.about.mission;
            document.getElementById('about-goals').innerHTML = data.about.goals.map(goal => '<li>' + goal + '</li>').join('');

            document.getElementById('research-title').textContent = data.research.title;
            document.getElementById('research-areas').textContent = data.research.areas;
            document.getElementById('research-areas-description').textContent = data.research.areasDescription;
            document.getElementById('research-projects').textContent = data.research.projects;
            document.getElementById('research-projects-description').textContent = data.research.projectsDescription;
            document.getElementById('research-publications').textContent = data.research.publications;
            document.getElementById('research-publications-description').textContent = data.research.publicationsDescription;

            document.getElementById('solution-title').textContent = data.solution.title;
            document.getElementById('solution-description').textContent = data.solution.description;
            document.getElementById('solution-case-studies').textContent = data.solution.caseStudies;

            // document.getElementById('partnerships-title').textContent = data.partnerships.title;
            // document.getElementById('partnerships-current').textContent = data.partnerships.current;
            // document.getElementById('partnerships-current-description').textContent = data.partnerships.currentDescription;
            // document.getElementById('partnerships-become').textContent = data.partnerships.become;
            // document.getElementById('partnerships-become-description').textContent = data.partnerships.becomeDescription;

            // document.getElementById('team-title').textContent = data.team.title;
            for (let i = 0; i < data.team.members.length; i++) {
                document.getElementById('team-member' + (i + 1) + '-name').textContent = data.team.members[i].name;
                document.getElementById('team-member' + (i + 1) + '-role').textContent = data.team.members[i].role;
                // document.getElementById('team-member' + (i + 1) + '-eduction').textContent = data.team.members[i].eduction;
            }

            document.getElementById('footer-home-link').textContent = data.footer.homeLink;
            document.getElementById('footer-learnmore-link').textContent = data.footer.learnmoreLink;

            document.getElementById('footer-privacy-link').textContent = data.footer.PrivacyLegal;

            // Update links href attributes
            document.getElementById('home-link').href = '#' + data.links.home;
            document.getElementById('about-link').href = '#' + data.links.about;
            document.getElementById('research-link').href = '#' + data.links.research;
            document.getElementById('solution-link').href = '#' + data.links.solution;
            document.getElementById('partnerships-link').href = '#' + data.links.partnerships;
            document.getElementById('team-link').href = '#' + data.links.team;
        })
        .catch(error => console.error('Error fetching translations:', error));
}

// Initialize language on page load
changeLanguage();



// header scrolling animation logic
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    // Scroll down
    document.getElementById("header").style.top = "-90px"; // Hide header
  } else {
    // Scroll up
    document.getElementById("header").style.top = "0"; // Show header
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}, false);



// header link css scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked link
        this.classList.add('active');

        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.offsetTop;
        const scrollDuration = 1000; // Specify scroll duration in milliseconds (e.g., 1000ms = 1 second)
        const startPosition = window.pageYOffset || document.documentElement.scrollTop;
        const distance = offsetTop - startPosition;
        const startTime = performance.now();

        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now();
            const elapsed = currentTime - startTime;
            window.scrollTo(0, easeInOut(elapsed, startPosition, distance, scrollDuration));
            if (elapsed < scrollDuration) {
                window.requestAnimationFrame(scrollStep);
            }
        }

        function easeInOut(t, b, c, d) {
            // t: current time, b: start value, c: change in value, d: duration
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        window.requestAnimationFrame(scrollStep);
    });
});


// menu

function toggleMenu() {
    var mobileMenu = document.querySelector('.mobile-menu-links');
    mobileMenu.classList.toggle('show');
}



// about animation

document.addEventListener('DOMContentLoaded', function() {
    var aboutSection = document.getElementById('about');
    var aboutSectionPosition = aboutSection.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    function animateAboutSection() {
        if (aboutSectionPosition < screenHeight / 2) {
            aboutSection.classList.add('active');
        } else {
            aboutSection.classList.remove('active');
        }
    }

    animateAboutSection();

    window.addEventListener('scroll', function() {
        aboutSectionPosition = aboutSection.getBoundingClientRect().top;
        animateAboutSection();
    });
});

// research
document.addEventListener('DOMContentLoaded', function() {
    var researchSection = document.getElementById('research');
    var researchSectionPosition = researchSection.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    function animateResearchSection() {
        if (researchSectionPosition < screenHeight / 2) {
            researchSection.classList.add('active');
        } else {
            researchSection.classList.remove('active');
        }
    }

    animateResearchSection();

    window.addEventListener('scroll', function() {
        researchSectionPosition = researchSection.getBoundingClientRect().top;
        animateResearchSection();
    });
});


// Solution
document.addEventListener('DOMContentLoaded', function() {
    var solutionSection = document.getElementById('solution');
    var solutionSectionPosition = solutionSection.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    function animateSolutionSection() {
        if (solutionSectionPosition < screenHeight / 2) {
            solutionSection.classList.add('active');
        } else {
            solutionSection.classList.remove('active');
        }
    }

    animateSolutionSection();

    window.addEventListener('scroll', function() {
        solutionSectionPosition = solutionSection.getBoundingClientRect().top;
        animateSolutionSection();
    });
});



// partnership
// document.addEventListener('DOMContentLoaded', function() {
//     var partnershipSection = document.getElementById('partnerships');
//     var partnershipSectionPosition = partnershipSection.getBoundingClientRect().top;
//     var screenHeight = window.innerHeight;

//     function animatePartnershipSection() {
//         if (partnershipSectionPosition < screenHeight / 2) {
//             partnershipSection.classList.add('active');
//         } else {
//             partnershipSection.classList.remove('active');
//         }
//     }

//     animatePartnershipSection();

//     window.addEventListener('scroll', function() {
//         partnershipSectionPosition = partnershipSection.getBoundingClientRect().top;
//         animatePartnershipSection();
//     });
// });

