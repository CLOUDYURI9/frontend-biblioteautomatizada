
async function enviaFormulario() {
    // recuperar as informações do formulário e colocar em objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,
        "autor": document.querySelectorAll("input")[1].value,
        "editora": document.querySelectorAll("input")[2].value,
        "anoPublicacao": Number(document.querySelectorAll("input")[3].value),
        "isbn": document.querySelectorAll("input")[4].value,
        "quantTotal": Number(document.querySelectorAll("input")[5].value),
        "quantDisponivel": Number(document.querySelectorAll("input")[6].value),
        "valorAquisicao": Number(document.querySelectorAll("input")[7].value),
        "statusLivroEmprestado": document.querySelectorAll("input")[8].value
    }

    console.log(livroDTO)

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/livro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contate o administrador do sistema");
        }
    
        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaLivros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/livro");

        if (!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeLivros = await respostaServidor.json();

        criarTabelaLivros(listaDeLivros)
    } catch (error) {
        console.log('Erro ao comunicar com o servidor');
        console.log(error);
    }
}

async function criarTabelaLivros(livros) {
    const tabela = document.getElementById('corpoLivro');

    livros.forEach(livro => {
        // Cria uma nova linha da tabela
        const linha = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const id = document.createElement('td');
        id.textContent = livro.idLivro; // Preenche com o id do aluno


        const titulo = document.createElement('td');
        titulo.textContent = livro.titulo; // Preenche com a ra do aluno


        const autor = document.createElement('td');
        autor.textContent = livro.autor; // Preenche com o nome do aluno

        const editora = document.createElement('td');
        editora.textContent = livro.editora; // Preenche com o sobrenome do aluno


        const anoPublicacao = document.createElement('td');
        anoPublicacao.textContent = livro.anoPublicado; // Preenche com a data de nascimento do aluno

        const isbn = document.createElement('td');
        isbn.textContent = livro.isbn; // Preenche com o endereço do aluno

        const quantTotal = document.createElement('td');
        quantTotal.textContent = livro.quantTotal; 

        const quantDisponivel = document.createElement('td');
        quantDisponivel.textContent = livro.quantDisponivel;

        const valorAquisicao = document.createElement('td');
        valorAquisicao.textContent = 'R$ ' + livro.valorAquisicao;

        const statusLivroEmprestado = document.createElement('td');
        statusLivroEmprestado.textContent = livro.statusLivroEmprestado;


        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img');
        iconAtualizar.src = 'assets/icons/pencil-square.svg';
        iconAtualizar.addEventListener('click', () => {
            window.location.href = "./atualizar-livro.html";
        });


        const iconExcluir = document.createElement('img');
        iconExcluir.addEventListener("click", () => excluirLivro(livro.idLivro)); 
        iconExcluir.src = 'assets/icons/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir'; 

        //chamando
        linha.appendChild(id);
        linha.appendChild(titulo);
        linha.appendChild(autor);
        linha.appendChild(editora);
        linha.appendChild(anoPublicacao);
        linha.appendChild(isbn);
        linha.appendChild(quantTotal);
        linha.appendChild(quantDisponivel);
        linha.appendChild(valorAquisicao);
        linha.appendChild(statusLivroEmprestado);
        tdAcoes.appendChild(iconAtualizar); 
        linha.appendChild(tdAcoes); 
        tdAcoes.appendChild(iconExcluir); 

       
        tabela.appendChild(linha);

    });

    async function excluirLivro(idLivro) {
        const url = `http://localhost:3333/delete/livro/${idLivro}`;
    
        try {
            const response = await fetch(url, { method: 'DELETE' });
    
            if (response.ok) {
                alert('Livro removido com sucesso');
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Erro: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao tentar excluir o livro.');
        }
    }
}