import localStorage, {storage} from "./localStorage";


test('should not fail when localStorage exist', () => {

    localStorage();

    expect(window.localStorage).toBeDefined();
})



test('should define localStorage when don\'t exist', () => {
    jest.spyOn(global, 'window', 'get').mockImplementationOnce(() => ({
        localStorage: null
    }));

    localStorage();

    expect(window.localStorage).toBeDefined();
})


test('should setItem and getItem correctly', () => {

   storage.setItem("token", "test")

    expect(storage.getItem("token")).toEqual("test");
})

test('should setItem and getItem correctly', () => {

    storage.setItem("token", "test")

    expect(storage.getItem("token")).toEqual("test");
})


test('should removeItem correctly', () => {

    storage.setItem("token", "test")

    expect(storage.getItem("token")).toEqual("test");

    storage.removeItem("token");
    expect(storage.getItem("token")).toBeNull();
})


test('should hasOwnProp correctly', () => {

    storage.setItem("token", "test")

    expect(storage.hasOwnProp("token")).toBeTruthy();
    expect(storage.hasOwnProp("other")).toBeFalsy();
})

test('should hasOwnProperty correctly', () => {

    storage.setItem("token", "test")

    expect(storage.hasOwnProperty("token")).toBeTruthy();
    expect(storage.hasOwnProperty("other")).toBeFalsy();
})


test('should hasOwnProperty correctly', () => {

    storage.setItem("token", "test")

    expect(storage.length).toEqual(1);
})


test('should hasOwnProperty correctly', () => {

    storage.setItem("token", "test")

    expect(storage.key(0)).toEqual("token");
    expect(storage.key(1)).toBeUndefined();
})
