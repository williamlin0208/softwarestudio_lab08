import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi
} from 'api/posts.js';

/*  Posts */

function startLoading() {
    return {
        type: '@POST/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POST/END_LOADING'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    };
}

function endCreateVote(post) {
    return {
        type: '@POST/END_CREATE_VOTE',
        post
    };
}

export function listPosts(searchText) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listPostsFromApi(searchText).then(posts => {
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

export function createPost(mood, text) {
    //TODO
    let rv = {};
    let uncomplete = false;
    rv.type = 'postForm/createPost';
    if (mood === 'na') {
        rv.moodToggle = true;
        uncomplete = true;
    }
    if (!text) {
        rv.inputDanger = true;
        uncomplete = true;
    }
    if(uncomplete){
        console.log('danger when create post');
        return rv;
    }

    return (dispatch, getState) => {
        dispatch(startLoading());
        dispatch(input(''));
        dispatch(selectMood('na'));
        return createPostFromApi(mood,text).then(post => {
            dispatch(endCreatePost(post));
        }).catch(err => {
            console.error('Error creating post', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };

};

export function createVote(id, mood) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return createVoteFromApi(id,mood).then(posts => {
            dispatch(endCreateVote(posts));
        }).catch(err => {
            console.error('Error creating vote', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

/*  Search text */

export function setSearchText(searchText) {
    // TODO
}

/*  Post Form */

export function input(text) {
    let rv = {};
    rv.type = 'postForm/input';
    rv.inputValue = text;
    if(text){
        rv.inputDanger = false;
    }
    return rv;
};

export function inputDanger(danger) {
    //TODO
};

export function toggleMood() {

};

export function setMoodToggle(toggle) {
    return {
        type: 'postForm/setMoodtoggle',
        moodToggle: toggle
    };
};

export function selectMood(mood) {
    return {
        type: 'postForm/selectMood',
        mood: mood,
        toggle: false
    };
};

/*  Post item */

export function toggleTooltip(id) {
    //TODO
    return {
        type: 'postItem/toggleTooltip',
        id : id,
        toggle: true
    }
};

export function setTooltipToggle(id, toggle) {
    //TODO
    return {
        type: 'postItem/toggleTooltip',
        id : id,
        toggle: toggle
    }
};
