<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>The Grid</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="google-signin-client_id" content="186352805872-hqq59ghhfq4pdf6tttonigp3ipbgmdbb.apps.googleusercontent.com">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <?php

    $APP_VERSION = '1.0.2';

    // error_reporting( E_ALL ); 
    // error_reporting(~0);
    // ini_set('display_errors', 1);

    // if( isset($_GET) ) {
    //   if( isset($_GET['v']) ) {
    //     if( $_GET['v'] != $APP_VERSION ) {
    //       header('location: /?v='.$APP_VERSION);
    //     }
    //   } else {
    //     header('location: /?v='.$APP_VERSION);
    //   }
    // }

    $url = $_GET['url'];

    function get_data($url) {
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
      curl_setopt($ch, CURLOPT_HEADER, false);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_REFERER, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      $result = curl_exec($ch);
      curl_close($ch);
      return json_decode($result ,true);
    }

    function makeOG($property, $content, $name) {
      echo '<meta property="'.$property.'" content="'.$content.'" name="'.$name.'" />';
    }

    function getApiBaseUrl() {
      switch( $_SERVER['HTTP_HOST'] ) {
        case 'www.the-grid.co':
          return 'https://api.the-grid.co';
          break;
        case 'dev.thegrid.com':
          return 'https://api.thegrid.com';
          break;
        case 'thegridpolymer.azurewebsites.net':
          return 'https://dev-thegrid.azurewebsites.net';
          break;
        default:
          return 'https://api.the-grid.co';
          break;
      }
    }

    function getSocketUrl() {
      switch( $_SERVER['HTTP_HOST'] ) {
        case 'www.the-grid.co':
          return 'ws://socket.the-grid.co';
          break;
        case 'dev.thegrid.com':
          return 'ws://127.0.0.1:3000';
          break;
        case 'thegridpolymer.azurewebsites.net':
          return 'ws://thegridsocket.azurewebsites.net';
          break;
        default:
          return 'ws://socket.the-grid.co';
          break;
      }
    }

    function generateRandomString($length = 10) {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
    }

    
    $url = explode('/', $url);

    if(count($url) == 3) {
      
      $isUsername = (strpos($url[0], "@") >= 0) ? 1: 0;
      $isPost = 'posts' == $url[1];

      $api = 'https://dev-thegrid.azurewebsites.net';

      if($isUsername && $isPost) {
        $data = get_data($api.'/api/opengraph/'.$url[2]);
        if(!isset($data['error'])){  
          makeOG('og:title', $data['title'], 'ogtitlekey');
          makeOG('og:image', $data['image'], 'ogimagekey');
          makeOG('og:description', $data['description'], 'ogdesckey');
          makeOG('fb:app_id', '1451318644890504', 'fbappid');
        }
      }
      
    }

    ?>


    <!-- <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"> -->
    <style>
      * {
        box-sizing: border-box;
        font-family: museo-sans, 'Roboto', sans-serif;
      }
      html, body {
        background-color: #fff;
        color: #636b6f;
        font-family: museo-sans, 'Roboto', sans-serif;
        font-weight: 100;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      .splash {
        position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;
        background: linear-gradient(209.36deg, #FF3B30 0%, #FF2D55 100%);
        color: #FFFFFF;
      }
      [loaded] ~ .splash {
        display: none;
      }
      .pulse {
        display: block;
        height: 100px;
        width: 100px;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% {
          opacity: 0.6;
        }
        70% {
            opacity: 0.1
        }
        100% {
          opacity: 1
        }
      }

      .pac-container {
        font-family: museo-sans, 'Roboto', sans-serif; 
        background-color: #303030;
      }

      .pac-item {
        background-color: #303030;
        color: #FFFFFF;
        border-top: 1px solid #424242;
      }

      .pac-item.pac-item-selected {
        background-color: #424242;
      }

      .pac-item-query {
        color: #FF3B30;
      }
      


    </style>
    <base href="/">

    <link rel="icon" href="assets/images/favicon.ico">

    <!-- See https://goo.gl/OOhYW5 -->
    <link rel="manifest" href="manifest.json?v=1.0.2">

    <!-- See https://goo.gl/qRE0vM -->
    <meta name="theme-color" content="#303030">

    <!-- Add to homescreen for Chrome on Android. Fallback for manifest.json -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="The Grid">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="THE GRID">

    <!-- Homescreen icons -->
    <link rel="apple-touch-icon" href="assets/images/manifest/icon-48x48.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/images/manifest/icon-72x72.png">
    <link rel="apple-touch-icon" sizes="96x96" href="assets/images/manifest/icon-96x96.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/images/manifest/icon-144x144.png">
    <link rel="apple-touch-icon" sizes="192x192" href="assets/images/manifest/icon-192x192.png">

    <!-- Tile icon for Windows 8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="assets/images/manifest/icon-144x144.png">
    <meta name="msapplication-TileColor" content="#303030">
    <meta name="msapplication-tap-highlight" content="no">

    <script>
      // Register the base URL
      const baseUrl = document.querySelector('base').href;
      const API_BASE_URL = '<?=getApiBaseUrl()?>';
      const SOCKET_URL = '<?=getSocketUrl()?>';
      window.VERSION = '<?=$APP_VERSION?>';
    </script>
    <script src="https://use.typekit.net/nan8fpy.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110083465-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-110083465-1');
    </script>
  </head>

  <body>

    <grid-app></grid-app>

    <div class="splash">
      <img src="assets/images/grid-logo.svg?new" class="pulse" alt="THE GRID"/>
      <!-- <span class="pulse"></span> -->
    </div>

    <script src="bower_components/webcomponentsjs/webcomponents-loader.js"></script>
    <script src="node_modules/redux/dist/redux.js" async></script>
    <script src="node_modules/redux-thunk/dist/redux-thunk.js" async></script>
    <script src="node_modules/axios/dist/axios.js" async></script>
    <script src="node_modules/moment/moment.js" async></script>
    <script src="assets/js/letter-avatar.js" async></script>
    <script src="node_modules/socket.io-client/dist/socket.io.js"></script>
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJyuWvZ03O18yHTvC1t3Mlj22VY73hJWc&libraries=places"></script>
    <script src="assets/js/markerclusterer.js" async></script>
    <script src="assets/js/oms.min.js" async></script>
    <script src="assets/js/grid.js?v=<?=$APP_VERSION?>" async></script>

    <link rel="import" href="elements/thegrid/grid-app.html?v=<?=$APP_VERSION?>" async>

  </body>
</html>
