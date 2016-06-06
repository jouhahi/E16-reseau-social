<!DOCTYPE html>
<html class="hide-sidebar ls-bottom-footer" lang="fr">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Joey Dubé, Pascal Henrichon, Javier Sanchez">
  <title>QuiVa?</title>
  <!-- Le gabarit de l'application provient de http://themekit-v4.themekit.io/ et l'auteur est mosaicpro. -->

  <link href="css/vendor/all.css" rel="stylesheet">

  <link href="css/app/app.css" rel="stylesheet">

</head>

<body class="login">

  <div id="content">
    <div class="container-fluid">

      <div class="lock-container">
        <h1>Connexion au profil</h1>
        <div class="panel panel-default text-center">
          <img alt="Photo avatar" src="images/people/110/guy-unknown.jpg" class="img-circle">
          <div class="panel-body">
            <input class="form-control" type="text" placeholder="Courriel">
            <input class="form-control" type="password" placeholder="Mot de passe">

            <a href="flux.blade.php" class="btn btn-primary">Connexion <i class="fa fa-fw fa-unlock-alt"></i></a>
            <a href="reinitialiser.blade.php" class="forgot-password">Mot de passe oublié?</a>
          </div>
        </div>
      </div>

    </div>
  </div>

  <footer class="footer">
    <strong>QuiVa?</strong> 1.0.0 &copy; Copyright 2016 - Joey Dubé, Pascal Henrichon, Javier Sanchez
  </footer>

  <script src="js/app/config_site.js"></script>

  <script src="js/vendor/all.js"></script>

  <script src="js/app/app.js"></script>

</body>

</html>