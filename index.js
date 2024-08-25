const fs = require("fs");
const path = require("path");

/**
 * Substitui o texto de uma linha a partir do termo de busca até o fim dessa linha em todos os arquivos especificados em um diretório.
 * @param {string} directory Caminho do diretório a ser escaneado.
 * @param {string} search Texto a ser procurado na linha para iniciar a substituição.
 * @param {string} replace Texto de substituição para o final da linha.
 * @param {Array<string>} filesExt Extensões de arquivo a serem processadas.
 */
function replaceInFiles(directory, search, replace, filesExt = [".js"]) {
  // Lê o diretório
  fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error("Falha ao ler o diretório:", err);
      return;
    }
    entries.forEach((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        // Recursivamente substitui nos subdiretórios
        replaceInFiles(fullPath, search, replace, filesExt);
      } else if (
        entry.isFile() &&
        filesExt.includes(path.extname(entry.name))
      ) {
        // Processa apenas arquivos com extensões especificadas
        fs.readFile(fullPath, "utf8", (err, data) => {
          if (err) {
            console.error(`Erro ao ler o arquivo ${fullPath}:`, err);
            return;
          }

          // Separa o conteúdo do arquivo em linhas e substitui conforme necessário
          const updatedData = data
            .split("\n")
            .map((line) => {
              const startIndex = line.indexOf(search);
              if (startIndex !== -1) {
                // Substitui do texto de busca até o final da linha
                return (
                  line.substring(0, startIndex) +
                  replace +
                  line.substring(line.length - 2)
                );
              }
              return line;
            })
            .join("\n");

          if (updatedData !== data) {
            fs.writeFile(fullPath, updatedData, "utf8", (err) => {
              if (err) {
                console.error(`Erro ao escrever no arquivo ${fullPath}:`, err);
              } else {
                console.log(`${fullPath} foi atualizado.`);
              }
            });
          }
        });
      }
    });
  });
}

module.exports = { replaceInFiles };
