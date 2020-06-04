const fs = require("fs");
const contentFilePathEstados = "./src/arquivos/Estados.json";
const contentFilePathCidades = "./src/arquivos/Cidades.json";
const filePath = "./src/arquivos/";
let cidades = null;
let estados = null;

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


      // cidades.cidadesEstado.forEach((cidade, index) => {
      //    totalCidades = index;
      // });

      // totalCidades = totalCidades + 1;

      totalCidades = cidades.cidadesEstado.length;


      return response.json({ retorno: "O Estado: " + uf + " tem um total de: " + totalCidades + " cidades." });
    }
};