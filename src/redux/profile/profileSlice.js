import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    profile: {
        firstName: "Pontus",
        lastName: "Rohden",
        email: "pontus@experis.com",
        about: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, " +
            "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta " +
            "sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia" +
            " consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui" +
            " dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora " +
            "incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum" +
            " exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem" +
            " vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui" +
            " dolorem eum fugiat quo voluptas nulla pariatur?",
        portfolio:[
            {
                id: 0,
                title: "developer",
                company: "experis",
                date: "2021-2022",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Curabitur vitae luctus massa. Suspendisse potenti. " +
            "Nunc accumsan volutpat posuere. Curabitur fringilla felis non sapien" +
            " molestie, vitae sagittis tortor eleifend."
            },
            {
                id: 1,
                title: "Scrum master",
                company: "VGCS",
                date: "2022-2023",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Curabitur vitae luctus massa. Suspendisse potenti. " +
            "Nunc accumsan volutpat posuere. Curabitur fringilla felis non sapien" +
            " molestie, vitae sagittis tortor eleifend."
            },
            {
                id: 2,
                title: "Slayer",
                company: "Sentinels",
                date: "Unknown-2168",
                description: "He continued to be a great champion defending many worlds from the demons and killing " +
                    "them in Hell. The Slayer's Testaments described him as an ancient and mystical time-traveling " +
                    "warrior called the 'Doom Slayer' or 'Hell Walker' who was either " +
                    "banished to Hell or chose to stay there."
            }
        ]
    },
    show: false,
    loading: false,
    error: ''
}
const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        showModal: (state) => {
            state.show = !state.show;
        },
        addPortfolioEntry: (state,action) => {
            state.profile.portfolio = [...state.profile.portfolio, action.payload];
        },
        deletePortfolioEntry: (state, action) => {
            state.profile.portfolio = [
                ...state.profile.portfolio.slice(0, action.payload),
                ...state.profile.portfolio.slice(action.payload + 1)
            ]
            console.log(state.profile.portfolio);

        }
    }
})
export const {
    showModal,
    addPortfolioEntry,
    deletePortfolioEntry
} = profileSlice.actions;


export default profileSlice.reducer;