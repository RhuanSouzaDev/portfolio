const linksMenu = document.querySelectorAll(".menu-botoes a");
const paginaAtual = window.location.pathname.split("/").pop();

linksMenu.forEach((link) => {
  const href = link.getAttribute("href");

  if (href === paginaAtual) {
    link.classList.add("ativo");
  }
});

const spotlights = document.querySelectorAll(".spotlight");

spotlights.forEach((spotlight) => {
  spotlight.addEventListener("mousemove", (e) => {
    const rect = spotlight.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotlight.style.setProperty("--x", `${x}px`);
    spotlight.style.setProperty("--y", `${y}px`);
  });

  spotlight.addEventListener("mouseleave", () => {
    spotlight.style.setProperty("--x", "50%");
    spotlight.style.setProperty("--y", "50%");
  });
});

document.querySelectorAll(".caixa-video").forEach((container) => {
  const playBtn = container.querySelector(".btn-play");
  const iframe = container.querySelector("iframe");
  const tecnologias = container.querySelector(".tecnologias");
  const src = container.dataset.video;

  playBtn.addEventListener("click", () => {
    iframe.src = `${src}&autoplay=1&rel=0`;
    iframe.style.display = "block";

    playBtn.style.display = "none";

    if (tecnologias) {
      tecnologias.style.display = "none";
    }
  });
});

const form = document.querySelector(".form-contato");
const popup = document.getElementById("popup");
const popupTexto = document.getElementById("popup-texto");

let popupTimer;

function abrirPopup(mensagem, estado) {
  popupTexto.textContent = mensagem;

  popup.classList.remove("loading", "success", "error");
  popup.classList.add("ativo", estado);

  clearTimeout(popupTimer);

  popupTimer = setTimeout(() => {
    popup.classList.remove("ativo", estado);
  }, 4000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  abrirPopup("Enviando mensagem...", "loading");

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      abrirPopup("Mensagem enviada com sucesso!", "success");
      form.reset();
    } else {
      abrirPopup("Erro ao enviar a mensagem", "error");
    }
  } catch (error) {
    abrirPopup("Falha de conexão", "error");
  }
});
