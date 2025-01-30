$(document).ready(function () {
   
    $.ajax({
        url: 'http://localhost:3000/atualizar', // Apenas /salvar
        method: 'GET',
        contentType: 'application/json', // Enviando o texto no corpo da requisição
        success: function (response) {
        
            if(!response.result || response.result.length === 0){
                criapadrao();
            }else{
                
        $('.mensagem').text(response.result[0].conteudo);

            }
           
                    
        },
        error: function (xhr, status, error) {
            console.error('Erro ao salvar o texto:', error);
            alert('Erro ao salvar o texto.');
        }
    });
     
  




    function criapadrao(){

        const texto = "Não há mensagens armazenadas";


        $.ajax({
            url: 'http://localhost:3000/salvar', // Apenas /salvar
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ texto }), // Enviando o texto no corpo da requisição
            success: function (response) {
                console.log("sem mensagem no banco");
                $('.mensagem').text("sem mensagem no banco");
            },
            error: function (xhr, status, error) {
                console.error('Erro ao salvar o texto:', error);
                alert('Erro ao salvar o texto.');
            }
        });
    };

     $('.btn_limpar').on('click', (e)=>{
         const texto = "limpando";
        $.ajax({
            url: 'http://localhost:3000/salvar', // Apenas /salvar
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ texto }), // Enviando o texto no corpo da requisição
            success: function (response) {
                alert('Texto limpo com sucesso!');
                criapadrao();
            },
            error: function (xhr, status, error) {
                console.error('Erro ao deletar o texto:', error);
                alert('Erro ao deletar o texto.');
            }
        });


     });



    $('.btn_enviar').on('click', function (e) {
     // Impede o envio padrão do formulário
       console.log($('#msg_buffer').val());
      const texto = $('#msg_buffer').val();
     // console.log(texto);
     $.ajax({
      url: 'http://localhost:3000/salvar', // Apenas /salvar
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify({ texto }), // Enviando o texto no corpo da requisição
      success: function (response) {
          alert('Texto deletado com sucesso!');
      },
      error: function (xhr, status, error) {
          console.error('Erro ao deletar o texto:', error);
          alert('Erro ao deletar o texto.');
      }
  });



     $.ajax({
      url: 'http://localhost:3000/salvar', // Apenas /salvar
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ texto }), // Enviando o texto no corpo da requisição
      success: function (response) {
          alert('Texto salvo com sucesso!');
      },
      error: function (xhr, status, error) {
          console.error('Erro ao salvar o texto:', error);
          alert('Erro ao salvar o texto.');
      }
  });

    $.ajax({
        url: 'http://localhost:3000/atualizar', // Apenas /salvar
        method: 'GET',
        contentType: 'application/json', // Enviando o texto no corpo da requisição
        success: function (response) {
            console.log(response.result);
          $('.mensagem').text(response.result[0].conteudo);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao salvar o texto:', error);
            alert('Erro ao salvar o texto.');
        }
    });

  
  
    
    });
  });