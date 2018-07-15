
import React from 'react';

function Trending(props) {

	function croppedImage(img) {
		return img + "?fit=crop&amp;h=400"
	}
	
	return (
            <div className="popular_outer">

                  <div className = "arrows left fas fa-arrow-circle-left" onClick={(e)=>{scrollScope(e,1)}}></div>
                  <div className = "arrows right fas fa-arrow-circle-right" onClick={(e)=>{scrollScope(e,-1)}}></div>

      		<div className="popular">
      		{
            		props.items.map((item, i) => {
            			return (
            				<div 
            					className="box"
            					key={i}
            					onClick={()=>{props.cb(item)}}
            				>
            					<img src = {croppedImage(item.image)}  />
            					<div className="title">
            						{item.title}
            					</div>
            				</div>
            			);
             		})
            	}
            	</div>

               
            </div>
		
	)
}






function scrollScope(e, direction) {
      let row = e.target.parentElement.getElementsByClassName("popular")[0];
      scroll(row, direction);
}



function scroll(e, direction) {
      /*
      maximum slide it popular_display's width
      minimum slide is 0
      determine slide by getting width of e off screen
      to get right side width get total width of e from starting point - popular_display
      
      */
      //direction = -1 for slide left 1 for right
      try {
            clearInterval(slide);
      }  catch(i) {
      }

      let parent = e.parentElement.parentElement;
      let parentBounds = parent.getBoundingClientRect();

      let eBounds = e.getBoundingClientRect()
      

      let wW = window.innerWidth;


      //base cases
      if (direction == 1 && eBounds.x >= 0) return;



      

      
      let boxes = e.getElementsByClassName("box");

      let distance = 0;
      //slide left case
      if (direction == -1) {
            //check boxes, if there is a box that has x past window.innerwidth then you can move left
            //to get distance to move, find width of first box + every other box after window.width
            //max distance is parent.width
            for (let b of boxes) {
                  let bX = b.getBoundingClientRect().x;
                  let bW = b.getBoundingClientRect().width + 5; //margin
                  if (bX + bW > wW) {
                        if (wW > b.getBoundingClientRect().x) {
                              distance += bW - (wW - bX);
                        } else {
                              distance += bW;
                        }
                        

                        if (distance > parentBounds.width) {
                              distance = parentBounds.width;
                              break;
                        }
                  }
            }

            distance = distance * -1;

      } else {
            for (let b of boxes) {
                  if (b.getBoundingClientRect().x < 0) {
                        distance += b.getBoundingClientRect().width + 5; //5 is margin of box

                        if (distance > parentBounds.width) {
                              distance = parentBounds.width;
                              break;
                        }
                  }
            }

            if (distance + eBounds.x > 0) {
                  distance = 0 - eBounds.x;
            }
      }

      





      let movedSoFar = 0;

      let slide = setInterval(move, 1);
      function move() {
            if (Math.abs(movedSoFar) >= Math.abs(distance)) {
                  clearInterval(slide);
                  return;
            }


            movedSoFar += direction * easing(movedSoFar, distance);
            e.style.left = (eBounds.x + movedSoFar) + 'px';

            //console.log(movedSoFar, " -- ", distance)

      }
}


function easing(current, maximum) {
      maximum = Math.abs(maximum);
      current = Math.abs(current);

      const MAX_SPEED = 3;
      const MIN_SPEED = 1;

      
      //the greater currents distance from middle the slower the speed
      
      let x = current - (maximum / 2);
      let offset = (maximum / 2) * (maximum / 2);
      //console.log('offset = ' + offset);
      let y = ((x * x) - offset) * -1;
      //if (y == 0) y = 1;
      let oldrange = offset;
      let newrange = MAX_SPEED - MIN_SPEED;
      //console.log(y)
      let newval = ((y * newrange) / oldrange) + MIN_SPEED
      return newval;


}






export default Trending;