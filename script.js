const defaultWords = [
    { english: "apple", chinese: "蘋果", pos: "名詞", root: "來自古英語 æppel，意為水果。" },
    { english: "book", chinese: "書", pos: "名詞", root: "來自古英語 bōc，意為書寫。" },
    { english: "run", chinese: "跑", pos: "動詞", root: "來自古英語 rinnan，意為快速移動。" },
    { english: "happy", chinese: "快樂的", pos: "形容詞", root: "來自古英語 hēpig，意為幸運。" },
    { english: "school", chinese: "學校", pos: "名詞", root: "來自古英語 scōl，意為閒暇時間。" },
    { english: "friend", chinese: "朋友", pos: "名詞", root: "來自古英語 frēond，意為愛人。" },
    { english: "water", chinese: "水", pos: "名詞", root: "來自古英語 wæter，意為水。" },
    { english: "play", chinese: "玩", pos: "動詞", root: "來自古英語 plegan，意為遊戲。" },
    { english: "big", chinese: "大的", pos: "形容詞", root: "來自古英語 big，意為強壯。" },
    { english: "house", chinese: "房子", pos: "名詞", root: "來自古英語 hūs，意為房屋。" }
];

let words = JSON.parse(localStorage.getItem('words')) || defaultWords;
if (!localStorage.getItem('words')) {
    localStorage.setItem('words', JSON.stringify(words));
}

if (window.location.pathname.includes('index.html')) {
    let currentIndex = 0;
    const card = document.getElementById('card');
    const wordEl = document.getElementById('word');
    const chineseEl = document.getElementById('chinese');
    const posEl = document.getElementById('pos');
    const rootEl = document.getElementById('root');

    function updateCard() {
        wordEl.textContent = words[currentIndex].english;
        chineseEl.textContent = words[currentIndex].chinese;
        posEl.textContent = words[currentIndex].pos;
        rootEl.textContent = words[currentIndex].root;
        card.classList.remove('flipped');
    }

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + words.length) % words.length;
        updateCard();
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % words.length;
        updateCard();
    });

    updateCard();
} else if (window.location.pathname.includes('admin.html')) {
    const form = document.getElementById('add-word-form');
    const wordList = document.getElementById('word-list');

    function updateList() {
        wordList.innerHTML = '';
        words.forEach((word, index) => {
            const li = document.createElement('li');
            li.textContent = `${word.english} - ${word.chinese} (${word.pos})`;
            wordList.appendChild(li);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWord = {
            english: document.getElementById('english').value,
            chinese: document.getElementById('chinese').value,
            pos: document.getElementById('pos').value,
            root: document.getElementById('root').value
        };
        words.push(newWord);
        localStorage.setItem('words', JSON.stringify(words));
        form.reset();
        updateList();
    });

    updateList();
}