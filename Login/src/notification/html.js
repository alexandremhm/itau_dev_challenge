const generateHtml = (email) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Olá, ${email}</h1>

  <h2>Por motivos de segurança a sua conta foi bloqueada!!!</h2>
  
  <h2>Você pode cadastrar uma nova senha após clicar no link abaixo e confirmar alguns dados cadastrais.</h2>

  </br>

  <a style="font-size: 20px" href="www.changepassword.com">changepassword.com</a>

  </br>

  <h3>Muito obrigado</h3>
</body>
</html>`

module.exports = {generateHtml};
