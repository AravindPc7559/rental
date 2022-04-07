import {createStore , combineReducers} from 'redux'


const appreducer = combineReducers({
    date:datePick,
    endDate:endDatePicker,
    car:CarData,
    Total:TotalAmount,
    DisSort:DistrictSort,
    Discount:DiscountAmount
})



function datePick(prevState = ''  , action){
    switch(action.type){
        case 'date':
            return action.payload
    default: return prevState
    }
}

function endDatePicker(prevState = ''  , action){
    switch(action.type){
        case 'endDate':
            return action.payload
    default: return prevState
    }
}

function CarData(prevState = {} , action){
    switch(action.type){
        case 'CarDetails':
            return action.payload
    default: return prevState
    }
}

function TotalAmount(prevState = '' , action){
    switch(action.type){
        case 'Total':
            return action.payload
    default: return prevState
    }
}


function DistrictSort(prevState = [] , action){
    switch(action.type){
        case 'districtsort':
                return action.payload
        default: return prevState
    }
}


function DiscountAmount(prevState = '' , action){
    switch(action.type){
        case 'discount':
                return action.payload
        default: return 0
    }
}



const store = createStore(appreducer)


export default store