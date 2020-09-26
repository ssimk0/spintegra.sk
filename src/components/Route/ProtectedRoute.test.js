import {isAllowed} from "./ProtectedRoute";


it('should correctly calculate isAllowed for admin', () => {

    expect(isAllowed('admin', {is_admin: true})).toBeTruthy()
    expect(isAllowed('admin', {is_admin: false})).toBeFalsy()
})


it('should correctly calculate isAllowed for editor', () => {

    expect(isAllowed('editor', {can_edit: true})).toBeTruthy()
    expect(isAllowed('editor', {can_edit: false})).toBeFalsy()
})

it('should correctly calculate isAllowed for notLogged', () => {

    expect(isAllowed('notLogged', null)).toBeTruthy()
    expect(isAllowed('notLogged', {})).toBeFalsy()
})

it('should correctly calculate isAllowed for logged', () => {

    expect(isAllowed('logged', null)).toBeFalsy()
    expect(isAllowed('logged', {})).toBeTruthy()
})

it('should correctly calculate isAllowed for not valid or non type', () => {

    expect(isAllowed('notValid', {can_edit: true, is_admin: true})).toBeFalsy()
    expect(isAllowed('notValid', null)).toBeFalsy()
    expect(isAllowed('', {can_edit: true, is_admin: true})).toBeFalsy()
    expect(isAllowed(null, null)).toBeFalsy()
})
