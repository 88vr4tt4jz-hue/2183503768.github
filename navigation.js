// 底部导航栏统一处理
class BottomNavigation {
    constructor() {
        this.pages = [
            { id: 'index', name: '🏠 首页', file: 'index.html' },
            { id: 'market-overview', name: '📊 市场全景', file: 'market-overview.html' },
            { id: 'consumer-profile', name: '👥 消费主体', file: 'consumer-profile.html' },
            { id: 'industry-chain', name: '🔗 产业链', file: 'industry-chain.html' },
            { id: 'policy-capital', name: '🏛️ 政策资本', file: 'policy-capital.html' },
            { id: 'social-mirror', name: '💝 社会镜像', file: 'social-mirror.html' },
            { id: 'conclusion', name: '⭐ 公益联动', file: 'conclusion.html' }
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
        this.createNavigation();
        this.bindEvents();
    }

    createNavigation() {
        // 检查是否已存在导航栏
        if (document.getElementById('bottom-nav')) {
            return;
        }

        const nav = document.createElement('div');
        nav.id = 'bottom-nav';
        nav.className = 'fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 shadow-lg';
        
        const currentIndex = this.pages.findIndex(p => p.id === this.currentPage);
        
        nav.innerHTML = `
            <div class="flex justify-center items-center py-3 px-4">
                <div class="flex space-x-2 max-w-md w-full justify-between">
                    <!-- 上一页按钮 -->
                    <button id="prev-btn" class="nav-btn ${currentIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'} bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-1">
                        <span>←</span>
                        <span>${currentIndex > 0 ? this.pages[currentIndex - 1].name : '首页'}</span>
                    </button>
                    
                    <!-- 当前页面指示器 -->
                    <div class="flex items-center space-x-1 px-3">
                        <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span class="text-sm font-medium text-gray-600">${this.pages.find(p => p.id === this.currentPage)?.name || '首页'}</span>
                    </div>
                    
                    <!-- 下一页按钮 -->
                    <button id="next-btn" class="nav-btn ${currentIndex >= this.pages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'} bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-1">
                        <span>${currentIndex < this.pages.length - 1 ? this.pages[currentIndex + 1].name : '结束'}</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
            
            <!-- 快速跳转菜单 -->
            <div class="flex justify-center pb-2">
                <div class="flex space-x-1 bg-gray-100 rounded-full p-1">
                    ${this.pages.map((page, index) => `
                        <button class="page-dot ${page.id === this.currentPage ? 'bg-orange-400' : 'bg-gray-300'} w-2 h-2 rounded-full transition-all duration-300" 
                                data-page="${page.id}" data-index="${index}" title="${page.name}">
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(nav);
        
        // 为body添加底部padding以避免内容被导航栏遮挡
        document.body.style.paddingBottom = '100px';
    }

    bindEvents() {
        // 上一页按钮
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateToPage('prev'));
        }

        // 下一页按钮
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateToPage('next'));
        }

        // 页面点
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-dot')) {
                const pageId = e.target.getAttribute('data-page');
                this.navigateToPage(pageId);
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
                opacity: [1, 0.8],
                duration: 300,
                easing: 'easeOutQuad',
                complete: function() {
                    window.location.href = url;
                }
            });
        } else {
            window.location.href = url;
        }
    }
}

// 页面加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', function() {
    // 延迟一点执行，确保页面其他元素已加载
    setTimeout(() => {
        new BottomNavigation();
    }, 100);
});

// 导出全局函数供其他脚本使用
window.BottomNavigation = BottomNavigation;