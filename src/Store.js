import { createStore, combineReducers } from 'redux'

//  创建仓库
// let store = createStore(function(store='张三',action){
//     switch (action.type) {
//         case 'haha': return action.name
//         default: return store
//     }
// })
// console.log(store.getState())
// let a ={
//     type:'haha',
//     name:'哈哈'
// }
// store.dispatch(a)
// console.log(store.getState())
function text(state = "测试", action) {
    switch (action.type) {
        default: return state
    }
}
function houseArr(state = [], action) {
    switch (action.type) {
        case 'add':
            return [action.obj, ...state.filter(v => v.name !== action.obj.name)]
        default: return state
    }
}

export default createStore(combineReducers({
    text, houseArr
}))