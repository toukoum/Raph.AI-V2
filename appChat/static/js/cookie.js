window.addEventListener('load', function() {
    const popupElement = document.querySelector('.section-popup');
    const buttonDesac = this.document.querySelector('.button-cp')
    // Vérifiez si le cookie existe
    if (getCookie('popupDisplayed') !== 'true') {
        // Affichez la pop-up
        popupElement.classList.add('active-popup')        

        //empêcher le scroll
        document.documentElement.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';


        
        // Créez le cookie pour indiquer que la pop-up a été affichée
        setCookie('popupDisplayed', 'true', 1); // Cookie valide pendant 1 jours
    }

    buttonDesac.addEventListener('click', () => {
      popupElement.classList.remove('active-popup')

      //reactiver le scroll
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    })




})

// Fonction pour lire un cookie
function getCookie(name) {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      
      if (cookie.indexOf(cookieName) === 0) {
        // console.log("test :" + cookie.substring(cookieName.length, cookie.length))
        return cookie.substring(cookieName.length, cookie.length);

      }
    }
    
    return '';
  }
  
  // Fonction pour créer un cookie
  function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const expires = 'expires=' + expirationDate.toUTCString();
    
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
    console.log(document.cookie)
  }

