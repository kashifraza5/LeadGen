import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'

const rootReducer = (asyncReducers) => (state, action) => {
    
    const combinedReducer = combineReducers({
        theme,
        auth,

        ...asyncReducers,
    })    
    
    return combinedReducer(state, action)
}


export default rootReducer 