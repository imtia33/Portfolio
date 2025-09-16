
let isDark = true;
let activeSection = '';
const sections = ['intro', 'work', 'skills', 'connect'];


const sectionsRef = [
  document.getElementById('intro'),
  document.getElementById('work'),
  document.getElementById('skills'),
  document.getElementById('connect')
];

const navButtons = document.querySelectorAll('.nav-button');
const skillBars = document.querySelectorAll('.skill-bar');


document.addEventListener('DOMContentLoaded', function() {
  
  document.documentElement.classList.add('dark');
  
  
  setTimeout(() => {
    document.getElementById('intro').classList.add('animate-fade-in-up');
    document.getElementById('intro').classList.remove('opacity-0');
    
    const workSection = document.getElementById('work');
    if (workSection) {
      
      const rect = workSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        workSection.classList.add('animate-fade-in-up');
        workSection.classList.remove('opacity-0');
      }
    }
  }, 100);
  
  
  setupIntersectionObserver();
  
  
  animateSkillBars();
  
  
  setActiveSection('intro');
});


function toggleTheme() {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.getElementById('theme-icon-dark').classList.remove('hidden');
    document.getElementById('theme-icon-light').classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    document.getElementById('theme-icon-dark').classList.add('hidden');
    document.getElementById('theme-icon-light').classList.remove('hidden');
  }
}


function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  setActiveSection(sectionId);
}


function setActiveSection(sectionId) {
  activeSection = sectionId;
  
  
  navButtons.forEach(button => {
    const section = button.getAttribute('data-section');
    if (section === sectionId) {
      button.classList.remove('bg-muted-foreground/30', 'hover:bg-muted-foreground/60');
      button.classList.add('bg-foreground');
    } else {
      button.classList.remove('bg-foreground');
      button.classList.add('bg-muted-foreground/30', 'hover:bg-muted-foreground/60');
    }
  });
}


function setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        
        console.log('Section intersecting:', entry.target.id, entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.classList.remove("opacity-0");
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
  );
  
  sectionsRef.forEach((entry) => {
    if (entry) {
      
      console.log('Observing section:', entry.id);
      
      if (!entry.classList.contains('animate-fade-in-up')) {
        entry.classList.add('opacity-0');
      }
      observer.observe(entry);
      
      
      setTimeout(() => {
        const rect = entry.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          entry.classList.add("animate-fade-in-up");
          entry.classList.remove("opacity-0");
          console.log('Fallback: Showing section immediately', entry.id);
        }
      }, 500);
    }
  });
}


function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 300);
  });
}