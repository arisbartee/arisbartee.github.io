(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const i={version:"0.1a",winningScore:150,directions:{NORTH:"north",EAST:"east",WEST:"west",SOUTH:"south",FIRST:"first"}};i.Util={buildArrays:function(e){for(var t=[],n=0;n<e;n++)t.push([]);return t},buildArrayWithValue:function(e){for(var t=[],n=0;n<e;n++)t.push(0);return t}};i.Util.Bone={to_s:function(e){var t="{"+e.light+":"+e.heavy;return t+="}",t},equals:function(e,t){return e.light==t.light&&e.heavy==t.heavy},isDouble:function(e){return e.light==e.heavy},matchesHeavyEnd:function(e,t){return e.heavy==t.heavy||e.heavy==t.light},matchesLightEnd:function(e,t){return e.light==t.heavy||e.light==t.light},isSuited:function(e,t){return i.Util.Bone.matchesHeavyEnd(e,t)||i.Util.Bone.matchesLightEnd(e,t)},getValue:function(e){var t=e.light+e.heavy;return t}};i.Util.Play={markAsSpinner:function(e){return e.spinner=!0,e.matchValue=e.bone.light,e.endValue=e.bone.heavy,delete e.endConnectedTo,delete e.matchConnectedTo,e.eastConnectedTo=null,e.westConnectedTo=null,e.southConnectedTo=null,e.northConnectedTo=null,e},getValue:function(e){var t=0;return e.spinner?(e.eastConnectedTo===null||e.westConnectedTo===null)&&(t=e.bone.light+e.bone.heavy):e.endConnectedTo!==null&&e.matchConnectedTo!==null?t=0:i.Util.Bone.isDouble(e.bone)?t=e.bone.light+e.bone.heavy:(e.endConnectedTo===null&&(t+=e.endValue),e.matchConnectedTo===null&&(t+=e.matchValue)),t},to_s:function(e){var t="{";return t+="player:"+e.player,e.pass?t+=", pass:true":(e.spinner&&(t+=",spinner:"+e.spinner),t+=", bone: "+i.Util.Bone.to_s(e.bone),t+=", direction: "+e.direction),t+=",matchValue:"+e.matchValue,t+=",endValue:"+e.endValue,t+=",matchConnectedTo:"+e.matchConnectedTo,t+=",endConnectedTo:"+e.endConnectedTo,t+="}",t},setMeAsYourMatch:function(e,t){if(t.spinner){t.direction==i.directions.EAST?t.westConnectedTo=e.bone:t.direction==i.directions.WEST&&(t.eastConnectedTo=e.bone);return}else i.Util.Bone.matchesHeavyEnd(t.bone,e.bone)?(t.matchValue=t.bone.heavy,t.endValue=t.bone.light):i.Util.Bone.matchesLightEnd(t.bone,e.bone)&&(t.matchValue=t.bone.light,t.endValue=t.bone.heavy);t.matchConnectedTo=e.bone},matchOnFirst:function(e,t){e.endConnectedTo===null&&i.Util.Bone.matchesHeavyEnd(e.bone,t.bone)?e.endConnectedTo=t.bone:e.matchConnectedTo===null&&i.Util.Bone.matchesLightEnd(e.bone,t.bone)&&(e.matchConnectedTo=t.bone),i.Util.Play.setMeAsYourMatch(e,t)},matchOnSpinner:function(e,t){i.directions.EAST==t.direction&&e.eastConnectedTo===null?e.eastConnectedTo=t.bone:i.directions.WEST==t.direction&&e.westConnectedTo===null?e.westConnectedTo=t.bone:i.directions.SOUTH==t.direction&&e.southConnectedTo===null?e.southConnectedTo=t.bone:i.directions.NORTH==t.direction&&e.northConnectedTo===null&&(e.northConnectedTo=t.bone),i.Util.Play.setMeAsYourMatch(e,t)},matchBones:function(e,t,n,s,r){if(e.direction!=i.directions.FIRST&&e.direction!=s&&!e.spinner||!i.Util.Bone.isSuited(e.bone,n))return null;var a=new i.Play(t,n,s);return r&&i.Util.Play.markAsSpinner(a),e.spinner?i.Util.Play.matchOnSpinner(e,a):e.direction==i.directions.FIRST?i.Util.Play.matchOnFirst(e,a):(e.endConnectedTo=a.bone,i.Util.Play.setMeAsYourMatch(e,a)),a}};i.Util.State={to_s:function(e){var t="number of players:"+e.number_of_players;t+=",players_hand:[";for(var n=0;n<e.players_hand.length;n++){t+="[";for(var s=0;s<e.players_hand[n].length;s++)t+=i.Util.Bone.to_s(e.players_hand[n][s])+",";t+="],"}t+="],",t+="plays:[";for(var r=0;r<e.plays.length;r++)t+=i.Util.Play.to_s(e.plays[r]);t+="]",t+=",boneyard:[";for(var a=0;a<e.boneyard.length;a++)t+=i.Util.Bone.to_s(e.boneyard[a]);t+="]",t+=",players_scoring:[";for(var l=0;n<e.players_scoring.length;l++){t+="[";for(var h=0;h<e.players_scoring[l].length;h++)t+=e.players_scoring[l][h]+",";t+="],"}return t+="]",t},isDomino:function(e){for(var t=0;t<e.players_hand.length;t++)if(e.players_hand[t].length===0)return!0;return!1},isLocked:function(e){return e.number_of_players==e.passes},isGameOver:function(e){for(var t=0;t<e.players_score.length;t++)if(e.players_score[t]>=i.winningScore)return!0;return!1},isRoundOver:function(e){return i.Util.State.isLocked(e)||i.Util.State.isDomino(e)},getWinner:function(e){for(var t=0;t<e.players_score.length;t++)if(e.players_score[t]>=i.winningScore)return t;return-1},resetRound:function(e){return e.passes=0,e.players_hand=i.Util.buildArrays(e.number_of_players),e.players_played=i.Util.buildArrays(e.number_of_players),e.boneyard=[],e.spinner=null,e.plays=[],e}};i.Util.View={isDomino:function(e){for(var t=0;t<e.players_hand.length;t++)if(e.players_hand[t]===0)return!0;return!1},isLocked:function(e){return e.number_of_players==e.passes},isGameOver:function(e){for(var t=0;t<e.players_score.length;t++)if(e.players_score[t]>=i.winningScore)return!0;return!1},getWinner:function(e){for(var t=0;t<e.players_score.length;t++)if(e.players_score[t]>=i.winningScore)return t;return-1},isRoundOver:function(e){return i.Util.View.isLocked(e)||i.Util.View.isDomino(e)}};i.Errors={PASS:"pass",GAMEOVER:"gameover",SCORE:"score",LOCKED:"locked",DOMINO:"domino",MISSING:"missing",TURN:"turn",SYNC:"sync"};i.Error={};i.Error=function(e,t,n,s){this.kind=n,this.player=e,this.move=t,this.message=s};i.Error.prototype=new Error;i.Bone={};i.Bone=function(e,t){return{light:e,heavy:t}};i.State={};i.State=function(e,t){return{spinner:null,number_of_players:e,players_hand:i.Util.buildArrays(e),partners:t,plays:[],players_score:i.Util.buildArrayWithValue(e,0),players_scoring:i.Util.buildArrays(e),players_played:i.Util.buildArrays(e),current_player:-1,first_player:-1,boneyard:[],passes:0}};i.View={};i.View=function(e,t){for(var n=new Array(e.number_of_players),s=0;s<e.number_of_players;s++)n[s]=e.players_hand[s].length;return{boneyard:e.boneyard.length,hand:e.players_hand[t],number_of_players:e.number_of_players,current_player:e.current_player,passes:e.passes,plays:e.plays,me:t,players_hand:n,spinner:e.spinner,first_player:e.first_player,partners:e.partners,players_score:e.players_score}};i.Play={};i.Play=function(e,t,n){var s=!1;(t===null||typeof t>"u")&&(s=!0);var r=-1,a=-1;return i.directions.FIRST==n&&(r=t.heavy,a=t.light),{player:e,bone:t,direction:n,pass:s,spinner:!1,matchValue:a,endValue:r,matchConnectedTo:null,endConnectedTo:null}};i.Move={};i.Move=function(e,t,n){var s=0;return n!==null&&typeof n<"u"&&(s=n),{bone:e,direction:t,score:s}};i.Commentary={};i.Commentary=function(){return{winner:!1,domino:!1,locked:!1,lays:!1,pass:!1,downs:!1,player:-1,points:0,player_to_eat:-1,eat_points:0,bone:":",direction:null}};i.Error={};i.Errors={PASS:"pass",GAMEOVER:"gameover",SCORE:"score",LOCKED:"locked",DOMINO:"domino",MISSING:"missing",TURN:"turn",SYNC:"sync"};i.Error=function(e,t,n,s){this.kind=n,this.player=e,this.move=t,this.message=s};i.Error.prototype=new Error;i.Pen={};i.Pen=function(){this.round=function(e){if(e%5===0)return e;for(var t=e,n=e;t%5!==0;)t++;for(;n%5!==0;)n--;var s=t-e,r=e-n;return s<r?t:n},this.getTheCount=function(e){for(var t=0,n=0;n<e.length;n++)e[n].pass||(t+=i.Util.Play.getValue(e[n]));return t%5!==0&&(t=0),t},this.getTheDominoCount=function(e){for(var t=0,n=0;n<e.length;n++)for(var s=0;s<e[n].length;s++)t+=e[n][s].light+e[n][s].heavy;return this.round(t)},this.getTheLockedCounts=function(e){for(var t=new Array(e.length),n=200,s=0,r=new Array(e.length),a=0;a<e.length;a++){for(var l=0,h=0;h<e[a].length;h++)l+=e[a][h].light+e[a][h].heavy;l<n&&(n=l),t[a]=l}for(var c=0;c<t.length;c++)t[c]!=n&&(s+=t[c]);for(var u=0;u<t.length;u++)t[u]==n?r[u]=this.round(s):r[u]=0;return r}};i.Scanner={};i.Scanner=function(e){this.plays=e};i.Scanner.prototype.isPlayable=function(e){if(this.plays.length===0)return!0;for(var t=0;t<this.plays.length;t++)if(!this.plays[t].pass){var n=this.plays[t];if(this.availableForPlay(n)&&(this.plays[t].spinner&&i.Util.Bone.isSuited(e,n.bone)||n.endConnectedTo===null&&(e.light==n.endValue||e.heavy==n.endValue)||n.matchConnectedTo===null&&(e.light==n.matchValue||e.heavy==n.matchValue)))return!0}return!1};i.Scanner.prototype.availableForPlay=function(e){return e.spinner&&(e.southConnectedTo===null||e.northConnectedTo===null||e.eastConnectedTo===null||e.westConnectedTo===null)?!0:!e.spinner&&(e.endConnectedTo===null||e.matchConnectedTo===null)};i.Scanner.prototype.getPlayableEnds=function(){for(var e=[],t=0;t<this.plays.length;t++)this.plays[t].pass||this.availableForPlay(this.plays[t])&&e.push(this.plays[t]);return e};i.Scanner.prototype.isHandPlayable=function(e){for(var t=0;t<e.length;t++)if(this.isPlayable(e[t]))return!0;return!1};i.Scanner.prototype.getAvailableMoves=function(e){var t=[];if(this.plays.length===0){for(var n=0;n<e.length;n++)t.push(i.Move(e[n],i.directions.FIRST));return t}for(var s=this.getPlayableEnds(),r=0;r<e.length;r++)for(var a=0;a<s.length;a++)i.Util.Bone.isSuited(e[r],s[a].bone)&&(s[a].spinner?s[a].eastConnectedTo===null||s[a].westConnectedTo===null?(s[a].eastConnectedTo===null&&t.push(i.Move(e[r],i.directions.EAST)),s[a].westConnectedTo===null&&t.push(i.Move(e[r],i.directions.WEST))):(s[a].northConnectedTo===null&&t.push(i.Move(e[r],i.directions.NORTH)),s[a].southConnectedTo===null&&t.push(i.Move(e[r],i.directions.SOUTH))):s[a].direction==i.directions.FIRST?s[a].endConnectedTo===null&&(e[r].light==s[a].endValue||e[r].heavy==s[a].endValue)?t.push(i.Move(e[r],i.directions.EAST)):s[a].matchConnectedTo===null&&(e[r].light==s[a].matchValue||e[r].heavy==s[a].matchValue)&&t.push(i.Move(e[r],i.directions.WEST)):s[a].endConnectedTo===null&&(e[r].light==s[a].endValue||e[r].heavy==s[a].endValue)&&t.push(i.Move(e[r],s[a].direction)));return t};i.Scanner.prototype.getTargetPlayFor=function(e){for(var t=this.getPlayableEnds(),n=null,s=null,r=t.length-1;r>=0&&!(i.Util.Bone.isSuited(t[r].bone,e.bone)&&(t[r].spinner&&(e.direction==i.directions.NORTH||i.directions.SOUTH==e.direction)||e.direction==t[r].direction&&(t[r].endConnectedTo===null||t[r].endConnectedTo===void 0)&&(e.bone.light==t[r].endValue||e.bone.heavy==t[r].endValue)?s=t[r]:t[r].direction==i.directions.FIRST&&((t[r].endConnectedTo===null||t[r].endConnectedTo===void 0)&&(e.bone.light==t[r].endValue||e.bone.heavy==t[r].endValue)||(t[r].matchConnectedTo===null||t[r].matchConnectedTo===void 0)&&(e.bone.light==t[r].matchValue||e.bone.heavy==t[r].matchValue))&&(n=t[r]),s||n));r--);return s||n||null};i.Analysis={};i.Analysis=function(e){this.suits=[0,0,0,0,0,0,0],this.moves=[],this.view=e,this.scanner=new i.Scanner(this.view.plays),this.pen=new i.Pen,this.reset(),this.canPlay=function(){return this.moves.length>0}};i.Analysis.prototype.getValueForMove=function(e){var t=this.view.plays,n=0;if(t.length===0)n=i.Util.Bone.getValue(e.bone);else{var s=this.scanner.getPlayableEnds(),r=this.scanner.getTargetPlayFor(e);if(r===null)return n;for(var a=0;a<s.length;a++)i.Util.Bone.equals(s[a].bone,r.bone)?(r.spinner?n+=i.Util.Play.getValue(r):i.directions.FIRST==r.direction&&(r.matchConnectedTo===null&&i.Util.Bone.matchesHeavyEnd(r.bone,e.bone)?n+=r.bone.light:r.endConnectedTo===null&&i.Util.Bone.matchesLightEnd(r.bone,e.bone)&&(n+=r.bone.heavy)),i.Util.Bone.isDouble(e.bone)?n+=i.Util.Bone.getValue(e.bone):i.Util.Bone.matchesHeavyEnd(e.bone,r.bone)?n+=e.bone.light:i.Util.Bone.matchesLightEnd(e.bone,r.bone)&&(n+=e.bone.heavy)):n+=i.Util.Play.getValue(s[a])}return n%5!==0&&(n=0),n};i.Analysis.prototype.reset=function(){this.suits=[0,0,0,0,0,0,0];for(var e=0;e<this.view.plays.length;e++)this.view.plays[e].pass||(i.Util.Bone.isDouble(this.view.plays[e].bone)?this.suits[this.view.plays[e].bone.light]+=1:(this.suits[this.view.plays[e].bone.light]+=1,this.suits[this.view.plays[e].bone.heavy]+=1));this.moves=[],this.moves=this.scanner.getAvailableMoves(this.view.hand);for(var t=0;t<this.moves.length;t++){var n=this.getValueForMove(this.moves[t]);this.moves[t].score=n}};i.Commentator={};i.Commentator=function(e){this.names=e,this.pen=new i.Pen,this.comment=new i.Commentary};i.Commentator.prototype.getCommentary=function(e){if(this.comment=new i.Commentary,e===null||e.plays.length===0)return this.comment;try{this.announceMove(e)}catch(t){throw t.message="get commentary: "+t.message,t}return this.comment};i.Commentator.prototype.convertToPhrase=function(e){return e&&e.length>0?e.join(" "):""};i.Commentator.prototype.announceMove=function(e){var t=this.getLastPlay(e);if(i.Util.State.isGameOver(e))this.comment.player=i.Util.State.getWinner(e),this.comment.winner=!0,i.Util.State.isLocked(e)?this.sayLockedGame(e):this.sayRegularMove(e);else if(i.Util.State.isDomino(e)){this.comment.player=t.player,this.comment.domino=!0;var n=this.lastScore(e.players_scoring[t.player]);n>0&&(this.comment.points=n)}else i.Util.State.isLocked(e)?this.sayLockedGame(e):t.pass?(this.comment.player=t.player,this.comment.pass=!0):this.sayRegularMove(e)};i.Commentator.prototype.sayLockedGame=function(e){for(var t=-1,n=0;n<e.plays.length;n++)e.plays[n].pass||(t=e.plays[n].player);if(t==-1)throw e.to_s();this.comment.player=t,this.comment.locked=!0;for(var s=this.pen.getTheLockedCounts(e.players_hand),r=0;r<s.length;r++)s[r]!==0&&(this.comment.player_to_eat=r,this.comment.eat_points=s[1])};i.Commentator.prototype.sayRegularMove=function(e){var t=this.getLastPlay(e);this.comment.player=t.player,this.comment.bone=t.bone.light+":"+t.bone.heavy,e.plays.length==1?this.comment.downs=!0:(this.comment.lays=!0,this.comment.direction=t.direction);var n=this.pen.getTheCount(e.plays);n>0&&(this.comment.points=n)};i.Commentator.prototype.getPlayersName=function(e){return this.names[e]};i.Commentator.prototype.getLastPlay=function(e){var t=e.plays[e.plays.length-1];return t};i.Commentator.prototype.lastScore=function(e){var t=0,n=e.length-1;return n>=0&&(t=e[n]),t};i.GamePlay={};i.GamePlay=function(e){this.state=e,this.pen=new i.Pen};i.GamePlay.prototype.startRound=function(){var e=9;this.state.number_of_players==4&&(e=7),this.state.boneyard=[new i.Bone(0,0),new i.Bone(0,1),new i.Bone(0,2),new i.Bone(0,3),new i.Bone(0,4),new i.Bone(0,5),new i.Bone(0,6),new i.Bone(1,1),new i.Bone(1,2),new i.Bone(1,3),new i.Bone(1,4),new i.Bone(1,5),new i.Bone(1,6),new i.Bone(2,2),new i.Bone(2,3),new i.Bone(2,4),new i.Bone(2,5),new i.Bone(2,6),new i.Bone(3,3),new i.Bone(3,4),new i.Bone(3,5),new i.Bone(3,6),new i.Bone(4,4),new i.Bone(4,5),new i.Bone(4,6),new i.Bone(5,5),new i.Bone(5,6),new i.Bone(6,6)],this.state.boneyard.sort(function(){return .5-Math.random()});for(var t=0;t<this.state.players_hand.length;t++)for(var n=0;n<e;n++)this.state.players_hand[t].push(this.state.boneyard.pop())};i.GamePlay.prototype.pullFromBoneyard=function(){this.state.players_hand[this.state.current_player].push(this.state.boneyard.pop())};i.GamePlay.prototype.whatIsFirstPlay=function(){for(var e=[6,5,4,3,2,1,0],t={player:-1,move:null},n=0;n<e.length;n++)for(var s=0;s<this.state.players_hand.length;s++)for(var r=0;r<this.state.players_hand[s].length;r++)if(i.Util.Bone.isDouble(this.state.players_hand[s][r])&&this.state.players_hand[s][r].light==e[n])return t.player=s,t.move=new i.Move(this.state.players_hand[s][r],i.directions.FIRST),t;return t};i.GamePlay.prototype.pass=function(e){var t=new i.Analysis(new i.View(this.state,e));if(t.canPlay())throw new i.Error(e,null,i.Errors.TURN,"player "+e+" can still play");this.state.passes+=1;var n=new i.Play(e);if(this.state.plays.push(n),!i.Util.State.isLocked(this.state))this.nextPlayer();else for(var s=this.pen.getTheLockedCounts(this.state.players_hand),r=0;r<s.length;r++)s[r]>0&&(this.state.players_score[r]+=s[r],this.state.players_scoring[r].push(s[r]))};i.GamePlay.prototype.receivePlay=function(e,t){if(i.Util.State.isGameOver(this.state))throw new i.Error(e,t,i.Errors.GAMEOVER,"The game is over.");if(i.Util.State.isLocked(this.state))throw new i.Error(e,t,i.Errors.LOCKED,"The game is locked.");if(i.Util.State.isRoundOver(this.state))throw new i.Error(e,t,i.Errors.DOMINO,"The round is over.");if(t.bone===null)throw new i.Error(e,t,i.Errors.MISSING,"The bone is missing");if(t.direction===null)throw new i.Error(e,t,i.Errors.MISSING,"The direction is missing.");if(e!=this.state.current_player)throw new i.Error(e,t,i.Errors.TURN,"Wrong player "+e+" and "+this.state.current_player);for(var n=0;n<this.state.plays.length;n++)if(!this.state.plays[n].pass&&i.Util.Bone.equals(this.state.plays[n].bone,t.bone))throw new i.Error(e,t,i.Errors.SYNC,"The bone "+t.bone.light+":"+t.bone.heavy+" has already been played.");if(this.layBone(e,t),this.state.passes=0,!i.Util.State.isGameOver(this.state))if(i.Util.State.isDomino(this.state)){var s=this.pen.getTheDominoCount(this.state.players_hand);this.state.players_score[this.state.current_player]+=s,this.state.players_scoring[this.state.current_player].push(s)}else this.nextPlayer()};i.GamePlay.prototype.layBone=function(e,t){var n=new i.Scanner(this.state.plays),s=null;if(this.state.plays.length===0)t.direction=i.directions.FIRST;else if(s=n.getTargetPlayFor(t),s===null)throw new i.Error(e,t,i.Errors.TURN,"bad play "+t.bone.light+":"+t.bone.heavy+" in "+t.direction+" direction");var r=this.removeFromHand(e,t.bone);if(r===null)throw new i.Error(e,null,i.Errors.TURN,"The bone "+t.bone.light+":"+t.bone.heavy+" is not in the players hand.");this.state.players_played[e].push(r),this.state.plays.length===0?(this.state.plays[0]=new i.Play(e,r,t.direction),i.Util.Bone.isDouble(r)&&(i.Util.Play.markAsSpinner(this.state.plays[0]),this.state.spinner=this.state.plays[0])):this.state.spinner===null&&i.Util.Bone.isDouble(r)?(this.state.spinner=i.Util.Play.matchBones(s,e,r,t.direction,!0),this.state.plays.push(this.state.spinner)):this.state.plays.push(i.Util.Play.matchBones(s,e,r,t.direction,!1));var a=this.pen.getTheCount(this.state.plays);a>0&&(this.state.players_score[e]+=a,this.state.players_scoring[e].push(a))};i.GamePlay.prototype.nextPlayer=function(){if(!i.Util.State.isRoundOver(this.state))return this.state.current_player+=1,this.state.current_player==this.state.players_hand.length&&(this.state.current_player=0),this.state.current_player};i.GamePlay.prototype.removeFromHand=function(e,t){for(var n=0;n<this.state.players_hand[e].length;n++)if(i.Util.Bone.equals(t,this.state.players_hand[e][n])){var s=this.state.players_hand[e].splice(n,1);return s[0]}return null};i.Android={};i.Android=function(e){this.view=e,this.analysis=new i.Analysis(this.view),this.player=function(){return this.view.me},this.canPlay=function(){return this.analysis.moves.length>0},this.getMove=function(){return this.canPlay()?(this.analysis.moves.sort(function(t,n){return n.score-t.score}),this.analysis.moves[0]):null}};i.GameController={};i.GameController=function(e){this.state=e,this.game=new i.GamePlay(this.state)};i.GameController.prototype.startTheHand=function(e,t){if(i.Util.State.resetRound(this.state),this.game.startRound(),e){var n=this.game.whatIsFirstPlay();this.state.current_player=n.player,this.state.first_player=n.player,this.game.receivePlay(n.player,n.move)}else this.state.first_player=t,this.state.current_player=t};i.GameController.prototype.turn=function(e,t){if(e>=0&&e<4)t==null?this.state.boneyard.length===0?this.game.pass(e):this.game.pullFromBoneyard():this.game.receivePlay(e,t);else{for(var n=this.getMoveFromAndroid();n===null&&this.state.boneyard.length>0;)try{this.game.pullFromBoneyard(),n=this.getMoveFromAndroid()}catch(s){throw s.message="Android pull: "+s.message,s}if(n===null)try{this.game.pass(this.state.current_player)}catch(s){throw s.message="Android pass: "+s.message,s}else try{this.game.receivePlay(this.state.current_player,n)}catch(s){throw s.message="Android play: "+s.message,s}}};i.GameController.prototype.getMoveFromAndroid=function(){var e=null;try{var t=new i.View(this.state,this.state.current_player),n=new i.Android(t);e=n.getMove()}catch(s){throw s.message="Android get move: "+s.message,s}return e};i.GameController.prototype.isStopped=function(){var e=!1;return e=i.Util.State.isGameOver(this.state)||i.Util.State.isLocked(this.state)||i.Util.State.isRoundOver(this.state),e};const o={number_of_players:2,delayedEvent:null,domino:{width:20,height:40},overflow_direction:{east:"south",west:"north",north:"west",south:"east"},isTall:function(e,t,n){return e==t&&(n==i.directions.EAST||n==i.directions.WEST)?!0:e==t&&(n==i.directions.NORTH||n==i.directions.SOUTH)||e!=t&&(n==i.directions.EAST||n==i.directions.WEST)?!1:e!=t&&(n==i.directions.NORTH||n==i.directions.SOUTH)||e==t&&n==i.directions.FIRST},delayEvent:function(e,t,n){o.delayedEvent&&o.clearDelayedEvents(),o.delayedEvent=setTimeout(function(){n(t)},e)},clearDelayedEvents:function(){clearTimeout(o.delayedEvent),o.delayedEvent=null}},d={VFACES:["","one","vtwo","vthree","four","five","vsix"],HFACES:["","one","htwo","hthree","four","five","hsix"],createTallDomino:function(e,t,n,s){var r=["","one","vtwo","vthree","four","five","vsix"],a="bone";a+=e<t?e+""+t:t+""+e;var l='<div id="'+a+'" class="vbone"';return typeof n!=null&&typeof s<"u"&&(l+=' style="position:absolute;left:'+n+"px;top:"+s+'px;"'),l+='><div class="die"><div class="'+r[e]+'"/>',l+='<div class="'+r[t]+' v2nd"/>',l+="</div></div>",l},createWideDomino:function(e,t,n,s){var r=["","one","htwo","hthree","four","five","hsix"],a="bone";a+=e<t?e+""+t:t+""+e;var l='<div id="'+a+'" class="hbone"';return typeof n!=null&&typeof s<"u"&&(l+='style="position:absolute;left:'+n+"px;top:"+s+'px;"'),l+='><div class="die"><div class="'+r[e]+'"/>',l+='<div class="'+r[t]+' h2nd"/>',l+="</div></div>",l},createWideHiliteDomino:function(e,t,n){var s='<div id="bone_'+e+'" class="hbonegrey"';return typeof t!=null&&typeof n<"u"&&(s+='style="position:absolute;left:'+t+"px;top:"+n+'px;"'),s+='><div class="die"><div class="grey">',s+='</div><div class="grey h2nd">',s+="</div></div></div>",s},createTallHiliteDomino:function(e,t,n){var s='<div id="bone_'+e+'" class="vbonegrey"';return typeof t!=null&&typeof n<"u"&&(s+='style="position:absolute;left:'+t+"px;top:"+n+'px;"'),s+='><div class="die"><div class="grey">',s+='</div><div class="grey v2nd">',s+="</div></div></div>",s}};o.EastAxis={};o.EastAxis=function(){this.overflow=!1,this.x=-1,this.y=-1,this.direction=i.directions.EAST};o.EastAxis.prototype.getHTML=function(e,t,n){this.x=this.getX(e),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var s="";return this.overflow?o.isTall(t,n,i.directions.EAST)?s=d.createWideDomino(t,n,this.x,this.y):s=d.createTallDomino(t,n,this.x,this.y):o.isTall(t,n,i.directions.EAST)?s=d.createTallDomino(t,n,this.x,this.y):s=d.createWideDomino(t,n,this.x,this.y),s};o.EastAxis.prototype.adjustForBoard=function(e,t,n){this.x+o.domino.height>=o.width&&t!=n&&(this.overflow=!0,e.bone.light==e.bone.heavy?(this.x=e.x,this.y=e.y+o.domino.height):(this.x-=o.domino.width-1,this.y+=o.domino.width))};o.EastAxis.prototype.getX=function(e){var t=0;return e.bone.light==e.bone.heavy?t=e.x+o.domino.width:t=e.x+o.domino.height,t};o.EastAxis.prototype.getY=function(e,t,n){var s=0;return e.bone.light==e.bone.heavy?s=e.y+o.domino.width/2:t==n?s=e.y-o.domino.width/2:s=e.y,s};o.EastAxis.prototype.hilite=function(e,t,n,s){this.x=this.getX(e),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var r="";return this.overflow?o.isTall(t,n,i.directions.EAST)?r=d.createWideHiliteDomino(s,this.x,this.y):r=d.createTallHiliteDomino(s,this.x,this.y):o.isTall(t,n,i.directions.EAST)?r=d.createTallHiliteDomino(s,this.x,this.y):r=d.createWideHiliteDomino(s,this.x,this.y),r};const T=o.EastAxis;o.WestAxis={};o.WestAxis=function(){this.overflow=!1,this.x=-1,this.y=-1,this.direction=i.directions.WEST};o.WestAxis.prototype.getHTML=function(e,t,n){this.x=this.getX(e,t,n),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var s="";return this.overflow?o.isTall(t,n,i.directions.WEST)?s=d.createWideDomino(t,n,this.x,this.y):s=d.createTallDomino(n,t,this.x,this.y):o.isTall(t,n,i.directions.WEST)?s=d.createTallDomino(n,t,this.x,this.y):s=d.createWideDomino(n,t,this.x,this.y),s};o.WestAxis.prototype.adjustForBoard=function(e,t,n){this.x-o.domino.height/3<=0&&t!=n&&(this.overflow=!0,e.bone.light==e.bone.heavy?(this.x=e.x,this.y=e.y-o.domino.height):(this.x+=o.domino.width,this.y-=o.domino.width))};o.WestAxis.prototype.getX=function(e,t,n){var s=0;return t==n?s=e.x-o.domino.width:s=e.x-o.domino.height,s};o.WestAxis.prototype.getY=function(e,t,n){var s=0;return e.bone.light==e.bone.heavy?s=e.y+o.domino.width/2:t==n?s=e.y-o.domino.width/2:s=e.y,s};o.WestAxis.prototype.hilite=function(e,t,n,s){this.x=this.getX(e,t,n),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var r="";return this.overflow?o.isTall(t,n,i.directions.WEST)?r=d.createWideHiliteDomino(s,this.x,this.y):r=d.createTallHiliteDomino(s,this.x,this.y):o.isTall(t,n,i.directions.WEST)?r=d.createTallHiliteDomino(s,this.x,this.y):r=d.createWideHiliteDomino(s,this.x,this.y),r};const S=o.WestAxis;o.NorthAxis={};o.NorthAxis=function(){this.overflow=!1,this.x=-1,this.y=-1,this.direction=i.directions.NORTH};o.NorthAxis.prototype.getHTML=function(e,t,n){this.x=this.getX(e,t,n),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var s="";return this.overflow?o.isTall(t,n,i.directions.NORTH)?s=d.createWideDomino(t,n,this.x,this.y):s=d.createTallDomino(n,t,this.x,this.y):o.isTall(t,n,i.directions.NORTH)?s=d.createTallDomino(n,t,this.x,this.y):s=d.createWideDomino(n,t,this.x,this.y),s};o.NorthAxis.prototype.adjustForBoard=function(e,t,n){this.y-o.domino.width/2<=0&&(this.overflow=!0,e.bone.light==e.bone.heavy?(this.x=e.x+o.domino.height,this.y=e.y):t==n?(this.x=e.x+o.domino.width,this.y+=6):(this.x=e.x+o.domino.width,this.y+=o.domino.height+1))};o.NorthAxis.prototype.getX=function(e,t,n){var s=0;return!e.spinner&&e.bone.light==e.bone.heavy?s=e.x+o.domino.width/2:t==n?s=e.x-o.domino.width/2:s=e.x,s};o.NorthAxis.prototype.getY=function(e,t,n){var s=0;return t==n?s=e.y-o.domino.width:s=e.y-o.domino.height,s};o.NorthAxis.prototype.hilite=function(e,t,n,s){this.x=this.getX(e,t,n),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var r="";return this.overflow?o.isTall(t,n,i.directions.NORTH)?r=d.createWideHiliteDomino(s,this.x,this.y):r=d.createTallHiliteDomino(s,this.x,this.y):o.isTall(t,n,i.directions.NORTH)?r=d.createTallHiliteDomino(s,this.x,this.y):r=d.createWideHiliteDomino(s,this.x,this.y),r};const E=o.NorthAxis;o.SouthAxis={};o.SouthAxis=function(){this.overflow=!1,this.x=-1,this.y=-1,this.direction=i.directions.SOUTH};o.SouthAxis.prototype.getHTML=function(e,t,n){this.x=this.getX(e,t,n),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var s="";return this.overflow?o.isTall(t,n,i.directions.SOUTH)?s=d.createWideDomino(n,t,this.x,this.y):s=d.createTallDomino(n,t,this.x,this.y):o.isTall(t,n,i.directions.SOUTH)?s=d.createTallDomino(t,n,this.x,this.y):s=d.createWideDomino(n,t,this.x,this.y),s};o.SouthAxis.prototype.adjustForBoard=function(e,t,n){this.y+o.domino.height>=o.height&&t!=n&&(this.overflow=!0,e.bone.light==e.bone.heavy?(this.x=e.x-o.domino.height,this.y=e.y):t==n?(this.x=e.x,this.y=e.y):(this.x=e.x-o.domino.height,this.y=e.y+o.domino.width))};o.SouthAxis.prototype.getX=function(e,t,n){var s=0;return t==n?s=e.x-o.domino.width/2:!e.spinner&&e.bone.light==e.bone.heavy?s=e.x+o.domino.width/2:s=e.x,s};o.SouthAxis.prototype.getY=function(e){var t=0;return!e.spinner&&e.bone.light==e.bone.heavy?t=e.y+o.domino.width:t=e.y+o.domino.height,t};o.SouthAxis.prototype.hilite=function(e,t,n,s){this.x=this.getX(e,t,n),this.y=this.getY(e,t,n),this.adjustForBoard(e,t,n);var r="";return this.overflow?o.isTall(t,n,i.directions.SOUTH)?r=d.createWideHiliteDomino(s,this.x,this.y):r=d.createTallHiliteDomino(s,this.x,this.y):o.isTall(t,n,i.directions.SOUTH)?r=d.createTallHiliteDomino(s,this.x,this.y):r=d.createWideHiliteDomino(s,this.x,this.y),r};const _=o.SouthAxis;o.EastAxis=T;o.WestAxis=S;o.NorthAxis=E;o.SouthAxis=_;o.Board={};o.Board=function(e,t,n){this.id=e,this.spinner=null,this.hilitedHand=null,this.width=t,this.height=n,o.height=this.height,o.width=this.width,this.overflow={east:!1,west:!1,north:!1,south:!1}};o.Board.prototype.reset=function(){const e=document.getElementById(this.id);e&&(e.innerHTML=""),this.spinner=null,this.hilitedHand=null,this.overflow[i.directions.EAST]=!1,this.overflow[i.directions.WEST]=!1,this.overflow[i.directions.NORTH]=!1,this.overflow[i.directions.SOUTH]=!1};o.Board.prototype.add=function(e,t){var n=0,s=0,r="";if(e.direction==i.directions.FIRST){var a=o.isTall(e.light,e.heavy,e.direction)?10:20,l=o.isTall(e.light,e.heavy,e.direction)?3:13;n=this.width/2-a-o.domino.width,s=this.height/2-l-o.domino.height,o.isTall(e.matchValue,e.endValue,e.direction)?r=d.createTallDomino(e.matchValue,e.endValue,n,s):r=d.createWideDomino(e.matchValue,e.endValue,n,s)}else{var h=this.getLastPlay(e,t),c=null;e.direction==i.directions.EAST||e.direction==i.directions.FIRST?this.overflow[e.direction]?c=new o.SouthAxis:c=new o.EastAxis:e.direction==i.directions.WEST?this.overflow[e.direction]?c=new o.NorthAxis:c=new o.WestAxis:e.direction==i.directions.NORTH?this.overflow[e.direction]?c=new o.EastAxis:c=new o.NorthAxis:e.direction==i.directions.SOUTH&&(this.overflow[e.direction]?c=new o.WestAxis:c=new o.SouthAxis),r=c.getHTML(h,e.matchValue,e.endValue),n=c.x,s=c.y,this.overflow[e.direction]||(this.overflow[e.direction]=c.overflow)}e.x=n,e.y=s;const u=document.getElementById(this.id);u&&u.insertAdjacentHTML("beforeend",r)};o.Board.prototype.getLastPlay=function(e,t){var n=null;if(e.spinner?e.eastConnectedTo==null&&e.westConnectedTo!=null?n=e.westConnectedTo:e.westConnectedTo==null&&e.eastConnectedTo!=null&&(n=e.eastConnectedTo):e.endConnectedTo==null&&e.matchConnectedTo!=null?n=e.matchConnectedTo:e.matchConnectedTo==null&&e.endConnectedTo!=null&&(n=e.endConnectedTo),n==null)return null;for(var s=null,r=0;r<t.length;r++)t[r].pass||t[r].bone.light==n.light&&t[r].bone.heavy==n.heavy&&(s=t[r]);return s};o.Board.prototype.getLastPlayForMove=function(e,t){for(var n=null,s=t.length-1;s>=0&&!(i.Util.Bone.isSuited(e.bone,t[s].bone)&&((t[s].spinner&&(e.direction==i.directions.NORTH||e.direction==i.directions.SOUTH)||t[s].direction==i.directions.FIRST||e.direction==t[s].direction)&&(n=t[s]),n));s--);return n};o.Board.prototype.showPlayablePositions=function(e,t){document.getElementById("bone_"+e.direction)&&this.hidePlayablePositions();var s=null,r=0,a=0,l="";if(t.length==0){var h=o.isTall(e.bone.light,e.bone.heavy,e.direction)?10:20,c=o.isTall(e.bone.light,e.bone.heavy,e.direction)?3:13,u=this.width/2-h-o.domino.width,f=this.height/2-c-o.domino.height;a=e.bone.heavy,r=e.bone.light,o.isTall(r,a,e.direction)?l=d.createTallHiliteDomino(i.directions.FIRST,u,f):l=d.createWideHiliteDomino(i.directions.FIRST,u,f);const g=document.getElementById(this.id);g&&g.insertAdjacentHTML("beforeend",l);return}var m=new i.Scanner(t),p=m.getTargetPlayFor(e);e.bone.light==p.bone.light||e.bone.light==p.bone.heavy?(r=e.bone.light,a=e.bone.heavy):(r=e.bone.heavy,a=e.bone.light),e.direction==i.directions.EAST||e.direction==i.directions.FIRST?this.overflow[e.direction]?s=new o.SouthAxis:s=new o.EastAxis:e.direction==i.directions.WEST?this.overflow[e.direction]?s=new o.NorthAxis:s=new o.WestAxis:e.direction==i.directions.NORTH?this.overflow[e.direction]?s=new o.EastAxis:s=new o.NorthAxis:e.direction==i.directions.SOUTH&&(this.overflow[e.direction]?s=new o.WestAxis:s=new o.SouthAxis),l=s.hilite(p,r,a,e.direction),this.hilitedHand&&i.Util.Bone.equals(this.hilitedHand,e.bone)||(this.hilitedHand=e.bone,this.hidePlayablePositions());const y=document.getElementById(this.id);y&&y.insertAdjacentHTML("beforeend",l)};o.Board.prototype.hidePlayablePositions=function(){[i.directions.EAST,i.directions.WEST,i.directions.SOUTH,i.directions.NORTH,i.directions.FIRST].forEach(t=>{const n=document.getElementById("bone_"+t);n&&n.remove()})};const x=o.Board;o.Hand={};o.Hand=function(e){this.id="#"+e,this.hilited=null};o.Hand.prototype.render=function(e){const t=document.querySelector(this.id);if(!t)return;t.innerHTML="";let n="";for(let s=0;s<e.length;s++)n+='<div><table cellspacing="0" cellpadding="0" border="0"><tr>',n+='<td><div id="handhold">',n+=d.createTallDomino(e[s].light,e[s].heavy),n+="</div></td>",s++,s<e.length&&(n+='<td><div id="handhold">',n+=d.createTallDomino(e[s].light,e[s].heavy),n+="</div></td>"),n+="</tr></table></div>";t.innerHTML=n};o.Hand.prototype.widerender=function(e){const t=document.querySelector(this.id);if(!t)return;t.innerHTML="";let n=0,s='<div><table cellspacing="0" cellpadding="0" border="0"><tr>';for(;n<9&&n<e.length;)s+="<td>",s+=d.createTallDomino(e[n].light,e[n].heavy),s+="</td>",n++;if(s+="<tr></table><div>",n<e.length){for(s+='<div><table cellspacing="0" cellpadding="0" border="0"><tr>';n<e.length;)s+="<td>",s+=d.createTallDomino(e[n].light,e[n].heavy),s+="</td>",n++;s+="<tr></table><div>"}t.innerHTML=s};const B=o.Hand;function C({state:e,player_names:t,callMoney:n}){const s=e.players_hand.length;return`<div id="gamerow">
  <table cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td>
        <div id="gamerow-left">
          <div id="message-region">
            <div class="commentary">&nbsp;</div>
          </div>
          <div id="board" class="inner-board_content">
          </div>
      </td>
      <td>
        <div id="gamerow-right">
          <div id="upper-region">
            <div id="data-region">
              <div id="top-data-region">
                <table cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td>
                      <div class="column-data-region">
                        ${s>2?`
                        <!-- if (state.players_hand.length > 2) { -->
                        <div class="player-info"></div>
                        <div class="player-info"></div>
                        <!-- html += this.renderScore(1, names); -->
                        <div class="player-info">
                          <div id="player-seat-1">
                            <div class="player-name"><span class="player-name">${t[1]}</span></div>
                            <div><span id="player-score-1" class="player-score">0</span></div>
                          </div>
                        </div>
                        <!-- } -->
                        `:""}
                      </div>
                    </td>
                    <td>
                      <div class="column-data-region">
                        ${s>2?`
                        <div class="player-info">
                          <div id="player-seat-2">
                            <div class="player-name"><span class="player-name">${t[2]}</span></div>
                            <div><span id="player-score-2" class="player-score">0</span></div>
                          </div>
                        </div>
                        `:""}
                        ${s<=2?`<div class="player-info">
                          <div id="player-seat-1">
                            <div class="player-name"><span class="player-name">${t[1]}</span></div>
                            <div><span id="player-score-1" class="player-score">0</span></div>
                          </div>
                        </div>
                        `:""}
                        <div id="handbox-data-region">
                          <!-- html += this.renderHandBox(state); -->
                          <div>
                            <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td>
                                  <div class="handcount"></div>
                                </td>
                                <td>
                                  ${s>2?`
                                  <div class="handcount bonecount"><span id="player-hand-2">0</span></div>
                                  `:""}
                                  ${s<=2?`<div class="handcount bonecount"><span id="player-hand-1">0</span></div>
                                  `:""}
                                </td>
                                <td>
                                  <div class="handcount"></div>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div>
                            <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td>
                                  ${s>2?`
                                  <div class="handcount bonecount"><span id="player-hand-1">0</span></div>
                                  `:""}
                                  ${s<=2?`<div class="handcount bonecount"><span id="player-hand-1"></span></div>
                                  `:""}
                                </td>
                                <td>
                                  <div class="handcount"></div>
                                </td>
                                <td>
                                  ${s==4?`
                                  <div class="handcount bonecount"><span id="player-hand-3">0</span></div>
                                  `:""}
                                  ${s!=4?`
                                  <div class="handcount bonecount"><span id="player-hand-3"></span></div>
                                  `:""}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div>
                            <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td>
                                  <div class="handcount"></div>
                                </td>
                                <td>
                                  <div class="handcount bonecount"><span id="player-hand-0">0</span></div>
                                </td>
                                <td>
                                  <div class="handcount"></div>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div class="player-info">
                          <div id="player-seat-0">
                            <div class="player-name"><span class="player-name">${t[0]}</span></div>
                            <div><span id="player-score-0" class="player-score">0</span></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="column-data-region">

                        <div class="player-info">
                          <div class="player-name"><span class="player-name">Boneyard</span></div>
                          <div><span id="boneyard-value" class="player-score"></span></div>
                        </div>

                        ${s>3?`
                        <div class="player-info"></div>
                        <div class="player-info">
                          <div id="player-seat-3">
                            <div class="player-name"><span class="player-name">${t[3]}</span></div>
                            <div><span id="player-score-3" class="player-score">0</span></div>
                          </div>
                        </div>
                        `:""}
                        ${s<=3?`<div class="player-info"></div>
                        `:""}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        ${n?`
        <div id="moneycall-region">
          <div id="container-moneycall-region">
            <div>
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div class="count"><span class="count-value">25</span></div>
                  </td>
                  <td>
                    <div class="count"><span class="count-value">30</span></div>
                  </td>
                  <td>
                    <div class="count"><span class="count-value">35</span></div>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div class="count"><span class="count-value">10</span></div>
                  </td>
                  <td>
                    <div class="count"><span class="count-value">15</span></div>
                  </td>
                  <td>
                    <div class="count"><span class="count-value">20</span></div>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div class="count"><span class="count-value"></span></div>
                  </td>
                  <td>
                    <div class="count"><span class="count-value">5</span></div>
                  </td>
                  <td>
                    <div class="count"><span class="count-value"></span></div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        `:""}
        <div id="hand-region"></div>
      </div>
    </div>
    </div>
    </td>
    </tr>
  </table>
</div>`}o.Skeleton={template:C,render:function(e){var t=this.template(e);let n;e.element==="body"?n=document.body:n=document.getElementById(e.element),n&&(n.innerHTML="",n.innerHTML=t)},renderSkeleton:function(){var e='<div id="gamerow"><table cellspacing="0" cellpadding="0" border="0"><tr><td><div id="gamerow-left">';return e+='<div id="message-region"><div class="commentary">&nbsp;</div></div>',e+=this.renderBoard(),e+="</div></td><td>",e+='<div id="gamerow-right"><div id="upper-region">',e+='<div id="data-region"><div id="top-data-region"></div></div>',e+='<div id="moneycall-region"><div id="container-moneycall-region"></div></div>',e+='<div id="hand-region"></div>',e+="</div>",e+="</div></td></tr></table></div>",e},renderMenu:function(){const e=document.getElementById("menu");e&&(e.innerHTML='<div id="new-game" class="menu-item">New Game</div>')},renderBoard:function(){return'<div id="board" class="inner-board_content">'},renderGame:function(e,t){var n='<table cellspacing="0" cellpadding="0" border="0"><tr>';return n+='<td><div class="column-data-region">',e.players_hand.length>2&&(n+='<div class="player-info"></div>',n+='<div class="player-info"></div>',n+=this.renderScore(1,t)),n+="</div></td>",n+='<td><div class="column-data-region">',e.players_hand.length>2?n+=this.renderScore(2,t):n+=this.renderScore(1,t),n+='<div id="handbox-data-region">',n+=this.renderHandBox(e),n+="</div>",n+=this.renderScore(0,t),n+='</div></td><td><div class="column-data-region">',n+=this.renderBoneyard(),n+='<div class="player-info"></div>',e.players_hand.length>3?n+=this.renderScore(3,t):n+=this.renderScore(),n+="</div></td></tr></table>",n},renderBoneyard:function(){var e='<div class="player-info">';return e+='<div class="player-name"><span class="player-name">Boneyard</span></div>',e+='<div><span id="boneyard-value" class="player-score"></span></div>',e+="</div>",e},renderScore:function(e,t){var n='<div class="player-info">';return typeof e<"u"&&(n+='<div id="player-seat-'+e+'">',n+='<div class="player-name"><span  class="player-name">'+t[e]+"</span></div>",n+='<div><span id="player-score-'+e+'"class="player-score">0</span></div>',n+="</div>"),n+="</div>",n},renderHandBox:function(e){var t='<div><table cellspacing="0" cellpadding="0" border="0"><tr><td><div class="handcount"></div></td><td>';return e.players_hand.length>2?t+='<div class="handcount bonecount"><span id="player-hand-2">0</span></div>':t+='<div class="handcount bonecount"><span id="player-hand-1">0</span></div>',t+='</td><td><div class="handcount"></div></td></tr></table></div>',t+='<div><table cellspacing="0" cellpadding="0" border="0"><tr><td>',e.players_hand.length>2?t+='<div class="handcount bonecount"><span id="player-hand-1">0</span></div>':t+='<div class="handcount bonecount"><span id="player-hand-1"></span></div>',t+='</td><td><div class="handcount"></div></td><td>',e.players_hand.length==4?t+='<div class="handcount bonecount"><span id="player-hand-3">0</span></div>':t+='<div class="handcount bonecount"><span id="player-hand-3"></span></div>',t+="</div></td></tr></table></div>",t+='<div><table cellspacing="0" cellpadding="0" border="0"><tr><td><div class="handcount"></div></td><td>',t+='<div class="handcount bonecount"><span id="player-hand-0">00</span></div>',t+='</td><td><div class="handcount"></div></td></tr></table></div>',t},renderMoneyCall:function(){var e='<div><table cellspacing="0" cellpadding="0" border="0"><tr><td>';return e+=this.renderCount(25),e+="</td><td>",e+=this.renderCount(30),e+="</td><td>",e+=this.renderCount(35),e+='</td></tr></table></div><div><table cellspacing="0" cellpadding="0" border="0"><tr><td>',e+=this.renderCount(10),e+="</td><td>",e+=this.renderCount(15),e+="</td><td>",e+=this.renderCount(20),e+='</td></tr></table></div><div><table cellspacing="0" cellpadding="0" border="0"><tr><td><div class="count"><span class="count-value"></span></div></td><td>',e+=this.renderCount(5),e+='</td><td><div class="count"><span class="count-value"></span></div></td></tr></table></div>',e},renderCount:function(e){var t='<div class="count"><span class="count-value">'+e+"</span></div>";return t},markTurn:function(e){for(let n=0;n<4;n++){const s=document.getElementById("player-seat-"+n);s&&s.classList.remove("yourturn")}const t=document.getElementById("player-seat-"+e);t&&t.classList.add("yourturn")}};const A=o.Skeleton;function H(e){const{player:t,winner:n,domino:s,pass:r,locked:a,downs:l,lays:h,points:c,bone:u,direction:f,player_to_eat:m,eat_points:p}=e;return`${n?`WINNER:
`:""}<span class='player_name'>${t}</span>${s?`
: DOMINOED!!!!&nbsp; with <strong>${c}</strong> points`:""}${r?`
: PASSED`:""}${a?`
: LOCKED the game.
<br /><span class='player_name'>${m}</span>: <strong>${p}</strong>
points from locked game`:""}${l?`
<!-- downs ${u} -->
downed ${u}${c?`
with <strong>${c}</strong> points`:""}`:""}${h?`
<!-- lays ${u} to the ${f} -->
layed ${u} to the ${f}${c?`
with ${c} points`:""}`:""}`}o.Board=x;o.Hand=B;o.Skeleton=A;const v=function(e){this.options=e,this.messages=[],this.state=new i.State(e.number_of_players,!1),this.player_names=e.player_names,this.number_of_players=e.number_of_players,this.playerIndex=e.human,this.human=e.human,this.comment_template=H,e.state=this.state,o.Skeleton.render(e),this.commentator=new i.Commentator(this.player_names),this.controller=new i.GameController(this.state),this.board=new o.Board("board",700,500),this.hand=new o.Hand("hand-region");const t=document.getElementById("new-game");if(t){const n=this.options;t.addEventListener("click",()=>{o.clearDelayedEvents(),o.SelectGame.render(n)})}};v.prototype.start=function(e,t){this.controller.startTheHand(e,t),this.renderScoreBoard(),this.state.plays.length==1&&this.board.add(this.state.plays[0],this.state.plays)};v.prototype.gameRotation=function(){o.Skeleton.markTurn(this.state.current_player);try{if(!this.controller.isStopped()){if(this.state.current_player==this.human){this.activatePlayables();return}var e=this;o.delayEvent(3e3,e,function(s){var r=s.state.plays.length;s.controller.turn();var a=s.state.plays[r];a.pass||s.board.add(a,s.state.plays),r++,s.renderScoreBoard(),s.gameRotation()});return}var t=this.add_players(this.commentator.getCommentary(this.state)),n=this.comment_template(t);if(i.Util.State.isGameOver(this.state)){n='<span id="gameStopped">click to play another game.&nbsp;</span><br/>'+n;const s=document.querySelector("#message-region > .commentary");s&&(s.innerHTML=n);const r=document.getElementById("gameStopped");if(r){const a=this.options,l=()=>{a.restart_callback(a),r.removeEventListener("click",l)};r.addEventListener("click",l)}}else{n='<span id="gameStopped">wash:</span>&nbsp;'+n;const s=document.querySelector("#message-region > .commentary");s&&(s.innerHTML=n);const r=document.getElementById("gameStopped");if(r){const a=this,l=()=>{const h=i.Util.State.isLocked(a.state),c=document.querySelector("#message-region > .commentary");c&&(c.innerHTML=""),a.board.reset(),a.start(h,a.controller.state.current_player),a.gameRotation(),r.removeEventListener("click",l)};r.addEventListener("click",l)}}}catch(s){throw s.message="game rotation: "+s.message,s}};v.prototype.renderScoreBoard=function(){const e=document.getElementById("boneyard-value");e&&(e.textContent=this.state.boneyard.length);for(var t=0;t<this.state.players_hand.length;t++){const l=document.getElementById("player-hand-"+t);l&&(l.textContent=this.state.players_hand[t].length)}for(var n=0;n<this.state.players_score.length;n++){const l=document.getElementById("player-score-"+n);l&&(l.textContent=this.state.players_score[n])}typeof this.human<"u"&&this.hand.render(this.state.players_hand[this.playerIndex]);const s=document.querySelector("#message-region > .commentary");s&&(s.innerHTML="");var r=this.add_players(this.commentator.getCommentary(this.state));const a=document.querySelector("#message-region > .commentary");a&&(a.innerHTML=this.comment_template(r))};v.prototype.add_players=function(e){var t=this.player_names[e.player],n=e.player_to_eat;return n>=0&&(n=this.player_names[e.player_to_eat]),e.seat=e.player,e.player=t,e.player_to_eat=n,e};v.prototype.activatePlayables=function(){var e=new i.Analysis(new i.View(this.state,this.state.current_player));if(e.moves.length==0){this.promptForBoneyard();return}const t=this;for(var n=0;n<e.moves.length;n++){var s=e.moves[n],r="bone"+s.bone.light+s.bone.heavy;const a=document.getElementById(r);a&&(a.classList.remove("unplayable"),a.classList.add("playable"),(function(l,h){a.addEventListener("click",function(){const c=l.bone,u="bone"+c.light+c.heavy,f=document.getElementById(u),m=t.board;h.forEach(function(y){const g="bone"+y.bone.light+y.bone.heavy,b=document.getElementById(g);b&&b.classList.contains("chosen")&&(b.classList.remove("chosen"),b.classList.add("playable"))}),f&&(f.classList.remove("playable"),f.classList.add("chosen")),m.showPlayablePositions(l,t.state.plays);const p=document.getElementById("bone_"+l.direction);if(p){const y=()=>{t.humanMove(l)};p.addEventListener("click",y)}})})(s,e.moves))}};v.prototype.humanMove=function(e){var t=this.state.plays.length;this.controller.turn(this.human,e),this.renderScoreBoard(),this.board.hidePlayablePositions();var n=this.state.plays[t];this.board.add(n,this.state.plays),this.gameRotation()};v.prototype.humanCanNotPlay=function(){this.controller.turn(this.human,null),this.renderScoreBoard(),this.gameRotation()};v.prototype.promptForBoneyard=function(){var e="click to pull from the boneyard!";this.state.boneyard.length==0&&(e="click to pass");const t=document.querySelector("#message-region > .commentary");t&&t.insertAdjacentHTML("beforeend","<br/><span id='pullOrPass'>"+e+"</span>");const n=document.getElementById("pullOrPass");if(n){const s=this;n.addEventListener("click",()=>{n.remove(),s.humanCanNotPlay()})}};function U({number_of_players:e,player_names:t}){return`<div id="seated-at-table" style="width:450px;">
    <table cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td>
          <div class="select-column"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          <div class="seat"></div>
          ${e>2?`<div class="seat">
            ${t[1]}
          </div>`:""}

        </td>
        <td>
          <div class="select-column">
            <div class="seat">
              ${e>2?t[2]:""}
              ${e<=2?t[1]:""} </div>
                <div id="cardtable">
                  <div id="start-game" />
                </div>
                <div class="seat">
                  ${t[0]}
                </div>
            </div>
        </td>
        <td>
          <div class="select-column">
            <div class="seat"></div>
            <div class="seat"></div>
          </div>
          <div class="seat"></div>
          <div class="seat">
            ${e>3?t[3]:""}
          </div>
  </div>
  </td>
  </tr>
  </table>
  </div>`}function P(){return`<div class="choose">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td>
        <div id="choice-players-2" class="choice">${d.createTallDomino(2,0)}<div
            style="margin-top:10px;width:100px;padding:4px;font-size:13px;font-weight:bold;text-align:center;">Play a 2
            person game</div>
        </div>
      </td>
      <td>
        <div id="choice-players-3" class="choice">${d.createTallDomino(3,0)}<div
            style="margin-top:10px;width:100px;padding:4px;font-size:13px;font-weight:bold;text-align:center;">Play a 3
            person game</div>
        </div>
      </td>
      <td>
        <div id="choice-players-4" class="choice">${d.createTallDomino(4,0)}<div
            style="margin-top:10px;width:100px;padding:4px;font-size:13px;font-weight:bold;text-align:center;">Play a 4
            person game</div>
        </div>
      </td>
    </tr>
  </table>
</div>`}o.SelectGame={manager:null,template_card_table:U,template_choose_players:P,render:function(e){var t=o.SelectGame.template_card_table(e),n=o.SelectGame.template_choose_players(e);const s=document.getElementById(e.element);s&&(s.innerHTML="",s.innerHTML=t+n),o.SelectGame.setNumberOfPlayers({data:e});const r=document.getElementById("choice-players-2"),a=document.getElementById("choice-players-3"),l=document.getElementById("choice-players-4");r&&r.addEventListener("click",()=>{o.SelectGame.setNumberOfPlayers({data:{element:e.element,number_of_players:2,player_names:e.player_names,callMoney:e.callMoney}})}),a&&a.addEventListener("click",()=>{o.SelectGame.setNumberOfPlayers({data:{element:e.element,number_of_players:3,player_names:e.player_names,callMoney:e.callMoney}})}),l&&l.addEventListener("click",()=>{o.SelectGame.setNumberOfPlayers({data:{element:e.element,number_of_players:4,player_names:e.player_names,callMoney:e.callMoney}})})},startGame:function(e){o.SelectGame.manager=new v(e),o.SelectGame.manager.start(!0),o.SelectGame.manager.gameRotation()},restartGame:function(e){o.SelectGame.render(e)},setNumberOfPlayers:function(e){var t=o.SelectGame.template_card_table(e.data);const n=document.getElementById("seated-at-table");n&&(n.innerHTML="",n.innerHTML=t),o.number_of_players=e.data.number_of_players;var s={number_of_players:e.data.number_of_players,human:0,element:e.data.element,player_names:e.data.player_names,callMoney:e.data.callMoney,restart_callback:o.SelectGame.restartGame};const r=document.getElementById("start-game");if(r){const a=r.cloneNode(!0);r.parentNode.replaceChild(a,r);const l=document.getElementById("start-game");l&&l.addEventListener("click",()=>{o.SelectGame.startGame(s)})}}};const w=o.SelectGame;o.SelectGame=w;document.addEventListener("DOMContentLoaded",function(){w.render({element:"thewholegame",number_of_players:2,player_names:["You","Robot 1","Robot 2","Robot 3"],callMoney:!1})});
