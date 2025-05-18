function getRandomQuestions(questions, count) {
    let shuffled = shuffle(questions);
    return shuffled.slice(0, count);
}

function fitTextToContainer(container, text, maxFontSize = 32, minFontSize = 8) {
    container.innerHTML = text;
    let fontSize = maxFontSize;
    container.style.fontSize = fontSize + 'px';

    while ((container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight) 
            && fontSize > minFontSize) {
        fontSize--;
        container.style.fontSize = fontSize + 'px';
    }
}

class teacher {
    constructor(teacherName, quizId, teacherImageName, numberOfQuestions, questions, questionCount) {
        this.teacherName = teacherName;
        this.quizId = quizId;
        this.teacherImageName = teacherImageName;
        this.numberOfQuestions = numberOfQuestions;
        this.questions = getRandomQuestions(questions, questionCount);
        this.currentQuestion = 0;
        this.sum = 0;
    }

    async loadDialogDOM() {
        let dialog = document.createElement("div");
        dialog.className = "dialog";

        let dialogImage = document.createElement("img");
        dialogImage.className = "dialog_img";
        dialogImage.src = this.teacherImageName;
        dialogImage.alt = "Nie stać nas na więcej zdjęć :("

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

    answer(id) {
        this.quizHandler(id);
    }

    async quiz(i) { //not scaling function
        let question = document.getElementById("question");
        let answer1 = document.getElementById("answer1");
        let answer2 = document.getElementById("answer2");
        let answer3 = document.getElementById("answer3");
        let answer4 = document.getElementById("answer4");

        let answers = shuffle(this.questions[i][2].concat(this.questions[i][1]));
        fitTextToContainer(question, this.questions[i][0], 100, 10);
        fitTextToContainer(answer1, answers[0], 100, 10);
        fitTextToContainer(answer2, answers[1], 100, 10);
        fitTextToContainer(answer3, answers[2], 100, 10);
        fitTextToContainer(answer4, answers[3], 100, 10);
        this.currentCorrectAnswer = answers.indexOf(this.questions[i][1]);
        console.log("Poprawna odpowiedź: ", this.currentCorrectAnswer + 1);
    }

    async quizHandler(i) {
        if (i == this.currentCorrectAnswer + 1) {
            console.log(`Dobra odpowiedź!!!! (${i})`);
            //document.getElementById("question").innerHTML = `Dobra odpowiedź`;
            //await delay(1500);
            // Wszystko się psuje
            this.sum++;
        } else {
            console.log(`Zła odpowiedź (${i})`);
            //document.getElementById("question").innerHTML = `Zła odpowiedź`;
            //await delay(1500);
        }
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.quiz(this.currentQuestion);
        } else {
            this.quizDone();
        }
    }

    async quizDone() {
        console.log("done");
        let avg = this.sum / this.questions.length * 100;
        currentPlayer().quizesDone[this.quizId] = avg;
        console.log(this.quizId, currentPlayer().quizesDone[this.quizId])
        if (avg >= 50) {
            document.getElementById("question").innerHTML = `Brawo! Zdałeś test na ${avg}%`;
        } else {
            document.getElementById("question").innerHTML = `Nie zdałeś. Twój wynik to ${avg}%`;
        }

        document.querySelector(".dialog_responses").innerHTML = "";
        await delay(2000);
        document.getElementsByClassName("dialog")[0].remove();
        await nextPlayer();
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

function qidToName(qid){
    switch(qid){
        case '2':
            return "Matura z matematyki";
        case '3':
            return "Matura z polskiego";
        case '4':
            return "Matura z angielskiego";
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return "Sprawdzian z matematyki";
        case '10':
        case '11':
        case '12':
        case '13':
        case '14':
            return "Sprawdzian z angielskiego"; 
        case '15':
        case '16':
        case '17':
        case '18':
        case '19':
            return "Sprawdzian z polskiego";
        default:
            return `Sprawdzian ${qid}`;
    }
}

function getTeacher(teacherName) {
    switch (teacherName) {
        case "debug": {
            return new teacher("Imie nauczyciela", 1, "images/pobrane.jpg", 2, [ // name, image file name, pixel position, number of questions
                ["Czy ten kod jest super?", "Tak", ["Nie", "Może", "Niezbyt"]], // question, correct answer, [wrong answers]
                ["Czy ten kod nie jest super?", "Nie", ["Tak", "Może", "Niezbyt"]]
            ], 5);
        }
        case "matura_matematyka": {
            return new teacher("---", 2, "./rzeczy na projekt/maturowy-export.png", 50, [
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
            ], 10);
        }
        case "matura_polski": {
            return new teacher("---", 3, "./rzeczy na projekt/maturowy-export.png", 50, [
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
            ], 10);
        }
        case "matura_angielski": {
            return new teacher("---", 4, "./rzeczy na projekt/maturowy-export.png", 50, [
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
            ], 10);
        }
        case "1_klasa_mat": {
            return new teacher("---", 5, "./rzeczy na projekt/matematyk.png", 21, [
                ["Ile to -3 + 7?", "4", ["10", "-10", "3"]],
                ["Pierwiastek kwadratowy z 36 to?", "6", ["9", "12", "5"]],
                ["Rozwiąż: x + 5 = 9", "4", ["5", "3", "6"]],
                ["Ile to 30% z 200?", "60", ["40", "70", "50"]],
                ["Przekształć: 2(x + 3) = ?", "2x + 6", ["2x + 3", "x + 6", "x + 3"]],
                ["Jakie jest przeciwieństwo liczby -7?", "7", ["-7", "0", "-1"]],
                ["Układ równań: x = 2, y = 3. Ile to x + y?", "5", ["6", "4", "2"]],
                ["Ile to 2^4?", "16", ["8", "32", "12"]],
                ["Która liczba nie jest liczbą pierwszą?", "9", ["11", "7", "13"]],
                ["W trójkącie suma kątów to?", "180", ["360", "90", "100"]],
                ["Ile to -8 * 2?", "-16", ["8", "16", "-8"]],
                ["Równanie: 2x = 10. x = ?", "5", ["10", "2", "20"]],
                ["Jaki to procent: 50 z 200?", "25", ["20", "50", "10"]],
                ["Pole kwadratu o boku 6?", "36", ["12", "24", "18"]],
                ["Ile to 7²?", "49", ["14", "56", "64"]],
                ["Skróć ułamek 20/100", "1/5", ["1/2", "1/10", "2/5"]],
                ["Rozwiąż nierówność: x > 3", "x = 4", ["x = 2", "x = 1", "x = 0"]],
                ["Obwód prostokąta 3x5?", "16", ["15", "12", "18"]],
                ["x + x + x = 12. x = ?", "4", ["3", "2", "6"]],
                ["Czy -7 należy do zbioru liczb całkowitych?", "Tak", ["Nie", "Zależy", "Tylko dodatnie"]],
                ["Suma kątów w czworokącie?", "360", ["180", "270", "90"]]
            ], 5);
        }

        case "2_klasa_mat": {
            return new teacher("---", 6, "./rzeczy na projekt/matematyk.png", 21, [
                ["Rozwiąż równanie kwadratowe: x² - 5x + 6 = 0", "x = 2, x = 3", ["x = 1, x = 6", "x = -1, x = -6", "x = 2, x = -3"]],
                ["Funkcja kwadratowa f(x) = x² - 4. Jakie ma pierwiastki?", "x = 2, x = -2", ["x = 1, x = -1", "x = 0, x = -4", "x = -2, x = -2"]],
                ["Średnia arytmetyczna liczb 2, 5, 7, 10", "6", ["5", "7", "8"]],
                ["Ile wynosi iloczyn wektora u = (2,3) i wektora v = (4, -1)?", "5", ["6", "2", "4"]],
                ["Pole prostokąta o bokach 5 i 8", "40", ["30", "50", "45"]],
                ["Funkcja liniowa f(x) = 2x + 3. Jaki jest jej punkt przecięcia z osią Y?", "3", ["2", "0", "-3"]],
                ["Równanie kwadratowe x² + 4x - 5 = 0. Rozwiąż", "x = -5, x = 1", ["x = -4, x = 1", "x = 5, x = -1", "x = -1, x = -5"]],
                ["Mediana liczb 1, 5, 7, 9", "6", ["5", "7", "8"]],
                ["Oblicz wartość funkcji kwadratowej f(x) = x² - 2x + 1 dla x = 3", "4", ["5", "6", "2"]],
                ["Oblicz długość wektora u = (3, 4)", "5", ["4", "6", "7"]],
                ["Oblicz pole koła o promieniu 3", "28.27", ["9.42", "12.57", "24.78"]],
                ["Rozwiąż nierówność: x² - 6x + 9 > 0", "x ≠ 3", ["x > 3", "x < 3", "x = 3"]],
                ["Szukaj funkcji odwrotnej do f(x) = 2x + 1", "f⁻¹(x) = (x - 1) / 2", ["f⁻¹(x) = 2x - 1", "f⁻¹(x) = (x + 1) / 2", "f⁻¹(x) = x / 2"]],
                ["Szukaj średnią z liczb: 10, 15, 20, 25", "17.5", ["20", "18", "22"]],
                ["Oblicz obwód prostokąta o bokach 7 i 9", "32", ["34", "31", "36"]],
                ["Funkcja liniowa f(x) = 3x - 4. Co jest współczynnikiem kierunkowym?", "3", ["-4", "2", "1"]],
                ["Oblicz pole trójkąta o podstawie 6 i wysokości 4", "12", ["24", "18", "8"]],
                ["Oblicz długość przekątnej prostokąta o bokach 3 i 4", "5", ["6", "4", "7"]],
                ["Punkty A(1, 2) i B(3, 6). Oblicz odległość między nimi", "4", ["5", "3", "6"]],
                ["Funkcja kwadratowa y = x² - 2x. Jaka jest jej wartość w punkcie x = 1?", "0", ["1", "-1", "2"]],
                ["Oblicz wartość wyrażenia 5! (silnia)", "120", ["100", "110", "130"]],
                ["Oblicz objętość sześcianu o krawędzi 4", "64", ["32", "24", "48"]]
            ], 5);
        }

        case "3_klasa_mat": {
            return new teacher("---", 7, "./rzeczy na projekt/matematyk.png", 21, [
                ["Oblicz sinus kąta 30°", "1/2", ["√3/2", "1", "√2/2"]],
                ["Oblicz cosinus kąta 60°", "1/2", ["√2/2", "1", "√3/2"]],
                ["Oblicz tangens kąta 45°", "1", ["0", "√3", "2"]],
                ["Rozwiąż układ równań: x + y = 5, x - y = 1", "x = 3, y = 2", ["x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"]],
                ["Oblicz pole trójkąta o wierzchołkach A(0, 0), B(3, 0), C(0, 4)", "6", ["12", "3", "9"]],
                ["Oblicz wartość logarytmu log₁₀(100)", "2", ["1", "3", "10"]],
                ["Rozwiąż nierówność: log₁₀(x) > 2", "x > 100", ["x > 10", "x < 100", "x > 50"]],
                ["Oblicz pole powierzchni koła o promieniu 5", "78.54", ["50", "75", "100"]],
                ["Rozwiąż równanie wykładnicze 2^x = 8", "x = 3", ["x = 2", "x = 1", "x = 4"]],
                ["Oblicz różnicę kątów α = 120°, β = 30°", "90°", ["100°", "80°", "70°"]],
                ["Jakie jest prawdopodobieństwo wyrzucenia liczby 6 na kostce do gry?", "1/6", ["1/2", "1/4", "1/3"]],
                ["Ile jest permutacji z 3 elementów?", "6", ["3", "9", "12"]],
                ["Oblicz wartość funkcji wykładniczej f(x) = 2^x dla x = 4", "16", ["8", "32", "64"]],
                ["Oblicz logarytm log₂(32)", "5", ["4", "3", "6"]],
                ["Wektory u = (3, 4) i v = (-1, 2). Oblicz iloczyn skalarny", "5", ["-2", "4", "6"]],
                ["Oblicz tangens kąta α, jeśli sin α = 1/2 i cos α = √3/2", "1/√3", ["1/2", "√3/2", "2"]],
                ["Oblicz kąt α, jeżeli tan α = 1", "45°", ["30°", "60°", "90°"]],
                ["Jakie jest prawdopodobieństwo wyciągnięcia asa z talii kart?", "1/13", ["1/52", "1/26", "1/39"]],
                ["Oblicz średnią arytmetyczną liczb: 2, 6, 8", "5.33", ["6", "5", "4"]],
                ["Ile wynosi suma kątów w trójkącie?", "180°", ["90°", "270°", "360°"]],
                ["Rozwiąż układ równań: x + 2y = 8, 2x - y = 3", "x = 2, y = 3", ["x = 4, y = 1", "x = 1, y = 4", "x = 3, y = 2"]],
                ["Rozwiąż nierówność: 2^x < 16", "x < 4", ["x > 2", "x < 3", "x = 4"]]
            ], 5);
        }

        case "4_klasa_mat": {
            return new teacher("---", 8, "./rzeczy na projekt/matematyk.png", 21, [
                ["Oblicz granicę: lim (x→∞) (3x² + 2x) / (x² - 5x)", "3", ["2", "1", "4"]],
                ["Oblicz pochodną funkcji f(x) = 5x³ - 3x²", "15x² - 6x", ["15x² - 3x", "15x³ - 6x²", "3x² - 6"]],
                ["Oblicz sumę ciągu arytmetycznego: 2 + 4 + 6 + 8", "20", ["18", "22", "24"]],
                ["Oblicz granicę: lim (x→0) (sin x) / x", "1", ["0", "∞", "2"]],
                ["Oblicz funkcję odwrotną do f(x) = 3x + 1", "f⁻¹(x) = (x - 1) / 3", ["f⁻¹(x) = (x + 1) / 3", "f⁻¹(x) = (x - 3) / 2", "f⁻¹(x) = x / 3"]],
                ["Oblicz sumę nieskończonego ciągu geometrycznego o pierwszym wyrazie 1 i ilorazie 1/2", "2", ["1", "3", "4"]],
                ["Oblicz obwód koła o promieniu 5", "31.42", ["25", "40", "35"]],
                ["Oblicz pochodną funkcji f(x) = x⁴ - 4x² + 2", "4x³ - 8x", ["3x² - 2", "4x² - 8", "3x³ - 2x"]],
                ["Oblicz wartość ciągu geometrycznego: 2, 6, 18, ... po 4 wyrazach", "162", ["54", "64", "128"]],
                ["Oblicz pole powierzchni kuli o promieniu 4", "201.06", ["100.48", "150", "220"]],
                ["Oblicz pochodną funkcji f(x) = √x", "1 / 2√x", ["√x", "x / 2", "1 / x"]],
                ["Oblicz iloczyn skalarny wektorów u = (1, 2, 3) i v = (4, 5, 6)", "32", ["30", "28", "34"]],
                ["Oblicz długość boku kwadratu, którego pole wynosi 49", "7", ["6", "5", "8"]],
                ["Oblicz funkcję odwrotną do f(x) = 2x - 3", "f⁻¹(x) = (x + 3) / 2", ["f⁻¹(x) = (x - 3) / 2", "f⁻¹(x) = x / 2", "f⁻¹(x) = (x + 2) / 2"]],
                ["Oblicz różnicę kątów w trójkącie o kątach 60°, 90° i 30°", "0°", ["30°", "60°", "90°"]],
                ["Oblicz całkę: ∫(x²) dx", "x³ / 3", ["x²", "2x", "x³"]],
                ["Oblicz granicę: lim (x→0) (1 - cos x) / x²", "0.5", ["0", "1", "2"]],
                ["Oblicz sumę nieskończonego ciągu arytmetycznego: 2 + 5 + 8 + ...", "∞", ["5", "4", "3"]],
                ["Oblicz pochodną funkcji f(x) = sin x", "cos x", ["-sin x", "tan x", "cos² x"]],
                ["Oblicz pole trapezu o podstawach 4 i 6 oraz wysokości 5", "25", ["20", "18", "22"]],
                ["Oblicz całkę: ∫(3x²) dx", "x³", ["3x²", "2x³", "x²"]],
                ["Oblicz długość przekątnej prostokąta o bokach 6 i 8", "10", ["12", "9", "11"]]
            ], 5);
        }

        case "5_klasa_mat": {
            return new teacher("---", 9, "./rzeczy na projekt/matematyk.png", 21, [
                ["Rozwiąż równanie z parametrem: x² - px + q = 0, gdzie p = 4, q = 5", "x = 1, x = 5", ["x = 2, x = 3", "x = -1, x = 6", "x = 3, x = 4"]],
                ["Dowód: Suma kątów w trójkącie wynosi 180°", "Tak", ["Nie", "Zależy", "Tylko w prostokątnych"]],
                ["Rozwiąż nierówność: x² - 6x + 8 < 0", "x ∈ (2, 4)", ["x ∈ (1, 5)", "x ∈ (-∞, 2)", "x ∈ (3, 5)"]],
                ["Oblicz wartość funkcji odwrotnej do f(x) = 5x - 3", "f⁻¹(x) = (x + 3) / 5", ["f⁻¹(x) = (x - 3) / 5", "f⁻¹(x) = (x + 3) / 2", "f⁻¹(x) = x / 5"]],
                ["Oblicz całkę: ∫(3x²) dx", "x³", ["3x²", "2x³", "x²"]],
                ["Dowód: Jeśli a = b, to a² = b²", "Tak", ["Nie", "Zależy", "Tylko dla liczb całkowitych"]],
                ["Rozwiąż równanie z parametrem: x² - 2px + q = 0, gdzie p = 3, q = 9", "x = 3, x = 3", ["x = 0, x = 6", "x = -3, x = 3", "x = 2, x = 4"]],
                ["Oblicz pochodną funkcji f(x) = x² - 2x", "2x - 2", ["2x + 2", "x² - 2", "x - 2"]],
                ["Oblicz pochodną funkcji f(x) = √x", "1 / 2√x", ["1 / x", "√x", "x"]],
                ["Rozwiąż nierówność: 3x - 2 > 5", "x > 7/3", ["x < 5/3", "x > 1", "x = 7"]],
                ["Oblicz wartość wyrażenia 7!", "5040", ["3600", "7200", "5000"]],
                ["Oblicz granicę: lim (x→∞) (3x² - 4x + 1) / (x² + 2x)", "3", ["2", "1", "4"]],
                ["Oblicz wartość funkcji wykładniczej: f(x) = 3^x dla x = 2", "9", ["6", "12", "27"]],
                ["Rozwiąż układ równań: 2x + 3y = 7, x - y = 4", "x = 5, y = 1", ["x = 4, y = 2", "x = 3, y = 2", "x = 6, y = 1"]],
                ["Rozwiąż nierówność: x² - 4x - 5 > 0", "x < -1 lub x > 5", ["x < -5 lub x > 1", "x < 0 lub x > 4", "x < -2 lub x > 3"]],
                ["Oblicz pochodną funkcji f(x) = 4x³ - 5x²", "12x² - 10x", ["12x² - 5", "10x² - 4", "4x³ - 5"]],
                ["Oblicz pole powierzchni bocznej stożka o promieniu 3 i wysokości 4", "36π", ["18π", "12π", "24π"]],
                ["Oblicz granicę: lim (x→0) (x³ - 3x²) / x", "0", ["-3", "3", "1"]],
                ["Oblicz wartość funkcji logarytmicznej log₃(27)", "3", ["2", "4", "5"]],
                ["Oblicz pole powierzchni stożka o promieniu 6 i wysokości 8", "108π", ["80π", "90π", "100π"]],
                ["Oblicz całkę: ∫(x³ - 4x) dx", "x⁴ / 4 - 2x²", ["x³ / 3 - 2x", "x⁴ - 4x²", "x² - 2x"]],
                ["Rozwiąż nierówność: x² + 3x - 4 > 0", "x < -4 lub x > 1", ["x < -1 lub x > 4", "x < 2 lub x > 5", "x < -3 lub x > 2"]],
            ], 5);
        }
        case "1_klasa_ang": {
            return new teacher("---", 10, "./rzeczy na projekt/anglistka.png", 21, [
                ["How do you say 'dzień dobry' in English?", "Good morning", ["Hello", "Good evening", "Good afternoon"]],
                ["What is the opposite of 'big'?", "small", ["large", "huge", "tiny"]],
                ["Translate: 'Jestem zmęczony.'", "I am tired", ["I am sleepy", "I am fine", "I am happy"]],
                ["What is the plural form of 'child'?", "children", ["childs", "childes", "children's"]],
                ["What is the past tense of 'go'?", "went", ["goes", "going", "gone"]],
                ["Translate: 'Gdzie jest najbliższy sklep?'", "Where is the nearest shop?", ["Where is the nearest store?", "Where is the closest shop?", "Where are the nearest shops?"]],
                ["Which word is a verb?", "run", ["book", "car", "table"]],
                ["What is the opposite of 'happy'?", "sad", ["joyful", "angry", "excited"]],
                ["What do we call the place where you can borrow books?", "library", ["bookstore", "museum", "park"]],
                ["How do you say 'dziękuję' in English?", "thank you", ["please", "sorry", "goodbye"]],
                ["What is the past tense of 'eat'?", "ate", ["eats", "eaten", "eating"]],
                ["Translate: 'Lubię podróże.'", "I like travelling", ["I like trips", "I like to travel", "I like journey"]],
                ["Which of these is a question word?", "where", ["fast", "book", "quickly"]],
                ["How do you say 'kiedy?' in English?", "when", ["where", "why", "who"]],
                ["What is the opposite of 'short'?", "long", ["tall", "high", "wide"]],
                ["How do you say 'dzień' in English?", "day", ["night", "morning", "evening"]],
                ["What is the comparative form of 'good'?", "better", ["best", "more good", "well"]],
                ["What is the opposite of 'old'?", "young", ["new", "young", "fresh"]],
                ["Translate: 'Czy możesz mi pomóc?'", "Can you help me?", ["Can you assist me?", "Could you help me?", "Do you help me?"]],
                ["What is the future form of 'I am'?", "I will be", ["I am being", "I will being", "I be"]],
                ["Which word is an adjective?", "beautiful", ["quick", "quickly", "run"]],
                ["What do you call the device you use to talk to people far away?", "phone", ["laptop", "television", "radio"]]
            ], 5);
        }
        case "2_klasa_ang": {
            return new teacher("---", 11, "./rzeczy na projekt/anglistka.png", 21, [
                ["What is the past tense of 'run'?", "ran", ["runned", "runed", "ran"]],
                ["Translate: 'Ona ma dwa koty.'", "She has two cats", ["She have two cats", "She has cat two", "She have two cat"]],
                ["Which of these is a preposition?", "on", ["quick", "tall", "happy"]],
                ["What does 'busy' mean?", "occupied", ["tired", "happy", "sad"]],
                ["How do you say 'na pewno' in English?", "for sure", ["maybe", "probably", "definitely"]],
                ["Translate: 'Będę w pracy o 9.'", "I will be at work at 9", ["I will be at work on 9", "I will work at 9", "I will work in 9"]],
                ["What is the opposite of 'dark'?", "light", ["bright", "clear", "white"]],
                ["What is the plural of 'city'?", "cities", ["citys", "citieses", "citi"]],
                ["What does 'exciting' mean?", "thrilling", ["boring", "sad", "happy"]],
                ["Translate: 'Czy masz czas?'", "Do you have time?", ["Have you time?", "You have time?", "Do have time?"]],
                ["What is the present tense of 'be' for 'they'?", "are", ["am", "is", "be"]],
                ["How do you say 'po angielsku'?", "in English", ["by English", "on English", "with English"]],
                ["Which sentence is correct?", "She is reading a book", ["She reading a book", "She reads a book", "She book reading"]],
                ["What is the opposite of 'strong'?", "weak", ["weakly", "stronger", "strength"]],
                ["Translate: 'Zawsze jeżdżę do szkoły autobusem.'", "I always go to school by bus", ["I always go to school in bus", "I always go school by bus", "Always I go to school by bus"]],
                ["What is the comparative form of 'bad'?", "worse", ["worst", "more bad", "badder"]],
                ["What is the past tense of 'drink'?", "drank", ["drunk", "drinks", "drinking"]],
                ["Which is correct?", "She plays the piano", ["She play piano", "She played the piano", "She is playing piano"]],
                ["What does 'expensive' mean?", "costing a lot", ["cheap", "free", "valuable"]],
                ["Translate: 'Gdzie jest łazienka?'", "Where is the bathroom?", ["Where is toilet?", "Where bathroom is?", "Where's bathroom?"]],
                ["Which of these is an adverb?", "quickly", ["quick", "quickness", "quicker"]],
                ["How do you say 'bardzo dziękuję' in English?", "Thank you very much", ["Thank very you much", "Thank you so much", "Much thank you"]]
            ], 5);
        }
        case "3_klasa_ang": {
            return new teacher("---", 12, "./rzeczy na projekt/anglistka.png", 21, [
                ["What is the past tense of 'write'?", "wrote", ["written", "writing", "wrote"]],
                ["Translate: 'Mamy dużą kuchnię.'", "We have a big kitchen", ["We has a big kitchen", "We have big kitchen", "We has big kitchen"]],
                ["Which sentence is correct?", "I don't like fish", ["I doesn't like fish", "I like don't fish", "I like no fish"]],
                ["What is the opposite of 'cheap'?", "expensive", ["affordable", "costly", "luxurious"]],
                ["Translate: 'Chciałbym kawę.'", "I would like coffee", ["I want coffee", "I like coffee", "I would like a coffee"]],
                ["What is the plural of 'man'?", "men", ["mans", "men's", "man"]],
                ["What is the correct word to fill the gap: 'She _____ to the gym every day.'", "goes", ["going", "go", "gone"]],
                ["What is the superlative form of 'good'?", "best", ["better", "goodest", "well"]],
                ["Which word is a conjunction?", "and", ["but", "beautiful", "quickly"]],
                ["What is the correct form of 'be' for 'he' in the present tense?", "is", ["am", "are", "be"]],
                ["Translate: 'Chciałbym ci pomóc.'", "I would like to help you", ["I like to help you", "I want help you", "I would help you"]],
                ["What is the past tense of 'sing'?", "sang", ["sung", "singed", "sang"]],
                ["Translate: 'To jest moje ulubione miejsce.'", "This is my favourite place", ["This my favourite place is", "My favourite is this place", "This favourite place is my"]],
                ["What is the opposite of 'wet'?", "dry", ["drier", "wetter", "dryest"]],
                ["How do you say 'moje imię to...'?", "My name is...", ["I name is...", "My name...", "Name is my..."]],
                ["Translate: 'Mam 20 lat.'", "I am 20 years old", ["I have 20 years", "I am 20 years", "20 years I am"]],
                ["Which word is a noun?", "car", ["run", "quickly", "beautiful"]],
                ["How do you say 'jestem głodny'?", "I am hungry", ["I hungry", "I be hungry", "Hungry I am"]],
                ["What is the correct order of the words: 'the / movie / exciting / was / really'?", "The movie was really exciting", ["The really exciting movie was", "Exciting movie was the really", "The was really movie exciting"]],
                ["Translate: 'Będę czekać na ciebie.'", "I will wait for you", ["I will be waiting for you", "I wait for you", "I will be wait for you"]],
                ["Which sentence is correct?", "She is reading a book", ["She read book", "She reads a book", "She reading book"]],
                ["What is the opposite of 'rich'?", "poor", ["wealthy", "poorly", "moneyless"]]
            ], 5);

        }
        case "4_klasa_ang": {
            return new teacher("---", 13, "./rzeczy na projekt/anglistka.png", 21, [
                ["What is the plural of 'child'?", "children", ["childs", "children's", "childes"]],
                ["Translate: 'On ma psa.'", "He has a dog", ["He have a dog", "He has dogs", "He has a doggy"]],
                ["Which of these is an adjective?", "happy", ["joy", "happiness", "happily"]],
                ["How do you say 'skąd pochodzisz?' in English?", "Where are you from?", ["Where from you are?", "Are you from where?", "Where you are from?"]],
                ["Translate: 'Gdzie jest najbliższy sklep?'", "Where is the nearest shop?", ["Where nearest shop is?", "Where is nearest shop?", "Where nearest is shop?"]],
                ["What is the past tense of 'see'?", "saw", ["seen", "sawing", "sawed"]],
                ["Translate: 'Jestem zmęczony.'", "I am tired", ["I tired", "I am sleepy", "I am tiredly"]],
                ["What does 'kind' mean?", "helpful", ["unfriendly", "angry", "sad"]],
                ["How do you say 'nie wiem' in English?", "I don't know", ["I not know", "I know not", "Not know I"]],
                ["What is the plural of 'fox'?", "foxes", ["foxs", "foxes'", "foxes"]],
                ["Translate: 'Jestem z Polski.'", "I am from Poland", ["I from Poland am", "From Poland I am", "Poland I am from"]],
                ["What is the comparative form of 'bad'?", "worse", ["badder", "worser", "worst"]],
                ["What is the past tense of 'take'?", "took", ["taken", "take", "tooked"]],
                ["Translate: 'Mam na imię Anna.'", "My name is Anna", ["My Anna name is", "Anna is my name", "My name Anna is"]],
                ["What is the superlative form of 'fast'?", "fastest", ["faster", "fast", "fastest"]],
                ["What is the opposite of 'new'?", "old", ["newest", "younger", "modern"]],
                ["What is the past tense of 'go'?", "went", ["goes", "going", "gone"]],
                ["Which word is a preposition?", "under", ["quick", "tall", "fast"]],
                ["How do you say 'szkoła' in English?", "school", ["book", "class", "teacher"]],
                ["Translate: 'Czy możesz mi pomóc?'", "Can you help me?", ["Can help you me?", "You help can me?", "You can help me?"]],
                ["What is the opposite of 'tall'?", "short", ["small", "big", "wide"]],
                ["How do you say 'gdzie mieszkasz?' in English?", "Where do you live?", ["Where are you live?", "Where you live?", "Where live you?"]]
            ], 5);

        }
        case "5_klasa_ang": {
            return new teacher("---", 14, "./rzeczy na projekt/anglistka.png", 21, [
                ["What is the past tense of 'begin'?", "began", ["begined", "began", "beganed"]],
                ["Translate: 'Dziś jest piękna pogoda.'", "The weather is beautiful today", ["Today weather is beautiful", "Beautiful is the weather today", "Today is beautiful weather"]],
                ["How do you say 'na pewno' in English?", "for sure", ["maybe", "probably", "certainly"]],
                ["Which is the correct sentence?", "She is studying English", ["She studies English", "She studying English", "She study English"]],
                ["What is the plural of 'foot'?", "feet", ["foots", "feet's", "footes"]],
                ["Translate: 'On ma 30 lat.'", "He is 30 years old", ["He has 30 years old", "He 30 years is old", "He is old 30 years"]],
                ["What is the opposite of 'strong'?", "weak", ["weakly", "strength", "strengthened"]],
                ["Translate: 'Lubię oglądać filmy.'", "I like watching movies", ["I like watch movies", "I like to watch movie", "I watch movies like"]],
                ["Which of these is a verb?", "jump", ["book", "dog", "quickly"]],
                ["What does 'brave' mean?", "courageous", ["timid", "scared", "fearful"]],
                ["How do you say 'mam nadzieję, że' in English?", "I hope that", ["I hope", "I hope to", "I hope so"]],
                ["What is the past tense of 'catch'?", "caught", ["catchen", "caught", "catches"]],
                ["Translate: 'Jestem bardzo szczęśliwy.'", "I am very happy", ["I very happy am", "I am happy very", "Happy I am very"]],
                ["What is the opposite of 'slow'?", "fast", ["quick", "speedy", "swift"]],
                ["How do you say 'to jest moje marzenie' in English?", "This is my dream", ["This my dream is", "This dream is mine", "My dream is this"]],
                ["What is the superlative form of 'high'?", "highest", ["higher", "high", "highest"]],
                ["Which sentence is correct?", "They are playing football", ["They playing football", "They play football", "They football play"]],
                ["What does 'silent' mean?", "quiet", ["noisy", "loud", "buzzy"]],
                ["Translate: 'To było bardzo trudne.'", "That was very difficult", ["That very was difficult", "That was difficult very", "It was very hard"]],
                ["What is the opposite of 'happy'?", "sad", ["joyful", "content", "excited"]],
                ["Which word is a conjunction?", "but", ["and", "run", "quickly"]],
                ["Translate: 'Będę czekać na ciebie.'", "I will wait for you", ["I wait for you", "I will wait you", "I will be waiting for you"]]
            ], 5);
        }
        case "1_klasa_pol": {
            return new teacher("---", 15, "./rzeczy na projekt/polonista.png", 21, [
                ["Kto napisał „Pana Tadeusza”?", "Adam Mickiewicz", ["Juliusz Słowacki", "Zygmunt Krasiński", "Bolesław Prus"]],
                ["Co to jest liryka?", "Rodzaj literacki", ["Epika", "Dramat", "Proza"]],
                ["Jakie cechy ma bohater romantyczny?", "Poczucie buntu, indywidualizm", ["Moralność, porządek", "Zgodność z tradycją", "Skrucha, pokora"]],
                ["Która z postaci jest bohaterem „Pana Tadeusza”?", "Tadeusz Soplica", ["Jacek Soplica", "Stolnik", "Mickiewicz"]],
                ["Czym charakteryzuje się ballada?", "Połączeniem elementów epiki, liryki i dramatu ", ["Epos", "Powieść", "Tragedia"]],
                ["W którym roku powstał „Pan Tadeusz”?", "1834", ["1822", "1842", "1830"]],
                ["Co to jest metafora?", "Zamiana znaczeń słów", ["Porównanie", "Symbol", "Ironia"]],
                ["Kto napisał „Zbrodnię i karę”?", "Fiodor Dostojewski", ["Leo Tolstoj", "Charles Dickens", "Ernest Hemingway"]],
                ["Kiedy powstała literatura średniowieczna?", "V-XV w.", ["XVI-XVIII w.", "XIX-XX w.", "IV-VI w."]],
                ["Czym jest sonet?", "Forma wiersza o 14 wersach", ["Epopeja", "Poezja", "Proza"]],
                ["Co to jest przenośnia?", "Zastosowanie wyrazu w innym niż dosłowne znaczeniu", ["Porównanie", "Epitet", "Aliteracja"]],
                ["Kto był autorem „Lalki”?", "Bolesław Prus", ["Henryk Sienkiewicz", "Marek Twaina", "Władysław Reymont"]],
                ["Jakie cechy posiada bohater klasyczny?", "Harmonia, równowaga", ["Bunt, indywidualizm", "Odwaga, brawura", "Złośliwość, egoizm"]],
                ["Co to jest alegoria?", "Ukryte znaczenie symboliczne", ["Metafora", "Porównanie", "Symbol"]],
                ["Gdzie rozgrywa się akcja „Pana Tadeusza”?", "Na Litwie", ["W Polsce", "W Czechach", "Na Ukrainie"]],
                ["Co oznacza pojęcie „eksponowanie” w literaturze?", "Podkreślenie ważności elementu", ["Ukrycie wątku", "Przedstawienie z drugiego planu", "Zamaskowanie tematu"]],
                ["W jakim okresie powstał romantyzm?", "XIX w.", ["XVII w.", "XVIII w.", "XVI w."]],
                ["Czym jest metonimia?", "Zastąpienie wyrazu innym o podobnym znaczeniu", ["Synonim", "Antyteza", "Aluzja"]],
                ["Co to jest antyteza?", "Zestawienie przeciwstawnych pojęć", ["Metafora", "Parabola", "Porównanie"]],
                ["Która z postaci jest bohaterem „Zbrodni i kary”?", "Rodion Raskolnikow", ["Dmitrij Karamazow", "Wojciech Sienkiewicz", "Andriej Karamazow"]],
                ["Co to jest eufemizm?", "Złagodzenie wyrazu", ["Wykrzyknienie", "Pytanie retoryczne", "Skróty"]],
                ["Jaki jest temat „Dziadów” cz. II?", "Śmierć i życie po śmierci", ["Miłość", "Bunt społeczny", "Przemiany historyczne"]]
            ], 5);
        }
        case "2_klasa_pol": {
            return new teacher("---", 16, "./rzeczy na projekt/polonista.png", 21, [
                ["Kto napisał „Chłopów”?", "Władysław Reymont", ["Bolesław Prus", "Maria Konopnicka", "Józef Ignacy Kraszewski"]],
                ["Co to jest epika?", "Rodzaj literacki przedstawiający wydarzenia", ["Dramat", "Liryka", "Epos"]],
                ["Co to jest nowelistyka?", "Pisanie krótkich powieści", ["Opowiadanie", "Powieść", "Szkic"]],
                ["Co oznacza pojęcie „groteska”?", "Przesadny, karykaturalny sposób przedstawienia", ["Tragedia", "Dramat", "Tragikomedia"]],
                ["Kto napisał „Sklepy cynamonowe”?", "Bruno Schulz", ["Jerzy Andrzejewski", "Tadeusz Różewicz", "Stefan Żeromski"]],
                ["Kto napisał „Ferdydurke”?", "Witold Gombrowicz", ["Andrzej Stasiuk", "Jerzy Pilch", "Kazimierz Brandys"]],
                ["Kto jest autorem „Wesela”?", "Stanisław Wyspiański", ["Juliusz Słowacki", "Adam Mickiewicz", "Zygmunt Krasiński"]],
                ["Czym jest parodia?", "Naśladownictwo w celu wyśmiania", ["Ironia", "Aluzja", "Analogia"]],
                ["Jakie cechy ma literatura baroku?", "Dążenie do przepychu, kontrast", ["Skrótowość, surowość", "Sielankowość, harmonia", "Przeciętność, prostota"]],
                ["W którym okresie powstał romantyzm?", "XIX w.", ["XVII w.", "XVI w.", "XVIII w."]],
                ["Kto napisał „Pan Tadeusz”?", "Adam Mickiewicz", ["Henryk Sienkiewicz", "Bolesław Prus", "Juliusz Słowacki"]],
                ["Co to jest apostrofa?", "Zwrócenie się do nieobecnej osoby lub przedmiotu", ["Porównanie", "Metafora", "Rym"]],
                ["Co to jest personifikacja?", "Nadanie cech ludzkich rzeczom martwym", ["Aliteracja", "Anagram", "Wykrzyknienie"]],
                ["Co to jest oksymoron?", "Zestawienie dwóch sprzecznych pojęć", ["Hiperbola", "Litota", "Przenośnia"]],
                ["Co to jest hiperbola?", "Przesadne wyolbrzymienie", ["Przeciwieństwo", "Przesada", "Uproszczenie"]],
                ["Co to jest retrospekcja?", "Powrócenie do wcześniejszych wydarzeń", ["Klimaks", "Skrócenie", "Opis postaci"]],
                ["W którym okresie powstała literatura romantyzmu?", "XIX w.", ["XVII w.", "XVI w.", "XVIII w."]],
                ["Co to jest symbol?", "Znaczenie ukryte w tekście", ["Porównanie", "Opis", "Przenośnia"]],
                ["Kto napisał „Śluby panieńskie”?", "Aleksander Fredro", ["Juliusz Słowacki", "Zygmunt Krasiński", "Adam Mickiewicz"]],
                ["Co to jest monolog?", "Wypowiedź jednej osoby", ["Dialog", "Scena", "Opis"]],
                ["Co to jest wiersz biały?", "Wiersz bez rymów", ["Wiersz zwrotkowy", "Wiersz regularny", "Wiersz wolny"]],
                ["Co to jest onomatopeja?", "Wyraz dźwiękonaśladowczy", ["Synonim", "Antyteza", "Alegoria"]],
            ], 5);
        }
        case "3_klasa_pol": {
            return new teacher("---", 17, "./rzeczy na projekt/polonista.png", 21, [
                ["Kto napisał „Zbrodnię i karę”?", "Fiodor Dostojewski", ["Bolesław Prus", "Maria Dąbrowska", "Marek Hłasko"]],
                ["Co to jest narracja?", "Sposób przedstawienia wydarzeń w tekście", ["Opis", "Dialog", "Monolog"]],
                ["Co to jest wiersz liryczny?", "Wiersz wyrażający uczucia autora", ["Epos", "Powieść", "Drama"]],
                ["Kto napisał „Mistrza i Małgorzatę”?", "Michał Bułhakow", ["Władysław Reymont", "Witold Gombrowicz", "Bolesław Prus"]],
                ["Czym jest esej?", "Forma wypowiedzi literackiej o charakterze rozważań", ["Powieść", "Szkic", "Opowiadanie"]],
                ["Co to jest antologia?", "Zbiór utworów literackich", ["Powieść", "Esencja", "Słownik"]],
                ["Co to jest tragedia?", "Dramat o tematyce tragicznej", ["Komedia", "Monodram", "Epos"]],
                ["W jakiej epoce powstała „Iliada”?", "Starożytność", ["Renesans", "Barok", "Romantyzm"]],
                ["Kto jest autorem „Wielkiego Gatsby'ego”?", "F. Scott Fitzgerald", ["Hemingway", "John Steinbeck", "George Orwell"]],
                ["Co to jest liryka?", "Rodzaj literacki wyrażający uczucia autora", ["Epika", "Proza", "Dramat"]],
                ["Co to jest postać tragiczna?", "Bohater, który nie unika tragedii", ["Bohater komiczny", "Bohater romantyczny", "Bohater epicki"]],
                ["Co to jest ideał?", "Wzór doskonałości", ["Fikcja", "Przeciwieństwo", "Symbol"]],
                ["Co to jest anafora?", "Powtarzanie słów na początku wersów", ["Metafora", "Porównanie", "Rym"]],
                ["Co to jest personifikacja?", "Nadanie cech ludzkich rzeczom martwym", ["Aliteracja", "Anagram", "Wykrzyknienie"]],
                ["Co to jest oksymoron?", "Zestawienie dwóch sprzecznych pojęć", ["Hiperbola", "Litota", "Przenośnia"]],
                ["Co to jest retrospekcja?", "Powrócenie do wcześniejszych wydarzeń", ["Klimaks", "Skrócenie", "Opis postaci"]],
                ["W którym okresie powstała literatura romantyzmu?", "XIX w.", ["XVII w.", "XVI w.", "XVIII w."]],
                ["Co to jest symbol?", "Znaczenie ukryte w tekście", ["Porównanie", "Opis", "Przenośnia"]],
                ["Kto napisał „Cierpień młodego Wertera”?", "Johann Wolfgang von Goethe", ["Bolesław Prus", "Stefan Żeromski", "Adam Mickiewicz"]],
                ["Co to jest analiza literacka?", "Dokładne badanie tekstu pod względem struktury", ["Interpretacja", "Wspomnienie", "Komentarz"]],
                ["Czym jest ekspozycja w dramacie?", "Wstępne przedstawienie sytuacji i postaci", ["Klimaks", "Finał", "Zakończenie"]],
                ["Co to jest impresjonizm?", "Styl artystyczny skupiający się na wrażeniu", ["Realizm", "Barok", "Romantyzm"]]
            ], 5);
        }
        case "4_klasa_pol": {
            return new teacher("---", 18, "./rzeczy na projekt/polonista.png", 21, [
                ["Co to jest synonim?", "Wyraz o podobnym znaczeniu", ["Antyteza", "Przeciwieństwo", "Hiperbola"]],
                ["Kto napisał „Krzyżaków”?", "Henryk Sienkiewicz", ["Zygmunt Krasiński", "Adam Mickiewicz", "Bolesław Prus"]],
                ["Co to jest alegoria?", "Przedstawienie pojęć przez obrazy", ["Metafora", "Symbole", "Porównanie"]],
                ["W jakiej epoce powstała „Antygona”?", "Starożytność", ["Renesans", "Romantyzm", "Barok"]],
                ["Co to jest język potoczny?", "Język codzienny, nieformalny", ["Język literacki", "Język naukowy", "Język urzędowy"]],
                ["Co to jest metafora?", "Przenośnia, wyraz w innym znaczeniu", ["Alegoria", "Porównanie", "Synonim"]],
                ["Co to jest aliteracja?", "Powtarzanie tych samych dźwięków", ["Anafora", "Rym", "Onomatopeja"]],
                ["Co to jest narracja?", "Sposób przedstawienia wydarzeń w tekście", ["Opis", "Dialog", "Monolog"]],
                ["Co to jest anafora?", "Powtarzanie słów na początku wersów", ["Hiperbola", "Porównanie", "Rym"]],
                ["Co to jest sonet?", "Forma wiersza o 14 wersach", ["Epopeja", "Liryka", "Powieść"]],
                ["Co to jest wiersz wolny?", "Wiersz bez ustalonej liczby sylab i rymów", ["Wiersz regularny", "Sonet", "Ballada"]],
                ["Co to jest eufemizm?", "Łagodzenie znaczenia słowa", ["Synonim", "Alegoria", "Antyteza"]],
                ["Co to jest epifora?", "Powtarzanie słów na końcu wersów", ["Metafora", "Aliteracja", "Anafora"]],
                ["Kto napisał „Lalkę”?", "Bolesław Prus", ["Henryk Sienkiewicz", "Józef Ignacy Kraszewski", "Maria Konopnicka"]],
                ["Co to jest okolicznik?", "Część mowy określająca okoliczności akcji", ["Przydawka", "Orzeczenie", "Podmiot"]],
                ["Co to jest wykrzyknienie?", "Wyraz wyrażający emocje", ["Pytanie", "Czasownik", "Rzeczownik"]],
                ["Kto jest autorem „Dziadów”?", "Adam Mickiewicz", ["Juliusz Słowacki", "Stanisław Wyspiański", "Zygmunt Krasiński"]],
                ["Co to jest realizm?", "Styl literacki wiernie przedstawiający rzeczywistość", ["Romantyzm", "Impresjonizm", "Symbolizm"]],
                ["Co to jest parabol?", "Opowieść z morałem", ["Ballada", "Sonet", "Epos"]],
                ["Kto napisał „Opowiadania”?", "Anton Czechow", ["Bolesław Prus", "Fiodor Dostojewski", "Ernest Hemingway"]],
                ["Co to jest romantyzm?", "Epoka literacka z charakterystycznym indywidualizmem", ["Barok", "Realizm", "Renesans"]],
                ["Co to jest wiersz biały?", "Wiersz bez rymów", ["Wiersz wolny", "Sonet", "Elegia"]]
            ], 5);


        }
        case "5_klasa_pol": {
            return new teacher("---", 19, "./rzeczy na projekt/polonista.png", 21, [
                ["Co to jest poezja?", "Literatura wierszowana wyrażająca uczucia", ["Proza", "Epika", "Dramat"]],
                ["Kto napisał „Iliadę”?", "Homer", ["Wergiliusz", "Horacy", "Sofokles"]],
                ["Co to jest epoka?", "Okres w historii literatury", ["Postać", "Gatunek", "Styl"]],
                ["Co to jest analiza literacka?", "Dokładne badanie tekstu literackiego", ["Interpretacja", "Krytyka", "Ocena"]],
                ["Kto napisał „Boską komedię”?", "Dante Alighieri", ["Homer", "William Shakespeare", "Johann Wolfgang von Goethe"]],
                ["Co to jest dygresja?", "Wtrącenie do głównego wątku", ["Alegoria", "Personifikacja", "Opis"]],
                ["Co to jest historia?", "Opis przeszłości ludzi i wydarzeń", ["Nowela", "Opowiadanie", "Powieść"]],
                ["Kto napisał „Romeo i Julię”?", "William Shakespeare", ["Henrik Ibsen", "Friedrich Schiller", "Eugène Ionesco"]],
                ["Co to jest dramat?", "Rodzaj literacki z dialogami", ["Powieść", "Liryka", "Proza"]],
                ["Co to jest ekspozycja w dramacie?", "Przedstawienie sytuacji początkowej", ["Klimaks", "Finał", "Zakończenie"]],
                ["Co to jest anegdota?", "Krótka, zabawna opowieść", ["Opowiadanie", "Opis", "Rozprawka"]],
                ["Co to jest peryfraza?", "Określenie zastępujące nazwę", ["Metafora", "Alegoria", "Porównanie"]],
                ["Co to jest kontekst?", "Sytuacja, w jakiej umieszczony jest tekst", ["Treść", "Forma", "Fabuła"]],
                ["Co to jest romantyzm?", "Epoka charakteryzująca się indywidualizmem", ["Barok", "Renesans", "Oświecenie"]],
                ["Co to jest drama?", "Utór literacki pisany w dialogach", ["Proza", "Powieść", "Epos"]],
                ["Co to jest komedia?", "Dramat o tematyce humorystycznej", ["Tragedia", "Monodram", "Opera"]],
                ["Co to jest ironia?", "Odmienne znaczenie słów", ["Alegoria", "Porównanie", "Przenośnia"]],
                ["Co to jest puenta?", "Zaskakujące zakończenie utworu", ["Wstęp", "Klimaks", "Rozwinięcie"]],
                ["Co to jest biblizmy?", "Elementy języka biblijnego", ["Alegorie", "Aliteracje", "Przenośnie"]],
                ["Co to jest komizm?", "Śmieszność w sztuce", ["Tragizm", "Epika", "Aluzja"]],
                ["Co to jest patos?", "Wzniosłość, podniosłość w wyrazie", ["Karykatura", "Realizm", "Skróty"]],
                ["Co to jest elegia?", "Wiersz o smutnym, żałobnym charakterze", ["Ballada", "Sonet", "Hymn"]]
            ], 5);
        }
    }
}

