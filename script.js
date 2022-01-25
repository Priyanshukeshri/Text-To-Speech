const textarea = document.querySelector("textarea");
speechBtn = document.querySelector("button");
voiceList = document.querySelector("select");

let synth = speechSynthesis;
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        // selecting "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //Creating an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}"${selected}>${voice.name} (${voice.lang}) </option>`;
        voiceList.insertAdjacentHTML("beforeend",option);//inserting option tag beforeend 
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        // if the available device voice ame is equal to the user selecetd voice name
        // then set the speech voice to the user selected voice
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance); // speak the speech/utternance
}

speechBtn.addEventListener("click",e => {
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){// if an utternance / speech is not currently in the process of speaking
        textToSpeech(textarea.value);
        }
        if(textarea.value.length>80){
            // if isSpeaking is true then change it's value to false and resume the uternance
            //else change it's value to true and pause the speech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }

            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true ;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});