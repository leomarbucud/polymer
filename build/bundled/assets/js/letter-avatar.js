(function(a,b){function c(c,d){c=c||"",d=d||60;var e,f,g,h,i,j,k=(c+"").toUpperCase().split(" ");return e=1==k.length?k[0]?k[0].charAt(0):"?":k[0].charAt(0)+k[1].charAt(0),a.devicePixelRatio&&(d*=a.devicePixelRatio),f=("?"==e?72:e.charCodeAt(0))-64,g=f%20,h=b.createElement("canvas"),h.width=d,h.height=d,i=h.getContext("2d"),i.fillStyle=["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#FF3B30","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6","#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d"][g-1],i.fillRect(0,0,h.width,h.height),i.font=Math.round(h.width/2)+"px Arial",i.textAlign="center",i.fillStyle="#FFF",i.fillText(e,d/2,d/1.5),j=h.toDataURL(),h=null,j}c.transform=function(){Array.prototype.forEach.call(b.querySelectorAll("img[avatar]"),function(a,b){b=a.getAttribute("avatar"),a.src=c(b,a.getAttribute("width")),a.removeAttribute("avatar"),a.setAttribute("alt",b)})},"function"===typeof define&&define.amd?define(function(){return c}):"undefined"===typeof exports?(window.LetterAvatar=c,b.addEventListener("DOMContentLoaded",function(){c.transform()})):("undefined"!=typeof module&&module.exports&&(exports=module.exports=c),exports.LetterAvatar=c)})(window,document);