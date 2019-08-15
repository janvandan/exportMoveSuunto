/*
 * Ceci est une ardoise JavaScript.
 *
 * Saisissez du code JavaScript, puis faites un clic droit ou sélectionnez à partir du menu Exécuter :
 * 1. Exécuter pour évaluer le texte sélectionné (Cmd-R),
 * 2. Examiner pour mettre en place un objet Inspector sur le résultat (Cmd-I), ou,
 * 3. Afficher pour insérer le résultat dans un commentaire après la sélection. (Cmd-L)
 */

var debug = 1;
var nameGreasemonkeyScript = "Jan Suunto export...";

function exportFile( urlMoveFile ) {
    const urlMoveRacine = 'http://www.movescount.com/move/export?id=';
    const urlMoveOption = '&format=xlsx';
    
    if ( debug > 0 ) { console.log(nameGreasemonkeyScript + ".exportFile : urlMoveFile = " + urlMoveFile);}
            
    urlMoveFile = urlMoveRacine + urlMoveFile + urlMoveOption ;
    if ( debug > 0 ) { console.log(nameGreasemonkeyScript + ".exportFile : urlMoveFile = " + urlMoveFile);}
            
    if ( debug > 0 ) { console.log(nameGreasemonkeyScript + ".exportFile : lance a blanc la commande open( " + urlMoveFile + " );") }
    else {
        open( urlMoveFile );
    }
}

try {
    const nodeMovelistXPath = '/html/body/div[2]/div[1]/div[1]/div/section[1]/div/section[1]/div/table/tbody/tr';
    const nodeMoveTypeEndXPath = ']/td[1]/i';
    let nodeMoveTypeStartXPath = nodeMovelistXPath + "[";
    
    // Debut code
    if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".main : debut execution code");}
    
    let  nodestart  =  document.evaluate(nodeMovelistXPath, document, null, XPathResult.ANY_TYPE, null);
    
    let nodelive = nodestart.iterateNext();
    
    let i = 1;
    
    if (confirm("Start " + nameGreasemonkeyScript + " ?")) {
        if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".main : exec confirme");}
        
        while ( nodelive ) {
            if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".main : nodelive " + i + " = "+ nodelive.textContent + " --");}
            
            let nodeMoveTypeFullXPath = nodeMoveTypeStartXPath + i + nodeMoveTypeEndXPath;
            if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".main : nodeMoveTypeFullXPath = "+ nodeMoveTypeFullXPath);}
            
            let nodeMoveTypestart = document.evaluate(nodeMoveTypeFullXPath, document, null, XPathResult.ANY_TYPE, null);
            
            let nodeMoveTypelive = nodeMoveTypestart.iterateNext();
            let moveType = nodeMoveTypelive.getAttribute('title');
            
            if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".main : nodeMoveTypelive.getAttribute(title) = " + moveType);}
            
            if ( moveType == "Pool swimming") {
                if ( debug > 0 ) { console.log(nameGreasemonkeyScript + ".main : CHECK moveType = Pool swimming");}
                exportFile( nodelive.getAttribute('data-moveid') );
            } else {
                if ( debug > 0 ) { console.log(nameGreasemonkeyScript + ".main : KO moveType <> Pool swimming");}
            }
        
            nodelive = nodestart.iterateNext();
            ++i;
        }
    } else {
            if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".main : cancel");}
    }
}

catch (e) {
        alert("UserScript exception:\n" + e);
}

if ( debug > 1 ) { console.log(nameGreasemonkeyScript + ".end : fin execution code ");}
// Fin code
