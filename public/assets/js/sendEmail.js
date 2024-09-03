$(document).ready(function() {
    $('#sendContact').submit(function (e) {
        e.preventDefault();

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        $.ajax({
            url: '/sendEmail',
            type: 'post',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: (res) => {   
                if (!res.ok) {
                    Swal.fire({
                        title: "Erro ao enviar contato",
                        text: "Ocorreu um erro ao enviar sua mensagem, tente novamente.",
                        icon: "error"
                    });
                } else {
                    $('#sendContact')[0].reset();

                    Swal.fire({
                        title: "Contato enviado!",
                        text: "Mensagem enviado com êxito",
                        icon: "success"
                    });
                }
            },
            error: () => {
                Swal.fire({
                    title: "Erro ao enviar contato",
                    text: "Ocorreu um erro ao enviar sua mensagem, tente novamente.",
                    icon: "error"
                });
            }
        })
    })
})