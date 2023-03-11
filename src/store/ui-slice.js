import {createSlice} from '@reduxjs/toolkit'

const initialUiState = {isShowNotification: false, message: '', status: '',isLoading: false};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        showNotification(state,action){
            state.isShowNotification = true;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        setIsLoading(state){
            state.isShowNotification = false
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;