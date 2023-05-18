import axios from "axios";

/* Posts */

const initPostState = {
    postLoading: false,
    posts: [],
    hasMore: true
};

export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LOADING':
            return {
                ...state,
                postLoading: true
            };
        case '@POST/END_LOADING':
            return {
                ...state,
                postLoading: false
            };
        case '@POST/END_LIST_POSTS':
            console.log('list post')
            console.log(action.posts);
            return {
                ...state,
                posts: action.posts,
                hasMore: action.posts.length > 0
            };
        case '@POST/END_LIST_MORE_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.post],
                hasMore: action.posts.length > 0
            };
        case '@POST/END_CREATE_VOTE':
            var newPosts = state.posts.map(p => {
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        case '@POST/END_CREATE_POST':
            console.log('end_create_post');
            console.log(action.post);
            return {
                ...state,
                posts: [action.post, ...state.posts]
            };
        default:
            return state;
    }
}

/* Search text */

export function searchText(state = '', action) {
    switch(action.type){
        case 'searchText':
            return{
                ...state,
                search: action.searchText
            };
        default:
            return{
                ...state,
                search: action.searchText
            };
    }
}


/* Post Form */

const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    moodToggle: false,
    mood: 'na'
};

export function postForm(state = initPostFormState, action) {
    //TODO
    console.log('output action');
    console.log(action);
    switch (action.type) {
        case 'postForm/input':
            return {
                ...state,
                ...action
            };
        case 'postForm/inputdanger':
            return {
                ...state,
                ...action
            }
        case 'postForm/setMoodtoggle':
            return {
                ...state,
                ...action
            }
        case 'postForm/selectMood':
            return {
                ...state,
                ...action
            }
        default:
            return state;
    }
}

/* Post item */

const initPostItemState = {
    tooltipOpen: {}
};

export function postItem(state = initPostItemState, action) {
    switch (action.type){
        case 'postItem/toggleTooltip':
            let rv = {}
            rv[action.id] = action.toggle;
            return{
                tooltipOpen : rv
            };
        default:
            return {
                ...state
            };
    }
}