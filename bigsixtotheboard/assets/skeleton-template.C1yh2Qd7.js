function c(d,a){return`
<div id="gamerow">
    <table cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td>
                <div id="gamerow-left">
                    <div id="message-region">
                        <div class="commentary">&nbsp;</div>
                    </div>
                    <div id="board" class="inner-board_content"></div>
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
                                                ${n(d,a)}
                                            </div>
                                        </td>
                                        <td>
                                            <div class="column-data-region">
                                                ${e(d,a)}
                                                ${s(d)}
                                                ${t(a)}
                                            </div>
                                        </td>
                                        <td>
                                            <div class="column-data-region">
                                                ${l()}
                                                ${r(d,a)}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                                    <div id="hand-region"></div>
                </div>
            </td>
        </tr>
    </table>
</div>`}function n(d,a){return d>2?`

                                                <div class="player-info"></div>
                                                <div class="player-info">
                                                <div style="height:20px"></div>
                                                    <div id="player-seat-1">
                                                        <div class="player-name">
                                                            <span class="player-name">${a[1]}</span>
                                                        </div>
                                                        <div>
                                                            <span id="player-score-1" class="player-score">0</span>
                                                        </div>
                                                    </div>
                                                </div>`:""}function e(d,a){return d>2?`
                                                <div class="player-info">
                                                    <div id="player-seat-2">
                                                        <div class="player-name">
                                                            <span class="player-name">${a[2]}</span>
                                                        </div>
                                                        <div>
                                                            <span id="player-score-2" class="player-score">0</span>
                                                        </div>
                                                    </div>
                                                </div>`:`
                                                <div class="player-info">
                                                    <div id="player-seat-1">
                                                        <div class="player-name">
                                                            <span class="player-name">${a[1]}</span>
                                                        </div>
                                                        <div>
                                                            <span id="player-score-1" class="player-score">0</span>
                                                        </div>
                                                    </div>
                                                </div>`}function s(d){const a=d>2?'<div class="handcount bonecount"><span id="player-hand-2">0</span></div>':'<div class="handcount bonecount"><span id="player-hand-1">0</span></div>',i=d>2?'<div class="handcount bonecount"><span id="player-hand-1">0</span></div>':'<div class="handcount bonecount"><span id="player-hand-1">&nbsp;</span></div>';return`
                                                <div id="handbox-data-region">
                                                    <div>
                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                            <tr>
                                                                <td><div class="handcount"></div></td>
                                                                <td>${a}</td>
                                                                <td><div class="handcount"></div></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div>
                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                            <tr>
                                                                <td>${i}</td>
                                                                <td><div class="handcount"></div></td>
                                                                <td>${d===4?'<div class="handcount bonecount"><span id="player-hand-3">0</span></div>':'<div class="handcount bonecount"><span id="player-hand-3"></span></div>'}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div>
                                                        <table cellspacing="0" cellpadding="0" border="0">
                                                            <tr>
                                                                <td><div class="handcount"></div></td>
                                                                <td>
                                                                    <div class="handcount bonecount">
                                                                        <span id="player-hand-0">0</span>
                                                                    </div>
                                                                </td>
                                                                <td><div class="handcount"></div></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>`}function t(d){return`
                                                <div class="player-info">
                                                    <div id="player-seat-0">
                                                        <div class="player-name">
                                                            <span class="player-name">${d[0]}</span>
                                                        </div>
                                                        <div>
                                                            <span id="player-score-0" class="player-score">0</span>
                                                        </div>
                                                    </div>
                                                </div>`}function l(){return`
                                                <div class="player-info">
                                                    <div class="player-name">
                                                        <span class="player-name">Boneyard</span>
                                                    </div>
                                                    <div>
                                                        <span id="boneyard-value" class="player-score"></span>
                                                    </div>
                                                </div>`}function r(d,a){return d>3?`
                                                <div class="player-info">
                                                    <div style="height:20px"></div>
                                                    <div id="player-seat-3">
                                                        <div class="player-name">
                                                            <span class="player-name">${a[3]}</span>
                                                        </div>
                                                        <div>
                                                            <span id="player-score-3" class="player-score">0</span>
                                                        </div>
                                                    </div>
                                                </div>`:'<div class="player-info"></div>'}export{c as generateSkeletonHTML};
