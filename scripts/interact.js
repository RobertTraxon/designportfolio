
var config =[

    {
        id:"",
        title:"Watch Branding",
        Desc:"",
        tags:["Branding","Illustration"],
        thumbnail:"images/133/watch-logo.png",
        content:[
            {image:"images/133/LOng.png"},
        ]
    },


    {
        id:"",
        title:"D&VA",
        Desc:"",
        tags:["Branding","Illustration"],
        thumbnail:"images/d&va/banners.png",
        content:[
            {image:"images/d&va/long.png"},
        ]
    }
    ,

    {
        id:"",
        title:"D&VA",
        Desc:"",
        tags:["Branding","illustration"],
        thumbnail:"images/northbank/app.png",
        content:[
            {image:"images/northbank/long.png"},
        ]
    }
    ,

    {
        id:"",
        title:"Press the Button",
        Desc:"",
        tags:["Branding","illustration"],
        thumbnail:"images/press-the-button/main.png",
        content:[
            {image:"images/press-the-button/long.png"},
        ]
    },

    {
        id:"",
        title:"Aura",
        Desc:"",
        tags:["Branding","illustration"],
        thumbnail:"images/aura/main.png",
        content:[
            {image:"images/watch-logo.png"},
        ]
    },

    {
        id:"",
        title:"D&AD",
        Desc:"",
        tags:["Branding","illustration"],
        thumbnail:"images/d&ad/main.png",
        content:[
            {image:"images/d&ad/Long.png"},
        ]
    }
    ,

    {
        id:"",
        title:"D&AD",
        Desc:"",
        tags:["Branding","illustration"],
        thumbnail:"images/monster-island/main.png",
        content:[
            {image:"images/monster-island/Long.png"},
        ]
    }
    ,

    {
        id:"",
        title:"Distort",
        Desc:"",
        tags:["branding","illustration"],
        thumbnail:"images/distort/main.png",
        content:[
            {image:"images/watch-logo.png"},
        ]
    },

    {
        id:"",
        title:"Distort",
        Desc:"",
        tags:["branding","illustration"],
        thumbnail:"images/bts/main.png",
        content:[
            {image:"images/watch-logo.png"},
        ]
    },

    {
        id:"",
        title:"Distort",
        Desc:"",
        tags:["branding","illustration"],
        thumbnail:"images/twinkl/main.png",
        content:[
            {image:"images/watch-logo.png"},
        ]
    }



]






//BACKGROUND

window.onload = function() {


    var selectedCounter=0
    var activeTags = [];


    $(".tag-cont-filter .tag").click(function(){

        var getTag = $(this).text();

        if($(this).hasClass("selected")){

            selectedCounter--;
            activeTags = activeTags.filter(function(e) { return e !== getTag })

            $(".project-button").each(function(){

                if($(this).hasClass(getTag)){

                    //todo CHECK IF IT HAS THE OTHERS
                    var obj = $(this)
                    var gotCOunt=0

                    activeTags.forEach(function (e,index) {
                        if(obj.hasClass(activeTags[index])){
                            gotCOunt++
                        }
                    })

                    if(gotCOunt<=0){$(this).hide();}
                }else{
                    if(selectedCounter===0){

                        $(".project-button").show();
                    }

                }
            })

            $(this).removeClass("selected")
        }else{

            selectedCounter++
            activeTags.push(getTag)

            $(".project-button").each(function(){

                if($(this).hasClass(getTag)){
                    $(this).show();
                }else{
                    //CHECK IF IT HAS THE OTHERS
                    var obj = $(this)
                    var gotCOunt=0

                    activeTags.forEach(function (e,index) {
                        console.log(obj,index,activeTags)
                        if(obj.hasClass(activeTags[index])){
                            gotCOunt++
                        }
                    })

                    console.log(gotCOunt)
                    if(gotCOunt<=0){$(this).hide();}
                }
            })
            $(this).addClass("selected")
        }


    })



    //INTERACTIVITY

    $(".work-cont-overlay").hide();


    function addButtonEvents(){
        $(".project-button").click(function () {

            $("body").addClass("fixScroll")
            $(".work-cont-overlay").show();
            buildIt($(this).attr('data-id'))
        })

    }



    $(".modal-item").click(function () {
        $("body").removeClass("fixScroll")

        console.log("YEAHHHh")
        $(".work-cont-overlay").hide();


    })

    addThumb()

    function addThumb(){
        config.forEach(function(e,index){
            var workItem = '<div data-id="'+index+'" class="'+config[index].tags.join(" ")+' col-xs-12 col-sm-6 col-md-4 col-lg-3 project-button"></div>'
            $(".all-work").append(workItem);

        })


        config.forEach(function(e,index){
            $("[data-id = '"+index+"']").css({ "background-image": "url(" + config[index].thumbnail + ")" });

        })
        addButtonEvents();

    }








    function buildIt(num) {

        var item = config[num];

        console.log(num,"UU",config[0])

        $("#pjt").text(config[num].title)
        $("#pjd").text(config[num].desc)
        $(".content-all").empty();

        $(".tag-cont").empty();
        item.tags.forEach(function(e){
            var tag= "<div class='tag'>"+e+"</div>"
            $(".tag-cont").append(tag)
        })

        item.content.forEach(function(e){
            console.log("RATTSTST")
            var image = "<img src='"+e.image+"' class='image-cont'>"
            $(".content-all").append(image)
        })

    }






    //CHANGE COLOURS DEPENDANT ON IMAGES
    //CLICK TO BLOB
    //BLOB FOLLOW CURSOR

    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const colors = ["#BF547B", "#AC79F2", "#9196F2", "#B6C5F2", "#F2D0BD"];
    const rndBorderRadius = () =>
        [...Array(4).keys()].map((x) => rnd(30, 85) + "%").join(" ") +
        " / " +
        [...Array(4).keys()].map((x) => rnd(30, 85) + "%").join(" ");

    const createBlob = ({id, x, y, color}) => {
        const card = document.querySelector(".card");
        const blob = document.createElement("div");
        blob.id = `blob-${id}`;
        blob.classList.add("blob");
        blob.style.top = `${y}%`;
        blob.style.left = `${x}%`;
        blob.style.backgroundColor = color;
        blob.style.scale = rnd(1.25, 2);
        blob.style.borderRadius = rndBorderRadius();
        card.appendChild(blob);
        console.log(id,"ID")
        animateBlob(id);
    };

    const animateBlob = (id) => {
        anime({
            targets: `#blob-${id}`,
            translateX: () => `+=${rnd(-25, 25)}`,
            translateY: () => `+=${rnd(-25, 25)}`,
            borderRadius: () => rndBorderRadius(),
            rotate: () => rnd(-25, 25),
            opacity: () => rnd(0.4, 0.8),
            delay: () => rnd(0, 1000),
            scale: () => rnd(1.25, 2),
            // direction: 'alternate',
            // loop: 1,
            duration: 2000,
            easing: "linear",
            complete: (anim) => animateBlob(id)
            // complete: anim => { anim.restart(); },
        }).play();
    };


    /*
    $("body").click(function (e) {

        const x = e.pageX - e.target.offsetLeft;
        //Todo current
        const y = e.pageY - e.target.offsetTop;
        const color = colors[rnd(0, colors.length)];
        console.log(x,y)

        createBlob({x, y, color});

    })
*/

    const genBlobs = () => {

        console.log("RATSSSSS")
        const card = document.querySelector(".card");
        card.innerHTML = "";
        [...Array(25).keys()].map((id) => {
            const x = rnd(25, 75);
            const y = rnd(25, 75);
            const color = colors[rnd(0, colors.length)];
            createBlob({x, y, color, id});
            console.log(id)
        });
    };

    genBlobs();




















}

