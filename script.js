// ===== 부드러운 스크롤 =====
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

// ===== 폼 제출 처리 =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 유효성 검사
    if (!name || !email || !subject || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    // 이메일 형식 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return;
    }
    
    // 성공 메시지 표시
    alert(`안녕하세요 ${name}님!\n\n메시지를 받았습니다.\n감사합니다!`);
    
    // 폼 초기화
    document.getElementById('contactForm').reset();
});

// ===== 네비게이션 활성화 상태 업데이트 =====
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== 활성화 상태 스타일 =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        text-decoration: underline;
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

// ===== 페이지 로드 시 애니메이션 =====
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 Home 섹션에서 시작
    const homeSection = document.getElementById('home');
    homeSection.style.animation = 'fadeIn 0.5s ease-in';
});

// ===== 추가 애니메이션 스타일 =====
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .project-card {
        animation: slideUp 0.5s ease-out;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// ===== IntersectionObserver를 사용한 스크롤 애니메이션 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 모든 프로젝트 카드에 옵저버 적용
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ===== 프로젝트 카드 클릭 이벤트 =====
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.project-card');
        const projectTitle = card.querySelector('h3').textContent;
        
        // 모달창 또는 알림으로 프로젝트 상세 정보 표시
        alert(`프로젝트: ${projectTitle}\n\n자세한 정보 페이지로 이동합니다.`);
    });
});

// ===== 현재 연도 동적으로 표시 =====
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-content p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} 도현민 포트폴리오. 모든 권리 보유.`;
    }
});

// ===== 스크롤 시 헤더 효과 =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

console.log('포트폴리오 웹사이트가 정상적으로 로드되었습니다!');
