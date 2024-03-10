import { frege } from 'fregejs';


document.querySelectorAll(".logic-button").forEach((button) => {
  button.addEventListener("click", function () {
    insert(this.textContent);
  });
});
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", function () {
      if (this.textContent === "DEL") {
          var telinha = document.getElementById("resultado");
          telinha.textContent = telinha.textContent.slice(0, -1); 
      } else if (this.textContent === "AC") {
          var telinha = document.getElementById("resultado");
          telinha.textContent = "";
      }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    deleteChar();
  } else if (event.key === "ArrowLeft") {
    moveCursorLeft();
  } else if (event.key === "ArrowRight") {
    moveCursorRight();
  }
  else
    event.preventDefault();
});

function insert(text) {
  var telinha = document.getElementById("resultado");
  telinha.textContent += text;
}

function analiseLexica(formula) {
  const regex = /^[~^v→↔]+$/;
  return regex.test(formula);
}

function analisadorSintatico(formula) {
  try {
    new Function("return " + formula); 
    return true; 
  } catch (error) {
    return false; 
  }
}


function exibirResultados(formula, lexica, sintatica, tautologia) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <p>Fórmula: ${formula}</p>
    <p>Análise Léxica: ${lexica ? "Válida" : "Inválida"}</p>
    <p>Analisador Sintático: ${sintatica ? "Válida" : "Inválida"}</p>
    <p>Provador de Tautologia: ${
      tautologia ? "É uma tautologia" : "Não é uma tautologia"
    }</p>

  `;
}


document.querySelector(".button-calc").addEventListener("click", function() {
  var expressaoLogica = document.getElementById("resultado").textContent;
  var resultadoCalculo = calcularExpressaoLogica(expressaoLogica);
});

function calcularExpressaoLogica(expressao) {
    var expressaoNaoTratada = expressao
    expressao = expressao.replace(/~/g, "¬");

    expressao = expressao.replace(/→/g, "->");
    expressao = expressao.replace(/↔/g, "<->");
    const truthTable = frege.generateTruthTable(expressao);
    // printTruthTable(truthTable);
    generateHTMLTruthTable(truthTable)
    const lexica = "";
    const sintatica = "";
    const tautologia = frege.isTautology(expressao);
    exibirResultados(expressaoNaoTratada, lexica, sintatica, tautologia);
}



function generateHTMLTruthTable(truthTable) {
  let htmlTable = '<table class="tabela-verdade">';
  
  htmlTable += '<tr>';
  truthTable.headers.forEach(header => {
    htmlTable += `<th>${header}</th>`;
  });
  htmlTable += '</tr>';
  
  for (let i = 0; i < truthTable.truthCombinations.length; i++) {
    htmlTable += '<tr>';
    const combination = truthTable.truthCombinations[i];
    combination.forEach(value => {
      const formattedValue = value ? "<span style='color:green'>T</span>" : "<span style='color:red'>F</span>";
      htmlTable += `<td class="tabela-verdade">${formattedValue}</td>`;
    });
    const formattedValue = truthTable.truthValues[i] ? "<span style='color:green'>T</span>" : "<span style='color:red'>F</span>";
    htmlTable += `<td class="tabela-verdade">${formattedValue}</td>`;
    htmlTable += '</tr>';
  }

  htmlTable += '</table>';
  
  var resultsDiv = document.getElementById("tabela");
  resultsDiv.innerHTML = htmlTable;
}
