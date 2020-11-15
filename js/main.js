/*global $*/
/*global fetch*/
$(document).ready(function(){
    const apiKey = "0a4a967d-fbcb-424d-9e52-b06b00ca52cb";
    
    //Event Listeners
    $("#enter-word").click(async function(){
        let inputWord = $("#input-word").val();
        
        if(!isWordValid(inputWord)) return;
        
        let url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${inputWord}?key=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        
        if(data.length < 1) {
            $("#wordErrAlert").html("Unable to find word. Try another one.");
            return;
        }
        
        $("#word-title").html(data[0].meta.id.toUpperCase());
        
        for(let i = 0; i < data.length; i++){
            if(data[i].meta.id === inputWord) {
                $("#word-usage").append(`<option value="${i}"> ${data[i].fl}`);
            }
        }
        $("#word-usage").append(`hr>`);
        
        
        $("#definition").html("");
        
        for(let i = 0; i < data[0].shortdef.length; i++) {
            $("#definition").append(`<option value="${i}"> ${data[0].shortdef[i]}`);
        }
        
        //Add synonyms 
        
        //Add antonyms
        
    });
    
    //Functions
    function isWordValid(word) {
        if(word !== "") {
            for(let i = 0; i < word.length; i++) {
                if(word[i] >= "0" && word[i] <= "9") {
                    $("#wordErrAlert").html("Enter a valid word.");
                    return false;
                }
            }
        }
        
        $("#wordErrAlert").html("");
        return true;
    }

});