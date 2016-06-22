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

            <h1 class="page-section-heading">QuiVa? voir l'API</h1>

            <!-- Tabbable Widget -->
            <div class="tabbable tabs-primary">

              <!-- Tabs -->
              <ul class="nav nav-tabs">
                <li class="active"><a href="#debut" data-toggle="tab"><i class="fa fa-fw fa-home"></i> Pour commencer</a></li>
                <li><a href="#authentification" data-toggle="tab"><i class="fa fa-fw fa-unlock-alt"></i> Authentification</a></li>
                <li><a href="#profil" data-toggle="tab"><i class="fa fa-fw fa-user"></i> Profil</a></li>
                <li><a href="#billet" data-toggle="tab"><i class="fa fa-fw fa-ticket"></i> Billets</a></li>
              </ul>
              <!-- // END Tabs -->
                <hr/>
              <!-- Panes -->
              <div class="tab-content">

                <div id="debut" class="tab-pane active">
                    <p>
                        Le réseau social implémente une importante API pour permettre à différents clients d’accéder aux ressources. Comme certaines ressources demandent un accès spécial et que les API REST sont sans état (stateless), un système de jeton est implémenté pour valider l'identité du consommateur de l’API.
                    </p>
                    <p>
                        Pour alléger la documentation, l’URL inscrite dans les prochaines sections est tronquée. Il faut, en effet, ajouter « https://quiva.herokuapp.com/api » au début des URL.
                    </p>
                </div>

                <div id="authentification" class="tab-pane">
                    <h2>Obtenir un jeton d'authentification <small>pour la fédération</small></h2>
                    <p>Pour se connecter à l'aide de la fédération, l'application de l'utilisateur doit appeler l'URL suivante: https://quiva.herokuapp.com/federation?redirect_uri=https%3A%2F%2Fticket-fire.herokuapp.com%2Ffederation&response_type=code&client_id=32k4h34jk2h34kj2h34kj2jk</p>
                    <p>L'utilisateur doit ensuite se connecter à QuiVa? si ce n'est pas déjà fait, puis accepter la demande d'accès du client.</p>
                    <p>Le client recevra un code valide pendant 60 minutes qu'il doit échanger contre un jeton en faisant une requête à la méthode POST /jetons/federation.</p>
                    <p>Ce double échange permet de sécuriser l’obtention du jeton et réduit les risques de sécurité. Le jeton est valide pendant 30 jours.</p>
                    <p>L’authentification pour la fédération est basée sur la <a href="https://tools.ietf.org/html/rfc6749#section-4.1">section 4.1 du RFC6749</a>.</p>
                    <br/>

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
                                <td><b>Obligatoire.</b> Inscrire « <b>authorization_code</b> ». Ce champ permet de définir le type d’accès demandé. L’authentification par fédération se sert d’un code.</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>client_id</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> L'identifiant du site de vente de billets (Inscrire: <b>32k4h34jk2h34kj2h34kj2jk</b>).</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>client_secret</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Le mot de passe du site de vente de billets (Inscrire: <b>45kjh36kvjhnk54vvhj3kj64j6h3jk4g2k</b>).</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>code</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Le code reçu à la suite de l'authentification par la fédération</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>redirect_uri</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> L'URL de redirection utilisé (Inscrire: <b>https://ticket-fire.herokuapp.com/federation</b>).</td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
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
                                    <pre>{<br/>  "access_token": "80fNwwNktk0okeR4Ofmg9cZHjHxhuSQp3NaKJV4d",<br/>  "token_type": "Bearer",<br/>  "expires_in": 108000</br>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an </br>    invalid parameter value, includes a parameter more than once, or is otherwise</br>    malformed. Check the \"CHAMP MANQUANT\" parameter."<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "unsupported_grant_type",<br/>  "error_description": "The authorization grant type \"authorization_codes\" </br>    is not supported by the authorization server."<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>401</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_credentials",<br/>  "error_description": "The user credentials were incorrect."<br/>}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr>

                    <br/>
                    <h2>Obtenir un jeton d'authentification <small>pour une application mobile</small></h2>

                    <p>Pour obtenir un jeton permettant d’utiliser les fonctions de l’API demandant une authentification, il faut se connecter auprès du réseau social. Pour ce faire, il faut s’authentifier avec un nom d’utilisateur et un mot de passe. Le jeton retourné est valide pendant 30 jours.</p>
                    <p>L’authentification pour la fédération est basée sur la <a href="https://tools.ietf.org/html/rfc6749#section-4.3">section 4.3 du RFC6749</a>.</p>

                    <br/>
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
                            <td>/jetons/mobile</td>
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
                                <td><b>Obligatoire.</b> Inscrire « <b>password</b> ». Ce champ permet de définir le type d’accès demandé. L’authentification pour une application mobile se sert d’un identifiant et d’un mot de passe.</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>client_id</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> L'identifiant de l'application mobile (Inscrire: <b>f3d259ddd3ed8ff3843839b</b>).</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>client_secret</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Le mot de passe de l'application mobile (Inscrire: <b>4c7f6f8fa93d59c45502c0ae8c4a95b</b>).</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>username</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> L’identifiant de l’utilisateur est son adresse courriel.</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>password</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Le mot de passe de l’utilisateur.</td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
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
                                <pre>{<br/>  "access_token": "acfliEOY0AI7nX64lVev8NDg4PiFeUyVbxvJdqfG",<br/>  "token_type": "Bearer",<br/>  "expires_in": 108000</br>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>400</td>
                            <td>
                                <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an </br>    invalid parameter value, includes a parameter more than once, or is otherwise</br>    malformed. Check the \"CHAMP MANQUANT\" parameter."<br/>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>400</td>
                            <td>
                                <pre>{<br/>  "error": "unsupported_grant_type",<br/>  "error_description": "The authorization grant type \"authorization_codes\" </br>    is not supported by the authorization server."<br/>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>401</td>
                            <td>
                                <pre>{<br/>  "error": "invalid_credentials",<br/>  "error_description": "The user credentials were incorrect."<br/>}</pre>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div id="profil" class="tab-pane">
                    <h2>Obtenir les informations d’un utilisateur</h2>

                    <p>Permet d'obtenir toutes les informations du profil de l'utilisateur en se basant sur son code d'autorisation d'API.</p>
                    <br/>

                    <h4>Requête</h4>

                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th class="col-md-1">Méthode</th>
                                <th>URL</th>
                            </tr>
                        </thead>

                        <tbody>
                            <td>GET</td>
                            <td>/utilisateur</td>
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
                                <td>Authorization</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Jeton permettant à l'utilisateur de s'authentifier.<br/>
                                    <br/>
                                    Exemple de champ rempli :<br/>
                                    <i>Authorization: Bearer 2N0J5Ay4peCLzbfMYa07JHK4HLuhz32AgBPAXXrK</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
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
                                    <pre>{<br/>  "id": 123,<br/>  "courriel": "doc@courriel.com",<br/>  "url-photo-profil": "https://url.com/photo.png",<br/>  "nom": "Dubé",<br/>  "prenom": "Joey",<br/>  "adresse": "420 rue Blazeit",<br/>  "ville": "Montréal",<br/>  "province": "Québec",<br/>  "codepostal": "1A1 A1A"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an<br/>    invalid parameter value, includes a parameter more than once, or is otherwise<br/>    malformed. Check the \"access token\" parameter."<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>401</td>
                                <td>
                                    <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "The resource owner or authorization server denied the<br/>    request."<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>404</td>
                                <td>
                                    <pre>{<br/>  "error": "not_found",<br/>  "error_description": "The token owner is not an existing user."<br/>}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr>

                    <br/>

                    <h2>Afficher les amis d’un utilisateur</h2>

                    <p>Permet de retourner la liste des amis de l'utilisateur. Note: l'utilisateur doit fournir un jeton d'authentification valide.</p>
                    <br/>

                    <h4>Requête</h4>

                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th class="col-md-1">Méthode</th>
                                <th>URL</th>
                            </tr>
                        </thead>

                        <tbody>
                            <td>GET</td>
                            <td>/utilisateur/amis</td>
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
                                <td>Authorization</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                    <br/>
                                    Exemple de champ rempli :<br/>
                                    Authorization: Bearer zGHXz8uFfETCEHaOrLtYzE428dFVDQrRtzfFkGZn
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
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
                                    <pre>[<br/>  {<br/>    "id": 123,<br/>    "courriel": "doc@courriel.com",<br/>    "url-photo-profil": "https://url.com/photo.png",<br/>    "nom": "Dubé",<br/>    "prenom": "Joey"<br/>  },<br/>  {<br/>    "id": 124,<br/>    "courriel": "snoop@courriel.com",<br/>    "url-photo-profil": "https://url.com/photo2.png",<br/>    "nom": "Di Oh Doubel Gi",<br/>    "prenom": "Dawg"<br/>  }<br/>]</pre>
                                    Note: Même si l'utilisateur a un seul ami, la valeur va toujours être encapsulée dans un Array [].
                                </td>

                            </tr>

                            <tr>
                                <td>204</td>
                                <td>
                                    <pre>[]</pre>
                                    L'utilisateur n'a pas d'amis, alors un tableau vide est retournée avec le message 204 no-content.
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an<br/>    invalid parameter value, includes a parameter more than once, or is otherwise<br/>    malformed. Check the \"access token\" parameter."<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>401</td>
                                <td>
                                    <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "The resource owner or authorization server denied the<br/>    request."<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>404</td>
                                <td>
                                    <pre>{<br/>  "error": "not_found",<br/>  "error_description": "The token owner is not an existing user."<br/>}</pre>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                <div id="billet" class="tab-pane">
                      <h2>Ajouter un nouveau billet</h2>

                      <p>Permet d'ajouter un nouveau billet à un utilisateur.</p>
                    <p>Le client faisant la requête doit être autorisé à ajouter des billets, seul le site de vente de billets est autorisé.</p>
                      <p>Note: La liste de billets doit être envoyée dans un tableau [] même s'il y a un seul billet.</p>
                      <p>Le format des billets envoyés est très important, car les champs sont soumis à de nombreuses contraintes de validation.</p>
                    <ul>
                        <li>uiid: Obligatoire, string, unique dans la requête et dans la BD.</li>
                        <li>titre: Obligatoire, string.</li>
                        <li>artiste: Obligatoire, string.</li>
                        <li>lieu: Obligatoire, string.</li>
                        <li>date: Obligatoire, format datetime, doit être plus tard que "maintenant"</li>
                        <li>montant: Obligatoire, string.</li>
                    </ul>
                      <br/>

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
                              <td>/utilisateur/billets</td>
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
                                  <td>Content-Type</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Inscrire: "application/json".</td>
                              </tr>

                              <tr>
                                  <td>x-www-form-urlencoded</td>
                                  <td>Authorization</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                      <br/>
                                      Exemple de champ rempli :<br/>
                                      Authorization: Bearer xCbsDqokcoAXpDVYwEaz2bOJyPIu5K35yUzxWcOo
                                  </td>
                              </tr>
                          </tbody>
                      </table>

                        <h4>Corps</h4>
                        <table class="table table-hover table-bordered">
                            <tr>
                                <td>
                                    <pre>[<br/>  {<br/>    "uuid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "2016-06-26 16:40:18",<br/>    "montant": "4.20"<br/>  },<br/>  {<br/>    "uuid": "3F2504E0-4F89-11D3-9A0C-0305E82C3302",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "2016-06-26 16:40:18",<br/>    "montant": "4.20"<br/>  }<br/>]</pre>
                                </td>
                            </tr>
                        </table>
                      <br/>
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
                                  <td>201</td>
                                  <td>Tous les billets ont été ajoutés avec succès.</td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The content-type must be application/json."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The Json format is invalid. Expecting an array of Json."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The tickets are invalid. Read the documentation."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an<br/>    invalid parameter value, includes a parameter more than once, or is otherwise<br/>    malformed. Check the \"access token\" parameter."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>401</td>
                                  <td>
                                      <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "The resource owner or authorization server denied the<br/>    request."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>404</td>
                                  <td>
                                      <pre>{<br/>  "error": "not_found",<br/>  "error_description": "The token owner is not an existing user."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>405</td>
                                  <td>
                                      <pre>{<br/>  "error": "method_not_allowed",<br/>  "error_description": "The client is not authorized to use this method."<br/>}</pre>
                                  </td>
                              </tr>

                          </tbody>
                      </table>

                      <hr>

                      <br/>

                      <h2>Obtenir les spectacles de l'utilisateur</h2>

                      <p>Permet d'obtenir les spectacles futurs auxquels l'utilisateur est inscrit. Les événements sont triés en fonction du spectacle le plus imminent en premier.</p>
                        <p>Note: il faut que l'utilisateur soit authentifié.</p>
                        <p>Note: les dates sont au fuseau horaire UTC.</p>
                       <p>Note: même si la liste contient un seul billet, elle sera présenté sous la forme d'un tableau [].</p>

                    <br/>

                      <h4>Requête</h4>

                      <table class="table table-hover table-bordered">
                          <thead>
                              <tr>
                                  <th class="col-md-1">Méthode</th>
                                  <th>URL</th>
                              </tr>
                          </thead>

                          <tbody>
                              <td>GET</td>
                              <td>/utilisateur/billets</td>
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
                                  <td>Authorization</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                      <br/>
                                      Exemple de champ rempli :<br/>
                                      Authorization: Bearer zGHXz8uFfETCEHaOrLtYzE428dFVDQrRtzfFkGZn
                                  </td>
                              </tr>
                          </tbody>
                      </table>

                      <br/>
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
                                      <pre>[<br/>  {<br/>    "uuid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "2016-06-26 16:40:18",<br/>    "montant": "4.20"<br/>  },<br/>  {<br/>    "uuid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "2016-07-02 13:34:25",<br/>    "montant": "4.20"<br/>  }<br/>]</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>204</td>
                                  <td>
                                      <pre>[]</pre>
                                      L'utilisateur n'a pas de billets, alors un tableau vide est retourné [].
                                  </td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an<br/>    invalid parameter value, includes a parameter more than once, or is otherwise<br/>    malformed. Check the \"access token\" parameter."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>401</td>
                                  <td>
                                      <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "The resource owner or authorization server denied the<br/>    request."<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>404</td>
                                  <td>
                                      <pre>{<br/>  "error": "not_found",<br/>  "error_description": "The token owner is not an existing user."<br/>}</pre>
                                  </td>
                              </tr>

                          </tbody>
                      </table>

                    <hr>

                    <br/>

                    <h2>Obtenir les spectacles des amis de l'utilisateur</h2>

                    <p>Permet d'obtenir les spectacles futurs auxquels les amis de l'utilisateur sont inscrits. Les événements sont triés en fonction du spectacle le plus imminent en premier.</p>
                    <p>Note: il faut que l'utilisateur soit authentifié.</p>
                    <p>Note: les dates sont au fuseau horaire UTC.</p>
                    <p>Note: même si la liste contient un seul billet, elle sera présenté sous la forme d'un tableau [].</p>
                    <br/>

                    <h4>Requête</h4>

                    <table class="table table-hover table-bordered">
                        <thead>
                        <tr>
                            <th class="col-md-1">Méthode</th>
                            <th>URL</th>
                        </tr>
                        </thead>

                        <tbody>
                        <td>GET</td>
                        <td>/utilisateur/amis/billets</td>
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
                            <td>Authorization</td>
                            <td>string</td>
                            <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                <br/>
                                Exemple de champ rempli :<br/>
                                Authorization: Bearer zGHXz8uFfETCEHaOrLtYzE428dFVDQrRtzfFkGZn
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <br/>
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
                                <pre>[<br/>  {<br/>    "idUtilisateur": 123,<br/>    "nom": "Bob",<br/>    "prenom": "McBob"<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "2016-06-26 16:40:18"<br/>  },<br/>  {<br/>    "idUtilisateur": 124,<br/>    "nom": "John",<br/>    "prenom": "Doe"<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "2016-06-26 16:40:18"<br/>  }<br/>]</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>204</td>
                            <td>
                                <pre>[]</pre>
                                L'utilisateur n'a pas de billets, alors un tableau vide est retourné [].
                            </td>
                        </tr>

                        <tr>
                            <td>400</td>
                            <td>
                                <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "The request is missing a required parameter, includes an<br/>    invalid parameter value, includes a parameter more than once, or is otherwise<br/>    malformed. Check the \"access token\" parameter."<br/>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>401</td>
                            <td>
                                <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "The resource owner or authorization server denied the<br/>    request."<br/>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>404</td>
                            <td>
                                <pre>{<br/>  "error": "not_found",<br/>  "error_description": "The token owner is not an existing user."<br/>}</pre>
                            </td>
                        </tr>

                        </tbody>
                    </table>

                  </div>

              </div>
              <!-- // END Panes -->
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