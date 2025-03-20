document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const addCategory = document.getElementById("addCategory");
    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    const predefinedMoods = ["Excited😃", "Happy😊", "Neutral😐", "Sad☹️"];

    
    menuButton.addEventListener("click", function () {
        dropdownMenu.classList.toggle("hidden");
    });

   
    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });

   
    function populateDropdown() {
        dropdownMenu.innerHTML = "";
        const allMoods = [...predefinedMoods, ...moods.map(m => m.title)];
        allMoods.forEach(mood => {
            const li = document.createElement("li");
            li.textContent = mood;
            li.className = "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100";
            li.addEventListener("click", function () {
                addMood(mood);
            });
            dropdownMenu.appendChild(li);
        });
    }

    // Add custom mood
    addCategory.addEventListener("click", function () {
        const input = prompt("Enter your mood:");
        if (!input) return;
        addMood(input);
    });

    // Function to add mood with the current date
    function addMood(mood) {
        const date = new Date();
        moods.push({ title: mood, start: date.toISOString().split("T")[0] });
        localStorage.setItem("moods", JSON.stringify(moods));
        populateDropdown();
        renderCalendar();
    }

    // Render FullCalendar
    function renderCalendar() {
        const calendarEl = document.getElementById("calendar");
        calendarEl.innerHTML = "";

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            events: moods,
        });

        calendar.render();
    }

    // Initialize
    populateDropdown();
    renderCalendar();
});

const articles = [
    {
        imageSrc: 'images/photo2.png',
        title: 'The impact of seeing and posting photos on mental health and body satisfaction',
        description: 'An in-depth look into the importance of mental well-being and how to maintain it.',
        link: 'https://www.sciencedirect.com/science/article/pii/S0747563223002571'
    },
    {
        imageSrc: 'images/photo1.png',
        title: 'A Picture of Perfect Mental Health: Exploring Barriers and Facilitators to First-Generation College Student Wellness Through Photovoice',
        description: 'Effective strategies to cope with daily stress and improve your quality of life.',
        link: 'https://www.tandfonline.com/doi/full/10.1080/26906015.2024.2415091'
    },
    
];

function createArticleComponent(article) {
    return `
        <div class="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            
            <div class="md:w-1/3">
                <img src="${article.imageSrc}" alt="${article.title}" class="w-full
                 h-full object-cover">
            </div>

            <div class="md:w-2/3 p-6 flex flex-col justify-between">

                <div>
                    <h3 class="text-2xl font-semibold text-gray-800">${article.title}</h3>
                    <p class="mt-4 text-gray-600">${article.description}</p>
                </div>

                <div class="mt-6">
                    <a href="${article.link}" class="bg-blue-500 hover:bg-blue-600
                     text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md">Read More</a>
                </div>
            </div>
        </div>
    `;
}

const articlesContainer = document.getElementById('articles-container');
articles.forEach(article => {
    articlesContainer.innerHTML += createArticleComponent(article);
});