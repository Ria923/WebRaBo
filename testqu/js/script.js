"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const signLink = document.querySelector('.sign a'); // 获取包含图片的链接元素
    const loginLink = document.querySelector('.log_a'); // 获取登录链接元素

    // 登出函数
    function logout(event) {
        event.preventDefault();
        localStorage.removeItem('uname'); // 清除 localStorage 中的用户名数据
        render(); // 登出后重新渲染界面
    }

    // 渲染函数，根据 localStorage 中的 uname 数据渲染界面
    function render() {
        const uname = localStorage.getItem('uname');
        if (uname) {
            // 已登录状态，移除图片元素
            const imgElement = signLink.querySelector('.simg');
            if (imgElement) {
                imgElement.remove(); // 移除图片元素
            }
            // 更新链接文本和目标
            signLink.textContent = 'マイページ'; // 修改成文字链接
            signLink.href = '../userpage/index.html'; // 设置链接目标
            signLink.style.color = 'rgba(250, 250, 250)'; // 设置链接文本颜色为白色
            signLink.style.fontFamily = '"Inter", Helvetica';
            signLink.style.fontWeight = '700';
            signLink.style.fontSize = '15px';
            signLink.style.textShadow = '0px 4px 4px rgba(0, 0, 0, 0.5)';
            signLink.style.position = 'relative'; // 或者 'relative'，根据你的需求
            signLink.style.top = '10px';
            signLink.style.left = '48px';

            // 更新登出按钮
            loginLink.innerHTML = `<a href="#" class="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>`;
            const logoutButton = loginLink.querySelector('.logout');
            logoutButton.addEventListener('click', logout);
        } else {
            // 未登录状态，恢复原始结构
            signLink.innerHTML = `<img class="simg" src="./img/sign_button.png" alt="sign">`; // 恢复原始的图片链接
            signLink.setAttribute('href', '../signin/index.html');
            signLink.style.fontFamily = '';
            signLink.style.fontWeight = '';
            signLink.style.fontSize = '';
            signLink.style.textShadow = '';
            signLink.style.position = ''; // 或者 'relative'，根据你的需求
            signLink.style.top = '';
            signLink.style.left = '';
            // 更新登录按钮
            loginLink.innerHTML = `<a href="../userlogin/index.html">ログイン</a>`;
        }
    }

    // 页面加载时渲染一次
    render();

    // 为表单添加提交事件监听器
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        // 为每个职业创建一个分数对象
        let scores = {
            "Coder": 0,
            "Programmer": 0,
            "Designer": 0,
            "Writer": 0,
            "Marketer": 0,
            "Director": 0,
            "Project": 0
        };

        // 问题和选项对应的分数表
        const scoreTable = {
            q1: {
                "美術館": { "Designer": 7, "Writer": 6, "Coder": 5, "Marketer": 2,　"Director": 4, "Project": 2, "Programmer": 1 },
                "研究会": { "Programmer": 7, "Coder": 6, "Marketer": 5, "Director": 4, "Project": 3, "Designer": 2, "Writer": 1 }
            },
            q2: {
                "はい": { "Marketer": 7, "Director": 7, "Project": 5, "Designer": 5, "Programmer": 3, "Coder": 3, "Writer": 1 },
                "いいえ": { "Programmer": 7, "Coder": 7, "Writer": 5, "Designer": 5, "Project": 3, "Director": 3,  "Marketer": 1 }
            },
            q3: {
                "自分で": { "Marketer": 7, "Director": 7, "Project": 5, "Designer": 5, "Writer": 3, "Coder": 3, "Programmer": 1 },
                "チームで": { "Programmer": 7, "Coder": 7, "Writer": 5, "Designer": 5, "Project": 3, "Director": 3, "Marketer": 1 }
            },
            q4: {
                "チャレンジができる": { "Project": 7, "Director": 7, "Programmer": 5, "Marketer": 5, "Coder": 3, "Writer": 3, "Designer": 1 },
                "安定性が高い": { "Writer": 7, "Coder": 7, "Marketer": 5, "Programmer": 5, "Project": 3, "Director": 3, "Designer": 1 }
            },
            q5: {
                "はい": { "Project": 7, "Writer": 7, "Designer": 5, "Director": 5, "Marketer": 3, "Coder": 3, "Programmer": 1 },
                "いいえ": { "Programmer": 7, "Coder": 7, "Marketer": 5, "Director": 5, "Designer": 3, "Writer": 3, "Project": 1 }
            },
            q6: {
                "はい": { "Project": 7, "Designer": 7, "Marketer": 5, "Writer": 5, "Coder": 3, "Programmer": 3, "Director": 1 },
                "いいえ": { "Programmer": 7, "Coder": 7, "Writer": 5, "Designer": 5, "Marketer": 3, "Project": 3, "Director": 1 }
            },
            q7: {
                "はい": { "Programmer": 7, "Director": 7, "Project": 5, "Designer": 5, "Writer": 3, "Marketer": 3, "Coder": 1 },
                "いいえ": { "Coder": 7, "Marketer": 7, "Writer": 5, "Designer": 5, "Project": 3, "Director": 3, "Programmer": 1 }
            },
            q8: {
                "はい": { "Writer": 7, "Project": 7, "Marketer": 5, "Director": 5, "Designer": 3, "Coder": 3, "Programmer": 1 },
                "いいえ": { "Programmer": 7, "Coder": 7, "Designer": 5, "Director": 5, "Marketer": 3, "Project": 3, "Writer": 1 }
            },
            q9: {
                "はい": { "Coder": 7, "Designer": 7, "Project": 5, "Programmer": 5, "Writer": 3, "Marketer": 3, "Director": 1 },
                "いいえ": { "Marketer": 7, "Director": 7, "Writer": 5, "Programmer": 5, "Project": 3, "Designer": 3, "Coder": 1 }
            },
            q10: {
                "はい": { "Project": 7, "Programmer": 7, "Director": 5, "Designer": 5, "Marketer": 3, "Writer": 3, "Coder": 1 },
                "いいえ": { "Coder": 7, "Writer": 7, "Marketer": 5, "Designer": 5, "Director": 3, "Programmer": 3, "Project": 1 }
            }
        };

        // 收集选中的答案并计算分数
        const formData = new FormData(e.target);
        for (let [question, answer] of formData.entries()) {
            if (scoreTable[question] && scoreTable[question][answer]) {
                const questionScores = scoreTable[question][answer];
                for (let job in questionScores) {
                    scores[job] += questionScores[job];
                }
            }
        }

        // 找到最高分的职业
        let maxScore = -1;
        let bestJob = "";
        for (let job in scores) {
            if (scores[job] > maxScore) {
                maxScore = scores[job];
                bestJob = job;
            }
        }

        // 跳转到对应的职业页面
        const jobPages = {
            "Coder": "../Coder/index.html",
            "Programmer": "../Programmer/index.html",
            "Designer": "../Designer/index.html",
            "Writer": "../Writer/index.html",
            "Marketer": "../Marketer/index.html",
            "Director": "../Director/index.html",
            "Project": "../Project/index.html"
        };

        if (bestJob && jobPages[bestJob]) {
            window.location.href = jobPages[bestJob];
        } else {
            console.error("最適な職業ページのリンクが見つかりませんでした");
            // 可以添加一个默认跳转或者错误处理逻辑
        }
    });
});
