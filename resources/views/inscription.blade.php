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
      <div class="panel panel-default">

        <div class="panel-body">
          <h1>Inscription</h1>
          <form action="flux.blade.php">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group form-control-default">
                  <label for="exampleInputFirstName">Prénom</label>
                  <input type="email" class="form-control" id="exampleInputFirstName" placeholder="Votre prénom">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group form-control-default">
                  <label for="exampleInputLastName">Nom</label>
                  <input type="email" class="form-control" id="exampleInputLastName" placeholder="Votre nom">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group form-control-default">
                  <label for="exampleInputFirstName">Adresse</label>
                  <input type="email" class="form-control" id="exampleInputAddress" placeholder="Votre adresse">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group form-control-default">
                  <label for="exampleInputLastName">Ville</label>
                  <input type="email" class="form-control" id="exampleInputCity" placeholder="Votre ville">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group form-control-default">
                  <label for="exampleInputFirstName">Province</label>
                  <input type="email" class="form-control" id="exampleInputProvince" placeholder="Votre province">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group form-control-default">
                  <label for="exampleInputLastName">Code postal</label>
                  <input type="email" class="form-control" id="exampleInputZipCode" placeholder="Votre code postal">
                </div>
              </div>
            </div>

            <div class="form-group form-control-default required">
              <label for="exampleInputEmail1">Courriel</label>
              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Votre courriel">
            </div>
            <div class="form-group form-control-default required">
              <label for="exampleInputPassword1">Mot de passe</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe">
            </div>
            <button type="submit" class="btn btn-primary">Valider</button>
          </form>
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