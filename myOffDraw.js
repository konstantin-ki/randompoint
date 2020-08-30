/*
*
*/
function offDraw(intervalID) {
 clearInterval(intervalID);	

 $('.' + CLASS_RECT_RANDOM).remove();
}