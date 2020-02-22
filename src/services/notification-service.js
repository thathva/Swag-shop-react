export const NOTIF_WISHLIST_CHANGED='notif_wishlist_changed';
let instance = null;
var observers = {}
class NotificationService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  removeObserver = (observer, notifName) => {
    var obs = observers[notifName];
    if (obs) {
      for (var x = 0; x < obs.length; x++) {
        if (observer === obs[x].observer) {
          obs.splice(x, 1);
          observers[notifName] = obs;
          break;
        }
      }
    }
  }

  postNotification=(notifName,data)=>{
    let obs=observers[notifName];
    for(var x=0;x<obs.length;x++){
      var obj=obs[x];
      obj.callBack(data);
    }
  }

  addObserver = (notifName, observer, callBack) => {
    let obs = observers[notifName];
    if (!obs) {
      observers[notifName] = []
    }
    let obj = {
      observer: observer,
      callBack: callBack
    };
    observers[notifName].push(obj);
  }
}

export default NotificationService;
