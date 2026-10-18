// Configuração do Barbeiro
const BARBER_PHONE = "5521999999999"; // COLOQUE SEU NÚMERO DO WHATSAPP COM DDD AQUI (Apenas números)

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("navLinks");

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Manipulação do Agendamento
  const bookingForm = document.getElementById("bookingForm");
  const confirmationBox = document.getElementById("confirmationBox");
  const summaryText = document.getElementById("summaryText");
  const btnGoogleCalendar = document.getElementById("btnGoogleCalendar");
  const btnAppleCalendar = document.getElementById("btnAppleCalendar");

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("clienteNome").value;
    const telefone = document.getElementById("clienteTelefone").value;
    const servico = document.getElementById("servicoSelecionado").value;
    const data = document.getElementById("dataAgendamento").value;
    const hora = document.getElementById("horaAgendamento").value;

    // Formatar datas para os convites
    const startDateTime = new Date(`${data}T${hora}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 45 * 60000); // 45 minutos de duração

    // 1. Mensagem de WhatsApp para o Barbeiro receber a notificação
    const msgWhatsapp = `Olá! Gostaria de agendar um horário:%0A%0A` +
      `*Cliente:* ${nome}%0A` +
      `*Telefone:* ${telefone}%0A` +
      `*Serviço:* ${servico}%0A` +
      `*Data:* ${data.split('-').reverse().join('/')}%0A` +
      `*Horário:* ${hora}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${BARBER_PHONE}&text=${msgWhatsapp}`;

    // 2. Link do Google Calendar para o Cliente
    const googleStartDate = startDateTime.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const googleEndDate = endDateTime.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent('Corte na Barbearia Vintage - ' + servico)}` +
      `&dates=${googleStartDate}/${googleEndDate}` +
      `&details=${encodeURIComponent('Agendamento confirmado para ' + nome + ' (Tel: ' + telefone + ')')}` +
      `&location=${encodeURIComponent('Barbearia Vintage')}`;

    btnGoogleCalendar.href = googleCalendarUrl;

    // 3. Gerar arquivo .ICS para iPhone/Android/Outlook
    btnAppleCalendar.onclick = () => {
      downloadICS(
        `Corte na Barbearia - ${servico}`,
        `Atendimento agendado para ${nome}`,
        'Barbearia Vintage',
        startDateTime,
        endDateTime
      );
    };

    // Atualizar UI
    summaryText.innerText = `Olá, ${nome}! Seu agendamento para ${servico} no dia ${data.split('-').reverse().join('/')} às ${hora} está pronto. Clique no botão do WhatsApp para me enviar a confirmação!`;
    
    confirmationBox.classList.remove("hidden");

    // Abrir o WhatsApp automaticamente em uma nova aba
    window.open(whatsappUrl, '_blank');
  });

  // Função auxiliar para gerar arquivo .ics (Calendário iOS/Android)
  function downloadICS(title, description, location, start, end) {
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Barbearia Vintage//Agendamento//PT
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'agendamento-barbearia.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
