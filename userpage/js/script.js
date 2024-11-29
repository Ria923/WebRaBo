'use strict';

let dateState = [];
const STATE_KEY = 'date_check';
let experience = 0; // 初始化經驗值
const experienceMax = 100;

// 加載 localStorage 中的日期狀態
function loadState() {
    const savedState = localStorage.getItem(STATE_KEY);
    if (savedState !== null) {
        return JSON.parse(savedState);
    }
    return [];
}

// 保存日期狀態到 localStorage
function saveState(dateState) {
    localStorage.setItem(STATE_KEY, JSON.stringify(dateState));
}

// 初始化日期狀態
function initDate() {
    dateState = loadState();

    const calendar = document.getElementById('calendar');
    const today = new Date().toISOString().split('T')[0];

    for (let day = 1; day <= 31; day++) { // 假設六月份有30天
        const date = `2024-07-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement('div');
        dayElement.className = dateState.includes(date) ? 'checked' : 'unchecked';
        dayElement.dataset.date = date;
        calendar.appendChild(dayElement);

        // 如果日期已打卡，則更新顯示
        if (dateState.includes(date)) {
            dayElement.classList.remove('unchecked');
            dayElement.classList.add('checked');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const experienceElement = document.getElementById('experience');
    const progressElement = document.getElementById('progress');

    // 加載日期狀態並初始化日期
    initDate();

    calendar.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'DIV' && target.classList.contains('unchecked')) {
            const date = target.dataset.date;
            const today = new Date().toISOString().split('T')[0];

            if (date === today) {
                target.classList.remove('unchecked');
                target.classList.add('checked');
                dateState.push(date); // 加入打卡日期到狀態
                saveState(dateState); // 保存更新後的日期狀態
                increaseExperience();
            } else {
                alert('只能記錄今天的日期');
            }
        }
    });

    function increaseExperience() {
        experience += 15;
        if (experience > experienceMax) {
            experience = experienceMax;
        }

        saveExperience(); // 保存經驗值變化
        updateExperienceDisplay();
    }

    function saveExperience() {
        localStorage.setItem('experience', experience);
    }

    function loadExperience() {
        const savedExperience = localStorage.getItem('experience');
        if (savedExperience !== null) {
            experience = parseInt(savedExperience);
        }
    }

    function updateExperienceDisplay() {
        experienceElement.textContent = `${experience} / ${experienceMax}`;
        progressElement.style.width = `${(experience / experienceMax) * 100}%`;
    }

    // 加載保存的經驗值
    loadExperience();
    // 初始化顯示經驗值
    updateExperienceDisplay();
});

// 在用戶登入後更新用戶介面
function render() {
    const uname = localStorage.getItem('uname');
    const username = document.querySelector('h2');
    const signbutton = document.querySelector('.sign');

    if (uname) {
        // 已登录状态
        signbutton.innerHTML = `<a href="../userpage/index.html"><i class="fas fa-user"></i>${uname} こんにちは！</a>`;
        username.innerHTML = `<i class="fas fa-user"></i>${uname}`;
    }

    // 根據經驗值計算等級，假設每100點經驗值升一級
    const savedExperience = localStorage.getItem('experience');
    let experience = savedExperience ? parseInt(savedExperience) : 0;
    const level = Math.floor(experience / 100) + 1;

    // 更新等級顯示
    if (username) {
        username.textContent = `${uname} LV.${level}`;
    }
}

// 页面加载时渲染一次
render();
