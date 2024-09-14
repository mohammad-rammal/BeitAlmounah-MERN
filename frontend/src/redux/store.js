import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlide";
import { postReducer } from "./slices/postSlice";
import { passwordReducer } from "./slices/passwordSlice";
import { categoryReducer } from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        post: postReducer,
        password: passwordReducer,
        category: categoryReducer,
    }
});

export default store;