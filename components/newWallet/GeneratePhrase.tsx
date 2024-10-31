import React, { useEffect } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useRecoilState, useSetRecoilState } from "recoil";
import onboardStepsAtom from "@/store/onboardStepsAtom";
import { Badge } from "@/components/ui/badge";
import phraseAtom from "@/store/PhraseAtom";



function GeneratePhrase() {
  const [phrase, setPhrase] = useRecoilState(phraseAtom);
  const setOnboardSteps = useSetRecoilState(onboardStepsAtom);

  useEffect(() => {
    if (phrase.phrase === '') { // Initialize only if phrase is empty
      const mnemonic = generateMnemonic();
      console.log('mnemonic', mnemonic);
      console.log( typeof(mnemonic));
      
      const seed = mnemonicToSeedSync(mnemonic);
      console.log("seed", seed);
      
      setPhrase({
        phrase: mnemonic,
      });

    }
  }, [phrase, setPhrase]); 

  const words = phrase.phrase.split(' ');

  return (
    <>
      <h1 className="text-4xl font-bold p-4">Secret recovery phrase</h1>
      <p className="p-3">Save these words in a safe place.</p>
      <button
        className="text-blue-700"
        onClick={() => setOnboardSteps((c) => c - 1)}
      >
        Read warning again
      </button>

      <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded">
        {words && words.map((word, index) => (
          <Badge key={index} className="p-2 bg-blue-100 text-blue-700">
            {word}
          </Badge>
        ))}
      </div>
    </>
  );
}

export default GeneratePhrase;
