class teacher{
    constructor(teacherName, quizId, teacherImageName, imagePosition, numberOfQuestions, questions){
        this.teacherName = teacherName;
        this.quizId = quizId;
        this.teacherImageName = teacherImageName;
        this.imagePosition = imagePosition;
        this.numberOfQuestions = numberOfQuestions;
        this.questions = questions;
        this.currentQuestion = 0;
        this.sum = 0;
    }

    async loadDialogDOM(){
        let dialog = document.createElement("div");
        dialog.className = "dialog";
        
        let dialogImage = document.createElement("img");
        dialogImage.className = "dialog_img";
        dialogImage.src = this.teacherImageName;

        dialog.appendChild(dialogImage);
        dialog.innerHTML += `
            <div class="dialog_text" id="question">
                Pytanie
            </div>
            <div class="dialog_responses">
                    <section class="quiz_section" id="answer1">Opcja 1</section>
                    <section class="quiz_section" id="answer2">Opcja 2</section>
                    <section class="quiz_section" id="answer3">Opcja 3</section>
                    <section class="quiz_section" id="answer4">Opcja 4</section>
            </div>`
        document.getElementById("game_window").appendChild(dialog);
        for (let i = 1; i <= 4; i++) {
            let answerElement = document.getElementById(`answer${i}`);
            answerElement.addEventListener('click', () => this.answer(i));
        }
    }

    answer(id){
        this.quizHandler(id);
    }

    async quiz(i){ //not scaling function
        let question = document.getElementById("question");
        let answer1 = document.getElementById("answer1");
        let answer2 = document.getElementById("answer2");
        let answer3 = document.getElementById("answer3");
        let answer4 = document.getElementById("answer4");

        question.innerText = this.questions[i][0];
        let answers = shuffle(this.questions[i][2].concat(this.questions[i][1]));
        answer1.innerText = answers[0];
        answer2.innerText = answers[1];
        answer3.innerText = answers[2];
        answer4.innerText = answers[3];
        this.currentCorrectAnswer = answers.indexOf(this.questions[i][1]);
        console.log("Poprawna odpowiedź: ", this.currentCorrectAnswer+1);
    }

    async quizHandler(i){
        if(i == this.currentCorrectAnswer+1){
            console.log(`Dobra odpowiedź!!!! (${i})`);
            this.sum++;
        }else{
            console.log(`Zła odpowiedź (${i})`);
        }
        this.currentQuestion++;
        if(this.currentQuestion < this.numberOfQuestions){
            this.quiz(this.currentQuestion);
        } else {
            this.quizDone();
        }
    }

    async quizDone(){
        console.log("done");
        let avg = this.sum/this.numberOfQuestions*100;
        currentPlayer().quizesDone[this.quizId] = avg;
        document.getElementById("question").innerHTML = `Brawo. Zdałeś test na ${avg}%`;
        document.querySelector(".dialog_responses").innerHTML = "";
        await delay(2000);
        document.getElementsByClassName("dialog")[0].remove();
    }
}

function shuffle(array) { // great shuffle algorithm (not mine)
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function getTeacher(teacherName){
    switch (teacherName){
        case "debug": {
            return new teacher("Imie nauczyciela", 1, "images/pobrane.jpg", [0, 0], 2, [ // name, image file name, pixel position, number of questions
                ["Czy ten kod jest super?", "Tak", ["Nie", "Może", "Niezbyt"]], // question, correct answer, [wrong answers]
                ["Czy ten kod nie jest super?", "Nie",  ["Tak", "Może", "Niezbyt"]]
            ]);
        }
      case "matura_matematyka": {
        return new teacher("---", "./pobrane.jpg", [0, 0], 50, [
  ["Ile rozwiązań ma równanie |x - 3| = x + 1?", "1", ["0", "2", "brak"]],
  ["Ile wynosi granica lim(x→0) (sinx/x)?", "1", ["0", "∞", "x"]],
  ["Rozwiąż nierówność: x² - 4x + 3 < 0", "x ∈ (1, 3)", ["x ∈ (-∞, 1)", "x ∈ (3, ∞)", "x ∈ (1, ∞)"]],
  ["Dziedziną funkcji f(x) = 1/(x² - 4) jest:", "x ∈ ℝ, x ≠ -2, 2", ["x ∈ ℝ", "x ∈ ℝ, x ≠ 0", "x ∈ ℝ, x > 0"]],
  ["Pochodna funkcji f(x) = x³ wynosi:", "3x²", ["x²", "3x", "x³"]],
  ["Ile wynosi pole pod wykresem funkcji f(x) = 2x od x = 0 do x = 3?", "9", ["6", "3", "12"]],
  ["Ciąg arytmetyczny: a₁ = 4, r = 3. Ile wynosi a₅?", "16", ["15", "13", "19"]],
  ["Ile przekątnych ma dziesięciokąt?", "35", ["40", "45", "30"]],
  ["Rozwiąż układ równań: x + y = 5, x - y = 1", "x = 3, y = 2", ["x = 2, y = 3", "x = 4, y = 1", "x = 5, y = 0"]],
  ["Ile wynosi granica ciągu aₙ = (2n + 1)/(n + 4) przy n→∞?", "2", ["∞", "1", "0"]],
  ["Która z funkcji ma najmniejszą wartość w punkcie x = 2?", "f(x) = (x - 2)²", ["f(x) = x²", "f(x) = 2x + 1", "f(x) = -x"]],
  ["Ile wynosi wartość wyrażenia sin²(30°) + cos²(30°)?", "1", ["0", "0.5", "2"]],
  ["Rozwiąż równanie log₂(x) = 3", "8", ["6", "9", "4"]],
  ["Ile wynosi objętość kuli o promieniu 2?", "(32/3)π", ["4π", "(16/3)π", "8π"]],
  ["Jeśli det(A) = 5 i A jest macierzą 2x2, to det(2A) = ?", "20", ["10", "25", "15"]],
  ["Ile wynosi całka ∫(x² + 3x)dx?", "(1/3)x³ + (3/2)x² + C", ["(1/3)x³ + 3x² + C", "(1/3)x³ + (3/2)x + C", "(1/4)x³ + (3/2)x² + C"]],
  ["Rozwiąż nierówność: 2x - 5 ≥ 3x + 1", "x ≤ -6", ["x ≥ -6", "x = 6", "x ≤ 6"]],
  ["Rozwiąż układ równań: x + y = 7, 2x - y = 4", "x = 3, y = 4", ["x = 4, y = 3", "x = 2, y = 5", "x = 5, y = 2"]],
  ["Funkcja f(x) = 3x² - 5x + 1. Ile wynosi jej miejsce zerowe?", "1/3", ["1", "2", "0"]],
  ["Ile wynosi pochodna funkcji f(x) = cos(x)?", "-sin(x)", ["sin(x)", "cos(x)", "-cos(x)"]],
  ["Rozwiąż równanie kwadratowe: x² - 5x + 6 = 0", "x = 2, x = 3", ["x = 1, x = 6", "x = 4, x = 2", "x = -2, x = -3"]],
  ["Ile wynosi całka ∫(1/x)dx?", "ln|x| + C", ["ln(x) + C", "1/x + C", "x + C"]],
  ["Dla jakiej liczby x funkcja f(x) = x² - 4x + 3 osiąga minimum?", "x = 2", ["x = 1", "x = 3", "x = 4"]],
  ["Z jakiej liczby wyciągniemy pierwiastek kwadratowy 49?", "7", ["6", "5", "8"]],
  ["Ciąg geometryczny: a₁ = 3, q = 2. Ile wynosi a₅?", "48", ["32", "64", "16"]],
  ["Ciąg arytmetyczny: a₁ = 2, a₅ = 10. Jaka jest różnica r?", "2", ["3", "4", "1"]],
  ["Oblicz granicę lim(x→∞) (3x² - 5x + 7)/(2x² + x - 1)", "3/2", ["5/2", "2/3", "1/3"]],
  ["Jeśli |x - 2| = 5, to x wynosi:", "-3 lub 7", ["5 lub -7", "3 lub -5", "7 lub -5"]],
  ["Rozwiąż układ równań: x + y = 4, x - y = 2", "x = 3, y = 1", ["x = 2, y = 2", "x = 4, y = 0", "x = 1, y = 3"]],
  ["Oblicz pole powierzchni kuli o promieniu 3", "36π", ["9π", "18π", "27π"]],
  ["Jaka jest funkcja odwrotna do f(x) = 2x + 3?", "f⁻¹(x) = (x - 3)/2", ["f⁻¹(x) = (x + 3)/2", "f⁻¹(x) = (x - 3)", "f⁻¹(x) = 2x - 3"]],
  ["Oblicz całkę ∫(e^x)dx", "e^x + C", ["e^x", "x*e^x + C", "1/e^x + C"]],
  ["Który z poniższych ciągów jest arytmetyczny?", "2, 4, 6, 8, 10", ["2, 4, 8, 16", "1, 3, 5, 7", "3, 6, 9, 12"]],
  ["Oblicz granicę: lim(x→∞) (5x - 3)/(x + 1)", "5", ["3", "4", "6"]],
  ["Rozwiąż równanie: x² + 6x + 9 = 0", "x = -3", ["x = 3", "x = -6", "x = 0"]],
  ["Ile wynosi pochodna funkcji f(x) = ln(x)?", "1/x", ["x", "ln(x)", "x²"]],
  ["Oblicz pole powierzchni prostokąta o bokach 6 i 8", "48", ["24", "36", "60"]],
  ["Ile wynosi objętość stożka o promieniu 3 i wysokości 4?", "12π", ["9π", "16π", "6π"]],
  ["Rozwiąż nierówność: 3x - 4 > 2x + 5", "x > 9", ["x > 8", "x < 9", "x < -9"]],
  ["Funkcja f(x) = 2x³ - x² + 4. Jakie jest jej maksimum?", "Brak maksimum", ["x = 0", "x = 1", "x = -1"]],
  ["Ile wynosi granica lim(x→∞) (1/x)?", "0", ["∞", "1", "1/2"]],
  ["Dla jakiej liczby x równanie x² + 4x - 5 = 0 ma pierwiastek?", "x = 1", ["x = 5", "x = -1", "x = 0"]],
  ["Rozwiąż nierówność: x² - 3x + 2 > 0", "x < 1 lub x > 2", ["x > 1", "x < 2", "x > 2"]],
  ["Ile wynosi pole powierzchni sześcianu o boku 4?", "96", ["64", "128", "72"]],
  ["Rozwiąż równanie: x³ - 3x² - 4x = 0", "x = 0, x = 4, x = -1", ["x = 1, x = -4", "x = 2, x = -3", "x = -2, x = 3"]],
  ["Ile wynosi granica lim(x→∞) (2x + 1)/(3x + 2)?", "2/3", ["1/3", "2", "1"]],
  ["Rozwiąż układ równań: 2x + y = 7, x - y = 1", "x = 2, y = 1", ["x = 3, y = 4", "x = 1, y = 6", "x = 0, y = 7"]],
  ["Oblicz wartość wyrażenia: (x² - 4)/(x - 2) przy x = 3", "5", ["4", "3", "6"]],
  ["Funkcja f(x) = x² - 2x + 1 ma minimum w punkcie", "x = 1", ["x = 0", "x = -1", "x = 2"]],
  ["Oblicz objętość stożka o promieniu 5 i wysokości 10", "(50/3)π", ["(25/3)π", "(100/3)π", "(75/3)π"]]
]);

        }
        case "matura_polski": {
     return new teacher("---", "./pobrane.jpg", [0, 0], 50, [
  ["Kto jest autorem 'Pana Tadeusza'?", "Adam Mickiewicz", ["Juliusz Słowacki", "Henryk Sienkiewicz", "Bolesław Prus"]],
  ["Jakie są główne cechy romantyzmu?", "indywidualizm, irracjonalizm, bunt przeciw tradycji", ["racjonalizm, klasycyzm, harmonia", "realizm, obiektywizm, rozum", "stoicyzm, moralizm, altruizm"]],
  ["Co to jest inwersja?", "przestawienie kolejności wyrazów w zdaniu", ["zmiana czasu w zdaniu", "zmiana formy gramatycznej", "zmiana struktury semantycznej"]],
  ["Kto napisał 'Lalkę'?", "Bolesław Prus", ["Józef Ignacy Kraszewski", "Stefan Żeromski", "Henryk Sienkiewicz"]],
  ["Co to jest anafora?", "powtórzenie tego samego wyrazu lub frazy na początku zdań lub wersów", ["powtórzenie słów na końcu wersu", "zmiana tematu w trakcie wypowiedzi", "porównanie w poezji"]],
  ["Który z poetów jest uważany za twórcę polskiego romantyzmu?", "Adam Mickiewicz", ["Juliusz Słowacki", "Cyprian Kamil Norwid", "Tadeusz Różewicz"]],
  ["Co oznacza tytuł 'Dziady'?", "obrzęd ku czci zmarłych", ["spowiedź duszy", "wydarzenia historyczne", "opis życia ludzi w zamierzchłych czasach"]],
  ["Które z dzieł napisane zostało przez Zofię Nałkowską?", "Granica", ["Błąd", "Chłopi", "Przedwiośnie"]],
  ["Co to jest hiperbola?", "przesadne wyolbrzymienie", ["złagodzenie wyrażenia", "obraz poetycki", "nagromadzenie różnych elementów"]],
  ["Kiedy miała miejsce bitwa pod Grunwaldem?", "1410", ["1100", "1250", "1525"]],
  ["W jakim stylu utrzymana jest 'Balladyna'?", "dramat romantyczny", ["tragedia klasyczna", "dramat modernistyczny", "komedia absurdalna"]],
  ["Kto jest autorem 'Faraona'?", "Bolesław Prus", ["Józef Ignacy Kraszewski", "Henryk Sienkiewicz", "Władysław Reymont"]],
  ["Co to jest oksymoron?", "połączenie dwóch sprzecznych pojęć", ["zastosowanie porównania", "przesada w opisie", "rozbudowana metafora"]],
  ["Co jest głównym tematem 'Zbrodni i kary'?", "moralna i psychologiczna przemiana bohatera", ["życie w carskiej Rosji", "sprawiedliwość społeczna", "miłość i wierność"]],
  ["Co to jest paradoks?", "stwierdzenie, które wydaje się sprzeczne, ale zawiera w sobie prawdę", ["bardzo trudne zadanie", "niedopowiedzenie w literaturze", "powtarzający się motyw"]],
  ["Które z dzieł zostało napisane przez Jana Kochanowskiego?", "Treny", ["Żale", "Odprawa posłów greckich", "Ballady i romanse"]],
  ["Co to jest epifora?", "powtórzenie tego samego słowa lub frazy na końcu kolejnych wersów", ["powtórzenie na początku wersów", "użycie przeciwieństw", "częste występowanie metafor"]],
  ["Który poeta jest autorem 'Poezji'?", "Cyprian Kamil Norwid", ["Adam Mickiewicz", "Juliusz Słowacki", "Wisława Szymborska"]],
  ["Co to jest parodia?", "przewrotna, ironiczna wersja jakiegoś dzieła lub stylu", ["utwór o wysokim ładunku emocjonalnym", "użycie słów o wyjątkowej melodyjności", "połączenie kilku stylów literackich"]],
  ["Kiedy powstał 'Pan Tadeusz'?", "1834", ["1820", "1845", "1860"]],
  ["Co to jest metafora?", "wyraz lub zwrot użyty w nietypowym znaczeniu, na zasadzie porównania", ["opis rzeczywisty", "przesadzone wyolbrzymienie", "powtórzenie słów"]],
  ["Jakie cechy charakteryzują bohatera 'Lalki'?", "romantyzm, idealizm, pragnienie zrozumienia świata", ["realizm, pragmatyzm, pesymizm", "romantyzm, zrozumienie ludzkich emocji", "klasycyzm, dążenie do doskonałości"]],
  ["Który poeta napisał 'Kwiaty polskie'?", "Julian Tuwim", ["Kazimierz Wierzyński", "Jarosław Iwaszkiewicz", "Czesław Miłosz"]],
  ["Co to jest elipsa?", "pominięcie pewnych elementów w zdaniu, które są domyślne", ["użycie wielokrotnych metafor", "nadużywanie wykrzykników", "powtarzanie dźwięków"]],
  ["W jakim dziele pojawia się postać Aliny?", "'Balladyna' Juliusza Słowackiego", ["'Pana Tadeusza' Adama Mickiewicza", "'Lalka' Bolesława Prusa", "'Kordian' Juliusza Słowackiego"]],
  ["Co to jest eufemizm?", "złagodzenie wyrażenia", ["przesada w opisie", "życie w nadmiarze", "stosowanie sprzecznych terminów"]],
  ["Kto napisał 'Chłopów'?", "Władysław Reymont", ["Bolesław Prus", "Stefan Żeromski", "Henryk Sienkiewicz"]],
  ["Co to jest synestezja?", "połączenie różnych doznań zmysłowych", ["przewrotne użycie słów", "zastosowanie symboli", "częsta zmiana tematu"]],
  ["Która postać pojawia się w 'Ferdydurke'?", "Miecio", ["Jacek", "Filip", "Władek"]],
  ["Co to jest motyw?", "powtarzający się w literaturze temat, obraz lub idea", ["rozwój akcji", "dramatyczny zwrot", "zakończenie powieści"]],
  ["Co to jest intertekstualizm?", "odwołania do innych tekstów literackich", ["tworzenie własnego słownictwa", "nadmiar wyrazów", "zmiana formy gramatycznej"]],
  ["Który utwór jest przykładem dramatu?", "Hamlet Williama Shakespeare'a", ["Poezje Adama Mickiewicza", "Lalka Bolesława Prusa", "Wesele Stanisława Wyspiańskiego"]],
  ["W jakiej epoce powstał 'Mieszczanin szlachcicem'?", "barok", ["romantyzm", "klasycyzm", "renesans"]],
  ["Który z pisarzy jest autorem 'Granicy'?", "Zofia Nałkowska", ["Stefan Żeromski", "Henryk Sienkiewicz", "Maria Dąbrowska"]],
  ["Co to jest homonimia?", "jedno słowo o dwóch różnych znaczeniach", ["zastosowanie zapożyczeń", "powtórzenie słowa", "jedno słowo o różnych formach gramatycznych"]],
  ["W 'Panu Tadeuszu' kto jest autorem słów 'Polska to wielka rzecz'?", "Tadeusz", ["Jacek Soplica", "Sędzia", "Gerwazy"]],
  ["Co to jest synekdocha?", "zastosowanie części zamiast całości lub całości zamiast części", ["użycie przeciwieństwa", "zastosowanie wyolbrzymień", "kompilacja dwóch utworów"]],
  ["Kto był autorem 'Wesela'?", "Stanisław Wyspiański", ["Juliusz Słowacki", "Adam Mickiewicz", "Bolesław Prus"]],
  ["Co to jest dystych?", "strofa składająca się z dwóch wersów", ["strofa czterowersowa", "słowo powtarzane w wierszu", "język archaiczny"]],
  ["Co to jest neologizm?", "nowe słowo lub wyrażenie w języku", ["przesada w słownictwie", "termin związany z literaturą", "modne wyrażenie w mowie potocznej"]],
  ["Które z dzieł napisane zostało przez Stefana Żeromskiego?", "Ludzie bezdomni", ["Chłopi", "Faraon", "Granica"]],
  ["Co to jest metafora?", "przenośne, symboliczne użycie słów", ["analogia", "złagodzenie wypowiedzi", "przemiana znaczenia wyrazu"]],
  ["Który z autorów jest związany z literaturą XX wieku?", "Czesław Miłosz", ["Adam Mickiewicz", "Józef Ignacy Kraszewski", "Henryk Sienkiewicz"]],
  ["Co to jest motyw przewodni?", "temat, który pojawia się w różnych utworach", ["krótkie streszczenie fabuły", "główna postać w książce", "styl pisania autora"]]
]);

        }
   return new teacher("---", "./pobrane.jpg", [0, 0], 50, [
  ["What is the past tense of 'go'?", "went", ["goed", "gone", "going"]],
  ["Which of the following is a synonym for 'happy'?", "joyful", ["sad", "angry", "tired"]],
  ["What is the plural form of 'child'?", "children", ["childs", "childes", "childer"]],
  ["Which word means 'a large vehicle used for transporting goods'?", "truck", ["car", "bicycle", "train"]],
  ["What is the opposite of 'cheap'?", "expensive", ["affordable", "free", "reasonable"]],
  ["Which sentence is correct?", "She has been studying for two hours.", ["She studying for two hours.", "She studyed for two hours.", "She will studying for two hours."]],
  ["Which word is a verb?", "run", ["quick", "happiness", "dog"]],
  ["What does 'to break the ice' mean?", "to start a conversation", ["to shatter glass", "to make someone laugh", "to freeze something"]],
  ["Which of the following is a question word?", "where", ["there", "yes", "really"]],
  ["Which of the following is an adjective?", "beautiful", ["run", "quickly", "happiness"]],
  ["What is the past tense of 'eat'?", "ate", ["eated", "eats", "eating"]],
  ["Which word is a preposition?", "under", ["run", "jump", "quickly"]],
  ["What is the meaning of the word 'dangerous'?", "likely to cause harm", ["safe", "secure", "fun"]],
  ["Which sentence is in the future tense?", "I will go to the store tomorrow.", ["I went to the store.", "I am going to the store.", "I was going to the store."]],
  ["What is the opposite of 'hot'?", "cold", ["warm", "burning", "spicy"]],
  ["Which of the following is a noun?", "dog", ["running", "quickly", "red"]],
  ["What is the comparative form of 'good'?", "better", ["gooder", "well", "best"]],
  ["Which sentence is in the past continuous tense?", "I was reading a book.", ["I read a book.", "I am reading a book.", "I will read a book."]],
  ["What does the word 'bizarre' mean?", "strange or unusual", ["normal", "boring", "common"]],
  ["Which of the following is an adverb?", "quickly", ["beautiful", "dog", "happiness"]],
  ["What is the opposite of 'tall'?", "short", ["high", "long", "big"]],
  ["Which of the following words is a synonym for 'difficult'?", "challenging", ["easy", "simple", "boring"]],
  ["Which of the following sentences is in the passive voice?", "The cake was eaten by Mary.", ["Mary eats the cake.", "Mary is eating the cake.", "Mary will eat the cake."]],
  ["What is the past tense of 'begin'?", "began", ["beginned", "began", "begun"]],
  ["Which of the following is a countable noun?", "apple", ["water", "music", "advice"]],
  ["What is the present continuous form of 'he speak'?", "he is speaking", ["he speaks", "he was speaking", "he speaked"]],
  ["Which word is an example of a conjunction?", "and", ["quickly", "dog", "happy"]],
  ["What does 'break a leg' mean?", "good luck", ["to injure yourself", "to perform badly", "to relax"]],
  ["Which of the following words is an antonym of 'easy'?", "difficult", ["simple", "quick", "fun"]],
  ["What is the superlative form of 'bad'?", "worst", ["worser", "badder", "more bad"]],
  ["What does 'take a rain check' mean?", "to postpone", ["to accept", "to reject", "to agree"]],
  ["Which sentence is in the present perfect tense?", "I have seen that movie.", ["I see that movie.", "I will see that movie.", "I am seeing that movie."]],
  ["What is the opposite of 'quiet'?", "loud", ["silent", "calm", "peaceful"]],
  ["Which of the following is a synonym for 'friendly'?", "kind", ["hostile", "mean", "angry"]],
  ["Which of the following is an example of a question tag?", "isn't it?", ["don't you?", "she is?", "you do?"]],
  ["What is the past participle of 'drive'?", "driven", ["drove", "drive", "driving"]],
  ["Which word is a relative pronoun?", "who", ["he", "she", "they"]],
  ["What is the meaning of 'bored'?", "feeling uninterested", ["excited", "happy", "tired"]],
  ["Which word is used to show a contrast?", "however", ["because", "and", "for"]],
  ["Which sentence is correct?", "They have been to Paris.", ["They has been to Paris.", "They are to Paris.", "They were to Paris."]],
  ["Which verb tense is used in 'I have been studying'?", "present perfect continuous", ["present continuous", "past perfect", "future continuous"]],
  ["What is the plural of 'foot'?", "feet", ["foots", "feet", "footi"]],
  ["Which of the following is a modal verb?", "can", ["run", "quickly", "sleep"]],
  ["What does 'beat around the bush' mean?", "to avoid talking about something", ["to talk directly", "to answer quickly", "to be very polite"]],
  ["What is the opposite of 'young'?", "old", ["elder", "youngest", "middle-aged"]],
  ["Which word is a synonym for 'sad'?", "unhappy", ["joyful", "excited", "cheerful"]],
  ["Which of the following sentences uses a preposition?", "She is on the bus.", ["She is running", "She is happy", "She is tall"]],
  ["What is the opposite of 'early'?", "late", ["on time", "fast", "ahead"]],
  ["Which sentence is correct?", "He hasn't finished his homework yet.", ["He finished his homework yet.", "He has finish his homework yet.", "He not finished his homework yet."]]
]);

        }
    }
}
