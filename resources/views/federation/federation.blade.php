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
        <h1>Demande d'accès</h1>

        <div class="panel panel-default text-center">
            <h4>L'application {{$client->getName()}} aimerait accéder à votre profil QuiVa?</h4>
          <img alt="Photo avatar" src="images/people/110/guy-unknown.jpg" class="img-circle">
            <h2>{{$user}}</h2>
          <form class="form-horizontal" role="form" method="POST" action="{{route('oauth.authorize.post', $params)}}">
              <div class="panel-body">
                  {{ csrf_field() }}
                  <input type="hidden" name="client_id" value="{{$params['client_id']}}">
                  <input type="hidden" name="redirect_uri" value="{{$params['redirect_uri']}}">
                  <input type="hidden" name="response_type" value="{{$params['response_type']}}">
                  <input type="hidden" name="state" value="{{$params['state']}}">
                  <input type="hidden" name="scope" value="{{$params['scope']}}">

                  <button type="submit" class="btn btn-success" name="approve" value="1">Accepter</button>
                  <button type="submit" class="btn btn-danger" name="deny" value="1">Refuser</button>
              </div>

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