let si = document.querySelectorAll(".songItem");
let x = document.getElementsByClassName("container")[0];
let sip = document.querySelectorAll(".songItemPlay");
let y=0;
let dur = 0, min=0, sec=0;
function rload(){
    location.reload();
}

function popt(){
    let drop = document.getElementsByClassName("drop")[0];
    if(drop.style.opacity != '1'){
        drop.style.opacity='1';
    }
    else{
        drop.style.opacity='0';
    }

}

if(window.innerWidth>768){
    si.forEach( si1=>{
        si1.addEventListener('click', function run(){
            if(si1.style.backgroundColor != 'rgba(255, 255, 255, 0.5)'){
                si1.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                x.style.backgroundImage = 'url("bg2.gif")';
                x.style.backgroundSize = 'cover';
                x.style.backgroundRepeat = 'no-repeat';
                si.forEach( si2=>{
                    if(si1!=si2){
                        si2.style.backgroundColor = 'white';
                        si2.style.color = 'black';
                    }
                });
                document.getElementsByClassName("bottom")[0].style.opacity = '1';  
                document.getElementsByClassName("bottom")[0].style.transition = 'opacity 0.8s ease-in-out';
            }
            else{
                si1.style.backgroundColor = 'white';
                si1.style.color = 'black';
                x.style.backgroundImage = 'url("bg.jpg")';
                x.style.backgroundSize = 'cover';
                x.style.backgroundRepeat = 'no-repeat';
            }
        });
    });
}

if(window.innerWidth<=768){
    si.forEach( si1=>{
        si1.addEventListener('click', function run(){
            if(si1.style.color!='white'){
                si1.style.backgroundColor = 'rgba(56, 115, 242, 0)';
                si1.style.transform = 'scale(1.11)';
                si1.style.color = 'white';
                si1.style.border = '0.05px solid white';
                x.style.backgroundImage = 'url("bg3.gif")';
                x.style.backgroundSize = 'cover';
                x.style.backgroundRepeat = 'no-repeat';
                si.forEach( si2=>{
                    if(si1!=si2){
                        si2.style.backgroundColor = 'white';
                        si2.style.transform = 'scale(1)';
                        si2.style.color = 'black';
                        si2.style.border = '0px solid white';
                    }
                }); 
                document.getElementsByClassName("bottom")[0].style.opacity = '1';  
                document.getElementsByClassName("bottom")[0].style.transition = 'opacity 0.8s ease-in-out';
                }
                else{
                    si1.style.backgroundColor = 'white';
                    si1.style.transform = 'scale(1)';
                    si1.style.color = 'black';
                    si1.style.border = '0px solid white';
                    x.style.backgroundImage = 'url("bg.jpg")';
                    x.style.backgroundSize = 'cover';
                    x.style.backgroundRepeat = 'no-repeat';
                }
            });
    });

}

//audio JS

let i=0;
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');


let songs = [
    {songName:"Good Time (Acoustic)", filePath:"1.mp3", coverPath: "cover1.jpg"},
    {songName:"I Got You", filePath:"2.mp3", coverPath: "cover2.jpg"},
    {songName:"Without You", filePath:"3.mp3", coverPath: "cover3.jpg"},
    {songName:"No Going Back", filePath:"4.mp3", coverPath: "cover4.jpg"},
    {songName:"Golden Hour", filePath:"5.mp3", coverPath: "cover5.jpg"},
    {songName:"As Long As You Love Me", filePath:"6.mp3", coverPath: "cover6.jpg"}
]

si.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("sn")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', ()=>{
    y = songIndex-1;
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        if(window.innerWidth<=768){
            x.style.backgroundImage = 'url("bg3.gif")';
            si[y].style.backgroundColor = 'rgba(56, 115, 242, 0)';
            si[y].style.color = 'white';
            si[y].style.border = '0.05px solid white';
            si[y].style.transform = 'scale(1.11)';
        }
        if(window.innerWidth>768){
            x.style.backgroundImage = 'url("bg2.gif")';
            si[y].style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
        sip[y].classList.remove('fa-circle-play');
        sip[y].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        x.style.backgroundImage = 'url("bg.jpg")';
        si[y].style.backgroundColor = 'white';
        if(window.innerWidth<=768){
            si[y].style.color = 'black';
            si[y].style.transform = 'scale(1)';
        }
        sip[y].classList.remove('fa-circle-pause');
        sip[y].classList.add('fa-circle-play');
    }
});

audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    dur = Math.floor(audioElement.duration);
    min = Math.floor(dur/60);
    sec = dur%60;
    if((String(min).localeCompare("NaN"))===0){
        document.getElementById('t2').innerHTML= '0:00';
    }
    else if(sec == 0)
        document.getElementById('t2').innerHTML= min + ':' + sec + sec;
    else
        document.getElementById('t2').innerHTML= min + ':' + sec;
    dur = Math.floor(audioElement.currentTime);
    min = Math.floor(dur/60);
    sec = dur%60;
    if(Math.floor(sec/10) == 0 )
        document.getElementById('t1').innerHTML= min + ':0' + sec;
    else
        document.getElementById('t1').innerHTML= min + ':' + sec;
    if(audioElement.duration == audioElement.currentTime){
        makeAllPlays();
        makeAllN();
        if(songIndex==6){
            songIndex = 1;
            audioElement.src = `${songIndex}.mp3`;
            makeP();
            audioElement.play();
        }
        else{
            songIndex++;
            audioElement.src = `${songIndex}.mp3`;
            makeP();
            audioElement.play();
        }
    }
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

const makeAllN = ()=>{
    si.forEach((si1,i)=>{
        si1.style.backgroundColor = 'white';
        si1.style.color = 'black';
        si1.style.transform = 'scale(1)';
    });
}

const makeP = ()=>{
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    if(window.innerWidth<=768){
        x.style.backgroundImage = 'url("bg3.gif")';
    }
    else{
        x.style.backgroundImage = 'url("bg2.gif")';

    }
    si.forEach((si1,i)=>{
        if(i==songIndex-1){
            sip[i].classList.remove('fa-circle-play');
            sip[i].classList.add('fa-circle-pause');
            if(window.innerWidth>768){
                si1.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            }
            else{
                si1.style.backgroundColor = 'rgba(56, 115, 242, 0)';
                si1.style.transform = 'scale(1.11)';
                si1.style.color = 'white';
                si1.style.border = '0.05px solid white';
            }
        }
    });
}

si.forEach((si1,i)=>{
    si1.addEventListener('click', function run(){
        if(sip[i].classList.contains('fa-circle-play')){
            makeAllPlays();
            songIndex = parseInt(si1.id);
            sip[i].classList.remove('fa-circle-play');
            sip[i].classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            audioElement.src = `${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
        }
        else{
            sip[i].classList.remove('fa-circle-pause');
            sip[i].classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            audioElement.pause();
        }
    });
});

// next.addEventListener('click', function run(){
//     makeAllPlays();
//     makeAllN();
//     if(songIndex == 6){
//         songIndex=1;
//         if(!audioElement.paused){
//             audioElement.src = `${songIndex}.mp3`;
//             audioElement.currentTime = 0;
//             //console.log(audioElement.paused)
//             audioElement.play();
//             makeP();
//         }
//         audioElement.src = `${songIndex}.mp3`;
//         audioElement.currentTime = 0;
//         //console.log(audioElement.paused)
//     }
//     else{
//         songIndex++;
//         if(!audioElement.paused){
//             audioElement.src = `${songIndex}.mp3`;
//             audioElement.currentTime = 0;
//             //console.log(audioElement.paused)
//             audioElement.play();
//             makeP();
//         }
//         audioElement.src = `${songIndex}.mp3`;
//         audioElement.currentTime = 0;
//         //console.log(audioElement.paused)
//     }
// });

next.addEventListener('click', function run(){
    makeAllPlays();
    makeAllN();
    if(songIndex == 6){
        songIndex=1;
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        makeP();
    }
    else{
        songIndex++;
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        makeP();
    }
});

prev.addEventListener('click', function run(){
    if(audioElement.currentTime>5){
        audioElement.currentTime=0;
    }
    else if(songIndex == 1){
        makeAllPlays();
        makeAllN();
        songIndex=6;
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        makeP();
    }
    else{
        makeAllPlays();
        makeAllN();
        songIndex--;
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        makeP();
    }
});
