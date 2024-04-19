import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        place: "",
        isAdmin: false,
        userMovies: [],
        userTheaters: [],
        showRequests: [],
        profile_pic: "",
    },
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                _id: action.payload._id,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                dob: action.payload.dob,
                isAdmin: action.payload.isAdmin,
                place: action.payload.place,
                userMovies: action.payload.userMovies,
                userTheaters: action.payload.userTheaters,
                showRequests: action.payload.showRequests,
                profile_pic : action.payload.profile_pic
            };
        },
        removeUser: (state) => {
            return {
                profile_pic: "",
                first_name: "",
                last_name: "",
                email: "",
                dob: "",
                place: "",
                isAdmin: false,
                userMovies: [],
                userTheaters: [],
                showRequests: [],
            }
        },
        // addUserMovie: (state, action)=>{
        //     return {
        //         ...state,
        //         userMovies: [...state.userMovies, action.payload] //add new movie to the list
        //     }
        // },
        // removeUserMovie: (state, action)=>{
        //     let newUserMovies = state.userMovies.filter(movie=> movie.id !== action.payload.id) //filter and remove passed movie
        //     return {
        //         ...state,
        //         userMovies: newUserMovies //add new movie to the list
        //     }
        // }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;