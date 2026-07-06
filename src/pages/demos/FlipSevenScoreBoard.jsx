import { useEffect, useRef } from "react";

const FLIP_SEVEN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Flip Seven — Scoreboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:#0B3533;
  --surface:#0D3A37;
  --card:#0F4742;
  --card-hover:#155550;
  --border:#1A6560;
  --border-hi:#2B8A82;
  --gold:#F5C842;
  --gold-hi:#FFD966;
  --gold-lo:#A8882A;
  --gold-glow:rgba(245,200,66,0.22);
  --ivory:#F5EDD6;
  --ivory-dim:#B0A484;
  --red:#E84B2A;
  --red-hi:#FF6B4A;
  --red-glow:rgba(232,75,42,0.25);
  --teal:#2BBFB3;
  --teal-hi:#4DD9CC;
  --teal-glow:rgba(43,191,179,0.2);
  --purple:#6B2D7A;
  --skyblue:#6BB8D4;
  --green:#2BBFB3;
  --green-hi:#4DD9CC;
  --muted:#3D9990;
  --chip:#092E2B;
  --shadow:rgba(0,0,0,0.5);
  --cashout:#6BB8D4;
  --cashout-glow:rgba(107,184,212,0.22);
}

html,body{min-height:100vh;background:var(--bg);font-family:'Inter',sans-serif;color:var(--ivory);overflow-x:hidden;}

body::before{
  content:'';position:fixed;inset:0;
  background:
    radial-gradient(ellipse 100% 50% at 50% -10%,rgba(245,200,66,0.12) 0%,transparent 55%),
    radial-gradient(ellipse 60% 40% at 80% 80%,rgba(43,191,179,0.08) 0%,transparent 50%);
  pointer-events:none;z-index:0;
}
#card-canvas{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.45;}
body>*{position:relative;z-index:1}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes dealCard{
  0%{opacity:0;transform:translateY(-60px) rotate(-8deg) scale(0.8)}
  65%{transform:translateY(6px) rotate(1.5deg) scale(1.03)}
  100%{opacity:1;transform:translateY(0) rotate(0) scale(1)}
}
@keyframes chipPop{
  0%{opacity:0;transform:scale(0) rotate(-15deg)}
  55%{transform:scale(1.25) rotate(3deg)}
  100%{opacity:1;transform:scale(1) rotate(0)}
}
@keyframes bustShake{
  0%,100%{transform:translateX(0) rotate(0)}
  15%{transform:translateX(-8px) rotate(-2deg)}
  30%{transform:translateX(8px) rotate(2deg)}
  45%{transform:translateX(-6px) rotate(-1deg)}
  60%{transform:translateX(6px) rotate(1deg)}
  75%{transform:translateX(-3px)}
}
@keyframes goldRing{
  0%,100%{box-shadow:0 0 0 0 rgba(212,168,67,0),0 4px 24px rgba(0,0,0,0.4)}
  50%{box-shadow:0 0 0 5px rgba(245,200,66,0.25),0 4px 24px rgba(0,0,0,0.4)}
}
@keyframes scoreFlip{
  0%{opacity:0;transform:translateY(-10px) scale(0.9)}
  100%{opacity:1;transform:translateY(0) scale(1)}
}
@keyframes crownBounce{
  0%{opacity:0;transform:translateY(-20px) scale(0.5) rotate(-20deg)}
  60%{transform:translateY(4px) scale(1.2) rotate(5deg)}
  100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}
}
@keyframes badgeSpin{
  0%{opacity:0;transform:scale(0) rotate(-90deg)}
  70%{transform:scale(1.15) rotate(5deg)}
  100%{opacity:1;transform:scale(1) rotate(0)}
}
@keyframes particleBurst{
  0%{opacity:1;transform:translate(0,0) scale(1)}
  100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0)}
}
@keyframes toastSlide{
  0%{opacity:0;transform:translateX(-50%) translateY(16px) scale(0.92)}
  100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
}
@keyframes toastFade{
  0%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
  100%{opacity:0;transform:translateX(-50%) translateY(-12px) scale(0.92)}
}
@keyframes logoReveal{
  0%{opacity:0;letter-spacing:18px;filter:blur(4px)}
  100%{opacity:1;letter-spacing:5px;filter:blur(0)}
}
@keyframes suitDrift{
  0%,100%{transform:translateY(0) rotate(0) scale(1);opacity:0.25}
  33%{transform:translateY(-10px) rotate(6deg) scale(1.05);opacity:0.4}
  66%{transform:translateY(-5px) rotate(-3deg) scale(0.97);opacity:0.3}
}
@keyframes screenEnter{
  0%{opacity:0;transform:scale(0.97) translateY(10px)}
  100%{opacity:1;transform:scale(1) translateY(0)}
}
@keyframes screenExit{
  0%{opacity:1;transform:scale(1)}
  100%{opacity:0;transform:scale(0.96) translateY(-8px)}
}
@keyframes winnerReveal{
  0%{opacity:0;transform:scale(0.85)}
  60%{transform:scale(1.03)}
  100%{opacity:1;transform:scale(1)}
}
@keyframes confettiFall{
  0%{transform:translateY(-10px) rotate(0) scale(1);opacity:1}
  100%{transform:translateY(80px) rotate(var(--rot)) scale(0.5);opacity:0}
}
@keyframes numberRoll{
  0%{transform:translateY(100%);opacity:0}
  100%{transform:translateY(0);opacity:1}
}
@keyframes cashoutPulse{
  0%,100%{box-shadow:0 0 0 0 rgba(123,104,238,0),0 4px 24px rgba(0,0,0,0.4)}
  50%{box-shadow:0 0 0 4px rgba(107,184,212,0.3),0 4px 24px rgba(0,0,0,0.4)}
}

#app{min-height:100vh;display:flex;flex-direction:column}

.header{padding:32px 24px 8px;text-align:center;position:relative;}
.header-suits{position:absolute;top:20px;left:0;right:0;display:flex;justify-content:space-between;padding:0 20px;pointer-events:none;}
.header-suits span{font-size:26px;color:var(--teal);animation:suitDrift 4s ease-in-out infinite;}
.header-suits span:nth-child(1){animation-delay:0s}
.header-suits span:nth-child(2){animation-delay:1s}
.header-suits span:nth-child(3){animation-delay:2s}
.header-suits span:nth-child(4){animation-delay:0.5s}
.logo{font-family:'Oswald',sans-serif;font-size:clamp(38px,9vw,56px);font-weight:700;color:var(--gold);letter-spacing:5px;text-transform:uppercase;animation:logoReveal 1s cubic-bezier(0.22,1,0.36,1) both;line-height:1;text-shadow:0 2px 0 var(--purple),0 0 40px rgba(245,200,66,0.35);}
.logo em{color:var(--ivory);font-style:normal}
.logo-rule{width:60px;height:2px;background:var(--gold);margin:8px auto 4px;opacity:0.7;}
.logo-sub{font-size:10px;letter-spacing:4px;color:var(--teal);text-transform:uppercase;font-weight:400;}

.screen{display:none;padding:20px 16px 48px;max-width:720px;margin:0 auto;width:100%;}
.screen.active{display:block;animation:screenEnter 0.4s cubic-bezier(0.22,1,0.36,1) both}
.screen.exit{animation:screenExit 0.25s cubic-bezier(0.22,1,0.36,1) both}

.setup-wrap{background:var(--card);border:2px solid var(--gold);border-radius:24px;padding:32px 24px;box-shadow:0 8px 48px rgba(0,0,0,0.4);}
.panel-title{font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:20px;text-align:center;}
.player-entry{display:flex;align-items:center;gap:10px;margin-bottom:10px;animation:fadeDown 0.3s cubic-bezier(0.22,1,0.36,1) both;}
.p-swatch{width:12px;height:12px;border-radius:50%;flex-shrink:0;box-shadow:0 0 6px currentColor;}
.p-input{flex:1;background:var(--chip);border:1px solid var(--border);border-radius:12px;color:var(--ivory);font-family:'Inter',sans-serif;font-size:14px;padding:11px 14px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
.p-input::placeholder{color:var(--muted)}
.p-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px var(--gold-glow)}
.rm-btn{width:36px;height:36px;border-radius:10px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.18s;flex-shrink:0;}
.rm-btn:hover{border-color:var(--red);color:var(--red-hi);background:rgba(192,56,56,0.08)}
.sep{height:1px;background:var(--border);margin:18px 0}
.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:14px;border:none;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.22s;letter-spacing:0.3px;}
.btn-primary{background:linear-gradient(135deg,var(--red) 0%,#C03010 100%);color:var(--ivory);box-shadow:0 4px 20px rgba(232,75,42,0.35);}
.btn-primary:hover{background:linear-gradient(135deg,var(--red-hi) 0%,var(--red) 100%);transform:translateY(-2px);box-shadow:0 6px 28px rgba(232,75,42,0.45)}
.btn-primary:active{transform:translateY(1px)}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--muted);margin-top:10px;}
.btn-ghost:hover{border-color:var(--muted);color:var(--ivory);background:rgba(255,255,255,0.03)}
.hint{font-size:11px;color:var(--muted);text-align:center;margin-top:14px;letter-spacing:0.5px}

.round-strip{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding:0 4px;animation:fadeDown 0.4s cubic-bezier(0.22,1,0.36,1) both;}
.rnd-nav{width:40px;height:40px;border-radius:50%;border:1.5px solid var(--border-hi);background:transparent;color:var(--gold);font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.18s;}
.rnd-nav:hover{background:var(--gold-glow);border-color:var(--gold)}
.round-info{text-align:center}
.round-info .lbl{font-size:10px;letter-spacing:3px;color:var(--muted);text-transform:uppercase}
.round-info .num{font-family:'Oswald',sans-serif;font-size:32px;font-weight:700;color:var(--gold);line-height:1;}

.pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:14px;margin-bottom:18px;}

.pcard{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:0 0 14px;overflow:hidden;position:relative;animation:dealCard 0.55s cubic-bezier(0.22,1,0.36,1) both;transition:border-color 0.3s,background 0.3s,transform 0.2s,box-shadow 0.3s;box-shadow:0 4px 20px rgba(0,0,0,0.3);}
.pcard:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.4)}
.pcard.state-bust{border-color:var(--red);background:#2A0D06;box-shadow:0 4px 24px var(--red-glow);animation:bustShake 0.5s cubic-bezier(0.22,1,0.36,1) both;}
.pcard.state-seven{border-color:var(--gold);animation:goldRing 1.8s ease-in-out infinite;}
.pcard.state-cashout{border-color:var(--cashout);background:#0A2A33;animation:cashoutPulse 2s ease-in-out infinite;}
.pcard.state-lead{border-color:rgba(212,168,67,0.35)}
.pcard.state-done{opacity:0.65;}

.pcard-stripe{height:4px;width:100%;margin-bottom:14px;transition:background 0.3s;}
.pcard-inner{padding:0 13px}
.pcard-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.avatar{width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Oswald',sans-serif;font-size:12px;font-weight:600;color:var(--bg);border:2px solid transparent;transition:border-color 0.3s;}
.p-label{font-size:13px;font-weight:500;color:var(--ivory);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;}
.crown-icon{font-size:15px;flex-shrink:0;animation:crownBounce 0.45s cubic-bezier(0.22,1,0.36,1) both;}

.big-score{font-family:'Oswald',sans-serif;font-size:52px;font-weight:700;line-height:1;text-align:center;margin-bottom:2px;color:var(--ivory);transition:color 0.3s;animation:scoreFlip 0.25s cubic-bezier(0.22,1,0.36,1) both;overflow:hidden;}
.big-score.c-bust{color:var(--red-hi)}
.big-score.c-seven{color:var(--gold)}
.big-score.c-cashout{color:var(--cashout)}

.status-tag{text-align:center;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;height:16px;line-height:16px;transition:color 0.3s;margin-bottom:8px;}
.status-tag.t-bust{color:var(--red-hi)}
.status-tag.t-seven{color:var(--gold)}
.status-tag.t-safe{color:var(--muted)}
.status-tag.t-cashout{color:var(--cashout)}

.progress-track{height:3px;background:var(--border);border-radius:2px;margin-bottom:10px;overflow:hidden;}
.progress-fill{height:100%;border-radius:2px;transition:width 0.4s cubic-bezier(0.22,1,0.36,1),background 0.3s;}

.chips-area{display:flex;flex-wrap:wrap;gap:4px;min-height:26px;margin-bottom:8px;}
.chip{background:var(--chip);border:1px solid var(--border-hi);border-radius:7px;padding:3px 8px;font-family:'Oswald',sans-serif;font-size:13px;color:var(--teal);cursor:pointer;transition:border-color 0.15s,color 0.15s,transform 0.15s;animation:chipPop 0.32s cubic-bezier(0.22,1,0.36,1) both;user-select:none;}
.chip:hover{border-color:var(--red);color:var(--red-hi);transform:scale(1.1)}
.chip.chip-gold{color:var(--gold);border-color:var(--gold-lo);background:rgba(212,168,67,0.07)}
.chip.chip-neg{color:var(--skyblue);border-color:#1A4560}
.chip.chip-dup{color:var(--red-hi);border-color:var(--red);background:rgba(192,56,56,0.12);box-shadow:0 0 6px var(--red-glow);}
.chip.chip-sc{color:#F97316;border-color:#7A3800;background:rgba(249,115,22,0.1);}

.inp-row{display:flex;gap:6px;align-items:center}
.val-input{flex:1;min-width:0;background:var(--chip);border:1px solid var(--border);border-radius:10px;color:var(--ivory);font-family:'Oswald',sans-serif;font-size:17px;padding:8px 6px;text-align:center;outline:none;transition:border-color 0.2s,box-shadow 0.2s;-moz-appearance:textfield;}
.val-input::-webkit-inner-spin-button,.val-input::-webkit-outer-spin-button{-webkit-appearance:none}
.val-input::placeholder{color:var(--muted);font-size:11px;font-family:'Inter',sans-serif}
.val-input:focus{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold-glow)}
.val-input:disabled{opacity:0.35;cursor:not-allowed}

.plus-btn{width:34px;height:34px;border-radius:10px;flex-shrink:0;background:var(--gold);border:none;color:#1A1200;font-size:22px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.18s,transform 0.15s;line-height:1;}
.plus-btn:hover{background:var(--gold-hi)}
.plus-btn:active{transform:scale(0.9)}
.plus-btn:disabled{background:var(--muted);cursor:not-allowed;opacity:0.4}

.cashout-btn{width:100%;margin-top:6px;padding:7px 10px;border-radius:10px;border:1px solid var(--cashout);background:rgba(123,104,238,0.08);color:var(--cashout);font-family:'Inter',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;letter-spacing:0.5px;}
.cashout-btn:hover{background:rgba(123,104,238,0.18);transform:translateY(-1px)}
.cashout-btn:disabled{opacity:0.3;cursor:not-allowed;transform:none}

.sc-btn{width:100%;margin-top:4px;padding:6px 10px;border-radius:10px;border:1px solid #7A3800;background:rgba(249,115,22,0.06);color:#F97316;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;letter-spacing:0.5px;}
.sc-btn:hover{background:rgba(249,115,22,0.14);transform:translateY(-1px)}
.sc-btn:disabled{opacity:0.3;cursor:not-allowed;transform:none}

.ptotal{text-align:center;font-size:11px;color:var(--muted);margin-top:8px;}
.ptotal b{color:var(--ivory-dim);font-family:'Oswald',sans-serif;font-size:13px}

.cbadge{position:absolute;top:14px;right:11px;border-radius:6px;padding:2px 7px;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;animation:badgeSpin 0.35s cubic-bezier(0.22,1,0.36,1) both;}
.cbadge-bust{background:var(--red);color:#fff}
.cbadge-seven{background:var(--gold);color:var(--bg)}
.cbadge-cashout{background:var(--cashout);color:#0B2A35}
.cbadge-sc{background:#F97316;color:#fff}

.actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:18px;}
.ab{display:flex;align-items:center;gap:6px;padding:10px 18px;border-radius:12px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);transition:all 0.2s;}
.ab:hover{background:rgba(255,255,255,0.04);border-color:var(--muted);color:var(--ivory);transform:translateY(-1px)}
.ab-primary{background:linear-gradient(135deg,var(--gold),#C49030);border-color:var(--gold);color:#1A1200;font-weight:700;box-shadow:0 3px 14px rgba(245,200,66,0.3);}
.ab-primary:hover{background:linear-gradient(135deg,var(--gold-hi),var(--gold));box-shadow:0 5px 20px rgba(245,200,66,0.4)}
.ab-danger{border-color:rgba(192,56,56,0.35);color:var(--red-hi)}
.ab-danger:hover{background:rgba(192,56,56,0.07);border-color:var(--red)}
.ab-active{border-color:var(--gold-lo);color:var(--gold)}

.lb-panel{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:20px;margin-bottom:14px;animation:fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s both;}
.lb-panel .panel-title{text-align:left;margin-bottom:14px}
.lb-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(26,101,96,0.5);transition:all 0.2s;}
.lb-row:last-child{border-bottom:none}
.lb-rank{font-family:'Oswald',sans-serif;font-size:13px;color:var(--muted);width:24px;text-align:center;flex-shrink:0;}
.lb-rank.r1{color:var(--gold);font-size:18px}
.lb-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.lb-name{flex:1;font-size:13px;font-weight:500;color:var(--ivory)}
.lb-score{font-family:'Oswald',sans-serif;font-size:22px;font-weight:600;color:var(--ivory);}
.lb-score.busted{color:var(--red-hi);text-decoration:line-through;font-size:14px}
.lb-bar-wrap{flex:1;display:flex;flex-direction:column;gap:3px;min-width:0}
.lb-bar-track{height:2px;background:var(--border);border-radius:2px;overflow:hidden}
.lb-bar-fill{height:100%;border-radius:2px;transition:width 0.5s cubic-bezier(0.22,1,0.36,1)}

.hist-panel{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:20px;margin-bottom:14px;overflow-x:auto;animation:fadeUp 0.35s cubic-bezier(0.22,1,0.36,1) both;}
.htable{width:100%;border-collapse:collapse;font-size:12px;min-width:280px}
.htable th{font-family:'Oswald',sans-serif;font-size:10px;letter-spacing:2px;color:var(--muted);text-transform:uppercase;padding:5px 10px;border-bottom:1px solid var(--border);text-align:center;}
.htable th.left{text-align:left}
.htable td{padding:8px 10px;text-align:center;font-family:'Oswald',sans-serif;font-size:15px;color:var(--teal);border-bottom:1px solid rgba(26,101,96,0.4);}
.htable tr:last-child td{border-bottom:none}
.htable td.td-name{text-align:left;color:var(--ivory);font-family:'Inter',sans-serif;font-size:12px}
.htable td.td-bust{color:var(--red-hi)}
.htable td.td-cashout{color:var(--cashout)}
.htable td.td-total{color:var(--gold);font-weight:600}

.rule-note{background:rgba(43,191,179,0.06);border:1px solid rgba(43,191,179,0.25);border-radius:12px;padding:10px 14px;margin-bottom:16px;font-size:11px;color:var(--ivory-dim);line-height:1.6;animation:fadeDown 0.3s cubic-bezier(0.22,1,0.36,1) both;}
.rule-note b{color:var(--gold)}

.toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--card-hover);border:1px solid var(--border-hi);border-radius:14px;padding:12px 24px;font-size:14px;font-weight:500;color:var(--ivory);pointer-events:none;z-index:999;white-space:nowrap;animation:toastSlide 0.3s cubic-bezier(0.22,1,0.36,1) both;box-shadow:0 8px 32px rgba(0,0,0,0.5);}
.toast.out{animation:toastFade 0.28s cubic-bezier(0.22,1,0.36,1) both}

.particle{position:fixed;pointer-events:none;z-index:998;border-radius:50%;animation:particleBurst 0.7s ease-out both;}

.winner-bg{position:fixed;inset:0;z-index:100;background:rgba(6,28,27,0.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;animation:fadeIn 0.4s ease both;}
.winner-trophy{font-size:80px;animation:crownBounce 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both}
.winner-label{font-size:11px;letter-spacing:4px;color:var(--muted);text-transform:uppercase}
.winner-name{font-family:'Oswald',sans-serif;font-size:42px;font-weight:700;color:var(--gold);letter-spacing:3px;text-align:center;animation:winnerReveal 0.5s cubic-bezier(0.22,1,0.36,1) 0.3s both;text-shadow:0 2px 0 var(--purple),0 0 40px rgba(245,200,66,0.5);}
.winner-pts{font-family:'Oswald',sans-serif;font-size:72px;font-weight:700;color:var(--ivory);line-height:1;animation:numberRoll 0.4s cubic-bezier(0.22,1,0.36,1) 0.5s both;}
.winner-pts-lbl{font-size:12px;color:var(--muted);letter-spacing:2px}
.winner-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px}
.wa-btn{padding:12px 28px;border-radius:14px;cursor:pointer;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;border:none;transition:all 0.2s;}
.wa-gold{background:var(--gold);color:#1A1200}
.wa-gold:hover{background:var(--gold-hi);transform:translateY(-2px)}
.wa-outline{background:transparent;border:1px solid var(--border-hi);color:var(--ivory-dim)}
.wa-outline:hover{border-color:var(--muted);color:var(--ivory)}
.confetti-piece{position:fixed;width:8px;height:8px;pointer-events:none;z-index:101;animation:confettiFall 1.2s ease-in both;}
.demo-shell {
    display: flex;
    flex-direction: column;
    height: 100%; /* or whatever fixed height your modal uses */
}

.mos-system {
    flex: 1;
    min-height: 0;
}
@media(max-width:480px){
  .logo{font-size:34px}
  .pgrid{grid-template-columns:repeat(2,1fr)}
  .big-score{font-size:42px}
  .actions{gap:8px}
  .ab{padding:9px 13px;font-size:12px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<canvas id="card-canvas"></canvas>
<div id="app">

  <header class="header">
    <div class="header-suits"><span>🃏°🂱⋆ 🎲 .🂱࿔*🃏</span><span>♠</span><span>♥</span><span>♦</span><span>♣</span><span>🎲</span><span>🃏</span>
    <span>🎴</span><span>🃏°🂱⋆ 🎲 .🂱࿔*🃏</span></div>
    <div class="logo">Flip <em>Seven</em></div>
    <div class="logo-rule"></div>
    <div class="logo-sub">∘₊✧─────✧₊∘ Scoreboard by Jhonrlgnz ∘₊✧─────✧₊∘</div>
  </header>

  <section class="screen active" id="s-setup">
    <div class="setup-wrap">
      <div class="panel-title">Players</div>
      <div id="player-list"></div>
      <button class="btn btn-ghost" id="add-player-btn" style="margin-bottom:4px">+ Add player</button>
      <div class="sep"></div>
      <button class="btn btn-primary" id="start-btn">♠ &nbsp;Deal the cards</button>
      <p class="hint">You bust when you flip a card matching a value you already have · Cashout to lock your score</p>
    </div>
  </section>

  <section class="screen" id="s-game">
    <div class="round-strip">
      <button class="rnd-nav" id="prev-rnd">‹</button>
      <div class="round-info">
        <div class="lbl">Round</div>
        <div class="num" id="rnd-num">1</div>
      </div>
      <button class="rnd-nav" id="next-rnd">›</button>
    </div>

    <div class="rule-note">
      <b>Bust rule:</b> Drawing a card with a value you already hold this round = Bust (score 0 this round).<br>
      <b>Cashout:</b> Stop drawing anytime to lock in your current sum. &nbsp;·&nbsp; <b>Second Chance</b> card absorbs one bust.
    </div>

    <div class="pgrid" id="pgrid"></div>

    <div class="actions">
      <button class="ab ab-primary" id="end-rnd-btn">✓ &nbsp;End round</button>
      <button class="ab" id="hist-btn">↩ History</button>
      <button class="ab ab-danger" id="new-game-btn">↺ New game</button>
    </div>

    <div class="lb-panel" id="lb-panel">
      <div class="panel-title">Leaderboard</div>
      <div id="lb-body"></div>
    </div>

    <div class="hist-panel" id="hist-panel" style="display:none">
      <div class="panel-title">Round History</div>
      <div id="hist-body"></div>
    </div>
  </section>
</div>

<script>
const COLORS=['#4CAF80','#64B5F6','#FFB74D','#F06292','#BA68C8','#4DD0E1','#A5D6A7','#FF8A65'];
const SECOND_CHANCE_VAL = 'SC';
const FLIP_SEVEN_VAL = 7;

let G = { players:[], round:1, playerState:{}, history:[] };

function freshPlayerState(){ return { cards:[], status:'active', hasSecondChance:false, usedSecondChance:false }; }

function initSetup(){
  const list=document.getElementById('player-list');
  list.innerHTML='';
  ['Player 1','Player 2','Player 3','Player 4'].forEach(n=>addPlayerRow(n));
}
function addPlayerRow(name=''){
  const list=document.getElementById('player-list');
  const idx=list.children.length;
  const color=COLORS[idx%COLORS.length];
  const row=document.createElement('div');
  row.className='player-entry';
  row.style.animationDelay=(idx*0.06)+'s';
  row.innerHTML=\`
    <div class="p-swatch" style="background:\${color};color:\${color}"></div>
    <input class="p-input pn-inp" type="text" placeholder="Player \${idx+1}" value="\${name}" maxlength="14"/>
    <button class="rm-btn" title="Remove">✕</button>
  \`;
  row.querySelector('.rm-btn').onclick=()=>{
    if(list.children.length>2){
      row.style.transition='opacity 0.2s,transform 0.2s';
      row.style.opacity='0';row.style.transform='translateX(20px)';
      setTimeout(()=>row.remove(),200);
    }
  };
  list.appendChild(row);
}
document.getElementById('add-player-btn').onclick=()=>{
  if(document.getElementById('player-list').children.length<8) addPlayerRow('');
};
document.getElementById('start-btn').onclick=()=>{
  const names=[...document.querySelectorAll('.pn-inp')].map(i=>i.value.trim()).filter(Boolean);
  if(names.length<2){toast('Add at least 2 players');return;}
  G.players=names.map((name,i)=>({name,color:COLORS[i%COLORS.length],totalScore:0}));
  G.round=1;G.history=[];
  resetRoundState();
  goTo('s-game');
  renderGame();
};

function resetRoundState(){
  G.playerState={};
  G.players.forEach(p=>{ G.playerState[p.name]=freshPlayerState(); });
}

function goTo(id){
  const cur=document.querySelector('.screen.active');
  if(cur){ cur.classList.add('exit'); setTimeout(()=>cur.classList.remove('active','exit'),250); }
  setTimeout(()=>document.getElementById(id).classList.add('active'),cur?200:0);
}

document.getElementById('prev-rnd').onclick=()=>{if(G.round>1){G.round--;renderGame();}};
document.getElementById('next-rnd').onclick=()=>{ G.round++; resetRoundState(); renderGame(); };

function endRound(){
  const snap={};
  G.players.forEach(p=>{
    const ps=G.playerState[p.name];
    const numCards=ps.cards.filter(v=>v!==SECOND_CHANCE_VAL);
    const sum=numCards.reduce((a,v)=>a+v,0);
    const bust=ps.status==='bust';
    const cashedOut=ps.status==='cashout';
    const seven=ps.status==='seven';
    snap[p.name]={ cards:[...ps.cards], sum, bust, cashedOut, seven };
    if(!bust) p.totalScore+=sum;
  });
  G.history.push({round:G.round,data:snap});
  const rnum=G.round;
  G.round++;
  resetRoundState();
  toast(\`Round \${rnum} locked ✓\`);
  renderGame();
  if(document.getElementById('hist-panel').style.display!=='none') renderHistory();
}
document.getElementById('end-rnd-btn').onclick=endRound;

document.getElementById('new-game-btn').onclick=()=>{
  G={players:[],round:1,playerState:{},history:[]};
  document.getElementById('hist-panel').style.display='none';
  document.getElementById('hist-btn').classList.remove('ab-active');
  initSetup();
  goTo('s-setup');
};

document.getElementById('hist-btn').onclick=()=>{
  const p=document.getElementById('hist-panel');
  const open=p.style.display!=='none';
  p.style.display=open?'none':'block';
  document.getElementById('hist-btn').classList.toggle('ab-active',!open);
  if(!open) renderHistory();
};

function wouldBust(ps, val){
  if(val===SECOND_CHANCE_VAL) return false;
  const existing=ps.cards.filter(v=>v!==SECOND_CHANCE_VAL);
  return existing.includes(val);
}

function addCard(pi, rawVal){
  const player=G.players[pi];
  const ps=G.playerState[player.name];
  if(ps.status==='bust'||ps.status==='cashout') return;
  let val;
  if(typeof rawVal==='string'&&rawVal.trim().toUpperCase()==='SC'){
    val=SECOND_CHANCE_VAL;
  } else {
    val=parseInt(rawVal);
    if(isNaN(val)){
      document.getElementById('vi-'+pi)?.focus();
      return;
    }
  }
  if(val!==SECOND_CHANCE_VAL && wouldBust(ps, val)){
    if(ps.hasSecondChance && !ps.usedSecondChance){
      ps.usedSecondChance=true;
      toast(\`\${player.name} used Second Chance! Duplicate \${val} discarded 🍀\`,'');
      spawnParticles(document.getElementById('vi-'+pi),'#F97316',14);
    } else {
      ps.cards.push(val);
      ps.status='bust';
      spawnParticles(document.getElementById('vi-'+pi),'#C03838',16);
      toast(\`\${player.name} BUST! Duplicate \${val} 💥\`);
    }
  } else {
    ps.cards.push(val);
    if(val===SECOND_CHANCE_VAL){
      ps.hasSecondChance=true;
    }
    const numCards=ps.cards.filter(v=>v!==SECOND_CHANCE_VAL);
    const sum=numCards.reduce((a,v)=>a+v,0);
    if(numCards.includes(FLIP_SEVEN_VAL) && ps.status==='active'){
      ps.status='seven';
      spawnParticles(document.getElementById('vi-'+pi),'#D4A843',20);
      toast(\`\${player.name} FLIP SEVEN! 🃏\`);
    }
  }
  const inp=document.getElementById('vi-'+pi);
  if(inp) inp.value='';
  renderGame();
  setTimeout(()=>document.getElementById('vi-'+pi)?.focus(),30);
}

function cashOut(pi){
  const player=G.players[pi];
  const ps=G.playerState[player.name];
  if(ps.status!=='active'&&ps.status!=='seven') return;
  ps.status='cashout';
  const numCards=ps.cards.filter(v=>v!==SECOND_CHANCE_VAL);
  const sum=numCards.reduce((a,v)=>a+v,0);
  spawnParticles(document.getElementById('vi-'+pi),'#7B68EE',12);
  toast(\`\${player.name} cashed out with \${sum} pts ✔\`);
  const allDone=G.players.every(p=>{
    const s=G.playerState[p.name].status;
    return s==='bust'||s==='cashout';
  });
  if(allDone){
    setTimeout(()=>endRound(),600);
  } else {
    renderGame();
  }
}

function removeCard(pi, idx){
  const player=G.players[pi];
  const ps=G.playerState[player.name];
  if(ps.status==='bust'||ps.status==='cashout') return;
  const removed=ps.cards[idx];
  ps.cards.splice(idx,1);
  ps.hasSecondChance=ps.cards.includes(SECOND_CHANCE_VAL);
  if(!ps.hasSecondChance) ps.usedSecondChance=false;
  const numCards=ps.cards.filter(v=>v!==SECOND_CHANCE_VAL);
  const vals=numCards;
  const hasDup=vals.length!==new Set(vals).size;
  if(hasDup && !ps.hasSecondChance) ps.status='bust';
  else if(vals.includes(FLIP_SEVEN_VAL)) ps.status='seven';
  else ps.status='active';
  renderGame();
}

function renderGame(){
  document.getElementById('rnd-num').textContent=G.round;
  const grid=document.getElementById('pgrid');
  grid.innerHTML='';
  const sorted=[...G.players].sort((a,b)=>b.totalScore-a.totalScore);
  const leadName=sorted[0]?.name;
  G.players.forEach((player,pi)=>{
    const ps=G.playerState[player.name];
    const numCards=ps.cards.filter(v=>v!==SECOND_CHANCE_VAL);
    const sum=numCards.reduce((a,v)=>a+v,0);
    const isBust=ps.status==='bust';
    const isCashout=ps.status==='cashout';
    const isSeven=ps.status==='seven';
    const isActive=ps.status==='active';
    const isDone=isBust||isCashout;
    const isLead=player.name===leadName&&sorted[0]?.totalScore>0&&!isBust;
    let state='';
    if(isBust) state='state-bust';
    else if(isSeven) state='state-seven';
    else if(isCashout) state='state-cashout';
    else if(isLead) state='state-lead';
    if(isDone && !isBust) state+=' state-done';
    let scoreClass='';
    if(isBust) scoreClass='c-bust';
    else if(isSeven) scoreClass='c-seven';
    else if(isCashout) scoreClass='c-cashout';
    let stText='Flip a card',stClass='t-safe';
    if(isBust){stText='BUSTED!';stClass='t-bust';}
    else if(isSeven){stText='FLIP SEVEN!';stClass='t-seven';}
    else if(isCashout){stText='CASHED OUT';stClass='t-cashout';}
    else if(sum>0) stText=\`\${numCards.length} card\${numCards.length!==1?'s':''}\`;
    const stripeColor=isBust?'var(--red)':isSeven?'var(--gold)':isCashout?'var(--cashout)':isLead?'rgba(212,168,67,0.5)':player.color+'55';
    const valCounts={};
    numCards.forEach(v=>{ valCounts[v]=(valCounts[v]||0)+1; });
    const chipsHtml=ps.cards.map((v,i)=>{
      if(v===SECOND_CHANCE_VAL){
        return \`<span class="chip chip-sc" data-pi="\${pi}" data-i="\${i}" title="Second Chance">SC</span>\`;
      }
      const isDup=valCounts[v]>1;
      const cls=isDup?'chip chip-dup':(v===7?'chip chip-gold':v<0?'chip chip-neg':'chip');
      return \`<span class="\${cls}" data-pi="\${pi}" data-i="\${i}">\${v>0?'+'+v:v}</span>\`;
    }).join('');
    const badgeHtml=isBust?'<div class="cbadge cbadge-bust">Bust</div>':
                    isSeven?'<div class="cbadge cbadge-seven">7!</div>':
                    isCashout?'<div class="cbadge cbadge-cashout">Out</div>':
                    ps.hasSecondChance&&!ps.usedSecondChance?'<div class="cbadge cbadge-sc">SC</div>':'';
    const inputDisabled=isDone?'disabled':'';
    const div=document.createElement('div');
    div.className='pcard '+state;
    div.style.animationDelay=(pi*0.07)+'s';
    div.innerHTML=\`
      <div class="pcard-stripe" style="background:\${stripeColor}"></div>
      \${badgeHtml}
      <div class="pcard-inner">
        <div class="pcard-head">
          <div class="avatar" style="background:\${player.color};border-color:\${player.color}">\${player.name.slice(0,2).toUpperCase()}</div>
          <div class="p-label">\${player.name}</div>
          \${isLead&&!isBust?'<span class="crown-icon">👑</span>':''}
        </div>
        <div class="big-score \${scoreClass}">\${isBust?'✗':sum}</div>
        <div class="status-tag \${stClass}">\${stText}</div>
        <div class="chips-area" id="ca-\${pi}">\${chipsHtml}</div>
        <div class="inp-row">
          <input class="val-input" type="text" placeholder="\${isDone?'—':'Value or SC'}" id="vi-\${pi}" autocomplete="off" \${inputDisabled}/>
          <button class="plus-btn" data-pi="\${pi}" \${inputDisabled}>+</button>
        </div>
        <button class="cashout-btn" data-pi="\${pi}" \${isDone||!isActive&&!isSeven?'disabled':''}>
          \${isCashout?'✔ Cashed out':'⊘ Cash out'}
        </button>
        <div class="ptotal">Total: <b>\${player.totalScore}</b></div>
      </div>
    \`;
    grid.appendChild(div);
    div.querySelector('.plus-btn').onclick=()=>{
      const inp=document.getElementById('vi-'+pi);
      addCard(pi, inp?.value||'');
    };
    div.querySelector('.val-input').onkeydown=e=>{
      if(e.key==='Enter') addCard(pi, e.target.value);
    };
    div.querySelector('.cashout-btn').onclick=()=>cashOut(pi);
  });
  document.querySelectorAll('.chip').forEach(chip=>{
    chip.onclick=()=>{
      const pi=+chip.dataset.pi;
      const i=+chip.dataset.i;
      const ps=G.playerState[G.players[pi].name];
      if(ps.status==='bust'||ps.status==='cashout') return;
      removeCard(pi,i);
    };
  });
  renderLeaderboard();
}

function renderLeaderboard(){
  const sorted=[...G.players].sort((a,b)=>b.totalScore-a.totalScore);
  const top=sorted[0]?.totalScore||1;
  document.getElementById('lb-body').innerHTML=sorted.map((p,i)=>{
    const ps=G.playerState[p.name];
    const bust=ps?.status==='bust';
    const barW=Math.round((p.totalScore/Math.max(top,1))*100);
    return \`<div class="lb-row">
      <div class="lb-rank \${i===0?'r1':''}">\${i===0?'★':i+1}</div>
      <div class="lb-dot" style="background:\${p.color}"></div>
      <div class="lb-bar-wrap">
        <div class="lb-name">\${p.name}</div>
        <div class="lb-bar-track"><div class="lb-bar-fill" style="width:\${barW}%;background:\${p.color}"></div></div>
      </div>
      <div class="lb-score \${bust?'busted':''}">\${p.totalScore}\${bust?' 💥':''}</div>
    </div>\`;
  }).join('');
}

function renderHistory(){
  const wrap=document.getElementById('hist-body');
  if(!G.history.length){
    wrap.innerHTML='<p style="color:var(--muted);font-size:13px;text-align:center;padding:8px 0">No rounds completed yet.</p>';
    return;
  }
  const names=G.players.map(p=>p.name);
  wrap.innerHTML=\`<table class="htable"><thead><tr>
    <th class="left">Player</th>
    \${G.history.map(h=>\`<th>R\${h.round}</th>\`).join('')}
    <th>Total</th>
  </tr></thead><tbody>
    \${names.map(n=>\`<tr>
      <td class="td-name">\${n}</td>
      \${G.history.map(h=>{
        const d=h.data[n];
        if(!d) return '<td>—</td>';
        if(d.bust) return \`<td class="td-bust">✗</td>\`;
        if(d.cashedOut) return \`<td class="td-cashout">+\${d.sum}✔</td>\`;
        return \`<td>+\${d.sum}</td>\`;
      }).join('')}
      <td class="td-total">\${G.players.find(p=>p.name===n)?.totalScore||0}</td>
    </tr>\`).join('')}
  </tbody></table>\`;
}

function spawnParticles(el,color,count=12){
  const target=el||document.body;
  const r=target.getBoundingClientRect?target.getBoundingClientRect():{left:window.innerWidth/2,top:window.innerHeight/2,width:0,height:0};
  const cx=r.left+r.width/2,cy=r.top+r.height/2;
  for(let i=0;i<count;i++){
    const p=document.createElement('div');
    p.className='particle';
    const angle=(i/count)*Math.PI*2+Math.random()*0.4;
    const dist=28+Math.random()*40;
    const size=4+Math.random()*5;
    p.style.cssText=\`left:\${cx}px;top:\${cy}px;width:\${size}px;height:\${size}px;background:\${color};--tx:\${Math.cos(angle)*dist}px;--ty:\${Math.sin(angle)*dist}px;animation-delay:\${Math.random()*0.08}s\`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),800);
  }
}

let _tt;
function toast(msg){
  const ex=document.querySelector('.toast');
  if(ex)ex.remove();
  clearTimeout(_tt);
  const el=document.createElement('div');
  el.className='toast';
  el.textContent=msg;
  document.body.appendChild(el);
  _tt=setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),300);},2800);
}

(function(){
  const canvas=document.getElementById('card-canvas');
  const ctx=canvas.getContext('2d');
  const SUITS=['♠','♥','♦','♣'];
  const VALUES=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const RED_SUITS=['♥','♦'];
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize);
  const CW=42, CH=58, CR=5;
  function randomCard(){
    const suit=SUITS[Math.floor(Math.random()*SUITS.length)];
    const val=VALUES[Math.floor(Math.random()*VALUES.length)];
    const isRed=RED_SUITS.includes(suit);
    return {
      x: Math.random()*window.innerWidth,
      y: -CH - Math.random()*window.innerHeight,
      vx: (Math.random()-0.5)*0.6,
      vy: 0.6 + Math.random()*1.1,
      rot: (Math.random()-0.5)*0.4,
      vrot: (Math.random()-0.5)*0.018,
      suit, val, isRed,
      alpha: 0.12 + Math.random()*0.18,
      scale: 0.75 + Math.random()*0.55,
    };
  }
  const CARD_COUNT=28;
  const cards=Array.from({length:CARD_COUNT},()=>{
    const c=randomCard();
    c.y=Math.random()*window.innerHeight;
    return c;
  });
  function drawCard(c){
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot);
    ctx.scale(c.scale, c.scale);
    ctx.globalAlpha=c.alpha;
    const w=CW, h=CH, r=CR;
    ctx.beginPath();
    ctx.moveTo(-w/2+r,-h/2);
    ctx.lineTo(w/2-r,-h/2);ctx.arcTo(w/2,-h/2,w/2,-h/2+r,r);
    ctx.lineTo(w/2,h/2-r);ctx.arcTo(w/2,h/2,w/2-r,h/2,r);
    ctx.lineTo(-w/2+r,h/2);ctx.arcTo(-w/2,h/2,-w/2,h/2-r,r);
    ctx.lineTo(-w/2,-h/2+r);ctx.arcTo(-w/2,-h/2,-w/2+r,-h/2,r);
    ctx.closePath();
    ctx.fillStyle='#0B3533';
    ctx.fill();
    ctx.strokeStyle=c.isRed?'rgba(232,75,42,0.6)':'rgba(245,200,66,0.5)';
    ctx.lineWidth=1;
    ctx.stroke();
    ctx.beginPath();
    const pad=3;
    ctx.rect(-w/2+pad,-h/2+pad,w-pad*2,h-pad*2);
    ctx.strokeStyle=c.isRed?'rgba(232,75,42,0.2)':'rgba(245,200,66,0.18)';
    ctx.lineWidth=0.5;
    ctx.stroke();
    const color=c.isRed?'#E84B2A':'#F5C842';
    ctx.fillStyle=color;
    ctx.font="bold 9px 'Inter',sans-serif";
    ctx.textAlign='left';
    ctx.textBaseline='top';
    ctx.fillText(c.val,-w/2+4,-h/2+3);
    ctx.font="10px serif";
    ctx.fillText(c.suit,-w/2+4,-h/2+13);
    ctx.font="bold 20px serif";
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(c.suit,0,0);
    ctx.save();
    ctx.rotate(Math.PI);
    ctx.font="bold 9px 'Inter',sans-serif";
    ctx.textAlign='left';
    ctx.textBaseline='top';
    ctx.fillText(c.val,-w/2+4,-h/2+3);
    ctx.font="10px serif";
    ctx.fillText(c.suit,-w/2+4,-h/2+13);
    ctx.restore();
    ctx.restore();
  }
  function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cards.forEach(c=>{
      c.x+=c.vx;
      c.y+=c.vy;
      c.rot+=c.vrot;
      c.vx+=(Math.random()-0.5)*0.01;
      c.vx=Math.max(-1,Math.min(1,c.vx));
      drawCard(c);
      if(c.y > canvas.height + CH*2){
        const fresh=randomCard();
        Object.assign(c,fresh);
      }
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

initSetup();
<\/script>
</body>
</html>`;

export default function FlipSevenScoreBoard({ onClose, project }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        const prevBody = document.body.style.overflow;
        const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevBody;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Flip Seven ScoreBoard demo">
            <button type="button" className="demo-modal-backdrop" aria-label="Close demo" onClick={onClose} />
            <div className="demo-shell">
                <header className="demo-topbar">
                    <div className="demo-topbar-left">
                        <button type="button" className="demo-back" onClick={onClose} aria-label="Back">
                            {"< Back"}
                        </button>
                        <div>
                            <p className="demo-kicker">Personal project for Flip Seven</p>
                            <h2>Flip Seven ScoreBoard</h2>
                        </div>
                    </div>
                    <div className="demo-topbar-right">
                        <span className="demo-close-hint">Press Esc or close</span>
                        <button type="button" className="demo-close" onClick={onClose}>Close</button>
                    </div>
                </header>

                <div
                    className="mos-system"
                    style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}
                >
                    <iframe
                        ref={iframeRef}
                        title="Flip Seven ScoreBoard"
                        srcDoc={FLIP_SEVEN_HTML}
                        sandbox="allow-scripts allow-same-origin"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}