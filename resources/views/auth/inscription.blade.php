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
          <div class="panel-heading">
              <h1>Inscription</h1>
          </div>
      <div class="panel-body">
          <form class="form-horizontal" method="POST" action="{{ url('/inscription') }}">
            {{ csrf_field() }}

              <div class="form-group{{ $errors->has('prenom') ? ' has-error' : '' }}">
                  <label for="prenom" class="col-md-4 control-label">Prénom</label>

                  <div class="col-md-6">
                      <input id="prenom" type="text" class="form-control" name="prenom" value="{{ old('prenom') }}">

                      @if ($errors->has('prenom'))
                        <span class="help-block">
                            <strong>{{ $errors->first('prenom') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('nom') ? ' has-error' : '' }}">
                  <label for="nom" class="col-md-4 control-label">Nom</label>

                  <div class="col-md-6">
                      <input id="nom" type="text" class="form-control" name="nom" value="{{ old('nom') }}">

                      @if ($errors->has('nom'))
                        <span class="help-block">
                            <strong>{{ $errors->first('nom') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('adresse') ? ' has-error' : '' }}">
                  <label for="adresse" class="col-md-4 control-label">Adresse</label>

                  <div class="col-md-6">
                      <input id="adresse" type="text" class="form-control" name="adresse" value="{{ old('adresse') }}">

                      @if ($errors->has('adresse'))
                        <span class="help-block">
                            <strong>{{ $errors->first('adresse') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('ville') ? ' has-error' : '' }}">
                  <label for="ville" class="col-md-4 control-label">Ville</label>

                  <div class="col-md-6">
                      <input id="ville" type="text" class="form-control" name="ville" value="{{ old('ville') }}">

                      @if ($errors->has('ville'))
                        <span class="help-block">
                            <strong>{{ $errors->first('ville') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('province') ? ' has-error' : '' }}">
                  <label for="province" class="col-md-4 control-label">Province</label>

                  <div class="col-md-6">
                      <input id="province" type="text" class="form-control" name="province" value="{{ old('province') }}">

                      @if ($errors->has('province'))
                        <span class="help-block">
                            <strong>{{ $errors->first('province') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('code_postal') ? ' has-error' : '' }}">
                  <label for="code_postal" class="col-md-4 control-label">Code postal</label>

                  <div class="col-md-6">
                      <input id="code_postal" type="text" class="form-control" name="code_postal" value="{{ old('code_postal') }}">

                      @if ($errors->has('code_postal'))
                        <span class="help-block">
                            <strong>{{ $errors->first('code_postal') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                  <label for="email" class="col-md-4 control-label">Email</label>

                  <div class="col-md-6">
                      <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}">

                      @if ($errors->has('email'))
                        <span class="help-block">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                  <label for="password" class="col-md-4 control-label">Mot de passe</label>

                  <div class="col-md-6">
                      <input id="password" type="password" class="form-control" name="password">

                      @if ($errors->has('password'))
                        <span class="help-block">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                  <label for="password_confirmation" class="col-md-4 control-label">Confirmer le mot de passe</label>

                  <div class="col-md-6">
                      <input id="password_confirmation" type="password" class="form-control" name="password_confirmation">

                      @if ($errors->has('password_confirmation'))
                        <span class="help-block">
                            <strong>{{ $errors->first('password_confirmation') }}</strong>
                        </span>
                      @endif
                  </div>
              </div>

              <div class="form-group">
                  <div class="col-md-6 col-md-offset-4">
                      <button type="submit" class="btn btn-primary">
                          <i class="fa fa-btn fa-user"></i> S'inscrire
                      </button>
                  </div>
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