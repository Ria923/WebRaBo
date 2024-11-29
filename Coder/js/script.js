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
            const imgElement = signLink.querySelector('img');
            if (imgElement) {
                imgElement.remove(); // 移除图片元素
            }
            // 更新链接文本和目标
            signLink.textContent = 'マイページ'; // 修改成文字链接
            signLink.href = '../userpage/index.html'; // 设置链接目标
            signLink.style.color = 'rgba(250, 250, 250)'; // 设置链接文本颜色为白色
            signLink.style.fontFamily = '"Inter", Helvetica';
            signLink.style.fontWeight ='700';
            signLink.style.fontSize = '15px'; 
            signLink.style.textShadow = '0px 4px 4px rgba(0, 0, 0, 0.5)';
            signLink.style.position = 'relative'; // 或者 'relative'，根據你的需求
            signLink.style.top = '10px';
            signLink.style.left ='48px';

            // 更新登出按钮
            loginLink.innerHTML = `<a href="#" class="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>`;
            const logoutButton = loginLink.querySelector('.logout');
            logoutButton.addEventListener('click', logout);
        } else {
            // 未登录状态，恢复原始结构
            signLink.innerHTML = `<img class="simg" src="./img/sign_button.png" alt="sign">`; // 恢复原始的图片链接
            signLink.setAttribute('href', '../signin/index.html');
            signLink.style.fontFamily = '';
            signLink.style.fontWeight ='';
            signLink.style.fontSize = ''; 
            signLink.style.textShadow = '';
            signLink.style.position = ''; // 或者 'relative'，根據你的需求
            signLink.style.top = '';
            signLink.style.left ='';
            // 更新登录按钮
            loginLink.innerHTML = `<a href="../userlogin/index.html">ログイン</a>`;
        }
    }

    // 页面加载时渲染一次
    render();
});
