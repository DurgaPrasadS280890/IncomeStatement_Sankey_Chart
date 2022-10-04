import {configureStore} from '@reduxjs/toolkit';

import addGraphdata from "./reducer"

export default configureStore({
    reducer:{
        addGraphdata
    }
})


