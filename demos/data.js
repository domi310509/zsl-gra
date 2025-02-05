function getJson(teacher){
    if(teacher == "debug"){
        return JSON.parse(`
            {
                "teacher":{
                    "name": "Imie nauczyciela",
                    "position": {"x": 100, "y": 200},
                    "imageName": "nazwa pliku z zdjeciem nauczyciela"
                },
                "numberOfQuestions": 10,
                "quiz":{
                    "1":{
                        "question":"Pytanie",
                        "correctAnswers":"Ta odpowiedź jest poprawna",
                        "answers":{
                            "1": "Ta odpowiedź nie jest poprawna",
                            "2": "Ta odpowiedź nie jest poprawna",
                            "3": "Ta odpowiedź nie jest poprawna"
                        }    
                    },
                    "2":{"question":"Pytanie"}
                }
            }
    `)}
    }