import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

console.log('🔄 Store initialization started...')

const middlewares = []

const persistConfig = {
    key: PERSIST_STORE_NAME,
    keyPrefix: '',
    storage,
    whitelist: ['auth', 'locale'],
}

console.log('📦 Persist config created with whitelist:', persistConfig.whitelist)

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer()),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === 'development',
})

console.log('✅ Store configured successfully')

store.asyncReducers = {}

export const persistor = persistStore(store)

console.log('💾 Persistor created')

export const injectReducer = (key, reducer) => {
    console.log(`🔄 Injecting reducer: ${key}`)
    if (store.asyncReducers[key]) {
        console.log(`⚠️ Reducer ${key} already exists, skipping injection`)
        return false
    }
    store.asyncReducers[key] = reducer
    store.replaceReducer(
        persistReducer(persistConfig, rootReducer(store.asyncReducers))
    )
    persistor.persist()
    console.log(`✅ Reducer ${key} injected successfully`)
    return store
}

export const isReducerInjected = (key) => {
    return !!store.asyncReducers[key]
}

export default store 