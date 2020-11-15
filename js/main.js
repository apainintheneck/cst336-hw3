/*global $*/
$(document).ready(function(){
    
    //Event Listeners
    $("#enter-word").click(async function(){
        let inputWord = $("#input-word").val();
        
        if(!isWordValid(inputWord)) return;
        
        
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