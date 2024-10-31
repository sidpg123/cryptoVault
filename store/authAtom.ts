import { atom } from "recoil";

const authAtom = atom({
    key: 'isAuthenticated',
    default: false
});

export default authAtom;