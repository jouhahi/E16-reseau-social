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

        <h1 class="page-section-heading">API</h1>

        <!-- Tabbable Widget -->
        <div class="tabbable tabs-vertical tabs-left">

          <!-- Tabs -->
          <ul class="nav nav-tabs">
            <li class="active"><a href="#debut" data-toggle="tab"><i class="fa fa-fw fa-home"></i> Pour commencer</a></li>
            <li><a href="#authentification" data-toggle="tab"><i class="fa fa-fw fa-unlock-alt"></i> Authentification</a></li>
            <li><a href="#profile4" data-toggle="tab"><i class="fa fa-fw fa-user"></i> Profile</a></li>
            <li><a href="#messages4" data-toggle="tab"><i class="fa fa-fw fa-envelope"></i> Messages</a></li>
          </ul>
          <!-- // END Tabs -->

          <!-- Panes -->
          <div class="tab-content">
            <div id="debut" class="tab-pane active">
                <p>
                    Le réseau social implémente une importante API pour permettre à différents clients d’accéder à ses ressources. Comme certaines ressources demandent un accès spécial et que les API REST sont sans état (stateless), un système de jeton est implémenté pour valider l'identité du consommateur de l’API.
                </p>
                <p>
                    Pour alléger la documentation, l’URL inscrite dans les prochaines sections est tronquée. Il faut, en effet, ajouter « https://quiva.herokuapp.com/api » au début des URL.
                </p>
            </div>
            <div id="authentification" class="tab-pane">
                <h2>Obtenir un jeton d'authentification <small>pour la fédération</small></h2>

                <p>Lorsqu’une connexion est faite à l’aide de la fédération, le réseau social retourne un code d’accès. Ce code d’accès peut être échangé contre un jeton permettant d’utiliser l’API du réseau social. Le code peut être utilisé une seule fois et est valide pendant 10 minutes.</p>
                <p>Pour obtenir un jeton permettant d’utiliser les fonctions de l’API demandant une authentification, il faut échanger le code contre ce jeton. Ce double échange permet de sécuriser l’obtention du jeton et réduit les risques de sécurité. Le jeton est valide indéfiniment ou jusqu’à l’obtention d’un nouveau jeton.</p>
                <p>L’authentification pour la fédération est basée sur la <a href="https://tools.ietf.org/html/rfc6749#section-4.1">section 4.1 du RFC6749</a>.</p>

                <h4>Requête</h4>

                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th class="col-md-1">Méthode</th>
                            <th>URL</th>
                        </tr>
                    </thead>

                    <tbody>
                        <td>POST</td>
                        <td>/jetons/federation</td>
                    </tbody>
                </table>

                <h4>Paramètres</h4>

                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th class="col-md-1">Emplacement</th>
                        <th class="col-md-1">Nom</th>
                        <th class="col-md-1">Type</th>
                        <td class="col-md-6">Description</td>
                    </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>x-www-form-urlencoded</td>
                            <td>grant_type</td>
                            <td>string</td>
                            <td><b>Obligatoire.</b> Inscrire “authorization_code”. Ce champs permet de définir le type d’accès demandé. L’authentification par fédération se sert d’un code d’autorisation.</td>
                        </tr>

                        <tr>
                            <td>x-www-form-urlencoded</td>
                            <td>code</td>
                            <td>string</td>
                            <td><b>Obligatoire.</b> Code obtenu lors de la redirection faite par la fédération après l’authentification.</td>
                        </tr>

                        <tr>
                            <td>x-www-form-urlencoded</td>
                            <td>redirect_uri</td>
                            <td>string</td>
                            <td><b>Obligatoire.</b>  Lien de redirection utilisé lors de la connexion par fédération.</td>
                        </tr>

                        <tr>
                            <td>x-www-form-urlencoded</td>
                            <td>client_id</td>
                            <td>string</td>
                            <td><b>Obligatoire.</b>  Identifiant du client utilisant l’API. Le client est l’application faisant la demande d’authentification et doit être préalablement enregistrée auprès du réseau social.</td>
                        </tr>
                    </tbody>
                </table>

                <h4>Réponses</h4>

                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th class="col-md-1">Statut</th>
                        <th>Réponse</th>
                    </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>200</td>
                            <td>
                                <pre>{<br/>  "token_type": "Bearer",<br/>  "access_token": "2YotnFZFEjr1zCsicMWpAA"<br/>}</pre>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
            <div id="messages4" class="tab-pane">
              Ab accusamus aperiam consequatur ducimus ea eos est, non omnis porro possimus
              praesentium, provident quam quibusdam quidem quo suscipit voluptate? Aperiam,
              dolorum eaque labore natus placeat sint totam. Cupiditate eos explicabo fugiat
              labore natus officia quidem sed ullam veniam voluptatibus. Consequatur, ducimus
              id, iste modi nesciunt nostrum obcaecati odit porro quaerat quibusdam quisquam,
              sequi similique vero. Adipisci aliquid at aut culpa cumque distinctio earum esse
              eveniet excepturi exercitationem harum illum in iste laudantium mollitia, nulla
              numquam perferendis perspiciatis porro qui, quo quod ratione similique suscipit
              temporibus ullam voluptas voluptates! Aperiam atque dolor excepturi illum in,
              magnam nemo quidem tempora vitae.
            </div>
          </div>
          <!-- // END Panes -->

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