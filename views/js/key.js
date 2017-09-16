/**
 * Created by xiaoxiaosu on 17/9/15.
 */

var keydown =ds





var keydown = function(ev) {
    var key, keyCode = getKeyCode(ev);

    if ((ev.ctrlKey && ev.shiftKey) || ev.metaKey) {
        // do not catch ctrl+shift and meta key bindings.
        return;
    }

    switch (keyCode) {
        //backspace
        case 8:
            if (ev.shiftKey) {
                key = "\x08"; //^H
                break;
            }
            key = "\x7f"; //^?
            break;
        //tab
        case 9:
            if (ev.shiftKey) {
                key = "\x1b[Z";
                break;
            }
            key = "\t";
            break;
        //return /enter
        case 13:
            key = "\r";
            break;
        //escape
        case 27:
            key = "\x1b";
            break;
        //left - arrow
        case 37:
            key = this.getKey("left");
            break;
        //right - arrow
        case 39:
            key = this.getKey("right");
            break;
        //up - arrow
        case 38:
            key = this.getKey("up");
            break;
        //down - arrow
        case 40:
            key = this.getKey("down");
            break;
        //delete
        case 46:
            key = "\x1b[3~";
            break;
        //insert
        case 45:
            key = "\x1b[2~";
            break;
        //home
        case 36:
            key = "\x1bOH";
            break;
        //end
        case 35:
            key = "\x1bOF";
            break;
        //page up
        case 33:
            key = "\x1b[5~";
            break;
        //page down
        case 34:
            key = "\x1b[6~";
            break;
        //F1
        case 112:
            key = "\x1bOP";
            break;
        //F2
        case 113:
            key = "\x1bOQ";
            break;
        //F3
        case 114:
            key = "\x1bOR";
            break;
        //F4
        case 115:
            key = "\x1bOS";
            break;
        //F5
        case 116:
            key = "\x1b[15~";
            break;
        //F6
        case 117:
            key = "\x1b[17~";
            break;
        //F7
        case 118:
            key = "\x1b[18~";
            break;
        //F8
        case 119:
            key = "\x1b[19~";
            break;
        //F9
        case 120:
            key = "\x1b[20~";
            break;
        //F10
        case 121:
            key = "\x1b[21~";
            break;
        //F11
        case 122:
            key = "\x1b[23~";
            break;
        //F12
        case 123:
            key = "\x1b[24~";
            break;
        default:
            //a - z and space
            if (ev.ctrlKey) {
                if (keyCode >= 65 && keyCode <= 90)
                    key = String.fromCharCode(keyCode - 64);
                else if (keyCode === 32)
                //NUL
                    key = String.fromCharCode(0);
                else if (keyCode >= 51 && keyCode <= 55)
                //escape, file sep, group sep, record sep, unit sep
                    key = String.fromCharCode(keyCode - 51 + 27);
                else if (keyCode === 56)
                //delete
                    key = String.fromCharCode(127);
                else if (keyCode === 219)
                //^[-escape
                    key = String.fromCharCode(27);
                else if (keyCode === 221)
                //^] - group sep
                    key = String.fromCharCode(29);
            } else if (ev.altKey) {
                if (keyCode >= 65 && keyCode <= 90)
                    key = "\x1b" + String.fromCharCode(keyCode + 32);
                else if (keyCode === 192)
                    key = "\x1b`";
                else if (keyCode >= 48 && keyCode <= 57)
                    key = "\x1b" + (keyCode - 48);
            }
            break;
    }
    if(key !== undefined) {
        this.target.contentEditable=false;
        this.push(key);
        return this._cancelEvent(ev);
    }
}