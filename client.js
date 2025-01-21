document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('nav button');
    const content = document.getElementById('content');

    const pages = {
        books: '<h2>Книги</h2><p>Список ваших книг...</p>',
        games: '<h2>Игры</h2><p>Доступные игры и викторины...</p>',
        finances: '<h2>Финансы</h2><p>Ваши расходы...</p>',
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            content.innerHTML = pages[tabName];
        });
    });
});
