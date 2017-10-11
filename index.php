<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>The Grid</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="google-signin-client_id" content="186352805872-hqq59ghhfq4pdf6tttonigp3ipbgmdbb.apps.googleusercontent.com">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">

    <?php

    error_reporting( E_ALL ); 
    error_reporting(~0);
    ini_set('display_errors', 1);

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

    
    $url = explode('/', $url);

    if(count($url) == 3) {
      
      $isUsername = (strpos($url[0], "@") >= 0) ? 1: 0;
      $isPost = 'posts' == $url[1];

      if($isUsername && $isPost) {
        $data = get_data('https://api.thegrid.com/api/opengraph/'.$url[2]);
        if(!isset($data['error'])){  
          makeOG('og:title', $data['title'], 'ogtitlekey');
          makeOG('og:image', $data['image'], 'ogimagekey');
          makeOG('og:description', $data['description'], 'ogdesckey');
          makeOG('fb:app_id', '1451318644890504', 'fbappid');
        }
      }
      
    }

    ?>


    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <style>
      @font-face {
        font-family: 'Museo 500';
        src: url('assets/fonts/Museo500-Regular.eot');
        src: url('assets/fonts/Museo500-Regular.eot?#iefix') format('embedded-opentype'),
          url('assets/fonts/Museo500-Regular.woff') format('woff'),
          url('assets/fonts/Museo500-Regular.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: 'Museo Sans 500';
        src: url('assets/fonts/MuseoSans-500.eot');
        src: url('assets/fonts/MuseoSans-500.eot?#iefix') format('embedded-opentype'),
          url('assets/fonts/MuseoSans-500.woff') format('woff'),
          url('assets/fonts/MuseoSans-500.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      * {
        box-sizing: border-box;
        /* font-family: 'Museo Sans 500', 'Roboto', sans-serif !important; */
      }
      html, body {
        background-color: #fff;
        color: #636b6f;
        /* font-family: 'Museo Sans 500', 'Roboto', sans-serif; */
        font-family: 'Roboto', sans-serif;
        font-weight: 100;
        height: 100%;
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

    </style>
    <base href="/">

    <link rel="icon" href="assets/images/favicon.ico">

    <!-- See https://goo.gl/OOhYW5 -->
    <link rel="manifest" href="manifest.json">

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

    </script>
  </head>

  <body>

    <grid-app></grid-app>

    <div class="splash">
      <img src="assets/images/grid-logo.svg" alt="THE GRID"/>
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
    <script src="assets/js/grid.js?v=1.0.4" async></script>

    <link rel="import" href="elements/thegrid/grid-app.html?v=1.0.4" async>

  </body>
</html>
