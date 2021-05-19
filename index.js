
function createDomMani(...arr){
    var element1=document.createElement(arr[0]);
    for(let iter=1;iter<arr.length;iter++){
        if(arr[iter].includes("=")){
        let attreibute,attributename;
        [attreibute,attributename]=arr[iter].split("=");
        element1.setAttribute(attreibute,attributename);
        }
        else{
            element1.innerHTML=arr[iter];
       }    
    }
    return element1;
}


function dataPopulate(sectionName){
    let url_nytimes_global = 'https://api.nytimes.com/svc/topstories/v2/';
    let apiPart = "api-key=Zd8ki2qsLfbTP4EAQ0Xp58qQ1DLnWNU2";
    let section1Part = `${sectionName}.json?`;
fetch(url_nytimes_global+section1Part+apiPart)
.then(response=>response.json())
.then(data=>{data.results.map(e=>cardMaker(e))})
.catch(err=>console.log(err))
}

function cardMaker(data){   
    let colElement = createDomMani("div","class=col-md-4")
    let cardElement = createDomMani("div","class=card")
    let cardImageElement = createDomMani("img","class=img-thumbnail",`abs=${data.multimedia[0].caption}`,`src=${data.multimedia[0].url}`,"width=370px","height=200px")
    let cardBodyElement = createDomMani("div","class=card-body")
    let cardTitleElement = createDomMani("div","class=card-text",data.title)
    let cardDateElement = createDomMani("div","class=card-text","style=padding: 3px; margin: 3px;",data.published_date.split("T")[0].split("-"))
    let cardButtonElement = createDomMani("a","class=btn btn-primary",`href=${data.url}`,"target=_blank","Read More...")
    let cardRowElement = createDomMani("div","class=row")
    cardRowElement.append(cardDateElement,cardButtonElement)
    cardBodyElement.append(cardTitleElement,cardRowElement)
    cardElement.append(cardImageElement,cardBodyElement)
    colElement.append(cardElement)
    document.getElementById("displayrow").append(colElement)
}

function displayChildren(event){
    console.log(event.target.name);
    let rowelement = document.getElementById("displayrow");
    deleteChildElements(rowelement);
    dataPopulate(event.target.name);
}

function deleteChildElements(parentElement){
    console.log(parentElement.nodeType)
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild);
    }
}
dataPopulate("home");