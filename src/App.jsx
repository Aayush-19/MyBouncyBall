import { useEffect, useState } from 'react'
import './App.css'
const BALL_SIZE = 20;
const BOX_WIDTH=612;
const BOX_HEIGHT=353;
const OBSTACLE_WIDTH=80;
const GAME_DIFFICULTY=100;

function App() {
  const [startGame,setstartGame] = useState(false);
  const [ballPositionTop, setballPositionTop] = useState(BOX_HEIGHT/2 - BALL_SIZE/2)
  const [ballPositionLeft, setballPositionLeft] = useState(BOX_WIDTH/3)
  const [obstaclePositionLeft,setobstaclePositionLeft] = useState(BOX_WIDTH-OBSTACLE_WIDTH);
  const [obstacleHeight,setobstacleHeight] = useState(100);
  const [score,setscore] = useState(0);
  const[pause,setPause] = useState(false);
  
  useEffect(()=> {
    let interval=null
    if(startGame && !pause){ 
      interval = setInterval(() =>{ 
        if(ballPositionTop < BOX_HEIGHT-BALL_SIZE){
          setballPositionTop(ballPositionTop => ballPositionTop+3)      
        }
        if(obstaclePositionLeft>-OBSTACLE_WIDTH){
          setobstaclePositionLeft(obstaclePositionLeft-5);
        }      
        else {
            setobstaclePositionLeft(BOX_WIDTH-OBSTACLE_WIDTH)
            setobstacleHeight(Math.floor(Math.random(.15,.85) * (BOX_HEIGHT-GAME_DIFFICULTY)))
            setscore(score=>score+1)  
        }

        if(ballPositionTop+BALL_SIZE >=BOX_HEIGHT // ball falls down
          || ( ballPositionLeft+BALL_SIZE>=obstaclePositionLeft 
          && ballPositionLeft<=obstaclePositionLeft+OBSTACLE_WIDTH 
          && (ballPositionTop<=obstacleHeight //hits the top obstacle
            || ballPositionTop+BALL_SIZE>=GAME_DIFFICULTY+obstacleHeight) //hits the bottom obstacle
            ))
            {
            setstartGame(startGame=>false);  
            setballPositionTop(ballPositionTop=> BOX_HEIGHT/2-BALL_SIZE/2);
            setobstaclePositionLeft(obstaclePositionLeft=>BOX_WIDTH-OBSTACLE_WIDTH)
            setobstacleHeight(obstacleHeight=> 100)    
        }
      },30)
      return ()=> clearInterval(interval);
    }   
  },[startGame,ballPositionTop,obstacleHeight,obstaclePositionLeft])

  const OBSTACLE_BOTTOM_HEIGHT =BOX_HEIGHT -( GAME_DIFFICULTY+obstacleHeight);

  return (
    <div className='App'>
        <div className='GameBox' 
             onClick={()=>
                {
                  if(startGame && !pause){
                    if(ballPositionTop-50>=BALL_SIZE){
                      setballPositionTop(ballPositionTop => ballPositionTop-50);
                    }
                    else{
                      setballPositionTop(ballPositionTop=>0);
                    }
                  }
                }
            } 
             style={{ 
                overflow:"hidden",
                width : BOX_WIDTH,
                height: BOX_HEIGHT,
                // backgroundColor:"blue",
                backgroundImage: "url(https://raw.githubusercontent.com/Aayush-19/MyBouncyBall/main/src/assets/bgImg.jpg)",
                position:"relative"
              }}
        > 
          <div className='TopObstacle'
                style={{
                  position:"absolute",
                  height:obstacleHeight,
                  width:OBSTACLE_WIDTH,
                  left:obstaclePositionLeft,
                  // backgroundColor:"green",
                  top:"0px",
                }}
          >
            <img src="https://raw.github.com/Aayush-19/MyBouncyBall/main/src/assets/top.png" 
                  width={OBSTACLE_WIDTH}
                  height={obstacleHeight}/>
          </div>
          <div className='ball' style= {{
            position:"absolute",
            "backgroundColor" :"purple",
            width:BALL_SIZE,
            height:BALL_SIZE,
            borderRadius:"50%",
            top:ballPositionTop,
            left:ballPositionLeft
          }}
          >            
          </div>

          <div className='BottomObstacle'
                style={{
                  position:"absolute",
                  width:OBSTACLE_WIDTH,
                  height:OBSTACLE_BOTTOM_HEIGHT,
                  left:obstaclePositionLeft,
                  top:obstacleHeight+GAME_DIFFICULTY,
                  // backgroundColor:"green",
                }}
          >

          <img src="https://raw.github.com/Aayush-19/MyBouncyBall/main/src/assets/bottom.png" 
                  width={OBSTACLE_WIDTH}
                  height={OBSTACLE_BOTTOM_HEIGHT}/>
          </div>
        </div>

          <button style={{
            marginTop:"50px",
            // marginRight:"50px",
            "backgroundColor": "red"
        }} 
            onClick={()=>
            { 
              if(pause==true){
                setPause(setPause=>false);
                setstartGame(true)
              }
              else if(startGame==false) {
                setstartGame(true)
                setscore(0);
              }
            }
          }>
            Start Game
          </button>
          
          <button style={{
             marginLeft:"30px",
            "backgroundColor": "red"
            }
          } 
          onClick={()=>{
                if(pause==false){
                  setstartGame(false)
                  setPause(true)
                }
              }
          }
          >
            Pause Game
          </button>

          <button style={{
             marginLeft:"30px",
            "backgroundColor": "red"
            }
          } 
          onClick={()=>{
                setstartGame(false)
                setballPositionTop(ballPositionTop=> BOX_HEIGHT/2-BALL_SIZE/2);
                setobstaclePositionLeft(obstaclePositionLeft=>BOX_WIDTH-OBSTACLE_WIDTH)
                setobstacleHeight(obstacleHeight=> 100)    
                setscore(score=>0);  
          }
          }>
            Restart Game
          </button>
          
          <h1> Score {score}</h1>
    </div>
  )
}

export default App
