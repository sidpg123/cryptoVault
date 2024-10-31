import { atom } from "recoil";

const phraseAtom = atom<{
    phrase: string,
}>({
    key: 'Phrase',
    default: {
        phrase: ''
    }
});

export default phraseAtom;