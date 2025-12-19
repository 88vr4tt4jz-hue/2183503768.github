// 主要JavaScript逻辑 - 宠物经济H5应用
// 融合链接一和链接二的优势功能

// 全局变量
let particleSystem;
let navItems;
let tooltip;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initParticleBackground();
    initNavigation();
    initAnimations();
    initScrollEffects();
    initTooltip();
    initDataVisualization();
});

// 初始化粒子背景系统
function initParticleBackground() {
    const sketch = (p) => {
        let particles = [];
        let petIcons = ['🐕', '🐱', '🐰', '🐦', '🐹', '🐢'];
        const numParticles = 80;
        
        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particle-container');
            
            // 创建粒子
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.3, 0.3),
                    vy: p.random(-0.3, 0.3),
                    size: p.random(3, 8),
                    opacity: p.random(0.1, 0.4),
                    color: p.random(['#D4A574', '#8B9467', '#E8B86D', '#27AE60', '#3498DB']),
                    type: p.random(['circle', 'icon']),
                    icon: p.random(petIcons)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // 更新和绘制粒子
            particles.forEach((particle, index) => {
                // 更新位置
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // 边界检查
                if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
                
                // 绘制粒子
                if (particle.type === 'circle') {
                    p.fill(particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0'));
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                } else {
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(particle.size);
                    p.text(particle.icon, particle.x, particle.y);
                }
            });
            
            // 绘制连接线
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    if (dist < 120) {
                        const alpha = p.map(dist, 0, 120, 0.15, 0);
                        p.stroke(212, 165, 116, alpha * 255);
                        p.strokeWeight(1);
                        p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    }
                }
            }
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };
    
    particleSystem = new p5(sketch);
}

// 初始化导航系统
function initNavigation() {
    navItems = document.querySelectorAll('.nav-item');
    const unlockBtn = document.getElementById('unlockBtn');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    // 导航项点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
        
        // 鼠标悬停效果
        item.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.08,
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // 解锁按钮点击事件
    unlockBtn.addEventListener('click', function() {
        scrollToNavigation();
    });
    
    // 滚动指示器点击事件
    scrollIndicator.addEventListener('click', function() {
        scrollToNavigation();
    });
}

// 页面导航
function navigateToPage(page) {
    // 添加页面切换动画
    anime({
        targets: 'body',
        opacity: [1, 0.8],
        duration: 400,
        easing: 'easeOutQuad',
        complete: function() {
            window.location.href = `${page}.html`;
        }
    });
}

// 滚动到导航区域
function scrollToNavigation() {
    const navigationSection = document.getElementById('navigation');
    navigationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 初始化动画效果
function initAnimations() {
    // 标题动画
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [80, 0],
        duration: 1200,
        delay: 600,
        easing: 'easeOutQuad'
    });
    
    // 副标题动画
    anime({
        targets: '.hero-title + p',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: 1000,
        easing: 'easeOutQuad'
    });
    
    // 按钮动画
    anime({
        targets: '#unlockBtn',
        opacity: [0, 1],
        scale: [0.7, 1],
        duration: 800,
        delay: 1400,
        easing: 'easeOutBack'
    });
    
    // 浮动数据动画
    anime({
        targets: '.data-float',
        opacity: [0, 1],
        scale: [0.3, 1],
        duration: 1000,
        delay: anime.stagger(300, {start: 1800}),
        easing: 'easeOutElastic'
    });
    
    // 导航项动画
    anime({
        targets: '.nav-item',
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 800,
        delay: anime.stagger(150, {start: 2400}),
        easing: 'easeOutQuad'
    });
    
    // 浮动宠物图标动画
    anime({
        targets: '.floating-pet-icon',
        opacity: [0, 0.15],
        scale: [0, 1],
        duration: 2000,
        delay: anime.stagger(400, {start: 3000}),
        easing: 'easeOutQuad'
    });
}

// 初始化滚动效果
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // 视差效果
        const heroImage = document.querySelector('section:first-child img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0002})`;
        }
        
        // 浮动数据视差
        const dataFloats = document.querySelectorAll('.data-float');
        dataFloats.forEach((float, index) => {
            const speed = 0.2 + index * 0.1;
            float.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// 初始化工具提示
function initTooltip() {
    tooltip = document.getElementById('tooltip');
    const navItems = document.querySelectorAll('.nav-item[data-tooltip]');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.classList.add('show');
            updateTooltipPosition(e);
        });
        
        item.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
        
        item.addEventListener('mousemove', updateTooltipPosition);
    });
}

// 更新工具提示位置
function updateTooltipPosition(e) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    tooltip.style.left = `${x - tooltipRect.width / 2}px`;
    tooltip.style.top = `${y - tooltipRect.height - 10}px`;
}

// 初始化数据可视化
function initDataVisualization() {
    // 创建迷你图表展示核心数据趋势
    const chartContainer = document.createElement('div');
    chartContainer.className = 'fixed bottom-4 right-4 w-64 h-32 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 z-50 opacity-0 transition-opacity duration-300';
    chartContainer.id = 'miniChart';
    document.body.appendChild(chartContainer);
    
    // 鼠标悬停显示迷你图表
    const marketData = document.querySelector('.data-float');
    if (marketData) {
        marketData.addEventListener('mouseenter', function() {
            chartContainer.style.opacity = '1';
            renderMiniChart();
        });
        
        marketData.addEventListener('mouseleave', function() {
            chartContainer.style.opacity = '0';
        });
    }
}

// 渲染迷你图表
function renderMiniChart() {
    const chartContainer = document.getElementById('miniChart');
    const chart = echarts.init(chartContainer);
    
    const option = {
        title: {
            text: '市场规模趋势',
            textStyle: { fontSize: 12, color: '#666' },
            left: 'center'
        },
        grid: { top: 30, right: 10, bottom: 20, left: 40 },
        xAxis: {
            type: 'category',
            data: ['2020', '2021', '2022', '2023', '2024'],
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            axisLabel: { fontSize: 10, formatter: '{value}亿' }
        },
        series: [{
            data: [3035, 3806, 4936, 5928, 7013],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#D4A574', width: 2 },
            itemStyle: { color: '#E8B86D' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(212, 165, 116, 0.3)' },
                        { offset: 1, color: 'rgba(212, 165, 116, 0.1)' }
                    ]
                }
            }
        }]
    };
    
    chart.setOption(option);
}

// 工具函数：显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 px-6 py-4 rounded-lg text-white z-50 shadow-lg ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 动画显示
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 400,
        easing: 'easeOutQuad'
    });
    
    // 3秒后自动消失
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }
        });
    }, 3000);
}

// 工具函数：格式化数字
function formatNumber(num) {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿';
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    }
    return num.toString();
}

// 工具函数：获取随机颜色
function getRandomColor() {
    const colors = [
        '#D4A574', '#8B9467', '#E8B86D', 
        '#27AE60', '#3498DB', '#F39C12',
        '#E74C3C', '#9B59B6', '#1ABC9C'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 工具函数：平滑滚动到元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 页面可见性API - 优化性能
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        if (particleSystem) {
            particleSystem.noLoop();
        }
    } else {
        // 页面显示时恢复动画
        if (particleSystem) {
            particleSystem.loop();
        }
    }
});

// 窗口大小改变时重新调整
window.addEventListener('resize', function() {
    if (particleSystem) {
        particleSystem.windowResized();
    }
    
    // 重新渲染迷你图表
    const miniChart = document.getElementById('miniChart');
    if (miniChart && miniChart.style.opacity === '1') {
        setTimeout(renderMiniChart, 100);
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    showNotification('页面加载出现问题，请刷新重试', 'error');
});

// 全局键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键返回顶部
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 数字键1-6快速导航
    const pageMap = {
        '1': 'market-overview',
        '2': 'consumer-profile',
        '3': 'industry-chain',
        '4': 'policy-capital',
        '5': 'social-mirror',
        '6': 'conclusion'
    };
    
    if (pageMap[e.key]) {
        navigateToPage(pageMap[e.key]);
    }
});

// 导出全局函数供其他页面使用
window.PetEconomyApp = {
    showNotification,
    formatNumber,
    getRandomColor,
    navigateToPage,
    scrollToElement,
    scrollToNavigation
};

// 页面加载完成后的欢迎动画
setTimeout(() => {
    showNotification('欢迎来到千亿"它经济"数据报告！', 'success');
}, 2000);