/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { faUserSecret, faUser } from '@fortawesome/free-solid-svg-icons'
import { faUser,} from '@fortawesome/free-regular-svg-icons'

library.add([faUser])

export default function (app) {
    app.component('font-awesome-icon', FontAwesomeIcon)
}