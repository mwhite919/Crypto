import {configureStore} from "@reduxjs/toolkit"
import getCoinList from "./coinlist"


export default configureStore({

reducer: {
    coinList : getCoinList
}

})