var confirmasfx = new Audio("sons/urna.mp3");
var teclafx = new Audio("sons/tecla.mp3");
var numero = "",
  count = 0,
  troca_img,
  cont = 0;
let listaVoto = [];
var hora, minuto, segundo;
var iniciado = false;
const password = "1739";
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
var mes;
var ls_keys, botaoConfirmar, botaoConfirmarOff;
var listaVotoNome, listaVotoNumero, listaVotoVotos;

function carregaDados() {
  console.log("Função carregaDados chamada.");
  var elementoPai = document.getElementById("tabela_corpo");

  elementoPai.innerHTML = "";

  console.log("Dados em listaVoto:", listaVoto);

  if (listaVoto.length === 0) {
    console.log("Lista de votos está vazia!");
  }

  for (var i = 0; i < listaVoto.length; i++) {
    var chapa = listaVoto[i];

    // Verifique se chapa.tipos existe e inicialize se necessário
    var votosPais = (chapa.tipos && chapa.tipos.parents) || 0;
    var votosAlunos = (chapa.tipos && chapa.tipos.student) || 0;
    var votosProfessores = (chapa.tipos && chapa.tipos.teacher) || 0;
    var votosFuncionarios = (chapa.tipos && chapa.tipos.employee) || 0;

    var qtdPaisAlunos =
      votosPais + votosAlunos !== 0
        ? ((votosPais + votosAlunos) * 50) / (votosPais + votosAlunos)
        : 0;
    var qtdProfessoresFuncionarios =
      votosProfessores + votosFuncionarios !== 0
        ? ((votosProfessores + votosFuncionarios) * 50) /
          (votosProfessores + votosFuncionarios)
        : 0;
    var votosTotais = qtdPaisAlunos + qtdProfessoresFuncionarios;

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    td1.textContent = chapa.nome;
    td2.textContent = chapa.numero;
    td3.textContent = votosPais;
    td4.textContent = votosAlunos;
    td5.textContent = votosProfessores;
    td6.textContent = votosFuncionarios;
    td7.textContent = votosTotais.toFixed(0);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    elementoPai.appendChild(tr);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var selectElement = document.getElementById("type-vote");

  window.getSelectedValue = function () {
    var selectedValue = selectElement.value;
    console.log("Tipo de voto selecionado:", selectedValue);
    return selectedValue;
  };

  getSelectedValue();

  selectElement.addEventListener("change", getSelectedValue);
});

preenche_lista();

function iniciar() {
  location.replace("inicio.html");
}

function zeresima() {
  nome = [
    "Nulo",
    "Branco",
    "Chapa 1",
    "Chapa 2",
    "Chapa 3",
    "Chapa 4",
    "Chapa 5",
  ];
  numero = ["nulo", "BR", "01", "02", "03", "04", "05"];
  for (i = 0; i < nome.length; i++) {
    localStorage.setItem(
      nome[i],
      JSON.stringify({ nome: nome[i], numero: numero[i], votos: 0 })
    );
  }
  let userPassword = prompt("Digite a senha");

  if (userPassword === password) {
    location.replace("resultados.html");
  } else {
    window.alert("Senha incorreta");
  }
}

function confirma() {
  if (numero != "") {
    let tipoVoto = getSelectedValue();
    console.log("Tipo de Voto Selecionado:", tipoVoto);
    if (
      numero != "01" &&
      numero != "02" &&
      numero != "03" &&
      numero != "04" &&
      numero != "05" &&
      numero != "BR"
    ) {
      numero = "nulo";
    }
    botaoConfirmar = document.getElementById("buttonON");
    botaoConfirmarOff = document.getElementById("buttonOFF");
    botaoConfirmar.style.display = "none";
    botaoConfirmarOff.style.display = "initial";
    confirmasfx.play();
    for (let i = 0; i < listaVoto.length; i++) {
      if (listaVoto[i].numero === numero) {
        listaVoto[i].votos = parseInt(listaVoto[i].votos + 1);
        if (!listaVoto[i].tipos) {
          listaVoto[i].tipos = {
            teacher: 0,
            employee: 0,
            student: 0,
            parents: 0,
          };
        }
        listaVoto[i].tipos[tipoVoto] += 1; // Atualiza o tipo de voto
      }
    }
    console.log(
      `Voto computado: Tipo de voto - ${tipoVoto}, Chapa - ${numero}`
    );
    atualizarLocalStorage();
    if (numero !== "" && count === 3) showHide(numero);
    numero = "";
    count = 0;
    document.getElementById("tela_numero").innerHTML = "‎ ";
    setTimeout(function () {
      location.replace("final.html");
    }, 1800);
  }
}

function branco() {
  if (numero == "") {
    teclafx.play();
    numero = "BR";
    count = 3;
    showHide(numero);
    document.getElementById("tela_numero").innerHTML = numero;
  }
}

function corrige() {
  teclafx.play();
  if (numero != "" && count == 3) showHide(numero);
  numero = "";
  count = 0;
  document.getElementById("tela_numero").innerHTML = "‎ ";
}

function botao(clicked_id) {
  if (count <= 1) {
    numero = numero + clicked_id + "";
    count++;
  }
  if (count == 2) {
    count++;
    showHide(numero);
  }
  teclafx.play();
  document.getElementById("tela_numero").innerHTML = numero;
}

function showHide(my_id) {
  if (
    my_id != "01" &&
    my_id != "02" &&
    my_id != "03" &&
    my_id != "04" &&
    my_id != "05" &&
    my_id != "BR"
  ) {
    my_id = "nulo";
  }
  troca_img = document.getElementById(my_id);
  sem_nada = document.getElementById("nada");
  if (troca_img.style.display == "block") {
    troca_img.style.display = "none";
    sem_nada.style.display = "block";
  } else {
    sem_nada.style.display = "none";
    troca_img.style.display = "block";
  }
}

function end() {
  let userPassword = prompt("Digite a senha");
  if (userPassword === password) {
    var para = new URLSearchParams();
    para.append("iniciado", true);
    location.href = "resultados.html?" + para.toString();
  } else {
    window.alert("Senha incorreta");
  }
}

function cadastrarCandidato() {
  nome = [
    "Nulo",
    "Branco",
    "Chapa 1",
    "Chapa 2",
    "Chapa 3",
    "Chapa 4",
    "Chapa 5",
  ];
  numero = ["nulo", "BR", "01", "02", "03", "04", "05"];
  for (i = 0; i < nome.length; i++) {
    localStorage.setItem(
      nome[i],
      JSON.stringify({ nome: nome[i], numero: numero[i], votos: 0 })
    );
  }
  location.replace("inicio.html");
}

function preenche_lista() {
  console.log("Função preenche_lista chamada.");
  ls_keys = Object.keys(localStorage);
  listaVoto = []; // Reseta a listaVoto para evitar duplicações

  for (var i in ls_keys) {
    var item = JSON.parse(localStorage.getItem(ls_keys[i]));
    console.log("Item encontrado no localStorage:", item);

    // Verifique se item.tipos existe e inicialize se necessário
    if (!item.tipos) {
      item.tipos = {
        teacher: 0,
        employee: 0,
        student: 0,
        parents: 0,
      };
    }

    listaVoto.push(item);
  }

  // Organiza a lista de votos
  var i = 5;
  while (cont <= 3) {
    listaVotoNome = listaVoto[cont].nome;
    listaVotoNumero = listaVoto[cont].numero;
    listaVotoVotos = listaVoto[cont].votos;
    listaVoto[cont].nome = listaVoto[i].nome;
    listaVoto[cont].numero = listaVoto[i].numero;
    listaVoto[cont].votos = listaVoto[i].votos;
    listaVoto[i].nome = listaVotoNome;
    listaVoto[i].numero = listaVotoNumero;
    listaVoto[i].votos = listaVotoVotos;
    if (cont != 2) {
      cont++;
      i--;
    } else if (cont == 2) {
      cont++;
      i += 2;
    }
  }

  console.log("Dados após organizar listaVoto:", listaVoto);
  return listaVoto;
}

function atualizarLocalStorage() {
  for (i = 0; i < listaVoto.length; i++) {
    localStorage.setItem(listaVoto[i].nome, JSON.stringify(listaVoto[i]));
  }
}

function convertePDF(x) {
  let pdf = new jsPDF("p", "pt", "letter");
  if (!x) {
    pdf.text(130, 70, "PREFEITURA MUNICIPAL DE PARNAMIRIM/RN");
    pdf.text(150, 90, "SECRETARIA MUNICIPAL DE EDUCAÇÃO");
    pdf.text(50, 110, "COORDENADORIA DE DESENVOLVIMENTO DA GESTÃO ESCOLAR");
    pdf.text(135, 130, "SETOR DE TECNOLOGIA EDUCACIONAL/GTI");
    pdf.text(150, 220, "Resultado da Eleição: Gestores Escolares");
    pdf.text(230, 240, "(triênio 2025-2027).");
    pdf.text(
      200,
      430,
      "Parnamirim/RN, " + getTempo() + " - " + getHora() + " "
    );
    pdf.text(170, 620, "________________________________");
    pdf.text(182, 650, "COMISSÃO ELEITORAL ESCOLAR");
  }
  if (x) {
    pdf.text(130, 70, "PREFEITURA MUNICIPAL DE PARNAMIRIM/RN");
    pdf.text(150, 90, "SECRETARIA MUNICIPAL DE EDUCAÇÃO");
    pdf.text(50, 110, "COORDENADORIA DE DESENVOLVIMENTO DA GESTÃO ESCOLAR");
    pdf.text(135, 130, "SETOR DE TECNOLOGIA EDUCACIONAL/GTI");
    pdf.text(150, 220, "Resultado da Eleição: Gestores Escolares");
    pdf.text(230, 240, "(triênio 2025-2027).");
    pdf.text(
      200,
      430,
      "Parnamirim/RN, " + getTempo() + " - " + getHora() + " "
    );
    pdf.text(170, 620, "________________________________");
    pdf.text(182, 650, "COMISSÃO ELEITORAL ESCOLAR");
  }

  let source = document.getElementById("div_tabela");

  let specialElementHandlers = {
    "#bypassme": function (element, renderer) {
      return true;
    },
  };

  let margins = {
    top: 250,
    bottom: 30,
    left: 78,
    width: 522,
  };

  pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top,
    {
      width: margins.width, // max width of content on PDF
      elementHandlers: specialElementHandlers,
    },
    function (dispose) {
      pdf.save("Resultados.pdf");
    },
    margins
  );
  alert("Sua votação foi baixada!");
}

function getTempo() {
  let currentDate = new Date();
  var mes = monthNames[currentDate.getMonth()];
  var dia = currentDate.getDate();
  var ano = currentDate.getFullYear();

  let tempo = dia + " de " + mes + " de " + ano;
  return tempo;
}

function getHora() {
  let currentDate = new Date();
  hora = botar_zeros(currentDate.getHours());
  minuto = botar_zeros(currentDate.getMinutes());
  segundo = botar_zeros(currentDate.getSeconds());
  let horas = hora + ":" + minuto + ":" + segundo;
  return horas;
}

function botar_zeros(x) {
  if (x < 10) x = "0" + x;
  return x;
}

function blockButton() {
  let buttonStart = document.getElementById("botaoInicio");
  let buttonContinue = document.getElementById("botaoContinuar");
  let buttonsContainer = document.getElementById("buttons-container");
  if (listaVoto.length > 0) {
    buttonsContainer.style.gap = "0px";
    buttonStart.style.display = "none";
  } else {
    buttonsContainer.style.gap = "0px";
    buttonContinue.style.display = "none";
  }
}
