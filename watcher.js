const { exec } = require("child_process");
const chokidar = require("chokidar");

// Monitora todos os arquivos na pasta atual
chokidar.watch(".", { ignored: /node_modules|\.git/ }).on("change", (path) => {
    console.log(`Arquivo modificado: ${path}`);
    
    // Executa os comandos Git
    exec('git add . && git commit -m "Atualização automática" && git push origin main', (err, stdout, stderr) => {

        if (err) {
            console.error(`Erro ao executar Git: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
});

console.log("Monitorando arquivos... (Ctrl+C para parar)");
