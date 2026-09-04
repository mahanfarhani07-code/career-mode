const KEY = "careerPlayer";
const fallbackPlayer = { name: "بازیکن جدید", overall: 65, fitness: 90, sharpness: 70, fatigue: 10, popularity: 50, value: 500000, attributes: { pace:65, shooting:60, passing:60, dribbling:62, defending:45, physical:60 } };
function loadPlayer(){ try{return JSON.parse(localStorage.getItem(KEY))||null;}catch{return null;} }
function savePlayer(p){localStorage.setItem(KEY,JSON.stringify(p));}
function clamp(v,min=0,max=100){return Math.max(min,Math.min(max,Number(v)||0));}
let player=loadPlayer()||{...fallbackPlayer,attributes:{...fallbackPlayer.attributes}};
function render(){
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
 set("playerName",player.name||"بازیکن");
 set("playerDetails",`${player.startingClub||player.club||"باشگاه آزاد"} • ${player.position||"—"} • ${player.nationality||"—"}`);
 set("playerOverall",Math.round(player.overall||0));
 set("overall",Math.round(player.overall||0));set("fitness",Math.round(player.fitness||0));set("sharpness",Math.round(player.sharpness||0));set("fatigue",Math.round(player.fatigue||0));
 const energy=clamp(100-(player.fatigue||0));set("energy",`${energy}%`);const bar=document.getElementById("energyProgress");if(bar)bar.style.width=`${energy}%`;
}
function startTraining(type){
 const names={pace:"تمرین سرعت",shooting:"تمرین شوت",passing:"تمرین پاس",dribbling:"تمرین دریبل",defending:"تمرین دفاع",physical:"تمرین قدرت بدنی"};
 if(!names[type])return;
 player.attributes=player.attributes||{};const gain=2;player.attributes[type]=clamp((player.attributes[type]||player.overall||60)+gain);
 player.sharpness=clamp((player.sharpness||70)+gain);player.fatigue=clamp((player.fatigue||0)+5);if(player.fatigue>=80)player.fitness=clamp((player.fitness||90)-2);
 const vals=Object.values(player.attributes).map(Number).filter(Number.isFinite);if(vals.length)player.overall=Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
 player.value=Math.round((player.value||500000)*(1.001));savePlayer(player);render();
 const box=document.getElementById("trainingResult");const msg=document.getElementById("trainingMessage");if(box)box.style.display="block";if(msg)msg.textContent=`✅ ${names[type]} انجام شد | ${player.name}: +${gain} مهارت`;
}
function trainPlayer(type){startTraining(type);}
window.startTraining=startTraining;window.trainPlayer=trainPlayer;render();
