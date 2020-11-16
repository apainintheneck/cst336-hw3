/*global $*/
/*global fetch*/
$(document).ready(function(){
    const apiKey = "0a4a967d-fbcb-424d-9e52-b06b00ca52cb";
    let json = '[{"meta":{"id":"random","uuid":"264709bd-8aef-4494-b13d-967f628e2913","src":"coll_thes","section":"alpha","target":{"tuuid":"f8ddb379-9cb5-48a9-a171-5fd4a6302978","tsrc":"collegiate"},"stems":["random","randomly","randomness","randomnesses"],"syns":[["aimless","arbitrary","catch-as-catch-can","desultory","erratic","haphazard","helter-skelter","hit-or-miss","scattered","slapdash","stray"]],"ants":[["methodical","nonrandom","orderly","organized","regular","systematic","systematized"]],"offensive":false},"hwi":{"hw":"random"},"fl":"adjective","def":[{"sseq":[[["sense",{"dt":[["text","lacking a definite plan, purpose, or pattern "],["vis",[{"t":"since we were new in town, our choice of a vet for our dog was entirely {it}random{\/it}"}]]],"syn_list":[[{"wd":"aimless"},{"wd":"arbitrary"},{"wd":"catch-as-catch-can"},{"wd":"desultory"},{"wd":"erratic"},{"wd":"haphazard"},{"wd":"helter-skelter"},{"wd":"hit-or-miss"},{"wd":"scattered"},{"wd":"slapdash"},{"wd":"stray"}]],"rel_list":[[{"wd":"accidental"},{"wd":"casual"},{"wd":"chance"},{"wd":"chancy"},{"wd":"contingent"},{"wd":"fluky","wvrs":[{"wvl":"also","wva":"flukey"}]},{"wd":"fortuitous"},{"wd":"inadvertent"},{"wd":"incidental"},{"wd":"lucky"},{"wd":"unconsidered"},{"wd":"unintended"},{"wd":"unintentional"},{"wd":"unplanned"},{"wd":"unpremeditated"}],[{"wd":"scattershot"},{"wd":"shotgun"}],[{"wd":"irregular"},{"wd":"odd"},{"wd":"sporadic"},{"wd":"spot"}],[{"wd":"directionless"},{"wd":"objectless"},{"wd":"purposeless"}],[{"wd":"indiscriminate"},{"wd":"unsystematic"}],[{"wd":"undirected"}],[{"wd":"disorderly"},{"wd":"disorganized"}],[{"wd":"undiscriminating"},{"wd":"unselective"}]],"near_list":[[{"wd":"established"},{"wd":"fixed"},{"wd":"regular"},{"wd":"set"},{"wd":"stable"},{"wd":"steady"}],[{"wd":"constant"},{"wd":"continuous"},{"wd":"even"}],[{"wd":"arranged"},{"wd":"managed"},{"wd":"orchestrated"},{"wd":"ordered"},{"wd":"planned"}],[{"wd":"aware"},{"wd":"conscious"},{"wd":"deliberate"},{"wd":"purposeful"},{"wd":"thoughtful"},{"wd":"willful","wvrs":[{"wvl":"or","wva":"wilful"}]}]],"ant_list":[[{"wd":"methodical","wvrs":[{"wvl":"also","wva":"methodic"}]},{"wd":"nonrandom"},{"wd":"orderly"},{"wd":"organized"},{"wd":"regular"},{"wd":"systematic"},{"wd":"systematized"}]]}]]]}],"shortdef":["lacking a definite plan, purpose, or pattern"]},{"meta":{"id":"at random","uuid":"e6291f91-f3c0-446a-a8c7-e76dd9776f83","src":"CTenhance","section":"phrases","stems":["at random"],"syns":[["aimlessly","anyhow","anyway","anywise","desultorily","erratically","haphazard","haphazardly","helter-skelter","hit or miss","irregularly","randomly","willy-nilly"]],"ants":[["methodically","systematically"]],"offensive":false},"hwi":{"hw":"at random"},"fl":"phrase","def":[{"sseq":[[["sense",{"dt":[["text","without definite aim, direction, rule, or method "],["vis",[{"t":"The winner was selected {it}at random{\/it}."}]]],"syn_list":[[{"wd":"aimlessly"},{"wd":"anyhow"},{"wd":"anyway"},{"wd":"anywise"},{"wd":"desultorily"},{"wd":"erratically"},{"wd":"haphazard"},{"wd":"haphazardly"},{"wd":"helter-skelter"},{"wd":"hit or miss"},{"wd":"irregularly"},{"wd":"randomly"},{"wd":"willy-nilly"}]],"rel_list":[[{"wd":"arbitrarily"},{"wd":"capriciously"},{"wd":"carelessly"},{"wd":"casually"},{"wd":"indiscriminately"},{"wd":"informally"},{"wd":"offhand"},{"wd":"offhandedly"},{"wd":"promiscuously"},{"wd":"whimsically"}],[{"wd":"accidentally"},{"wd":"fortuitously"},{"wd":"inadvertently"},{"wd":"unconsciously"},{"wd":"unintentionally"},{"wd":"unwittingly"}],[{"wd":"disconnectedly"},{"wd":"disjointedly"},{"wd":"fitfully"},{"wd":"intermittently"},{"wd":"spottily"},{"wd":"unpredictably"}],[{"wd":"higgledy-piggledy"},{"wd":"topsy-turvy"}]],"near_list":[[{"wd":"carefully"},{"wd":"formally"},{"wd":"gingerly"},{"wd":"meticulously"},{"wd":"orderly"},{"wd":"punctiliously"}],[{"wd":"deliberately"},{"wd":"intentionally"},{"wd":"purposefully"},{"wd":"purposely"}]],"ant_list":[[{"wd":"methodically"},{"wd":"systematically"}]]}]]]}],"shortdef":["without definite aim, direction, rule, or method"]}]';
    var data = JSON.parse(json);
    
    displayData("random");
    
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