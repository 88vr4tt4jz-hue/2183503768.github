// 新的底部导航栏 - 支持平滑切换页面
class SmoothNavigation {
    constructor() {
        this.pages = [
            { id: 'index', name: '🏠 首页', file: 'index.html', title: '千亿"它经济"背后的情感密码' },
            { id: 'market-overview', name: '📊 市场全景', file: 'market-overview.html', title: '市场全景分析' },
            { id: 'consumer-profile', name: '👥 消费主体', file: 'consumer-profile.html', title: '消费主体分析' },
            { id: 'industry-chain', name: '🔗 产业链', file: 'industry-chain.html', title: '产业链洞察' },
            { id: 'policy-capital', name: '🏛️ 政策资本', file: 'policy-capital.html', title: '政策与资本' },
            { id: 'social-mirror', name: '💝 社会镜像', file: 'social-mirror.html', title: '社会镜像' },
            { id: 'conclusion', name: '⭐ 公益联动', file: 'conclusion.html', title: '公益联动' }
        ];
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename || 'index';
    }

    init() {
        this.removeExistingNav();
        this.createNavigation();
        this.bindEvents();
    }

    // 删除现有的所有导航栏
    removeExistingNav() {
        // 删除旧的底部导航栏
        const oldNavs = document.querySelectorAll('.bottom-nav, #bottom-nav, nav[class*="bottom"], nav[id*="bottom"]');
        oldNavs.forEach(nav => {
            if (nav.parentNode) {
                nav.parentNode.removeChild(nav);
            }
        });

        // 删除内联的导航脚本和样式
        const navScripts = document.querySelectorAll('script[src*="navigation"]');
        navScripts.forEach(script => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });
    }

    createNavigation() {
        // 检查是否已存在导航栏
        if (document.getElementById('smooth-bottom-nav')) {
            return;
        }

        const nav = document.createElement('div');
        nav.id = 'smooth-bottom-nav';
        nav.className = 'fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 shadow-lg transition-all duration-300';
        
        const currentIndex = this.pages.findIndex(p => p.id === this.currentPage);
        const currentPageData = this.pages.find(p => p.id === this.currentPage);
        
        nav.innerHTML = `
            <div class="max-w-4xl mx-auto px-4">
                <!-- 页面切换按钮 -->
                <div class="flex justify-between items-center py-3">
                    <!-- 上一页按钮 -->
                    <button id="prev-page-btn" class="nav-switch-btn ${currentIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 border border-gray-200">
                        <span class="text-lg">←</span>
                        <span>${currentIndex > 0 ? this.pages[currentIndex - 1].name : '首页'}</span>
                    </button>
                    
                    <!-- 当前页面指示器 -->
                    <div class="flex flex-col items-center">
                        <div class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-full border border-orange-200">
                            <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
                            <span class="text-sm font-medium text-gray-700">${currentPageData?.name || '首页'}</span>
                        </div>
                    </div>
                    
                    <!-- 下一页按钮 -->
                    <button id="next-page-btn" class="nav-switch-btn ${currentIndex >= this.pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 border border-gray-200">
                        <span>${currentIndex < this.pages.length - 1 ? this.pages[currentIndex + 1].name : '结束'}</span>
                        <span class="text-lg">→</span>
                    </button>
                </div>
                
                <!-- 快速跳转菜单 -->
                <div class="flex justify-center pb-3">
                    <div class="flex space-x-1 bg-gray-100 rounded-full p-1">
                        ${this.pages.map((page, index) => `
                            <button class="page-indicator ${page.id === this.currentPage ? 'bg-orange-400 w-8' : 'bg-gray-300 w-2'} h-2 rounded-full transition-all duration-300 hover:w-4" 
                                    data-page="${page.id}" 
                                    data-index="${index}" 
                                    title="${page.name}">
                                ${page.id === this.currentPage ? `<span class="text-xs text-white font-medium px-1">${index + 1}</span>` : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 页面列表 -->
                <div class="flex justify-center pb-2">
                    <div class="flex flex-wrap justify-center gap-2 px-2">
                        ${this.pages.map((page, index) => `
                            <button class="page-btn ${page.id === this.currentPage ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'} px-3 py-1 rounded-full text-xs font-medium transition-all duration-300" 
                                    data-page="${page.id}">
                                ${page.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(nav);
        
        // 为body添加底部padding以避免内容被导航栏遮挡
        document.body.style.paddingBottom = '120px';
    }

    bindEvents() {
        // 上一页按钮
        const prevBtn = document.getElementById('prev-page-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateToPage('prev'));
        }

        // 下一页按钮
        const nextBtn = document.getElementById('next-page-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateToPage('next'));
        }

        // 页面指示器点击
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-indicator') || e.target.classList.contains('page-btn')) {
                const pageId = e.target.getAttribute('data-page');
                if (pageId && pageId !== this.currentPage) {
                    this.navigateToPage(pageId);
                }
            }
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            // 左右箭头键导航
            if (e.key === 'ArrowLeft') {
                this.navigateToPage('prev');
            } else if (e.key === 'ArrowRight') {
                this.navigateToPage('next');
            }
            
            // 数字键1-7快速导航
            const pageMap = {
                '1': 'index',
                '2': 'market-overview',
                '3': 'consumer-profile',
                '4': 'industry-chain',
                '5': 'policy-capital',
                '6': 'social-mirror',
                '7': 'conclusion'
            };
            
            if (pageMap[e.key]) {
                this.navigateToPage(pageMap[e.key]);
            }
        });
    }

    navigateToPage(direction) {
        const currentIndex = this.pages.findIndex(p => p.id === this.currentPage);
        let targetIndex;

        if (direction === 'prev') {
            targetIndex = currentIndex - 1;
        } else if (direction === 'next') {
            targetIndex = currentIndex + 1;
        } else {
            // 直接跳转到指定页面
            const targetPage = this.pages.find(p => p.id === direction);
            if (targetPage) {
                this.smoothNavigate(targetPage.file);
                return;
            }
            return;
        }

        if (targetIndex >= 0 && targetIndex < this.pages.length) {
            const targetPage = this.pages[targetIndex];
            this.smoothNavigate(targetPage.file);
        }
    }

    smoothNavigate(url) {
        // 添加页面切换动画
        if (typeof anime !== 'undefined') {
            anime({
                targets: 'body',
                opacity: [1, 0.7],
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    window.location.href = url;
                }
            });
        } else {
            // 如果没有anime，使用CSS过渡
            document.body.style.opacity = '0.7';
            document.body.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        }
    }
}

// 页面加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', function() {
    // 延迟一点执行，确保页面其他元素已加载
    setTimeout(() => {
        new SmoothNavigation();
    }, 100);
});

// 导出全局函数供其他脚本使用
window.SmoothNavigation = SmoothNavigation;

// 兼容旧的导航函数
window.navigateToPage = function(page) {
    const nav = new SmoothNavigation();
    nav.navigateToPage(page);
};
