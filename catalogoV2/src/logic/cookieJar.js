import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const frase = '123456'

export default {
  setUserLogged (idUser, nameUser, idUserType) {
    const inMinutes = new Date(new Date().getTime() + 30 * 60 * 1000)
    const idUserC = CryptoJS.AES.encrypt(idUser.toString(), frase).toString()
    const nameUserC = CryptoJS.AES.encrypt(nameUser, frase).toString()
    const idUserTypeC = CryptoJS.AES.encrypt(idUserType.toString(), frase).toString()
    const loggedC = CryptoJS.AES.encrypt('true', frase).toString()
    Cookies.set('SL', idUserC, {expires: inMinutes})
    Cookies.set('SD', nameUserC, {expires: inMinutes})
    Cookies.set('SI', idUserTypeC, {expires: inMinutes})
    Cookies.set('SP', loggedC, {expires: inMinutes})
  },
  getIdUserLogged () {
    const idUserC = Cookies.get('SL')
    var idUser = ''
    if (idUserC !== undefined) {
      const bytes = CryptoJS.AES.decrypt(idUserC, frase)
      idUser = bytes.toString(CryptoJS.enc.Utf8)
    } else {
      idUser = -1
    }
    return idUser
  },
  getNameUserLogged () {
    const nameUserC = Cookies.get('SD')
    var nameUser = ''
    if (nameUserC !== undefined) {
      const bytes = CryptoJS.AES.decrypt(nameUserC, frase)
      nameUser = bytes.toString(CryptoJS.enc.Utf8)
    }
    return nameUser
  },
  getIdUserTypeLogged () {
    const idUserTypeC = Cookies.get('SI')
    var idUserType = ''
    if (idUserTypeC !== undefined) {
      const bytes = CryptoJS.AES.decrypt(idUserTypeC, frase)
      idUserType = bytes.toString(CryptoJS.enc.Utf8)
    }
    return idUserType
  },
  getUserLogged () {
    const loggedC = Cookies.get('SP')
    var logged = ''
    if (Cookies.get('SP') === null) {
      logged = false
    } else {
      const bytes = CryptoJS.AES.decrypt(loggedC, frase)
      logged = bytes.toString(CryptoJS.enc.Utf8)
    }
    return logged
  },
  userLogout () {
    Cookies.remove('SL')
    Cookies.remove('SD')
    Cookies.remove('SI')
    Cookies.set('SP', 'false')
  }
}
