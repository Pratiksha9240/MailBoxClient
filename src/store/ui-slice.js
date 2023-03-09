import {createSlice} from '@reduxjs/toolkit'

const initialUiState = {isShowNotification: false, message: '', status: ''};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        showNotification(state,action){
            state.isShowNotification = true;
            state.message = action.payload.message;
            state.status = action.payload.status;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;