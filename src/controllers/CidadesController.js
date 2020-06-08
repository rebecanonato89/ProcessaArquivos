const fs = require("fs");
const contentFilePathEstados = "./src/arquivos/Estados.json";
const contentFilePathCidades = "./src/arquivos/Cidades.json";
const filePath = "./src/arquivos/";
let cidades = null;
let estados = null;
let estadoMaiorCidade = [];
let estadoMenorCidade = [];

function loadEstados(){
  const fileBuffer = fs.readFileSync(contentFilePathEstados, "utf8");
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
};

function loadCidades(){
  const fileBuffer = fs.readFileSync(contentFilePathCidades, "utf8");
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
};

function loadCidadesPorEstados(uf){
  const fileBuffer = fs.readFileSync(filePath + uf + ".json", "utf8");
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
};

// Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
function saveEstadoCidade(estados, cidades) {
  estados.forEach(estado => {
    const cidadesEstado = cidades.filter(item => item.Estado === estado.ID)
    const contentString = JSON.stringify({ nomeEstado: estado.Nome, cidadesEstado });
    fs.writeFileSync(filePath + estado.Sigla + ".json", contentString);
    });
};

function estadosNumCidades(estados){
  let totalCidades = [];
  estados.forEach(estado => {
    cidades = loadCidadesPorEstados(estado.Sigla.toUpperCase());
    totalCidades.push({'uf': estado.Sigla.toUpperCase(), 'numCidades': cidades.cidadesEstado.length});
  });
  return totalCidades;
};

function retornaMaiorCidade(estados){
  let bigFor = "";
  return estados.forEach(estado => {
    cidades = (loadCidadesPorEstados(estado.Sigla.toUpperCase()));
    bigFor = "";
      for (word of cidades.cidadesEstado) {
        if (word.Nome.trim().length > bigFor.length) {
          bigFor = word.Nome.trim();
        }
      }
      estadoMaiorCidade.push({"Estado": estado.Sigla, "CidadeMaiorNome":bigFor});
  });
};

function retornaMenorCidade(estados){
  let smallFor = "";
  return estados.forEach(estado => {
    cidades = (loadCidadesPorEstados(estado.Sigla.toUpperCase()));
    smallFor = "";
      for (word of cidades.cidadesEstado) {
        if (smallFor.length == "") {
          smallFor = word.Nome.trim();
        }
        if (word.Nome.trim().length < smallFor.length) {
          smallFor = word.Nome.trim();
        }
      }
      estadoMenorCidade.push({"Estado": estado.Sigla, "cidadeMenorNome": smallFor});
  });
};

module.exports = {
    index(request, response) {
      estados = loadEstados();
      cidades = loadCidades();
      saveEstadoCidade(estados, cidades);     
      return response.json({ retorno: "Arquivos salvos com Sucesso!!!" });
    },

    // Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
    select(request, response) {
      let { uf } = request.params;
      let totalCidades;
      cidades = loadCidadesPorEstados(uf.toUpperCase());
      totalCidades = cidades.cidadesEstado.length;
      return response.json({ retorno: "O Estado: " + uf + " tem um total de: " + totalCidades + " cidades." });
    },

    //Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
    calculoMaioresCidades(request, response){
      estados = loadEstados();
      let totalCidades = estadosNumCidades(estados);

      totalCidades.sort(function (a, b) {
        return b.numCidades - a.numCidades;
      });

      let cincoCidadesMaiores = totalCidades.slice(0, 5);

      response.json({ cincoCidadesMaiores });
    },

    //Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
    calculoMenoresCidades(request, response){
      estados = loadEstados();
      let totalCidades = estadosNumCidades(estados);

      totalCidades.sort(function (a, b) {
        return b.numCidades - a.numCidades;
      });

      let cincoCidadesMaiores = totalCidades.slice(22);

      response.json({ cincoCidadesMaiores });
    },

    //Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
    calculoMaiorNomeCidade(request, response){
      estados = loadEstados();
      retornaMaiorCidade(estados);
      response.json({ estadoMaiorCidade });
    },

    //Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
    calculoMenorNomeCidade(request, response){
      estados = loadEstados();
      retornaMenorCidade(estados);
      response.json({ estadoMenorCidade });
    },

    calculoMaiorCidade(request, response){
      let bigFor = "";
      estados = loadEstados();

      retornaMaiorCidade(estados);

      for (word of estadoMaiorCidade) {
        if (word.CidadeMaiorNome.trim().length > bigFor.length) {
          bigFor = word.CidadeMaiorNome.trim();
        }
      }

      response.json({ bigFor });
    },

    calculoMenorCidade(request, response){
      let smallFor = "";
      estados = loadEstados();

      retornaMenorCidade(estados);

      for (word of estadoMenorCidade) {
        if (smallFor.length == "") {
          smallFor = word.cidadeMenorNome.trim();
        }
        if (word.cidadeMenorNome.trim().length < smallFor.length) {
          smallFor = word.cidadeMenorNome.trim();
        }
      }

      response.json({ smallFor });
    },

};