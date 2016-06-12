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
      <div class="table-pricing-3">
        <ul class="list-unstyled row">
          <li class="col-md-4">
            <div class="innerAll">
              <h3>Déjà inscrit</h3>
              <div class="pricing-body">
                <div class="price">
                  <span class="term">Toujours</span>
                  <span class="figure">gratuit</span>
                </div>

              </div>
              <div class="pricing-features">
                <ul>
                  <li>Utilisateur existant</li>
                </ul>
              </div>
              <div class="pricing-footer">
                <a href="{{ url('/connexion') }}" role="button" class="btn btn-info"><i class="fa fa-unlock-alt"></i> Connexion</a>
              </div>
            </div>
          </li>
          <li class="col-md-4 active">
            <div class="innerAll">
              <h1>QuiVa?</h1>
              <div class="pricing-body">
                <div class="price">
                  Gratuit
                </div>
              </div>
              <div class="pricing-features">
                <ul>
                  <li>Gestionnaire de billets</li>
                  <li>Nombre
                    <strong>illimité</strong> d'amis</li>
                  <li>Partage de billets</li>
                  <li>Application mobile</li>
                </ul>
              </div>
              <div class="pricing-footer">
                <a href="{{ url('/inscription') }}" role="button" class="btn btn-success"><i class="icon-user-1"></i> Inscription</a>
              </div>
            </div>
          </li>
          <li class="col-md-4">
            <div class="innerAll">
              <h3>Développeur</h3>
              <div class="pricing-body">
                <div class="price">
                  <span class="figure">API</span>
                  <span class="term">REST</span>
                </div>
              </div>
              <div class="pricing-features">
                <ul>
                  <li>Documentation</li>
                </ul>
              </div>
              <div class="pricing-footer">
                <a href="{{ url('/api') }}" role="button" class="btn btn-info"><i class="md-extension"></i> Notre API!</a>
              </div>
            </div>
          </li>
        </ul>
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