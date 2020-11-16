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
        
        if(!data && data.length < 1) {
            $("#wordErrAlert").html("Unable to find word. Try another one.");
            return;
        }
        
        $("#word-title").html(`<u>${data[0].meta.id.toUpperCase()}</u>`);
        
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
        $("#synonyms-text").html("");
        if(data[0].meta.syns.length < 1) {
            $("#synonyms-text").append(`None Found.`);
        } else {
            for(let i = 0; i < data[0].meta.syns[0].length; i++) {
                $("#synonyms-text").append(`<button type="button" class="btn btn-outline-primary word-btn">${data[0].meta.syns[0][i]}</button>`);
            }
        }    
            
        //Add antonyms
        $("#antonyms-text").html("");
        if(data[0].meta.ants.length < 1) {
            $("#antonyms-text").append(`None Found.`);
        } else {
            for(let i = 0; i < data[0].meta.ants[0].length; i++) {
                $("#antonyms-text").append(`<button type="button" class="btn btn-outline-danger word-btn">${data[0].meta.ants[0][i]}</button>`);
            }
        }
        
    });
    
    $(document).on("click", ".word-btn", function(){
        alert("Clicked with text: " + $(this).text());
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
        } else {
            return false;
        }
        
        $("#wordErrAlert").html("");
        return true;
    }

});