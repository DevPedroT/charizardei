// $(document).ready(function () {
//     let timeout = null;
//     var apiKey

//     $('#search').on('input', function () {
//         clearTimeout(timeout);
//         let nome = $(this).val().trim();
//         if (nome.length < 3) { $('#card-container').html('Buscando...'); return; } // Busca a partir de 3 letras

//         timeout = setTimeout(() => {
//             $.ajax({
//                 url: `https://api.tcgdex.net/v2/en/cards?name=${nome}`,
//                 //url: `https://api.tcgdex.net/v2/en/cards?name=pikachu`,

//                 method: 'GET',
//                 success: function (data) {
//                     console.log(data);
//                     let html = '';
//                     data.forEach(carta => {
//                         html += `
//                             <div class="card">
//                                 <img src="${carta.image}/high.full" alt="${carta.name}">
//                                 <p><strong>${carta.name}</strong></p>
//                             </div>
//                         `;
//                     });
//                     $('#card-container').html(html);
//                 },
//                 error: function () {
//                     $('#card-container').html('<p>Erro ao buscar cartas.</p>');
//                 }
//             });
//         }, 300); // Pequeno delay para evitar requisições excessivas
//     });
// });
//  $.ajax({
//      url: "https://api.pokemontcg.io/v2/cards?q=name:pikachu",  // Alterar para o nome da carta desejada
//      method: "GET",
//      headers: {
//        "X-Api-Key": "2573b647-157e-4703-b33d-b365ba7e6d68"  // Insira seu token aqui, se necessário
//      },
//      success: function(response) {
//        // Filtrar a resposta para encontrar a carta em português
//        console.log(response)
//        const cartaEmPortugues = response.data.filter(carta => carta.languages.includes("pt"));
//
//        // Exibir a carta
//        if (cartaEmPortugues.length > 0) {
//          console.log("Carta encontrada em português:", cartaEmPortugues[0]);
//        } else {
//          console.log("Carta não encontrada em português.");
//        }
//      },
//      error: function(error) {
//        console.log("Erro ao fazer a requisição:", error);
//      }
//    });
$(document).ready(function () {
    let timeout = null;
    var apiKey = { 'X-Api-Key': '2573b647-157e-4703-b33d-b365ba7e6d68' }
    $('#search').on('input', function () {
        clearTimeout(timeout);
        let nome = $(this).val().trim();
        if (nome.length < 1) { $('#card-container').html('Buscando ...'); return; } // Busca desde a primeira letra

        timeout = setTimeout(() => {
            $.ajax({
                url: `https://api.pokemontcg.io/v2/cards?q=name:*${nome}*`, // Busca por qualquer parte do nome
                method: 'GET',
                headers: apiKey,
                success: function (data) {
                    console.log(data)
                    let html = '';
                    data.data.forEach(carta => {
                        html += `
                           <div class="card">
                               <img src="${carta.images.small}" alt="${carta.name}">
                               <p><strong>${carta.name}</strong></p>
                               <p>Set: ${carta.set.name}</p>
                           </div>
                       `;
                    });
                    $('#card-container').html(html);
                },
                error: function () {
                    $('#card-container').html('<p>Erro ao buscar cartas.</p>');
                }
            });
        }, 300); // Pequeno delay para evitar requisições excessivas
    });
});



function handleCredentialResponse(response) {
    // O token JWT do usuário
    console.log("Credenciais do usuário:", response.credential);

    // Decodificar as informações do usuário
    const userData = jwt_decode(response.credential);
    console.log("Usuário logado:", userData);

    // Aqui você pode enviar os dados para o backend para autenticação
}