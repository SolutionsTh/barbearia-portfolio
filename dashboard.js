// Cole aqui a URL gerada na implantação do Google Apps Script
const SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxJdi1csRf6KiETP32zqifylBWPNHQB6A0ESuYRLmC1ci-lvw1wyFpgI1qb7ND41XB6/exec";

document.addEventListener("DOMContentLoaded", () => {
  const kpiToday = document.getElementById("kpiToday");
  const kpiMonth = document.getElementById("kpiMonth");
  const kpiPeriod = document.getElementById("kpiPeriod");
  const clientTableBody = document.getElementById("clientTableBody");
  const btnFilter = document.getElementById("btnFilter");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  // Define datas padrões (Início do mês atual até hoje)
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  startDateInput.value = firstDayOfMonth.toISOString().split('T')[0];
  endDateInput.value = today.toISOString().split('T')[0];

  async function fetchDashboardData(start, end) {
    clientTableBody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: #888;">Carregando dados da agenda...</td></tr>`;

    try {
      let url = SCRIPT_WEB_APP_URL;
      if (start && end) {
        url += `?start=${start}&end=${end}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Preenche os retângulos de KPIs
      kpiToday.innerText = data.today;
      kpiMonth.innerText = data.month;
      kpiPeriod.innerText = data.periodTotal;

      // Preenche a tabela de clientes
      clientTableBody.innerHTML = "";

      if (data.clients.length === 0) {
        clientTableBody.innerHTML = `<tr><td colspan="2" style="text-align: center;">Nenhum atendimento encontrado no período.</td></tr>`;
        return;
      }

      data.clients.forEach(client => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${client.name}</strong></td>
          <td><span style="background-color: #d4af37; color: #000; padding: 2px 8px; border-radius: 12px; font-weight: bold;">${client.count} corte(s)</span></td>
        `;
        clientTableBody.appendChild(tr);
      });

    } catch (error) {
      console.error("Erro ao carregar KPIs:", error);
      clientTableBody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: #ff5555;">Erro ao carregar os dados. Verifique a URL do script.</td></tr>`;
    }
  }

  // Carrega os dados iniciais ao abrir
  fetchDashboardData(startDateInput.value, endDateInput.value);

  // Ação do Botão de Filtrar
  btnFilter.addEventListener("click", () => {
    fetchDashboardData(startDateInput.value, endDateInput.value);
  });
});



// Dentro do seu dashboard.js:
const monthsGrid = document.getElementById("monthsGrid");

async function fetchDashboardData(start, end) {
  // ... (código existente para carregar dados)

  try {
    let url = SCRIPT_WEB_APP_URL;
    if (start && end) {
      url += `?start=${start}&end=${end}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // 1. Atualiza os KPIs
    kpiToday.innerText = data.today;
    kpiMonth.innerText = data.month;
    kpiPeriod.innerText = data.periodTotal;

    // 2. Preenche as Caixas dos Meses do Ano
    monthsGrid.innerHTML = "";
    data.monthsOfYear.forEach(item => {
      const card = document.createElement("div");
      card.className = `month-card ${item.isCurrent ? 'current-month' : ''}`;
      card.innerHTML = `
        <div class="month-name">${item.month}</div>
        <div class="month-count">${item.count}</div>
        <div class="month-label">corte(s)</div>
      `;
      monthsGrid.appendChild(card);
    });

    // 3. Preenche a Tabela de Clientes
    // ... (código existente da tabela de clientes)

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}
