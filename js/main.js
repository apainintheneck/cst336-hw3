/*global $*/
$(document).ready(function(){
    
    //Event Listeners
    $("#enter-word").click(getWordInfo());
    $("#input-word").on("change", isWordValid($("#input-word").val()))
    
    //Functions
    async function getWordInfo(){
        let inputWord = $("#input-word").val();
        
        if(!isWordValid(inputWord)) return;
        
        
    }
    
    function isWordValid(word) {
        if(!isNaN(word)) {
            $("#wordErrAlert").html("Enter a valid word.");
        } else {
            $("#wordErrAlert").html("");
        }
    }
    
    function displayWordCloud(htmlId, data) {
        
    }
});