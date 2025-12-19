/**
 * 宠物故事交互脚本
 * 包含用户真实治愈故事和分享养宠故事的所有交互功能
 * 可以独立嵌入到其他H5项目中
 */

class PetStoriesInteraction {
    constructor() {
        this.storyDetails = {
            cancer: {
                title: "疾病陪伴 - 生命的守护者",
                content: `
                    <div class="space-y-6">
                        <div class="bg-pink-50 p-4 rounded-lg">
                            <p class="text-pink-800 font-medium">"它陪我抗癌，是我活下去的勇气。"</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">故事正文</h4>
                            <div class="text-gray-700 space-y-3">
                                <p>小李是一位28岁的白领，去年被诊断出患有乳腺癌。在治疗期间，她的金毛犬"豆豆"成为了她最坚强的后盾。</p>
                                <p>每次化疗回家，豆豆都会静静地趴在她身边，用温暖的眼神看着她。在最痛苦的时候，豆豆会轻轻舔她的手，仿佛在告诉她："妈妈，你要坚强。"</p>
                                <p>"那段时间，我真的想过放弃。但是看到豆豆每天等我回家，我就告诉自己，我不能让它失望。"小李说，"是它给了我活下去的勇气。"</p>
                                <p>现在小李的病情已经稳定，她和豆豆的故事也温暖了无数人的心。她说："宠物不仅仅是宠物，它们是家人，是生命的守护者。"</p>
                            </div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h5 class="font-semibold text-gray-800 mb-2">数据支撑</h5>
                            <div class="text-sm text-gray-600">
                                研究显示，宠物陪伴能够显著提升癌症患者的生活质量，减轻治疗过程中的心理压力。
                            </div>
                        </div>
                    </div>
                `
            },
            elderly: {
                title: "老年情感 - 温暖的陪伴",
                content: `
                    <div class="space-y-6">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <p class="text-blue-800 font-medium">"孩子不在身边，它是我的'老来伴'。"</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">故事正文</h4>
                            <div class="text-gray-700 space-y-3">
                                <p>张奶奶今年75岁，子女都在外地工作。自从老伴去世后，她一个人生活，常常感到孤单。</p>
                                <p>去年，女儿给她送来了一只橘猫"咪咪"。起初，张奶奶还有些担心照顾不好，但咪咪很快就成为了她生活中的重要伙伴。</p>
                                <p>每天清晨，咪咪都会准时叫她起床；做饭时，咪咪会在厨房门口等着；晚上看电视时，咪咪会蜷在她腿上打呼噜。</p>
                                <p>"有了咪咪，我的生活重新有了色彩。"张奶奶笑着说，"它就像我的孩子一样，让我感受到了被需要的感觉。"</p>
                                <p>现在，张奶奶每天都会带着咪咪在小区里散步，结识了很多同样养宠物的邻居，生活变得丰富多彩。</p>
                            </div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h5 class="font-semibold text-gray-800 mb-2">相关数据</h5>
                            <div class="text-sm text-gray-600">
                                银发族养宠渗透率达18%，宠物在缓解老年人孤独感、提升生活质量方面发挥重要作用。
                            </div>
                        </div>
                    </div>
                `
            },
            career: {
                title: "城市奋斗 - 家的温暖",
                content: `
                    <div class="space-y-6">
                        <div class="bg-green-50 p-4 rounded-lg">
                            <p class="text-green-800 font-medium">"加班到深夜，看到它就有了家的感觉。"</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-3">故事正文</h4>
                            <div class="text-gray-700 space-y-3">
                                <p>小王是一名程序员，在北京打拼已经5年了。高强度的工作和快节奏的生活让他常常感到疲惫和孤独。</p>
                                <p>去年，他收养了一只流浪猫"团团"。从此，他的生活发生了改变。</p>
                                <p>"每天加班到很晚，回到家看到团团在门口等我，所有的疲惫都消失了。"小王说，"它让我感觉这个城市不再那么冰冷。"</p>
                                <p>小王会给团团买最好的猫粮，定期带它体检，甚至为了团团购置了空气净化器。他说："虽然花费不少，但它给了我家的温暖，这是用钱买不到的。"</p>
                                <p>在小王的朋友圈里，团团是绝对的主角。他说："它不仅仅是宠物，更是我在这个城市最亲密的家人。"</p>
                            </div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h5 class="font-semibold text-gray-800 mb-2">群体特征</h5>
                            <div class="text-sm text-gray-600">
                                Z世代养宠人群占比达42%，宠物成为年轻人在城市中寻求情感寄托的重要方式。
                            </div>
                        </div>
                    </div>
                `
            }
        };
        
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initModalSystem();
        this.initStorySubmission();
        this.initPageAnimations();
    }

    // 滚动动画系统
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // 观察所有需要动画的元素
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    // 弹窗系统
    initModalSystem() {
        // 故事详情弹窗
        window.showStory = (storyId) => {
            const modal = document.getElementById('storyModal');
            const title = document.getElementById('storyModalTitle');
            const content = document.getElementById('storyModalContent');
            
            const story = this.storyDetails[storyId];
            if (story) {
                title.textContent = story.title;
                content.innerHTML = story.content;
                modal.style.display = 'flex';
            }
        };

        window.closeStoryModal = () => {
            const modal = document.getElementById('storyModal');
            modal.style.display = 'none';
        };

        // 点击弹窗外部关闭
        window.addEventListener('click', (event) => {
            const storyModal = document.getElementById('storyModal');
            const submissionModal = document.getElementById('submissionModal');
            
            if (event.target === storyModal) {
                window.closeStoryModal();
            }
            if (event.target === submissionModal) {
                window.closeSubmissionModal();
            }
        });
    }

    // 故事提交系统
    initStorySubmission() {
        window.showStorySubmission = () => {
            const modal = document.getElementById('submissionModal');
            if (modal) {
                modal.style.display = 'flex';
            }
        };

        window.closeSubmissionModal = () => {
            const modal = document.getElementById('submissionModal');
            if (modal) {
                modal.style.display = 'none';
            }
        };

        window.submitStory = () => {
            const title = document.getElementById('storyTitle')?.value;
            const author = document.getElementById('storyAuthor')?.value;
            const city = document.getElementById('storyCity')?.value;
            const content = document.getElementById('storyContent')?.value;
            const agree = document.getElementById('agree')?.checked;
            
            if (!title || !author || !city || !content) {
                alert('请填写完整的故事信息');
                return;
            }
            
            if (!agree) {
                alert('请同意将故事用于公益宣传');
                return;
            }
            
            // 提交动画
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '提交中...';
            button.disabled = true;
            
            setTimeout(() => {
                alert('感谢您的分享！我们会认真审核您的故事，优质故事将在平台展示。');
                window.closeSubmissionModal();
                
                // 重置表单
                this.resetStoryForm();
                
                button.textContent = originalText;
                button.disabled = false;
                
                // 创建爱心动画
                this.createHeartAnimation();
            }, 1500);
        };
    }

    // 重置故事表单
    resetStoryForm() {
        const fields = ['storyTitle', 'storyAuthor', 'storyCity', 'storyContent', 'storyContact'];
        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        const agreeCheckbox = document.getElementById('agree');
        if (agreeCheckbox) agreeCheckbox.checked = false;
    }

    // 创建爱心动画
    createHeartAnimation() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '50%';
                heart.style.fontSize = '30px';
                heart.style.zIndex = '1000';
                heart.style.animation = 'float 2s ease-out forwards';
                heart.style.pointerEvents = 'none';
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 100);
        }
    }

    // 页面加载动画
    initPageAnimations() {
        document.addEventListener('DOMContentLoaded', () => {
            // 卡片入场动画
            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.story-card',
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    delay: anime.stagger(200)
                });

                // 数字计数动画
                this.animateCounters();
            }
        });
    }

    // 数字计数动画
    animateCounters() {
        const counters = document.querySelectorAll('.text-4xl');
        counters.forEach(counter => {
            const text = counter.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            if (number && typeof anime !== 'undefined') {
                anime({
                    targets: counter,
                    innerHTML: [0, number],
                    duration: 2000,
                    round: 1,
                    easing: 'easeOutExpo',
                    update: function(anim) {
                        const current = Math.round(anim.animatables[0].target.innerHTML);
                        counter.innerHTML = text.replace(number.toString(), current.toString());
                    }
                });
            }
        });
    }

    // 工具函数：显示消息
    showMessage(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // 工具函数：创建浮动元素
    createFloatingElement(content, options = {}) {
        const element = document.createElement('div');
        element.innerHTML = content;
        element.style.position = 'fixed';
        element.style.left = options.left || Math.random() * 100 + '%';
        element.style.top = options.top || '50%';
        element.style.fontSize = options.fontSize || '30px';
        element.style.zIndex = options.zIndex || '1000';
        element.style.pointerEvents = 'none';
        
        if (options.animation) {
            element.style.animation = options.animation;
        }
        
        document.body.appendChild(element);
        
        if (options.duration) {
            setTimeout(() => {
                element.remove();
            }, options.duration);
        }
        
        return element;
    }
}

// 添加CSS样式
const additionalStyles = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

// 注入样式
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 全局初始化函数
window.initPetStories = function() {
    return new PetStoriesInteraction();
};

// 自动初始化（如果页面中有相关元素）
document.addEventListener('DOMContentLoaded', () => {
    const hasStoryElements = document.querySelector('.story-card') || 
                            document.getElementById('storyModal') || 
                            document.getElementById('submissionModal');
    
    if (hasStoryElements) {
        window.petStoriesInteraction = new PetStoriesInteraction();
    }
});

// 导出类（如果需要模块化使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PetStoriesInteraction;
}

// 兼容性检查
window.PetStoriesCompatibility = {
    checkAnimeJS: () => typeof anime !== 'undefined',
    checkTailwind: () => document.querySelector('[class*="tailwind"]') !== null,
    checkECharts: () => typeof echarts !== 'undefined',
    
    getReport: function() {
        return {
            animeJS: this.checkAnimeJS(),
            tailwind: this.checkTailwind(),
            echarts: this.checkECharts(),
            allGood: this.checkAnimeJS() && this.checkTailwind() && this.checkECharts()
        };
    }
};

console.log('宠物故事交互脚本已加载 🐾');
console.log('兼容性检查:', window.PetStoriesCompatibility.getReport());
