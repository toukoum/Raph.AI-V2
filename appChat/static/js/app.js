window.addEventListener('load', function() {

    // récuperation des éléments importants
    const inputExamples  = document.querySelectorAll('.input_example')
    const inputUser = this.document.querySelector('#inputField')

    const restart = this.document.querySelector('.link-restart')

    const btnUser = this.document.querySelector('.btn')
    const introSection = this.document.querySelector('.intro-section')
    const chatSection = this.document.querySelector('.chat-section')

    restart.classList.add('hide');

    inputExamples.forEach(function(link){
        link.addEventListener('click', function(event){
            event.preventDefault();

            const text = link.querySelector('p').textContent;
            const mtext = text.substring(1, text.length - 1);
            
            inputUser.value += mtext;

            btnUser.click();
            restart.classList.remove('hide');


        })
    })
    inputField.addEventListener('keyup', function(event) {
        const inputValue = event.target.value;
    
        if (inputValue.length > 0) {
            inputUser.classList.remove('not-valide')
            }
        });

    let firstclick = true;
    let historik = "";




    btnUser.addEventListener('click', function(event){
        if(validateForm(event)){
            inputUser.classList.remove('not-valide')

            restart.classList.remove('hide');

            questionUser = inputUser.value;

            event.preventDefault();
            btnUser.disabled = true;


            if(firstclick){
                introSection.classList.add('hide');
                firstclick = false;
            }




            const divQuestionWrapper = document.createElement('div');
            divQuestionWrapper.classList.add('div-question-wrapper')

            // Créer un nouvel élément <div>
            const newDiv = document.createElement('div');
            newDiv.classList.add('div-question');

            // Créer un élément <h4> à l'intérieur de la nouvelle div pour le "user :"
            const titleUser = document.createElement('h4');
            titleUser.textContent = 'User:';

            // Créer un élément <p> à l'intérieur de la nouvelle div pour le text de la question de l'user
            const questionText = document.createElement('p');
            questionText.textContent = inputUser.value;
            inputUser.value = "";

            newDiv.appendChild(titleUser);
            newDiv.appendChild(questionText);
            


            divQuestionWrapper.appendChild(newDiv)

            // ajouter la nouvelle div de question dans la section chat
            chatSection.appendChild(divQuestionWrapper);

            window.scrollTo(0, document.body.scrollHeight);




            const divAnswerWrapper = document.createElement('div');
            divAnswerWrapper.classList.add('div-answer-wrapper')


            // Créer un nouvel élément <div>
            const divAnswer = document.createElement('div');
            divAnswer.classList.add('div-answer');


            // pour les loading dots
            const loadingDots = document.createElement('div');
            loadingDots.classList.add('dot-elastic');
            divAnswer.appendChild(loadingDots);




            // Créer un élément <video> à l'intérieur de la nouvelle div
            const video = document.createElement('video');
            video.width = 75;
            video.height = 75;
            video.loop = true;

            // Créer un élément <source> à l'intérieur de la nouvelle vidéo
            const source = document.createElement('source');
            source.src = "/static/videos/test.webm";
            source.type = "video/mp4";

            // Ajouter l'élément <source> à la nouvelle vidéo
            video.appendChild(source);

            // Créer un élément <p> à l'intérieur de la nouvelle div pour le text de la question de l'user
            const answerText = document.createElement('p');

            window.scrollTo(0, document.body.scrollHeight);

            var csrf = $("input[name=csrfmiddlewaretoken]").val();

            // console.log('question de l user :' + questionUser);

            $.ajax({
                url: '/get_answer/',
                type: 'POST',
                data: {
                    question: questionUser,
                    historik: historik, 
                    csrfmiddlewaretoken: csrf
                },
                
                success: function (data) {
                    
                
                    answeerHistorik = data.answer;

                    answeer = unicodeToChar(answeerHistorik);
                    // console.log('Test 2' + answeer);

                    answeer = answeer.replace(/\n/g, "<br>"); // Remplacer tous les sauts de ligne par des balises <br>


                    setTimeout(function() {
                        if(data.answer != "Unable to fetch the response, Please try again."){
                            historik+=questionUser + "\n"  + answeerHistorik + "\n";
                        }
                    }, 1000); // Délai de 1 seconde
                    
                    // tester si la reponse est égal a Unable to fetch the response, Please try again.

                    
                    

                    
                    divAnswer.removeChild(loadingDots);

                

                    
                    const mots_reponse = answeer.split(/\s+/); // Utilisation de l'expression régulière /\s+/ pour diviser le texte par espaces et sauts de ligne
                    // const mots_reponse = answeer.split(" ");
                    // console.log("longueur des mots : " + mots_reponse)
                    let i = 0;
            


                    const interval = setInterval(() => {
                        window.scrollTo(0, document.body.scrollHeight);

                        const currentWord = mots_reponse[i];

                        if (currentWord.includes("\n")) {
                          answerText.innerHTML += "<br>";
                        } else {
                          answerText.innerHTML += currentWord + " ";
                        }
                      
                        video.play();
                        i ++;

      


                        if(i >= mots_reponse.length){
                            btnUser.disabled = false;
                            clearInterval(interval);
                            video.pause();
                            video.currentTime = 0;
                        }
                    }, 100)


                },   error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
                
            })
            window.scrollTo(0, document.body.scrollHeight);

            // console.log("historik:" + historik)
            
            // Ajouter la nouvelle vidéo à la nouvelle div
            divAnswer.appendChild(video);
            divAnswer.appendChild(answerText)
            

            divAnswerWrapper.appendChild(divAnswer)
            chatSection.appendChild(divAnswerWrapper)

            window.scrollTo(0, document.body.scrollHeight);


            

        }else{
            const inputField = document.querySelector('.form-control');

            inputField.classList.add('not-valide');

        }        
        
        
    })   

    // fun 

    let docTitle = this.document.title;
    this.window.addEventListener('blur', ()=> {
        this.document.title = "Reviens me parler :(";
    })
    this.window.addEventListener("focus", ()=> {
        this.document.title = docTitle;
    })



});

// fonction qui transforme un texte unicode en text normal
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, 
           function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
           });
 }


function validateForm(event) {
    var inputField = document.getElementById('inputField');
    
    if (inputField.value.length === 0) {
      event.preventDefault(); // Empêche la soumission du formulaire
      inputField.setCustomValidity('Please fill out this field.');
      return false;

    } else {
      inputField.setCustomValidity('');
      return true;
    }


  }