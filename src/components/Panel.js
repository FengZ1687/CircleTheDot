import React, { Component } from 'react'
import Dot from './Dot'
export class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
           Panel : [
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0]
        ],
         dotx:5,
         doty:5
        };
        //this.handleClick = this.handleClick.bind(this)
      }


    handleClick = (x,y)=> {
      let step = []
      let move  = []
      if(this.state.Panel[x][y]===0){
        if(this.state.dotx===0||this.state.dotx===10||this.state.doty===0||this.state.doty===10){
          alert("Dot escaped. you lose ! try to block yellow dot move to the edge");
          window.location.reload(false);
        }
        let copy = this.state.Panel.slice();
        copy[x][y]  = 2 ;
        step =  this.getdestination() 
        console.log(step)
        if(step[0]===-1&&step[1]===-1){
          this.setState({
            Panel: copy
          })
          alert("Congratulations, you win !");
          window.location.reload(false);
        }
        move = this.Nextmovepoint(step)
        //console.log(move)
        copy[this.state.dotx][this.state.doty] = 0;
        copy [move[0]][move[1]] = 1;
        this.setState({
          Panel: copy,
          dotx : move[0],
          doty : move[1]
        })

  //      if(this.state.dotx===0||this.state.dotx===10||this.state.doty===0||this.state.doty===10){
 //         alert("Dot escaped. you lose ! try to block yellow dot move to the edge");
 //         window.location.reload(false);
//        }
      } 
     }

     Nextmovepoint(destination){
       //get the yellow dot next moving step
       let current = [this.state.dotx,this.state.doty] 
       let p1 = [current[0],current[1]+1]
       let p2 = [current[0],current[1]-1]
       let p3 = [current[0]+1,current[1]] 
       let p4 = [current[0]-1,current[1]]
       let p5 = (current[0]%2===0)?[current[0]-1,current[1]+1]:[current[0]-1,current[1]-1] 
       let p6 = (current[0]%2===0)?[current[0]+1,current[1]+1]:[current[0]+1,current[1]-1]
       //p1 to p6 are the 6 directions that the yellow dot can move  
       let add = [p1,p2,p3,p4,p5,p6]
        //remove black blocked dots
       add = add.filter( item =>
        !(this.state.Panel[item[0]][item[1]]===2)
       )   
       console.log(add)  
       //let  distance = Math.abs(destination[0]-p1[0]) + Math.abs(destination[1]-p1[1])
       let  distance = 100000

       let num = 0;
        //get the shortest dirction
        add.forEach((Points,index )=>{
             if(distance>=(Math.abs(destination[0]-Points[0]) + Math.abs(destination[1]-Points[1]))){
               console.log(distance,index)
                distance = (Math.abs(destination[0]-Points[0]) + Math.abs(destination[1]-Points[1]))
                num = index
                
             }
        })

  //     for(let i=1;i<add.length;i++){
  //      if(distance>(Math.abs(destination[0]-add[i][0]) + Math.abs(destination[1]-add[i][1]))){
 //         distance = (Math.abs(destination[0]-add[i][0]) + Math.abs(destination[1]-add[i][1]))
 //         num = i
 //                        
 //         }
 //      }
        return add[num]



     }

     getdestination(){
       //get the shorest destination on the edge of the panel based On BFS search 
       let cur = [[this.state.dotx,this.state.doty]]
       let current = []
       let add = [[]]
       
       let visited = []
       while (cur.length>0){
         let j = cur.length        
        for(let k =0;k<j;k++){
         current = cur.shift()
         
         if(current[0]===0||current[0]===10||current[1]===0||current[1]===10){
           
           return current
         }
         visited.push(current[0]*11+current[1]);
        let p1 = [current[0],current[1]+1]
        let p2 = [current[0],current[1]-1]
        let p3 = [current[0]+1,current[1]] 
        let p4 = [current[0]-1,current[1]]
        let p5 = (current[0]%2===0)?[current[0]-1,current[1]+1]:[current[0]-1,current[1]-1] 
        let p6 = (current[0]%2===0)?[current[0]+1,current[1]+1]:[current[0]+1,current[1]-1] 
        add = [p1,p2,p3,p4,p5,p6]
          
         add = add.filter( item =>
          !(visited.includes(item[0]*11+item[1])||(this.state.Panel[item[0]][item[1]]===2))
         )  
         //console.log(add)
        cur = [...cur,...add]  
      }
      }
      
      return [-1,-1]
     }

     randompoint(){
       //generate a ramdon point at the beginning of the game
      let x = Math.floor(Math.random() * 11)  
      let y = Math.floor(Math.random() * 11)
      let res = [x,y]
      while(this.state.Panel[x][y]!==0){
        x = Math.floor(Math.random() * 11)  
        y = Math.floor(Math.random() * 11) 
        res = [x,y] 
      }
      return res
    }
    


    componentDidMount(){
      let copy = this.state.Panel.slice();
      for(let i=0;i<10;i++){
      let change = this.randompoint()
      
      copy[change[0]][change[1]] = 2
      }
      this.setState({
        Panel: copy
      })
     }

     

     
     
    render() {
         
    
  //   var p = this.state.Panel.map( ( row ,x) =>{
  //      return row.map( ( cell,y )=> { 
  //          return <Dot key ={x*10+y} value={cell} onClick={this.handleClick.bind(this,x)}></Dot>
  //      } );
 //   } )
      
       
    
        return (
            <div className="container">
           {
            this.state.Panel.map( ( row ,x) =>{
                      return row.map( ( cell,y )=> { 
                          return <span key ={x*10+y} onClick={()=>this.handleClick(x,y)}> <Dot key ={x*10+y} value={cell} ></Dot></span>
                      } )
             } )

           }
           
           </div>
        )
        
    }
}

export default Panel
