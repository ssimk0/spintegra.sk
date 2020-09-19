import {initialState, reducer, SET_MENU_ITEMS, SET_PAGE_TITLE, SET_TOKEN, SET_USER_INFO} from './app';

function dispatch(action, state = initialState) {
    return reducer({...state}, action);
}

it("should not change state when invalid action was called", () => {
    const state = dispatch({
        type: "INVALID",
        value: {}
    })

    expect(state).toEqual(initialState);
})

it("should set user info to state", () => {
    const state = dispatch({
        type: SET_USER_INFO,
        value: {
            id: 1,
            is_admin: false,
            first_name: "Example",
            last_name: "User"
        }
    })

    expect(state.user).toBeDefined();
    expect(state.user.id).toEqual(1);
    expect(state.user.first_name).toEqual("Example");
})


it("should set user info to state without override previous one", () => {
    const s = dispatch({
        type: SET_USER_INFO,
        value: {
            id: 1,
            is_admin: false,
            first_name: "Example",
            last_name: "User"
        }
    })

    const state = dispatch({
        type: SET_USER_INFO,
        value: {
            is_admin: true,
        }
    }, s)

    expect(state.user.id).toEqual(1);
    expect(state.user.first_name).toEqual("Example");
    expect(state.user.is_admin).toBeTruthy();
})


it("should update the title in state", () => {
    const state = dispatch({
        type: SET_PAGE_TITLE,
        value: "Example"
    })

    expect(state.title).toEqual("Example");
})

it("should update the title in state only once when is same as before", () => {
    const s = dispatch({
        type: SET_PAGE_TITLE,
        value: "Example"
    })

    const state = dispatch({
        type: SET_PAGE_TITLE,
        value: "Example"
    }, s)

    expect(state).toEqual(s);
})

it("should update the token in state and local storage", () => {
    const state = dispatch({
        type: SET_TOKEN,
        value: "Example"
    })

    expect(state.token).toEqual("Example");
    expect(localStorage.getItem("token")).toEqual("Example");
})

it("should update menu items", () => {
    const state = dispatch({
        type: SET_MENU_ITEMS,
        value: [{
            "title": "test",
            "slug": "t"
        }]
    })

    expect(state.menuItems.length).toEqual(1);
    expect(state.menuItems[0].title).toEqual("test");
})
