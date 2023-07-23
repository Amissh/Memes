
import React from "react"
export default function Meme(){

    // const[memeImage,setit]=React.useState("http://i.imgflip.com/1bij.jpg")
    const[meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    const[allMemeImages,setAllMemeImages]=React.useState([])
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemeImages(data.data.memes))
    },[])
    
    function getmeme(){
        const randomIndex=Math.floor(Math.random() * allMemeImages.length)
        const url=allMemeImages[randomIndex].url
        setMeme(prev=>{
            return {
                ...prev,  
                randomImage:url
            }
        })
    }
    
    function handleChange(event){
        const{name,value}=event.target
        setMeme(prev=>{
            return{ 
                ...prev,
                [name]:value
            }
        })
    }
    return(
        <main>
            <div className="form">
                <input type="text" placeholder="Top text"className="form--text" name="topText" value={meme.topText} onChange={handleChange}/>
                <input type="text" placeholder="Bottom text"className="form--text" name="bottomText" value={meme.bottomText} onChange={handleChange}/>
                <button onClick={getmeme} className="form--button">Get a new meme image 🖼 </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="photu"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}