// Função para renderizar cards
function renderContent(containerId, dataArray) {
  const container = document.getElementById(containerId);
  dataArray.forEach(item => {
    container.innerHTML += `
      <div class="col-md-3">
        <div class="card">
          <img src="${item.img}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
          </div>
        </div>
      </div>
    `;
  });
}

window.addEventListener('scroll', function () {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
});

// Mock Netflix e Prime
renderContent("netflix-list", netflixTop10);
renderContent("prime-list", primeTop10);

// YouTube API
const apiKey = "AIzaSyCml6JkpXRtsms3TV3I5EVfHHEVGawfUDA";
const youtubeContainer = document.getElementById("youtube-list");

async function fetchYouTubeVideos(queryTerm = "filmes netflix") {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(queryTerm)}&type=video&maxResults=10&key=${apiKey}`);
    const data = await response.json();

    youtubeContainer.innerHTML = ""; // Limpa o conteúdo anterior

    data.items.forEach(video => {
      const videoId = video.id.videoId;
      youtubeContainer.innerHTML += `
        <div class="col-md-3">
          <div class="card">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <div class="card-body">
              <h5 class="card-title">${video.snippet.title}</h5>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    youtubeContainer.innerHTML = "<p>Erro ao carregar vídeos do YouTube.</p>";
    console.error(error);
  }
}


fetchYouTubeVideos();
