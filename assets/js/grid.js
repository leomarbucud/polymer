// var socket = new io.connect('http://127.0.0.1:3000');
const SOCKET_URL = (location.hostname == 'dev.thegrid.com') ? 'http://127.0.0.1:3000' : 'https://thegridsocket.azurewebsites.net';
var socket = new io.connect(SOCKET_URL);

const _log = l => {
  console.log('Grid: ', l);
}

const logger = str => {
  console.log('Socket: ', str);
};

socket.on('connect', () => {
  window.dispatchEvent(new CustomEvent('user:connected'));
});

window.addEventListener('user:connected', e => {
  logger('connected to socket');
});

window.addEventListener('user:logged', e => {
  const user = e.detail;
  socket.emit('user:logged', user);
});

window.addEventListener('user:posted', e => {
  const data = e.detail;
  socket.emit('user:posted', data);
});

socket.on('user:posted', data => {
  logger(data);
});

window.addEventListener('user:bidded', e => {
  console.log('bidded....');
  const data = e.detail;
  socket.emit('user:bidded', data);
});

window.addEventListener('user:job_in_progress', e => {
  const data = e.detail;
  socket.emit('user:job_in_progress', data);
});

window.addEventListener('bidder:job_in_progress', e => {
  const data = e.detail;
  socket.emit('bidder:job_in_progress', data);
});

window.addEventListener('user:job_review', e => {
  const data = e.detail;
  console.log('aaa review', data);
  socket.emit('user:job_review', data);
});

window.addEventListener('user:job_complete', e => {
  const data = e.detail;
  console.log('aaa job_complete', data);
  socket.emit('user:job_complete', data);
});

window.addEventListener('bidder:job_complete', e => {
  const data = e.detail;
  console.log('aaa job_complete', data);
  socket.emit('bidder:job_complete', data);
});

window.addEventListener('bidder:accept_job', e => {
  const data = e.detail;
  socket.emit('bidder:accept_job', data);
});

window.addEventListener('bidder:decline_job', e => {
  const data = e.detail;
  socket.emit('bidder:decline_job', data);
});

socket.on('user:bidded', data => {
  logger(data);
});

window.addEventListener('user:send_message', e => {
  const data = e.detail;
  socket.emit('user:send_message', data);
});

socket.on('user:bidded', data => {
  logger(data);
});

window.addEventListener('user:create_conversation', e => {
  const data = e.detail;
  socket.emit('user:create_conversation', data);
});

socket.on('user:create_conversation', data => {
  logger(data);
});

window.addEventListener('user:typing', e => {
  const data = e.detail;
  socket.emit('user:typing', data);
});

window.addEventListener('user:grant_job', e => {
  const data = e.detail;
  socket.emit('user:grant_job', data);
});

window.addEventListener('user:cancel_grant_job', e => {
  const data = e.detail;
  socket.emit('user:cancel_grant_job', data);
});

window.addEventListener('user:other_bidded', e => {
  const data = e.detail;
  socket.emit('user:other_bidded', data);
});

window.addEventListener('app:title_change', e => {
  const data = e.detail;
  // socket.emit('user:other_bidded', data);
  document.title = data.title;
});

window.addEventListener('user:reply_query', e => {
  const data = e.detail;
  socket.emit('user:reply_query', data);
});

window.addEventListener('user:like_query', e => {
  const data = e.detail;
  socket.emit('user:like_query', data);
});

window.addEventListener('user:dislike_query', e => {
  const data = e.detail;
  socket.emit('user:dislike_query', data);
});

window.addEventListener('user:add_query', e => {
  const data = e.detail;
  socket.emit('user:add_query', data);
});

// push notification

let swRegistration = null;
let isSubscribed = false;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const applicationServerPublicKey = 'BPKBg4mOubuUYHZDnEEAAaekOOCK85_SksGDTF3w6PL1Ljz6XhbOLQrHh9tzhkG3gvPbwIDnrm0Lx6vDK8iOg6E';
const applicationServerPrivateKey = 'w3dBGumlslBU4vl2z0M1FhQSnxsOLYuLgGFhWhKGjHE';



// Load and register pre-caching Service Worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register(baseUrl + 'service-worker.js')
//     .then( res => {
//       console.log('SW Registered');
//       swRegistration = res;
//       initilizePushManager();
//     }).catch( err => {
//       console.log('SW Failed', err);
//     });
//   });
// }

// function initilizePushManager() {
//   swRegistration.pushManager.getSubscription()
//   .then(function(subscription) {
//     isSubscribed = !(subscription === null);
  
//     if (isSubscribed) {
//       console.log('User IS subscribed.');
//     } else {
//       console.log('User is NOT subscribed.');
//     }
  
//   });
// }

// function subscribeUser() {
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
//   })
//   .then(function(subscription) {
//     console.log('User is subscribed.');

//     updateSubscriptionOnServer(subscription);

//     isSubscribed = true;

//   })
//   .catch(function(err) {
//     console.log('Failed to subscribe the user: ', err);
//   });
// }

// function updateSubscriptionOnServer(subscription) {
//   // TODO: Send subscription to application server

//   const subscriptionJson = document.querySelector('.js-subscription-json');
//   const subscriptionDetails =
//     document.querySelector('.js-subscription-details');

//   if (subscription) {
//     subscriptionJson.textContent = JSON.stringify(subscription);
//     subscriptionDetails.classList.remove('is-invisible');
//   } else {
//     subscriptionDetails.classList.add('is-invisible');
//   }
// }





window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


// setInterval( () => {
//   const conversations_time = document.querySelectorAll('[data-time]');
//   // console.log(conversations_time);
//   if(conversations_time) {

//     conversations_time.forEach( item => {
//       let time = item.dataset['time'];
//       // console.log(time);
//       item.textContent = this._fromNow(time);
//     });

//   }
// }, 1000);

var OneSignal = window.OneSignal || [];
var appId = (location.hostname == 'dev.thegrid.com') ? '4ab53490-5824-4613-8c96-9484221bf6db' : '11b612e8-0513-4e9f-9ed4-2c7debfbec0a';
OneSignal.push(["init", {
    appId: appId,
    // subdomainName: 'thegrid',
    autoRegister: true,
    notifyButton: {
      enable: false /* Set to false to hide */
    },
    promptOptions: {
        /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
        /* actionMessage limited to 90 characters */
        actionMessage: "We'd like to show you notifications for the latest news.",
        /* acceptButtonText limited to 15 characters */
        acceptButtonText: "ALLOW",
        /* cancelButtonText limited to 15 characters */
        cancelButtonText: "NO THANKS"
    },
    welcomeNotification: {
        "title": "The Grid",
        "message": "Welcome to The Grid!",
        // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
    }
}]);

let isSubscriptionChange = false;

window.addEventListener('user:logged', e => {
  // console.log('e', e.detail);
  if(isSubscriptionChange) return;
  if(!window.OneSignal) return;
  // OneSignal.push(["registerForPushNotifications"]);
  isSubscriptionChange = true;
  OneSignal.sendTag("user_id", e.detail.id);
  OneSignal.push( () => {
    OneSignal.on('subscriptionChange', function(isSubscribed) {
      if (isSubscribed) {
        OneSignal.sendTag("user_id", e.detail.id, function(tagsSent) {
           console.log("Tags have finished sending!");
        });
      } else {
        console.log('User unsubscribed notifications');
      }
    });
  });
});