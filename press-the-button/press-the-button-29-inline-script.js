
        function init() {

            TwinklGame.setup(TwinklGame.Utils.getInitialConfig({

                //TITLES AND INTRO
                title: "Insert Title", //MAIN TITLE //todo done
                sub_title: "Press the Button", //SUBHEADING //todo done
                intro_title:"How to play:", //todo done
                intro_text:"Insert Instruction Text", //todo done

                //BUTTONS
                lets_go_text: "Let's go!", //todo done
                play_button_text:"Play", //todo done
                play_again_button_text:"Play Again",
                settings_button_text:"Settings", //todo done


                //BRANDING
                theme_colour: "steel-blue-dark",
                branding: "twinkl",
               // ring_back: {assetUrl: "images/ring-back.png"},
               // ring_front: {assetUrl: "images/ring-front.png"},
                background_image_url: { assetUrl: "" },
                foreground_image_url: { assetUrl: "" },
                game_background: { assetUrl: "" },
                wood_background: { assetUrl: "" },
                button_board_colour:"",
                button_colour:"",
                container_outline_colour:"",

                //AUDIO
                button_click_audio : {assetUrl:""},//
                background_music : {assetUrl:""},//
                menu_music : {assetUrl:""},//
                settings_open_audio : {assetUrl:""},
                swoosh_audio:{assetUrl:""},
                correct_audio : {assetUrl:""},
                wrong_audio : {assetUrl:""},

                power_up_audio:{assetUrl:""},
                power_down_audio:{assetUrl:""},

                hit_ten_audio:{assetUrl:""},
                end_game_audio:{assetUrl:""},




                //TEXT
                timer_on_text:"Timer On", //
                timer_off_text:"Timer Off", //
                minutes_per_round_text:"Minutes per round",
                questions_per_round_text:"Questions per round",
                unlimited_text:"Unlimited",
                music_volume_text:"Music volume",
                effects_volume_text:"Sound effects volume",
                score_text:"Score",
                timer_text:"Timer",
                well_done_title:"Well done!",
                total_score_text:"Total score:",









                //GET RANDOM AMOUNT
                    //CREATE ANSWER BUTTONS
                    //SET QUESTIONS

                    //can repeat
                    //CREATE BACKUP OF 10

                levels:[


                    {

                        button_count:3,

                        levelTitle:"First Section",
                        levelImage:{assetUrl:"images/ring-back.png"},


                        /*
                              game_content:[
                            {question_text:"Apple",question_image:{assetUrl:""},answer_text:"1",answer_image:{assetUrl:"Images/quiz-image-1.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Banana",question_image:{assetUrl:""},answer_text:"2",answer_image:{assetUrl:"Images/quiz-image-2.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Blackberry",question_image:{assetUrl:""},answer_text:"3",answer_image:{assetUrl:"Images/quiz-image-3.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Cherries",question_image:{assetUrl:""},answer_text:"4",answer_image:{assetUrl:"Images/quiz-image-4.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Peach",question_image:{assetUrl:""},answer_text:"5",answer_image:{assetUrl:"Images/quiz-image-5.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Avocado",question_image:{assetUrl:""},answer_text:"6",answer_image:{assetUrl:"Images/quiz-image-6.png"},link_id:""},
                            {question_text:"Grapes",question_image:{assetUrl:""},answer_text:"7",answer_image:{assetUrl:"Images/quiz-image-7.png"},link_id:""},
                            {question_text:"Lemons",question_image:{assetUrl:""},answer_text:"8",answer_image:{assetUrl:"Images/quiz-image-8.png"},link_id:""},
                            {question_text:"Lime",question_image:{assetUrl:""},answer_text:"9",answer_image:{assetUrl:"Images/quiz-image-9.png"},link_id:""},

                            // {question_text:"Question 5",question_image:{assetUrl:""},answer_text:"five",answer_image:{assetUrl:""},link_id:"5"},
                            // {question_text:"Question 6",question_image:{assetUrl:""},answer_text:"six",answer_image:{assetUrl:""},link_id:"6"},
                            // {question_text:"Question 7",question_image:{assetUrl:""},answer_text:"seven",answer_image:{assetUrl:""},link_id:"7"},
                            // {question_text:"Question 8",question_image:{assetUrl:""},answer_text:"eight",answer_image:{assetUrl:""},link_id:"8"},
                            // {question_text:"Question 9",question_image:{assetUrl:""},answer_text:"nine",answer_image:{assetUrl:""},link_id:"9"},
                            // {question_text:"Question 10",question_image:{assetUrl:""},answer_text:"ten",answer_image:{assetUrl:""},link_id:"10"}
                        ],
                    }



                         */

                        game_content:[
                            {question_text:"Apple",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-1.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Banana",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-2.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Blackberry",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-3.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Cherries",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-4.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Peach",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-5.png"},link_id:"",audio:{assetUrl:""}},
                            {question_text:"Avocado",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-6.png"},link_id:""},
                            {question_text:"Grapes",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-7.png"},link_id:""},
                            {question_text:"Lemons",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-8.png"},link_id:""},
                            {question_text:"Lime",question_image:{assetUrl:""},answer_text:"",answer_image:{assetUrl:"Images/quiz-image-9.png"},link_id:""},

                            // {question_text:"Question 5",question_image:{assetUrl:""},answer_text:"five",answer_image:{assetUrl:""},link_id:"5"},
                            // {question_text:"Question 6",question_image:{assetUrl:""},answer_text:"six",answer_image:{assetUrl:""},link_id:"6"},
                            // {question_text:"Question 7",question_image:{assetUrl:""},answer_text:"seven",answer_image:{assetUrl:""},link_id:"7"},
                            // {question_text:"Question 8",question_image:{assetUrl:""},answer_text:"eight",answer_image:{assetUrl:""},link_id:"8"},
                            // {question_text:"Question 9",question_image:{assetUrl:""},answer_text:"nine",answer_image:{assetUrl:""},link_id:"9"},
                            // {question_text:"Question 10",question_image:{assetUrl:""},answer_text:"ten",answer_image:{assetUrl:""},link_id:"10"}
                        ],
                    }
                ],


                // END GAME STATE
                end_game_title:"Well done!",
                end_game_text:"You completed the puzzle.",

            }));
        }



    