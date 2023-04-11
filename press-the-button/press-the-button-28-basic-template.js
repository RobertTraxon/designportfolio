var TwinklGame = TwinklGame || {};

(function (TwinklGame, manifest) {


    //CHANGE FONT SIZE ------------------------------------------------------------------------------------------------------------------------

    var theWidth,
        minWidth = 1184,
        screenIsSmall = true,
        isFullscreen = false,

        fontArr = [
            {element:'.title-text', size_sm:'13vw', size_lg: '125px'},
            {element:'.font-button', size_sm:'4vw', size_lg: '58px'},
            {element:'.sub-heading', size_sm:'3vw', size_lg: '48px'},
            {element:'.jodal-title', size_sm:'5vw', size_lg: '65px'},
            {element:'.jodal-text', size_sm:'2.6vw', size_lg: '25px'},
            {element:'.text-button', size_sm:'3vw', size_lg: '35px'},
        ];

    function resizeScreen(){

        theWidth = $('body').width();
        var smallDisplay = true;

        theWidth >= minWidth && (smallDisplay = false);
        isFullscreen && (smallDisplay = true);

        if (smallDisplay != screenIsSmall) {
            screenIsSmall = !screenIsSmall;
            $.each(fontArr, function(key, value){
                var newSize = smallDisplay ? value.size_sm : value.size_lg;
                $(value.element).css('font-size', newSize);
            });
        }

        //ADD IN ANYTHING ELSE THAT NEEDS TO RESPOND DIFFERENTLY(CIRCLE BUTTONS ETC)
    }

    //AUDIO SAMPLES----------------------------------------------------------------------------------------------------------------------------------------------






    //------------------------------------------------------------------------------------------------------------------------------------------------------------

    TwinklGame.setup = function (config) {


        var buttonClickAudio = new Howl({src: [audioTest('button_click_audio','buttonClick')]}),
            correctAnswerSoundAudio = new Howl({src: [audioTest('correct_audio','correctAnswerSound')]}),
            wrongAnswerAudio = new Howl({src: [audioTest('wrong_audio','wrongAnswer')]}),
            swooshAudio = new Howl({src: [audioTest('swoosh_audio','swoosh')]}),
            countdown = new Howl({src: [manifest.countdown.src]}),
            menuMusic = new Howl({src: [manifest.menuMusic.src],loop:true,volume:0.5,rate:1}),
            multiplier = new Howl({src: [audioTest('power_up_audio','multiplier')]}),
            highScore = new Howl({src: [audioTest('end_game_audio','highScore')]}),
            powerDown = new Howl({src: [audioTest('power_down_audio','powerDown')]}),
            hitTen = new Howl({src: [audioTest('hit_ten_audio','hitTen')]}),
            settingsOpen = new Howl({src: [audioTest('hit_ten_audio','settingsOpen')]}),
            gameStart = new Howl({src: [manifest.startGame.src]});

        var sfx = [settingsOpen,gameStart,powerDown,hitTen,buttonClickAudio,correctAnswerSoundAudio,wrongAnswerAudio,swooshAudio,countdown,highScore]

        var backMusic

        if(
            config.background_music && config.background_music.assetUrl.length
        ){
            backMusic = new Howl({src: [config.background_music.assetUrl],loop:true,volume:0.5,rate:1})

        }

        function audioTest (conf,mani){

            if(config[conf] && config[conf].assetUrl.length>0){
                return config[conf].assetUrl
            }else{
                return manifest[mani].src
            }
        }


        resizeScreen();

        $(window).resize(resizeScreen);
        $(window).resize(textResize);

        // VARIABLES-----------------------------------------------------------------------------------------------------------------------------------------------

        var wholeDocument = $("#container"),
            foregroundCont = $(".foreground-container"),
            allPages = $(".pages"),
            titlePage = $("#titlePage"),
            instructionsPage = $("#instructionsPage"),
            mainPage = $("#mainPage"),
            soundToggle = $(".sound-toggle"),
            navBar = $(".go-nav-panel"),
            fullScreen = $("#fullscreen-button"),
            titleText = $("#title"),
            subHeading = $("#subContainer"),
            introTitle = $(".intro-title"),
            allInstructions = $(".allInstructions"),
            closeButton = $("#close-button"),
            letsGo = $("#lets-go-button"),
            playButton = $("#playButton"),
            instructionsPanel = $("#instructionsPanel"),
            menuPage = $('#menuPage');


        //SETUP BACKGROUND IMAGE & ALL TEXT------------------------------------------------------------------------------------------------------------------------

        wholeDocument.css({ "background-image": "url(" + config.background_image_url.assetUrl + ")" });


        wholeDocument.addClass('interactive-theme-' + config.theme_colour);
        wholeDocument.css({"background-image": "url(" + config.background_image_url.assetUrl + ")"});
        $(".main-page-panel").css({"background-image": "url(" + config.wood_background.assetUrl + ")"});
        $("#mainPage").css({"background-image": "url(" + config.game_background.assetUrl + ")"});
        $("#menuPage").css({"background-image": "url(" + config.game_background.assetUrl + ")"});
        $(".foreground-container").css({"background-image": "url(" + config.foreground_image_url.assetUrl + ")"});


        titleText.html(config.title);  testFontSize(titleText,180); textResize();
        subHeading.text(config.sub_title);
        introTitle.text(config.intro_title);
        allInstructions.text(config.intro_text);
        $(".fit-me-button").text(config.lets_go_text);
        $("#playButton").text(config.play_button_text);
        $("#play-again").text(config.play_again_button_text);

        $("#isItCorrect").text(config.well_done_title);
        $("#answerWasText").text(config.total_score_text);

        $(".text-score").text(config.score_text);
        $(".text-timer").text(config.timer_text);



        $(".intro-title").text(config.intro_title);




        $(".time-limit-text").text(config.settings_button_text),

           //timer_on_text:"",
           //timer_off_text:"",
            $(".min-set-text").text(config.minutes_per_round_text)
            $(".q-set-text").text(config.questions_per_round_text)
            $("#score-bar-title").text(config.score_multiplier_bar_text)
            $(".m-multi-on-text").text(config.music_volume_text)
            $(".e-multi-on-text").text(config.effects_volume_text)
            $(".unlim-text").text(config.unlimited_text);

            $(".autoplay-switch-text").text(config.timer_on_text)

        if(config.button_board_colour){$(".htb-button-container").css("background-color",config.button_board_colour)}
        if(config.container_outline_colour){$("#getWood").css("border-color",config.container_outline_colour)}
        if(config.container_outline_colour){$(".htb-button-container").css("border-color",config.container_outline_colour)}
           //questions_per_round_text:"",
           //unlimited_text:"",
           //score_multiplier_bar_text:"",
           //music_volume_text:"",
           //effects_volume_text:"",





        closeButton.hide();

        ///var backupArray = config.levels.slice();


        var score;
        //OPTIONAL ------ REMOVE IF NOT USING END GAME STATE-----------------------------------------------------------------------------------------------------------
        $(".well-done-title").text(config.end_game_title);
        $(".well-done-text").text(config.end_game_text);

        wholeDocument.addClass(config.branding+"-branding");

        if(config.branding =="twinkl"){
            $(".main-twinkl-logo").show();
        } else if(config.branding=="beyond"){
            wholeDocument.css('font-family', '"roboto" !important');
            $(".main-twinkl-logo").hide();
            $(".beyond-twinkl-logo").show();
        }

        assignEachLinkId()
        var backupArray = JSON.parse(JSON.stringify(config.levels))


        //todo -------------
        //MAKE SURE

        //TODO END GAME
        //RINGS STYLING
        //LINK CONFIG

        //SFX


        function assignEachLinkId(){
            config.levels.forEach(function (el,i) {

                el.game_content.forEach(function(e,index){

                    if(e.link_id && e.link_id.length>0){


                    }else{

                        //alert("ASSIGNING LINK")
                        config.levels[i].game_content[index].link_id = "level"+i +"cont"+ index;


                    }

                })
            })

        }




        hidePages();
        function hidePages(){
            allPages.hide();
            titlePage.show();
        }

        //ADD ANY ELEMENTS IN HERE YOU WANT TO REMOVE WIDOWS FROM---------------------------------------------------------------------------------------------------

        titleText.widowFix();


        //INSERT ANYTHING THAT NEEDS TO FIT TO CONTAINER------------------------------------------------------------------------------------------------------------

        function textResize(){
            testFontSize(titleText,180);
        }

        //START GAME------------------------------------------------------------------------------------------------------------------------------------------------

        letsGo.click(function(){
            swooshAudio.play();
            instructionsPage.show();
            instructionsPanel.css({'top':'100%'}).animate({'top':'15%'},500,"easeOutBack");
            titlePage.hide();
            TwinklGame.Utils.fitText($(".time-limit-text"),40)
        });

        //PLAY BUTTON-----------------------------------------------------------------------------------------------------------------------------------------------
        buildMenu();



        playButton.click(function(){
            buttonClickAudio.play();
            instructionsPage.hide();

            invertNav();



            if(config.levels.length>1){
                menuPage.show();
                $(".back-button").show();
                $(".filler-invisible").show();

                $(".wider-q-cont").removeClass('wider-q-cont')
                fitMenuText();

                showArrowOverlay();
            }else{
                startGame()
                $(".back-button").hide();
                $(".filler-invisible").hide();
                $(".wider-q-cont").removeClass('wider-q-cont')
                $(".question-text-outer").addClass('wider-q-cont')

                    fitButtonText()
            }

            $(".bonus-big").hide();
        });

        //INSERT GAME CODE HERE **************************************************************************************************************************************

        function showArrowOverlay(){
            var menu = document.getElementById('option-men');
            if ( menu.offsetHeight <  menu.scrollHeight || menu.offsetWidth <  menu.scrollWidth) {$(".do-scroll-overlay").show()
            } else {$(".do-scroll-overlay").hide()}
        }



        function buildMenu(){

            config.levels.forEach(function (e,index) {


                var menImage="";

                var hasImage = function(){
                    if(e.levelImage && e.levelImage.assetUrl.length>0){
                        return true
                    }else{return false}
                }

                if(hasImage()){
                    menImage = "<div class='menu-button-image ' style='background-image: url("+e.levelImage.assetUrl+")\'></div>"
                }
                var subMenuCodeToAdd = "<div data-id='"+index+"' class=' menu-container'>"+menImage+"<div class='menu-sub-title theme-text'>"+e.levelTitle+"</div></div>"
                $(".option-menu-contain").append(subMenuCodeToAdd)

            })

            $(".menu-container").click(function(){
                currentLevel=$(this).attr('data-id')
                $("#menuPage").hide();
                startGame()
                buttonClickAudio.play();
                    fitButtonText()

            })



        }

        function startGame(){

            if(backMusic){backMusic.play();}
            menuMusic.stop();
            questionsCorrect=0;
            totalClicked=0;
            totalClicked=0;
            score=0;
            $(".inside-score").text(score)
            mainPage.show();
            textResize();
            createGame()
            if(timerOn==true){myTimer();}

        }

        var currentLevel=0;
        var tenMultiplyActive =false;

        var set1 =[];
        var set2 = [];
        var set3 = [];
        var buttonAmount;
        var timerOn =true;
        var levelHasImage = false;

        function createGame (){


            //RESET TIMER

            resetAllMultText()
            score=0;
             set1 =[];
             set2 = [];
            set3 = [];
             buttonAmount = Math.min(config.levels[currentLevel].button_count, config.levels[currentLevel].game_content.length)


            var rows = Math.ceil(buttonAmount/4);

            setUpButtons()

            console.log( buttonAmount,config.levels[currentLevel].button_count)

            set1 =createSet(buttonAmount)
            set2 =createSet(buttonAmount)





            assignButtons()
            changeQuestion();
            detectQImage(config.levels[currentLevel])


        }

        function detectQImage(level){
            levelHasImage = false;
            level.game_content.forEach(function(e,index) {

                if (e.question_image && e.question_image.assetUrl.length > 0) {
                    levelHasImage = true;
                }
            })


            if(levelHasImage){
                $(".question-container").parent().addClass('larger-top')
            }else{
                $(".larger-top").removeClass('larger-top')

            }
        }


        function createSet(max){
            var tempArray =[];


            //todo add non same

            console.log(buttonAmount,"TARSV")

            for(var i=0;i<buttonAmount;i++){

                console.log("MAKIGNG")
                if(i===max){break;}
                TwinklGame.Utils.shuffleArray(config.levels[currentLevel].game_content);
                tempArray.push(config.levels[currentLevel].game_content[i])
            }


            return tempArray

        }


        function fitButtonText(){


            $(".question-text").each(function (i,e) {
                TwinklGame.Utils.fitText($(this),80)
            })

            $(".text-inside").each(function (i,e) {
                TwinklGame.Utils.fitText($(this),40)
            })
        }



        function fitMenuText(){

            $(".menu-sub-title").each(function (i,e) {

                TwinklGame.Utils.fitText($(this),80)
            })


        }

        function createUnique(count){

            var bitsAdded=0

            TwinklGame.Utils.shuffleArray(config.levels[currentLevel].game_content);


            for(var i=0;i<config.levels[currentLevel].game_content.length;i++){
                    if((inArray(config.levels[currentLevel].game_content[i].answer_text ,activeButtons) && config.levels[currentLevel].game_content[i].answer_text.length>0 ) || (inArray(config.levels[currentLevel].game_content[i].link_id,activeButtons)) ){

                    }else{
                        set3.push(config.levels[currentLevel].game_content[i]);
                        activeButtons.push(config.levels[currentLevel].game_content[i]);
                        return config.levels[currentLevel].game_content[i];
                    }

            }

        }


        var rowCount;

        function setUpButtons(){

            $(".htb-button-container").empty();

            var countButtons =  Math.min(config.levels[currentLevel].button_count, config.levels[currentLevel].game_content.length)
            var buttonsLeft = countButtons, buttonCount = 1;

            countRows();
            function countRows(){if(countButtons>=8){ rowCount = 3}else if(countButtons>=4){rowCount= 2}else{rowCount= 1}}

            for(var i=1;i<=rowCount;i++){

                //todo if 11 MAKE MIDDLE FLOOR
                var row ="<div class='htb-row htb-row-"+ i+"'></div>"
                $(".htb-button-container").append(row)
                var firstNum = Math.round(buttonsLeft /(rowCount-i+1))

                for(var e=1;e<=firstNum;e++){
                    var button = '<div class="htb-button "><div class="score-addition">+ 1</div> <div class="ring-back"></div> <div class="ring-front"></div><div id="htb-button-'+buttonCount+ '" class="htb-button-whack theme-background-dark "><div class="htb-image"></div><div class="text-inside"></div></div> </div>'
                    $(".htb-row-"+i).append(button)
                    buttonsLeft--
                    buttonCount++
                }
            }


           /// changeForPortrait(rowCount)

            $(".htb-button").on("click", function(){
                //console. clear()
                $(this).find(".htb-button-whack").css({"margin-top":($(this).height()/1.5)})
                testAnswer($(this).find(".htb-button-whack"))
            });





            $(".ring-front").css({"background-image": "url(" + manifest.ringFront.src + ")"});
            $(".ring-back").css({"background-image": "url(" + manifest.ringBack.src+ ")"});
            //$(".htb-button-whack").css({"border-bottom-color":config.wood_border_color});


            if(config.button_colour){$(".htb-button-whack").css("background-color",config.button_colour)}

        }



        var currentAnswer
        var activeButtons = []

        function assignButtons(){
             activeButtons = []



            if(config.levels[currentLevel].button_count === config.levels[currentLevel].game_content.length){
                $(".htb-button-whack").each(function(index,e){
                        assignButtonsSingle(backupArray[currentLevel].game_content[index],$(this))
                })
            }else{
                $(".htb-button-whack").each(function(index,e){

                    var counter=0;


                    if(set1[index] && (inArray(set1[index].answer_text,activeButtons)===false && inArray(set1[index].link_id,activeButtons)===false )  ){



                        assignButtonsSingle(set1[index],$(this))

                    }else if(set2[counter] && (inArray(set2[counter].answer_text,activeButtons) ===false && inArray(set2[counter].link_id,activeButtons) ===false  ) ){

                        assignButtonsSingle(set2[counter],$(this))
                        counter++;
                    }else{
                        var getOne = findElement($(this),activeButtons)
                        //CHECK IF UNDEFINED

                        assignButtonsSingle(getOne,$(this))
                    }
                })

            }

        }


        function assignButtonsSingle(cont,item){


            var hasText,hasImage;

            if(cont.answer_text){

                if(cont.answer_text.length>0){
                    item.find('.text-inside').show();
                    item.find('.text-inside').text(cont.answer_text)

                    if(cont.answer_text.length>0){
                        item.attr('data-ans',cont.answer_text )

                    }else{
                        item.attr('data-ans',cont.link_id)

                    }
                    item.attr('data-id',cont.link_id )

                    hasText=true;
                }


            }else{
                item.find('.text-inside').hide();

                hasText=false;
            }
            if(cont.answer_image && cont.answer_image.assetUrl.length>0){
                // anchor
                item.addClass()
                item.find(".htb-image").show();
                item.find(".htb-image").css({ "background-image": "url(" + cont.answer_image.assetUrl + ")" });
                hasImage=true;

            }else{
                hasImage=false;
                item.find(".htb-image").hide()
            }

            if(hasImage===true && hasText==false){
                item.addClass("image-only")
            }else if(hasText===true && hasImage===false){
                item.addClass("text-only")

            }else{
                item.removeClass("image-only")
                item.removeClass("text-only")
            }

            item.find('.text-inside').text(cont.answer_text)
            activeButtons.push(cont)

             item.attr('data-id',cont.link_id)

            item.attr('data-ans',cont.answer_text)
        }

        function findElement(currButton,activeButtons){

            for(var i = 0;i<config.levels[currentLevel].game_content.length;i++){

                if(inArray(config.levels[currentLevel].game_content[i].answer_text,activeButtons) ===false && inArray(config.levels[currentLevel].game_content[i].link_id,activeButtons) ===false ){


                    return config.levels[currentLevel].game_content[i];
                    //currButton.text(elem.answer_text)
                    //                            console.log("LEFT OVER")
                    //activeButtons.push(elem)

                }
            }


            //return false;
        }

        function changeq(){

        }


        ////SETTINGS----------------------------------------------------------------------
        var  currentPage




        //BACK BUTTON--------------------------------------------------------------------------------------------



        $(".back-button").click(function () {

            buttonClickAudio.play();
            allPages.hide();
            textResize();
            clearInterval(timerStop); //CLEAR TIMER
            $(".timer-inside-text").text("0:00")
            menuPage.show();

        })

        //TIMER SWITCH---------------------------------------------------   -------------------------

        $("#Layer_1").click(function(){
            switchButtons()
            $(".autoplay-switch-text").text(config.timer_off_text)

            $("#minutes-select").parent().parent().addClass("inactive-button");
        })

        $("#Layer_2").click(function(){
            switchButtons()
            $(".autoplay-switch-text").text(config.timer_on_text)

            $("#question-select").parent().parent().addClass("inactive-button")
        });

        function switchButtons(){
            buttonClickAudio.play()
            timerOn = !timerOn;
            $("#Layer_1, #Layer_2 ,.timer-full ,.score-filler ,.sel-form , .sel-form-1").toggle();

            $(".inactive-button").toggleClass("inactive-button");
        }

        var scoreMultiplierBar =true;

        $("#auto-switch-off").click(function(){
            changeMultiState()
            $("#score-multi-text-on").text("On")
        })

        $("#auto-switch-on").click(function(){
            changeMultiState()
            $("#score-multi-text-on").text("Off")
        });



        $("#play-again").click(function(){
            allPages.hide();
            swooshAudio.play();
            instructionsPage.show();
            instructionsPanel.css({'top':'100%'}).animate({'top':'15%'},500,"easeOutBack");
            invertNav();
        })


        function changeMultiState(){
            buttonClickAudio.play()
            $("#auto-switch-off, #auto-switch-on , .full-column").toggle()
            scoreMultiplierBar = !scoreMultiplierBar
        }

        //OPEN SETTINGS----
        $(".cog-icon,.time-limit-text ").click(function(){openSettings();})

        //CLOSE SETTINGS----
        $(".times-symbol").click(function(){currentPage="levelSelect"; $(".open-settings-panel").hide();buttonClickAudio.play();})

        //--Build Menu End-----------------------------------------------------------------------
        var setSlide =false
        function openSettings(){

            currentPage ="options";
            settingsOpen.play()
            $(".open-settings-panel").show()
            $(".open-settings-panel").find(".animated").addClass("bounceIn")

            if(setSlide ==false){
                $('#music-slider').rangeslider({
                    polyfill: false,
                    onSlide: function (position, value) {
                        backMusic.volume(value/10)
                        menuMusic.volume(value/10)
                    }
                });
                $('#effects-slider').rangeslider({
                    polyfill: false,
                    oninput: function (position, value) {correctAnswerSoundAudio.play();},
                    onSlide: function (position, value) {sfx.forEach(function(e){e.volume(value/10)})}
                });
                document.getElementById("effects-slider").oninput = function() {correctAnswerSoundAudio.play()};
                setSlide =true;
            }
            //settingsTextSize();
        }





        function changeButton(thisButton){

            //CHECK SET 1 to SEE if it exists again
            //CHECK Set 2 from start

            var checkSameCounter=0;

            //CHECK FIRST TO SEE IF APPEARS AGAIN
            var contin = true;

                for(var i=0;i<set1.length;i++){
                    if((set1[i].answer_text===thisButton.attr('data-ans') && set1[i].answer_text.length>0) || set1[i].link_id ===thisButton.attr('data-id') ){
                        contin =false
                        ; break}
                    checkSameCounter++
                }

                if(contin===true){
                    for(var y=0;y<set2.length;y++){
                        if(((set2[y].answer_text === thisButton.attr('data-ans')  && set2[y].answer_text.length>0 ) || set2[y].link_id===thisButton.attr('data-id')) && checkSameCounter < buttonAmount ){
                            contin =false ;
                            break}
                        checkSameCounter++
                    }
                }

                if(contin===true){

                    var hasSet =false
                    var findOneCounter = 0;
                    activeButtons =removeItemOnce(activeButtons,thisButton.attr('data-id'))
                    for(var x=0;x<set2.length;x++){

                        //7 not change because 2 is in


                        if((inArray(set2[x].answer_text,activeButtons)===false) && inArray(set2[x].link_id,activeButtons)===false){
                            hasSet=true;
                            activeButtons.push(set2[x])
                            changeSpec(thisButton,set2[x])
                            contin=false;
                            break;
                        }else{
                            findOneCounter++
                        }
                    }

                    if(findOneCounter == set2.length){
                        //CREATE 3rd
                        var newButton = createUnique(1)

                        changeSpec(thisButton,newButton)
                        //CHANGE BUTTOn
                    }
            }



            //IF APPEARS IN SET 1 AGAIN
            //RUN THROUGH SET 2 TO SEE WHAT ISNT INCLUDED
        }

        function changeSpec(thisButton,newButton){


            var hasImage,hasText;
            // anchor

            if(newButton.answer_text.length>0){
                thisButton.find('.text-inside').show();
                thisButton.find('.text-inside').text(newButton.answer_text)

                setTimeout(function(){
                    TwinklGame.Utils.fitText(thisButton.find('.text-inside'),70)

                },100)

                thisButton.attr('data-ans',newButton.answer_text )
                hasText=true
            }else{
                thisButton.find('.text-inside').hide();
                hasText=false;

            }
            if(newButton.answer_image && newButton.answer_image.assetUrl.length>0){
                // anchor

                hasImage=true;
                thisButton.find(".htb-image").show();
                thisButton.find(".htb-image").css({ "background-image": "url(" + newButton.answer_image.assetUrl + ")" });
            }else{
                hasImage=false;
                thisButton.find(".htb-image").hide()
            }
            thisButton.attr('data-id',newButton.link_id)


            if(hasImage===true && hasText==false){
                thisButton.addClass("image-only")
            }else if(hasText===true && hasImage===false){
                thisButton.addClass("text-only")

            }else{
                thisButton.removeClass("image-only")
                thisButton.removeClass("text-only")
            }

        }


        function removeItemOnce(arr, value) {
            var index = arr.map(function(e) { return e.link_id; }).indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        }


        var lookingForCorrectId



        ///MUSIC------------------------------------------------------------------------------------------------------------------------

        function startMenuMusic(){

            if(backMusic){
                backMusic.stop();
            }

            if(menuMusic){menuMusic.play();}
        }



        //TIMER--------------------------------------------------------------------------------------
        var timer
        var timerStop;
        var timerRoundTime=1;
        var questionAmount =10;

        function myTimer() {
            var deadline = new Date();
            deadline.setMinutes(deadline.getMinutes()+parseInt(timerRoundTime))
            var shallPlay =true
            timerStop= setInterval(function() {
                var now = new Date().getTime();
                var t = deadline - now;
                var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((t % (1000 * 60)) / 1000);
                var extra0 = ""
                if(seconds<10){extra0="0"}

                $(".timer-inside-text").text( minutes + ":" + extra0+ seconds);

                //WITH % SECONDS PLAY COUNTDOWN
                if(t<5000 && shallPlay===true){countdown.play();shallPlay= false;}
                if (t < 0) { clearInterval(timerStop);endGame();countdown.stop()}
            }, 1000);

        }

        function checkAnswer(){


        }



        function setButtons(){

        }


        function resetSet(){

            //set1 into
        }




        function endGame(){

            powerDown.stop();
            resetAllMultText()
            $(".total-score-feedback").text($(".correct-number").text())
            $(".you-got-text").html("You got <b class='theme-text'>" +questionsCorrect + "</b> out of <b class='theme-text'>"+ totalClicked+ "</b> correct!")
            if(backMusic){backMusic.stop();}
            highScore.play();
            $("#mainPage").hide();
            $("#endGameScreen").show();
            $("#well-done").css({'top':'100%'}).animate({'top':'15%'},500,"easeOutBack");
            currentPage ="endScreen";
            //resizedw()
            totalClicked=0;
            startMenuMusic();


        }

        function changeButtonAnswer(){
            //CHECK SET2
            //IF NO SET 2
            //GET RANDOM UNUSED and PUT IN SET 3
        }


        function inArray(needle, haystack) {

            if(needle.length>0){

                var length = haystack.length;
                for (var i = 0; i < length; i++) {

                    if (haystack[i].answer_text === needle || haystack[i].link_id === needle){
                        return true;
                    }

                }

                return false;

            }else{
                return false;

            }

        }

        function testAnswer(item){

            totalClicked++;



            if((item.attr("data-ans")===currentAnswer.answer_text && currentAnswer.answer_text.length>0) || item.attr("data-id") ===currentAnswer.link_id){




                isCorrect(item)

                setTimeout(function(){
                    $(".htb-button-whack").css({"margin-top": "0"});
                },200)
                setTimeout(function(){
                    $(".light-circle").removeClass("green")
                    $(".fadeOutUp").removeClass("fadeOutUp")
                },600)


                if(questionAmount != "Unlimited"){if( questionsAnswered>=(questionAmount-1) && timerOn ==false){endGame()}}


                changeButton(item)
                changeQuestion();


                setTimeout(function(){
                    $(".htb-button-whack").css({"margin-top": "0"});
                   //. removeCurrent();
                },200)

            }else{
                wrongAnswer();
            }

            //CHECK FOR ID
            //CHECK FOR TEXT

        }


        var loadingBar = $(".htb-loading");
        var loadingDir ="top"
        var bonusMulti=0,bonusTimes=0,questionsCorrect,questionsAnswered,totalClicked=0
        var closeIt;


        function isCorrect(current){

            questionsCorrect++

            if(tenMultiplyActive==false){bonusMulti++}
            var animateObject = {}; animateObject[loadingDir] = (100 -(bonusMulti*10) +"%");

            loadingBar.animate(animateObject, 300)
            correctAnswerSoundAudio.play();
            current.parent().find(".score-addition").addClass("fadeOutUp")
            $(".light-circle").addClass("green")

            score = score + bonusTimes;
            $(".inside-score").text(score)

            if(tenMultiplyActive ==false){checkForBonus()}
            if(questionAmount != "Unlimited"){if( questionsCorrect>(questionAmount-1) && timerOn ==false){endGame()}}

        }


        function checkForBonus(){


            if(bonusTimes==5 && bonusMulti==10){
                hitTen.play();
                bonusTimes=10;
                resetBonus(10,30000);
                $(".htb-loading .bg").addClass("power-blue");
                $(".full-column").addClass("pulse-animate");
                tenMultiplyActive=true;
                closeIt = setTimeout(function(){
                    $(".full-column").removeClass("pulse-animate")
                    tenMultiplyActive =false;
                    resetAllMultText();

                },28000)
            }

            if(bonusMulti==10){
                bonusTimes++;
                resetBonus(bonusTimes,0)
            }


        }


        function wrongAnswer(){
            if(bonusTimes>1){ powerDown.play();}
            resetAllMultText();
            var animateObject = {}; animateObject[loadingDir] = "100%";
            loadingBar.animate(animateObject, 300)
            wrongAnswerAudio.play();
            $(".light-circle").addClass("red")
            setTimeout(function(){$(".light-circle").removeClass("red")},600)
        }


        function resetBonus(num,time){

            var animateObject = {}; animateObject[loadingDir] = "100%";
            loadingBar.animate(animateObject, time)

            if(backMusic){backMusic.rate(backMusic.rate()+0.05)}

            $(".score-addition").text("+"+num)
            bonusMulti=0;
            $(".bonus-big").text("× "+num+" Multiplier").addClass(" fadeOutUpBig").show()
            $("#getWood").addClass("power-up-shake")
            $("#bonus-multi-text").text("×" +num).addClass("number-bounce")
            $(".turnedOn").removeClass("turnedOn")
            $(".multiplier-cont").addClass("pulse-animate")

            setTimeout(function(){$(".bonus-big").hide()},1000)
            setTimeout(function(){$(".bonus-big").hide().removeClass(" fadeOutUpBig");$("#getWood").removeClass("power-up-shake")},2000)
            setTimeout(function(){$("#bonus-multi-text").removeClass("number-bounce")},4000)
            multiplier.play()
            testFontSize($("#bonus-multi-text"),90)
        }


        function resetAllMultText() {
            clearTimeout(closeIt)
            $(".power-blue").removeClass("power-blue");
            tenMultiplyActive=false;
            loadingBar.stop();
            var animateObject = {}; animateObject[loadingDir] = "100%";
            loadingBar.animate(animateObject, 300)
            $(".pulse-animate").removeClass("pulse-animate")
            bonusMulti=0;
            if(backMusic){backMusic.rate(1)}

            bonusTimes =1;
            $(".bonus-big").text("×" + 1 + " Multiplier")
            $("#bonus-multi-text").text("×" + 1)
            $(".score-addition").text("+" + 1)
        }



        function changeQuestion(){


            console.log(set1,"YAJAJ")

            var currentQ
            if(set1.length>0){
                currentQ = set1.shift()
            }else{

                set1 = set2.slice();

                if(set3.length>0){
                    set2 = set3.slice();
                    set3=[];

                    if(set2.length<buttonAmount){
                        //GENERATE SOME EXTRA


                        for(var i=set2.length;i<buttonAmount;i++){

                            TwinklGame.Utils.shuffleArray(config.levels[currentLevel].game_content);
                            set2.push(config.levels[currentLevel].game_content[i])
                        }


                    }
                }else{
                    set2 =createSet()

                }

                currentQ = set1.shift()


                //fill and generat
            }

            currentAnswer = currentQ



            console.log(currentQ)

            if(currentQ.question_text){
                $(".question-text").text(currentQ.question_text)
                $(".question-text").show()

            }else{
                $(".question-text").hide()
            }

            //anchor
            if(currentQ.question_image && currentQ.question_image.assetUrl.length>0){
                $(".question-image-cont").css({"background-image": "url(" + currentQ.question_image.assetUrl+ ")"});
                $(".question-image-cont").show();


            }else{
                $(".question-image-cont").hide();

            }


        }



        ///DROPDOWN CREATOR------------------------------------------------------------------------

        createDropdown();
        $(document).on('click touch', '#min-sel .selectDropdown ul li a', function(e) {
            timerRoundTime=$(this).attr("data-num")
        });

        $(document).on('click touch', '#q-sel .selectDropdown ul li a', function(e) {
            questionAmount=$(this).attr("data-num")
        });










        //NAVIGATION FUNCTIONS ******************************************************************************************************************************************


        //CLOSE BUTTON

        closeButton.click(function(){
            startMenuMusic();

            buttonClickAudio.play();
            hidePages();
            invertNav();
            textResize();
            clearInterval(timerStop); //CLEAR TIMER
            $(".timer-inside-text").text("0:00")
        });

        //INVERT THE NAVIGATION COLOURS AND TOGGLE CLOSE

        function invertNav(){
            fullScreen.toggleClass("inverted");
            soundToggle.toggleClass("inverted");
            navBar.toggleClass("theme-background-dark");
            closeButton.toggle();
        }

        //FULLSCREEN TOGGLE ---------------------------------------------------------------

        fullScreen.click(function () {
            buttonClickAudio.play();

            if(fullScreen.hasClass("expand-screen"))
            {fullScreen
                .removeClass("expand-screen")
                .addClass("reduce-screen");
                TwinklGame.Utils.makeFullScreen(document.getElementById('container'));
            }
            else{
                fullScreen
                    .removeClass("reduce-screen")
                    .addClass("expand-screen");
                TwinklGame.Utils.leaveFullScreen();
            }
        });

        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
            isFullscreen = !isFullscreen;
            resizeScreen();
            textResize();
        });

        //SOUND TOGGLE -----------------------------------------------------------------------

        soundToggle.click(function () {
            buttonClickAudio.play();
            if(soundToggle.hasClass("sound-off"))
            {soundToggle
                .removeClass("sound-off")
                .addClass("sound-on");
                Howler.mute(true);

            }else{
                soundToggle
                    .removeClass("sound-on")
                    .addClass("sound-off");
                Howler.mute(false);
            }
        });

        //CHECK IF TEXT OVERFLOWS----------------------------------------------------------------

        function testFontSize(e, s) {

            e.css( "font-size", s + ("px"));

            var size = e.css('font-size'); //GETS FONT SIZE
            size = parseInt(size, 10); //REMOVE PX

            //WHILE TEXT OVERFLOWS ELEMENT REDUCE TEXT SIZE
            for(;e.get(0).offsetHeight<e.get(0).scrollHeight||e.get(0).offsetWidth<e.get(0).scrollWidth;)e.css("font-size","-=1");
        }

        resizeScreen();
        $('#preload-div').hide();
    };
})(TwinklGame, lib.manifest);