// Recuperar os parâmetros da URL
const params = new URLSearchParams(window.location.search);

// Criar objeto com os dados
const dadosLivro = {
    titulo: params.get('titulo'),
    autor: params.get('autor'),
    editora: params.get('editora'),
    anoPublicacao: params.get('anoPublicacao'),
    isbn: params.get('isbn'),
    quantTotal: params.get('quantTotal'),
    quantDisponivel: params.get('quantDisponivel'),
    valorAquisicao: params.get('valorAquisicao'),
    statusLivroEmprestado: params.get('statusLivroEmprestado'),
    idLivro: params.get('idLivro')
};

console.log(dadosLivro);
// Agora você pode usar esses dados para preencher o formulário ou processar conforme necessário.


document.querySelectorAll("input")[0].value = dadosLivro.titulo;
document.querySelectorAll("input")[1].value = dadosLivro.autor;
document.querySelectorAll("input")[2].value = dadosLivro.editora;
document.querySelectorAll("input")[3].value = dadosLivro.anoPublicacao;
document.querySelectorAll("input")[4].value = dadosLivro.isbn;
document.querySelectorAll("input")[5].value = dadosLivro.quantTotal;
document.querySelectorAll("input")[6].value = dadosLivro.quantDisponivel;
document.querySelectorAll("input")[7].value = dadosLivro.valorAquisicao;
document.querySelectorAll("input")[8].value = dadosLivro.statusLivroEmprestado;


async function atualizaFormulario() {
    // Recuperar as informações do formulário e colocar em objeto JSON
    const livroDTO = {
        "id": dadosLivro.idEmprestimo, // ID do emprestimo para atualização
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "anoPublicacao": document.querySelectorAll("input")[3].value,
        "isbn": document.querySelectorAll("input")[4].value,
        "quantTotal": Number(document.querySelectorAll("input")[5].value),
        "quantDisponivel": Number(document.querySelectorAll("input")[6].value),
        "valorAquisicao": Number(document.querySelectorAll("input")[7].value),
        "statusEmprestimo": document.querySelectorAll("input")[8].value
    }

    console.log(livroDTO);
    try {
        const respostaServidor = await fetch(`http://localhost:3333/atualizar/livro/${livroDTO.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao atualizar os dados no servidor. Contate o administrador do sistema");
        }

        alert("Dados do aluno atualizados com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

