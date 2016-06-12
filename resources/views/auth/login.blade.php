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
          <form class="form-horizontal" role="form" method="POST" action="{{ url('/connexion') }}">
            {{ csrf_field() }}

            <div class="panel-body">

              <div class="{{ $errors->has('email') ? ' has-error' : '' }}">
                  <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="Courriel">

                  @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                  @endif
              </div>

                <div class="{{ $errors->has('password') ? ' has-error' : '' }}">
                    <input id="password" type="password" class="form-control" name="password" placeholder="Mot de passe">

                    @if ($errors->has('password'))
                        <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                    @endif
                </div>


                <div class="checkbox checkbox-primary">
                    <input id="checkbox" type="checkbox" name="remember">
                    <label for="checkbox">Se souvenir de moi</label>
                </div>

                <button type="submit" class="btn btn-primary">
                    <i class="fa fa-btn fa-sign-in"></i> Connexion
                </button>

              <a href="{{ url('/password/reset') }}" class="forgot-password">Mot de passe oublié?</a>
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