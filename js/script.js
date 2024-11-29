"use strict";

const firstbutton = document.querySelector('.inner .button');
const login = document.querySelector('.log_a');

// 登出函数
function logout() {
    localStorage.removeItem('uname'); // 清除 localStorage 中的用户名数据
    render(); // 登出后重新渲染界面
}

// 渲染函数，根据 localStorage 中的 uname 数据渲染界面
function render() {
    const uname = localStorage.getItem('uname');
    if (uname) {
        // 已登录状态
        firstbutton.innerHTML = `<a href="userpage/index.html"><i class="fas fa-user"></i>マイページ</a>`;
        login.innerHTML = `<a href="#" onclick="logout()" class="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>`;
        firstbutton.style.boxShadow = 'none';
        firstbutton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        const link = document.querySelector('.inner .button a');
        if (link) {
            link.style.color = 'rgba(255, 197, 103)';
        }
        firstbutton.style.top = '37px';
        firstbutton.style.left = '830px';
    } else {
        // 未登录状态
        firstbutton.innerHTML = `<a href="signin/index.html">新規登録</a>`;
        login.innerHTML = `<a href="userlogin/index.html">ログイン</a>`;
        firstbutton.style.boxShadow = '';
        firstbutton.style.backgroundColor = '';
        firstbutton.style.top = '';
        firstbutton.style.left = '';
    }
}

// 页面加载时渲染一次
render();
