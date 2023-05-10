console.log("Welcome to the Spotify");
let songindex = 1;
let audioElement = new Audio('/songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songname: "BROWN MUNDE - AP DHILLON", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg" , duration:"4:27" },
    { songname: "#AlaVaikunthapurramuloo - ButtaBomma", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg" , duration:"3:18" },
    { songname: "DJ Snake - Let Me Love You ft. Justin Bieber", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg" , duration:"3:25" },
    { songname: "Ghoome Ghoome - Luv ni Love Storys", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpeg" , duration:"3:50" },
    { songname: "Hamdard - Ek Villain - Arijit Singh", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg" , duration:"4:20" },
    { songname: "Luis Fonsi - Despacito ft. Daddy Yankee", filePath: "/songs/6.mp3", coverPath: "/covers/6.jpg" , duration:"4:41" },
    { songname: "Manzil - Luv ni Love Storys", filePath: "/songs/7.mp3", coverPath: "/covers/4.jpeg" , duration:"2:33" },
    { songname: "Ramuloo Ramulaa - Anurag Kulkarni,Mangli", filePath: "/songs/8.mp3", coverPath: "/covers/8.jpg" , duration:"4:05" },
    { songname: "Relation - Nikk", filePath: "/songs/9.mp3", coverPath: "/covers/9.jpg" , duration:"2:45" },
    { songname: "Sawan Mein Lag Gayi Aag - Mika S, Payal D, Neha K, Badshah", filePath: "/songs/10.mp3", coverPath: "/covers/10.jpg" , duration:"3:46" }
]

songitem.forEach((element, i) => {
    // console.log(element,i)
    // console.log(element.getElementsByTagName("img")[0])
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
});
// audioElement.play();
// console.log(audioElement.src)

masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    //update seek bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

const makeallplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
const playing = (element) => {
    if (element.classList.contains('fa-circle-play')) {
        return true;
    }
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songindex = parseInt(e.target.id);
        let play = playing(element);
        if (audioElement.paused || play == true) {
            makeallplays();
            songindex = parseInt(e.target.id);
            mastersongname.innerText = songs[songindex - 1].songname;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `/songs/${songindex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else {
            makeallplays();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    })

});

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 10) {
        songindex = 1;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `/songs/${songindex}.mp3`;
    mastersongname.innerText = songs[songindex - 1].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 1) {
        songindex = 10;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `/songs/${songindex}.mp3`;
    mastersongname.innerText = songs[songindex - 1].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})