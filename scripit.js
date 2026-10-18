// CONFIGURAÇÃO DO BARBEIRO
// Insira o seu número do WhatsApp com DDD e DDI (Apenas números)
const NUMERO_WHATSAPP = "5521999999999"; 

// Insira o link da sua Página de Agendamentos do Google Agenda
const LINK_GOOGLE_AGENDA = "https://calendar.google.com/calendar/appointments/schedules/COLE_SUA_CHAVE_AQUI?gv=true";

document.addEventListener("DOMContentLoaded", () => {
  // Menu Mobile
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Atualiza o src do Iframe do Google Agenda
  const iframeCalendar = document.getElementById("googleCalendarIframe");
  if (iframeCalendar && LINK_GOOGLE_AGENDA) {
    iframeCalendar.src = LINK_GOOGLE_AGENDA;
  }

  // Configura os botões de suporte para o WhatsApp
  const btnWhatsapp = document.getElementById("btnWhatsappBarber");
  const footerWhatsapp = document.getElementById("footerWhatsapp");

  const urlWhatsapp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=Olá!%20Estou%20no%20seu%20site%20e%20gostaria%20de%20tirar%20uma%20dúvida.`;

  if (btnWhatsapp) btnWhatsapp.href = urlWhatsapp;
  if (footerWhatsapp) footerWhatsapp.href = urlWhatsapp;
});
