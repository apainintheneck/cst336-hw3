/*global $*/
/*global fetch*/
$(document).ready(function(){
    const apiKey = "0a4a967d-fbcb-424d-9e52-b06b00ca52cb";
    var data;
    
    loadData("random");
    
    //Event Listeners
    $("#enter-word").click(function(){
        let inputWord = $("#input-word").val();
        
        if(!isWordValid(inputWord)) return;
        
        loadData(inputWord);
    });
    
    $(document).on("click", ".word-btn", function(){
        $("#input-word").val($(this).text());
        loadData($(this).text());
    });
    
    $("#word-usage").on("change", function(){
        displayDefinitions();
        displaySynonyms();  
        displayAntonyms();
    });
    
    $("#definition").on("change", function(){
        displaySynonyms();  
        displayAntonyms();
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
    
    async function loadData(word) {
        let url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiKey}`;
        let response = await fetch(url);
        let newData = await response.json();
        console.log(newData);
        
        if(newData.length === 0 || (typeof newData[0]) === "string") {
            $("#wordErrAlert").html("Unable to find word. Try another one.");
            return;
        } else {
            data = newData;
            displayData(word, data);
        }
    }
    
    function displayData(word) {
        $("#word-title").html(`<u>${data[0].meta.id.toUpperCase()}</u>`);
        
        $("#word-usage").html("");
        for(let i = 0; i < data.length; i++){
            if(data[i].meta.id === word) {
                $("#word-usage").append(`<option value="${i}"> ${data[i].fl}`);
            }
        }
        
        displayDefinitions();
        displaySynonyms();  
        displayAntonyms();
    }
    
    function displayDefinitions() {
        let usageIndex = Number($("#word-usage").val());
        
        $("#definition").html("");
        for(let i = 0; i < data[usageIndex].shortdef.length; i++) {
            $("#definition").append(`<option value="${i}"> ${data[usageIndex].shortdef[i]}`);
        }
    }
    
    function displaySynonyms() {
        let usageIndex = Number($("#word-usage").val());
        let defIndex = Number($("#definition").val());
        
        //Add synonyms
        $("#synonyms-text").html("");
        if(data[usageIndex].meta.syns.length === 0) {
            $("#synonyms-text").append(`None Found.`);
        } else {
            for(let i = 0; i < data[usageIndex].meta.syns[defIndex].length; i++) {
                $("#synonyms-text").append(`<button type="button" class="btn btn-outline-primary word-btn">${data[usageIndex].meta.syns[defIndex][i]}</button>`);
            }
        } 
    }
    
    function displayAntonyms() {
        let usageIndex = Number($("#word-usage").val());
        let defIndex = Number($("#definition").val());
        
        //Add antonyms
        $("#antonyms-text").html("");
        if(data[usageIndex].meta.ants.length === 0) {
            $("#antonyms-text").append(`None Found.`);
        } else {
            for(let i = 0; i < data[usageIndex].meta.ants[defIndex].length; i++) {
                $("#antonyms-text").append(`<button type="button" class="btn btn-outline-danger word-btn">${data[usageIndex].meta.ants[defIndex][i]}</button>`);
            }
        }
    }

});