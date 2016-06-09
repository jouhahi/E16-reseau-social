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

                    <p>Lorsqu’une connexion est faite à l’aide de la fédération, le réseau social retourne un code d’accès. Ce code d’accès peut être échangé contre un jeton permettant d’utiliser l’API du réseau social. Le code peut être utilisé une seule fois et est valide pendant 10 minutes.</p>
                    <p>Pour obtenir un jeton permettant d’utiliser les fonctions de l’API demandant une authentification, il faut échanger le code contre ce jeton. Ce double échange permet de sécuriser l’obtention du jeton et réduit les risques de sécurité. Le jeton est valide indéfiniment ou jusqu’à l’obtention d’un nouveau jeton.</p>
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
                                <td><b>Obligatoire.</b> Inscrire « authorization_code ». Ce champ permet de définir le type d’accès demandé. L’authentification par fédération se sert d’un code d’autorisation.</td>
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
                                <td><b>Obligatoire.</b> Lien de redirection utilisé lors de la connexion par fédération.</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>client_id</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Identifiant du client utilisant l’API. Le client est l’application faisant la demande d’authentification et doit être préalablement enregistrée auprès du réseau social.</td>
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
                                    <pre>{<br/>  "token_type": "Bearer",<br/>  "access_token": "2YotnFZFEjr1zCsicMWpAA"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "Des paramètres sont manquants ou invalides"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>401</td>
                                <td>
                                    <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "La combinaison de client_id, <br/>       de redirect_uri et de code est invalide"<br/>}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr>

                    <br/>
                    <h2>Obtenir un jeton d'authentification <small>pour une application mobile</small></h2>

                    <p>Pour obtenir un jeton permettant d’utiliser les fonctions de l’API demandant une authentification, il faut se connecter auprès du réseau social. Pour ce faire, il faut s’authentifier avec un nom d’utilisateur et un mot de passe. Le jeton retourné est valide indéfiniment ou jusqu’à la demande d’un nouveau jeton.</p>
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
                                <td><b>Obligatoire.</b> Inscrire « password ». Ce champ permet de définir le type d’accès demandé. L’authentification pour une application mobile se sert d’un identifiant et d’un mot de passe.</td>
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
                                <pre>{<br/>  "token_type": "Bearer",<br/>  "access_token": "2YotnFZFEjr1zCsicMWpAA"<br/>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>400</td>
                            <td>
                                <pre>{<br/>  "error": "invalid_request",<br/>  "error_description": "Des paramètres sont manquants ou invalides"<br/>}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td>401</td>
                            <td>
                                <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "La combinaison de username et de password est invalide"<br/>}</pre>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div id="profil" class="tab-pane">
                    <h2>Obtenir les informations d’un utilisateur</h2>

                    <p>Permet d'obtenir toutes les informations du profil de l'utilisateur en utilisant son adresse courriel.</p>
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
                            <td>/utilisateurs/:courriel</td>
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
                                <td>URL</td>
                                <td>courriel</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Adresse courriel identifiant uniquement l’utilisateur demandé.</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>Authorization</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                    <br/>
                                    Exemple de champ rempli :<br/>
                                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
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
                                    <pre>{<br/>  "courriel": "doc@courriel.com",<br/>  "url-photo-profil": "https://url.com/photo.png",<br/>  "nom": "Dubé",<br/>  "prenom": "Joey",<br/>  "adresse": "420 rue Blazeit",<br/>  "ville": "Montréal",<br/>  "province": "Québec",<br/>  "codepostal": "1A1 A1A"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "missing_token",<br/>  "error_description": "La requête n’a pas de jeton"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>401</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_token",<br/>  "error_description": "Le jeton est invalide"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>403</td>
                                <td>
                                    <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "L’accès à cette ressource est interdit"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>404</td>
                                <td>
                                    <pre>{<br/>  "error": "resource_not_found",<br/>  "error_description": "Ressource non trouvée ou supprimée"<br/>}</pre>
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
                            <td>/utilisateurs/:courriel/amis</td>
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
                                <td>URL</td>
                                <td>courriel</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Adresse courriel de l’utilisateur.</td>
                            </tr>

                            <tr>
                                <td>x-www-form-urlencoded</td>
                                <td>Authorization</td>
                                <td>string</td>
                                <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                    <br/>
                                    Exemple de champ rempli :<br/>
                                    Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
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
                                    <pre>[<br/>  {<br/>    "courriel": "doc@courriel.com",<br/>    "url-photo-profil": "https://url.com/photo.png",<br/>    "nom": "Dubé",<br/>    "prenom": "Joey"<br/>  },<br/>  {<br/>    "courriel": "snoop@courriel.com",<br/>    "url-photo-profil": "https://url.com/photo2.png",<br/>    "nom": "Di Oh Doubel Gi",<br/>    "prenom": "Dawg"<br/>  }<br/>]</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>204</td>
                                <td>
                                    No Content
                                </td>
                            </tr>

                            <tr>
                                <td>400</td>
                                <td>
                                    <pre>{<br/>  "error": "missing_token",<br/>  "error_description": "La requête n’a pas de jeton"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>401</td>
                                <td>
                                    <pre>{<br/>  "error": "invalid_token",<br/>  "error_description": "Le jeton est invalide"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>403</td>
                                <td>
                                    <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "L’accès à cette ressource est interdit"<br/>}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td>404</td>
                                <td>
                                    <pre>{<br/>  "error": "resource_not_found",<br/>  "error_description": "Ressource non trouvée ou supprimée"<br/>}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div id="billet" class="tab-pane">
                      <h2>Ajouter un nouveau billet</h2>

                      <p>Permet d'ajouter un nouveau billet à un utilisateur en utilisant son adresse courriel. Le client faisant la requête doit être autorisé à ajouter des billets.</p>
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
                              <td>/utilisateurs/:courriel/billets</td>
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
                                  <td>URL</td>
                                  <td>courriel</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Adresse courriel de l’utilisateur achetant les billets.</td>
                              </tr>

                              <tr>
                                  <td>x-www-form-urlencoded</td>
                                  <td>Authorization</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                      <br/>
                                      Exemple de champ rempli :<br/>
                                      Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
                                  </td>
                              </tr>
                          </tbody>
                      </table>

                        <h4>Corps</h4>
                        <table class="table table-hover table-bordered">
                            <tr>
                                <td>
                                    <pre>[<br/>  {<br/>    "guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "1464807600",<br/>    "montant": "4.20"<br/>  },<br/>  {<br/>    "guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "1464807600",<br/>    "montant": "4.20"<br/>  }<br/>]</pre>
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
                                  <td>Created</td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "missing_token",<br/>  "error_description": "La requête n’a pas de jeton"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_ticket",<br/>  "error_description": "La requête comporte un ou des billets invalides"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>401</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_token",<br/>  "error_description": "Le jeton est invalide"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>403</td>
                                  <td>
                                      <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "L’accès à cette ressource est interdit"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>404</td>
                                  <td>
                                      <pre>{<br/>  "error": "resource_not_found",<br/>  "error_description": "Ressource non trouvée ou supprimée"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>405</td>
                                  <td>
                                      <pre>{<br/>  "error": "method_not_allowed",<br/>  "error_description": "La méthode utilisée n’est pas autorisée"<br/>}</pre>
                                  </td>
                              </tr>

                          </tbody>
                      </table>

                      <hr>

                      <br/>

                      <h2>Obtenir les spectacles d’un utilisateur</h2>

                      <p>Permet d'obtenir les spectacles futurs auxquels l'utilisateur est inscrit.</p>
                        <p>Note: il faut que l'utilisateur soit authentifié.</p>
                        <p>Note: si l'utilisateur demandé n'est pas l'utilisateur authentifié, le GUID et le montant du billet ne sont pas retournés. L’API ne permet que d’afficher les billets des amis de l’utilisateur authentifié, ainsi que ses propres billets.</p>
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
                              <td>/utilisateurs/:courriel/billets</td>
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
                                  <td>URL</td>
                                  <td>courriel</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Adresse courriel de l’utilisateur.</td>
                              </tr>

                              <tr>
                                  <td>x-www-form-urlencoded</td>
                                  <td>Authorization</td>
                                  <td>string</td>
                                  <td><b>Obligatoire.</b> Jeton permettant de s'authentifier.<br/>
                                      <br/>
                                      Exemple de champ rempli :<br/>
                                      Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA
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
                                      <pre>[<br/>  {<br/>    "guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "1464807600",<br/>    "montant": "4.20"<br/>  },<br/>  {<br/>    "guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",<br/>    "titre": "Marie et Juana, une histoire enflammée",<br/>    "artiste": "Ronald McDonald",<br/>    "lieu": "Centre Bell, Montréal",<br/>    "date": "1464807600",<br/>    "montant": "4.20"<br/>  }<br/>]</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>204</td>
                                  <td>
                                      No Content
                                  </td>
                              </tr>

                              <tr>
                                  <td>400</td>
                                  <td>
                                      <pre>{<br/>  "error": "missing_token",<br/>  "error_description": "La requête n’a pas de jeton"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>401</td>
                                  <td>
                                      <pre>{<br/>  "error": "invalid_token",<br/>  "error_description": "Le jeton est invalide"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>403</td>
                                  <td>
                                      <pre>{<br/>  "error": "access_denied",<br/>  "error_description": "L’accès à cette ressource est interdit"<br/>}</pre>
                                  </td>
                              </tr>

                              <tr>
                                  <td>404</td>
                                  <td>
                                      <pre>{<br/>  "error": "resource_not_found",<br/>  "error_description": "Ressource non trouvée ou supprimée"<br/>}</pre>
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